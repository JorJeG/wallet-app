// import * as Api from './Api';

class Speech {
	constructor(user) {
		this.user = user;
		this.streamer = new window.ya.speechkit.SpeechRecognition();
		this.bankNamesMap = {
			сбербанка: 1,
			сбербанк: 1,
			альфабанка: 2,
			альфабанк: 2,
			альфа: 2,
			тинькофф: 3,
			открытие: 4,
			втб24: 5,
			росбанк: 6
		};

		this.onPay = (arr) => {
			const value = arr.find((it) => !Number.isNaN(Number(it)));

			const bank = arr.find((it) => this.bankNamesMap[it]);

			if (value && bank) {

				// Api.pay_mobile({
				// 	sum: value,
				// 	targetCard: this.bankNamesMap[bank],
				// 	user: this.user
				// });

				// return `Нужно оплатить мобильник на сумму ${value}руб. с карты ${bank}. id банка: ${this.bankNamesMap[bank]}`;
				return `Твой телефон пополнен на ${value} рублей с карты ${bank}!`;
			} else if (!value) {
				return 'Непонятно какую сумму оплатить';
			}
				return 'Непонятно с какой карты списать';

		};

		this.onTransfer = (arr) => {
			const banks = arr.filter((it) => this.bankNamesMap.hasOwnProperty(it));

			const value = arr.find((it) => !Number.isNaN(Number(it)));

			const [sourceBank, targetBank] = banks;

			if (value && sourceBank && targetBank) {
				// return `Нужно перевести ${value}руб. c карты ${sourceBank}(id: ${this.bankNamesMap[sourceBank]}) на карту ${targetBank}(id: ${this.bankNamesMap[targetBank]})`;
				return `Переведено ${value} рублей c карты ${sourceBank} на карту ${targetBank}`;
			} else if (!value) {
				return 'Непонятно какую сумму перевести';
			} else if (!sourceBank) {
				return 'Непонятно с какой карты и на какую перевести деньги';
			} else if (!targetBank) {
				return 'Непонятно какую карту пополнить';
			}
		};

		this.onFill = (arr) => {
			const value = arr.find((it) => !Number.isNaN(Number(it)));

			const bank = arr.find((it) => this.bankNamesMap[it]);

			if (value && bank) {
				// return `Нужно пополнить карту ${bank}(id банка: ${this.bankNamesMap[bank]}) на сумму ${value}руб.`;
				return `Карта ${bank} пополнена на сумму ${value} рублей`;
			} else if (!value) {
				return 'Непонятно какую карту пополнить';
			}
				return 'Непонятно какую карту пополнить';

		};

		this.onUnknown = () => {
			return 'Непонятная команда';
		};

		this.commandsMap = {
			переведи: this.onTransfer,
			перевести: this.onTransfer,
			оплати: this.onPay,
			оплатить: this.onPay,
			заплати: this.onPay,
			заплатить: this.onPay,
			пополни: this.onFill,
			пополнить: this.onFill
		};

		this.onCommand = (text) => {
			if (text.length === 0) {
				return;
			}
			const arr = text.trim().split(' ');
			const command = arr.find((it) => this.commandsMap[it]);
			return (this.commandsMap[command] || this.onUnknown)(arr);
		};
	}

	start() {
		return new Promise((resolve, reject) => {
			this.streamer.start({
				apikey: '8a02e365-8087-42b1-b0e1-4b339fb615fd',
				initCallback: () => {
					console.log('Началась запись звука.');
				},
				dataCallback: (text, done) => {
					if (done) {
						const result = this.onCommand(text);
						this.stop();
						resolve(result);
					}
				},
				errorCallback: (err) => {
					// console.log(`Возникла ошибка: ${err}`);
					reject(`Возникла ошибка: ${err}`);
				},
				stopCallback: () => {
					console.log('Запись звука прекращена.');
				},
				particialResults: false,
				utteranceSilence: 60
			});
		});
	}

	stop() {
		this.streamer.stop();
	}
}

export default Speech;
