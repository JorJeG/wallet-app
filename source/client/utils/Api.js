import axios from 'axios';

export const pay_mobile = ({
	targetCard, sum, user
}) => axios
	.post(`/cards/${targetCard}/pay`, {
		phoneNumber: '+79996776142',
		sum,
		mail: user.email,
		mailing: true
	});

export const card2card = ({
	user, sourceCard, targetCard, sum, callback
}) => {
	const options = {
		method: 'post',
		url: `/cards/${sourceCard}/transfer`,
		data: {
			target: targetCard,
			sum,
			user: user.realName,
			mail: user.email,
			mailing: true
		}
	};

	return axios(options);
};

export const withdraw = ({
	targetCard, sourceCard, user, sum
}) => {
	const options = {
		method: 'post',
		url: `/cards/${sourceCard}/transfer`,
		data: {
			target: targetCard,
			sum,
			user: user.realName,
			mail: user.email,
			mailing: true
		}
	};

	return axios(options);
};
