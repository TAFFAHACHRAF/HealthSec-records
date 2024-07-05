import { Logo } from "@/components/atoms";
import { Stroke } from "@/components/molecules/decoration";

export const Section1Text = () => {
  return (
    <div className="flex flex-col gap-y-6 z-10">
      <h1 className="text-h4 md:text-h3 lg:text-h2 xl:text-h1 font-bold text-center lg:text-left">
        Continuity{" "}
        <span className="relative">
          <span className="relative z-50">of care</span>
          <div className="absolute flex -bottom-3 left-0 z-10">
            <Stroke
              className="w-[228px] h-[26px] md:w-[345px] md:h-[31px] lg:w-[418px] lg:h-[38px] xl:w-[515px] xl:h-[36px] flex-shrink-0"
              imgSrc="/assets/stroke.svg"
            />
          </div>
        </span>
      </h1>
      <p className="text-p2 text-center lg:text-left">
        With our solution, patients do not need to repeat their medical history, reducing potential delays and avoiding repeated tests, thereby decreasing costs.
      </p>
    </div>
  );
};

export const Section2Text = () => {
  return (
    <div className="flex flex-col gap-y-6 z-10">
      <h1 className="text-h4 md:text-h3 lg:text-h2 xl:text-h1 font-bold text-center lg:text-left">
        Work{" "}
        <span className="relative">
          <span className="relative z-50">together</span>
          <div className="absolute flex -bottom-1 left-0 z-10">
            <Stroke
              className="w-[169px] h-[25px] md:w-[224px] md:h-[21px] lg:w-[266px] lg:h-[24px] xl:w-[298px] xl:h-[28px] flex-shrink-0"
              imgSrc="/assets/stroke-1.svg"
            />
          </div>
        </span>
      </h1>
      <p className="text-p2 text-center lg:text-left">
        With our solution, you can access patient records anywhere, always having the most updated version available.
      </p>
    </div>
  );
};

export const Section3Text = () => {
  return (
    <div className="flex flex-col gap-y-6 z-10">
      <h1 className="text-h4 md:text-h3 lg:text-h2 xl:text-h1 font-bold text-center lg:text-left">
        Benefit from AI{" "}
        <span className="relative">
          <span className="relative z-50">assistance</span>
          <div className="absolute flex -bottom-1 md:bottom-0 xl:bottom-2 left-0 z-10">
            <Stroke
              className="w-[120px] h-[29px] md:w-[191px] md:h-[19px] lg:w-[200px] lg:h-[19px] xl:w-[205px] xl:h-[19px] flex-shrink-0"
              imgSrc="/assets/stroke.svg"
            />
          </div>
        </span>
      </h1>
      <p className="text-p2 text-center lg:text-left">
        Our advanced algorithms analyze symptoms to provide precise diagnoses and treatment recommendations.
      </p>
    </div>
  );
};

export const PricingSectionText = () => {
  return (
    <div className="flex flex-col gap-y-6 z-10" id="pricing">
      <h1 className="text-h4 md:text-h3 lg:text-h2 xl:text-h1 font-bold text-center">
        Choose Your{" "}
        <span className="relative">
          <span className="relative z-50">Plan</span>
          <div className="absolute flex -bottom-1 md:bottom-0 xl:bottom-2 left-0 z-10">
            <Stroke
              className="w-[80px] h-[19px] md:w-[200px] md:h-[19px] lg:w-[200px] lg:h-[19px] xl:w-[205px] xl:h-[19px] flex-shrink-0"
              imgSrc="/assets/stroke.svg"
            />
          </div>
        </span>
      </h1>
      <p className="text-p2 text-center w-full lg:max-w-[979px]">
        Private or public healthcare institution, choose your preferred subscription plan to get started
      </p>
    </div>
  );
};

