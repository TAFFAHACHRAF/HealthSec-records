import { Button, Container } from "@/components/atoms";
import { Section6Text } from "@/components/molecules";
import { useAttributionModal } from "@/stores";
import { ArrowRight } from "lucide-react";

export const FavoriteAppsSection = () => {
  const attributionModal = useAttributionModal();

  return (
    <section className="text-white bg-secondary">
      <Container className="flex flex-col items-center justify-center py-[80px] md:py-[140px] lg:py-[160px]">
        <div className="flex flex-col items-center gap-y-[60px] text-center">
          <Section6Text />
          <div className="z-10">
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
          </div>
        </div>
      </Container>
    </section>
  );
};
