import React, {Component} from 'react';
import styled from 'emotion/react';
import {injectGlobal} from 'emotion';
import CardInfo from 'card-info';
import axios from 'axios';

import {
	CardsBar,
	Header,
	History,
	Prepaid,
	MobilePayment,
	Withdraw,
} from './';

import {
	SpeechButton,
	SpeechOverlay,
} from './SpeechInterface';

import './fonts.css';

injectGlobal([`
	html,
	body {
		margin: 0
	}

	#root {
		height: 100%
		font-family: 'Open Sans'
		color: #000
	}
`]);

const Wallet = styled.div`
	display: flex;
	min-height: 100%;
	background-color: #fcfcfc;
	position: relative;
`;

const CardPane = styled.div`
	flex-grow: 1;
`;

const Workspace = styled.div`
	display: flex;
	flex-wrap: wrap;
	max-width: 970px;
	padding: 15px;
`;

/**
 * Приложение
 */
class App extends Component {
	/**
	 * Подготавливает данные карт
	 *
	 * @param {Object} cards данные карт
	 * @returns {Object[]}
	 */
	static prepareCardsData(cards) {
		return cards.map((card) => {
			const cardInfo = new CardInfo(card.cardNumber, {
				banksLogosPath: '/assets/',
				brandsLogosPath: '/assets/'
			});

			return {
				id: card.id,
				balance: card.balance,
				number: cardInfo.numberNice,
				bankName: cardInfo.bankName,
				theme: {
					bgColor: cardInfo.backgroundColor,
					textColor: cardInfo.textColor,
					bankLogoUrl: cardInfo.bankLogoSvg,
					brandLogoUrl: cardInfo.brandLogoSvg,
					bankSmLogoUrl: `/assets/${cardInfo.bankAlias}-history.svg`
				}
			};
		});
	}

	static prepareHistory(cardsList, transactionsData) {
		return transactionsData.map((data) => {
			const card = cardsList.find((item) => item.id === Number(data.cardId));
			return card ? Object.assign({}, data, {card}) : data;
		});
	}

	/**
	 * Конструктор
	 */
	constructor(props) {
		super();

		const data = props.data;
		const cardsList = App.prepareCardsData(data.cards);
		const cardHistory = App.prepareHistory(cardsList, data.transactions);

		this.state = {
			cardsList,
			cardHistory,
			activeCardIndex: 0,
			removeCardId: 0,
			isCardRemoving: false,
			isCardsEditable: false,
			isCardAdding: false,
			isSpeaking: false
		};
	}

	/**
	 * Обработчик переключения карты
	 *
	 * @param {Number} activeCardIndex индекс выбранной карты
	 */
	onCardChange(activeCardIndex) {
		this.setState({activeCardIndex});
	}

	/**
	* Обработчик события добавления карты
	* @param {Boolean} isEditable Признак редактируемости
	*/
	onAddChange() {
		this.setState({
			isCardAdding: true,
		});
	}

	/**
	* Обработчик события редактирования карт
	* @param {Boolean} isEditable Признак редактируемости
	*/
	onEditChange(isEditable) {
		const isCardsEditable = !isEditable;
		this.setState({
			isCardsEditable,
			isCardRemoving: false
		});
	}

	/**
	* Функция вызывает при успешной транзакции
	*/
	onTransaction() {
		axios.get('/cards').then(({data}) => {
			const cardsList = App.prepareCardsData(data);
			this.setState({cardsList});

			axios.get('/transactions').then(({data}) => {
				const cardHistory = App.prepareHistory(cardsList, data);
				this.setState({cardHistory});
			});
		});
	}

	/**
	* Функция вызывает при успешном добавлении карты
	*/
	onAdd() {
		axios.get('/cards').then(({data}) => {
			const cardsList = App.prepareCardsData(data);
			this.setState({cardsList, isCardAdding: false});
		}).then(() => this.onTransaction());
	}

