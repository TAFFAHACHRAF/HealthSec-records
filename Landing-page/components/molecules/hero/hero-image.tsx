import Image from "next/image";

interface IHeroImage {
  imgSrc: string;
}

export const HeroImage = ({ imgSrc }: IHeroImage) => {
  return (
    <div className="relative w-full aspect-[3/2] md:w-[551px] md:h-[367px] lg:w-[526px] lg:h-[350px] xl:w-[685px] xl:h-[456px] 2xl:w-[824px] 2xl:h-[549px] flex-shrink-0 z-10">
      <Image src={imgSrc} alt="Hero Image" fill className="object-cover" />
    </div>
  );
};
