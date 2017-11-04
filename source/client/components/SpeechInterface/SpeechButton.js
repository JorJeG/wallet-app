import React from 'react';
import styled from 'emotion/react';
import propTypes from 'prop-types';

import {recognizeSpeech} from '../../utils';

const Microphone = styled.img`
	position: fixed;
	right: calc(50vw - 35px);
	bottom: 30;
	cursor: pointer;
	z-index: 10;
	transition: all 1s ease;
	animation-fill-mode: forwards;
	transform: ${(props) => (props.isSpeaking ? 'translate3d(0, calc(-40vh), 0) scale(2.3)' : '')};
`;

/**
 * Кнопка для начала распознавания речи
 *
 * @export
 * @param {any} props
 * @returns
 */
export default function SpeechButton(props) {
	const talk = (isSpeaking) => {
		if (!isSpeaking) recognizeSpeech();
		props.onClick();
	};

	return (
		<Microphone
			{...props}
			alt='mic'
			width='70'
			height='70'
			src='/assets/mic.png'
			onClick={() => talk(props.isSpeaking)} />
	);
}

SpeechButton.defaultProps = {
	isSpeaking: false,
};

SpeechButton.propTypes = {
	isSpeaking: propTypes.bool,
	onClick: propTypes.func.isRequired,
};

