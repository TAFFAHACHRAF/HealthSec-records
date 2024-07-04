import { Button, Container } from "@/components/atoms";
import { CtaText } from "@/components/molecules";
import { useMediaQuery } from "@/hooks";
import { useAttributionModal } from "@/stores";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const CtaSection = () => {
  const matches = useMediaQuery("(min-width: 760px)");
  const attributionModal = useAttributionModal();

  return (
    <Container>
      <div className="flex flex-col items-center justify-center gap-10 pb-8 pt-[140px]">
        <CtaText />
        <div className="z-10">
          <Button onClick={() => attributionModal.onOpen()} size="with-icon">
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-p2 md:text-p1 text-center">
          On a big team?{" "}
          <Link href="" className="hover:underline transition">
            Contact sales
          </Link>
        </p>
        <div className="flex items-center justify-center gap-10">
          <Image
            src="/assets/apple-black.svg"
            alt="Apple Logo"
            height={matches ? 60 : 36}
            width={matches ? 60 : 35}
          />
          <Image
            src="/assets/windows.svg"
            alt="Windows Logo"
            height={matches ? 60 : 36}
            width={matches ? 60 : 35}
          />
          <Image
            src="/assets/android.svg"
            alt="Android Logo"
            height={matches ? 60 : 36}
            width={matches ? 60 : 35}
          />
        </div>
      </div>
    </Container>
  );
};
