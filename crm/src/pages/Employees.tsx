import React from 'react';

interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  hireDate: string;
}

// Mock data for demonstration
const mockEmployees: Employee[] = [
  { id: 'EMP-001', name: 'Alice Wonderland', department: 'Sales', position: 'Sales Manager', hireDate: '2023-01-15' },
  { id: 'EMP-002', name: 'Bob The Builder', department: 'Engineering', position: 'Software Engineer', hireDate: '2022-11-01' },
  { id: 'EMP-003', name: 'Charlie Chaplin', department: 'Marketing', position: 'Marketing Specialist', hireDate: '2023-05-20' },
  { id: 'EMP-004', name: 'Diana Prince', department: 'Support', position: 'Support Lead', hireDate: '2023-08-10' },
];

const Employees = () => {
  return (
    <div className="w-full space-y-8 px-6 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
        <button className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700">
          Add Employee
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Position
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hire Date
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockEmployees.map((employee) => (
              <tr key={employee.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600 hover:text-primary-800">
                   <a href="#">{employee.id}</a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {employee.name}
                </td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {employee.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {employee.position}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {employee.hireDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" className="text-primary-600 hover:text-primary-900">View</a>
                  {/* Add more actions like Edit, Terminate */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees; 