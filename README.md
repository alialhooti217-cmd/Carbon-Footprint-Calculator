# Carbon Footprint Calculator

Cloud-based web application for industrial and engineering teams to quantify, analyze, and reduce carbon emissions from fuel use, electricity consumption, and process operations.

## Vision

This project is designed for chemical engineers, process engineers, sustainability teams, and plant operations staff who need an emissions platform that is:

- auditable
- engineering-oriented
- practical for industrial workflows
- extensible for AI-driven insights

## Monorepo Layout

```text
apps/
  web/        Frontend dashboard and data-entry application
  api/        Backend REST API and business logic
  worker/     Background jobs for reporting and AI tasks
packages/
  calculation-engine/ Deterministic emissions formulas and unit logic
  config/             Shared configuration
  types/              Shared TypeScript contracts
  ui/                 Shared UI components
docs/
  architecture/ System design and cloud architecture
  api/          API contract and endpoint design
  domain/       Engineering models, formulas, and assumptions
  product/      Product scope and phased roadmap
data/
  emission-factors/ Source datasets and seeds
  sample-datasets/  Example industrial input files
infra/
  docker/      Local container setup
  terraform/   Cloud infrastructure later
```

## Recommended Stack

- Frontend: Next.js, TypeScript, Tailwind CSS
- Backend: NestJS, TypeScript
- Database: PostgreSQL
- ORM: Prisma
- Queue and cache: Redis with BullMQ
- Charts: Recharts or Apache ECharts
- Auth: JWT with refresh tokens, or managed auth for enterprise rollout
- Hosting: Vercel for frontend, AWS for backend-scale deployment

## Core MVP Scope

- User and organization management
- Facility and project structure
- Input forms for fuel, electricity, and process data
- Traceable emission-factor library
- CO2e calculation engine
- Summary dashboards and trend charts
- Reduction recommendations
- Exportable reports

## Terminal Setup

### First-time setup

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\install-workspace.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\start-local.ps1
```

The install script syncs the root `.env` into `apps/api/.env` and `apps/web/.env.local` so Prisma and Next.js can read local configuration correctly.

Detailed requirements: [REQUIREMENTS.md](./REQUIREMENTS.md)

## Immediate Build Sequence

1. Install Node.js 20 LTS and pnpm
2. Run workspace install and boot local services
3. Implement deterministic calculation engine
4. Add Prisma migrations and seed emission factors
5. Build MVP data-entry and dashboard experience
6. Add reporting, AI insights, and enterprise features

## Demo Backend State

The API now includes:

- `GET /api/v1/emission-factors`
- `GET /api/v1/activity-records`
- `POST /api/v1/activity-records`

Seeded demo IDs live in [demo-seed-reference.json](./data/emission-factors/demo-seed-reference.json).

Example create request:

```json
{
  "facilityId": "fac_demo_001",
  "projectId": "prj_demo_001",
  "sourceType": "fuel",
  "activityName": "Boiler natural gas use",
  "quantity": 12000,
  "unit": "Nm3",
  "emissionFactorId": "ef_demo_natgas_001",
  "periodStart": "2026-04-01T00:00:00.000Z",
  "periodEnd": "2026-04-30T23:59:59.000Z",
  "createdByUserId": "usr_demo_001",
  "metadata": {
    "equipmentTag": "B-101",
    "department": "Utilities"
  }
}
```

## Next Docs

- [System Architecture](./docs/architecture/system-architecture.md)
- [API Design](./docs/api/api-design.md)
- [Calculation Model](./docs/domain/calculation-model.md)
- [Product Roadmap](./docs/product/roadmap.md)
