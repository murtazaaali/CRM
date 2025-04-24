import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'new' | 'contacted' | 'qualified' | 'lost';
  source: 'website' | 'referral' | 'social' | 'other';
  value: number;
}

const columnHelper = createColumnHelper<Lead>();

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('phone', {
    header: 'Phone',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('company', {
    header: 'Company',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => {
      const status = info.getValue();
      const color = {
        new: 'bg-blue-100 text-blue-800',
        contacted: 'bg-yellow-100 text-yellow-800',
        qualified: 'bg-green-100 text-green-800',
        lost: 'bg-red-100 text-red-800',
      }[status];
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
          {status}
        </span>
      );
    },
  }),
  columnHelper.accessor('source', {
    header: 'Source',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('value', {
    header: 'Value',
    cell: info => `$${info.getValue().toLocaleString()}`,
  }),
];

const Leads = () => {
  // Mock data - in a real app, this would come from a store or API
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      company: 'Acme Inc',
      status: 'new',
      source: 'website',
      value: 50000,
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '(555) 987-6543',
      company: 'XYZ Corp',
      status: 'contacted',
      source: 'referral',
      value: 75000,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | undefined>(undefined);

  const table = useReactTable({
    data: leads,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleEdit = (lead: Lead) => {
    setSelectedLead(lead);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      setLeads(leads.filter(lead => lead.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
        <button
          onClick={() => {
            setSelectedLead(undefined);
            setShowForm(true);
          }}
          className="btn btn-primary"
        >
          Add Lead
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-xl font-semibold mb-4">
              {selectedLead ? 'Edit Lead' : 'Add Lead'}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  className="input"
                  defaultValue={selectedLead?.name}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="input"
                  defaultValue={selectedLead?.email}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  className="input"
                  defaultValue={selectedLead?.phone}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <input
                  type="text"
                  className="input"
                  defaultValue={selectedLead?.company}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select className="input" defaultValue={selectedLead?.status}>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="lost">Lost</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Source</label>
                <select className="input" defaultValue={selectedLead?.source}>
                  <option value="website">Website</option>
                  <option value="referral">Referral</option>
                  <option value="social">Social Media</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Value</label>
                <input
                  type="number"
                  className="input"
                  defaultValue={selectedLead?.value}
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
                  {selectedLead ? 'Update' : 'Add'} Lead
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

export default Leads; 