import { Button, Container } from "@/components/atoms";
import { Section4Text } from "@/components/molecules";
import { useAttributionModal } from "@/stores";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export const CallToActionSection = () => {
  const attributionModal = useAttributionModal();

  return (
    <Container className="flex flex-col gap-y-60 bg-secondary text-white relative">
      <div className="w-full pt-[100px] md:pt-[140px] pb-[140px] flex flex-col items-center justify-center gap-y-[60px]">
        <Section4Text />
        <Button onClick={() => attributionModal.onOpen()} size="with-icon">
          Try Whitepace
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
      <div className="hidden md:flex absolute md:w-[680px] md:h-[500px] md:rotate-[-105deg] md:top-[35%] md:-translate-y-1/2 md:-left-[55%] lg:-left-[30%] xl:-left-[20%]">
        <Image
          src="/assets/web-alt.svg"
          alt="Decoration"
          fill
          className="object-fill"
        />
      </div>
    </Container>
  );
};
