import axios from "axios";
import { create } from "zustand";

interface Category {
  _id: number;
  name: string;
  description: string;
  parentCategory?: string;
  isActive: boolean;
}

interface CategoriesState {
  categories: Category[];
  isFetched: boolean;
  fetchCategories: () => Promise<void>;
  addCategory: (contact: Omit<Category, "_id">) => void;
  updateCategory: (id: number, contact: Partial<Category>) => void;
  deleteCategory: (id: number) => void;
}

const DUMMY_STORAGE_KEY = "dummy_categories";

const useCategoriesStore = create<CategoriesState>((set, get) => ({
  categories: [],
  isFetched: false,

  fetchCategories: async () => {
    const state = get();
    if (state.isFetched) return;

    const isDummy = localStorage.getItem("accounttype") === "dummy";

    if (isDummy) {
      const stored = localStorage.getItem(DUMMY_STORAGE_KEY);
      const dummyCategories: Category[] = stored ? JSON.parse(stored) : [];
      set({ categories: dummyCategories, isFetched: true });
    } else {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:3000/api/categories", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        set({ categories: response.data, isFetched: true });
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
  },

  addCategory: async (category) => {
    const isDummy = localStorage.getItem("accounttype") === "dummy";

    if (isDummy) {
      const state = get();
      const newId = Date.now(); 
      const newCategory: Category = { _id: newId, ...category };
      const updated = [...state.categories, newCategory];
      localStorage.setItem(DUMMY_STORAGE_KEY, JSON.stringify(updated));
      set({ categories: updated });
    } else {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/categories",
        category,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      set((state) => ({
        categories: [...state.categories, response.data],
      }));
    }
  },

  updateCategory: async (id, category) => {
    const isDummy = localStorage.getItem("accounttype") === "dummy";

    if (isDummy) {
      const state = get();
      const updatedCategories = state.categories.map((c) =>
        c._id === id ? { ...c, ...category } : c
      );
      localStorage.setItem(DUMMY_STORAGE_KEY, JSON.stringify(updatedCategories));
      set({ categories: updatedCategories });
    } else {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:3000/api/categories/${id}`, category, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({
        categories: state.categories.map((c) =>
          c._id === id ? { ...c, ...category } : c
        ),
      }));
    }
  },

  deleteCategory: async (id) => {
    const isDummy = localStorage.getItem("accounttype") === "dummy";

    if (isDummy) {
      const state = get();
      const updated = state.categories.filter((c) => c._id !== id);
      localStorage.setItem(DUMMY_STORAGE_KEY, JSON.stringify(updated));
      set({ categories: updated });
    } else {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({
        categories: state.categories.filter((c) => c._id !== id),
      }));
    }
  },
}));

export default useCategoriesStore;
