const userBL = require("./user");
const userOtherDataBL = require("./userOtherData");
const permissionBL = require("./permissions");

const getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = await userBL.getAll();
      let otherUserData = await userOtherDataBL.getAll();
      let permissions = await permissionBL.getAll();

      let allData = userData.map((user, i) => {
        return {
          ...user._doc,
          ...otherUserData[i]._doc,
          ...permissions[i]._doc,
        };
      });
      resolve(allData);
    } catch (err) {
      reject(err);
    }
  });
};

const getById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = await userBL.getById(id);
      let otherUserData = await userOtherDataBL.getById(id);
      let permissions = await permissionBL.getById(id);
      let obj = {
        ...userData._doc,
        ...otherUserData._doc,
        ...permissions._doc,
      };
      // let allData = Object.assign( userData, otherUserData, permissions);
      // let obj = {
      //   _id: userData._id,
      //   username: userData.username,
      //   password: userData.password,
      //   firstName: otherUserData.firstName,
      //   lastName: otherUserData.lastName,
      //   createdDate: otherUserData.createdDate,
      //   sessionTimeout: otherUserData.sessionTimeout,
      //   permissions,
      // };
      resolve(obj);
    } catch (err) {
      reject(err);
    }
  });
};

const addNew = (newData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = await userBL.addNew(newData);
      let otherUserData = await userOtherDataBL.addNew(userData._id, newData);
      let permissions = await permissionBL.addNew(userData._id, newData);

      let allData = {
        ...userData._doc,
        ...otherUserData._doc,
        ...permissions._doc,
      };
      resolve(allData);
    } catch (err) {
      reject(err);
    }
  });
};

const updateById = (id, updatedData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = await userBL.updateById(id, updatedData);
      let otherUserData = await userOtherDataBL.updateById(id, updatedData);
      let permissions = await permissionBL.updateById(id, updatedData);

      let allData = {
        ...userData._doc,
        ...otherUserData._doc,
        ...permissions._doc,
      };
      resolve(allData);
    } catch (err) {
      reject(err);
    }
  });
};


const deleteById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await userBL.deleteById(id);
      await userOtherDataBL.deleteById(id);
      await permissionBL.deleteById(id);

      resolve("Deleted");
    } catch (err) {
      reject(err);
    }
  });
};



module.exports = { getAll, getById, addNew, updateById, deleteById };
