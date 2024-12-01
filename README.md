## Description
This is backend for better-budget. It's standard nestjs.

## Prerequisites
First of all you have to create postgres database. Easiest way should be to run this docker command.

```bash
docker run --name better-budget-test -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=better-budget-test -p 5432:5432 -d postgres
```

Then create .env file and put the correct data there. This is some example how that .env could look like.

```bash
PORT=4000
#Database settings
DB_HOST=localhost
DB_PORT=5432
DB_NAME=better-budget-test
DB_USERNAME=postgres
DB_PASSWORD=postgres
#JWT settings
JWT_SECRET='secret-token'
JWT_EXPIRATION_TIME='60s'
JWT_REFRESH_SECRET='refresh-secret-token'
JWT_REFRESH_EXPIRATION_TIME = '1h'
```

## Installation
You need to install all necessary npm packages.

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
