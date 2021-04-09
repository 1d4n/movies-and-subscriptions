import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Field, Form } from "formik";
import { Box, Button } from "@material-ui/core";
import { addMember } from "../../actions/members";

const defaultProps = {
	bgcolor: "background.paper",
	m: 1,
	p: 2,
	border: 2,
};

function AddMember() {
	let history = useHistory();
	const dispatch = useDispatch();

	return (
		<div>
			<Box display="flex" justifyContent="center">
				<Formik
					initialValues={{
						name: "",
						email: "",
						city: "",
					}}
					enableReinitialize
					onSubmit={(values) => {
						if (values.name && values.email && values.city) {
							dispatch(addMember(values));
							alert("The new member has been successfully created!");
							history.goBack();
						} else {
							alert("Invalid Data!");
						}
					}}
				>
					<Box boxShadow={10} borderRadius={16} borderColor="primary.main" {...defaultProps}>
						<Form>
							<h3>Add new Member</h3>
							<label htmlFor="name">Name: </label>
							<Field required id="name" name="name" placeholder="Enter name" />
							<br />

							<label htmlFor="email">Email: </label>
							<Field required id="email" name="email" type="email" placeholder="Enter email" />
							<br />

							<label htmlFor="city">City: </label>
							<Field required id="city" name="city" placeholder="Enter city" />
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

export default AddMember;
