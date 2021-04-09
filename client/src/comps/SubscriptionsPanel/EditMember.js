import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {updateMember} from '../../actions/members'
import { Box, Button } from "@material-ui/core";

const defaultProps = {
	bgcolor: "background.paper",
	m: 1,
	p: 2,
	border: 2,
};

function EditMember() {
	let history = useHistory();
	let { id } = useParams();
	const dispatch = useDispatch();
	const data = useSelector((state) => state.members?.find((m) => m._id === id));
	return (
		<div>
			<Box display="flex" justifyContent="center">
				<Formik
					initialValues={{
						name: data?.name ?? "",
						email: data?.email ?? "",
						city: data?.city ?? "",
					}}
					enableReinitialize
					onSubmit={(values) => {
                        dispatch(updateMember(id, values));
                        alert("The new member has been successfully updated!");
						history.goBack();
					}}
				>
					<Box boxShadow={10} borderRadius={16} borderColor="primary.main" {...defaultProps}>
						<Form>
							<h3>Edit Member</h3>
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

export default EditMember;
