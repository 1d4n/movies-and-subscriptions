import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { addMovie } from "../../actions/movies";
import { Box, Button } from "@material-ui/core";

const defaultProps = {
	bgcolor: "background.paper",
	m: 1,
	p: 2,
	border: 2,
};

function AddMovie() {
	let history = useHistory();
	const dispatch = useDispatch();

	return (
		<div>
			<Box display="flex" justifyContent="center">
				<Formik
					initialValues={{
						name: "",
						genres: "",
						image: "",
						premiered: "",
					}}
					onSubmit={async (values) => {
						// await new Promise((r) => setTimeout(r, 500));
						if (values.name && values.genres && values.image && values.premiered) {
							let obj = {
								...values,
								genres: values.genres.split(","),
							};
							await dispatch(addMovie(obj));
							history.push("/panel/movies");
						} else {
							alert("Invalid Data!");
						}
					}}
				>
					<Box boxShadow={10} borderRadius={16} borderColor="primary.main" {...defaultProps}>
						<Form>
							<h3>Add New Movie</h3>
							<label htmlFor="name">Name: </label>
							<Field id="name" required name="name" placeholder="movie's name" />
							<br />

							<label htmlFor="genres">Genres: </label>
							<Field id="genres" required name="genres" placeholder="Drama,Thriller" />
							<br />

							<label htmlFor="image">Image url: </label>
							<Field id="image" required name="image" placeholder="Image URL" />
							<br />

							<label htmlFor="premiered">Premired: </label>
							<Field id="premiered" required name="premiered" type="date" />
							<br />
							<br />

							<Button variant="contained" size="small" color="primary" type="submit">
								save
							</Button>
							<Button
								variant="contained"
								size="small"
								onClick={(e) => {
									e.preventDefault();
									history.goBack();
								}}
							>
								cancel
							</Button>
						</Form>
					</Box>
				</Formik>
			</Box>
		</div>
	);
}

export default AddMovie;
