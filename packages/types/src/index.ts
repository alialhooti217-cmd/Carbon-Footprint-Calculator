export type SourceType = "fuel" | "electricity" | "process";

export interface EmissionFactor {
  id: string;
  factorName: string;
  category: SourceType;
  region?: string;
  unitBasis: string;
  co2eFactor: number;
  sourceReference: string;
  sourceVersion?: string;
}

export interface ActivityRecordInput {
  sourceType: SourceType;
  activityName: string;
  quantity: number;
  unit: string;
  emissionFactorId: string;
  periodStart: string;
  periodEnd: string;
}

export interface CreateActivityRecordRequest extends ActivityRecordInput {
  facilityId: string;
  projectId?: string;
  metadata?: Record<string, unknown>;
  createdByUserId: string;
}

export interface CalculationResult {
  co2eKg: number;
  co2eTonnes: number;
  factorValue: number;
  unitBasis: string;
}
