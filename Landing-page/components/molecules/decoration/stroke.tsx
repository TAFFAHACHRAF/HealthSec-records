import { cn } from "@/lib/utils";
import Image from "next/image";

interface IStroke {
  className?: string;
  imgSrc: string;
}

export const Stroke = ({ className, imgSrc }: IStroke) => {
  return (
    <div className={cn("relative", className)}>
      <Image
        src={imgSrc}
        alt="Stroke"
        fill
        className="object-fill md:object-cover"
      />
    </div>
  );
};
