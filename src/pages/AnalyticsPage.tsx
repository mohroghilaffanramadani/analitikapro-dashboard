import React, { useState, useEffect, useMemo } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  MousePointerClick,
  Clock,
  Filter,
  Download,
  Calendar,
  X,
} from "lucide-react";
import AllPagesAnalytics from "./AllPagesAnalytics";

interface MainMetric {
  id: number;
  title: string;
  value: string;
  change: number;
  isIncrease: boolean;
}

interface TrafficSource {
  name: string;
  value: number;
  visits: string;
}

interface TopPage {
  page: string;
  views: string;
  visitors: string;
  bounceRate: string;
  avgTime: string;
}

interface HistoricalData {
  mainMetrics: MainMetric[];
  trafficSources: TrafficSource[];
  topPages: TopPage[];
}

interface HistoricalDataMap {
  [key: string]: HistoricalData;
}

interface ChartDataMap {
  [key: number]: {
    [key: string]: number[];
  };
}

const historicalData: HistoricalDataMap = {
  "7days": {
    mainMetrics: [
      {
        id: 1,
        title: "Traffic Pengunjung",
        value: "45.8K",
        change: 12.5,
        isIncrease: true,
      },
      {
        id: 2,
        title: "Tingkat Konversi",
        value: "3.8%",
        change: 2.1,
        isIncrease: true,
      },
      {
        id: 3,
        title: "Click-Through Rate",
        value: "5.2%",
        change: -0.8,
        isIncrease: false,
      },
      {
        id: 4,
        title: "Waktu Rata-rata",
        value: "4:32",
        change: 0.5,
        isIncrease: true,
      },
    ],
    trafficSources: [
      { name: "Organic Search", value: 45, visits: "20,580" },
      { name: "Direct Traffic", value: 25, visits: "11,450" },
      { name: "Social Media", value: 15, visits: "6,870" },
      { name: "Referral", value: 10, visits: "4,580" },
      { name: "Email", value: 5, visits: "2,290" },
    ],
    topPages: [
      {
        page: "/beranda",
        views: "12,450",
        visitors: "8,920",
        bounceRate: "32%",
        avgTime: "4:20",
      },
      {
        page: "/produk",
        views: "8,760",
        visitors: "5,430",
        bounceRate: "45%",
        avgTime: "3:15",
      },
      {
        page: "/blog",
        views: "6,890",
        visitors: "4,210",
        bounceRate: "38%",
        avgTime: "5:10",
      },
      {
        page: "/tentang",
        views: "4,320",
        visitors: "2,980",
        bounceRate: "52%",
        avgTime: "2:45",
      },
      {
        page: "/kontak",
        views: "3,150",
        visitors: "1,890",
        bounceRate: "65%",
        avgTime: "1:30",
      },
    ],
  },
  "30days": {
    mainMetrics: [
      {
        id: 1,
        title: "Traffic Pengunjung",
        value: "189.2K",
        change: 8.3,
        isIncrease: true,
      },
      {
        id: 2,
        title: "Tingkat Konversi",
        value: "3.5%",
        change: 1.2,
        isIncrease: true,
      },
      {
        id: 3,
        title: "Click-Through Rate",
        value: "4.9%",
        change: -1.2,
        isIncrease: false,
      },
      {
        id: 4,
        title: "Waktu Rata-rata",
        value: "4:15",
        change: 1.2,
        isIncrease: true,
      },
    ],
    trafficSources: [
      { name: "Organic Search", value: 42, visits: "79,464" },
      { name: "Direct Traffic", value: 28, visits: "52,976" },
      { name: "Social Media", value: 17, visits: "32,164" },
      { name: "Referral", value: 8, visits: "15,136" },
      { name: "Email", value: 5, visits: "9,460" },
    ],
    topPages: [
      {
        page: "/beranda",
        views: "48,920",
        visitors: "35,210",
        bounceRate: "34%",
        avgTime: "4:15",
      },
      {
        page: "/produk",
        views: "36,450",
        visitors: "22,890",
        bounceRate: "47%",
        avgTime: "3:25",
      },
      {
        page: "/blog",
        views: "28,760",
        visitors: "17,430",
        bounceRate: "41%",
        avgTime: "5:05",
      },
      {
        page: "/tentang",
        views: "18,320",
        visitors: "12,540",
        bounceRate: "54%",
        avgTime: "2:50",
      },
      {
        page: "/kontak",
        views: "12,890",
        visitors: "7,890",
        bounceRate: "68%",
        avgTime: "1:45",
      },
    ],
  },
  "90days": {
    mainMetrics: [
      {
        id: 1,
        title: "Traffic Pengunjung",
        value: "598.7K",
        change: 15.2,
        isIncrease: true,
      },
      {
        id: 2,
        title: "Tingkat Konversi",
        value: "3.2%",
        change: 0.8,
        isIncrease: true,
      },
      {
        id: 3,
        title: "Click-Through Rate",
        value: "4.7%",
        change: -0.5,
        isIncrease: false,
      },
      {
        id: 4,
        title: "Waktu Rata-rata",
        value: "4:08",
        change: 0.8,
        isIncrease: true,
      },
    ],
    trafficSources: [
      { name: "Organic Search", value: 40, visits: "239,480" },
      { name: "Direct Traffic", value: 30, visits: "179,610" },
      { name: "Social Media", value: 17, visits: "107,766" },
      { name: "Referral", value: 8, visits: "41,909" },
      { name: "Email", value: 5, visits: "29,935" },
    ],
    topPages: [
      {
        page: "/beranda",
        views: "156,890",
        visitors: "112,450",
        bounceRate: "35%",
        avgTime: "4:10",
      },
      {
        page: "/produk",
        views: "112,340",
        visitors: "71,230",
        bounceRate: "48%",
        avgTime: "3:35",
      },
      {
        page: "/blog",
        views: "89,560",
        visitors: "54,780",
        bounceRate: "42%",
        avgTime: "5:00",
      },
      {
        page: "/tentang",
        views: "58,920",
        visitors: "40,120",
        bounceRate: "55%",
        avgTime: "2:55",
      },
      {
        page: "/kontak",
        views: "42,180",
        visitors: "25,890",
        bounceRate: "70%",
        avgTime: "2:00",
      },
    ],
  },
  "1year": {
    mainMetrics: [
      {
        id: 1,
        title: "Traffic Pengunjung",
        value: "2.45M",
        change: 22.4,
        isIncrease: true,
      },
      {
        id: 2,
        title: "Tingkat Konversi",
        value: "2.9%",
        change: 1.5,
        isIncrease: true,
      },
      {
        id: 3,
        title: "Click-Through Rate",
        value: "4.5%",
        change: 0.3,
        isIncrease: true,
      },
      {
        id: 4,
        title: "Waktu Rata-rata",
        value: "3:52",
        change: 1.8,
        isIncrease: true,
      },
    ],
    trafficSources: [
      { name: "Organic Search", value: 38, visits: "931,000" },
      { name: "Direct Traffic", value: 32, visits: "784,000" },
      { name: "Social Media", value: 20, visits: "490,000" },
      { name: "Referral", value: 6, visits: "147,000" },
      { name: "Email", value: 4, visits: "98,000" },
    ],
    topPages: [
      {
        page: "/beranda",
        views: "645,230",
        visitors: "462,890",
        bounceRate: "36%",
        avgTime: "4:05",
      },
      {
        page: "/produk",
        views: "456,780",
        visitors: "289,450",
        bounceRate: "49%",
        avgTime: "3:45",
      },
      {
        page: "/blog",
        views: "365,890",
        visitors: "223,560",
        bounceRate: "43%",
        avgTime: "4:55",
      },
      {
        page: "/tentang",
        views: "245,670",
        visitors: "167,890",
        bounceRate: "56%",
        avgTime: "3:05",
      },
      {
        page: "/kontak",
        views: "178,900",
        visitors: "109,780",
        bounceRate: "72%",
        avgTime: "2:15",
      },
    ],
  },
};

