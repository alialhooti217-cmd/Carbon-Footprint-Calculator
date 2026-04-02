import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { calculateCo2e } from "@carbon/calculation-engine";
import type {
  CreateActivityRecordRequest,
  EmissionFactor,
} from "@carbon/types";

const createActivityRecordSchema = z.object({
  facilityId: z.string().min(1),
  projectId: z.string().min(1).optional(),
  sourceType: z.enum(["fuel", "electricity", "process"]),
  activityName: z.string().min(3),
  quantity: z.number().positive(),
  unit: z.string().min(1),
  emissionFactorId: z.string().min(1),
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  createdByUserId: z.string().min(1),
});

@Injectable()
export class ActivityRecordsService {
  constructor(private readonly prisma: PrismaService) {}

  async listActivityRecords(facilityId?: string) {
    const records = await this.prisma.activityRecord.findMany({
      where: {
        deletedAt: null,
        ...(facilityId ? { facilityId } : {}),
      },
      include: {
        emissionFactor: true,
        facility: true,
        project: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return {
      data: records.map((record) =>
        this.mapRecordWithCalculation({
          activityName: record.activityName,
          createdAt: record.createdAt,
          emissionFactor: record.emissionFactor,
          facilityName: record.facility.name,
          id: record.id,
          metadataJson: record.metadataJson,
          periodEnd: record.periodEnd,
          periodStart: record.periodStart,
          projectName: record.project?.name ?? null,
          quantity: Number(record.quantity),
          sourceType: record.sourceType,
          unit: record.unit,
        }),
      ),
      meta: {
        count: records.length,
      },
      error: null,
    };
  }

  async createActivityRecord(input: CreateActivityRecordRequest) {
    const payload = createActivityRecordSchema.safeParse(input);
    if (!payload.success) {
      throw new BadRequestException(payload.error.flatten());
    }

    const [facility, createdByUser, factor] = await Promise.all([
      this.prisma.facility.findUnique({
        where: { id: payload.data.facilityId },
      }),
      this.prisma.user.findUnique({
        where: { id: payload.data.createdByUserId },
      }),
      this.prisma.emissionFactor.findUnique({
        where: { id: payload.data.emissionFactorId },
      }),
    ]);

    if (!facility) {
      throw new NotFoundException("Facility not found.");
    }

    if (!createdByUser) {
      throw new NotFoundException("User not found.");
    }

    if (!factor) {
      throw new NotFoundException("Emission factor not found.");
    }

    if (factor.category !== payload.data.sourceType) {
      throw new BadRequestException(
        "Emission factor category does not match the activity source type.",
      );
    }

    const metadataJson = payload.data.metadata as
      | Prisma.InputJsonValue
      | undefined;

    const record = await this.prisma.activityRecord.create({
      data: {
        facilityId: payload.data.facilityId,
        projectId: payload.data.projectId,
        sourceType: payload.data.sourceType,
        activityName: payload.data.activityName,
        quantity: payload.data.quantity,
        unit: payload.data.unit,
        normalizedQuantity: payload.data.quantity,
        normalizedUnit: payload.data.unit,
        periodStart: payload.data.periodStart,
        periodEnd: payload.data.periodEnd,
        emissionFactorId: payload.data.emissionFactorId,
        metadataJson,
        createdByUserId: payload.data.createdByUserId,
      },
      include: {
        emissionFactor: true,
        facility: true,
        project: true,
      },
    });

    return {
      data: this.mapRecordWithCalculation({
        activityName: record.activityName,
        createdAt: record.createdAt,
        emissionFactor: record.emissionFactor,
        facilityName: record.facility.name,
        id: record.id,
        metadataJson: record.metadataJson,
        periodEnd: record.periodEnd,
        periodStart: record.periodStart,
        projectName: record.project?.name ?? null,
        quantity: Number(record.quantity),
        sourceType: record.sourceType,
        unit: record.unit,
      }),
      meta: {
        created: true,
      },
      error: null,
    };
  }

  private mapRecordWithCalculation(input: {
    id: string;
    facilityName: string;
    projectName: string | null;
    sourceType: "fuel" | "electricity" | "process";
    activityName: string;
    quantity: number;
    unit: string;
    periodStart: Date;
    periodEnd: Date;
    emissionFactor: {
      id: string;
      factorName: string;
      category: "fuel" | "electricity" | "process";
      region: string | null;
      unitBasis: string;
      co2eFactor: unknown;
      sourceReference: string;
      sourceVersion: string | null;
    };
    metadataJson: unknown;
    createdAt: Date;
  }) {
    const factor: EmissionFactor = {
      id: input.emissionFactor.id,
      factorName: input.emissionFactor.factorName,
      category: input.emissionFactor.category,
      region: input.emissionFactor.region ?? undefined,
      unitBasis: input.emissionFactor.unitBasis,
      co2eFactor: Number(input.emissionFactor.co2eFactor),
      sourceReference: input.emissionFactor.sourceReference,
      sourceVersion: input.emissionFactor.sourceVersion ?? undefined,
    };

    const calculation = calculateCo2e(
      {
        activityName: input.activityName,
        emissionFactorId: factor.id,
        periodEnd: input.periodEnd.toISOString(),
        periodStart: input.periodStart.toISOString(),
        quantity: input.quantity,
        sourceType: input.sourceType,
        unit: input.unit,
      },
      factor,
    );

    return {
      id: input.id,
      facilityName: input.facilityName,
      projectName: input.projectName,
      sourceType: input.sourceType,
      activityName: input.activityName,
      quantity: input.quantity,
      unit: input.unit,
      periodStart: input.periodStart,
      periodEnd: input.periodEnd,
      emissionFactor: factor,
      calculation,
      metadata: input.metadataJson,
      createdAt: input.createdAt,
    };
  }
}
