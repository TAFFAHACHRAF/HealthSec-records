import Link from "next/link";
import { NavLink } from "@/components/molecules";
import { navProducts } from "@/content";

export const NavProducts = () => {
  return (
    <ul className="flex flex-col gap-y-2 md:w-[400px] lg:w-[500px] p-1">
      {navProducts.map((navProduct, index) => (
        <Link
          key={index}
          href="/"
          className="hover:bg-accent-black/5 p-2 rounded-lg transition-colors"
        >
          <NavLink {...navProduct} />
        </Link>
      ))}
    </ul>
  );
};
