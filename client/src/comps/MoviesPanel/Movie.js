import React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import SubscriptionWatched from "./SubscriptionWatched";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

function Movie(props) {
	let { url } = useRouteMatch();
    let history = useHistory();
	const data = props.data;
	const connectedUser = JSON.parse(localStorage.getItem("user"));

	const handleDeleteButton = () => {
		if (connectedUser?.permissions?.includes("Delete Movies")) {
			props.deleteCallback(data._id);
		} else {
			alert("You're not allowed to delete movies!");
		}
	};

	const handleEditButton = () => {
		if (connectedUser?.permissions?.includes("Update Movies")) {

			history.push(url + "/edit/" + data._id);
		} else {
			alert("You're not allowed to edit movies!");
		}
	};

	const defaultProps = {
		bgcolor: "background.paper",
		m: 2,
		p: 1,
		border: 1,
	};

	return (
		<div>
			<Box borderColor="text.primary" {...defaultProps} textAlign="left">
				<strong>{data.name + ", " + new Date(data.premiered).getFullYear()}</strong>
				<br />

				{data.genres?.join(", ")}
				<br />

				<Grid container direction="row">
					<Grid item xs={2}>
						<img src={data.image} width="50px" alt={data.name} />
					</Grid>
					<Grid item xs={10}>
						<SubscriptionWatched id={data._id} />
					</Grid>
				</Grid>

				<br />
				<Box display="flex" justifyContent="center">
					<Button variant="outlined" color="primary" size="small" onClick={handleEditButton}>
						Edit
					</Button>
					<Button variant="outlined" color="secondary" size="small" onClick={handleDeleteButton}>
						Delete
					</Button>
				</Box>
			</Box>
		</div>
	);
}

export default Movie;
