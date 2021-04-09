import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMovie } from "../../actions/movies";
import { useHistory, useParams } from "react-router-dom";
import { Formik, Field, Form } from "formik";

import { Box, Button } from "@material-ui/core/";

const defaultProps = {
	bgcolor: "background.paper",
	m: 1,
	p: 2,
	border: 2,
};

function EditMovie() {
	let history = useHistory();
	let { id } = useParams();
	const data = useSelector((state) => state.movies?.find((m) => m._id === id));
	const dispatch = useDispatch();

	return (
		<div>
			<Box display="flex" justifyContent="center">
				<Formik
					initialValues={{
						name: data?.name ?? "",
						genres: data?.genres?.join(", ") ?? "",
						image: data?.image ?? "",
						premiered: data?.premiered?.split("T")[0] ?? "1970-01-01",
					}}
					enableReinitialize
					onSubmit={async (values) => {
						let obj = {
							...values,
							genres: values.genres?.split(", ") ?? data.genres,
						};
						await dispatch(updateMovie(id, obj))
						history.goBack();
					}}
				>
					<Box boxShadow={10} borderRadius={16} borderColor="primary.main" {...defaultProps}>
						<Form>
							<h3>Edit Movie</h3>
							<label htmlFor="name">Name: </label>
							<Field required id="name" name="name" placeholder="movie's name" />
							<br />

							<label htmlFor="genres">Genres: </label>
							<Field required id="genres" name="genres" placeholder="Drama,Thriller" />
							<br />

							<label htmlFor="image">Image url: </label>
							<Field required id="image" name="image" placeholder="Image URL" />
							<br />

							<label htmlFor="date">Premiered: </label>
							<Field required id="premiered" name="premiered" type="date" />
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

export default EditMovie;
