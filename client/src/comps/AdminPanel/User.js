import React from "react";
import { useDispatch } from 'react-redux';
import { deleteUserById } from "../../actions/users";
import { useHistory } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
	},
	customWidth: {
		maxWidth: 500,
	},
	noMaxWidth: {
		maxWidth: "none",
	},
}));

const User = (props) => {
    const dispatch = useDispatch();
	const history = useHistory();
	const user = props.data;
	const perms = React.useRef(null);

	const deleteUser = async () => {
		if (!user.permissions?.includes("Create Subscriptions") && user.username !== "Admin") {
			let resp = await dispatch(deleteUserById(user._id));
			if (resp !== "Error") {
				alert("The user has been successfully deleted!");
			} else {
				alert("Couldn't delete the user!");
			}
		} else {
			alert("You can't delete this user!");
		}
	};

	const defaultProps = {
		bgcolor: "background.paper",
		m: 2,
		p: 1,
		border: 2,
		// style: { width: '5rem', height: '5rem' },
	};
	const classes = useStyles();

	return (
		<div>
			<Box borderColor="text.primary" {...defaultProps} textAlign="left">
				<strong>
					<u>Name:</u>
				</strong>{" "}
				{user.firstName + " " + user.lastName}
				<br />
				<strong>
					<u>Username:</u>
				</strong>{" "}
				{user.username}
				<br />
				<strong>
					<u> Session Timeout(minutes):</u>
				</strong>{" "}
				{user.sessionTimeout}
				<br />
				<strong>
					<u> Created date:</u>
				</strong>{" "}
				{new Date(user.createdDate).toLocaleDateString("en-GB")}
				<br />
				<strong>
					<u> Permissions:</u>
				</strong>
				<Tooltip
					ref={perms}
					title={
						<React.Fragment>
							<Typography variant="caption" gutterBottom>
								{user.permissions?.join(", ")}
							</Typography>
						</React.Fragment>
					}
					classes={{ tooltip: classes.noMaxWidth }}
				>
					<Button className={classes.button} onMouseOver={() => perms.current.focus()}>
						{" "}
						permissions
					</Button>
				</Tooltip>
				<br />
				<br />
				<Button
					variant="outlined"
					color="primary"
					size="small"
					onClick={() => history.push(`/panel/admin/edit/${user._id}`)}
				>
					Edit
				</Button>
				<Button variant="outlined" color="secondary" size="small" onClick={deleteUser}>
					Delete
				</Button>
			</Box>
		</div>
	);
};

export default User;
