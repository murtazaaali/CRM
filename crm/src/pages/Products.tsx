import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import useProductsStore from "../store/products";
import ProductForm from "../components/ProductForm";


interface Product {
  name: string;
  itemCode: string;
//   category: string;
  description: string;
  unit: string;
  brand: string;
  costPrice: number;
  sellingPrice: number;
  isStockItem: number;
  hasBatch: boolean;
  hasSerial: boolean;
  isActive: boolean;
  _id?: number;
}

const columnHelper = createColumnHelper<Product>();

const columns = [
  columnHelper.accessor('name', {
    header: 'Product Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('itemCode', {
    header: 'Item Code',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('unit', {
    header: 'Unit',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('brand', {
    header: 'Brand',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('costPrice', {
    header: 'Cost Price',
    cell: info => `Rs. ${info.getValue().toFixed(2)}`,
  }),
  columnHelper.accessor('sellingPrice', {
    header: 'Selling Price',
    cell: info => `Rs. ${info.getValue().toFixed(2)}`,
  }),
  columnHelper.accessor('isStockItem', {
    header: 'Stock Item',
    cell: info => info.getValue() ? "Yes" : "No",
  }),
  columnHelper.accessor('hasBatch', {
    header: 'Has Batch',
    cell: info => info.getValue() ? "Yes" : "No",
  }),
  columnHelper.accessor('hasSerial', {
    header: 'Has Serial',
    cell: info => info.getValue() ? "Yes" : "No",
  }),
  columnHelper.accessor('isActive', {
    header: 'Status',
    cell: info => info.getValue() ? "Active" : "Inactive",
  }),
];


const Products = () => {
  const { products, deleteProduct, fetchProducts, isFetched } = useProductsStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Product | undefined>();

  useEffect(() => {
    if (!isFetched) {
      fetchProducts();
    }
  }, [fetchProducts, isFetched]);

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedCategory(product);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedCategory(undefined);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedCategory(undefined);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <button onClick={handleAdd} className="btn btn-primary">
          Add Product
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-xl font-semibold mb-4">
              {selectedCategory ? "Edit Product" : "Add Product"}
            </h2>
             <ProductForm product={selectedCategory} onClose={handleClose} />
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(row.original)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(row.original._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
