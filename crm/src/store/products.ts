import axios from "axios";
import { create } from "zustand";

interface Product {
  name: string;
  itemCode: string;
//   category: string;
  description: string;
  unit: string;
  brand: string;
  costPrice: number;
  sellingPrice: number;
  isStockItem: number;
  hasBatch: boolean;
  hasSerial: boolean;
  isActive: boolean;
  _id?: number;
}

interface ProdcutsState {
  products: Product[];
  isFetched: boolean;
  fetchProducts: () => Promise<void>;

  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: number, contact: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
}

const DUMMY_STORAGE_KEY = "dummy_products";

const useProductsStore = create<ProdcutsState>((set, get) => ({
  products: [],
  isFetched: false,

  fetchProducts: async () => {
    const { isFetched } = get();
    if (isFetched) return;

    const token = localStorage.getItem("token");

     const isDummy = localStorage.getItem("accounttype") === "dummy";

    if (isDummy) {
      const stored = localStorage.getItem(DUMMY_STORAGE_KEY);
      const dummyProducts: Product[] = stored ? JSON.parse(stored) : [];
      set({ products: dummyProducts, isFetched: true });
    } else {
      try {
        const response = await axios.get("http://localhost:3000/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const fetchedProducts = response.data;
        set({ products: fetchedProducts, isFetched: true });
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    }
  },

  addProduct: async (product) => {
    const token = localStorage.getItem("token");
    const isDummy = localStorage.getItem("accounttype") === "dummy";
    if (isDummy) {
      const state = get();
      const newId = Date.now();
      const newProduct: Product = { _id: newId, ...product };
      const updated = [...state.products, newProduct];
      localStorage.setItem(DUMMY_STORAGE_KEY, JSON.stringify(updated));
      set({ products: updated });
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/products",
          product,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const newProduct = response.data;

        set((state) => ({
          products: [...state.products, newProduct],
        }));
      } catch (err) {
        console.error("Failed to add product:", err);
      }
    }
  },

  updateProduct: async (id, product) => {
    const token = localStorage.getItem("token");
    const isDummy = localStorage.getItem("accounttype") === "dummy";
    if (isDummy) {
      const state = get();
      const updatedProducts = state.products.map((c) =>
        c._id === id ? { ...c, ...product } : c
      );
      localStorage.setItem(DUMMY_STORAGE_KEY, JSON.stringify(updatedProducts));
      set({ products: updatedProducts });
    } else {
      try {
        await axios.put(`http://localhost:3000/api/products/${id}`, product, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        set((state) => ({
          products: state.products.map((l) => (l._id === id ? { ...l, ...product } : l)),
        }));
      } catch (err) {
        console.error("Failed to update product:", err);
      }
    }
  },

  deleteProduct: async (id) => {
    const token = localStorage.getItem("token");
     const isDummy = localStorage.getItem("accounttype") === "dummy";
    if (isDummy) {
      const state = get();
      const updated = state.products.filter((c) => c._id !== id);
      localStorage.setItem(DUMMY_STORAGE_KEY, JSON.stringify(updated));
      set({ products: updated });
    } else {
      await axios.delete(`http://localhost:3000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
      }));
    }
  },
}));

export default useProductsStore;
