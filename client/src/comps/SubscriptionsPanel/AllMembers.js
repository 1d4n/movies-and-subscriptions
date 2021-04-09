import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteMember } from "../../actions/members";
import { getSubscriptions } from "../../actions/subscriptions";
import Member from "./Member";
import { Grid, CircularProgress } from "@material-ui/core";

function AllMembers() {
	const data = useSelector((state) => state.members);
	const dispatch = useDispatch();
	const specificMemberId = useSelector((state) => state.specific.memberId);

	let items = Array.isArray(data) ? (
		!specificMemberId || specificMemberId?.length < 10 ? (
			[...data].reverse().map((member, index) => (
				<Member
					key={index}
					data={data.find((m) => m._id === member._id)}
					deleteCallback={async () => {
						await dispatch(deleteMember(member._id));
						dispatch(getSubscriptions());
					}}
				/>
			))
		) : (
			<Member
				data={data.find((m) => m._id === specificMemberId) ?? {}}
				deleteCallback={async () => {
					await dispatch(deleteMember(specificMemberId));
					dispatch({ type: "MEMBER_ID", payload: "" });
				}}
			/>
		)
	) : (
		[]
	);

	return (
		<div>
			<br />
			{!items && <CircularProgress />}
			<Grid container direction="column" justify="center" alignItems="center">
				{items}
			</Grid>
			<br /> <br />
		</div>
	);
}

export default AllMembers;
