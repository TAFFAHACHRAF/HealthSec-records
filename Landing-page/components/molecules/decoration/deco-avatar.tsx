import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms";
import { cn } from "@/lib/utils";

interface IDecoAvatar {
  imgSrc: string;
  className?: string;
}

export const DecoAvatar = ({ imgSrc, className }: IDecoAvatar) => {
  return (
    <Avatar
      className={cn(
        "w-[28px] h-[28px] md:w-[44px] md:h-[44px] lg:w-[52px] lg:h-[52px] xl:w-[57px] xl:h-[57px] 2xl:w-[70px] 2xl:h-[70px]",
        className,
      )}
    >
      <AvatarImage src={imgSrc} />
      <AvatarFallback>AV</AvatarFallback>
    </Avatar>
  );
};
