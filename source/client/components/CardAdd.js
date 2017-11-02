import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';
import axios from 'axios';
import {Button, Input} from './';

const CardLayout = styled.div`
	position: relative;
	width: 260px;
	height: 164px;
	box-sizing: border-box;
	margin-bottom: ${({isSingle}) => (isSingle ? 0 : '15px')};
	padding: 25px 20px 20px 25px;
	border-radius: 4px;
	background-color: ${({bgColor, active}) => (active ? bgColor : 'rgba(255, 255, 255, 0.1)')};
`;

const CardLogo = styled.div`
	height: 28px;
	margin-bottom: 25px;
	background-image: url(${({url}) => url});
	background-size: contain;
	background-repeat: no-repeat;
	filter: ${({active}) => (active ? 'none' : 'grayscale(100%) opacity(60%)')};
`;

const CardNumber = styled.div`
	margin-bottom: 20px;
	color: ${({active, textColor}) => (active ? textColor : 'rgba(255, 255, 255, 0.6)')};
	font-size: 16px;
	font-family: 'OCR A Std Regular';
`;

const CardType = styled.div`
	height: 26px;
	background-image: url(${({url}) => url});
	background-size: contain;
	background-repeat: no-repeat;
	background-position-x: right;
	opacity: ${({active}) => (active ? '1' : '0.6')};
`;

const InputCardNumber = styled(Input)`
	width: 220px;
`;

const CardAddLayout = styled.div`
	flex: 1;
	width: 260px;
`;

const Title = styled.div`
	font-size: 20px;
	font-weight: 500;
	letter-spacing: 0.9px;
	color: #ffffff;
	margin-bottom: 10px;
`;

const Description = styled.div`
	font-size: 15px;
	font-weight: 100;
	line-height: 1.6;
	letter-spacing: 0.5px;
	color: #ffffff;
	margin-bottom: 26px;
`;

const LinkCardText = styled.div`
	opacity: 0.4;
	font-size: 11px;
	line-height: 2.18;
	letter-spacing: 0.5px;
	color: #ffffff;
	margin-top: 4px;
`;

const Footer = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 35px;
`;

class CardAdd extends Component {
	/**
	 * Конструктор
	 *
	 * @param {Object} props свойства компонента
	 */
	constructor(props) {
		super(props);

		this.state = {
			cardNumber: '',
			balance: 1000
		};
	}

	/**
	 * Обработка изменения значения в input
	 * @param {Event} event событие изменения значения input
	 */
	onChangeInputValue(event) {
		if (!event) {
			return;
		}

		const {name, value} = event.target;
		if (value.replace(/\s/g, '').length === 16 || value.match(/[^0-9|\s]/g)) {
			return;
		}

		this.setState({
			[name]: value.replace(/\s/g, '').length % 4 === 0 ? `${value} ` : value
		});
	}

	/**
	 * Добавление карты
	 * @param {Number} index Индекс карты
	 */
	createCard() {
		const {cardNumber, balance} = this.state;

		axios
			.post('/cards/', {cardNumber, balance})
			.then(() => this.props.onAdd());
	}
	render() {
		const {theme} = this.props.data;
		const {onCancelClick} = this.props;
		const {bgColor, textColor, bankLogoUrl, brandLogoUrl} = theme;
		return (
			<CardAddLayout>
				<Title>Добавление карты</Title>
				<Description>
					Введите номер своей карты:
				</Description>
				<CardLayout
					bgColor={bgColor}
					isSingle>
					<CardLogo url={bankLogoUrl} />
					<CardNumber textColor={textColor} >
						<InputCardNumber
							name='cardNumber'
							placeholder='0000 0000 0000 000'
							value={this.state.cardNumber}
							onChange={(event) => this.onChangeInputValue(event)} />
					</CardNumber>
					<CardType url={brandLogoUrl} />
				</CardLayout>
				<LinkCardText>Привязать карту можно в любой момент</LinkCardText>
				<Footer>
					<div onClick={() => this.createCard()}>
						<Button bgColor='#d3292a' textColor='#fff'>Добавить</Button>
					</div>
					<div onClick={() => onCancelClick(true)}>
						<Button bgColor='#1F1F1F' textColor='#fff'>Вернуться</Button>
					</div>
				</Footer>
			</CardAddLayout>
		);
	}
}

CardAdd.propTypes = {
	data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onCancelClick: PropTypes.func.isRequired,
	onAdd: PropTypes.func.isRequired
};

export default CardAdd;
