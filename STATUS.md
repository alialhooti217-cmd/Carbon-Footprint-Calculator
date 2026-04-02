# Project Status

This file is the quick project tracker for the `Carbon Footprint Calculator`.

Last updated: 2026-04-02

## Overall

Current phase: `Core backend + frontend integration setup`

Project health:

- foundation is in place
- local environment works
- first backend feature slice works
- frontend is still mostly scaffolded

## Done

### Project foundation

- monorepo folder structure created
- root workspace config added
- shared docs written for architecture, API, domain model, and roadmap
- install and startup scripts added

### Local environment

- Node.js installed and working
- Docker Desktop fixed and working
- PostgreSQL and Redis configured through Docker Compose
- environment file flow set up for root, API, and web apps

### Backend scaffold

- NestJS API scaffolded
- Prisma schema created
- shared Prisma module/service added
- shared calculation engine package added
- shared types package added

### Working backend features

- `GET /api/v1/health`
- `GET /api/v1/emission-factors`
- `GET /api/v1/activity-records`
- `POST /api/v1/activity-records`

### Seeded demo data

- demo organization
- demo user
- demo facility
- demo project
- 4 demo emission factors

Reference file:

- [demo-seed-reference.json](./data/emission-factors/demo-seed-reference.json)

### Verified

- workspace typecheck passes
- API build passes
- Prisma schema pushed successfully
- seed script runs successfully
- endpoint smoke test passed

## In Progress

- turning the backend scaffold into a real product workflow
- preparing the frontend to consume the existing activity-record and factor APIs

## Next

### Priority 1

- build frontend form for creating activity records
- build frontend list/table for emission factors
- build frontend list/table for activity records

### Priority 2

- add dashboard summary cards
- add emissions breakdown chart
- add trend chart
- add facility and project selectors

### Priority 3

- add auth and user session flow
- add role-based access
- add report export
- add file import for CSV and Excel

### Later

- AI recommendations
- scenario analysis
- multi-facility benchmarking
- billing and subscriptions
- cloud production deployment hardening

## Current Working API

Base URL:

- `http://localhost:4000/api/v1`

Available endpoints:

- `GET /health`
- `GET /emission-factors`
- `GET /activity-records`
- `POST /activity-records`

Example create payload:

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

## How To Run

First-time setup:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\install-workspace.ps1
```

Start local services and apps:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\start-local.ps1
```

## Important Files

- [README.md](./README.md)
- [system-architecture.md](./docs/architecture/system-architecture.md)
- [database-schema.md](./docs/architecture/database-schema.md)
- [api-design.md](./docs/api/api-design.md)
- [calculation-model.md](./docs/domain/calculation-model.md)
- [app.module.ts](./apps/api/src/modules/app.module.ts)
- [activity-records.service.ts](./apps/api/src\modules\activity-records\activity-records.service.ts)
- [emission-factors.service.ts](./apps/api/src\modules\emission-factors\emission-factors.service.ts)
- [schema.prisma](./apps/api/prisma/schema.prisma)

## Suggested Immediate Next Task

Build the frontend `Activity Record` page and connect it to:

- `GET /api/v1/emission-factors`
- `GET /api/v1/activity-records`
- `POST /api/v1/activity-records`

That gives us the first full user workflow from UI input to calculated emissions output.
