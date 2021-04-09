import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { useSelector, useDispatch } from "react-redux";

function SubscriptionWatched(props) {
	const members = useSelector((state) => state.members);
	const subscriptions = useSelector((state) => state.subscriptions);
	const dispatch = useDispatch();
	const [subs, setSubs] = useState([]);

	useEffect(() => {
		if (Array.isArray(subscriptions)) {
			const arr = []; // Array isn't a primitive type, so it can be const.
			for (let i = 0; i < subscriptions.length; i++) {
				for (let j = 0; j < subscriptions[i].movies.length; j++) {
					if (subscriptions[i].movies[j].movieId !== props.id) continue;
					arr.push({ memberId: subscriptions[i].memberId, date: subscriptions[i].movies[j].date });
				}
			}
			setSubs(arr);
		}
	}, [props.id, subscriptions]);

	let items = subs.map((sub, index) => {
		let memberData = members?.find((m) => m._id === sub.memberId);
		return (
			memberData && (
				<div key={index} style={{ display: "inline" }}>
					<small>
						<li>
							<Link
								to="subscriptions"
								onClick={() => {
									dispatch({ type: "MEMBER_ID", payload: sub.memberId });
								}}>
								{memberData.name}
							</Link>
							, {new Date(sub.date).toLocaleDateString()}
						</li>
					</small>
				</div>
			)
		);
	});

	const defaultProps = {
		bgcolor: "background.paper",
		m: 2,
	};

	return (
		<div>
			<Box borderColor="text.primary" {...defaultProps} textAlign="left">
				<strong>Subscription Watched:</strong>
				<ul>{items}</ul>
			</Box>
		</div>
	);
}

export default SubscriptionWatched;
