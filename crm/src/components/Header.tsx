import { useState, useRef, useEffect } from "react";
import {
  ChevronDownIcon,
  BellIcon,
  MagnifyingGlassIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

const Header = ({ setSidebarOpen }: HeaderProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Optional: Redirect to login page
    window.location.href = "/login";
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4">
        <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
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
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white">
              3
            </span>
          </button>

          <Link
            to={"/activities"}
            className="relative rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
          >
            <InboxIcon className="h-6 w-6" />
            {/* <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white">
              3
            </span> */}
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center space-x-2 rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
            >
              <div className="h-8 w-8 rounded-full bg-primary-600"></div>
              <ChevronDownIcon className="h-4 w-4" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <Link
                  to={"/profile"}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
