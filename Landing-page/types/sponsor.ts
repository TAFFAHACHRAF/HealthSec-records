export const ISponsorsDef = ["Apple", "Microsoft", "Slack", "Google"] as const;
export type ISponsorsType = (typeof ISponsorsDef)[number];

export interface ISponsor {
  type: ISponsorsType;
  src: string;
}
