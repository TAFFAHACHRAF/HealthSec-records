export const IPlansDefs = ["Silver Plan", "Gold Plan", "Diamond Plan"] as const;
export type IPlansType = (typeof IPlansDefs)[number];

export interface IPlan {
  plan: IPlansType;
  price: string;
  desc: string;
  benefits: string[];
}
