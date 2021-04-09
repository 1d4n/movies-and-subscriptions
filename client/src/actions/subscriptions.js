import subscriptionUtils from "../utils/subscriptionUtils";

export const getSubscriptions = () => async (dispatch) => {
	const data = await subscriptionUtils.getAll();
	if (data && data !== "Error") {
		dispatch({ type: "SUBSCRIPTIONS", payload: data });
	}
};

export const addSubscription = (newSubscription) => async (dispatch) => {
	const resp = await subscriptionUtils.addNew(newSubscription);
	if (resp && resp !== "Error") {
        await dispatch(getSubscriptions());
		return "Subscribed!";
	}
	return "Couldn't subscribe";
};
