import { useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

interface Deal {
  id: number;
  name: string;
  company: string;
  value: number;
  stage: 'proposal' | 'negotiation' | 'contract' | 'closed' | 'lost';
  probability: number;
  expectedCloseDate: string;
  owner: string;
}

const columnHelper = createColumnHelper<Deal>();

const columns = [
  columnHelper.accessor('name', {
    header: 'Deal Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('company', {
    header: 'Company',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('value', {
    header: 'Value',
    cell: info => `$${info.getValue().toLocaleString()}`,
  }),
  columnHelper.accessor('stage', {
    header: 'Stage',
    cell: info => {
      const stage = info.getValue();
      const color = {
        proposal: 'bg-blue-100 text-blue-800',
        negotiation: 'bg-yellow-100 text-yellow-800',
        contract: 'bg-purple-100 text-purple-800',
        closed: 'bg-green-100 text-green-800',
        lost: 'bg-red-100 text-red-800',
      }[stage];
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
          {stage}
        </span>
      );
    },
  }),
  columnHelper.accessor('probability', {
    header: 'Probability',
    cell: info => `${info.getValue()}%`,
  }),
  columnHelper.accessor('expectedCloseDate', {
    header: 'Expected Close',
    cell: info => new Date(info.getValue()).toLocaleDateString(),
  }),
  columnHelper.accessor('owner', {
    header: 'Owner',
    cell: info => info.getValue(),
  }),
];

const Deals = () => {
  // Mock data - in a real app, this would come from a store or API
  const [deals, setDeals] = useState<Deal[]>([
    {
      id: 1,
      name: 'Enterprise Software License',
      company: 'Acme Inc',
      value: 50000,
      stage: 'negotiation',
      probability: 75,
      expectedCloseDate: '2024-06-30',
      owner: 'John Doe',
    },
    {
      id: 2,
      name: 'Cloud Services Contract',
      company: 'XYZ Corp',
      value: 25000,
      stage: 'proposal',
      probability: 50,
      expectedCloseDate: '2024-07-15',
      owner: 'Jane Smith',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | undefined>(undefined);

  const table = useReactTable({
    data: deals,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleEdit = (deal: Deal) => {
    setSelectedDeal(deal);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      setDeals(deals.filter(deal => deal.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Deals</h1>
        <button
          onClick={() => {
            setSelectedDeal(undefined);
            setShowForm(true);
          }}
          className="btn btn-primary"
        >
          Add Deal
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-xl font-semibold mb-4">
              {selectedDeal ? 'Edit Deal' : 'Add Deal'}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Deal Name</label>
                <input
                  type="text"
                  className="input"
                  defaultValue={selectedDeal?.name}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <input
                  type="text"
                  className="input"
                  defaultValue={selectedDeal?.company}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Value</label>
                <input
                  type="number"
                  className="input"
                  defaultValue={selectedDeal?.value}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Stage</label>
                <select className="input" defaultValue={selectedDeal?.stage}>
                  <option value="proposal">Proposal</option>
                  <option value="negotiation">Negotiation</option>
                  <option value="contract">Contract</option>
                  <option value="closed">Closed</option>
                  <option value="lost">Lost</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Probability</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="input"
                  defaultValue={selectedDeal?.probability}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Expected Close Date</label>
                <input
                  type="date"
                  className="input"
                  defaultValue={selectedDeal?.expectedCloseDate}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Owner</label>
                <input
                  type="text"
                  className="input"
                  defaultValue={selectedDeal?.owner}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {selectedDeal ? 'Update' : 'Add'} Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
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
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
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
                    onClick={() => handleDelete(row.original.id)}
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

export default Deals; 