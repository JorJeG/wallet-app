// eslint-disable-next-line
export function recognizeSpeech(speechCallback) {

	if (typeof webkitSpeechRecognition !== 'function') {
		console.warn('Распознование речи не поддерживается браузером!');
		return;
	}

	const recognition = new webkitSpeechRecognition();
	recognition.interimResults = false;
	recognition.continuous = false;
	recognition.lang = 'ru-RU';
	recognition.start();

	// eslint-disable-next-line consistent-return
	return new Promise((resolve, reject) => {
		recognition.onresult = (e) => {
			const {transcript, confidence} = e.results[0][0];
			let reply;

			console.log(`Вот что я услышал: ${transcript}, я уверен в этом на ${Math.round(confidence) * 100}%`);

			if (confidence > 0.5) {
				switch (transcript.toLowerCase()) {
					case 'переведи мне денег на телефон':
						reply = 'ОКЕЙ)';
						break;
					case 'привет':
						reply = 'ЗДАРОВА';
						break;
					case 'спасибо хватит':
						reply = 'Обращайся, дружище';
						break;
					default:
						reply = 'Я ещё не знаю таких слов(';
				}
			} else {
				reply = 'Извини, я не тебя не понял';
			}

			recognition.stop();
			resolve(reply);
		};

		recognition.onerror = (e) => {
			console.log(e);
			reject(e);
			recognition.stop();
		};
	});
}
