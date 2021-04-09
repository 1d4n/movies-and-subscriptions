function movies(state = [], action) {
	switch (action.type) {
		case "MOVIES":
			return action.payload;
		case "NEW_MOVIE":
			return [...state, action.payload];
		case "UPDATE_MOVIE":
			return state.map((m) => (m._id === action.payload._id ? action.payload : m));
		case "DELETE_MOVIE":
			return state.filter((m) => m._id !== action.payload);
		default:
			return state;
	}
}

export default movies;
