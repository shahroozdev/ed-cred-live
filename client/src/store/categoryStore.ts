import { create } from "zustand";
import { API_BASE_URL } from "@/api/config";
import { Category } from "@/types/user";

interface CategoryStore {
    categories: Category[];
    fetchCategories: () => Promise<void>;
    addCategory: (category: Omit<Category, "createdAt">) => Promise<void>;
    removeCategory: (id: number) => Promise<void>;
}

function getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");
    
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };
}

export const useCategoryStore = create<CategoryStore>((set) => ({
    categories: [],

    fetchCategories: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/category`, { headers: getAuthHeaders() });
            if (!response.ok) throw new Error("Failed to fetch categories");
            const data: Category[] = await response.json();
            set({ categories: data });
        } catch (error) {
            console.error(error);
        }
    },

    addCategory: async (category) => {
        try {
            const newCategory = { ...category, createdAt: new Date() };
            const response = await fetch(`${API_BASE_URL}/category`, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify(newCategory),
            });
            if (!response.ok) throw new Error("Failed to add category");
            const data: Category = await response.json();
            set((state) => ({ categories: [...state.categories, data] }));
        } catch (error) {
            console.error(error);
        }
    },

    removeCategory: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/category/${id}`, {
                method: "DELETE",
                headers: getAuthHeaders(),
            });
            if (!response.ok) throw new Error("Failed to remove category");
            set((state) => ({ categories: state.categories.filter((c) => c.id !== id) }));
        } catch (error) {
            console.error(error);
        }
    },
}));


export interface SubCategory {
    id?: number;
    name: string;
    status: "active" | "draft";
    createdAt: Date;
    categoryId: string;
    parentCategory: Category;
}

interface SubCategoryStore {
    categories: SubCategory[];
    fetchCategories: () => Promise<void>;
    addCategory: (category: Omit<Omit<SubCategory, "createdAt">, "parentCategory">) => Promise<void>;
    removeCategory: (id: number) => Promise<void>;
}

export const useSubCategoryStore = create<SubCategoryStore>((set) => ({
    categories: [],

    fetchCategories: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/subcategory`, { headers: getAuthHeaders() });
            if (!response.ok) throw new Error("Failed to fetch categories");
            const data: SubCategory[] = await response.json();
            set({ categories: data });
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    },

    addCategory: async (category) => {
        try {
            const newCategory = { ...category, createdAt: new Date() };
            const response = await fetch(`${API_BASE_URL}/subcategory/`, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify(newCategory),
            });
            if (!response.ok) throw new Error("Failed to add category");
            const data: SubCategory = await response.json();
            set((state) => ({ categories: [...state.categories, data] }));
        } catch (error) {
            console.error(error);
        }
    },

    removeCategory: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/subcategory/${id}`, {
                method: "DELETE",
                headers: getAuthHeaders(),
            });
            if (!response.ok) throw new Error("Failed to remove category");
            set((state) => ({ categories: state.categories.filter((c) => c.id !== id) }));
        } catch (error) {
            console.error(error);
        }
    },
}));
