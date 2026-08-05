import { Module } from "@nestjs/common";

import { PaymentCapabilitiesController } from "./commerce/payment-capabilities.controller.js";
import { HealthController } from "./health/health.controller.js";
import { VideoLearningCapabilitiesController } from "./video-learning/video-learning-capabilities.controller.js";

@Module({
  controllers: [
    HealthController,
    PaymentCapabilitiesController,
    VideoLearningCapabilitiesController,
  ],
})
export class AppModule {}
