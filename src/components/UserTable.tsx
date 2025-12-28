import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Mail,
  Calendar,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

  const getStatusIcon = (status: User["status"]) => {
    const iconSize = isMobile ? 12 : isTablet ? 13 : 14;
    switch (status) {
      case "Aktif":
        return <CheckCircle className="text-green-500" size={iconSize} />;
      case "Ditangguhkan":
        return <AlertCircle className="text-yellow-500" size={iconSize} />;
      case "Tidak Aktif":
        return <XCircle className="text-red-500" size={iconSize} />;
    }
  };

  const getDeviceIcon = (device: User["perangkat"]) => {
    const iconSize = isMobile ? 12 : isTablet ? 13 : 14;
    switch (device) {
      case "Desktop":
        return <Monitor size={iconSize} />;
      case "Mobile":
        return <Smartphone size={iconSize} />;
      case "Tablet":
        return <Tablet size={iconSize} />;
    }
  };

  const formatDate = (date: string) => {
    if (isMobile) {
      const parts = date.split('-');
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}`;
      }
    }
    if (isTablet) {
      const parts = date.split('-');
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0].slice(2)}`;
      }
    }
    return date;
  };

  const getTitleSize = () => {
    if (isMobile) return 'text-base';
    if (isTablet) return 'text-lg';
    return 'text-lg';
  };

  const getSubtitleSize = () => {
    if (isMobile) return 'text-xs';
    if (isTablet) return 'text-sm';
    return 'text-sm';
  };

  const getPaddingX = () => {
    if (isMobile) return 'px-3';
    if (isTablet) return 'px-4';
    return 'px-6';
  };

  const getPaddingY = () => {
    if (isMobile) return 'py-3';
    if (isTablet) return 'py-3';
    return 'py-4';
  };

  const getCellPadding = () => {
    if (isMobile) return 'py-4 px-3';
    if (isTablet) return 'py-4 px-4';
    return 'py-4 px-6';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className={`${getPaddingX()} ${getPaddingY()} border-b border-gray-200 dark:border-gray-700`}>
        <h2 className={`${getTitleSize()} font-semibold text-gray-900 dark:text-white`}>
          Pengguna Terbaru
        </h2>
        <p className={`${getSubtitleSize()} text-gray-600 dark:text-gray-400`}>
          Daftar pengguna yang bergabung dalam 30 hari terakhir
        </p>
      </div>

      {isMobile ? (
        <div className="px-3 py-2">
          {users.slice(0, 5).map((user) => (
            <div key={user.id} className="py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center mb-1">
                    <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                      <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                        {user.nama.charAt(0)}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                        {user.nama}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Mail size={10} className="mr-1" />
                        <span className="truncate">{user.email}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      {getStatusIcon(user.status)}
                      <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === "Aktif"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                          : user.status === "Ditangguhkan"
                          ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                          : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                      }`}>
                        {user.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                      <Calendar size={10} className="mr-1" />
                      <span>{formatDate(user.tanggalBergabung)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                      {getDeviceIcon(user.perangkat)}
                      <span className="ml-1">{user.perangkat}</span>
                    </div>
                    <span className="text-xs text-gray-500">ID: {user.id}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50">
                <th className={`${getCellPadding()} text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider`}>
                  Nama Pengguna
                </th>
                <th className={`${getCellPadding()} text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider`}>
                  Email
                </th>
                <th className={`${getCellPadding()} text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider`}>
                  Status
                </th>
                <th className={`${getCellPadding()} text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider`}>
                  Perangkat
                </th>
                <th className={`${getCellPadding()} text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider`}>
                  Bergabung
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
                >
                  <td className={getCellPadding()}>
                    <div className="flex items-center">
                      <div className={`${isMobile ? 'w-8' : isTablet ? 'w-8' : 'w-8'} h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-3 flex-shrink-0`}>
                        <span className={`${isMobile ? 'text-sm' : 'text-sm'} font-medium text-primary-600 dark:text-primary-400`}>
                          {user.nama.charAt(0)}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {user.nama}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          ID: {user.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className={getCellPadding()}>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Mail size={isMobile ? 14 : isTablet ? 14 : 14} className="mr-2 flex-shrink-0" />
                      <span className="truncate">{user.email}</span>
                    </div>
                  </td>
                  <td className={getCellPadding()}>
                    <div className="flex items-center">
                      {getStatusIcon(user.status)}
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-sm font-medium ${
                          user.status === "Aktif"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                            : user.status === "Ditangguhkan"
                            ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                            : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                        }`}
                      >
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className={getCellPadding()}>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      {getDeviceIcon(user.perangkat)}
                      <span className="ml-2">{user.perangkat}</span>
                    </div>
                  </td>
                  <td className={getCellPadding()}>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Calendar size={isMobile ? 14 : isTablet ? 14 : 14} className="mr-2 flex-shrink-0" />
                      <span>{formatDate(user.tanggalBergabung)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className={`${getPaddingX()} ${getPaddingY()} border-t border-gray-200 dark:border-gray-700`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
          <p className={`${getSubtitleSize()} text-gray-600 dark:text-gray-400`}>
            Menampilkan {isMobile ? Math.min(users.length, 5) : users.length} dari 12.480 total pengguna
          </p>
          <button
            onClick={() => navigate("/all-users")}
            className={`px-3 py-1.5 md:px-4 md:py-2 ${getSubtitleSize()} font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors whitespace-nowrap`}
          >
            {isMobile ? 'Lihat Semua →' : isTablet ? 'Lihat Semua →' : 'Lihat Semua Pengguna →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;