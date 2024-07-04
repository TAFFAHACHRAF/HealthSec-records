import { useHeroBackgroundImage } from "@/hooks";
import Image from "next/image";

export const HeroBackground = () => {
  const imgSrc = useHeroBackgroundImage();

  return <Image fill className="object-cover" src={imgSrc} alt="Abstract" />;
};
