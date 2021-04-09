import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SubscribeNew from "./SubscribeNew";
import { Box, Button } from "@material-ui/core";

function WatchedMovies(props) {
	const [toggle, setToggle] = useState(false);
	const dispatch = useDispatch();
	const movies = useSelector((state) => state.movies);
	const subscriptions = useSelector((state) => state.subscriptions);
    const isAllowed = JSON.parse(localStorage.getItem("user"))?.permissions?.includes("View Movies");
    
    const handleButton = () => {
        if (JSON.parse(localStorage.getItem("user"))?.permissions?.includes("Create Subscriptions")) setToggle(!toggle);
        else alert("You're not allowed to add subscriptions!")
    }

	const memberSubscriptions = subscriptions.find((s) => s.memberId === props.id);
	let watchedMovies = memberSubscriptions && memberSubscriptions.movies.map((movie, index) => {
			let movieData = movies.find((m) => m._id === movie.movieId);
			return movieData && (
				<li key={index}>
					<Link
						to={isAllowed ? "movies" : "#"} // "#" doesn't change location
						onClick={() => {
							if (!isAllowed) return alert("You are not allowed to view movies!"); // using "return" in order to exit the function
							dispatch({ type: "MOVIE_ID", payload: movie.movieId });
						}}>
						{movieData.name}
					</Link>
					, {new Date(movie.date).toLocaleDateString()}
				</li>
			) 
		});

	const defaultProps = {
		bgcolor: "background.paper",
		m: 1,
		p: 1,
		border: 2,
	};

	return (
		<div>
			<Box borderColor="text.primary" {...defaultProps} textAlign="left">
				<strong>Movies Watched</strong>
				<br />
				<Button variant="outlined" color="primary" size="small" onClick={handleButton}>
					Subscribe to new movie
				</Button>

				<Box display={toggle ? "block" : "none"}>
					<SubscribeNew id={props.id} />
				</Box>
				<ul>{watchedMovies}</ul>
			</Box>
		</div>
	);
}

export default WatchedMovies;
