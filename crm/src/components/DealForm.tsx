import { useForm } from "react-hook-form";
import useDealsStore from "../store/deal";

interface DealFormData {
  name: string;
  company: string;
  value: number;
  stage: "proposal" | "negotiation" | "contract" | "closed" | "lost";
  probability: number;
  expectedCloseDate: string;
  owner: string;
}

interface DealFormProps {
  deal?: DealFormData & { _id: number };
  onClose: () => void;
}

const DealForm = ({ deal, onClose }: DealFormProps) => {
  const { addDeal, updateDeal } = useDealsStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DealFormData>({
    defaultValues: deal || {
      name: "",
      company: "",
      value: 0,
      stage: "proposal",
      probability: 0,
      expectedCloseDate: "",
      owner: "",
    },
  });

  const onSubmit = (data: DealFormData) => {
    if (deal) {
      updateDeal(deal._id, data);
    } else {
      addDeal(data);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <h2 className="text-xl font-semibold mb-4">
          {deal ? "Edit Deal" : "Add Deal"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Deal Name
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
              Company
            </label>
            <input
              type="text"
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
              Value
            </label>
            <input
              type="text"
              {...register("value", { required: "Value is required" })}
              className="input"
            />
            {errors.value && (
              <p className="mt-1 text-sm text-red-600">
                {errors.value.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stage
            </label>
            <select
              className="input"
              {...register("stage", { required: "Stage is required" })}
            >
              <option value="proposal">Proposal</option>
              <option value="negotiation">Negotiation</option>
              <option value="contract">Contract</option>
              <option value="closed">Closed</option>
              <option value="lost">Lost</option>
            </select>
            {errors.stage && (
              <p className="mt-1 text-sm text-red-600">
                {errors.stage.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Probability
            </label>
            <input
              type="number"
              min="0"
              max="100"
              className="input"
              {...register("probability", {
                required: "Probability is required",
              })}
            />
            {errors.probability && (
              <p className="mt-1 text-sm text-red-600">
                {errors.probability.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expected Close Date
            </label>
            <input
              type="date"
              className="input"
              {...register("expectedCloseDate", {
                required: " Close Date is required",
              })}
            />
            {errors.expectedCloseDate && (
              <p className="mt-1 text-sm text-red-600">
                {errors.expectedCloseDate.message}
              </p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Owner
            </label>
            <input
              type="text"
              className="input"
              {...register("owner", { required: "Owner is required" })}
            />
            {errors.owner && (
              <p className="mt-1 text-sm text-red-600">
                {errors.owner.message}
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
                {deal ? "Update" : "Add"} Deal
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DealForm;
