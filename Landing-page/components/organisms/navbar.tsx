import { Button, Container, Logo } from "@/components/atoms";
import { MobileNav, NavMenu } from "@/components/molecules";
import { useAttributionModal } from "@/stores";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <Container className="text-white bg-secondary">
      <nav className="py-4 flex items-center justify-between w-full">
        <Link href="/">
          <Logo className="w-[250px] h-[100px] md:w-[350px] md:h-[120px]" />
        </Link>
        <div className="flex items-center justify-center w-full">
          <div className="flex items-center justify-center gap-x-[60px] z-50">
            <a
              href="/"
              className="button-secondary hidden lg:flex hover:text-primary"
            >
              Home
            </a>
            <a
              href="/"
              className="button-secondary hidden lg:flex hover:text-primary"
            >
              About us
            </a>
            <a
              href="/"
              className="button-secondary hidden lg:flex hover:text-primary"
            >
              Prices
            </a>
            <a
              href="http://localhost:7075/"
              className="button-secondary hidden lg:flex hover:text-primary"
            >
              Login
            </a>
            <a
              href="http://localhost:7075/"
            >
              <Button
                  // onClick={() => attributionModal.onOpen()}
                  size="with-icon"
                >
                Get started
                <ArrowRight className="w-4 h-4" />
              </Button>
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
