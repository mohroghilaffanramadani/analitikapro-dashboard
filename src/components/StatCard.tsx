import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { StatCardData } from "../types";

interface StatCardProps {
  data: StatCardData;
}

const StatCard: React.FC<StatCardProps> = ({ data }) => {
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

  const formatValue = (value: number) => {
    if (data.label.includes("Pendapatan")) {
      if (isMobile) {
        return `Rp ${Math.round(value / 10_000_000)} JT`;
      }
      if (isTablet) {
        return `Rp ${(value / 1000000).toFixed(1)}JT`;
      }
      return `Rp ${(value / 1000000).toFixed(1)} JT`;
    }
    if (data.label.includes("Tingkat Konversi")) {
      return `${value}%`;
    }

    if (isMobile && value >= 1000) {
      if (value >= 1000000) {
        return (value / 1000000).toFixed(1) + "JT";
      }
      return (value / 1000).toFixed(0) + "K";
    }

    return value.toLocaleString("id-ID");
  };

  const formatLabel = (label: string) => {
    if (isMobile) {
      if (label.includes("Pengguna Aktif")) return "Active User";
      if (label.includes("Pendapatan")) return "Pendapatan";
      if (label.includes("Pengguna")) return "Total User";
      if (label.includes("Konversi")) return "Konversi";
    }

    if (isTablet && label.length > 12) {
      if (label.includes("Pengguna Aktif")) return "Pengguna Aktif";
      if (label.includes("Pengguna")) return "Total Pengguna";
      if (label.includes("Tingkat")) return "Tingkat Konversi";
    }

    return label;
  };

  const getFontSize = () => {
    if (isMobile) return "text-base"; 
    if (isTablet) return "text-lg";
    return "text-xl";
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-700 p-3 md:p-4 lg:p-5 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p
            className={`${
              isMobile ? "text-xs" : isTablet ? "text-sm" : "text-sm"
            } text-gray-500 dark:text-gray-400`}
          >
            {formatLabel(data.label)}
          </p>
          <h3
            className={`${getFontSize()} font-bold text-gray-900 dark:text-white ${
              isMobile ? "mt-1" : isTablet ? "mt-1" : "mt-2"
            }`}
          >
            {formatValue(data.value)}
          </h3>
        </div>
        <div
          className={`
          flex items-center space-x-1 px-2 py-1 rounded-full ${
            isMobile ? "text-xs" : isTablet ? "text-sm" : "text-sm"
          }
          ${
            data.changeType === "increase"
              ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
              : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
          }
        `}
        >
          {data.changeType === "increase" ? (
            <TrendingUp size={isMobile ? 12 : isTablet ? 14 : 14} />
          ) : (
            <TrendingDown size={isMobile ? 12 : isTablet ? 14 : 14} />
          )}
          <span>{data.change}%</span>
        </div>
      </div>
      <p
        className={`${
          isMobile ? "text-xs" : "text-xs"
        } text-gray-500 dark:text-gray-400 ${
          isMobile ? "mt-3" : isTablet ? "mt-3" : "mt-4"
        }`}
      >
        vs {data.period}
      </p>
      <div
        className={`${
          isMobile ? "mt-2" : isTablet ? "mt-2" : "mt-3"
        } h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden`}
      >
        <div
          className={`
            h-full rounded-full transition-all duration-500
            ${
              data.changeType === "increase"
                ? "bg-gradient-to-r from-green-400 to-green-600"
                : "bg-gradient-to-r from-red-400 to-red-600"
            }
          `}
          style={{ width: `${Math.min(Math.abs(data.change) * 5, 100)}%` }}
        />
      </div>
    </div>
  );
};

export default StatCard;
