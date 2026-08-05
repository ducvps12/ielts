import { BenefitsSection } from "../../components/marketing/benefits-section";
import { CtaSection } from "../../components/marketing/cta-section";
import { HeroSection } from "../../components/marketing/hero-section";
import { HowItWorksSection } from "../../components/marketing/how-it-works-section";
import { JourneySection } from "../../components/marketing/journey-section";
import { ProductPreview } from "../../components/marketing/product-preview";
import {
  FaqSection,
  SocialProofSection,
} from "../../components/marketing/trust-and-faq";

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <ProductPreview />
      <BenefitsSection />
      <HowItWorksSection />
      <JourneySection />
      <SocialProofSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
