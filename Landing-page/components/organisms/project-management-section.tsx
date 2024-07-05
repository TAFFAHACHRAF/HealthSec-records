import { Button, Container } from "@/components/atoms";
import { HeroImage, Section1Text } from "@/components/molecules";
import { useAttributionModal } from "@/stores";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export const ProjectManagementSection = () => {
  const attributionModal = useAttributionModal();

  return (
    <div className="w-full relative">
      <Container className="text-accent-black gap-y-[60px]">
        <div className="w-full flex flex-col items-center justify-between gap-y-[60px] lg:flex-row py-[80px] md:pt-[140px] md:pb-[100px] lg:py-[140px] xl:py-[100px] 2xl:py-[140px]">
          <div className="flex items-center lg:items-start flex-col gap-y-[60px]">
            <Section1Text />
            <div className="z-10">
            <a
              href="http://localhost:7075/"
            >
              <Button
                  // onClick={() => attributionModal.onOpen()}
                  size="with-icon"
                >
                Get started
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            </div>
          </div>
          <HeroImage imgSrc="/assets/World health day-bro.svg" />
        </div>
      </Container>
      <div className="absolute top-10 -left-[40%] h-[168px] w-[295px] md:w-[356px] md:h-[270px] md:top-20 md:-left-[17%] lg:w-[273px] lg:h-[245px] lg:-left-[6%] xl:w-[569px] xl:h-[440px] xl:top-0 xl:-left-[20%] 2xl:w-[602px] 2xl:h-[448px] 2xl:top-64 2xl:-left-[5%]">
        <Image
          src="/assets/web.svg"
          fill
          className="object-fill"
          alt="Decoration"
        />
      </div>
    </div>
  );
};
