import { cn } from "@/lib/utils";
import Image from "next/image";

interface ILogo {
  className?: string;
  color?: "white" | "blue";
}

export const Logo = ({ className, color = "white" }: ILogo) => {
  return (
    <div className={cn("relative w-[950px] h-[200px]", className)}>
      <Image
        src={color === "white" ? "/assets/logo4.svg" : "/assets/logo-blue.svg"}
        alt="Healthsec records Logo"
        fill
        className="object-fill"
      />
    </div>
  );
};
