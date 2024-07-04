import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/atoms";
import { PricingCard } from "@/components/molecules";
import { silverPlan, goldPlan, diamondPlan } from "@/content";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const PricingCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="flex flex-col items-center gap-y-6 w-full">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{ align: "center", startIndex: 1 }}
      >
        <CarouselContent>
          <CarouselItem className="pl-5 md:basis-[60%] md:mt-[40px]">
            <PricingCard {...silverPlan} />
          </CarouselItem>
          <CarouselItem className="pl-8 md:basis-[60%]">
            <PricingCard isHighlight {...goldPlan} />
          </CarouselItem>
          <CarouselItem className="pl-8 pr-5 md:basis-[60%] md:mt-[40px]">
            <PricingCard {...diamondPlan} />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      <div className="flex items-center justify-center gap-x-3 md:hidden">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-3 h-3 rounded-full bg-primary",
              current === index && "bg-secondary",
            )}
          />
        ))}
      </div>
    </div>
  );
};
