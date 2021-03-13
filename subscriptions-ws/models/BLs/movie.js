const Movie = require("../Schemas/movie");

const getAll = () => {
  return new Promise((resolve, reject) => {
    Movie.find({})
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

const getById = (id) => {
  return new Promise((resolve, reject) => {
    Movie.findById(id)
      .then((data) => (data ? resolve(data) : reject("Invalid ID!")))
      .catch((err) => reject(err));
  });
};

const addNew = (newData) => {
  return new Promise((resolve, reject) => {
    const obj = new Movie({ ...newData });
    obj
      .save()
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

const updateById = (id, updatedData) => {
  return new Promise((resolve, reject) => {
    Movie.findByIdAndUpdate(id, { $set: { ...updatedData } }, { new: true })
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    Movie.findByIdAndDelete(id)
      .then((data) => (data ? resolve("Deleted") : reject("Invalid ID!")))
      .catch((err) => reject(err));
  });
};

const isCollectionEmpty = () =>
  new Promise((resolve, reject) => {
    Movie.countDocuments((err, count) => {
      if (err) {
        reject(err);
      }
      resolve(count === 0);
    });
  });

const addMany = (arr) =>
  new Promise((resolve, reject) => {
    Movie.insertMany(arr)
      .then(() => resolve("Added all movies"))
      .catch((err) => reject(err));
  });

module.exports = {
  getAll,
  getById,
  addNew,
  updateById,
  deleteById,
  addMany,
  isCollectionEmpty,
};
