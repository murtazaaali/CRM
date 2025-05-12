import {
  UserGroupIcon,
  UserIcon,
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import Activities from "./Activities";
import useContactsStore from "../store/contacts";
import useLeadsStore from "../store/leads";
import useDealsStore from "../store/deal";
import useTasksStore from "../store/tasks";
import { Link } from "react-router-dom";

interface StatCardProps {
  title: string;
  value: number;
  link: string;
  change: number;
  icon: React.ElementType;
  color: string;
}

const StatCard = ({ title, value, link, icon: Icon, color }: StatCardProps) => {
  return (
    <Link
      to={link}
      className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md delay-75 "
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
          </div>
        </div>
        <div className={`rounded-lg p-3 ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </Link>
  );
};

const Dashboard = () => {
  const { contacts } = useContactsStore();
  const { leads } = useLeadsStore();
  const { deals } = useDealsStore();
  const { tasks } = useTasksStore();

  const stats = [
    {
      title: "Total Contacts",
      value: contacts?.length,
      link: "/contacts",
      change: 12,
      icon: UserGroupIcon,
      color: "bg-blue-500",
    },
    {
      title: "Active Leads",
      value: leads?.length,
      link: "/leads",
      change: -2,
      icon: UserIcon,
      color: "bg-purple-500",
    },
    {
      title: "Open Deals",
      value: deals?.filter((deal) => deal.stage !== "closed").length,
      link: "/deals",
      change: 5,
      icon: CurrencyDollarIcon,
      color: "bg-green-500",
    },
    {
      title: "Pending Tasks",
      value: tasks?.filter((task) => task?.status === "pending").length,
      link: "/tasks",
      change: 0,
      icon: ClipboardDocumentListIcon,
      color: "bg-orange-500",
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
            link={stat.link}
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
            <h2 className="text-lg font-medium text-gray-900">
              Recent Activity
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-6 h-36 overflow-y-scroll">
              <Activities isDashboard={true} />
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
                <span className="text-sm font-medium text-gray-900">
                  $12,500
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Response Time</span>
                <span className="text-sm font-medium text-gray-900">
                  2.3 hours
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
