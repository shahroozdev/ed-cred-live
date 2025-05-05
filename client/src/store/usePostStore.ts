import { create } from "zustand";
import { getPosts, getPost, savePost, updatePost, deletePost, Post } from "@/api/posts";

interface PostStore {
    posts: Omit<Post, 'body'>[]; 
    selectedPost: Post | null; 
    loading: boolean;
    error: string | null;

    fetchPosts: () => Promise<void>;
    fetchPost: (id: string) => Promise<void>;
    addPost: (post: Omit<Post, 'id' | 'createdAt'>) => Promise<void>;
    editPost: (id: string, post: Omit<Post, 'id' | 'createdAt'>) => Promise<void>;
    removePost: (id: string) => Promise<void>;
}

export const usePostStore = create<PostStore>((set) => ({
    posts: [],
    selectedPost: null,
    loading: false,
    error: null,

    // Fetch all posts
    fetchPosts: async () => {
        set({ loading: true, error: null });
        const data = await getPosts();
        if (data) set({ posts: data, loading: false });
        else set({ loading: false, error: "Failed to fetch posts" });
    },

    // Fetch a single post
    fetchPost: async (id: string) => {
        set({ loading: true, error: null });
        const data = await getPost(id);
        if (data) set({ selectedPost: data, loading: false });
        else set({ loading: false, error: "Failed to fetch post" });
    },

    // Add a new post
    addPost: async (post) => {
        set({ loading: true, error: null });
        const newPost = await savePost(post);
        if (newPost) set((state) => ({ posts: [...state.posts, newPost], loading: false }));
        else set({ loading: false, error: "Failed to save post" });
    },

    // Edit a post
    editPost: async (id, post) => {
        set({ loading: true, error: null });
        const updatedPost = await updatePost(id, post);
        if (updatedPost) {
            set((state) => ({
                posts: state.posts.map((p) => (p.id === id ? { ...p, ...updatedPost } : p)),
                loading: false,
            }));
        } else {
            set({ loading: false, error: "Failed to update post" });
        }
    },

    // Delete a post
    removePost: async (id) => {
        set({ loading: true, error: null });
        const success = await deletePost(id);
        if (success) {
            set((state) => ({
                posts: state.posts.filter((p) => p.id !== id),
                loading: false,
            }));
        } else {
            set({ loading: false, error: "Failed to delete post" });
        }
    },
}));
