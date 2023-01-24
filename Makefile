start:
	docker-compose up -d
	docker exec -it node bash -c "npm run start:dev"

up:
	docker-compose up -d

stop:
	docker-compose stop

restart:
	docker-compose restart

build:
	docker-compose build

test:
	docker exec -it node sh -c "npm run test"

in:
	docker exec -it node sh