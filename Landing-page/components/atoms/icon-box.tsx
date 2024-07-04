import { cn } from "@/lib/utils";
import Image from "next/image";

interface IIconBox {
  className?: string;
  iconClassName?: string;
  src: string;
}

export const IconBox = ({ className, iconClassName, src }: IIconBox) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center bg-white rounded-[10px] w-10 h-10 md:w-16 md:h-16 lg:w-[74px] lg:h-[74px] xl:w-[82px] xl:h-[82px] shadow-s1 md:shadow-s2 lg:shadow-s3 xl:shadow-s2",
        className,
      )}
    >
      <div
        className={cn(
          "relative w-[18px] h-[14px] md:w-[34px] md:h-[26px] lg:w-12 lg:h-[36px] xl:w-[53px] xl:h-[40px]",
          iconClassName,
        )}
      >
        <Image src={src} alt="Logo" fill className="object-cover" />
      </div>
    </div>
  );
};
