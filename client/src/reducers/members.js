function members(state = [], action) {
	switch (action.type) {
		case "MEMBERS":
			return action.payload;
		case "NEW_MEMBER":
			return [...state, action.payload];
		case "UPDATE_MEMBER":
			return state.map((m) => (m._id === action.payload._id ? action.payload : m));
		case "DELETE_MEMBER":
			return state?.filter((s) => s._id !== action.payload);
		default:
			return state;
	}
}

export default members;
