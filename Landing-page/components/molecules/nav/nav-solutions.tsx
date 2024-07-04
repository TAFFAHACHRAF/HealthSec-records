import { NavLink } from "@/components/molecules";
import { solutionsByTeam, solutionsByUseCase } from "@/content";
import Link from "next/link";

export const NavSolutions = () => {
  return (
    <div className="flex flex-col gap-y-3 xl:flex-row justify-between md:w-[400px] lg:w-[500px] p-1">
      <ul className="flex flex-col gap-y-2">
        <h1 className="text-p3Medium font-bold text-accent-black/75 p-2">
          By Team
        </h1>
        {solutionsByTeam.map((item, index) => (
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
          By Use Case
        </h1>
        {solutionsByUseCase.map((item, index) => (
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
