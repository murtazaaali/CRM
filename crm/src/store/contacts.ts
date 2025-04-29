import axios from "axios";
import { create } from "zustand";

interface Contact {
  _id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: "active" | "inactive";
}

interface ContactsState {
  contacts: Contact[];
  isFetched: boolean;
  fetchContacts: () => Promise<void>;

  addContact: (contact: Omit<Contact, "id">) => void;
  updateContact: (id: number, contact: Partial<Contact>) => void;
  deleteContact: (id: number) => void;
}

const useContactsStore = create<ContactsState>((set, get) => ({
  contacts: [],
  isFetched: false,

  fetchContacts: async () => {
    const state = get();

    if (state.isFetched) return;

    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:3000/api/contacts", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const fetchedContacts = response.data;
      set({ contacts: fetchedContacts, isFetched: true });
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  },

  addContact: async (contact) => {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      "http://localhost:3000/api/contacts",
      contact,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const newContact = response.data;

   

    set((state) => ({
      contacts: [...state.contacts, newContact],
    }));
  },

  updateContact: async (id, contact) => {

    const token = localStorage.getItem("token");
    await axios.put(`http://localhost:3000/api/contacts/${id}`, contact, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    set((state) => ({
      contacts: state.contacts.map((c) =>
        c._id === id ? { ...c, ...contact } : c
      ),
    }))
  },

  deleteContact: async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:3000/api/contacts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    set((state) => ({
      contacts: state.contacts.filter((contact) => contact._id !== id),
    }));
  },
}));

export default useContactsStore;
