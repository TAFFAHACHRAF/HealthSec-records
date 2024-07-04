import { connectAndLearn, explore } from "@/content";
import Link from "next/link";
import { NavLink } from "@/components/molecules";

export const NavResources = () => {
  return (
    <div className="flex flex-col gap-y-3 xl:flex-row justify-between md:w-[400px] lg:w-[500px] p-1">
      <ul className="flex flex-col gap-y-2">
        <h1 className="text-p3Medium font-bold text-accent-black/75 p-2">
          Connect & Learn
        </h1>
        {connectAndLearn.map((item, index) => (
          <Link
            key={index}
            href="/"
            className="hover:bg-accent-black/5 p-2 rounded-lg transition-colors"
          >
            <NavLink title={item} />
          </Link>
        ))}
      </ul>
      <ul className="flex flex-col gap-y-2">
        <h1 className="text-p3Medium font-bold text-accent-black/75 p-2">
          Explore
        </h1>
        {explore.map((item, index) => (
          <Link
            key={index}
            href="/"
            className="hover:bg-accent-black/5 p-2 rounded-lg transition-colors"
          >
            <NavLink title={item} />
          </Link>
        ))}
      </ul>
    </div>
  );
};
