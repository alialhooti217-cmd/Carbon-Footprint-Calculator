# Terminal Setup Requirements

This repository uses a TypeScript monorepo and is intended to be started directly from the terminal.

## Required Software

- Node.js `20 LTS` or newer
- `pnpm` via Corepack
- Docker Desktop
- PostgreSQL and Redis are provided through Docker Compose

## Quick Start

### Windows PowerShell

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\install-workspace.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\start-local.ps1
```

## What Each Command Does

- `install-workspace.ps1` creates `.env`, installs dependencies, and generates Prisma client
- `start-local.ps1` starts PostgreSQL and Redis with the project's `docker-compose.yml`, then runs the web app, API, and worker

The setup also mirrors the root `.env` into `apps/api/.env` and `apps/web/.env.local` for local development.

## Install Notes

If `node` is not installed yet, install Node.js first, then re-run the commands above.
