export default function subscriptions(subscriptions = [], action) {
	switch (action.type) {
		case "SUBSCRIPTIONS":
			return action.payload;
		case "NEW_SUBSCRIPTION":
			return [...subscriptions, action.payload];
		default:
			return subscriptions;
	}
}
