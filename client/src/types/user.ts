import { SubCategory } from "@/store/categoryStore";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  category: Category;
  role: string;
  profilePictureUrl: string;
};

export interface Category {
  id?: number;
  name: string;
  status: "active" | "draft";
  createdAt: Date;
  requiresVerification: boolean;
  subCategories: SubCategory[];
  iconUrl: string;
  permissions?: any;
}
