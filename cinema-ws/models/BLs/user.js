const User = require("../Schemas/user");

const getAll = () => {
  return new Promise((resolve, reject) => {
    User.find({})
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

const getById = (id) => {
  return new Promise((resolve, reject) => {
    User.findById(id)
      .then((data) => {
        if (data) {
          resolve(data);
        }
        reject("Invalid ID!");
      })
      .catch((err) => reject(err));
  });
};

const updateById = (id, updatedData) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(id, { $set: updatedData }, { new: true })
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

const addNew = (newData) => {
  return new Promise((resolve, reject) => {
    const obj = new User(newData);

    obj
      .save()
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndDelete(id)
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
