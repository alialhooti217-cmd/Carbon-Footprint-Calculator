# Product Roadmap

## Product Positioning

`Carbon Footprint Calculator` is an industrial emissions platform for engineering and sustainability teams that need transparent carbon accounting tied to operational data.

## MVP

Target outcome:

- a user can enter operational activity data
- the system calculates emissions reliably
- dashboards summarize results by period and source
- reports can be exported for internal review

Deliverables:

- auth and organization setup
- facility and project model
- activity input forms for fuel, electricity, and process records
- emission factor library with source metadata
- calculation engine
- dashboard overview and trend charts
- simple recommendation engine
- CSV and PDF exports

## Phase 2

Target outcome:

- the system becomes useful across multiple plants and reporting cycles

Deliverables:

- multi-facility comparison
- advanced filters and drilldowns
- factor versioning
- file upload ingestion
- audit logs
- role-based permissions

## Phase 3

Target outcome:

- the platform supports stronger industrial decision-making and customer expansion

Deliverables:

- scenario analysis
- AI-powered recommendation engine
- custom customer factor libraries
- cost versus emissions comparison
- APIs for ERP and MES integrations

## Suggested Development Order

1. Define shared types and calculation interfaces
2. Scaffold database schema and seed factor data
3. Build the first calculation endpoints
4. Implement frontend forms and dashboard
5. Add report generation
6. Add AI insights and scenario modeling
