import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Logo,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/atoms";
import { ArrowRight, MenuIcon } from "lucide-react";
import {
  NavProducts,
  NavResources,
  NavSolutions,
} from "@/components/molecules/";
import Link from "next/link";

export const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className="h-10 w-10" />
      </SheetTrigger>
      <SheetContent className="w-full md:max-w-sm overflow-auto flex flex-col gap-y-4">
        <SheetHeader>
          <Logo
            color="blue"
            className="w-[134px] h-[24px] md:w-[191px] md:h-[34px]"
          />
        </SheetHeader>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="products">
            <AccordionTrigger>Products</AccordionTrigger>
            <AccordionContent>
              <NavProducts />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="solutions">
            <AccordionTrigger>Solutions</AccordionTrigger>
            <AccordionContent>
              <NavSolutions />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="resources">
            <AccordionTrigger>Resources</AccordionTrigger>
            <AccordionContent>
              <NavResources />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Link href="/" className="text-accent-black text-p2Medium font-medium">
          Pricing
        </Link>
        <div className="flex flex-col gap-y-2 w-full mt-auto">
          <Button variant="secondary">Login</Button>
          <Button size="with-icon">
            Try Whitepace free <ArrowRight />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
