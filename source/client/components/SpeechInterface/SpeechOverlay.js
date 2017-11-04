import React from 'react';
import {css} from 'emotion';
import propTypes from 'prop-types';

const Overlay = (props) => css`
	position: absolute;
	width: 100%;
	height: 100%;
	cursor: pointer;
	z-index: 5;
	background: rgba(0, 0, 0, 0.8);
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

	componentDidMount() {
		this.overlay.addEventListener('webkitTransitionEnd', () => {
			if (!this.props.visible) {
				this.setState({hidden: true});
			}
		});
	}

	componentWillReceiveProps(newProps) {
		if (newProps.visible) {
			this.setState({hidden: false});
		}
	}

	render() {
		return (
			<div
				{...this.props}
				ref={(overlay) => (this.overlay = overlay)} // eslint-disable-line
				className={Overlay({visible: this.props.visible, hidden: this.state.hidden})} />
		);
	}
}

SpeechOverlay.defaultProps = {
	visible: false,
};

SpeechOverlay.propTypes = {
	visible: propTypes.bool,
};
