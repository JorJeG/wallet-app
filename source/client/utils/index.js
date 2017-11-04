// eslint-disable-next-line
export function recognizeSpeech() {

	if (typeof webkitSpeechRecognition !== 'function') {
		console.warn('Распознование речи не поддерживается браузером!');
		return;
	}

	const recognition = new webkitSpeechRecognition();
	recognition.interimResults = false;
	recognition.continuous = false;
	recognition.lang = 'ru-RU';
	recognition.start();

	recognition.onresult = (e) => {
		const {transcript, confidence} = e.results[0][0];

		console.log(`Вот что я услышал: ${transcript}, я уверен в этом на ${Math.round(confidence) * 100}%`);

		if (confidence > 0.5) {
			switch (transcript.toLowerCase()) {
				case 'переведи мне денег на телефон':
					console.log('ОКЕЙ)');
					break;
				case 'привет':
					console.log('ЗДАРОВА');
					break;
				default:
					console.log('Я ещё не знаю таких слов(');
			}
		} else {
			console.log('Извини, я не тебя не понял');
		}

		recognition.stop();
	};

	recognition.onerror = (e) => {
		console.log(e);
		recognition.stop();
	};
}
