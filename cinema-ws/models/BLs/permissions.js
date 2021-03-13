const Permission = require("../Schemas/permission");

const getAll = () => {
  return new Promise((resolve, reject) => {
    Permission.find()
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

const getById = (id) => {
  return new Promise((resolve, reject) => {
    Permission.findById(id)
      .then((data) => {
        if (data) {
          resolve(data);
        }
        reject({ msg: "Invalid ID!" });
      })
      .catch((err) => reject(err));
  });
};

const updateById = (id, updatedData) => {
  return new Promise((resolve, reject) => {
    Permission.findByIdAndUpdate(id, { $set: updatedData }, { new: true })
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

const addNew = (newId, newData) => {
  return new Promise((resolve, reject) => {
    const obj = new Permission({...newData, _id: newId});

    obj
      .save()
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    Permission.findByIdAndDelete(id)
      .then((data) => {
        if (data) {
          resolve(data);
        }
        reject("Invalid ID!");
      })
      .catch((err) => reject(err));
  });
};

module.exports = { getAll, getById, updateById, addNew, deleteById };
