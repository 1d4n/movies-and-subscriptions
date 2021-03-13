const Subscription = require("../Schemas/subscription");

const getAll = () => {
  return new Promise((resolve, reject) => {
    Subscription.find({})
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

const getById = (id) => {
  return new Promise((resolve, reject) => {
    Subscription.findById(id)
      .then((data) => (data ? resolve(data) : reject("Invalid ID!")))
      .catch((err) => reject(err));
  });
};

const addNew = (newData) => {
  return new Promise((resolve, reject) => {
    const obj = new Subscription({ ...newData });
    obj
      .save()
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

const updateById = (id, updatedData) => {
  return new Promise((resolve, reject) => {
    Subscription.findByIdAndUpdate(
      id,
      { $set: { ...updatedData } },
      { new: true }
    )
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    Subscription.deleteById(id)
      .then((data) => (data ? resolve("Deleted") : reject("Error")))
      .catch((err) => reject(err));
  });
};

const deleteByMemberId = (memberId) => {
  return new Promise((resolve, reject) => {
    Subscription.deleteMany(
      {
        memberId
      },
      (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      }
    );
  });
};

const deleteByMovieId = (movieId) => {
  return new Promise((resolve, reject) => {
    Subscription.deleteMany(
      { movies: { $elemMatch: { movieId } } },
      (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      }
    );
  });
};

const getByMemberId = (memberId) => {
  return new Promise((resolve, reject) => {
    Subscription.find({ memberId }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        let arr = [];
        data.forEach((s) => {
          arr.push(...s.movies);
        });
        resolve(arr);
      }
    });
  });
};

const getMembersByMovieId = (movieId) => {
  return new Promise((resolve, reject) => {
    Subscription.find(
      { movies: { $elemMatch: { movieId } } },
      { memberId: 1, "movies.$": 1 },
      (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      }
    );
  });
};

module.exports = {
  getAll,
  getById,
  addNew,
  updateById,
  deleteById,
  deleteByMemberId,
  deleteByMovieId,
  getByMemberId,
  getMembersByMovieId,
};
