const axios = require("axios");
const memberBL = require("./models/BLs/member");
const movieBL = require("./models/BLs/movie");

const usersApi = "https://jsonplaceholder.typicode.com/users";
const showsApi = "https://api.tvmaze.com/shows";

const getMembers = async () => {
  try {
    let resp = await axios.get(usersApi);
    let data = resp.data;
    let members = data.map((user) => ({
      name: user.name,
      email: user.email,
      city: user.address.city,
    }));

    return members;
  } catch (e) {
    throw new Error(e);
  }
};

const getMovies = async () => {
  try {
    let resp = await axios.get(showsApi);
    let data = resp.data;
    let movies = data.map((movie) => ({
      name: movie.name,
      genres: movie.genres,
      image: movie.image.medium,
      premiered: movie.premiered,
    }));

    return movies;
  } catch (err) {
    throw new Error(err);
  }
};

const setMembers = async () => {
  try {
    let isEmpty = await memberBL.isCollectionEmpty();
    if (isEmpty) {
      let members = await getMembers();
      return await memberBL.addMany(members);
    }
    return "Members data is already set.";
  } catch (err) {
    throw new Error(err);
  }
};

const setMovies = async () => {
  try {
    let isEmpty = await movieBL.isCollectionEmpty();
    if (isEmpty) {
      let movies = await getMovies();
      return await movieBL.addMany(movies);
    }
    return "Movies data is already set.";
  } catch (err) {
    throw new Error(err);
  }
};

const setup = async () => {
  try {
    let resp1 = await setMembers();
    let resp2 = await setMovies();

    return resp1 + "\r\n" + resp2;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { setup };

// option 2: .then().catch()
/*
const setMovies2 = () =>
  new Promise((resolve, reject) => {
    movieBL
      .isCollectionEmpty()
      .then((bool) => {
        if (bool) {
          getMovies()
            .then((members) =>
              movieBL
                .addMany(members)
                .then((data) => resolve(data))
                .catch((err) => reject(err))
            )
            .catch((err) => reject(err));
        } else {
          resolve("Movies data is already set.");
        }
      })
      .catch((err) => reject(err));
  });

const setMembers2 = () =>
  new Promise((resolve, reject) => {
    memberBL
      .isCollectionEmpty()
      .then((bool) => {
        if (bool) {
          getMembers()
            .then((members) =>
              memberBL
                .addMany(members)
                .then((data) => resolve(data))
                .catch((err) => reject(err))
            )
            .catch((err) => reject(err));
        } else {
          resolve("Members data is already set");
        }
      })
      .catch((err) => reject(err));
  });

const setup = () =>
  new Promise((resolve, reject) => {
    setMembers()
      .then((data) => {
        setMovies()
          .then((data2) => resolve(data + "\r\n" + data2))
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
*/
