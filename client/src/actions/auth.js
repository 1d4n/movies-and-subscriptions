import userUtils from "../utils/userUtils";

export const signin = (username, password, history) => async (dispatch) => {
	try {
		const resp = await userUtils.signin(username, password);
        dispatch({ type: "LOGIN", payload: { data: { ...resp.data }, token: resp.token, timeout: new Date().getTime() + 1000 * 60 * resp.data.sessionTimeout } });
        history.push('/panel')
	} catch (err) {
        alert(err);
	}
};

export const logout = (history) => async (dispatch) => {
    dispatch({ type: "LOGOUT" });
	sessionStorage.clear();
    localStorage.clear();
	dispatch({ type: "MEMBER_ID", payload: "" });
	dispatch({ type: "MOVIE_ID", payload: "" });
	history.push("/");
}