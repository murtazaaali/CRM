import axios from "axios";
import { create } from "zustand";

interface Task {
  title: string;
  description: string;
  dueDate: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  assignedTo: string;
  _id?: number;
}

interface TasksState {
  tasks: Task[];
  isFetched: boolean;
  fetchTasks: () => Promise<void>;

  addTask: (lead: Omit<Task, "id">) => void;
  updateTask: (id: number, contact: Partial<Task>) => void;
  deleteTask: (id: number) => void;
}

const DUMMY_STORAGE_KEY = "dummy_tasks";

const useLeadsStore = create<TasksState>((set, get) => ({
  tasks: [],
  isFetched: false,

  fetchTasks: async () => {
    const { isFetched } = get();
    if (isFetched) return;

    const token = localStorage.getItem("token");
    const isDummy = localStorage.getItem("accounttype") === "dummy";
    if (isDummy) {
      const stored = localStorage.getItem(DUMMY_STORAGE_KEY);
      const dummyLeads: Task[] = stored ? JSON.parse(stored) : [];
      set({ tasks: dummyLeads, isFetched: true });
    } else {
      try {
        const response = await axios.get("http://localhost:3000/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const fetchedLeads = response.data;
        set({ tasks: fetchedLeads, isFetched: true });
      } catch (err) {
        console.error("Failed to fetch leads:", err);
      }
    }
  },

  addTask: async (task) => {
    const token = localStorage.getItem("token");
    const isDummy = localStorage.getItem("accounttype") === "dummy";
    if (isDummy) {
      const state = get();
      const newId = Date.now();
      const newLead: Task = { _id: newId, ...task };
      const updated = [...state.tasks, newLead];
      localStorage.setItem(DUMMY_STORAGE_KEY, JSON.stringify(updated));
      set({ tasks: updated });
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/tasks",
          task,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const newTask = response.data;

        set((state) => ({
          tasks: [...state.tasks, newTask],
        }));
      } catch (err) {
        console.error("Failed to add task:", err);
      }
    }
  },

  updateTask: async (id, task) => {
    const token = localStorage.getItem("token");
    const isDummy = localStorage.getItem("accounttype") === "dummy";
    if (isDummy) {
      const state = get();
      const updatedLeads = state.tasks.map((c) =>
        c._id === id ? { ...c, ...task } : c
      );
      localStorage.setItem(DUMMY_STORAGE_KEY, JSON.stringify(updatedLeads));
      set({ tasks: updatedLeads });
    } else {
      try {
        await axios.put(`http://localhost:3000/api/tasks/${id}`, task, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        set((state) => ({
          tasks: state.tasks.map((l) => (l._id === id ? { ...l, ...task } : l)),
        }));
      } catch (err) {
        console.error("Failed to update lead:", err);
      }
    }
  },

  deleteTask: async (id) => {
    const token = localStorage.getItem("token");
    const isDummy = localStorage.getItem("accounttype") === "dummy";
    if (isDummy) {
      const state = get();
      const updated = state.tasks.filter((c) => c._id !== id);
      localStorage.setItem(DUMMY_STORAGE_KEY, JSON.stringify(updated));
      set({ tasks: updated });
    } else {
      await axios.delete(`http://localhost:3000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== id),
      }));
    }
  },
}));

export default useLeadsStore;
