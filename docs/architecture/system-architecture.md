# System Architecture

## Goal

Provide an industrial-grade SaaS platform for calculating, analyzing, and reporting carbon emissions from plant and engineering activity data.

## High-Level Architecture

```text
User Browser
   |
   v
Next.js Web App
   |
   v
REST API Gateway (NestJS)
   |
   +--> Calculation Service
   +--> Auth and Access Control
   +--> Reporting Service
   +--> Recommendation Service
   |
   v
PostgreSQL
   |
   +--> Emission Factors
   +--> Activity Records
   +--> Calculations
   +--> Reports
   +--> Audit Logs
   |
   +--> Redis
   |      |
   |      +--> Background Jobs
   |
   +--> Object Storage
          |
          +--> Uploaded files and generated reports
```

## Frontend

Recommended: `Next.js` with TypeScript.

Responsibilities:

- secure login and role-based access
- facility and project navigation
- industrial data-entry forms
- dashboards, trends, and drilldowns
- report generation and download
- AI-assisted recommendation views

Primary screens:

- login and onboarding
- organization dashboard
- facility overview
- project activity entry
- emissions dashboard
- factor library explorer
- reports and exports
- recommendations and scenarios

## Backend

Recommended: `NestJS` with modular services.

Core modules:

- `auth`
- `organizations`
- `facilities`
- `projects`
- `activity-records`
- `emission-factors`
- `calculations`
- `dashboards`
- `reports`
- `insights`
- `audit`

Responsibilities:

- validate input payloads
- normalize units where needed
- map activity data to emission factors
- execute deterministic calculations
- persist results for traceability
- expose dashboards and exports
- trigger background AI and reporting jobs

## Database

Recommended: managed `PostgreSQL`.

Why it fits:

- relational structure matches industrial entities well
- supports strong auditability
- handles time-series-like operational records without needing a separate analytics store at MVP stage
- works well with Prisma and enterprise cloud services

## Background Processing

Recommended: `BullMQ + Redis`.

Use async jobs for:

- large report generation
- CSV and Excel ingestion
- AI recommendation generation
- bulk recalculation after factor updates

## Cloud Services

Baseline cloud components:

- container hosting for API and worker
- managed PostgreSQL
- managed Redis
- object storage for reports and uploads
- secrets manager
- monitoring and alerting
- CI/CD pipeline

## Deployment Recommendation

### MVP

- Frontend: Vercel
- API and worker: Railway, Render, or Fly.io
- Database: Supabase or managed PostgreSQL
- Storage: S3-compatible bucket

### Scale-Up

- Frontend: Vercel or CloudFront
- API and worker: AWS ECS Fargate
- Database: AWS RDS PostgreSQL
- Queue: AWS ElastiCache Redis
- Storage: AWS S3
- Monitoring: CloudWatch and Sentry

## Engineering Design Principles

- deterministic calculations first, AI second
- store raw input and computed output separately
- preserve factor source and factor version for every calculation
- support unit-aware calculations and conversions
- keep audit logs for edits and report generation
- design for multi-tenant organizations from day one
