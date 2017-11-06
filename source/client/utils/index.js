class Speech {
	constructor() {
		this.streamer = new window.ya.speechkit.SpeechRecognition();
		this.bankNamesMap = {
			'сбербанка': 1,
			'сбербанк': 1,
			'альфабанка': 2,
			'альфабанк': 2,
			'альфа': 2,
			'тинькофф': 3,
			'открытие': 4,
			'втб24': 5,
			'росбанк': 6
		};

		this.onPay = (arr) => {
			const value = arr.find((it) => {
				return !Number.isNaN(Number(it));
			});

			const bank = arr.find((it) => {
				return this.bankNamesMap[it];
			});

			if (value && bank) {
				console.log(`Нужно оплатить мобильник на сумму ${value}руб. с карты ${bank}. id банка: ${this.bankNamesMap[bank]}`);
			} else if (!value) {
				console.log(`Непонятно какую сумму оплатить`);
			} else {
				console.log(`Непонятно с какой карты списать`);
			}
		};

		this.onTransfer = (arr) => {
			const banks = arr.filter((it) => {
				return this.bankNamesMap.hasOwnProperty(it);
			});

			const value = arr.find((it) => {
				return !Number.isNaN(Number(it));
			});

			const [sourceBank, targetBank] = banks;

			if (value && sourceBank && targetBank) {
				console.log(`Нужно перевести ${value}руб. c карты ${sourceBank}(id: ${this.bankNamesMap[sourceBank]}) на карту ${targetBank}(id: ${this.bankNamesMap[targetBank]})`);
			} else if (!value) {
				console.log(`Непонятно какую сумму перевести`);
			} else if (!sourceBank) {
				console.log(`Непонятно с какой карты и на какую перевести деньги`);
			} else if (!targetBank) {
				console.log(`Непонятно какую карту пополнить`);
			}
		};

		this.onFill = (arr) => {
			const value = arr.find((it) => {
				return !Number.isNaN(Number(it));
			});

			const bank = arr.find((it) => {
				return this.bankNamesMap[it];
			});

			if (value && bank) {
				console.log(`Нужно пополнить карту ${bank}(id банка: ${this.bankNamesMap[bank]}) на сумму ${value}руб.`);
			} else if (!value) {
				console.log(`Непонятно на какую сумму пополнить`);
			} else {
				console.log(`Непонятно какую карту пополнить`);
			}
		};

		this.onUnknown = () => {
			console.log('непонятная комманда');
		};

		this.commandsMap = {
			'переведи': this.onTransfer,
			'перевести': this.onTransfer,
			'оплати': this.onPay,
			'оплатить': this.onPay,
			'заплати': this.onPay,
			'заплатить': this.onPay,
			'пополни': this.onFill,
			'пополнить': this.onFill
		};

		this.onCommand = (text) => {
			if (text.length === 0) {
				return;
			}
			const arr = text.trim().split(' ');
			const command = arr.find((it) => {
				return this.commandsMap[it];
			});
			(this.commandsMap[command] || this.onUnknown)(arr);
		};
	}

	start() {
		this.streamer.start({
			apikey: '8a02e365-8087-42b1-b0e1-4b339fb615fd',
			initCallback: () => {
				console.log('Началась запись звука.');
			},
			dataCallback: (text, done) => {
				if (done) {
					this.onCommand(text);
					this.stop();
				}
			},
			errorCallback: (err) => {
				console.log('Возникла ошибка: ' + err);
			},
			stopCallback: () => {
				console.log('Запись звука прекращена.');
			},
			particialResults: false,
			utteranceSilence: 60
		});
	}

	stop() {
		this.streamer.stop();
	}
}

export default Speech;
