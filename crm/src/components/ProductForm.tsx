import { useForm } from "react-hook-form";
import useProductsStore from "../store/products";

export interface ProductDataForm {
  _id?: number;
  name: string;
  itemCode: string;
  description: string;
  unit: string;
  brand: string;
  costPrice: number;
  sellingPrice: number;
  isStockItem: number;
  hasBatch: boolean;
  hasSerial: boolean;
  isActive: boolean;
}


interface ProductFormProps {
  product?: ProductDataForm & { _id: number };
  onClose: () => void;
}

const ProductForm = ({ product, onClose }: ProductFormProps) => {
  const { addProduct, updateProduct } = useProductsStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductDataForm>({
    defaultValues: product || {
      name: "",
      itemCode: "",
      description: "",
      unit: "",
      brand: "",
      costPrice: 0,
      sellingPrice: 0,
      isStockItem: 1,
      hasBatch: false,
      hasSerial: false,
      isActive: true,
    },
  });

  const onSubmit = (data: ProductDataForm) => {
  if (product) {
    updateProduct(product._id, data);
  } else {
    addProduct(data); 
  }
  onClose();
};


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input type="text" {...register("name", { required: "Name is required" })} className="input" />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        {/* Item Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Item Code</label>
          <input type="text" {...register("itemCode", { required: "Item Code is required" })} className="input" />
          {errors.itemCode && <p className="mt-1 text-sm text-red-600">{errors.itemCode.message}</p>}
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea {...register("description")} className="input" rows={3} />
        </div>

        {/* Unit */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Unit</label>
          <input type="text" {...register("unit")} className="input" />
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Brand</label>
          <input type="text" {...register("brand")} className="input" />
        </div>

        {/* Cost Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Cost Price</label>
          <input type="number" {...register("costPrice", { valueAsNumber: true })} className="input" />
        </div>

        {/* Selling Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Selling Price</label>
          <input type="number" {...register("sellingPrice", { valueAsNumber: true })} className="input" />
        </div>

        {/* Stock Item */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Is Stock Item</label>
          <select {...register("isStockItem", { valueAsNumber: true })} className="input">
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </select>
        </div>

        {/* Has Batch */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Has Batch</label>
          <input type="checkbox" {...register("hasBatch")} />
        </div>

        {/* Has Serial */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Has Serial</label>
          <input type="checkbox" {...register("hasSerial")} />
        </div>

        {/* Is Active */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Is Active</label>
          <select {...register("isActive")} className="input">
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onClose} className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {product ? "Update" : "Add"} Product
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
