import { Circle, IconBox } from "@/components/atoms";
import { cn } from "@/lib/utils";

export const FavoriteApps = () => {
  const circleSize =
    "w-[143px] h-[143px] md:w-[242px] md:h-[242px] lg:w-[264px] lg:h-[264px] xl:w-[291px] xl:h-[291px]";
  const logoSize =
    "w-[22px] h-[22px] md:w-[36px] md:h-[36px] lg:w-[39px] lg:h-[39px] xl:w-[44px] xl:h-[44px]";

  return (
    <div className="relative w-[286px] h-[231px] md:w-[485px] md:h-[392px] lg:w-[528px] lg:h-[427px] xl:w-[582px] xl:h-[470px] flex-shrink-0">
      <Circle
        className={cn("absolute top-0 left-1/2 -translate-x-1/2", circleSize)}
      />
      <Circle
        className={cn("absolute bottom-0 left-0 translate-x-6", circleSize)}
      />
      <Circle
        className={cn("absolute bottom-0 right-0 -translate-x-6", circleSize)}
      />
      <IconBox
        src="/assets/logo-alt.svg"
        className="rounded-full absolute top-[50%] left-1/2 -translate-x-1/2"
      />
      <IconBox
        src="/assets/gmail.svg"
        className="rounded-full absolute -translate-y-1/2 left-1/2 -translate-x-1/2"
        iconClassName={logoSize}
      />
      <IconBox
        src="/assets/dropbox.svg"
        className="rounded-full absolute top-[60%] -translate-x-1/4"
        iconClassName={logoSize}
      />
      <IconBox
        src="/assets/slack-alt.svg"
        className="rounded-full absolute top-[30%] left-[25%] -translate-x-1/2"
        iconClassName={logoSize}
      />
      <IconBox
        src="/assets/outlook.svg"
        className="rounded-full absolute top-[30%] right-[25%] translate-x-1/2"
        iconClassName={logoSize}
      />
      <IconBox
        src="/assets/google-drive.svg"
        className="rounded-full absolute top-[60%] right-0 translate-x-1/4"
        iconClassName={logoSize}
      />
      <IconBox
        src="/assets/google-calendar.svg"
        className="rounded-full absolute bottom-[5%] left-1/2 -translate-x-1/2"
        iconClassName={logoSize}
      />
    </div>
  );
};
