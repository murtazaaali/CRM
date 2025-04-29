import axios from "axios";
import { create } from "zustand";

interface Deal {
  _id: number; 
  name: string;
  company: string;
  value: number;
  stage: "proposal" | "negotiation" | "contract" | "closed" | "lost";
  probability: number;
  expectedCloseDate: string;
  owner: string;
 
}

interface DealsState {
  deals: Deal[];
  isFetched: boolean;
  fetchDeals: () => Promise<void>;
  addDeal: (deal: Omit<Deal, "_id">) => Promise<void>;
  updateDeal: (id: number, deal: Partial<Deal>) => Promise<void>;
  deleteDeal: (id: number) => Promise<void>;
}

const useDealsStore = create<DealsState>((set, get) => ({
  deals: [],
  isFetched: false,

  fetchDeals: async () => {
    const { isFetched } = get();
    if (isFetched) return;

    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("http://localhost:3000/api/deals", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const fetchedLeads = response.data;
      set({ deals: fetchedLeads, isFetched: true });
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    }
  },

  addDeal: async (deal) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/deals",
        deal,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const newLead = response.data;

      set((state) => ({
        deals: [...state.deals, newLead],
      }));

    } catch (err) {
      console.error("Failed to add lead:", err);
    }
  },

  updateDeal: async (id, deal) => {
 
    const token = localStorage.getItem("token");

    try {
      await axios.put(`http://localhost:3000/api/deals/${id}`, deal, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set((state) => ({
        deals: state.deals.map((l) =>
          l._id === id ? { ...l, ...deal } : l
        ),
      }))

   
    } catch (err) {
      console.error("Failed to update lead:", err);
    }
  },

  deleteDeal: async (id) => {
    const token = localStorage.getItem("token");

    await axios.delete(`http://localhost:3000/api/deals/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    set((state) => ({
      deals: state.deals.filter((deal) => deal._id !== id),
    }));
  },
}));

export default useDealsStore;
