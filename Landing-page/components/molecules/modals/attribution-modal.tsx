import { Modal } from "@/components/atoms";
import { useAttributionModal } from "@/stores";
import Link from "next/link";

export const AttributionModal = () => {
  const attributionModal = useAttributionModal();

  return (
    <Modal
      title="Thank You for Visiting My Website"
      description="This website is not a real landing page."
      isOpen={attributionModal.isOpen}
      onClose={attributionModal.onClose}
    >
      <div className="flex flex-col gap-y-1">
        <p className="text-p2Bold font-bold">
          Developed by:{" "}
          <Link
            href="https://kyawthu.com/"
            target="_blank"
            rel="noreferrer noopener"
            className="hover:underline transition"
          >
            Kyaw Thu
          </Link>
        </p>
        <p className="text-p3">
          Website Design:{" "}
          <Link
            href="https://www.alrazisiam.com/"
            target="_blank"
            rel="noreferrer noopener"
            className="hover:underline transition"
          >
            Al Razi Siam
          </Link>
        </p>
        <p className="text-p3">
          Illustrations:{" "}
          <Link
            href="https://illiyin.studio/"
            target="_blank"
            rel="noreferrer noopener"
            className="hover:underline transition"
          >
            Illiyin Studio
          </Link>
        </p>
        <p className="text-p3">
          Avatars:{" "}
          <Link
            href="https://www.flaticon.com/packs/avatars-54"
            target="_blank"
            rel="noreferrer noopener"
            className="hover:underline transition"
          >
            Flaticon
          </Link>
        </p>
      </div>
    </Modal>
  );
};
