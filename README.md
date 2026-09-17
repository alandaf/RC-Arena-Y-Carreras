# RC Arena & Carreras — RC & Snacks

Pista de autos RC familiar en Curauma, Chile.
"La única pista RC familiar de Curauma. Fuera de la pantalla, pura acción."

## Prerrequisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y corriendo.
- No se necesita Node.js ni PostgreSQL instalados localmente: todo corre en contenedores.

## Inicio rápido

```bash
make up
```

o directamente:

```bash
docker compose up --build
```

La primera vez, luego de que los contenedores estén arriba, corre las migraciones y el seed en otra terminal:

```bash
make migrate
make seed
```

## Servicios y URLs

| Servicio  | URL                          | Descripción                                  |
|-----------|-------------------------------|-----------------------------------------------|
| Frontend  | http://localhost:5173         | Sitio React + Vite (hot reload)               |
| Backend   | http://localhost:3002         | API REST Express (hot reload con nodemon)     |
| Adminer   | http://localhost:8080         | UI web para explorar la base de datos         |
| MailHog   | http://localhost:8025         | Captura de emails enviados en desarrollo      |
| Postgres  | localhost:5432                | Base de datos (uso interno / clientes SQL)    |

## Ver los emails enviados (MailHog)

Ningún email sale realmente a internet en desarrollo. El backend envía todo por SMTP a MailHog
(`SMTP_HOST=mailhog`, puerto `1025`). Para verlos, abre:

```
http://localhost:8025
```

o corre:

```bash
make mail
```

Cada reserva, contacto o membresía enviada genera un correo visible ahí (confirmación al cliente,
notificación al dueño, etc). Además, el backend imprime en consola un resumen del email enviado.

## Ver la base de datos (Adminer)

Abre http://localhost:8080 (o `make db`) y conéctate con:

- **Sistema**: PostgreSQL
- **Servidor**: `db`
- **Usuario**: `rcarena_user`
- **Contraseña**: `rcarena_pass`
- **Base de datos**: `rcarena`

## Migraciones y seed

Con los contenedores corriendo:

```bash
make migrate   # aplica el schema de Prisma a la base de datos
make seed      # carga datos de prueba (reservas, contactos, membresías)
```

Equivalente manual:

```bash
docker compose exec backend npx prisma migrate dev
docker compose exec backend npx prisma db seed
```

## Otros comandos útiles

```bash
make logs         # sigue los logs de todos los servicios
make shell-back    # abre una shell dentro del contenedor backend
make shell-front   # abre una shell dentro del contenedor frontend
make reset         # docker compose down -v — borra todo, incluyendo la BD
```

## Pasar a producción (VPS con Docker)

El repo incluye un segundo stack, `docker-compose.prod.yml`, pensado para correr todo —
frontend, backend, base de datos y HTTPS— en un único VPS con Docker instalado.

Diferencias clave respecto al stack de desarrollo:

- **Frontend**: se compila con `npm run build` (Vite) y se sirve como archivos estáticos vía
  **Nginx** ([frontend/Dockerfile.prod](frontend/Dockerfile.prod), [frontend/nginx.conf](frontend/nginx.conf)) —
  nada de `vite dev` ni hot-reload.
- **Backend**: corre `node server.js` directo (sin `nodemon`), sin bind mounts de código, y
  aplica las migraciones de Prisma automáticamente al arrancar (`prisma migrate deploy`)
  ([backend/Dockerfile.prod](backend/Dockerfile.prod)).
- **HTTPS automático**: **Caddy** ([Caddyfile](Caddyfile)) hace de reverse proxy — enruta
  `/api/*` al backend y el resto al frontend, y obtiene/renueva certificados TLS de Let's
  Encrypt solo con apuntar tu dominio a la IP del VPS.
- **Adminer y MailHog no están incluidos** — son herramientas de desarrollo. En producción
  usa un SMTP real y consulta la BD con un cliente Postgres normal o un túnel SSH.

### Pasos para desplegar

1. En el VPS, con Docker y Docker Compose instalados, clona el repo.
2. Copia las plantillas de variables de entorno y complétalas con valores reales:
   ```bash
   cp .env.production.example .env
   cp backend/.env.production.example backend/.env.production
   ```
   - En `.env` (raíz): `DOMAIN` (tu dominio, apuntando por DNS a la IP del VPS),
     `VITE_API_URL` (`https://tudominio.cl`), y las credenciales de Postgres.
   - En `backend/.env.production`: el `DATABASE_URL` con esas mismas credenciales de Postgres,
     `FRONTEND_URL`, y los datos de tu proveedor SMTP real (Resend, SendGrid, SES, etc — MailHog
     no aplica aquí).
3. Levanta el stack:
   ```bash
   make prod-up
   ```
   Esto construye las imágenes de producción, levanta Postgres, aplica las migraciones
   automáticamente y expone el sitio en `https://tudominio.cl` vía Caddy.
4. Si necesitas cargar datos de prueba (normalmente no, en producción real):
   ```bash
   make prod-seed
   ```

Otros comandos: `make prod-logs` (logs en vivo) y `make prod-down` (detener el stack).

**Importante**: nunca commitees `.env` ni `backend/.env.production` con credenciales reales —
ambos están en `.gitignore`; solo sus `.example` quedan versionados.
