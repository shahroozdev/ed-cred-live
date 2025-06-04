export const faqs = [
  {
    title: "Is my identity really hidden?",
    desc: "Yes. Ed-Cred uses strong anonymity protocols to ensure your identity is never linked to your reviews.",
  },
  {
    title: "Can schools see who left the reviews?",
    desc: "No. Schools can only see the review content, never the reviewer's identity.",
  },
  {
    title: "What kind of schools can I review?",
    desc: "You can review high schools, colleges, and universities across the country.",
  },
  {
    title: "Can I edit or delete my review?",
    desc: "Yes, you can manage your reviews anytime through your anonymous profile.",
  },
  {
    title: "Is Ed-Cred free to use?",
    desc: "Yes! It's completely free for students and alumni.",
  },
];
export interface PricingPlan {
  title: string;
  price: string;
  frequency: string;
  description: string;
  features: string[];
  primary?: boolean;
}
export const plans: PricingPlan[] = [
  {
    title: "Basic",
    price: "$9",
    frequency: "/month",
    description: "Great for casual users who want to leave reviews and participate in discussions.",
    features: [
      "Submit up to 10 reviews per month",
      "View up to 50 reviews per month",
      "Create posts and comment on others",
      "Access public forum topics",
      "Flag/Dispute inappropriate feedback (up to 5 times/month)",
      "Basic community access",
    ],
  },
  {
    title: "Pro",
    price: "$19",
    frequency: "/month",
    description: "Perfect for active users and small teams who need more engagement power.",
    primary: true,
    features: [
      "Submit up to 50 reviews per month",
      "Unlimited review viewing",
      "Create posts and comments",
      "Full access to all forum topics",
      "Flag/Dispute feedback (up to 20 times/month)",
      "Priority support",
      "Private forum discussions",
    ],
  },
  {
    title: "Enterprise",
    price: "$49",
    frequency: "/month",
    description: "Designed for organizations or power users needing maximum capacity and control.",
    features: [
      "Unlimited reviews submission",
      "Unlimited review viewing",
      "Create & manage team posts and discussions",
      "Full forum access including private threads",
      "Unlimited feedback disputes/reporting",
      // "Advanced analytics dashboard",
      // "Dedicated support channel",
    ],
  },
];

