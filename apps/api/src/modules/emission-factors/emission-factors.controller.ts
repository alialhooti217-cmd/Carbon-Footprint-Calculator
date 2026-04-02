import { Controller, Get, Query } from "@nestjs/common";
import { SourceType } from "@prisma/client";
import { EmissionFactorsService } from "./emission-factors.service";

@Controller("emission-factors")
export class EmissionFactorsController {
  constructor(private readonly emissionFactorsService: EmissionFactorsService) {}

  @Get()
  listEmissionFactors(@Query("category") category?: SourceType) {
    return this.emissionFactorsService.listEmissionFactors(category);
  }
}
