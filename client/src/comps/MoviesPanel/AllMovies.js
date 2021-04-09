import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteMovie } from "../../actions/movies";
import { getSubscriptions } from "../../actions/subscriptions";
import Movie from "./Movie";
import InfiniteScroll from "react-infinite-scroll-component";
import { Grid, TextField } from "@material-ui/core";

function AllMovies() {
	const movies = useSelector((state) => state.movies);
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [count, setCount] = useState(20);
	const specificMovieId = useSelector((state) => state.specific.movieId ?? "");

	const handleDelete = async (id) => {
		const resp = await dispatch(deleteMovie(id));
        alert(resp);
		if (resp?.includes("deleted")) await dispatch(getSubscriptions());
		if (specificMovieId?.length > 10) dispatch({ type: "MOVIE_ID", payload: "" });
	};

	let items = movies.length
		? movies
				.slice(0) // slice(0) makes a copy of the array
				.reverse()
				.reduce((filtered, movie, i, arr) => {
					// checking if it should show only a specific movie
					if (!name && specificMovieId.length > 10) {
						filtered.push(
							<Movie
								key={movie._id}
								data={movies.find((m) => m._id === specificMovieId) ?? {}}
								deleteCallback={handleDelete}
							/>
						);
						arr.splice(1); // breaks the reduce loop
					} else {
						if (movie.name.toLowerCase().includes(name) && filtered.length <= count) {
							filtered.push(
								<Movie
									key={movie._id}
									data={movies.find((m) => m._id === movie._id)}
									deleteCallback={handleDelete}
								/>
							);
						}
					}

					return filtered;
				}, [])
		: [];

	return (
		<div>
			<TextField
				label="Find a Movie"
				size="small"
				name="movie_name"
				variant="filled"
				onChange={(e) => setName(e.target.value.toLowerCase())}
			/>
			<br />
			<InfiniteScroll dataLength={count} next={() => setCount(count + 10)} hasMore={true}></InfiniteScroll>
			<Grid container direction="row" justify="center" alignItems="center">
				{items.slice(0, count)}
			</Grid>
			<br /> <br />
		</div>
	);
}

export default AllMovies;
