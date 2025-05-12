import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UserGroupIcon,
  UserIcon,
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  Cog6ToothIcon,
  // BellIcon,
  // MagnifyingGlassIcon,
  // ChevronDownIcon,
  IdentificationIcon,
  Squares2X2Icon
} from '@heroicons/react/24/outline';
import Header from './Header';



const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: HomeIcon },
    { path: '/contacts', label: 'Contacts', icon: UserGroupIcon },
    { path: '/leads', label: 'Leads', icon: UserIcon },
    { path: '/deals', label: 'Deals', icon: CurrencyDollarIcon },
    { path: '/tasks', label: 'Tasks', icon: ClipboardDocumentListIcon },
    { path: '/employees', label: 'Employees', icon: IdentificationIcon },
    { path: '/categories', label: 'Categories', icon: Squares2X2Icon },
    { path: '/calendar', label: 'Calendar', icon: CalendarIcon },
    { path: '/reports', label: 'Reports', icon: ChartBarIcon },
    { path: '/projects', label: 'Projects', icon: FolderIcon },
    { path: '/settings', label: 'Settings', icon: Cog6ToothIcon },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto`}>
        <div className="flex h-16 items-center justify-between px-4 sticky top-0 bg-white z-10">
          <h1 className="text-2xl font-bold text-primary-600">CRM</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="mt-4 flex-1 px-2 pb-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Header */}
        
        <Header setSidebarOpen={setSidebarOpen} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout; 