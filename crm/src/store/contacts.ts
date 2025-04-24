import { create } from 'zustand';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'active' | 'inactive';
}

interface ContactsState {
  contacts: Contact[];
  addContact: (contact: Omit<Contact, 'id'>) => void;
  updateContact: (id: number, contact: Partial<Contact>) => void;
  deleteContact: (id: number) => void;
}

const useContactsStore = create<ContactsState>((set) => ({
  contacts: [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      company: 'Acme Inc',
      status: 'active',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 234 567 891',
      company: 'XYZ Corp',
      status: 'inactive',
    },
  ],

  addContact: (contact) =>
    set((state) => ({
      contacts: [
        ...state.contacts,
        {
          ...contact,
          id: Math.max(...state.contacts.map((c) => c.id), 0) + 1,
        },
      ],
    })),

  updateContact: (id, contact) =>
    set((state) => ({
      contacts: state.contacts.map((c) =>
        c.id === id ? { ...c, ...contact } : c
      ),
    })),

  deleteContact: (id) =>
    set((state) => ({
      contacts: state.contacts.filter((c) => c.id !== id),
    })),
}));

export default useContactsStore; 