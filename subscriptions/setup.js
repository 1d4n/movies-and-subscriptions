const axios = require("axios");
const memberBL = require("./models/BLs/member");
const movieBL = require("./models/BLs/movie");

const USERS_URL = "https://jsonplaceholder.typicode.com/users";
const SHOWS_URL = "https://api.tvmaze.com/shows";

// a function for getting all members from the users API
const getMembers = async () => {
	try {
		let resp = await axios.get(USERS_URL);
		let data = resp.data;
		let members = data.map(user => ({
			name: user.name,
			email: user.email,
			city: user.address.city,
		}));

		return members;
	} catch (e) {
		throw new Error(e);
	}
};

// a function for getting all movies form the shows API
const getMovies = async () => {
	try {
		let resp = await axios.get(SHOWS_URL);
		let data = resp.data;
		let movies = data.map(movie => ({
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

// a function for adding all the members to the DB
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

// a function for adding all the movies to the DB
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

// the main function which calls the other functions.
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
