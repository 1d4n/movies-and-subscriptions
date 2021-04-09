import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import UsersManagement from "./AdminPanel/Header";
import MoviesManagement from "./MoviesPanel/Header";
import SubscriptionsManagement from "./SubscriptionsPanel/Header";
import { getMembers } from "../actions/members";
import { getMovies } from "../actions/movies";
import { getSubscriptions } from "../actions/subscriptions";
import { logout } from "../actions/auth";
import { Button, ButtonGroup } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Alert from "react-bootstrap/Alert";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#1d46ade6",
			contrastText: "#fff",
		},
		secondary: {
			light: "#ff7961",
			main: "#f44336",
			dark: "#ba000d",
			contrastText: "#000",
		},
	},
});

const MainPanel = () => {
	let { path } = useRouteMatch();
	const dispatch = useDispatch();
	const [connectedUser] = useState(JSON.parse(localStorage.getItem("user")));
    const location = useLocation();
    
	useEffect(() => {
		const timeout = localStorage.getItem("timeout");
		if (timeout && timeout < new Date().getTime()) {
			dispatch({ type: "LOGOUT" });
			alert("Session time is over!");
			window.location.reload();
		}
	}, [dispatch, location]);

	return (
		<div>
			<Alert variant="primary">
				<u>
					<h2>Welcome {connectedUser?.username}!</h2>
				</u>
			</Alert>
			<Menu />
			<hr />

			<Switch>
				<Route exact path={path}></Route>
				<Route path={`${path}/admin`} component={UsersManagement}></Route>
				<Route path={`${path}/movies`} component={MoviesManagement} />
				<Route path={`${path}/subscriptions`} component={SubscriptionsManagement} />
			</Switch>
		</div>
	);
};

function Menu() {
	const dispatch = useDispatch();
	let { url } = useRouteMatch();
	let history = useHistory();
	const [connectedUser] = useState(JSON.parse(localStorage.getItem("user")));

	useEffect(() => {
        let mounted = false;
        
		const getData = async () => {
			if (!connectedUser) {
				history.push("/");
			} else if (!mounted) {
				dispatch(getMembers());
				dispatch(getMovies());
				dispatch(getSubscriptions());
			}
		};

		getData();
		return () => {
			mounted = true;
		};
	}, [dispatch, history, connectedUser]);

	const handleSubscriptionsButton = () => {
		if (connectedUser?.permissions?.includes("View Subscriptions")) {
			history.push(url + "/subscriptions");
			dispatch({ type: "MEMBER_ID", payload: "" });
			dispatch({ type: "MOVIE_ID", payload: "" });
		} else alert("You are not allowed to view subscriptions!");
	};

	const handleMoviesButton = () => {
		if (connectedUser?.permissions?.includes("View Movies")) {
			history.push(url + "/movies");
			dispatch({ type: "MEMBER_ID", payload: "" });
			dispatch({ type: "MOVIE_ID", payload: "" });
		} else alert("You are not allowed to view movies!");
	};

	let items = "";
	let adminButton = connectedUser?.permissions?.includes("Create Subscriptions") && (
		<Button
			onClick={() => {
				history.push(url + "/admin/all");
				dispatch({ type: "MEMBER_ID", payload: "" });
				dispatch({ type: "MOVIE_ID", payload: "" });
			}}>
			Users Management
		</Button>
	);

	if (connectedUser) {
		items = (
			<div>
				<ThemeProvider theme={theme}>
					<ButtonGroup
						variant="contained"
						color="primary"
						size="small"
						aria-label="contained primary button group">
						<Button onClick={handleMoviesButton}>Movies</Button>
						<Button onClick={handleSubscriptionsButton}>Subscriptions</Button>
						{adminButton}
						<Button
							onClick={() => {
								dispatch(logout(history));
							}}>
							Logout
						</Button>
					</ButtonGroup>
				</ThemeProvider>
			</div>
		);
	}

	return <div>{items}</div>;
}

export default MainPanel;
