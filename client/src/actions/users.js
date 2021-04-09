import userUtils from "../utils/userUtils";

export const getUsers = () => async (dispatch) => {
	const data = await userUtils.getAll();
	if (data && data !== "Error") {
		dispatch({ type: "USERS", payload: data });
	}
};

export const addUser = (newUser) => async (dispatch) => {
	const data = await userUtils.addNew(newUser);
	if (data && data !== "Error") {
		dispatch({ type: "NEW_USER", payload: data });
	}
};

export const updateUser = (id, updatedData) => async (dispatch) => {
	const data = await userUtils.updateById(id, updatedData);
	if (data && data !== "Error") {
		dispatch({ type: "UPDATE_USER", payload: data });
    } else {
        return "Error";
    }
};

export const deleteUserById = (id) => async (dispatch) => {
	const data = await userUtils.deleteById(id);
	if (data && data !== "Error") {
		dispatch({ type: "DELETE_USER", payload: id });
    } else {
        return "Error";
    }
};
