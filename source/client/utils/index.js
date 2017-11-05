let streamer = null;

if (typeof window === 'object') {
	streamer = new ya.speechkit.SpeechRecognition();
}

const onTransfer = () => {
	console.log('Нужно перевести бабки');
};

const onPay = (arr) => {
	const value = arr.find((it) => !Number.isNaN(Number(it)));
	console.log(`Нужно оплатить мобильник на сумму ${value}`);
};

const unknown = () => {
	console.log('непонятная комманда');
};

const commandsMap = {
	переведи: onTransfer,
	оплати: onPay
};

const textParser = (text) => {
	if (text.length === 0) {
		return;
	}
	const arr = text.trim().split(' ');

	const command = arr.find((it) => commandsMap[it]);
	(commandsMap[command] || unknown)(arr);
};

// eslint-disable-next-line
export function recognizeSpeech() {
	if (typeof window === 'object') {
		// 8a02e365-8087-42b1-b0e1-4b339fb615fd
		streamer.start({
			apikey: '8a02e365-8087-42b1-b0e1-4b339fb615fd',
			initCallback() {
				console.log('Началась запись звука.');
			},
			dataCallback(text, done) {
				if (done) {
					textParser(text);
					streamer.stop();
				}
			},
			errorCallback(err) {
				console.log(`Возникла ошибка: ${err}`);
			},
			stopCallback() {
				console.log('Запись звука прекращена.');
			},
			particialResults: false,
			utteranceSilence: 60
		});
	}
}
