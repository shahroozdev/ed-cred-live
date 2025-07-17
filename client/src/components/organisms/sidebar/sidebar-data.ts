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
  items: [
    {
      title: "All Users",
      url: "/",
    },
    {
      title: "Create New User",
      url: "/create",
    },
  ],
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
const giveFeedback = {
  title: "Give Feedback",
  url: "/feedback",
  icon: LayoutDashboard,
};
const readFeedback = {
  title: "Read Feedback",
  url: "/dashboard",
  icon: MessageSquareQuote,
};
const pricing = {
  title: "Pricing",
  url: "/pricing",
  icon: CircleDollarSign,
};
const contactUs = {
  title: "Contact Us",
  url: "/contact",
  icon: Phone,
};
const disputeManagement = {
  title: "Disputes Management",
  url: "/disputes/manage",
  icon: Flag,
};
const adminDefault = [
  overview,
  feedback,
  forum,
  manageUsers,
  posts,
  disputes,
  categories,
  subCategories,
];
const userDefault = [giveFeedback, readFeedback, contactUs];
export const data = {
  navMain: adminDefault,
  navSuperMain: [...adminDefault, documentation],
  navUser: [...userDefault, disputeManagement],
  navCommon: userDefault,
} as any;
