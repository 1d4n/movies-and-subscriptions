export default function users(users = [], action) {
	switch (action.type) {
		case "USERS":
			return action.payload;
		case "NEW_USER":
			return [...users, action.payload];
		case "UPDATE_USER":
			const arr = [...users];
			let idx = arr.findIndex((u) => action.payload._id === u._id);
			if (idx !== -1) {
				arr[idx] = action.payload;
			}
            return arr;
        case "DELETE_USER":
            return users.filter(u => u._id !== action.payload);
		default:
			return users;
	}
}
