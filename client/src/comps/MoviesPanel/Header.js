import React from "react";
import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom";
import {useDispatch } from "react-redux";

import AllMovies from "./AllMovies";
import AddMovie from "./AddMovie";
import EditMovie from "./EditMovie";
import Button from "@material-ui/core/Button";

const Movies = () => {
	let history = useHistory();
	let { path, url } = useRouteMatch();
    const dispatch = useDispatch();
	const connectedUser = JSON.parse(localStorage.getItem("user"));

	const handleButton = () => {
		if (!connectedUser.permissions?.includes("Create Movies")) {
			alert("You are not allowed to add movies!");
		} else {
            history.push(url + "/add");
            dispatch({ type: "MOVIE_ID", payload: "" });
		}
	};

	return (
		<div>
			<h3>Movies</h3>

			<Switch>
				<Route exact path={path}>
					<Button
						size="small"
						variant="contained"
						color="primary"
						onClick={() => {
                            history.push(url);
                            dispatch({ type: "MOVIE_ID", payload: "" });
						}}
					>
						All Movies
					</Button>

					<Button size="small" variant="contained" onClick={handleButton}>
						Add Movie
					</Button>

					<br />
					<br />
					<AllMovies />
				</Route>
				<Route path={path + "/add"} component={AddMovie} />
				<Route path={path + "/edit/:id"} component={EditMovie} />
			</Switch>
		</div>
	);
};

export default Movies;
