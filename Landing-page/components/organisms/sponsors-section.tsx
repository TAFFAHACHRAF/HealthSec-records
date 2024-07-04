import { Container } from "@/components/atoms";
import { sponsors } from "@/content";
import { useSponsorLogoSize } from "@/hooks";
import Image from "next/image";
import { SponsorsText } from "@/components/molecules";

export const SponsorsSection = () => {
  return (
    <Container>
      <div className="w-full flex flex-col items-center justify-center gap-y-[100px] py-[80px] md:pt-[140px] md:pb-[100px] lg:py-[140px] xl:py-[100px] 2xl:py-[140px]">
        <SponsorsText />
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-y-[100px] w-full">
          {sponsors.map((sponsor, index) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { width, height } = useSponsorLogoSize({
              type: sponsor.type,
            });

            return (
              <Image
                key={index}
                src={sponsor.src}
                alt={sponsor.type}
                width={width}
                height={height}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
};
