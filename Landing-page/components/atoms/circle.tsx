import { cn } from "@/lib/utils";

interface ICircle {
  className?: string;
}

export const Circle = ({ className }: ICircle) => {
  return (
    <div
      className={cn(
        "w-[291px] h-[291px] rounded-full border-2 border-secondary-200 border-dashed",
        className,
      )}
    />
  );
};
