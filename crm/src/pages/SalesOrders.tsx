import React from 'react';

interface SalesOrder {
  id: string;
  customer: string;
  date: string;
  status: 'Draft' | 'Submitted' | 'Completed' | 'Cancelled';
  amount: number;
}

// Mock data for demonstration
const mockSalesOrders: SalesOrder[] = [
  { id: 'SO-001', customer: 'Alpha Corp', date: '2024-07-28', status: 'Submitted', amount: 1500.00 },
  { id: 'SO-002', customer: 'Beta LLC', date: '2024-07-27', status: 'Completed', amount: 850.50 },
  { id: 'SO-003', customer: 'Gamma Inc', date: '2024-07-26', status: 'Draft', amount: 2100.75 },
  { id: 'SO-004', customer: 'Alpha Corp', date: '2024-07-25', status: 'Cancelled', amount: 500.00 },
];

const SalesOrders = () => {
  return (
    <div className="w-full space-y-8 px-6 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Sales Orders</h1>
        <button className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700">
          New Sales Order
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockSalesOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600 hover:text-primary-800">
                  <a href="#">{order.id}</a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.customer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'Submitted' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                  ${order.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" className="text-primary-600 hover:text-primary-900">Edit</a>
                  {/* Add more actions like View, Delete */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesOrders; 