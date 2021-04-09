import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import WatchedMovies from "./WatchedMovies";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

function Member(props) {
    let history = useHistory();
    const { url } = useRouteMatch();
    const connectedUser = JSON.parse(localStorage.getItem("user"));
    
	const handleDeleteButton = () => {
		if (connectedUser?.permissions?.includes("Delete Subscriptions")) {
			props.deleteCallback(props.data._id);
		} else {
			alert("You're not allowed to delete members!");
		}
	};

	const handleEditButton = () => {
		if (connectedUser?.permissions?.includes("Update Subscriptions")) {
            history.push(url + "/edit/" + props.data._id);
		} else {
			alert("You're not allowed to edit members!");
		}
	};

	const defaultProps = {
		bgcolor: "background.paper",
		m: 1,
		p: 1,
		border: 2,
	};

	return (
		<div>
			<Box borderColor="text.primary" {...defaultProps} textAlign="left">
				<h4>{props.data.name}</h4>
				Email: {props.data.email}
				<br />
				City: {props.data.city}
				<br />
				<br />
				<Button variant="outlined" color="primary" size="small" onClick={handleEditButton}>
					Edit
				</Button>
				<Button variant="outlined" color="secondary" size="small" onClick={handleDeleteButton}>
					Delete
				</Button>
				<br />
				<WatchedMovies id={props.data._id} />
			</Box>
		</div>
	);
}

export default Member;
