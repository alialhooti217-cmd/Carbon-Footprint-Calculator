# Calculation Model

## Principle

The platform must compute emissions using deterministic, auditable formulas grounded in engineering activity data and emission factors.

Base equation:

`CO2e = Activity Data x Emission Factor`

Where:

- `Activity Data` is measured plant or project consumption, production, or release data
- `Emission Factor` converts that activity into `kg CO2e`

## Fuel Combustion

For fuels such as diesel, fuel oil, LPG, coal, or natural gas:

`CO2e_fuel = Fuel Quantity x Fuel Emission Factor`

Examples:

- diesel in liters x `kg CO2e/liter`
- natural gas in `Nm3` x `kg CO2e/Nm3`
- coal in `kg` or `tonne` x `kg CO2e/kg` or `kg CO2e/tonne`

## Electricity Consumption

`CO2e_electricity = Electricity Consumption (kWh) x Grid Emission Factor (kg CO2e/kWh)`

Notes:

- factor may vary by country, utility, or grid mix
- future versions should support location-based and market-based accounting

## Process Emissions

For process-specific emissions:

`CO2e_process = Process Activity x Process Emission Factor`

Possible process activities:

- tonnes of clinker produced
- tonnes of ammonia produced
- mass of carbonate decomposed
- vented process gas quantity

## Composite Greenhouse Gas Model

Where direct gas components are available:

`CO2e = CO2 + (CH4 x GWP_CH4) + (N2O x GWP_N2O)`

Recommended implementation detail:

- store direct component gas values separately when available
- also store the final normalized `kg CO2e`

## Unit Management

Each calculation must preserve:

- original input quantity
- original input unit
- normalized quantity if conversion is applied
- factor unit basis
- factor source
- factor version or validity date

This prevents silent conversion errors and supports auditability.

## Suggested Initial Categories

- `fuel`
- `electricity`
- `steam`
- `process`
- `transport`
- `waste`

For MVP, the first three implemented categories should be:

- fuel
- electricity
- process

## Example Calculation

Natural gas use in a fired heater:

- quantity: `12,000 Nm3`
- factor: `1.90 kg CO2e/Nm3`

Result:

`CO2e = 12,000 x 1.90 = 22,800 kg CO2e`

Equivalent:

- `22.8 t CO2e`

## Reduction Recommendation Logic

The non-AI recommendation layer can start with simple rules:

- high electricity intensity -> suggest motor efficiency review, VFDs, load optimization
- high natural gas use -> suggest burner tuning, heat integration, insulation review
- abnormal month-over-month rise -> suggest instrumentation and leak checks

AI can later re-rank and personalize these recommendations, but the first layer should remain rule-based and explainable.
