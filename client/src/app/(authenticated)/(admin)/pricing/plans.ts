export interface PricingPlan {
    title:       string;
    price:       string;
    frequency:   string;
    description: string;
    features:    string[];
    primary?: boolean;
}

export const plans : PricingPlan[] = [
    {
        title: "Basic",
        price: "$9",
        frequency: "/month",
        description: "Perfect for individuals starting out.",
        features: [
            "1 project",
            "Basic analytics",
            "Email support",
            "Community access"
        ]
    },
    {
        title: "Pro",
        price: "$29",
        frequency: "/month",
        description: "Ideal for growing teams and freelancers.",
        primary: true,
        features: [
            "10 projects",
            "Advanced analytics",
            "Priority email support",
            "Team collaboration tools"
        ]
    },
    {
        title: "Enterprise",
        price: "$99",
        frequency: "/month",
        description: "For large organizations with custom needs.",
        features: [
            "Unlimited projects",
            "Custom analytics dashboard",
            "Dedicated account manager",
            "24/7 phone & email support",
            "Custom integrations"
        ]
    }
];
