.PHONY: up down logs db mail migrate seed shell-back shell-front reset

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
