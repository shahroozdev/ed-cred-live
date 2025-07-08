import {
  CircleDollarSign,
  Flag,
  Layers,
  LayoutDashboard,
  MessageSquareQuote,
  MessagesSquare,
  NotebookPen,
  Phone,
  ScanEye,
  Settings2,
  SquareTerminal,
  StickyNote,
  UserRoundPenIcon,
} from "lucide-react";

const overview = {
  title: "Overview",
  url: "/admin-dashboard",
  icon: LayoutDashboard,
};
const feedback = {
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
};
const forum = {
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
};
const disputes = {
  title: "Disputes",
  url: "/disputes/view-all",
  icon: Flag,
};
const categories = {
  title: "Categories",
  url: "/category",
  icon: Layers,
};
const subCategories = {
  title: "SubCategories",
  url: "/subcategory",
  icon: Layers,
};
const manageUsers = {
  title: "Manage users",
  url: "/users",
  icon: UserRoundPenIcon,
};
const posts = {
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
};
const documentation = {
  title: "All documents",
  url: "/all-documents",
  icon: NotebookPen,
};
export const data = {
  navMain: [
    overview,
    feedback,
    forum,
    manageUsers,
    posts,
    disputes,
    categories,
    subCategories,
  ],
  navSuperMain: [
    overview,
    feedback,
    forum,
    manageUsers,
    posts,
    disputes,
    categories,
    subCategories,
    documentation,
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
      title: "Pricing",
      url: "/pricing",
      icon: CircleDollarSign,
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
      title: "Pricing",
      url: "/pricing",
      icon: CircleDollarSign,
    },
    {
      title: "Contact Us",
      url: "/contact",
      icon: Phone,
    },
  ],
} as any;
