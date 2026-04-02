import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHealth() {
    return {
      data: {
        status: "ok",
        service: "api",
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
      error: null,
    };
  }
}
