import { Controller, Get } from "@nestjs/common";

interface HealthPayload {
  status: "ok";
  service: "levelup-api";
  timestamp: string;
  uptimeSeconds: number;
}

@Controller("health")
export class HealthController {
  @Get()
  health(): HealthPayload {
    return {
      status: "ok",
      service: "levelup-api",
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
    };
  }

  @Get("ready")
  readiness(): HealthPayload {
    return this.health();
  }
}
