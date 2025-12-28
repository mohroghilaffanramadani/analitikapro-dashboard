import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ChartData } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: ChartData;
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
  
  const getTitleSize = () => {
    if (isMobile) return 14;
    if (isTablet) return 15;
    return 16;
  };

  const getFontSize = () => {
    if (isMobile) return 11;
    if (isTablet) return 12;
    return 13;
  };

  const getAxisFontSize = () => {
    if (isMobile) return 10;
    if (isTablet) return 11;
    return 11;
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Pendapatan Bulanan',
        color: '#111827',
        font: {
          family: "'Inter', sans-serif",
          size: getTitleSize(),
          weight: 'bold' as const
        },
        padding: {
          top: isMobile ? 10 : isTablet ? 15 : 20,
          bottom: isMobile ? 10 : isTablet ? 15 : 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: {
          family: "'Inter', sans-serif",
          size: getFontSize()
        },
        bodyFont: {
          family: "'Inter', sans-serif",
          size: getFontSize()
        },
        padding: isMobile ? 8 : isTablet ? 10 : 12,
        callbacks: {
          label: function(context: any) {
            return `Rp ${context.raw} JT`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: getAxisFontSize()
          },
          maxRotation: isMobile ? 45 : isTablet ? 30 : 0
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: getAxisFontSize()
          },
          padding: isMobile ? 4 : isTablet ? 6 : 8,
          callback: function(value: any) {
            return `Rp ${value} JT`;
          }
        }
      }
    },
    barPercentage: isMobile ? 0.6 : isTablet ? 0.7 : 0.8,
    categoryPercentage: isMobile ? 0.7 : isTablet ? 0.8 : 0.9
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-700 p-3 md:p-4 lg:p-5">
      <div className="h-[250px] sm:h-[280px] md:h-[300px] lg:h-[300px]">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default BarChart;