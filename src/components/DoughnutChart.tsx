import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { ChartData } from "../types";
import type { ChartOptions } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  data: ChartData;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data }) => {
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

  const getLegendPosition = () => {
    if (isMobile) return "bottom";
    return "right";
  };

  const getFontSize = () => {
    if (isMobile) return 11;
    if (isTablet) return 12;
    return 13;
  };

  const getLegendPadding = () => {
    if (isMobile) return 10;
    if (isTablet) return 14;
    return 16;
  };

  const getBoxSize = () => {
    if (isMobile) return 12;
    if (isTablet) return 14;
    return 16;
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,

    // ⬇️ CHART BISA DIGESER KHUSUS TABLET
    layout: {
      padding: {
        left: isTablet ? 80 : 0,
        right: isTablet ? 0 : 0,
      },
    },

    plugins: {
      legend: {
        position: getLegendPosition(),
        align: "center",
        labels: {
          color: "#6b7280",
          font: {
            family: "'Inter', sans-serif",
            size: getFontSize(),
          },
          padding: getLegendPadding(),
          boxWidth: getBoxSize(),
          boxHeight: getBoxSize(),
        },
      },

      // ⬇️ TITLE DIMATIKAN KHUSUS TABLET
      title: {
        display: !isTablet,
        text: "Distribusi Perangkat Pengguna",
        align: "center",
        padding: {
          bottom: 16,
        },
        color: "#111827",
        font: {
          family: "'Inter', sans-serif",
          size: 16,
          weight: "bold",
        },
      },

      tooltip: {},
    },

    cutout: isMobile ? "60%" : isTablet ? "62%" : "65%",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-700 p-3 md:p-4 lg:p-5">
      
      {/* ⬇️ JUDUL KHUSUS TABLET (TIDAK IKUT GESER) */}
      {isTablet && (
        <h3 className="text-center text-gray-900 dark:text-white font-bold text-base mb-3">
          Distribusi Perangkat Pengguna
        </h3>
      )}

      <div className="h-[280px] sm:h-[300px] md:h-[320px] lg:h-[300px]">
        <Doughnut options={options} data={data} />
      </div>
    </div>
  );
};

export default DoughnutChart;
