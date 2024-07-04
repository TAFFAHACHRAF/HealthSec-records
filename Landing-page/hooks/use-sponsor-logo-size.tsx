import { useMediaQuery } from "@/hooks";
import { ISponsorsType, Size } from "@/types";

interface IUseSponsorLogoSize {
  type: ISponsorsType;
}

export const useSponsorLogoSize = ({ type }: IUseSponsorLogoSize): Size => {
  const matches = useMediaQuery("(min-width: 760px)");

  let size: Size = {
    width: 0,
    height: 0,
  };

  switch (type) {
    case "Apple":
      size.width = 56;
      size.height = 68;
      break;
    case "Microsoft":
      if (matches) {
        size.width = 287;
        size.height = 62;
      } else {
        size.width = 213;
        size.height = 46;
      }
      break;
    case "Slack":
      if (matches) {
        size.width = 280;
        size.height = 71;
      } else {
        size.width = 192;
        size.height = 49;
      }
      break;
    case "Google":
      if (matches) {
        size.width = 211;
        size.height = 70;
      } else {
        size.width = 140;
        size.height = 46;
      }
      break;
    default:
      break;
  }

  return size;
};
