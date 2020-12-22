install: install-deps

start:
	heroku local -f Procfile.dev

start-backend:
	npx nodemon --exec npx babel-node server/bin/slack.js

start-frontend:
	npx webpack serve

install-deps:
	npm ci

build:
	npm run build

test:
	npm test -s

ftest:
	npm run ftest -s

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint . --ext js,jsx

prettify:
	npx prettier . --write

publish:
	npm publish

deploy:
	git push heroku

.PHONY: test
