import React from 'react';
import styled from 'emotion/react';
import propTypes from 'prop-types';

import SpeechRecognize from '../../utils';

const Microphone = styled.div`
	position: fixed;
	right: calc(50vw - 100px);
	bottom: 0;
	cursor: pointer;
	z-index: 10;
	transition: all 1s ease;
	animation-fill-mode: forwards;
	text-align: center;
	transform: ${(props) => (props.isSpeaking ? 'translate3d(0, calc(-45vh), 0) scale(2.3)' : '')};
`;

const Text = styled.div`
	font-size: 1.1em;
	color: white;
	opacity: ${(props) => (props.isSpeaking ? '1' : '0')};
	transition: all 1s ease;
	width: 300px;
	margin-top: .5em;
`;

/**
 * Кнопка для начала распознавания речи
 *
 * @export
 * @param {any} props
 * @returns
 */
export default class SpeechButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			reply: '',
			isListening: false,
		};
	}

	set reply(text) {
		return this.setState({reply: text});
	}

	set listening(listening) {
		return this.setState({isListening: listening});
	}

	handleSpeechException(e) {
		switch (e.error) {
			case 'no-speech':
				this.reply = 'Тебя не слышно!';
				break;
			default:
				this.reply = 'Что-то пошло не так!';
		}
	}

	/**
	 * Коллбэк распознавания речи
	 * Внутри себя рекурсивно вызывает распознаватель до тех пор,
	 * пока не услышит "Стоп-фразу" =)
	 *
	 * @param {boolean} isSpeaking
	 * @returns
	 * @memberof SpeechButton
	 */
	talk(isSpeaking) {
		this.props.onClick();

		// let tryCount = 0;
		// if (isSpeaking || this.state.isListening) return;

		// this.listening = true;

		const recognizer = new SpeechRecognize(this.props.user);
		recognizer.start().then((reply) => {
			this.reply = reply;
			window.setTimeout(this.props.onClick, 2000);
		}).catch((err) => {
			this.reply = err;
		});

		// const recognizePhrase = () => {
		// 	recognizeSpeech().then((transcript) => {
		// 		this.reply = transcript;
		// 		if (transcript === 'Обращайся, дружище') {
		// 			this.listening = false;
		// 		} else {
		// 			recognizePhrase();
		// 		}
		// 	}).catch((e) => {
		// 		this.handleSpeechException(e);
		// 		if (tryCount < 2) {
		// 			tryCount += 1;
		// 			recognizePhrase();
		// 		} else {
		// 			this.listening = false;
		// 		}
		// 	});
		// };

		// recognizePhrase();
	}

	render() {
		const text = 'Привет!';

		return (
			<Microphone
				{...this.props}
				onClick={() => this.talk(this.props.isSpeaking)}>

				<img
					alt='mic'
					width='70'
					height='70'
					src='/assets/mic.png' />

				<Text {...this.props}>
					{this.state.reply ? this.state.reply : text}
				</Text>
			</Microphone>
		);
	}
}

SpeechButton.defaultProps = {
	isSpeaking: false,
};

SpeechButton.propTypes = {
	isSpeaking: propTypes.bool,
	onClick: propTypes.func.isRequired,
};

