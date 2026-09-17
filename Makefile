.PHONY: up down logs db mail migrate seed shell-back shell-front reset prod-up prod-down prod-logs prod-seed

up:
	docker compose up --build

down:
	docker compose down

logs:
	docker compose logs -f

db:
	@echo "Adminer: http://localhost:8080 (Sistema: PostgreSQL, Servidor: db, Usuario: rcarena_user, Clave: rcarena_pass, BD: rcarena)"
	@start http://localhost:8080 || open http://localhost:8080 || xdg-open http://localhost:8080

mail:
	@echo "MailHog: http://localhost:8025"
	@start http://localhost:8025 || open http://localhost:8025 || xdg-open http://localhost:8025

migrate:
	docker compose exec backend npx prisma migrate dev

seed:
	docker compose exec backend npx prisma db seed

shell-back:
	docker compose exec backend sh

shell-front:
	docker compose exec frontend sh

reset:
	docker compose down -v

prod-up:
	docker compose -f docker-compose.prod.yml --env-file .env up --build -d

prod-down:
	docker compose -f docker-compose.prod.yml --env-file .env down

prod-logs:
	docker compose -f docker-compose.prod.yml --env-file .env logs -f

prod-seed:
	docker compose -f docker-compose.prod.yml --env-file .env exec backend npx prisma db seed
