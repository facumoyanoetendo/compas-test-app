# Compas Test App

Minimal Express.js application used to validate the Compas agentic workflow (human-driven pipeline).

## Stack

- Node.js + Express
- In-memory data store
- Jest + Supertest for testing

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | / | Landing page — project description and endpoint list |
| GET | /api/health | Health check |
| GET | /api/users | List all users |
| GET | /api/users/:id | Get user by ID |
| POST | /api/users | Create user |
| PUT | /api/users/:id | Update user |
| DELETE | /api/users/:id | Delete user |

## Setup

```bash
npm install
npm start
```

## Git Flow

- `main` — production
- `develop` — integration branch, all feature PRs target here
- `feat/*` / `fix/*` — feature and bugfix branches from develop
