function permissions(state = { permissions: [] }, action) {
	switch (action.type) {
        case "LOGIN":
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify({ ...action.payload.data }))
            localStorage.setItem('timeout', action.payload.timeout);
			return { ...state, ...action.payload.data };
        case "LOGOUT":
            localStorage.clear();
            sessionStorage.clear();
			return { ...state, connected: { permissions: [] } };
		default:
			return state;
	}
}

export default permissions;
