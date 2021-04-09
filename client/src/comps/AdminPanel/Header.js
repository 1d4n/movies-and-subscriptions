import React, { useEffect } from "react";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";

import AllUsers from "./Users";
import AddUserComp from "./AddUser";
import EditUserComp from "./EditUser";

const Header = () => {
	let history = useHistory();
	let { path } = useRouteMatch();
	const connectedUser = JSON.parse(localStorage.getItem("user"));
    
	useEffect(() => {
		if (!connectedUser || !connectedUser.permissions?.includes("Create Subscriptions")) {
			history.push("/");
		}
	}, [history, connectedUser]);

	return (
		<div>
			<h3>Users</h3>

			<Switch>
				<Route exact path={path} />
				<Route path={path + "/all"} component={AllUsers} />
				<Route path={path + "/add"} component={AddUserComp} />
				<Route path={path + "/edit/:id"} component={EditUserComp} />
			</Switch>
		</div>
	);
};

export default Header;
