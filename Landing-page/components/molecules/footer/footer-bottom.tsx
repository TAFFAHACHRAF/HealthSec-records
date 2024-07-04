import { ChevronDown, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const FooterBottom = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row items-center justify-center md:items-start lg:justify-between">
      <div className="flex flex-col md:flex-row items-center justify-center md:items-start md:justify-start gap-x-[60px] gap-y-5 w-full">
        <div className="flex items-center justify-center gap-[6px]">
          <Globe className="h-5 w-5" />
          English
          <ChevronDown className="h-5 w-5" />
        </div>
        <Link href="/" className="text-p3 hover:underline transition">
          Terms & privacy
        </Link>
        <Link href="/" className="text-p3 hover:underline transition">
          Security
        </Link>
        <Link href="/" className="text-p3 hover:underline transition">
          Status
        </Link>
        <p className="text-p3">©2021 Whitepace LLC.</p>
      </div>
      <div className="flex items-center justify-center md:justify-start lg:justify-end gap-x-8 mt-5 lg:mt-0 pt-5 border-t border-[#2E4E73] lg:border-none lg:pt-0 w-full">
        <Image
          src="/assets/facebook.svg"
          width={9}
          height={16}
          alt="Facebook Logo"
        />
        <Image
          src="/assets/twitter.svg"
          width={17}
          height={13}
          alt="Facebook Logo"
        />
        <Image
          src="/assets/linkedin.svg"
          width={15}
          height={15}
          alt="Facebook Logo"
        />
      </div>
    </div>
  );
};
