# Приложение школы Node.js «Кошелёк»

## Install
```sh
npm i
```
## Build
```sh
npm run build
```
## Restore database
Just once
```sh
mongorestore --db=school-wallet school-wallet-dump
```

## Добавить конфиг config/default.json
домены для почты mail.ru, bk.ru, list.ru, inbox.ru в моей реализации
```js
{
	"server": {
		"port": 3001,
		"certs_dir": "fixtures",
		"https": false
	},
	"mailing": {
		// Ваша почта
		"mail": "_____",
		// Пароль
		"pass": "_____",
		// Ваша почта
		"from": "Wallet-App ______"
	}
}
```

## Run
```sh
npm start
```
