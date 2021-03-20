const jsonFile = require("jsonfile");
const file = "./data/users.json";

const getAll = () => {
  return new Promise((resolve, reject) => {
    jsonFile
      .readFile(file)
      .then((data) => resolve(data.users))
      .catch((err) => reject(err));
  });
};

const getById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await jsonFile.readFile(file);
      let arr = data.users.filter((user) => user._id === id);

      if (arr.length === 1) {
        resolve(arr[0]);
      }

      reject("Invalid ID");
    } catch (err) {
      reject(err);
    }
  });
};

const addNew = (newId, newData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await jsonFile.readFile(file);

      let obj = {
        _id: newId,
        firstName: newData.firstName ? newData.firstName : "",
        lastName: newData.lastName ? newData.lastName : "",
        createdDate: new Date(),
        sessionTimeout: newData.sessionTimeout ?? 0,
      };
      data.users.push(obj)
      await jsonFile.writeFile(file, data);
      resolve(obj);
    } catch (err) {
      reject(err);
    }
  });
};

const updateById = (id, updatedData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await jsonFile.readFile(file);

      let i = data.users.findIndex((user) => user._id === id);
      if (i !== -1) {
        let obj = {
          _id: id,
          firstName: updatedData.firstName ?? data.users[i].firstName,
          lastName: updatedData.lastName ?? data.users[i].lastName,
          createdDate: data.users[i].createdDate,
          sessionTimeout: updatedData.sessionTimeout ?? data.users[i].sessionTimeout,
        };

        data.users.splice(i, 1, obj);

        await jsonFile.writeFile(file, data);
        resolve(obj);
      } else {
        reject("Invalid ID!");
      }
    } catch (err) {
      reject(err);
    }
  });
};

const deleteById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await jsonFile.readFile(file);
      let newArr = data.users.filter((user) => user._id !== id);

      await jsonFile.writeFile(file, {users: newArr});
      resolve("Deleted");
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { getAll, getById, addNew, updateById, deleteById };
