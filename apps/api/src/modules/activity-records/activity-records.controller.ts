import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ActivityRecordsService } from "./activity-records.service";
import type { CreateActivityRecordRequest } from "@carbon/types";

@Controller("activity-records")
export class ActivityRecordsController {
  constructor(private readonly activityRecordsService: ActivityRecordsService) {}

  @Get()
  listActivityRecords(@Query("facilityId") facilityId?: string) {
    return this.activityRecordsService.listActivityRecords(facilityId);
  }

  @Post()
  createActivityRecord(@Body() body: CreateActivityRecordRequest) {
    return this.activityRecordsService.createActivityRecord(body);
  }
}
