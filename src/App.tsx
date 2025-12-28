import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";
import AnalyticsPage from "./pages/AnalyticsPage";
import UsersPage from "./pages/UsersPage";
import RevenuePage from "./pages/RevenuePage";
import SettingsPage from "./pages/SettingsPage";
import NotificationsPage from "./pages/NotificationsPage";
import AllUsersPage from "./pages/AllUsersPage";
import { DashboardData } from "./types";
import { generateDashboardData } from "./utils/dataGenerator";
import StatCard from "./components/StatCard";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import DoughnutChart from "./components/DoughnutChart";
import UserTable from "./components/UserTable";

const AppContent: React.FC = () => {
  const [activePage, setActivePage] = useState("beranda");
  const [activeFilter, setActiveFilter] = useState("30days");
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const hideSidebarMenuButton = ["/notifications", "/all-users"].includes(
    location.pathname
  );

  const loadDashboardData = (filter: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const data = generateDashboardData(filter);
      setDashboardData(data);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (activePage === "beranda") {
      loadDashboardData(activeFilter);
    }
  }, [activeFilter, activePage]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const handlePageChange = (page: string) => {
    setActivePage(page);
    switch (page) {
      case "beranda":
        navigate("/");
        break;
      case "analitik":
        navigate("/analytics");
        break;
      case "pengguna":
        navigate("/users");
        break;
      case "pendapatan":
        navigate("/revenue");
        break;
      case "pengaturan":
        navigate("/settings");
        break;
      case "notifikasi":
        navigate("/notifications");
        break;
      case "semua-pengguna":
        navigate("/all-users");
        break;
      default:
        navigate("/");
    }
  };

  const renderHomePage = () => {
    return (
      <>
        <div className="mb-4 md:mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-2 md:mb-0">
              <h1 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
                Dashboard Analitik
              </h1>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                {activeFilter === "7days"}
                {activeFilter === "30days"}
                {activeFilter === "1year"}
              </p>
            </div>
            <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              Terakhir diperbarui: {new Date().toLocaleTimeString("id-ID")}
            </div>
          </div>
        </div>

        <div className="mb-3 md:mb-4 p-2 md:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-blue-500 rounded-full mr-1 md:mr-2 flex-shrink-0"></div>
            <span className="text-xs md:text-sm font-medium text-blue-700 dark:text-blue-300">
              Menampilkan data untuk:&nbsp;
              <span className="font-bold">
                {activeFilter === "7days" && "7 Hari Terakhir"}
                {activeFilter === "30days" && "30 Hari Terakhir"}
                {activeFilter === "1year" && "1 Tahun Terakhir"}
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
          {isLoading
            ? Array(4)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl p-3 md:p-5 animate-pulse"
                  >
                    <div className="h-3 md:h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2 md:mb-4"></div>
                    <div className="h-5 md:h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-1 md:mb-2"></div>
                    <div className="h-1 md:h-2 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  </div>
                ))
            : dashboardData?.statCards.map((stat, index) => (
                <StatCard key={index} data={stat} />
              ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl p-3 md:p-5 animate-pulse">
                <div className="h-4 md:h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 md:w-1/3 mb-3 md:mb-4"></div>
                <div className="h-[200px] md:h-[300px] bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ) : (
              dashboardData && (
                <LineChart data={dashboardData.pertumbuhanPengguna} />
              )
            )}
          </div>

          {isLoading ? (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl p-3 md:p-5 animate-pulse">
                <div className="h-4 md:h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 md:w-1/2 mb-3 md:mb-4"></div>
                <div className="h-[200px] md:h-[300px] bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl p-3 md:p-5 animate-pulse">
                <div className="h-4 md:h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 md:w-1/2 mb-3 md:mb-4"></div>
                <div className="h-[200px] md:h-[300px] bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </>
          ) : (
            <>
              {dashboardData && (
                <BarChart data={dashboardData.pendapatanBulanan} />
              )}
              {dashboardData && (
                <DoughnutChart data={dashboardData.distribusiPerangkat} />
              )}
            </>
          )}
        </div>

        <div className="mb-4 md:mb-6">
          {isLoading ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl p-3 md:p-6 animate-pulse">
              <div className="h-4 md:h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 md:w-1/4 mb-3 md:mb-4"></div>
              <div className="space-y-2 md:space-y-3">
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="h-8 md:h-12 bg-gray-200 dark:bg-gray-700 rounded"
                    ></div>
                  ))}
              </div>
            </div>
          ) : (
            dashboardData && <UserTable users={dashboardData.penggunaTerbaru} />
          )}
        </div>
      </>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar
        activePage={activePage}
        setActivePage={handlePageChange}
        hideMenuButton={hideSidebarMenuButton}
      />

      <div className="flex-1 flex flex-col lg:ml-12">
        {!["/notifications", "/all-users"].includes(location.pathname) && (
          <TopNav
            activeFilter={activeFilter}
            setActiveFilter={handleFilterChange}
            showFilters={activePage === "beranda"}
          />
        )}

        <main className="flex-1 p-3 md:p-4 lg:p-6">
          <div className="max-w-full overflow-hidden">
            <Routes>
              <Route path="/" element={renderHomePage()} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/revenue" element={<RevenuePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/all-users" element={<AllUsersPage />} />

              <Route path="*" element={renderHomePage()} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
