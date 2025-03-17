run-local:
	docker-compose -f ./docker/docker-compose.local.yml --project-directory ./ -p test_react down && \
	docker-compose -f ./docker/docker-compose.local.yml --project-directory ./ -p test_react build --no-cache && \
	docker-compose -f ./docker/docker-compose.local.yml --project-directory ./ -p test_react up -d


stop-local:
	@docker-compose -f ./docker/docker-compose.local.yml --project-directory ./ -p bewell_frontend down

rm-local:
	@docker-compose -f ./docker/docker-compose.local.yml --project-directory ./ -p bewell_frontend down -v --remove-orphans

rm-local:
	@docker compose -f ./docker/docker-compose.local.yml --project-directory ./ -p portafolio_react down -v --remove-orphans

# git flow

prod\:release:
	./scripts/release.sh


prod\:tag:
	./scripts/tag.sh