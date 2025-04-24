import { useQuery } from '@tanstack/react-query';
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  UserGroupIcon,
  UserIcon,
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';

interface StatCardProps {
  title: string;
  value: number;
  change: number;
  icon: React.ElementType;
  color: string;
}

const StatCard = ({ title, value, change, icon: Icon, color }: StatCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            <span className={`ml-2 flex items-center text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? (
                <ArrowTrendingUpIcon className="h-4 w-4" />
              ) : (
                <ArrowTrendingDownIcon className="h-4 w-4" />
              )}
              {Math.abs(change)}%
            </span>
          </div>
        </div>
        <div className={`rounded-lg p-3 ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  // Mock data - in a real app, this would come from an API
  const stats = [
    {
      title: 'Total Contacts',
      value: 245,
      change: 12,
      icon: UserGroupIcon,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Leads',
      value: 45,
      change: -2,
      icon: UserIcon,
      color: 'bg-purple-500',
    },
    {
      title: 'Open Deals',
      value: 12,
      change: 5,
      icon: CurrencyDollarIcon,
      color: 'bg-green-500',
    },
    {
      title: 'Pending Tasks',
      value: 8,
      change: 0,
      icon: ClipboardDocumentListIcon,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="w-full space-y-8 px-6 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            Export
          </button>
          <button className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700">
            Add New
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-full bg-gray-100"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">New contact added</p>
                    <p className="text-sm text-gray-500">John Doe was added to contacts</p>
                    <p className="mt-1 text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-medium text-gray-900">Quick Stats</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Conversion Rate</span>
                <span className="text-sm font-medium text-gray-900">2.4%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Avg. Deal Size</span>
                <span className="text-sm font-medium text-gray-900">$12,500</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Response Time</span>
                <span className="text-sm font-medium text-gray-900">2.3 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 