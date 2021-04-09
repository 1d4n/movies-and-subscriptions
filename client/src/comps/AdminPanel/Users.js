import React, { useState, useEffect } from "react";
import { useSelector, useDispatch  } from 'react-redux';
import { useHistory } from "react-router-dom";
import UserComp from "./User";
import { getUsers } from "../../actions/users";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const UsersComp = () => {
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();
	const [showUsers, setShowUsers] = useState(true);

    let history = useHistory();

    useEffect(() => {
        if (!users.length) {
            dispatch(getUsers())
        }
    }, [dispatch, users.length])

	
	let items = users.map((user) => (
		<UserComp key={user._id} data={users.find((u) => u._id === user._id)} />
	));

	return (
		<div>
			<Button size="small" variant="contained" color="primary" onClick={() => setShowUsers(!showUsers)}>
				All Users
			</Button>
			<Button size="small" variant="contained" onClick={() => history.push("/panel/admin/add")}>
				Add User
			</Button>
			<br />

            
				{showUsers && <Grid container direction="column" justify="center" alignItems="center">
					{items}
				</Grid>}
				<br /> <br />
		</div>
	);
};

export default UsersComp;
