import { useForm } from "react-hook-form";
import useLeadsStore from "../store/leads";

interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  status: "new" | "contacted" | "qualified" | "lost";
  source: "website" | "referral" | "social" | "other";
  value: number;
}

interface LeadFormProps {
  lead?: LeadFormData & { _id: number };
  onClose: () => void;
}

const LeadForm = ({ lead, onClose }: LeadFormProps) => {
  const { addLead, updateLead } = useLeadsStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormData>({
    defaultValues: lead || {
      name: "",
      email: "",
      phone: "",
      company: "",
      status: "new",
      source: "website",
      value: 0,
    },
  });

  const onSubmit = (data: LeadFormData) => {
    if (lead) {
      updateLead(lead._id, data);
    } else {
      addLead(data);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <h2 className="text-xl font-semibold mb-4">
          {lead ? "Edit Lead" : "Add Lead"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
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
              Phone
            </label>
            <input
              type="tel"
              {...register("phone", { required: "Phone # is required" })}
              className="input"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company
            </label>
            <input
              type="tel"
              {...register("company", { required: "Company is required" })}
              className="input"
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-600">
                {errors.company.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              className="input"
              {...register("status", { required: "Status is required" })}
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="lost">Lost</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-600">
                {errors.status.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Source
            </label>
            <select
              className="input"
              {...register("source", { required: "Status is required" })}
            >
              <option value="website">Website</option>
              <option value="referral">Referral</option>
              <option value="social">Social Media</option>
              <option value="other">Other</option>
            </select>
            {errors.source && (
              <p className="mt-1 text-sm text-red-600">
                {errors.source.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Value
            </label>
            <input
              className="input"
              {...register("value", { required: "Value is required" })}
            />
            {errors.value && (
              <p className="mt-1 text-sm text-red-600">
                {errors.value.message}
              </p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <div>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
            <div>
              <button type="submit" className="btn btn-primary">
                {lead ? "Update" : "Add"} Lead
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;
