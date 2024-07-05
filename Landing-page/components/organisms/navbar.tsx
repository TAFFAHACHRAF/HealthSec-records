import { Button, Container, Logo } from "@/components/atoms";
import { MobileNav, NavMenu } from "@/components/molecules";
import { useAttributionModal } from "@/stores";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Navbar = () => {
  const attributionModal = useAttributionModal();

  return (
    <Container className="text-white bg-secondary">
      <nav className="py-4 flex items-center justify-between w-full">
        <Link href="/">
          <Logo className="w-[250px] h-[100px] md:w-[350px] md:h-[120px]" />
        </Link>
        <div className="flex items-center justify-center gap-x-[60px] z-50">
          <NavMenu className="hidden xl:flex" />
          <div className="flex gap-x-6">
  <a
    href="http://localhost:8089/"
    className="button-secondary hidden lg:flex"
  >
    Login
  </a>
  <a
    href="http://localhost:8089/"
    className="button-with-icon hidden lg:flex"
  >
    Try Whitepace free <ArrowRight />
  </a>
  <div className="flex xl:hidden">
    <MobileNav />
  </div>
</div>

        </div>
      </nav>
    </Container>
  );
};
