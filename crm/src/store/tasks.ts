import { create } from 'zustand';

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignedTo: string;
}

interface TasksState {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: number, task: Partial<Task>) => void;
  deleteTask: (id: number) => void;
}

const useTasksStore = create<TasksState>((set) => ({
  tasks: [
    {
      id: 1,
      title: 'Follow up with Acme Inc',
      description: 'Call regarding the new proposal',
      dueDate: '2025-05-01',
      status: 'pending',
      priority: 'high',
      assignedTo: 'John Doe',
    },
    {
      id: 2,
      title: 'Prepare quarterly report',
      description: 'Compile sales data and create presentation',
      dueDate: '2025-05-15',
      status: 'in-progress',
      priority: 'medium',
      assignedTo: 'Jane Smith',
    },
  ],

  addTask: (task) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          ...task,
          id: Math.max(...state.tasks.map((t) => t.id), 0) + 1,
        },
      ],
    })),

  updateTask: (id, task) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, ...task } : t
      ),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),
}));

export default useTasksStore; 