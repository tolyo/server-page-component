setup:
	npm i
	
clean:
	rm -rf node_modules
	rm package-lock.json

build:
	npm run build

lint:
	npm run lint