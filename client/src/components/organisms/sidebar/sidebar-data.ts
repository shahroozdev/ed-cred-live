import {
    Layers,
    LayoutDashboard,
    MessageSquareQuote,
    MessagesSquare,
    Phone,
    ScanEye,
    Settings2,
    SquareTerminal,
    StickyNote,
    UserRoundPenIcon,
} from "lucide-react";

export const data = {
    navMain: [
        {
            title: "Overview",
            url: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Feedbacks",
            url: "/feedback",
            icon: MessageSquareQuote,
            items: [
                {
                    title: "All Feedback",
                    url: "/feedback",
                },
                {
                    title: "Create Feedback",
                    url: "/feedback/create",
                },
            ],
        },
        {
            title: "Forum",
            url: "/forum",
            icon: MessagesSquare,
        },
        {
            title: "Manage users",
            url: "/users",
            icon: UserRoundPenIcon,
        },
        {
            title: "Review",
            url: "/review",
            icon: ScanEye,
        },
        {
            title: "Posts",
            url: "/posts",
            icon: SquareTerminal,
        },
        {
            title: "Categories",
            url: "/category",
            icon: Layers,
        },
        {
            title: "SubCategories",
            url: "/subcategory",
            icon: Layers,
        },
        {
            title: "Settings",
            url: "/settings",
            icon: Settings2,
        },
    ],
    navCommon: [
        {
            title: "Give Feedback",
            url: "/feedback",
            icon: LayoutDashboard,
        },
        {
            title: "Read Feedback",
            url: "/dashboard",
            icon: MessageSquareQuote,
        },
        {
            title: "Contact Us",
            url: "/contact",
            icon: Phone,
        },

    ],
}as any
