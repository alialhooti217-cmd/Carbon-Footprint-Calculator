# API Design

## API Style

- REST over HTTPS
- JSON request and response bodies
- versioned routes under `/api/v1`
- JWT-based auth for MVP
- idempotent reads and carefully validated writes

## Main Resources

- auth
- organizations
- facilities
- projects
- activity-records
- emission-factors
- calculations
- dashboards
- reports
- insights

## Authentication

### `POST /api/v1/auth/register`

Create a user and optional first organization.

### `POST /api/v1/auth/login`

Exchange email and password for access and refresh tokens.

### `POST /api/v1/auth/refresh`

Refresh short-lived access tokens.

## Organizations and Facilities

### `GET /api/v1/organizations`

List organizations the user belongs to.

### `POST /api/v1/organizations`

Create a new organization.

### `GET /api/v1/facilities`

List facilities, filterable by organization.

### `POST /api/v1/facilities`

Create a facility.

Example payload:

```json
{
  "organizationId": "org_123",
  "name": "Ammonia Plant A",
  "country": "Oman",
  "region": "Muscat",
  "sector": "Chemicals"
}
```

## Activity Records

### `POST /api/v1/activity-records`

Create a fuel, electricity, or process activity record.

Example payload:

```json
{
  "facilityId": "fac_123",
  "projectId": "prj_123",
  "sourceType": "fuel",
  "activityName": "Boiler natural gas consumption",
  "quantity": 15000,
  "unit": "Nm3",
  "periodStart": "2026-04-01",
  "periodEnd": "2026-04-30",
  "emissionFactorId": "ef_456",
  "metadata": {
    "equipmentTag": "B-101",
    "department": "Utilities"
  }
}
```

### `GET /api/v1/activity-records`

Query by organization, facility, project, source type, and date range.

### `PATCH /api/v1/activity-records/:id`

Update a previously submitted record.

### `DELETE /api/v1/activity-records/:id`

Soft-delete an activity record.

## Emission Factors

### `GET /api/v1/emission-factors`

Return factors filtered by category, geography, unit basis, and validity period.

### `POST /api/v1/emission-factors`

Create a factor entry with source reference and validity dates.

## Calculations

### `POST /api/v1/calculations/run`

Run or queue a calculation over a facility, project, or selected activity records.

Example payload:

```json
{
  "organizationId": "org_123",
  "facilityId": "fac_123",
  "projectId": "prj_123",
  "from": "2026-04-01",
  "to": "2026-04-30",
  "groupBy": "sourceType"
}
```

### `GET /api/v1/calculations/:id`

Fetch a stored calculation run and its result items.

### `GET /api/v1/emissions/summary`

Return aggregated emissions summary by date range and filters.

## Dashboards and Reports

### `GET /api/v1/dashboard/overview`

Return KPIs such as total CO2e, top sources, and month-over-month change.

### `GET /api/v1/dashboard/trends`

Return time-series data for charts.

### `POST /api/v1/reports/generate`

Generate a PDF or spreadsheet report asynchronously.

### `GET /api/v1/reports/:id`

Get report status and download URL when ready.

## AI Insights

### `POST /api/v1/insights/recommendations`

Return targeted recommendations based on recent emissions and plant context.

### `POST /api/v1/insights/scenario-analysis`

Estimate emissions impact of hypothetical operational changes.

## Response Shape

Recommended response envelope:

```json
{
  "data": {},
  "meta": {
    "requestId": "req_123"
  },
  "error": null
}
```

Recommended error shape:

```json
{
  "data": null,
  "meta": {
    "requestId": "req_123"
  },
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Unit Nm3 is not allowed for sourceType electricity."
  }
}
```