const chartDataByMetric: ChartDataMap = {
  1: {
    "7days": [30, 40, 35, 50, 49, 60, 70],
    "30days": [
      150, 165, 158, 172, 180, 175, 189, 185, 190, 192, 188, 195, 200, 198, 196,
      202, 205, 210, 208, 212, 215, 218, 220, 222, 225, 227, 230, 228, 232, 235,
    ],
    "90days": [
      400, 420, 410, 430, 440, 435, 445, 450, 455, 460, 458, 465, 470, 475, 480,
      485, 490, 495, 500, 505, 510, 515, 520, 525, 530, 535, 540, 545, 550, 555,
      560, 565, 570, 575, 580, 585, 590, 592, 595, 598,
    ],
    "1year": [
      1200, 1250, 1300, 1350, 1400, 1450, 1500, 1550, 1600, 1650, 1700, 1750,
      1800, 1850, 1900, 1950, 2000, 2050, 2100, 2150, 2200, 2250, 2300, 2350,
      2400, 2450,
    ],
  },
  2: {
    "7days": [2.5, 2.8, 3.0, 3.2, 3.5, 3.6, 3.8],
    "30days": [
      2.8, 2.9, 3.0, 3.1, 3.2, 3.1, 3.3, 3.4, 3.3, 3.5, 3.4, 3.6, 3.5, 3.7, 3.6,
      3.8, 3.7, 3.9, 3.8, 4.0, 3.9, 4.1, 4.0, 4.2, 4.1, 4.3, 4.2, 4.4, 4.3, 4.5,
    ],
    "90days": [
      3.0, 3.1, 3.2, 3.3, 3.2, 3.4, 3.3, 3.5, 3.4, 3.6, 3.5, 3.7, 3.6, 3.8, 3.7,
      3.9, 3.8, 4.0, 3.9, 4.1, 4.0, 4.2, 4.1, 4.3, 4.2, 4.4, 4.3, 4.5, 4.4, 4.6,
      4.5, 4.7, 4.6, 4.8, 4.7, 4.9, 5.0, 4.9, 5.1, 5.0,
    ],
    "1year": [
      2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2, 3.1, 3.3, 3.2, 3.4, 3.3, 3.5, 3.4,
      3.6, 3.5, 3.7, 3.6, 3.8, 3.7, 3.9, 3.8, 4.0, 3.9, 4.1,
    ],
  },
  3: {
    "7days": [5.8, 5.5, 5.3, 5.1, 5.0, 5.1, 5.2],
    "30days": [
      5.5, 5.4, 5.3, 5.2, 5.1, 5.0, 5.1, 5.0, 4.9, 4.8, 4.9, 4.8, 4.9, 4.8, 4.9,
      5.0, 5.1, 5.0, 5.1, 5.2, 5.1, 5.2, 5.1, 5.2, 5.1, 5.2, 5.1, 5.2, 5.1, 5.0,
    ],
    "90days": [
      5.0, 5.1, 5.0, 4.9, 4.8, 4.9, 4.8, 4.9, 5.0, 4.9, 5.0, 4.9, 5.0, 5.1, 5.0,
      5.1, 5.2, 5.1, 5.2, 5.1, 5.2, 5.3, 5.2, 5.3, 5.2, 5.3, 5.2, 5.3, 5.4, 5.3,
      5.4, 5.3, 5.4, 5.5, 5.4, 5.5, 5.4, 5.5, 5.4, 5.3,
    ],
    "1year": [
      4.2, 4.3, 4.4, 4.3, 4.4, 4.5, 4.4, 4.5, 4.6, 4.5, 4.6, 4.7, 4.6, 4.7, 4.8,
      4.7, 4.8, 4.9, 4.8, 4.9, 5.0, 4.9, 5.0, 5.1, 5.0, 5.1,
    ],
  },
  4: {
    "7days": [3.8, 4.0, 4.1, 4.2, 4.3, 4.4, 4.5],
    "30days": [
      3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.1, 4.0, 4.1, 4.2, 4.1, 4.2, 4.3, 4.2, 4.3,
      4.4, 4.3, 4.4, 4.5, 4.4, 4.5, 4.6, 4.5, 4.6, 4.7, 4.6, 4.7, 4.8, 4.7, 4.6,
    ],
    "90days": [
      3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.1, 4.0, 4.1, 4.2, 4.1, 4.2,
      4.3, 4.2, 4.3, 4.4, 4.3, 4.4, 4.5, 4.4, 4.5, 4.6, 4.5, 4.6, 4.7, 4.6, 4.7,
      4.8, 4.7, 4.8, 4.9, 4.8, 4.9, 5.0, 4.9, 5.0, 4.9,
    ],
    "1year": [
      2.8, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.1, 4.0,
      4.1, 4.2, 4.1, 4.2, 4.3, 4.2, 4.3, 4.4, 4.3, 4.4, 4.3,
    ],
  },
};

