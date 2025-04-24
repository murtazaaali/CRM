import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  BellIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: HomeIcon },
    { path: '/contacts', label: 'Contacts', icon: UserGroupIcon },
    { path: '/leads', label: 'Leads', icon: UserIcon },
    { path: '/deals', label: 'Deals', icon: CurrencyDollarIcon },
    { path: '/tasks', label: 'Tasks', icon: ClipboardDocumentListIcon },
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
        <header className="sticky top-0 z-40 bg-white shadow-sm">
          <div className="flex h-16 items-center justify-between px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="flex flex-1 items-center justify-end space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 rounded-md border-gray-300 pl-10 pr-4 py-2 text-sm focus:border-primary-500 focus:ring-primary-500"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <button className="relative rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200">
                <BellIcon className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white">3</span>
              </button>
              <div className="relative">
                <button className="flex items-center space-x-2 rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200">
                  <div className="h-8 w-8 rounded-full bg-primary-600"></div>
                  <ChevronDownIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 