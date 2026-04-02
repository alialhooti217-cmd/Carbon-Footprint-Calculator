import { PrismaClient, SourceType } from "@prisma/client";

const prisma = new PrismaClient();

const seedIds = {
  organizationId: "org_demo_001",
  userId: "usr_demo_001",
  facilityId: "fac_demo_001",
  projectId: "prj_demo_001",
};

const emissionFactors: Array<{
  id: string;
  factorName: string;
  category: SourceType;
  region: string;
  unitBasis: string;
  co2eFactor: string;
  sourceReference: string;
  sourceVersion: string;
}> = [
  {
    id: "ef_demo_natgas_001",
    factorName: "Natural gas combustion",
    category: "fuel",
    region: "Global default",
    unitBasis: "kg CO2e/Nm3",
    co2eFactor: "1.900000",
    sourceReference: "IPCC stationary combustion default factor",
    sourceVersion: "2026-demo",
  },
  {
    id: "ef_demo_diesel_001",
    factorName: "Diesel combustion",
    category: "fuel",
    region: "Global default",
    unitBasis: "kg CO2e/liter",
    co2eFactor: "2.680000",
    sourceReference: "IPCC / common industrial diesel factor",
    sourceVersion: "2026-demo",
  },
  {
    id: "ef_demo_grid_oman_001",
    factorName: "Grid electricity - Oman",
    category: "electricity",
    region: "Oman",
    unitBasis: "kg CO2e/kWh",
    co2eFactor: "0.550000",
    sourceReference: "Regional electricity factor placeholder",
    sourceVersion: "2026-demo",
  },
  {
    id: "ef_demo_ammonia_001",
    factorName: "Process emissions - ammonia production",
    category: "process",
    region: "Industrial demo",
    unitBasis: "kg CO2e/tonne product",
    co2eFactor: "1600.000000",
    sourceReference: "Illustrative process factor for demo use",
    sourceVersion: "2026-demo",
  },
];

async function main() {
  await prisma.organization.upsert({
    where: { id: seedIds.organizationId },
    update: {},
    create: {
      id: seedIds.organizationId,
      name: "Demo Carbon Organization",
      industry: "Chemicals",
      country: "Oman",
    },
  });

  await prisma.user.upsert({
    where: { id: seedIds.userId },
    update: {},
    create: {
      id: seedIds.userId,
      email: "demo.engineer@example.com",
      passwordHash: "demo-password-hash",
      fullName: "Demo Process Engineer",
    },
  });

  await prisma.organizationMember.upsert({
    where: {
      organizationId_userId: {
        organizationId: seedIds.organizationId,
        userId: seedIds.userId,
      },
    },
    update: {},
    create: {
      organizationId: seedIds.organizationId,
      userId: seedIds.userId,
      role: "owner",
    },
  });

  await prisma.facility.upsert({
    where: { id: seedIds.facilityId },
    update: {},
    create: {
      id: seedIds.facilityId,
      organizationId: seedIds.organizationId,
      name: "Demo Ammonia Plant",
      country: "Oman",
      region: "Muscat",
      sector: "Chemicals",
    },
  });

  await prisma.project.upsert({
    where: { id: seedIds.projectId },
    update: {},
    create: {
      id: seedIds.projectId,
      facilityId: seedIds.facilityId,
      name: "Utilities Optimization Study",
      description: "Demo project for fuel and electricity tracking.",
    },
  });

  for (const factor of emissionFactors) {
    await prisma.emissionFactor.upsert({
      where: { id: factor.id },
      update: {
        factorName: factor.factorName,
        category: factor.category,
        region: factor.region,
        unitBasis: factor.unitBasis,
        co2eFactor: factor.co2eFactor,
        sourceReference: factor.sourceReference,
        sourceVersion: factor.sourceVersion,
        validFrom: new Date("2026-01-01T00:00:00.000Z"),
      },
      create: {
        ...factor,
        validFrom: new Date("2026-01-01T00:00:00.000Z"),
      },
    });
  }

  console.log("Seed complete.");
  console.log(JSON.stringify(seedIds, null, 2));
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
