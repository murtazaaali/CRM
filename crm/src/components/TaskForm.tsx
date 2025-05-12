import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useTasksStore from '../store/tasks';

interface TaskFormData {
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignedTo: string;
}

interface TaskFormProps {
  task?: TaskFormData & { _id: number };
  onClose: () => void;
}

const TaskForm = ({ task, onClose }: TaskFormProps) => {
  const { addTask, updateTask } = useTasksStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TaskFormData>({
    defaultValues: {
      title: '',
      description: '',
      dueDate: '',
      status: 'pending',
      priority: 'medium',
      assignedTo: '',
    },
  });

  // 🛠️ Set task values when in edit mode
  useEffect(() => {
    if (task) {
      setValue('title', task.title);
      setValue('description', task.description);
      setValue('assignedTo', task.assignedTo);
      setValue('status', task.status);
      setValue('priority', task.priority);

      // Convert to YYYY-MM-DD if it's a full ISO or Date string
      const formattedDate = task.dueDate.slice(0, 10);
      setValue('dueDate', formattedDate);
    }
  }, [task, setValue]);

  const onSubmit = (data: TaskFormData) => {
    if (task) {
      updateTask(task._id, data);
    } else {
      addTask(data);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            className="input"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Assigned To</label>
          <input
            type="text"
            {...register('assignedTo', { required: 'Assignee is required' })}
            className="input"
          />
          {errors.assignedTo && (
            <p className="mt-1 text-sm text-red-600">{errors.assignedTo.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            {...register('dueDate', { required: 'Due date is required' })}
            className="input"
          />
          {errors.dueDate && (
            <p className="mt-1 text-sm text-red-600">{errors.dueDate.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            {...register('status', { required: 'Status is required' })}
            className="input"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <select
            {...register('priority', { required: 'Priority is required' })}
            className="input"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && (
            <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            className="input"
            rows={3}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onClose} className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {task ? 'Update' : 'Add'} Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
