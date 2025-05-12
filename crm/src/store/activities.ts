import { create } from "zustand";
import axios from "axios";

interface Activity {
  _id: string;
  type: string;
  title: string;
  detail: string;
  link: string;
  createdAt: string;
}

interface ActivityStore {
  activities: Activity[];
  setActivities: (data: Activity[]) => void;
  addActivity: (activity: Activity) => void;
  removeActivity: (id: string) => void;
  fetchActivities: () => Promise<void>;
}

const useActivityStore = create<ActivityStore>((set) => ({
  activities: [],
  setActivities: (data) => set({ activities: data }),
  addActivity: (activity) =>
    set((state) => ({
      activities: [activity, ...state.activities],
    })),
  removeActivity: async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:3000/api/activities/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    set((state) => ({
      activities: state.activities.filter((a) => a._id !== id),
    }));
  },

  fetchActivities: async () => {
    try {
      const token = localStorage.getItem("token");
      const resp = await axios.get("http://localhost:3000/api/activities", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      set({ activities: resp.data });
    } catch (err) {
      console.error("Failed to fetch activities", err);
    }
  },
}));

export default useActivityStore;
