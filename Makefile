setup:
	npm install

build:
	npm run build

prepare:
	touch .env

start:
	heroku local -f Procfile.dev

start-backend:
	npx nodemon --exec npx babel-node server/bin/server.js

start-frontend:
	npx webpack-dev-server

lint:
	npx eslint .

test:
	npm run test

compile-migration:
	npx tsc server/migration/*.ts --outDir dist/server/migration

run-migration:
	npm run babel-typeorm migration:run
