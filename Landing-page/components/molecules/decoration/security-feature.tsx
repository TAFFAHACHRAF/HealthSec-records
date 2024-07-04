import { IconBox, Semicircle } from "@/components/atoms";

export const SecurityFeature = () => {
  return (
    <Semicircle className="relative flex-shrink-0">
      <div className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 p-3 md:p-5 lg:p-[22px] xl:p-6 rounded-[10px] border-[3px] border-dashed border-primary-200">
        <IconBox
          src="/assets/logo5-alt.svg"
          className="xl:w-[80px] xl:h-[80px]"
        />
      </div>
      <IconBox
        src="/assets/key.svg"
        className="absolute top-2 left-[20%] -translate-x-1/2 xl:w-[80px] xl:h-[80px] z-10"
        iconClassName="w-[20px] h-[20px] md:w-[36px] md:h-[36px] lg:w-[42px] lg:h-[42px] xl:w-[40px] xl:w-[40px]"
      />
      <IconBox
        src="/assets/database.svg"
        className="absolute top-2 right-[20%] translate-x-1/2 xl:w-[80px] xl:h-[80px] z-10"
        iconClassName="w-[20px] h-[20px] md:w-[36px] md:h-[36px] lg:w-[42px] lg:h-[42px] xl:w-[40px] xl:w-[40px]"
      />
      <IconBox
        src="/assets/protection.svg"
        className="absolute bottom-0 translate-y-1/2 left-0 -translate-x-1/2 xl:w-[80px] xl:h-[80px]"
        iconClassName="w-[20px] h-[20px] md:w-[36px] md:h-[36px] lg:w-[42px] lg:h-[42px] xl:w-[48px] xl:w-[48px]"
      />
      <IconBox
        src="/assets/padlock.svg"
        className="absolute bottom-0 translate-y-1/2 right-0 translate-x-1/2 xl:w-[80px] xl:h-[80px]"
        iconClassName="w-[20px] h-[20px] md:w-[36px] md:h-[36px] lg:w-[42px] lg:h-[42px] xl:w-[40px] xl:w-[40px]"
      />
      {/* Circles */}
      <div className="absolute bottom-0 translate-y-1/2 right-1/4 translate-x-1/2 w-3 h-3 md:w-5 md:h-5 xl:w-[26px] xl:h-[26px] rounded-full bg-primary-200" />
      <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-3 h-3 md:w-5 md:h-5 xl:w-[26px] xl:h-[26px] rounded-full bg-primary-200" />
      <div className="absolute top-1/2 -translate-y-1/2 left-[30%] -translate-x-1/2 w-3 h-3 md:w-5 md:h-5 xl:w-[26px] xl:h-[26px] rounded-full bg-primary-200" />
      {/* Lines */}
      <div className="absolute top-1/2 -translate-y-1/2 left-[30%] -translate-x-1/2 w-[76px] md:w-[140px] xl:w-[209px] border-2 border-dashed border-primary-200 rotate-[56deg]" />
      <div className="absolute top-1/2 -translate-y-1/2 right-[30%] translate-x-1/2 w-[76px] md:w-[140px] xl:w-[209px] border-2 border-dashed border-primary-200 rotate-[-56deg]" />
    </Semicircle>
  );
};
