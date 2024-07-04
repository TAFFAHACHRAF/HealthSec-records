import { Button, Container } from "@/components/atoms";
import { CircularAvatars, Section2Text } from "@/components/molecules";
import { useAttributionModal } from "@/stores";
import { ArrowRight } from "lucide-react";

export const WorkTogetherSection = () => {
  const attributionModal = useAttributionModal();

  return (
    <div className="w-full">
      <Container className="text-accent-black">
        <div className="h-full flex flex-col lg:flex-row items-center justify-between lg:justify-center gap-y-[100px] lg:gap-x-[100px] xl:gap-x-[160px] 2xl:gap-x-[100px] py-[80px] md:pt-[140px] md:pb-[100px] lg:py-[140px] xl:py-[100px] 2xl:py-[140px]">
          <CircularAvatars />
          <div className="flex items-center lg:items-start flex-col gap-y-[60px]">
            <Section2Text />
            <div className="z-10">
              <Button
                onClick={() => attributionModal.onOpen()}
                size="with-icon"
              >
                Try it now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
