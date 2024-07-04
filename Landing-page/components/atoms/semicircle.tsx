import { cn } from "@/lib/utils";

interface ISemicircle {
  className?: string;
  children?: React.ReactNode;
}

export const Semicircle = ({ className, children = <></> }: ISemicircle) => {
  return (
    <div
      className={cn(
        "w-[256px] h-[128px] md:w-[451px] md:h-[225px] lg:w-[494px] lg:h-[247px] xl:w-[600px] xl:h-[300px] border-[3px] border-primary-200 border-dashed rounded-t-full",
        className,
      )}
    >
      {children}
    </div>
  );
};
