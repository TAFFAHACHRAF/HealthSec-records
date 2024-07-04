import { Button, Container } from "@/components/atoms";
import { FavoriteApps, Section6Text } from "@/components/molecules";
import { useAttributionModal } from "@/stores";
import { ArrowRight } from "lucide-react";

export const FavoriteAppsSection = () => {
  const attributionModal = useAttributionModal();

  return (
    <Container className="text-white bg-secondary">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-[100px] py-[80px] md:py-[140px]">
        <FavoriteApps />
        <div className="flex items-center lg:items-start flex-col gap-y-[60px]">
          <Section6Text />
          <div className="z-10">
            <Button onClick={() => attributionModal.onOpen()} size="with-icon">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};
