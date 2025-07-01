import {
  Flag,
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
      url: "/admin-dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: MessageSquareQuote,
      items: [
        {
          title: "All Feedback Forms",
          url: "/",
        },
        {
          title: "Create Feedback Form",
          url: "/create",
        },
        {
          title: "All Responses",
          url: "/responses/all",
        },
      ],
    },
    {
      title: "Forum",
      url: "/forum",
      icon: MessagesSquare,
      items: [
        {
          title: "All Forums List",
          url: "/",
        },
        {
          title: "Create Forum",
          url: "/create",
        },
      ],
    },
    {
      title: "Manage users",
      url: "/users",
      icon: UserRoundPenIcon,
    },
    {
      title: "Review",
      url: "/review-admin",
      icon: ScanEye,
    },
    {
      title: "Posts",
      url: "/posts",
      icon: SquareTerminal,
      items: [
        {
          title: "All Posts",
          url: "/",
        },
        {
          title: "Create Post",
          url: "/create",
        },
      ],
    },
    {
      title: "Disputes",
      url: "/disputes/view-all",
      icon: Flag,
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
  ],
  navUser: [
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
    {
      title: "Disputes Management",
      url: "/disputes/manage",
      icon: Flag,
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
} as any;