	/**
	* Функция вызывает при успешном удалении карты
	*/
	onDelete() {
		axios.get('/cards').then(({data}) => {
			const cardsList = App.prepareCardsData(data);
			this.setState({
				cardsList,
				activeCardIndex: 0,
				isCardRemoving: false,
				isCardsEditable: false
			});
		});
	}

	/**
	 * Обработчик события переключения режима сайдбара
	 * @param {String} mode Режим сайдбара
	 * @param {String} index Индекс выбранной карты
	 */
	onChangeBarMode(event, removeCardId) {
		event.stopPropagation();
		this.setState({
			isCardRemoving: true,
			removeCardId
		});
	}
	onCancelClick(isReturn) {
		const isCardRemoving = isReturn;
		this.setState({
			isCardRemoving,
			isCardsEditable: false,
			isCardAdding: false
		});
	}

	checkEmpty() {
		axios.get('/cards').then(({data}) => {
			const cardsList = App.prepareCardsData(data);
			if (cardsList.length === 0) {
				this.setState({
					isCardAdding: true
				});
			}
		});
	}

	/**
	 * Удаление карты
	 * @param {Number} index Индекс карты
	 */
	deleteCard(id) {
		axios
			.delete(`/cards/${id}`)
			.then(() => this.checkEmpty())
			.then(() => this.onDelete());
	}
	/**
	 * Рендер компонента
	 *
	 * @override
	 * @returns {JSX}
	 */
	render() {
		const {
			cardsList,
			activeCardIndex,
			cardHistory,
			isCardsEditable,
			isCardRemoving,
			isCardAdding,
			removeCardId
		} = this.state;
		const activeCard = cardsList[activeCardIndex];
		const inactiveCardsList = cardsList.filter((card, index) => (index === activeCardIndex ? false : card));

		return (
			<Wallet>
				<CardsBar
					activeCardIndex={activeCardIndex}
					removeCardId={removeCardId}
					cardsList={cardsList}
					onCancelClick={() => this.onCancelClick(false)}
					onCardChange={(index) => this.onCardChange(index)}
					onEditChange={() => this.onEditChange(isCardsEditable)}
					onAddChange={() => this.onAddChange()}
					onAdd={() => this.onAdd()}
					isCardsEditable={isCardsEditable}
					isCardRemoving={isCardRemoving}
					isCardAdding={isCardAdding}
					deleteCard={(index) => this.deleteCard(index)}
					onChangeBarMode={(event, index) => this.onChangeBarMode(event, index)} />
				<CardPane>
					<Header cardsList={cardsList} activeCard={activeCard} user={this.props.data.user} />
					<Workspace>
						{cardsList.length > 0 && <History cardHistory={cardHistory.filter((data) => {
							return Number(data.cardId) == activeCard.id;
						})} />}
						{cardsList.length > 1 && <Prepaid
							user={this.props.data.user}
							activeCard={activeCard}
							inactiveCardsList={inactiveCardsList}
							onCardChange={(newActiveCardIndex) => this.onCardChange(newActiveCardIndex)}
							onTransaction={() => this.onTransaction()} />}
						{cardsList.length > 0 && <MobilePayment
							user={this.props.data.user}
							activeCard={activeCard}
							onTransaction={() => this.onTransaction()} />}
						{cardsList.length > 1 && <Withdraw
							user={this.props.data.user}
							activeCard={activeCard}
							inactiveCardsList={inactiveCardsList}
							onTransaction={() => this.onTransaction()} />}
					</Workspace>
				</CardPane>

				<SpeechButton
					isSpeaking={this.state.isSpeaking}
					onClick={() => this.setState({isSpeaking: !this.state.isSpeaking})} />

				<SpeechOverlay
					onPress={() => this.setState({isSpeaking: !this.state.isSpeaking})}
					visible={this.state.isSpeaking} />

			</Wallet>
		);
	}
}

export default App;
