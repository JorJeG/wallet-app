import React from 'react';
import styled from 'emotion/react';
import propTypes from 'prop-types';

const User = styled.div`
	display: flex;
	align-items: center;
	font-size: 15px;
	color: #000;
`;

const Avatar = styled.img`
	width: 42px;
	height: 42px;
	border-radius: 50%;
	margin-right: 10px;
`;

const LogoutLink = styled.a`
	color: grey;
	font-size: .8em;
`;

export default function UserInfo(props) {
	return (
		<User>
			<Avatar src={props.user.avatar_url} />

			<div>
				<div>{props.user.name}</div>
				<LogoutLink onClick={() => props.onLogout()}>
					Выйти
				</LogoutLink>
			</div>

		</User>
	);
}

UserInfo.propTypes = {
	user: propTypes.shape({
		name: propTypes.string,
		avatar_url: propTypes.string,
	}),
	onLogout: propTypes.func.isRequired,
};
