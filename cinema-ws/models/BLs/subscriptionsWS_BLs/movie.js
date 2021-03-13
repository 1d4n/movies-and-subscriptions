const axios = require("axios");
const URL = "http://localhost:8000/api/movies/";

const getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await axios.get(URL);
      if (resp.data.length) {
        resolve(resp.data);
      }
      reject("No Data");
    } catch (err) {
      reject(err);
    }
  });
};

const getById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await axios.get(URL+id);
      if (resp.data) {
        resolve(resp.data);
      }
      reject("No Data");
    } catch (err) {
      reject(err);
    }
  });
};

const addNew = (newData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await axios.post(URL, newData);
      if (resp.data) {
        resolve(resp.data);
      }
      reject("Error");
    } catch (err) {
      reject(err);
    }
  });
};

const updateById = (id, updatedData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await axios.patch(URL+id, updatedData);
      if (resp.data) {
        resolve(resp.data);
      }
      reject("Error");
    } catch (err) {
      reject(err);
    }
  });
};

const deleteById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await axios.delete(URL+id);
      if (resp.data) {
        resolve(resp.data);
      }
      reject("Error");
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { getAll, getById, addNew, updateById, deleteById};
