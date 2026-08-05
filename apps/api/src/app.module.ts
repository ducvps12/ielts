import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module.js";
import { PaymentCapabilitiesController } from "./commerce/payment-capabilities.controller.js";
import { GoalsModule } from "./goals/goals.module.js";
import { HealthController } from "./health/health.controller.js";
import { VideoLearningCapabilitiesController } from "./video-learning/video-learning-capabilities.controller.js";

@Module({
  imports: [AuthModule, GoalsModule],
  controllers: [
    HealthController,
    PaymentCapabilitiesController,
    VideoLearningCapabilitiesController,
  ],
})
export class AppModule {}
