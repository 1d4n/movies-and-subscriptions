import React from "react";
import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom";
import {useDispatch } from "react-redux";

import AllMembers from "./AllMembers";
import EditMember from "./EditMember";
import AddMember from "./AddMember";
import Button from "@material-ui/core/Button";

const Subscriptions = () => {
	let history = useHistory();
	let { path, url } = useRouteMatch();
    const connectedUser = JSON.parse(localStorage.getItem("user"));
    const dispatch = useDispatch();

	const handleButton = () => {
		if (connectedUser.permissions?.includes("Create Subscriptions")) {
            history.push(url + "/add");
            dispatch({ type: "MEMBER_ID", payload: "" });
		} else {
			alert("You are not allowed to add members!");
		}
	};

	return (
		<div>
			<h3>Subscriptions</h3>

			<br />

			<Switch>
				<Route exact path={path}>
					<Button
						size="small"
						variant="contained"
						color="primary"
						onClick={() => {
                            history.push(url);
                            dispatch({ type: "MEMBER_ID", payload: "" });
						}}
					>
						All Members
					</Button>

					<Button size="small" variant="contained" onClick={handleButton}>
						Add Member
					</Button>
					<AllMembers />
				</Route>
				<Route path={path + "/add"} component={AddMember} />
				<Route path={path + "/edit/:id"} component={EditMember} />
			</Switch>
		</div>
	);
};

export default Subscriptions;
