import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../../actions/users";
import { Formik, Form, Field, FieldArray } from "formik";
import { useHistory } from "react-router-dom";
import { Button, Box, Checkbox } from "@material-ui/core";
import "./style.css";

const defaultProps = {
	bgcolor: "background.paper",
	m: 1,
	p: 2,
	border: 2,
	// style: { width: "5rem", height: "5rem" },
};

const AddUser = () => {
	const users = useSelector((state) => state.users);
	const dispatch = useDispatch();
	const history = useHistory();

	const tagsArray = [
		"View Subscriptions",
		"Create Subscriptions",
		"Delete Subscriptions",
		"Update Subscriptions",
		"View Movies",
		"Create Movies",
		"Delete Movies",
		"Update Movies",
	];

	return (
		<div>
			<Box display="flex" justifyContent="center">
				<Formik
					initialValues={{
						firstName: "",
						lastName: "",
						username: "",
						sessionTimeout: 0,
						checked: [],
					}}
					onSubmit={async (values) => {
						if (values.firstName && values.lastName && values.username) {
							if (
								!values.checked?.includes("View Subscriptions") &&
								(values.checked?.includes("Create Subscriptions") ||
									values.checked?.includes("Delete Subscriptions") ||
									values.checked?.includes("Update Subscriptions"))
							) {
								values.checked?.push("View Subscriptions");
							}
							if (
								!values.checked?.includes("View Movies") &&
								(values.checked?.includes("Create Movies") ||
									values.checked?.includes("Delete Movies") ||
									values.checked?.includes("Update Movies"))
							) {
								values.checked?.push("View Movies");
							}

							if (!users.find((u) => u.username === values.username)) {
								let resp = await dispatch(addUser({ ...values }));
								if (resp !== "Error") {
									alert("Added the new User!");
									history.push("/panel/admin/all");
								} else {
									alert("Error! couldn't add the new User");
									history.goBack();
								}
							} else {
								alert("Username already exists!");
							}
						} else {
							alert("Invalid Data");
						}
					}}
				>
					{({ values, isSubmitting }) => (
						<Box boxShadow={10} borderRadius={16} borderColor="primary.main" {...defaultProps}>
							<Form>
								<h3>Add New User</h3>
								<label htmlFor="firstName">First Name: </label>
								<Field required name="firstName" placeholder="First Name" />
								<br />

								<label htmlFor="lastName">Last Name: </label>
								<Field required name="lastName" placeholder="Last Name" />
								<br />

								<label htmlFor="username">Username: </label>
								<Field required name="username" placeholder="Username" />
								<br />

								<label htmlFor="sessionTimeout">Session Timeout (minutes): </label>
								<Field required name="sessionTimeout" type="number" min="0" />
								<br />

								<div id="checkbox-group">
									<strong>Permissions:</strong>
								</div>
								<div role="group" aria-labelledby="checkbox-group">
									<FieldArray
										name="checked"
										render={(arrHelper) => (
											<div>
												{tagsArray.map((tag) => {
													if (tag.includes("View")) {
														return (
															<div key={tag}>
																<Checkbox
																	color="primary"
																	inputProps={{
																		"aria-label": tag,
																	}}
																	name="checked"
																	type="checkbox"
																	value={tag}
																	checked={
																		values.checked?.includes(tag) ||
																		values.checked?.includes(
																			"Create " + tag.split(" ")[1]
																		) ||
																		values.checked?.includes(
																			"Update " + tag.split(" ")[1]
																		) ||
																		values.checked?.includes(
																			"Delete " + tag.split(" ")[1]
																		)
																	}
																	onChange={(e) => {
																		if (e.target.checked) {
																			arrHelper.push(tag);
																		} else {
																			let tagType = " " + tag.split(" ")[1];
																			if (
																				!values.checked?.includes(
																					"Create" + tagType
																				) &&
																				!values.checked?.includes(
																					"Update" + tagType
																				) &&
																				!values.checked?.includes(
																					"Delete" + tagType
																				)
																			) {
																				let idx = values.checked?.indexOf(tag);
																				arrHelper.remove(idx);
																			}
																		}
																	}}
																/>
																<label>{tag}</label>
																<br />
															</div>
														);
													} else {
														return (
															<div key={tag}>
																<Checkbox
																	color="primary"
																	inputProps={{
																		"aria-label": tag,
																	}}
																	name="checked"
																	type="checkbox"
																	value={tag}
																	checked={values.checked?.includes(tag)}
																	onChange={(e) => {
																		if (e.target.checked) {
																			arrHelper.push(tag);
																		} else {
																			const idx = values.checked?.indexOf(tag);
																			arrHelper.remove(idx);
																		}
																	}}
																/>
																<label>{tag}</label>
																<br />
															</div>
														);
													}
												})}
											</div>
										)}
									/>
									<br />
								</div>
								<br />

								<Button
									variant="contained"
									size="small"
									color="primary"
									type="submit"
									disabled={isSubmitting}
								>
									Save
								</Button>

								<Button
									variant="contained"
									size="small"
									onClick={(e) => {
										e.preventDefault();
										history.goBack();
									}}
								>
									Cancel
								</Button>
							</Form>
						</Box>
					)}
				</Formik>
			</Box>
			<br />
			<br />
		</div>
	);
};

export default AddUser;
