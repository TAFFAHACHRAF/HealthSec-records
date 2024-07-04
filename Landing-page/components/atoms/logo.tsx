import { cn } from "@/lib/utils";
import Image from "next/image";

interface ILogo {
  className?: string;
  color?: "regular" | "blue";
}

export const Logo = ({ className, color = "regular" }: ILogo) => {
  return (
    <div className={cn("relative w-[950px] h-[200px]", className)}>
      <Image
        src={color === "regular" ? "/assets/logo4.svg" : "/assets/logo-blue.svg"}
        alt="Whitepace Logo"
        fill
        className="object-fill"
      />
    </div>
  );
};
