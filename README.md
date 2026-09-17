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

## Pasar a producción

Este setup es exclusivamente para desarrollo local. Para producción hay que cambiar, como mínimo:

- **`backend/.env`**:
  - `NODE_ENV=production`
  - `DATABASE_URL` apuntando a una base de datos gestionada (no el contenedor `db` de Docker Compose local).
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` apuntando a un proveedor SMTP real (no MailHog), por ejemplo SendGrid, Resend o SES.
  - `FRONTEND_URL` con el dominio real de producción (para CORS).
  - Secrets reales y rotados, nunca commiteados al repositorio.
- **Frontend**: `VITE_API_URL` debe apuntar al dominio real de la API en producción, y el build se sirve estático (`npm run build`) detrás de un CDN/servidor web, no con `vite dev`.
- **Backend**: correr `node server.js` (sin nodemon) detrás de un proceso manager (PM2, systemd) o como contenedor sin bind mounts de código, sin volúmenes de hot-reload.
- **Base de datos**: usar un Postgres gestionado con backups automáticos, no el volumen local `postgres_data`.
- Quitar Adminer y MailHog del despliegue de producción — son solo herramientas de desarrollo.
- Configurar HTTPS/TLS (reverse proxy como Nginx o un balanceador gestionado) delante de frontend y backend.
