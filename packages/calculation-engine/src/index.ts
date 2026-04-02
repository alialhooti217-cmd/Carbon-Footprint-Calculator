import type {
  ActivityRecordInput,
  CalculationResult,
  EmissionFactor,
} from "@carbon/types";

function round(value: number, decimals = 6) {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

export function calculateCo2e(
  activity: ActivityRecordInput,
  factor: EmissionFactor,
): CalculationResult {
  if (activity.emissionFactorId !== factor.id) {
    throw new Error("Activity record does not match the selected emission factor.");
  }

  const co2eKg = round(activity.quantity * factor.co2eFactor);

  return {
    co2eKg,
    co2eTonnes: round(co2eKg / 1000),
    factorValue: factor.co2eFactor,
    unitBasis: factor.unitBasis,
  };
}
