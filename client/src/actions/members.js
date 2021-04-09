import memberUtils from "../utils/memberUtils";

export const getMembers = () => async (dispatch) => {
	const data = await memberUtils.getAll();
	if (data && data !== "Error") {
		dispatch({ type: "MEMBERS", payload: data });
	}
};

export const addMember = (obj) => async (dispatch) => {
	const data = await memberUtils.addNew(obj);
	if (data && data !== "Error") {
		dispatch({ type: "NEW_MEMBER", payload: data });
	}
};

export const updateMember = (memberId, obj) => async (dispatch) => {
	const data = await memberUtils.updateById(memberId, obj);
	if (data && data !== "Error") {
		dispatch({ type: "UPDATE_MEMBER", payload: data });
	}
};

export const deleteMember = (memberId) => async (dispatch) => {
	const data = await memberUtils.deleteById(memberId);
	if (data && data !== "Error") {
		dispatch({ type: "DELETE_MEMBER", payload: memberId });
		alert("Successfully deleted the member!");
	}
};