interface TimeRangeLabels {
  [key: string]: string;
}

const timeRangeLabels: TimeRangeLabels = {
  "7days": "7 hari terakhir",
  "30days": "30 hari terakhir",
  "90days": "90 hari terakhir",
  "1year": "1 tahun terakhir",
};

interface MetricMap {
  [key: string]: string[];
}

const metricMap: MetricMap = {
  traffic: ["Traffic Pengunjung"],
  conversion: ["Tingkat Konversi"],
  engagement: ["Click-Through Rate", "Waktu Rata-rata"],
};

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState<string>("7days");
  const [metricType, setMetricType] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAllPages, setShowAllPages] = useState<boolean>(false);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  const filterMetricsByType = (metrics: MainMetric[]) => {
    if (metricType === "all") return metrics;

    return metrics.filter((metric) =>
      metricMap[metricType]?.includes(metric.title)
    );
  };

  const handleTimeRangeChange = (value: string) => {
    setIsLoading(true);
    setTimeRange(value);

    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const handleMetricTypeChange = (value: string) => {
    setIsLoading(true);
    setMetricType(value);

    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  };

  const currentData = useMemo(() => historicalData[timeRange], [timeRange]);

  const filteredMetrics = useMemo(
    () => filterMetricsByType(currentData.mainMetrics),
    [currentData.mainMetrics, metricType]
  );

  const [animatedChartData, setAnimatedChartData] = useState<{
    [key: number]: number[];
  }>({});

  useEffect(() => {
    const chartData: { [key: number]: number[] } = {};
    filteredMetrics.forEach((metric: MainMetric) => {
      const metricChartData = chartDataByMetric[metric.id];
      if (metricChartData) {
        chartData[metric.id] = metricChartData[timeRange] || [];
      }
    });
    setAnimatedChartData(chartData);
  }, [filteredMetrics, timeRange]);
  const handleExport = () => {
    const exportData = {
      timeRange,
      metricType,
      data: currentData,
      timestamp: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `analytics-${timeRange}-${new Date().getTime()}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const getGridClass = (): string => {
    const count = filteredMetrics.length;
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-1 sm:grid-cols-2";
    if (count === 3) return "grid-cols-1 sm:grid-cols-3";
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
  };

  const getBounceRateNumber = (bounceRate: string): number => {
    return parseFloat(bounceRate.replace("%", "")) || 0;
  };

  interface IconMap {
    [key: number]: JSX.Element;
  }

  interface ColorSet {
    icon: string;
    bg: string;
  }

  const handleViewAllPages = () => {
    setShowAllPages(true);
  };

  const handleBackToDashboard = () => {
    setShowAllPages(false);
  };

  if (showAllPages) {
    return (
      <AllPagesAnalytics onBack={handleBackToDashboard} timeRange={timeRange} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center min-w-0 flex-1">
            <BarChart3 className="mr-2 flex-shrink-0" size={20} />
            <div className="min-w-0 flex-1">
              <h1 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white truncate">
                Analisis Performa
              </h1>
            </div>
          </div>

          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex-shrink-0 ml-1"
            aria-label="Toggle filters"
          >
            {showMobileFilters ? <X size={16} /> : <Filter size={16} />}
          </button>
        </div>

        <div className="px-4 pb-3">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Filter:</span>
          </div>

          <div
            className={`lg:hidden ${showMobileFilters ? "block" : "hidden"}`}
          >
            <div className="space-y-2">
              <div className="space-y-1">
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1.5 rounded text-xs">
                  <Calendar size={12} className="flex-shrink-0 mr-1.5" />
                  <select
                    className="bg-transparent focus:outline-none cursor-pointer w-full text-xs"
                    value={timeRange}
                    onChange={(e) => handleTimeRangeChange(e.target.value)}
                    disabled={isLoading}
                  >
                    <option value="7days">7 Hari</option>
                    <option value="30days">30 Hari</option>
                    <option value="90days">90 Hari</option>
                    <option value="1year">1 Tahun</option>
                  </select>
                </div>

                <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1.5 rounded text-xs">
                  <Filter size={12} className="flex-shrink-0 mr-1.5" />
                  <select
                    className="bg-transparent focus:outline-none cursor-pointer w-full text-xs"
                    value={metricType}
                    onChange={(e) => handleMetricTypeChange(e.target.value)}
                    disabled={isLoading}
                  >
                    <option value="all">Semua</option>
                    <option value="traffic">Traffic</option>
                    <option value="conversion">Konversi</option>
                    <option value="engagement">Engagement</option>
                  </select>
                </div>
              </div>

              <button
                className="w-full flex items-center justify-center space-x-1 px-2 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs"
                onClick={handleExport}
                disabled={isLoading}
              >
                <Download size={12} />
                <span>{isLoading ? "Loading..." : "Export Data"}</span>
              </button>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-3 mt-2">
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
              <Calendar size={16} />
              <select
                className="bg-transparent text-sm focus:outline-none cursor-pointer min-w-[140px]"
                value={timeRange}
                onChange={(e) => handleTimeRangeChange(e.target.value)}
                disabled={isLoading}
              >
                <option value="7days">7 Hari Terakhir</option>
                <option value="30days">30 Hari Terakhir</option>
                <option value="90days">90 Hari Terakhir</option>
                <option value="1year">1 Tahun Terakhir</option>
              </select>
            </div>

            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
              <Filter size={16} />
              <select
                className="bg-transparent text-sm focus:outline-none cursor-pointer min-w-[120px]"
                value={metricType}
                onChange={(e) => handleMetricTypeChange(e.target.value)}
                disabled={isLoading}
              >
                <option value="all">Semua Metrik</option>
                <option value="traffic">Traffic</option>
                <option value="conversion">Konversi</option>
                <option value="engagement">Engagement</option>
              </select>
            </div>

            <button
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              onClick={handleExport}
              disabled={isLoading}
            >
              <Download size={16} />
              <span>{isLoading ? "Loading..." : "Export"}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-3 md:p-4 lg:p-5">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div
              className={`grid ${getGridClass()} gap-1.5 sm:gap-3 md:gap-4 mb-4 md:mb-5`}
            >
              {filteredMetrics.map((metric: MainMetric) => {
                const colors = [
                  {
                    icon: "text-blue-500",
                    bg: "bg-blue-50 dark:bg-blue-900/20",
                  },
                  {
                    icon: "text-green-500",
                    bg: "bg-green-50 dark:bg-green-900/20",
                  },
                  {
                    icon: "text-purple-500",
                    bg: "bg-purple-50 dark:bg-purple-900/20",
                  },
                  {
                    icon: "text-orange-500",
                    bg: "bg-orange-50 dark:bg-orange-900/20",
                  },
                ];

                const metricColor = colors[metric.id - 1] || colors[0];

                const getMetricIcon = (id: number, color: string) => {
                  switch (id) {
                    case 1:
                      return <Users className={color} size={14} />;
                    case 2:
                      return <TrendingUp className={color} size={14} />;
                    case 3:
                      return <MousePointerClick className={color} size={14} />;
                    case 4:
                      return <Clock className={color} size={14} />;
                    default:
                      return <BarChart3 className={color} size={14} />;
                  }
                };

                const chartData = animatedChartData[metric.id];
                const maxValue =
                  chartData && chartData.length > 0
                    ? Math.max(...chartData)
                    : 100;

                return (
                  <div
                    key={metric.id}
                    className={`${metricColor.bg} rounded-lg p-2 sm:p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-sm sm:hover:shadow-md`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-1 mb-0.5">
                          {getMetricIcon(metric.id, metricColor.icon)}
                          <span className="text-[10px] sm:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                            {metric.title}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
                          {metric.value}
                        </h3>
                      </div>

                      <div
                        className={`
                        flex items-center px-1.5 py-0.5 rounded-full text-[10px] transition-all flex-shrink-0 ml-1
                        ${
                          metric.isIncrease
                            ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                            : "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                        }
                      `}
                      >
                        {metric.isIncrease ? "+" : ""}
                        {metric.change}%
                      </div>
                    </div>

                    {chartData && (
                      <div className="mt-1 sm:mt-3 flex items-end h-6 sm:h-10 overflow-hidden">
                        {chartData
                          .slice(0, 10)
                          .map((value: number, index: number) => (
                            <div
                              key={index}
                              className="flex-1 mx-[0.5px] sm:mx-0.5 bg-gradient-to-t from-current to-transparent opacity-40 rounded-t transition-all duration-500 ease-out"
                              style={{
                                height: `${(value / maxValue) * 60}%`,
                                color: metric.isIncrease
                                  ? "#10b981"
                                  : "#ef4444",
                              }}
                            />
                          ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4 md:mb-5">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white">
                    Sumber Traffic
                  </h2>
                  <span className="text-[10px] sm:text-sm text-gray-500 dark:text-gray-400">
                    {timeRangeLabels[timeRange] || ""}
                  </span>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  {currentData.trafficSources.map(
                    (source: TrafficSource, index: number) => {
                      const colors = [
                        "bg-blue-500",
                        "bg-green-500",
                        "bg-purple-500",
                        "bg-orange-500",
                        "bg-pink-500",
                      ];
                      return (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1.5 min-w-0 flex-1">
                              <div
                                className={`w-1.5 h-1.5 rounded-full ${
                                  colors[index] || "bg-gray-500"
                                } flex-shrink-0`}
                              ></div>
                              <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                                {source.name}
                              </span>
                            </div>
                            <div className="text-[10px] sm:text-sm text-gray-600 dark:text-gray-400 flex-shrink-0 ml-1">
                              {source.visits}
                            </div>
                          </div>

                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                                colors[index] || "bg-gray-500"
                              }`}
                              style={{ width: `${source.value}%` }}
                            ></div>
                          </div>

                          <div className="text-right text-[10px] sm:text-sm text-gray-500 dark:text-gray-400">
                            {source.value}% dari total traffic
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4">
                <h2 className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Demografi Pengguna
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Perangkat
                    </h3>
                    <div className="space-y-3">
                      {[
                        {
                          device: "Mobile",
                          percentage: timeRange === "1year" ? 62 : 58,
                          color: "bg-blue-500",
                        },
                        {
                          device: "Desktop",
                          percentage: timeRange === "1year" ? 33 : 37,
                          color: "bg-green-500",
                        },
                        {
                          device: "Tablet",
                          percentage: timeRange === "1year" ? 5 : 5,
                          color: "bg-purple-500",
                        },
                      ].map((item, index: number) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                {item.device}
                              </span>
                            </div>
                            <span className="text-sm font-medium">
                              {item.percentage}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-full rounded-full transition-all duration-1000 ease-out ${item.color}`}
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Lokasi Top
                    </h3>
                    <div className="space-y-3">
                      {[
                        {
                          country: "Indonesia",
                          percentage: timeRange === "1year" ? 48 : 45,
                          visitors:
                            timeRange === "1year" ? "1,176,000" : "20,610",
                          color: "bg-blue-600",
                        },
                        {
                          country: "Malaysia",
                          percentage: timeRange === "1year" ? 15 : 18,
                          visitors: timeRange === "1year" ? "367,500" : "8,244",
                          color: "bg-green-600",
                        },
                        {
                          country: "Singapore",
                          percentage: timeRange === "1year" ? 10 : 12,
                          visitors: timeRange === "1year" ? "245,000" : "5,496",
                          color: "bg-purple-600",
                        },
                        {
                          country: "Thailand",
                          percentage: timeRange === "1year" ? 7 : 8,
                          visitors: timeRange === "1year" ? "171,500" : "3,664",
                          color: "bg-yellow-600",
                        },
                        {
                          country: "Lainnya",
                          percentage: timeRange === "1year" ? 20 : 17,
                          visitors: timeRange === "1year" ? "490,000" : "7,786",
                          color: "bg-gray-600",
                        },
                      ].map((item, index: number) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div>
                                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  {item.country}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  {item.visitors} pengunjung
                                </div>
                              </div>
                            </div>
                            <span className="text-sm font-medium">
                              {item.percentage}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-full rounded-full transition-all duration-1000 ease-out ${item.color}`}
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-4 md:mb-5">
              <div className="p-3 sm:px-4 sm:py-3 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white">
                  Halaman Terpopuler
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                  View & engagement • {timeRangeLabels[timeRange] || ""}
                </p>
              </div>

              <div className="sm:hidden divide-y divide-gray-200 dark:divide-gray-700">
                {currentData.topPages.map((page: TopPage, index: number) => (
                  <div key={index} className="p-3">
                    <div className="flex items-start mb-1">
                      <div className="w-5 h-5 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center mr-1.5 flex-shrink-0">
                        <span className="text-blue-600 dark:text-blue-400 font-bold text-[10px]">
                          /
                        </span>
                      </div>
                      <code className="font-mono text-xs text-gray-800 dark:text-gray-300 truncate">
                        {page.page}
                      </code>
                    </div>

                    <div className="grid grid-cols-2 gap-1 text-[10px]">
                      <div>
                        <div className="text-gray-500 dark:text-gray-400">
                          Views
                        </div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {page.views}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 dark:text-gray-400">
                          Pengunjung
                        </div>
                        <div className="text-gray-700 dark:text-gray-300">
                          {page.visitors}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 dark:text-gray-400">
                          Bounce Rate
                        </div>
                        <div
                          className={`
                          inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px]
                          ${
                            getBounceRateNumber(page.bounceRate) > 50
                              ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                              : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                          }
                        `}
                        >
                          {page.bounceRate}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 dark:text-gray-400">
                          Waktu
                        </div>
                        <div className="text-gray-700 dark:text-gray-300">
                          {page.avgTime}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hidden sm:block overflow-x-auto">
                <div className="min-w-[600px]">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-900/50">
                        <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                          Halaman
                        </th>
                        <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                          Views
                        </th>
                        <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                          Pengunjung
                        </th>
                        <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                          Bounce Rate
                        </th>
                        <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                          Waktu
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {currentData.topPages.map(
                        (page: TopPage, index: number) => (
                          <tr
                            key={index}
                            className="hover:bg-gray-50 dark:hover:bg-gray-900/30"
                          >
                            <td className="py-2 px-3">
                              <div className="flex items-center">
                                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center mr-2">
                                  <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">
                                    /
                                  </span>
                                </div>
                                <code className="font-mono text-xs text-gray-800 dark:text-gray-300 truncate">
                                  {page.page}
                                </code>
                              </div>
                            </td>
                            <td className="py-2 px-3">
                              <div className="font-medium text-gray-900 dark:text-white text-sm">
                                {page.views}
                              </div>
                            </td>
                            <td className="py-2 px-3">
                              <div className="text-gray-700 dark:text-gray-300 text-sm">
                                {page.visitors}
                              </div>
                            </td>
                            <td className="py-2 px-3">
                              <div
                                className={`
                              inline-flex items-center px-2 py-0.5 rounded-full text-xs
                              ${
                                getBounceRateNumber(page.bounceRate) > 50
                                  ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                                  : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                              }
                            `}
                              >
                                {page.bounceRate}
                              </div>
                            </td>
                            <td className="py-2 px-3">
                              <div className="text-gray-700 dark:text-gray-300 text-sm">
                                {page.avgTime}
                              </div>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-3 sm:px-4 sm:py-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    5 dari 128 halaman
                  </div>
                  <button
                    onClick={handleViewAllPages}
                    className="flex items-center justify-center space-x-1 text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 py-0.5"
                  >
                    <span>Lihat Semua</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:hidden">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800 text-center">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-1 text-xs sm:text-sm">
                  Insight {timeRangeLabels[timeRange] || ""}
                </h3>
                <p className="text-xs text-blue-700 dark:text-blue-400">
                  {timeRange === "7days"
                    ? "Traffic social media naik 25%. Fokus Instagram & TikTok."
                    : timeRange === "30days"
                    ? "Konversi naik 15%. Optimasi CTA & landing page."
                    : timeRange === "90days"
                    ? "Mobile user meningkat. Optimalkan UX mobile."
                    : "Pertumbuhan 22.4%. Fokus content marketing & SEO."}
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800 text-center">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-1 text-xs sm:text-sm">
                  Rekomendasi
                </h3>
                <p className="text-xs text-green-700 dark:text-green-400">
                  {timeRange === "7days"
                    ? "Kurangi bounce rate /produk. Tambah testimoni & demo."
                    : timeRange === "30days"
                    ? "Tingkatkan engagement. A/B test CTA."
                    : timeRange === "90days"
                    ? "Implementasi AMP. Optimasi images."
                    : "Expand internasional. Optimasi multi-language."}
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-3 border border-purple-200 dark:border-purple-800 text-center">
                <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-1 text-xs sm:text-sm">
                  Trend
                </h3>
                <p className="text-xs text-purple-700 dark:text-purple-400">
                  {timeRange === "7days"
                    ? "Organic +12.5%. Pertahankan SEO on-page."
                    : timeRange === "30days"
                    ? "Direct +28%. Brand awareness kuat."
                    : timeRange === "90days"
                    ? "Video engagement +40%. Fokus video marketing."
                    : "Mobile-first impact positif. Prioritas mobile."}
                </p>
              </div>
            </div>

            <div className="hidden md:grid lg:hidden md:grid-cols-3 md:gap-4 mt-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800 flex flex-col">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 text-base">
                  Insight {timeRangeLabels[timeRange] || ""}
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-400 leading-relaxed flex-1">
                  {timeRange === "7days"
                    ? "Traffic social media naik 25%. Fokus Instagram & TikTok."
                    : timeRange === "30days"
                    ? "Konversi naik 15%. Optimasi CTA & landing page."
                    : timeRange === "90days"
                    ? "Mobile user meningkat. Optimalkan UX mobile."
                    : "Pertumbuhan 22.4%. Fokus content marketing & SEO."}
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800 flex flex-col">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2 text-base">
                  Rekomendasi
                </h3>
                <p className="text-sm text-green-700 dark:text-green-400 leading-relaxed flex-1">
                  {timeRange === "7days"
                    ? "Kurangi bounce rate /produk. Tambah testimoni & demo."
                    : timeRange === "30days"
                    ? "Tingkatkan engagement. A/B test CTA."
                    : timeRange === "90days"
                    ? "Implementasi AMP. Optimasi images."
                    : "Expand internasional. Optimasi multi-language."}
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800 flex flex-col">
                <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2 text-base">
                  Trend
                </h3>
                <p className="text-sm text-purple-700 dark:text-purple-400 leading-relaxed flex-1">
                  {timeRange === "7days"
                    ? "Organic +12.5%. Pertahankan SEO on-page."
                    : timeRange === "30days"
                    ? "Direct +28%. Brand awareness kuat."
                    : timeRange === "90days"
                    ? "Video engagement +40%. Fokus video marketing."
                    : "Mobile-first impact positif. Prioritas mobile."}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPage;
