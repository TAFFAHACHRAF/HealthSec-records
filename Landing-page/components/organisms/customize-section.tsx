import { Button, Container } from "@/components/atoms";
import { HeroImage, Section3Text } from "@/components/molecules";
import { useAttributionModal } from "@/stores";
import { ArrowRight } from "lucide-react";

export const CustomizeSection = () => {
  const attributionModal = useAttributionModal();

  return (
    <div className="w-full">
      <Container className="text-white bg-secondary">
        <div className="flex flex-col lg:flex-row items-center justify-between lg:justify-center py-[80px] md:pt-[140px] md:pb-[100px] lg:py-[140px] xl:py-[100px] 2xl:py-[140px] lg:gap-x-[60px] 2xl:gap-x-[98px] gap-y-[60px]">
          <div className="flex items-center lg:items-start flex-col gap-y-[60px]">
            <Section3Text />
            <div className="z-10">
              <Button
                onClick={() => attributionModal.onOpen()}
                size="with-icon"
              >
                Let&apos; Go
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <HeroImage imgSrc="/assets/Hospital bed-pana.svg" />
        </div>
      </Container>
    </div>
  );
};
