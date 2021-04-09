import React from "react";
import { Route, Switch } from "react-router-dom";
import MainPanel from "./MainPanel";
import LoginComp from "./Login";
import SignUpComp from "./SignUp";
import "../style.css";
import logo from "../logo.png";
import Image from "react-bootstrap/Image";

const MainComp = () => {
	return (
		<div>
			<Image src={logo} fluid />

			<Switch>
				<Route path="/" exact component={LoginComp} />
				<Route path="/signup" component={SignUpComp} />
				<Route path="/panel" component={MainPanel} />
			</Switch>
			<br />

			<div className="footer">
				<h5>iDaN © 2021</h5>
			</div>
		</div>
	);
};

export default MainComp;
