import { Button } from "@/components/atoms";
import { cn } from "@/lib/utils";
import { useAttributionModal } from "@/stores";
import { IPlansType } from "@/types";
import Image from "next/image";

interface IPricingCard {
  isHighlight?: boolean;
  className?: string;
  plan: IPlansType;
  price: string;
  desc: string;
  benefits: string[];
}

export const PricingCard = ({
  isHighlight = false,
  className,
  plan,
  price,
  desc,
  benefits = [],
}: IPricingCard) => {
  const attributionModal = useAttributionModal();

  return (
    <div
      className={cn(
        "w-full flex flex-col gap-y-[25px] border border-border rounded-[10px] py-[44px] px-[40px] text-accent-black",
        isHighlight && "border-none bg-secondary py-20 text-white",
        className,
      )}
    >
      <h1 className="text-p1SemiBold font-semibold">{plan}</h1>
      <p
        className="text-h4 font-bold"
        style={{ color: isHighlight ? "#FFE492" : "" }}
      >
        {price}
      </p>
      <p className="text-p2Medium font-medium">{desc}</p>
      <div className="flex flex-col gap-y-[28px]">
        {benefits.map((benefit, index) => (
          <div key={index} className="w-full flex items-center gap-x-[19px]">
            <div className="relative w-[18px] h-[18px] flex-shrink-0">
              <Image
                src={
                  isHighlight ? "/assets/check-yellow.svg" : "/assets/check.svg"
                }
                alt="Bullet point"
                fill
                className="object-fill"
              />
            </div>
            <p className="text-p3">{benefit}</p>
          </div>
        ))}
      </div>
      <Button
        variant={isHighlight ? "default" : "outline"}
      >
        Get Started
      </Button>
    </div>
  );
};
