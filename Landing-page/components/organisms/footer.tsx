import { Button, Container } from "@/components/atoms";
import {
  FooterBottom,
  FooterCtaText,
  FooterText,
} from "@/components/molecules";
import { useAttributionModal } from "@/stores";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  const attributionModal = useAttributionModal();

  return (
    <Container className="bg-secondary text-white">
      <div className="flex flex-col pt-[140px] pb-8 gap-y-[80px] md:gap-y-[100px] w-full">
        <div className="w-full flex flex-col items-center justify-center md:items-start md:justify-start lg:flex-row gap-y-[80px] md:gap-y-[100px] lg:justify-between">
          <div className="w-full max-w-[240px]">
            <FooterText />
          </div>
          <div className="flex flex-col items-center justify-center md:items-start md:justify-start gap-y-4">
            <h6 className="text-p2Bold font-bold">Product</h6>
            <Link href="/" className="text-p3 hover:underline transition">
              Overview
            </Link>
            <Link href="/" className="text-p3 hover:underline transition">
              Pricing
            </Link>
            <Link href="/" className="text-p3 hover:underline transition">
              Customer stories
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center md:items-start md:justify-start gap-y-4">
            <h6 className="text-p2Bold font-bold">Resources</h6>
            <Link href="/" className="text-p3 hover:underline transition">
              Blog
            </Link>
            <Link href="/" className="text-p3 hover:underline transition">
              Guides & tutorials
            </Link>
            <Link href="/" className="text-p3 hover:underline transition">
              Help center
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center md:items-start md:justify-start gap-y-4">
            <h6 className="text-p2Bold font-bold">Company</h6>
            <Link href="/" className="text-p3 hover:underline transition">
              About us
            </Link>
            <Link href="/" className="text-p3 hover:underline transition">
              Careers
            </Link>
            <Link href="/" className="text-p3 hover:underline transition">
              Media kit
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center md:items-start md:justify-start gap-y-4 max-w-[201px]">
            <FooterCtaText />
            <div className="z-10">
              <Button
                onClick={() => attributionModal.onOpen()}
                size="with-icon"
              >
                Start Today
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full flex lg:pt-8 lg:border-t lg:border-[#2E4E73]">
          <FooterBottom />
        </div>
      </div>
    </Container>
  );
};
