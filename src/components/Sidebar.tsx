import React, { useState } from "react";
import {
  Home,
  BarChart3,
  Users,
  DollarSign,
  Settings,
  Menu,
  X,
} from "lucide-react";

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  hideMenuButton?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activePage, 
  setActivePage,
  hideMenuButton = false
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "beranda", label: "Beranda", icon: <Home size={18} /> },
    { id: "analitik", label: "Analitik", icon: <BarChart3 size={18} /> },
    { id: "pengguna", label: "Pengguna", icon: <Users size={18} /> },
    { id: "pendapatan", label: "Pendapatan", icon: <DollarSign size={18} /> },
    { id: "pengaturan", label: "Pengaturan", icon: <Settings size={18} /> },
  ];

  const handleMenuItemClick = (itemId: string) => {
    setActivePage(itemId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {!isMobileMenuOpen && !hideMenuButton && (
        <button
          className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      )}

      <aside
        className={`
          fixed lg:sticky lg:top-0 inset-y-0 left-0 z-40
          w-56 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
          transform transition-transform duration-300 ease-in-out
          h-screen lg:h-[100vh] overflow-y-auto
          ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BarChart3 size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                    Analitika
                    <span className="text-blue-600 dark:text-blue-400">Pro</span>
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Dashboard
                  </p>
                </div>
              </div>
              
              {isMobileMenuOpen && (
                <button
                  className="lg:hidden p-1.5 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>

          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`
                  w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg
                  transition-all duration-200 text-sm
                  ${
                    activePage === item.id
                      ? "bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-semibold"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }
                `}
                onClick={() => handleMenuItemClick(item.id)}
              >
                <div
                  className={`
                  p-1.5 rounded-md
                  ${
                    activePage === item.id
                      ? "bg-blue-100 dark:bg-blue-900/30"
                      : "bg-gray-100 dark:bg-gray-800"
                  }
                `}
                >
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-3 border-t border-gray-200 dark:border-gray-800 shrink-0">
            <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                <span className="font-medium">Versi 2.1.0</span>
                <span className="block text-xs mt-1">© 2024 AnalitikaPro</span>
              </p>
            </div>
          </div>
        </div>
      </aside>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;