export const Section4Text = () => {
  return (
    <div className="flex flex-col gap-y-[60px] z-10 w-full xl:max-w-[1064px]">
      <h1 className="text-h4 md:text-h3 lg:text-h2 xl:text-h1 font-bold text-center">
        Your work, everywhere you are
      </h1>
      <p className="text-p2 text-center">
        Access your notes from your computer, phone or tablet by synchronizing
        with various services, including whitespace, Dropbox and OneDrive. The
        app is available on Windows, macOS, Linux, Android, and iOS. A terminal
        app is also available.
      </p>
    </div>
  );
};

export const Section5Text = () => {
  return (
    <div className="flex flex-col gap-y-6 z-10">
      <h1 className="text-h4 md:text-h3 lg:text-h2 xl:text-h1 font-bold text-center lg:text-left">
        100%{" "}
        <span className="relative">
          <span className="relative z-50">your data</span>
          <div className="absolute flex -bottom-1 md:bottom-0 xl:bottom-2 left-0 z-10">
            <Stroke
              className="w-[193px] h-[24px] md:w-[280px] md:h-[25px] lg:w-[283px] lg:h-[22px] xl:w-[328px] xl:h-[30px] flex-shrink-0"
              imgSrc="/assets/stroke.svg"
            />
          </div>
        </span>
      </h1>
      <p className="text-p2 text-center lg:text-left w-full lg:max-w-[979px]">
        The app is open source and your notes are saved to an open format, so
        you&apos;ll always have access to them. Uses End-To-End Encryption
        (E2EE) to secure your notes and ensure no-one but yourself can access
        them.
      </p>
    </div>
  );
};

export const SponsorsText = () => {
  return (
    <h1 className="text-h4 md:text-h3 lg:text-h2 xl:text-h1 font-bold text-center lg:text-left">
      Our{" "}
      <span className="relative">
        <span className="relative z-50">sponsors</span>
        <div className="absolute flex -bottom-1 md:bottom-0 xl:bottom-2 left-0 z-10">
          <Stroke
            className="w-[193px] h-[24px] md:w-[280px] md:h-[25px] lg:w-[283px] lg:h-[22px] xl:w-[328px] xl:h-[30px] flex-shrink-0"
            imgSrc="/assets/stroke.svg"
          />
        </div>
      </span>
    </h1>
  );
};

export const Section6Text = () => {
  return (
    <div className="flex flex-col gap-y-[24px] z-10 w-full xl:max-w-[1064px]">
      <h1 className="text-h4 md:text-h3 lg:text-h2 xl:text-h1 font-bold text-center lg:text-left">
        Simplify your medical data management using Healthsec Records
      </h1>
      <p className="text-p2 text-center lg:text-left">
        Healthsec Records provides secure and efficient solutions for managing medical data, ensuring compliance and ease of access for healthcare providers.
      </p>
    </div>
  );
};

export const CtaText = () => {
  return (
    <div className="flex flex-col gap-y-[24px] z-10 w-full md:max-w-[608px]">
      <h1 className="text-h4 md:text-h3 lg:text-h2 xl:text-h1 font-bold text-center">
        Try Healthsec records today
      </h1>
      <p className="text-p2 md:text-p1 text-center">
        Get started for free.
        <br />
        Add your whole team as your needs grow.
      </p>
    </div>
  );
};

export const FooterText = () => {
  return (
    <div className="flex flex-col items-center justify-center md:items-start gap-6 lg:gap-4">
      <p className="text-p2 text-center md:text-left">
        Healthsec Records was created for the new ways we live and work.
      </p>
    </div>
  );
};


export const FooterCtaText = () => {
  return (
    <div className="flex flex-col gap-y-[24px] z-10 w-full">
      <h1 className="text-h5 font-bold text-center md:text-left">
        Try It Today
      </h1>
      <p className="text-p2 text-center md:text-left">
        Get started for free.
        <br />
        Add your whole teams as your needs grow.
      </p>
    </div>
  );
};
