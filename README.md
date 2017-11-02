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
```sh
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
		"from": "Яндекс.Деньги ______"
	}
}
```

## Run
```sh
npm start
```
