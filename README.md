# TheAcquisitions – Docker + Neon Setup

This project uses [Neon](https://neon.tech) for Postgres and [Neon Local](https://neon.com/docs/local/neon-local) for development with ephemeral branches.

## Environments

- **Development (local Docker):**
  - Runs the app + Neon Local in Docker.
  - Neon Local automatically creates an ephemeral branch of your Neon dev database on startup and deletes it on shutdown.
  - The Node app uses the Neon serverless driver and connects via a local HTTP endpoint (`http://neon-local:5432/sql`).

- **Production:**
  - Runs only the app container.
  - Connects directly to the Neon Cloud production database using `DATABASE_URL`.
  - No Neon Local proxy is used.

## 1. Setup environment files

Create and fill in:

### `.env.development`

```env
PORT=3000
NODE_ENV=development
LOG_LEVEL=info

DATABASE_URL=postgresql://<dev_user>:<dev_password>@<dev_host>.neon.tech/<dev_db>?sslmode=require&channel_binding=require

NEON_API_KEY={{NEON_API_KEY}}
NEON_PROJECT_ID={{NEON_PROJECT_ID}}
PARENT_BRANCH_ID={{PARENT_BRANCH_ID}}

NEON_LOCAL_ENDPOINT=http://neon-local:5432/sql

ARCJET_KEY={{ARCJET_KEY_DEV}}
```

### `.env.production`

```env
PORT=3000
NODE_ENV=production
LOG_LEVEL=info

DATABASE_URL=postgresql://<prod_user>:<prod_password>@<prod_host>.neon.tech/<prod_db>?sslmode=require&channel_binding=require

ARCJET_KEY={{ARCJET_KEY_PROD}}
```

> **Important:** Do not commit `.env.development` or `.env.production`. Add them to `.gitignore` and use a secrets manager in production.

## 2. Running locally with Neon Local

From the project root:

```bash
docker compose -f docker-compose.dev.yml --env-file .env.development up --build
```

This will:

1. Start Neon Local (`neon-local` service).
   - Neon Local uses `NEON_API_KEY`, `NEON_PROJECT_ID`, and `PARENT_BRANCH_ID` to create an **ephemeral branch** for this dev session.
2. Start the app (`app` service) using:
   - `DATABASE_URL` from `.env.development` (your Neon dev connection string).
   - `NEON_LOCAL_ENDPOINT=http://neon-local:5432/sql`, so the Neon serverless driver sends traffic to Neon Local instead of directly to Neon Cloud.

Your API will be available at `http://localhost:3000`.

### Running Drizzle migrations in dev (inside Docker)

For example:

```bash
docker compose -f docker-compose.dev.yml --env-file .env.development run --rm app npm run db:migrate
```

This will run migrations against the **ephemeral** branch created by Neon Local for this dev session.

## 3. Production deployment with Neon

Use the same Dockerfile, but the production compose file:

```bash
docker compose -f docker-compose.prod.yml --env-file .env.production up --build -d
```

In production:

- Only the `app` service runs.
- `DATABASE_URL` points to the Neon **prod** database (no Neon Local).
- Orchestrators (e.g. ECS, Kubernetes, Fly.io) should:
  - Build the image with the `prod` target from the `Dockerfile`.
  - Inject `DATABASE_URL`, `ARCJET_KEY`, and other secrets via their own env/secret systems instead of `.env.production`.
