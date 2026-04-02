import { Injectable } from "@nestjs/common";
import { SourceType } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class EmissionFactorsService {
  constructor(private readonly prisma: PrismaService) {}

  async listEmissionFactors(category?: SourceType) {
    const factors = await this.prisma.emissionFactor.findMany({
      where: category ? { category } : undefined,
      orderBy: [{ category: "asc" }, { factorName: "asc" }],
    });

    return {
      data: factors.map((factor) => ({
        id: factor.id,
        factorName: factor.factorName,
        category: factor.category,
        region: factor.region,
        unitBasis: factor.unitBasis,
        co2eFactor: Number(factor.co2eFactor),
        sourceReference: factor.sourceReference,
        sourceVersion: factor.sourceVersion,
        validFrom: factor.validFrom,
        validTo: factor.validTo,
      })),
      meta: {
        count: factors.length,
      },
      error: null,
    };
  }
}
