import { Module } from "@nestjs/common";

import { PaymentCapabilitiesController } from "./commerce/payment-capabilities.controller.js";
import { HealthController } from "./health/health.controller.js";

@Module({
  controllers: [HealthController, PaymentCapabilitiesController],
})
export class AppModule {}
