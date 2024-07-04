import React, { useState } from "react";
import { Container } from "@/components/atoms";
import {
  PricingCard,
  PricingCarousel,
  PricingSectionText,
} from "@/components/molecules";
import { silverPlan, goldPlan, diamondPlan } from "@/content";

export const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);

  const toggleSubscription = () => {
    setIsYearly((prevIsYearly) => !prevIsYearly);
  };

  const getPlanPrice = (price: string) => {
    if (isYearly) {
      const monthlyPrice = parseFloat(price.replace("$", ""));
      const yearlyPrice = monthlyPrice * 12;
      return `$${yearlyPrice.toFixed(2)} / year`;
    } else {
      return price;
    }
  };

  return (
    <div className="w-full pb-[80px] md:pb-[100px] lg:pb-0">
      <Container className="text-accent-black">
        <div className="w-full flex lg:flex-col items-center justify-center gap-y-[60px] py-[80px] md:pt-[140px] md:pb-[100px] lg:py-[140px] xl:py-[100px] 2xl:py-[140px]">
          <PricingSectionText />
          <div className="hidden lg:flex w-full items-center justify-center gap-x-8">
            <PricingCard
              {...silverPlan}
              price={getPlanPrice(silverPlan.price)}
            />
            <PricingCard
              isHighlight
              {...goldPlan}
              price={getPlanPrice(goldPlan.price)}
            />
            <PricingCard
              {...diamondPlan}
              price={getPlanPrice(diamondPlan.price)}
            />
          </div>
          <div className="mt-8 lg:hidden flex justify-center">
            <button
              className="text-primary font-semibold underline"
              onClick={toggleSubscription}
            >
              {isYearly ? "Switch to Monthly" : "Switch to Yearly"}
            </button>
          </div>
        </div>
      </Container>
      <div className="w-full flex items-center justify-center overflow-hidden lg:hidden">
        <PricingCarousel />
      </div>
    </div>
  );
};
