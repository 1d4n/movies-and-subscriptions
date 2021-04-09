import movieUtils from "../utils/movieUtils";

export const getMovies = () => async (dispatch) => {
	const data = await movieUtils.getAll();
	if (data && data !== "Error") {
		dispatch({ type: "MOVIES", payload: data });
	}
};

export const addMovie = (obj) => async (dispatch) => {
	const data = await movieUtils.addNew(obj);
	if (data && data !== "Error") {
		dispatch({ type: "NEW_MOVIE", payload: data });
		alert("The new movie has been successfully added!");
	} else {
		alert("Couldn't add the movie!");
	}
};

export const updateMovie = (movieId, obj) => async (dispatch) => {
	const data = await movieUtils.updateById(movieId, obj);
	if (data && data !== "Error") {
		dispatch({ type: "UPDATE_MOVIE", payload: data });
		alert("The movie has been successfully updated!");
	} else {
		alert("Couldn't update the movie.");
	}
};

export const deleteMovie = (movieId) => async (dispatch) => {
	const data = await movieUtils.deleteById(movieId);
	if (data && data !== "Error") {
        dispatch({ type: "DELETE_MOVIE", payload: movieId });
        return "The movies has been successfully deleted!" // returns promise
    }
    return "Error! couldn't delete the movie"
};
