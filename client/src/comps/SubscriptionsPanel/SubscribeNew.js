import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSubscription } from "../../actions/subscriptions";
import Box from "@material-ui/core/Box";

const SubscribeNew = (props) => {
	const defaultProps = {
		bgcolor: "background.paper",
		m: 1,
		p: 1,
		border: 1,
	};

	const allMovies = useSelector((state) => state.movies);
	const subscriptions = useSelector((state) => state.subscriptions);
	const dispatch = useDispatch();
	const [movies, setMovies] = useState([]);
	const [date, setDate] = useState("");
	const [selectedMovie, setSelectedMovie] = useState("");

	useEffect(() => {
		let memberSubscriptions = subscriptions.find((s) => s.memberId === props.id);
		if (Array.isArray(allMovies)) {
			let arr = [...allMovies].reverse();
			if (memberSubscriptions) {
				memberSubscriptions.movies.forEach((movie) => {
					let idx = arr.findIndex((m) => m._id === movie.movieId);
					if (idx !== -1) {
						arr.splice(idx, 1); // removing the watched movie from the array.
					}
				});
			}
			setMovies(arr);
		}
	}, [props.id, allMovies, subscriptions]);

	const subscribe = async () => {
		if (date && selectedMovie) {
			let newData = JSON.parse(selectedMovie);
			let obj = {
				memberId: props.id,
				movies: [
					{
						movieId: newData.id,
						date: new Date(date),
					},
				],
			};
			const resp = await dispatch(addSubscription(obj));
			alert(resp);
		} else {
			alert("Invalid Data");
		}
	};

	let items = "";
	if (movies.length) {
		items = movies.map((movie) => {
			return (
				<option key={movie._id} value={`{"id":"${movie._id}", "name": "${movie.name}"}`}>
					{movie.name}
				</option>
			);
		});
	}

	return (
		<div>
			<Box borderColor="text.primary" {...defaultProps} textAlign="left">
				Add a new movie
				<br />
				<select onChange={(e) => setSelectedMovie(e.target.value)}>
					<option value="">Pick a Movie</option>
					{items}
				</select>
				<br />
				Date: <input type="date" onChange={(e) => setDate(e.target.value)} />
				<br />
				<button onClick={subscribe}>Subscribe</button>
			</Box>
		</div>
	);
};

export default SubscribeNew;
