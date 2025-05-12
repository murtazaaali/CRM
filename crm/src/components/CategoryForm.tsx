import { useForm } from "react-hook-form";
import useCategoriesStore from "../store/categories";

interface CategoryFormData {
  name: string;
  description: string;
  parentCategory?: string; // mark as optional
  isActive: boolean;
}

interface CategoryFormProps {
  category?: CategoryFormData & { _id: number };
  onClose: () => void;
}

const CategoryForm = ({ category, onClose }: CategoryFormProps) => {
  const { addCategory, updateCategory } = useCategoriesStore();
  const { categories } = useCategoriesStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    defaultValues: category || {
      name: "",
      description: "",
      parentCategory: "",
      isActive: true,
    },
  });

  const onSubmit = (data: CategoryFormData) => {
    if (category) {
      updateCategory(category._id, data);
    } else {
      addCategory(data);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="input"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Parent Category
          </label>
          <select
            {...register("parentCategory")}
            className="input"
            defaultValue=""
          >
            <option value="">Select category</option>
            {categories.map((e) => (
              <option key={e._id} value={e._id}>
                {e.name}
              </option>
            ))}
          </select>
          {errors.parentCategory && (
            <p className="mt-1 text-sm text-red-600">
              {errors.parentCategory.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            {...register("isActive")}
            className="input"
            defaultValue="true"
          >
            <option value="true">Active</option>
            <option value="false">In-Active</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="input"
            rows={3}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onClose} className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {category ? "Update" : "Add"} Category
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
