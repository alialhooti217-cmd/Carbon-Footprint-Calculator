import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EmissionFactorsModule } from "./emission-factors/emission-factors.module";
import { ActivityRecordsModule } from "./activity-records/activity-records.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [PrismaModule, EmissionFactorsModule, ActivityRecordsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
