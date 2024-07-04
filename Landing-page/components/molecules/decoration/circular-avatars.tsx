import Image from "next/image";
import { DecoAvatar } from "@/components/molecules";

export const CircularAvatars = () => {
  return (
    <div className="relative w-[260px] h-[260px] md:w-[422px] md:h-[422px] lg:w-[491px] lg:h-[491px] xl:w-[542px] xl:h-[542px] 2xl:w-[661px] 2xl:h-[661px] border-2 border-primary-200 border-dashed rounded-full flex-shrink-0 flex flex-col items-center justify-center">
      <div className="relative w-[152px] h-[152px] md:w-[247px] md:h-[247px] lg:w-72 lg:h-72 xl:w-[318px] xl:h-[318px] 2xl:w-[387px] 2xl:h-[387px] border-2 border-primary-200 border-dashed rounded-full flex flex-col items-center justify-center">
        {/* <div className="flex flex-col items-center justify-center bg-white rounded-[10px] w-10 h-10 md:w-16 md:h-16 lg:w-[74px] lg:h-[74px] xl:w-[82px] xl:h-[82px] 2xl:w-[100px] 2xl:h-[100px] shadow-s1 md:shadow-s2 lg:shadow-s3 xl:shadow-s2">
          <div className="relative w-[18px] h-[14px] md:w-[34px] md:h-[26px] lg:w-12 lg:h-[36px] xl:w-[53px] xl:h-[40px]">
            <Image
              src="/assets/logo4.svg"
              alt="Logo"
              fill
              className="object-cover"
            />
          </div>
        </div> */}
        <DecoAvatar
          imgSrc="/assets/avatars/doctor2.png"
          className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2"
        />
        <DecoAvatar
          imgSrc="/assets/avatars/doctor.png"
          className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2"
        />
        <DecoAvatar
          imgSrc="/assets/avatars/doctor2.png"
          className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2"
        />
        <DecoAvatar
          imgSrc="/assets/avatars/doctor.png"
          className="absolute bottom-1/2 translate-y-1/2 right-0 translate-x-1/2"
        />
      </div>
      <DecoAvatar
        imgSrc="/assets/avatars/doctor2.png"
        className="absolute top-0.5 left-[25%] -translate-x-1/2"
      />
      <DecoAvatar
        imgSrc="/assets/avatars/doctor.png"
        className="absolute top-0.5 right-[25%] translate-x-1/2"
      />
      <DecoAvatar
        imgSrc="/assets/avatars/doctor2.png"
        className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2"
      />
      <DecoAvatar
        imgSrc="/assets/avatars/doctor.png"
        className="absolute bottom-0.5 left-[25%] -translate-x-1/2"
      />
      <DecoAvatar
        imgSrc="/assets/avatars/doctor2.png"
        className="absolute top-1/2 right-0 translate-x-1/2"
      />
    </div>
  );
};
