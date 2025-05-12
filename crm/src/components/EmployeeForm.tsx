import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useEmployeesStore from "../store/employee";

interface EmployeeFormData {
  name: string;
  department: string;
  position: string;
  hireDate: string;
  email: string;
}

interface EmployeeFormProps {
  employee?: EmployeeFormData & { _id: number };
  onClose: () => void;
}

const EmployeeForm = ({ employee, onClose }: EmployeeFormProps) => {
  const { addEmployee, updateEmployee } = useEmployeesStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    defaultValues: {
      name: "",
      department: "",
      position: "",
      hireDate: "",
      email : "",
    },
  });

  // 🛠️ Set employee values when in edit mode
  useEffect(() => {
    if (employee) {
      setValue("name", employee.name);
      setValue("department", employee.department);
      setValue("position", employee.position);
      setValue("hireDate", employee.hireDate);
      setValue("email", employee.email);
      // Convert to YYYY-MM-DD if it's a full ISO or Date string
      const formattedDate = employee.hireDate.slice(0, 10);
      setValue("hireDate", formattedDate);
    }
  }, [employee, setValue]);

  const onSubmit = (data: EmployeeFormData) => {
    if (employee) {
      updateEmployee(employee._id, data);
    } else {
      addEmployee(data);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
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
            Email
          </label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="input"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <input
            type="text"
            {...register("department", { required: "Department is required" })}
            className="input"
          />
          {errors.department && (
            <p className="mt-1 text-sm text-red-600">
              {errors.department.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Position
          </label>
          <input
            type="text"
            {...register("position", { required: "Position is required" })}
            className="input"
          />
          {errors.position && (
            <p className="mt-1 text-sm text-red-600">
              {errors.position.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Hie Date
          </label>
          <input
            type="date"
            {...register("hireDate", { required: "Hire date is required" })}
            className="input"
          />
          {errors.hireDate && (
            <p className="mt-1 text-sm text-red-600">
              {errors.hireDate.message}
            </p>
          )}
        </div>

    

     
       
      </div>

      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onClose} className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {employee ? "Update" : "Add"} Employee
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
