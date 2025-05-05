import {
    Layers,
    SquareTerminal,
    StickyNote,
    UserIcon,
    UserRoundPenIcon,
    UsersIcon,
    StretchHorizontal,
    HomeIcon,
} from "lucide-react";
import { title } from "process";

export const data = {
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: HomeIcon,
        },
        {
            title: "Feedbacks",
            url: "/feedback",
            icon: Layers,
            items: [
                {
                    title: "All responses",
                    url: "/responses/all",
                },
                {
                    title: "Create Feedback Form",
                    url: "/create/",
                },
            ],
        },
        {
            title: "Manage Users",
            url: "/users",
            icon: UsersIcon,
        },
        {
            title: "Manage Categories",
            url: "/category",
            icon: StretchHorizontal,
        },
        {
            title: "Manage SubCategories",
            url: "/subcategory",
            icon: StretchHorizontal,
        },
        {
            title: "Posts",
            url: "/posts/",
            icon: StickyNote,
            items: [
                {
                    title: "Create Post",
                    url: "/create"
                },
                {
                    title: "View Posts",
                    url: "/"
                },
            ]
        },
    ],
}
