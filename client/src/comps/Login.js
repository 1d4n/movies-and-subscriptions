import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { signin } from "../actions/auth";
import { Button, TextField, Box, Paper, Avatar, Typography, CircularProgress } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const validationSchema = yup.object({
	username: yup.string("Enter your username").required("Username is required"),
	password: yup.string("Enter your password").required("Password is required"),
});

const Login = () => {
	const paperStyle = {
		padding: 20,
		width: 280,
		margin: "20px auto",
	};
	const avatarStyle = { backgroundColor: "rgb(0 123 255 / 25%)" };
	const btnstyle = { margin: "8px 0" };

	let history = useHistory();
	const dispatch = useDispatch();
	const [loaded, setLoaded] = useState(true);

	useEffect(() => {
		if (localStorage.getItem("user")) history.push("/panel");
	}, [history]);

	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			const validateLogin = async () => {
				await dispatch(signin(values.username, values.password, history));
				setLoaded(true);
			};
			setLoaded(false);
			validateLogin();
		},
	});

	return (
		<>
				<Paper elevation={15} style={paperStyle}>
					<Box align="center">
						<Avatar style={avatarStyle}>
							<LockOutlinedIcon />
						</Avatar>
						<h2>Login Page</h2>
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
							Login
						</Button>
					</form>
					<Typography>
						New User? :<Link to="/signup">Create Account</Link>
					</Typography>
					{!loaded && <CircularProgress />}
				</Paper>
		</>
	);
};

export default Login;
