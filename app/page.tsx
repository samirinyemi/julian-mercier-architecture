import { HeroSection } from "@/components/HeroSection";
import { StudioStatement } from "@/components/StudioStatement";
import { MaterialsMarquee } from "@/components/MaterialsMarquee";
import { SelectedWork } from "@/components/SelectedWork";
import { AllProjectsCTA } from "@/components/AllProjectsCTA";
import { Numbers } from "@/components/Numbers";
import { ProcessSteps } from "@/components/ProcessSteps";
import { JournalTeaser } from "@/components/JournalTeaser";
import { ManifestoQuote } from "@/components/ManifestoQuote";
import { ClosingCTA } from "@/components/ClosingCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StudioStatement />
      <MaterialsMarquee />
      <SelectedWork />
      <AllProjectsCTA />
      <Numbers />
      <ProcessSteps />
      <ManifestoQuote />
      <JournalTeaser />
      <ClosingCTA />
    </>
  );
}
