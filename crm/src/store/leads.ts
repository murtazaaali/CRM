import axios from "axios";
import { create } from "zustand";

interface Lead {
  name: string;
  email: string;
  phone: string;
  company: string;
  status: "new" | "contacted" | "qualified" | "lost";
  source: "website" | "referral" | "social" | "other";
  value: number;
  _id?: number;
}

interface LeadsState {
  leads: Lead[];
  isFetched: boolean;
  fetchLeads: () => Promise<void>;

  addLead: (lead: Omit<Lead, "id">) => void;
  updateLead: (id: number, contact: Partial<Lead>) => void;
  deleteLead: (id: number) => void;
}

const DUMMY_STORAGE_KEY = "dummy_leads";

const useLeadsStore = create<LeadsState>((set, get) => ({
  leads: [],
  isFetched: false,

  fetchLeads: async () => {
    const { isFetched } = get();
    if (isFetched) return;

    const token = localStorage.getItem("token");

     const isDummy = localStorage.getItem("accounttype") === "dummy";

    if (isDummy) {
      const stored = localStorage.getItem(DUMMY_STORAGE_KEY);
      const dummyLeads: Lead[] = stored ? JSON.parse(stored) : [];
      set({ leads: dummyLeads, isFetched: true });
    } else {
      try {
        const response = await axios.get("http://localhost:3000/api/leads", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const fetchedLeads = response.data;
        set({ leads: fetchedLeads, isFetched: true });
      } catch (err) {
        console.error("Failed to fetch leads:", err);
      }
    }
  },

  addLead: async (lead) => {
    const token = localStorage.getItem("token");
    const isDummy = localStorage.getItem("accounttype") === "dummy";
    if (isDummy) {
      const state = get();
      const newId = Date.now();
      const newLead: Lead = { _id: newId, ...lead };
      const updated = [...state.leads, newLead];
      localStorage.setItem(DUMMY_STORAGE_KEY, JSON.stringify(updated));
      set({ leads: updated });
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/leads",
          lead,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const newLead = response.data;

        set((state) => ({
          leads: [...state.leads, newLead],
        }));
      } catch (err) {
        console.error("Failed to add lead:", err);
      }
    }
  },

  updateLead: async (id, lead) => {
    const token = localStorage.getItem("token");
    const isDummy = localStorage.getItem("accounttype") === "dummy";
    if (isDummy) {
      const state = get();
      const updatedLeads = state.leads.map((c) =>
        c._id === id ? { ...c, ...lead } : c
      );
      localStorage.setItem(DUMMY_STORAGE_KEY, JSON.stringify(updatedLeads));
      set({ leads: updatedLeads });
    } else {
      try {
        await axios.put(`http://localhost:3000/api/leads/${id}`, lead, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        set((state) => ({
          leads: state.leads.map((l) => (l._id === id ? { ...l, ...lead } : l)),
        }));
      } catch (err) {
        console.error("Failed to update lead:", err);
      }
    }
  },

  deleteLead: async (id) => {
    const token = localStorage.getItem("token");
     const isDummy = localStorage.getItem("accounttype") === "dummy";
    if (isDummy) {
      const state = get();
      const updated = state.leads.filter((c) => c._id !== id);
      localStorage.setItem(DUMMY_STORAGE_KEY, JSON.stringify(updated));
      set({ leads: updated });
    } else {
      await axios.delete(`http://localhost:3000/api/leads/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set((state) => ({
        leads: state.leads.filter((contact) => contact._id !== id),
      }));
    }
  },
}));

export default useLeadsStore;
