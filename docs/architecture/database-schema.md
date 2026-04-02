# Database Schema

## Main Tables

### `users`

- `id`
- `email`
- `password_hash`
- `full_name`
- `created_at`
- `updated_at`

### `organizations`

- `id`
- `name`
- `industry`
- `country`
- `created_at`
- `updated_at`

### `organization_members`

- `id`
- `organization_id`
- `user_id`
- `role`
- `created_at`

### `facilities`

- `id`
- `organization_id`
- `name`
- `country`
- `region`
- `sector`
- `created_at`
- `updated_at`

### `projects`

- `id`
- `facility_id`
- `name`
- `description`
- `created_at`
- `updated_at`

### `activity_records`

- `id`
- `facility_id`
- `project_id`
- `source_type`
- `activity_name`
- `quantity`
- `unit`
- `normalized_quantity`
- `normalized_unit`
- `period_start`
- `period_end`
- `emission_factor_id`
- `metadata_json`
- `created_by_user_id`
- `created_at`
- `updated_at`
- `deleted_at`

### `emission_factors`

- `id`
- `factor_name`
- `category`
- `region`
- `unit_basis`
- `co2e_factor`
- `source_reference`
- `source_version`
- `valid_from`
- `valid_to`
- `created_at`

### `calculation_runs`

- `id`
- `organization_id`
- `facility_id`
- `project_id`
- `from_date`
- `to_date`
- `status`
- `requested_by_user_id`
- `created_at`
- `completed_at`

### `calculation_results`

- `id`
- `calculation_run_id`
- `activity_record_id`
- `emission_factor_id`
- `co2e_kg`
- `co2e_tonnes`
- `calculation_details_json`
- `created_at`

### `recommendations`

- `id`
- `organization_id`
- `facility_id`
- `project_id`
- `recommendation_type`
- `title`
- `details`
- `estimated_reduction_kg_co2e`
- `status`
- `created_at`

### `reports`

- `id`
- `organization_id`
- `facility_id`
- `project_id`
- `report_type`
- `status`
- `file_url`
- `requested_by_user_id`
- `created_at`

### `uploaded_files`

- `id`
- `organization_id`
- `facility_id`
- `file_name`
- `file_type`
- `storage_url`
- `uploaded_by_user_id`
- `created_at`

### `audit_logs`

- `id`
- `organization_id`
- `actor_user_id`
- `entity_type`
- `entity_id`
- `action`
- `changes_json`
- `created_at`

## Key Relationships

- organization has many facilities
- organization has many members
- facility has many projects
- project has many activity records
- activity record references one emission factor
- calculation run has many calculation results
- organization owns reports, recommendations, uploads, and audit logs
