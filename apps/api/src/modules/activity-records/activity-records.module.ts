import { Module } from "@nestjs/common";
import { ActivityRecordsController } from "./activity-records.controller";
import { ActivityRecordsService } from "./activity-records.service";

@Module({
  controllers: [ActivityRecordsController],
  providers: [ActivityRecordsService],
})
export class ActivityRecordsModule {}
