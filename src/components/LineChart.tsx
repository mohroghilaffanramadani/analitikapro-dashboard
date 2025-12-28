import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ChartData } from "../types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LineChartProps {
  data: ChartData;
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
  
  const getTitleSize = () => {
    if (isMobile) return 14;
    if (isTablet) return 15;
    return 16;
  };

  const getLegendFontSize = () => {
    if (isMobile) return 11;
    if (isTablet) return 12;
    return 13;
  };

  const getFontSize = () => {
    if (isMobile) return 11;
    if (isTablet) return 12;
    return 12;
  };

  const getAxisFontSize = () => {
    if (isMobile) return 10;
    if (isTablet) return 11;
    return 11;
  };

  const getLegendBoxSize = () => {
    if (isMobile) return 16;
    if (isTablet) return 17;
    return 18;
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        margin: {
          top: isMobile ? 0 : isTablet ? 2 : 5,
          bottom: isMobile ? 5 : isTablet ? 8 : 10,
        },
        labels: {
          color: "#6b7280",
          font: {
            family: "'Inter', sans-serif",
            size: getLegendFontSize(),
            weight: "bold" as const,
          },
          usePointStyle: true,
          pointStyle: 'circle' as const,
          boxWidth: getLegendBoxSize(),
          boxHeight: getLegendBoxSize(),
          padding: isMobile ? 20 : isTablet ? 22 : 25,
        },
      },
      title: {
        display: true,
        text: "Pertumbuhan Pengguna",
        color: "#111827",
        font: {
          family: "'Inter', sans-serif",
          size: getTitleSize(),
          weight: "bold" as const,
        },
        padding: {
          top: isMobile ? 15 : isTablet ? 18 : 20,
          bottom: isMobile ? 5 : isTablet ? 8 : 10,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleFont: {
          family: "'Inter', sans-serif",
          size: getFontSize(),
        },
        bodyFont: {
          family: "'Inter', sans-serif",
          size: getFontSize(),
        },
        padding: isMobile ? 8 : isTablet ? 10 : 12,
        titleMarginBottom: isMobile ? 4 : isTablet ? 5 : 6,
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${value.toLocaleString('id-ID')}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          drawBorder: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: getAxisFontSize(),
          },
          maxRotation: isMobile ? 45 : isTablet ? 30 : 0,
          padding: isMobile ? 4 : isTablet ? 6 : 8,
        },
        title: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          drawBorder: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: getAxisFontSize(),
          },
          padding: isMobile ? 4 : isTablet ? 6 : 8,
          callback: function (value: any) {
            if (typeof value === "number") {
              if (isMobile && value >= 1000) {
                return (value / 1000).toFixed(1) + "k";
              }
              return value.toLocaleString("id-ID");
            }
            return value;
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
    elements: {
      point: {
        radius: isMobile ? 3 : isTablet ? 3.5 : 4,
        hoverRadius: isMobile ? 5 : isTablet ? 5.5 : 6,
      },
      line: {
        tension: 0.3,
        borderWidth: isMobile ? 2 : isTablet ? 2.5 : 3,
      },
    },
  };

  const shortenLabel = (label: string): string => {
    if (isMobile || isTablet) {
      if (label.includes('Pengguna Baru')) return 'Baru';
      if (label.includes('Pengguna Aktif')) return 'Aktif';
      if (label.includes('Baru')) return 'Baru';
      if (label.includes('Aktif')) return 'Aktif';
      if (label.includes('New')) return 'Baru';
      if (label.includes('Active')) return 'Aktif';
      
      if (label.length > 8) {
        const words = label.split(' ');
        return words[0] || label.substring(0, 6);
      }
    }
    
    return label;
  };

  const chartData = {
    ...data,
    datasets: data.datasets.map((dataset, index) => ({
      ...dataset,
      label: shortenLabel(dataset.label || (index === 0 ? 'Baru' : 'Aktif')),
      borderWidth: isMobile ? 2 : isTablet ? 2.5 : 3,
      pointRadius: isMobile ? 3 : isTablet ? 3.5 : 4,
      pointHoverRadius: isMobile ? 5 : isTablet ? 5.5 : 6,
    })),
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-700 p-3 md:p-4 lg:p-5 overflow-hidden">
      <div className="h-[250px] sm:h-[280px] md:h-[300px] lg:h-[300px]">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};

export default LineChart;