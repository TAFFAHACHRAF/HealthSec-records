import { IPlan } from "@/types";

export const silverPlan: IPlan = {
  plan: "Silver Plan",
  price: "$99",
  desc: "Basic access for small healthcare institutions",
  benefits: [
    "Up to 5 doctor accounts to access patient records and AI features.",
    "Allowing healthcare institutions to access patients records securely.",
    "Secure data storage with end-to-end encryption."
  ],
};

export const goldPlan: IPlan = {
  plan: "Gold Plan",
  price: "$299",
  desc: "Expanded access for medium-sized healthcare institutions",
  benefits: [
    "Up to 20 doctor accounts with expanded access to patient records and AI features.",
    "Advanced AI assistance for comprehensive symptom analysis and disease prediction.",
    "Enhanced data sharing capabilities between institutions for improved continuity of care.",
    "Priority customer support."
  ],
};

export const diamondPlan: IPlan = {
  plan: "Diamond Plan",
  price: "$700",
  desc: "Premium access for large healthcare institutions",
  benefits: [
    "Up to 50 doctor accounts with full access to patient records, AI capabilities, and analytics.",
    "Personalized AI-driven health recommendations and treatment plans.",
    "Real-time updates and alerts on patient records.",
    "Dedicated account manager for personalized support.",
    "Integration with wearable health devices for real-time monitoring."
  ],
};
