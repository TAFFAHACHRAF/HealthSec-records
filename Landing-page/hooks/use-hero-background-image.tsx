import { useMediaQuery } from "@/hooks";

export const useHeroBackgroundImage = (): string => {
  const md = useMediaQuery("(min-width: 768px)");
  const lg = useMediaQuery("(min-width: 1152px");
  const xl = useMediaQuery("(min-width: 1440px)");
  const xxl = useMediaQuery("(min-width: 1920px)");

  let imgSrc = "/assets/hero-bg.svg";

  if (xxl) {
    imgSrc = "assets/hero-bg-2xl.svg";
  } else if (xl) {
    imgSrc = "assets/hero-bg-xl.svg";
  } else if (lg) {
    imgSrc = "assets/hero-bg-lg.svg";
  } else if (md) {
    imgSrc = "assets/hero-bg-md.svg";
  }

  return imgSrc;
};
