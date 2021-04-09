import React from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import userUtils from "../utils/userUtils";
import { Box, Paper, Avatar, TextField, Button } from "@material-ui/core";
import LockOpen from "@material-ui/icons/LockOpen";

const validationSchema = yup.object({
	username: yup.string("Enter your username").required("Username is required"),
	password: yup
		.string("Enter your password")
		.min(6, "Password should be of minimum 6 characters length")
		.required("Password is required"),
});

const SignUp = () => {
	const paperStyle = {
		padding: 20,
		width: 280,
		margin: "20px auto",
	};
	const avatarStyle = { backgroundColor: "rgb(0 123 255 / 25%)" };
	const btnstyle = { margin: "8px 0" };

	let history = useHistory();

	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				const data = await userUtils.signup(values.username, values.password);
				alert(data.message);
				if (data.message?.includes("registered")) history.push("/");
			} catch (err) {
				alert(err);
				if (String(err).includes("registered")) history.push("/");
			}
		},
	});

	return (
		<>
			<Paper elevation={10} style={paperStyle}>
				<Box align="center">
					<Avatar style={avatarStyle}>
						<LockOpen />
					</Avatar>
					<h2>Create an Account</h2>
				</Box>

				<form onSubmit={formik.handleSubmit}>
					<TextField
						fullWidth
						id="username"
						name="username"
						label="Username"
						onChange={formik.handleChange}
						error={formik.touched.username && Boolean(formik.errors.username)}
						helperText={formik.touched.username && formik.errors.username}
					/>
					<TextField
						fullWidth
						id="password"
						name="password"
						label="Password"
						type="password"
						value={formik.values.password}
						onChange={formik.handleChange}
						error={formik.touched.password && Boolean(formik.errors.password)}
						helperText={formik.touched.password && formik.errors.password}
					/>
					<Button color="primary" variant="contained" fullWidth type="submit" style={btnstyle}>
						Sign-Up
					</Button>
					<Button variant="contained" fullWidth onClick={() => history.goBack()} style={btnstyle}>
						Go Back
					</Button>
				</form>
			</Paper>
		</>
	);
};

export default SignUp;
