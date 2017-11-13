import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';
import RGL, {WidthProvider} from 'react-grid-layout';
import _ from 'lodash';
import {Card, CardDelete, CardAdd} from './';
import './card.css';

const ReactGridLayout = WidthProvider(RGL);

const Layout = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	background-color: #242424;
	padding: 20px;
`;

const Logo = styled.div`
	width: 147px;
	height: 28px;
	margin-bottom: 55px;
	background-image: url('/assets/yamoney-logo.svg');
`;

const Edit = styled.div`
	position: absolute;
	top: 17px;
	right: 12px;
	width: 34px;
	height: 35px;
	cursor: pointer;
	background-image: url('/assets/${({editable}) => (editable ? 'cards-edit-active' : 'cards-edit')}.svg');
	background-repeat: no-repeat;
	background-position: center center;
`;

const CardsList = styled.div`
	flex: 1;
`;

const Footer = styled.footer`
	color: rgba(255, 255, 255, 0.2);
	font-size: 15px;
`;

class CardsBar extends Component {
	static defaultProps = {
	className: "layout",
	items: 14,
	rowHeight: 8,
	onLayoutChange: function() {},
	cols: 1,
	isResizable: false
};

	constructor(props) {
		super(props);

		const layout = this.generateLayout();
		this.state = { layout };
	}

	generateLayout() {
		const p = this.props;
		return _.map(new Array(p.items), function(item, i) {
			const y = _.result(p, 'y') || Math.ceil(Math.random() * 4) + 1;
			return {x: i * 2 % 12, y: Math.floor(i / 6) * 10, w: 2, h: 10, i: i.toString()};
		});
	}

	onLayoutChange(layout) {
		this.props.onLayoutChange(layout);
	}

	render() {
		const {
			activeCardIndex,
			cardsList,
			onCardChange,
			onEditChange,
			onAddChange,
			isCardsEditable,
			isCardRemoving,
			isCardAdding,
			onChangeBarMode,
			removeCardId,
			deleteCard,
			onCancelClick,
			onAdd,
			user
		} = this.props;
		const onCardClick = (index) => {
			onCardChange && onCardChange(index);
		};
			if (isCardRemoving) {
				return (
					<Layout>
						<Logo />
						<CardDelete
							deleteCard={deleteCard}
							onCancelClick={onCancelClick}
							data={cardsList.filter((item) => item.id === removeCardId)[0]} />
						<Footer>Yamoney Node School</Footer>
					</Layout>
				);
			}

			if (isCardAdding || cardsList.length === 0) {
				return (
					<Layout>
						<Logo />
						<CardAdd
							user={user}
							onAdd={onAdd}
							data={cardsList[0]}
							onCancelClick={onCancelClick} />
						<Footer>Yamoney Node School</Footer>
					</Layout>
				);
			}
			return (
				<Layout>
					<Logo />
					<Edit onClick={onEditChange} />
					<CardsList className='container'>
						<ReactGridLayout
							layout={this.state.layout}
							onLayoutChange={this.onLayoutChange}
							{...this.props}>
							{cardsList
								.filter((item) => !item.hidden)
								.map((card, index) => (
									<div key={index}>
										<Card
											key={index}
											data={card}
											active={index === activeCardIndex}
											isCardsEditable={isCardsEditable}
											onChangeBarMode={onChangeBarMode}
											onClick={() => onCardClick(index)} />
									</div>
								))
							}
						</ReactGridLayout>
						<Card type='new' onAddChange={onAddChange} />
					</CardsList>
					<Footer>Yamoney Node School</Footer>
				</Layout>
			);
	}
}
// const CardsBar = ({
// 	activeCardIndex,
// 	cardsList,
// 	onCardChange,
// 	onEditChange,
// 	onAddChange,
// 	isCardsEditable,
// 	isCardRemoving,
// 	isCardAdding,
// 	onChangeBarMode,
// 	removeCardId,
// 	deleteCard,
// 	onCancelClick,
// 	onAdd,
// 	user
// }) => {
// 	const onCardClick = (index) => {
// 		onCardChange && onCardChange(index);
// 	};
//
// 	if (isCardRemoving) {
// 		return (
// 			<Layout>
// 				<Logo />
// 				<CardDelete
// 					deleteCard={deleteCard}
// 					onCancelClick={onCancelClick}
// 					data={cardsList.filter((item) => item.id === removeCardId)[0]} />
// 				<Footer>Yamoney Node School</Footer>
// 			</Layout>
// 		);
// 	}
//
// 	if (isCardAdding || cardsList.length === 0) {
// 		return (
// 			<Layout>
// 				<Logo />
// 				<CardAdd
// 					user={user}
// 					onAdd={onAdd}
// 					data={cardsList[0]}
// 					onCancelClick={onCancelClick} />
// 				<Footer>Yamoney Node School</Footer>
// 			</Layout>
// 		);
// 	}
// 	return (
// 		<Layout>
// 			<Logo />
// 			<Edit onClick={onEditChange} />
// 			<CardsList>
// 				{cardsList
// 					.filter((item) => !item.hidden)
// 					.map((card, index) => (
// 						<Card
// 							key={index}
// 							data={card}
// 							active={index === activeCardIndex}
// 							isCardsEditable={isCardsEditable}
// 							onChangeBarMode={onChangeBarMode}
// 							onClick={() => onCardClick(index)} />
// 					))
// 				}
// 				<Card type='new' onAddChange={onAddChange} />
// 			</CardsList>
// 			<Footer>Yamoney Node School</Footer>
// 		</Layout>
// 	);
// };

CardsBar.propTypes = {
	cardsList: PropTypes.arrayOf(PropTypes.object).isRequired,
	activeCardIndex: PropTypes.number.isRequired,
	removeCardId: PropTypes.number,
	onCardChange: PropTypes.func.isRequired,
	isCardsEditable: PropTypes.bool.isRequired,
	isCardRemoving: PropTypes.bool.isRequired,
	isCardAdding: PropTypes.bool.isRequired,
	deleteCard: PropTypes.func.isRequired,
	onChangeBarMode: PropTypes.func.isRequired,
	onCancelClick: PropTypes.func.isRequired,
	onEditChange: PropTypes.func.isRequired,
	onAddChange: PropTypes.func.isRequired,
	onAdd: PropTypes.func.isRequired
};

export default CardsBar;
