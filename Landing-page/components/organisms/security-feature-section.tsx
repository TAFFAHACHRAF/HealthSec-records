import { Button, Container } from "@/components/atoms";
import { Section5Text, SecurityFeature } from "@/components/molecules";
import { useAttributionModal } from "@/stores";
import { ArrowRight } from "lucide-react";

export const SecurityFeatureSection = () => {
  const attributionModal = useAttributionModal();

  return (
    <Container className="text-accent-black">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between lg:justify-start py-[80px] md:pt-[140px] md:pb-[100px] lg:py-[140px] xl:py-[100px] 2xl:py-[140px] gap-y-[60px] xl:gap-x-[160px] w-full xl:pr-10 2xl:pr-0">
        <div className="flex flex-col items-center lg:items-start gap-y-[60px] mt-[60px]">
          <Section5Text />
          <div className="z-10">
            <Button onClick={() => attributionModal.onOpen()} size="with-icon">
              Read more
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <SecurityFeature />
      </div>
    </Container>
  );
};
