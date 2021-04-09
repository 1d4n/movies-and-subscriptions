function specific(state = { memberId: "", movieId: "" }, action) {
	switch (action.type) {
		case "MEMBER_ID":
			return { ...state, memberId: action.payload };
		case "MOVIE_ID":
			return { ...state, movieId: action.payload };
		default:
			return state;
	}
}

export default specific;
