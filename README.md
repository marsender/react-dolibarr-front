# react-dolibarr-front

Dolibarr front

## Requirements

This project require the following to get started:

- node
- a Dolibarr instance with api enabled

## Install

Clone [React dolibarr front repository](https://github.com/marsender/react-dolibarr-front)

```bash
git clone git@github.com:marsender/react-dolibarr-front.git
cd react-dolibarr-front
```

Install dependencies

```bash
npm install
```

Adjust env file

```bash
nano .env
SITE_URL=http://react-dolibarr-front.localhost:9011/
API_URL=http://opale.localhost/dolibarr/api/index.php/
```

Build for dev

```bash
npm run dev
```

Open the app in your browser http://react-dolibarr-front.localhost:9011/
