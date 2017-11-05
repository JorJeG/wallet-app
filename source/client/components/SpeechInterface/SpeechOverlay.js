import React from 'react';
import {css} from 'emotion';
import propTypes from 'prop-types';

const Overlay = (props) => css`
	position: absolute;
	width: 100%;
	height: 100%;
	cursor: pointer;
	z-index: 5;
	background: rgba(0, 0, 0, 0.85);
	transition: opacity 1s ease;
	left: ${props.hidden ? '-99999px' : '0'};
	opacity: ${props.visible ? 1 : 0};
`;

/**
 * Оверлей, который появляется, когда начинается распознование речи
 *
 * @export
 * @class SpeechOverlay
 * @extends {React.Component}
 */
export default class SpeechOverlay extends React.Component {
	constructor(props) {
		super(props);
		this.state = {hidden: true};
	}

	/**
	 * Закрытие оверлея по клику, по нажатию ESC,
	 * обработка правильного конца анимации
	 */
	componentDidMount() {
		this.overlay.addEventListener('click', this.props.onPress);

		window.addEventListener('keyup', (e) => {
			if (e.keyCode !== 27) return;
			this.props.onPress();
		});

		this.overlay.addEventListener('webkitTransitionEnd', () => {
			if (!this.props.visible) {
				this.setState({hidden: true});
			}
		});
	}

	// Обработка правильности анимации
	componentWillReceiveProps(newProps) {
		if (newProps.visible) {
			this.setState({hidden: false});
		}
	}

	render() {
		return (
			<div
				ref={(overlay) => (this.overlay = overlay)} // eslint-disable-line
				className={Overlay({visible: this.props.visible, hidden: this.state.hidden})} />
		);
	}
}

SpeechOverlay.defaultProps = {
	visible: false,
	onPress: () => {},
};

SpeechOverlay.propTypes = {
	visible: propTypes.bool,
	onPress: propTypes.func,
};
