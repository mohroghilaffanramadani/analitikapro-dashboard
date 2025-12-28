import React, { useState, useEffect, useMemo } from "react";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Download,
  Filter,
  Calendar,
  CreditCard,
  Wallet,
  Repeat,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Eye,
  FileText,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Transaction {
  id: string;
  invoice: string;
  customer: string;
  date: string; 
  amount: number;
  status: "Sukses" | "Pending" | "Gagal" | "Dibatalkan";
  method: "Credit Card" | "Transfer Bank" | "E-Wallet" | "Cash";
  product: string;
  category: string;
  timestamp: string; 
}

interface RevenueStats {
  totalRevenue: number;
  monthlyGrowth: number;
  avgTransaction: number;
  totalTransactions: number;
  successRate: number;
  refundAmount: number;
  comparisonData: {
    previousPeriod: number;
    growthPercentage: number;
  };
}

const RevenuePage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<RevenueStats>({
    totalRevenue: 0,
    monthlyGrowth: 0,
    avgTransaction: 0,
    totalTransactions: 0,
    successRate: 0,
    refundAmount: 0,
    comparisonData: {
      previousPeriod: 0,
      growthPercentage: 0,
    },
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedMethod, setSelectedMethod] = useState<string>("all");
  const [timeRange, setTimeRange] = useState<string>("month");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const itemsPerPage = 6;

  const getDateRange = (
    range: string
  ): {
    startDate: Date;
    endDate: Date;
    previousStart: Date;
    previousEnd: Date;
  } => {
    const now = new Date();
    let startDate = new Date();
    let endDate = new Date();
    let previousStart = new Date();
    let previousEnd = new Date();

    switch (range) {
      case "today":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        endDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          23,
          59,
          59
        );
        previousStart = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 1
        );
        previousEnd = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 1,
          23,
          59,
          59
        );
        break;

      case "week":
        const dayOfWeek = now.getDay();
        const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        startDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() + diffToMonday
        );
        endDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() + diffToMonday + 6,
          23,
          59,
          59
        );
        previousStart = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate() - 7
        );
        previousEnd = new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate() - 7,
          23,
          59,
          59
        );
        break;

      case "month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          0,
          23,
          59,
          59
        );
        previousStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        previousEnd = new Date(
          now.getFullYear(),
          now.getMonth(),
          0,
          23,
          59,
          59
        );
        break;

      case "quarter":
        const quarter = Math.floor(now.getMonth() / 3);
        const quarterStartMonth = quarter * 3;
        startDate = new Date(now.getFullYear(), quarterStartMonth, 1);
        endDate = new Date(
          now.getFullYear(),
          quarterStartMonth + 3,
          0,
          23,
          59,
          59
        );
        previousStart = new Date(now.getFullYear(), quarterStartMonth - 3, 1);
        previousEnd = new Date(
          now.getFullYear(),
          quarterStartMonth,
          0,
          23,
          59,
          59
        );
        break;

      case "year":
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
        previousStart = new Date(now.getFullYear() - 1, 0, 1);
        previousEnd = new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59);
        break;

      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          0,
          23,
          59,
          59
        );
        previousStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        previousEnd = new Date(
          now.getFullYear(),
          now.getMonth(),
          0,
          23,
          59,
          59
        );
    }

    return { startDate, endDate, previousStart, previousEnd };
  };

  useEffect(() => {
    const generateDummyTransactions = (): Transaction[] => {
      const customers = [
        "Budi Santoso",
        "Sari Dewi",
        "Agus Wijaya",
        "Rina Melati",
        "Fajar Nugroho",
        "Maya Indah",
        "Dian Prasetyo",
        "Anita Sari",
        "Rizki Maulana",
        "Citra Ayu",
      ];

      const products = [
        "Paket Premium",
        "Paket Business",
        "Paket Enterprise",
        "Add-on Storage",
        "Custom Domain",
        "Priority Support",
        "API Access",
        "White Label",
      ];

      const categories = ["Subscription", "One-time", "Add-on", "Service"];
      const methods: Transaction["method"][] = [
        "Credit Card",
        "Transfer Bank",
        "E-Wallet",
        "Cash",
      ];
      const statuses: Transaction["status"][] = [
        "Sukses",
        "Pending",
        "Gagal",
        "Dibatalkan",
      ];

      const transactions: Transaction[] = [];
      const now = new Date();

      for (let i = 0; i < 100; i++) {
        const daysAgo = Math.floor(Math.random() * 90); 
        const transactionDate = new Date();
        transactionDate.setDate(now.getDate() - daysAgo);

        const amount = Math.floor(Math.random() * 5000000) + 100000;
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const method = methods[Math.floor(Math.random() * methods.length)];

        const year = transactionDate.getFullYear();
        const month = String(transactionDate.getMonth() + 1).padStart(2, "0");
        const day = String(transactionDate.getDate()).padStart(2, "0");

        transactions.push({
          id: `TRX${String(i + 1).padStart(4, "0")}`,
          invoice: `INV-${year}-${String(
            Math.floor(Math.random() * 1000) + 1
          ).padStart(4, "0")}`,
          customer: customers[Math.floor(Math.random() * customers.length)],
          date: `${year}-${month}-${day}`,
          amount: amount,
          status: status,
          method: method,
          product: products[Math.floor(Math.random() * products.length)],
          category: categories[Math.floor(Math.random() * categories.length)],
          timestamp: transactionDate.toISOString(),
        });
      }

      return transactions.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    };

    setLoading(true);
    setTimeout(() => {
      const dummyTransactions = generateDummyTransactions();
      setTransactions(dummyTransactions);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let result = [...transactions];

    const { startDate, endDate } = getDateRange(timeRange);
    result = result.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });

    if (searchQuery) {
      result = result.filter(
        (transaction) =>
          transaction.customer
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          transaction.invoice
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          transaction.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedStatus !== "all") {
      result = result.filter(
        (transaction) => transaction.status === selectedStatus
      );
    }

    if (selectedMethod !== "all") {
      result = result.filter(
        (transaction) => transaction.method === selectedMethod
      );
    }

    setFilteredTransactions(result);
    setCurrentPage(1);

    calculateStats(result);
  }, [searchQuery, selectedStatus, selectedMethod, timeRange, transactions]);

  const calculateStats = (transactionsData: Transaction[]) => {
    const successfulTransactions = transactionsData.filter(
      (t) => t.status === "Sukses"
    );
    const totalRevenue = successfulTransactions.reduce(
      (sum, t) => sum + t.amount,
      0
    );
    const totalTransactions = transactionsData.length;
    const successfulCount = successfulTransactions.length;
    const successRate =
      totalTransactions > 0 ? (successfulCount / totalTransactions) * 100 : 0;
    const avgTransaction =
      successfulCount > 0 ? totalRevenue / successfulCount : 0;
    const refundAmount = transactionsData
      .filter((t) => t.status === "Dibatalkan")
      .reduce((sum, t) => sum + t.amount * 0.3, 0);

    const { previousStart, previousEnd } = getDateRange(timeRange);
    const previousPeriodTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= previousStart && transactionDate <= previousEnd;
    });

    const previousSuccessfulTransactions = previousPeriodTransactions.filter(
      (t) => t.status === "Sukses"
    );
    const previousRevenue = previousSuccessfulTransactions.reduce(
      (sum, t) => sum + t.amount,
      0
    );

    let growthPercentage = 0;
    if (previousRevenue > 0) {
      growthPercentage =
        ((totalRevenue - previousRevenue) / previousRevenue) * 100;
    } else if (totalRevenue > 0) {
      growthPercentage = 100;
    }

    setStats({
      totalRevenue,
      monthlyGrowth: growthPercentage,
      avgTransaction,
      totalTransactions,
      successRate,
      refundAmount,
      comparisonData: {
        previousPeriod: previousRevenue,
        growthPercentage,
      },
    });
  };

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumberCompact = (num: number) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + "M";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "JT";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const StatusBadge = ({ status }: { status: Transaction["status"] }) => {
    const getStatusConfig = (status: Transaction["status"]) => {
      switch (status) {
        case "Sukses":
          return {
            bg: "bg-green-100 dark:bg-green-900/30",
            text: "text-green-800 dark:text-green-300",
            icon: <CheckCircle size={12} />,
          };
        case "Pending":
          return {
            bg: "bg-yellow-100 dark:bg-yellow-900/30",
            text: "text-yellow-800 dark:text-yellow-300",
            icon: null,
          };
        case "Gagal":
          return {
            bg: "bg-red-100 dark:bg-red-900/30",
            text: "text-red-800 dark:text-red-300",
            icon: <XCircle size={12} />,
          };
        case "Dibatalkan":
          return {
            bg: "bg-gray-100 dark:bg-gray-800",
            text: "text-gray-800 dark:text-gray-300",
            icon: <XCircle size={12} />,
          };
        default:
          return { bg: "bg-gray-100", text: "text-gray-800", icon: null };
      }
    };

    const config = getStatusConfig(status);

    return (
      <div
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        {config.icon && <span className="mr-1">{config.icon}</span>}
        <span className="hidden sm:inline">{status}</span>
        <span className="sm:hidden">{status.charAt(0)}</span>
      </div>
    );
  };

  const MethodBadge = ({ method }: { method: Transaction["method"] }) => {
    const getMethodConfig = (method: Transaction["method"]) => {
      switch (method) {
        case "Credit Card":
          return {
            bg: "bg-blue-100 dark:bg-blue-900/30",
            text: "text-blue-800 dark:text-blue-300",
          };
        case "Transfer Bank":
          return {
            bg: "bg-green-100 dark:bg-green-900/30",
            text: "text-green-800 dark:text-green-300",
          };
        case "E-Wallet":
          return {
            bg: "bg-purple-100 dark:bg-purple-900/30",
            text: "text-purple-800 dark:text-purple-300",
          };
        case "Cash":
          return {
            bg: "bg-gray-100 dark:bg-gray-800",
            text: "text-gray-800 dark:text-gray-300",
          };
        default:
          return { bg: "bg-gray-100", text: "text-gray-800" };
      }
    };

    const config = getMethodConfig(method);

    return (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${config.bg} ${config.text}`}
      >
        <span className="hidden sm:inline">{method}</span>
        <span className="sm:hidden">
          {method === "Credit Card"
            ? "CC"
            : method === "Transfer Bank"
            ? "TF"
            : method === "E-Wallet"
            ? "EW"
            : "CSH"}
        </span>
      </span>
    );
  };

  const revenueByCategory = useMemo(() => {
    const categoryMap = new Map();

    filteredTransactions
      .filter((t) => t.status === "Sukses")
      .forEach((transaction) => {
        const current = categoryMap.get(transaction.category) || 0;
        categoryMap.set(transaction.category, current + transaction.amount);
      });

    const total = Array.from(categoryMap.values()).reduce(
      (sum, amount) => sum + amount,
      0
    );

    return Array.from(categoryMap.entries()).map(
      ([category, amount], index) => {
        const percentage = total > 0 ? (amount / total) * 100 : 0;
        const colors = [
          "bg-blue-500",
          "bg-green-500",
          "bg-purple-500",
          "bg-yellow-500",
          "bg-red-500",
          "bg-pink-500",
        ];

        return {
          category,
          amount,
          percentage: Math.round(percentage),
          color: colors[index % colors.length],
        };
      }
    );
  }, [filteredTransactions]);

  const revenueByMethod = useMemo(() => {
    const methodMap = new Map();

    filteredTransactions
      .filter((t) => t.status === "Sukses")
      .forEach((transaction) => {
        const current = methodMap.get(transaction.method) || 0;
        methodMap.set(transaction.method, current + transaction.amount);
      });

    const total = Array.from(methodMap.values()).reduce(
      (sum, amount) => sum + amount,
      0
    );

    return Array.from(methodMap.entries()).map(([method, amount]) => ({
      method,
      amount,
      percentage: total > 0 ? Math.round((amount / total) * 100) : 0,
    }));
  }, [filteredTransactions]);

  const getTimeRangeLabel = () => {
    switch (timeRange) {
      case "today":
        return "hari ini";
      case "week":
        return "minggu ini";
      case "month":
        return "bulan ini";
      case "quarter":
        return "kuartal ini";
      case "year":
        return "tahun ini";
      default:
        return "bulan ini";
    }
  };

  const getTimeRangeShortLabel = () => {
    switch (timeRange) {
      case "today":
        return "Hari Ini";
      case "week":
        return "Minggu Ini";
      case "month":
        return "Bulan Ini";
      case "quarter":
        return "Kuartal Ini";
      case "year":
        return "Tahun Ini";
      default:
        return "Bulan Ini";
    }
  };

  const handleExportReport = () => {
    const reportData = {
      timeRange,
      stats,
      transactions: filteredTransactions,
      generatedAt: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = `revenue-report-${timeRange}-${new Date().getTime()}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              Pendapatan
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg">
              <Calendar size={14} />
              <select
                className="bg-transparent text-xs focus:outline-none cursor-pointer pl-1"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="today">Hari Ini</option>
                <option value="week">Minggu Ini</option>
                <option value="month">Bulan Ini</option>
                <option value="quarter">Kuartal Ini</option>
                <option value="year">Tahun Ini</option>
              </select>
            </div>

            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="p-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isFilterOpen ? <X size={18} /> : <Filter size={18} />}
            </button>
          </div>
        </div>

        {isFilterOpen && (
          <div className="px-4 pb-3 border-b border-gray-200 dark:border-gray-700">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 space-y-3">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={14}
                />
                <input
                  type="text"
                  placeholder="Cari transaksi..."
                  className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                    Status
                  </label>
                  <select
                    className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="all">Semua Status</option>
                    <option value="Sukses">Sukses</option>
                    <option value="Pending">Pending</option>
                    <option value="Gagal">Gagal</option>
                    <option value="Dibatalkan">Dibatalkan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                    Metode
                  </label>
                  <select
                    className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedMethod}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                  >
                    <option value="all">Semua Metode</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Transfer Bank">Transfer Bank</option>
                    <option value="E-Wallet">E-Wallet</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                Total Pendapatan
              </div>
              <div className="font-bold text-gray-900 dark:text-white text-sm">
                {formatCurrency(stats.totalRevenue).replace("Rp", "Rp ")}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Transaksi
              </div>
              <div className="font-medium text-gray-900 dark:text-white text-sm">
                {stats.totalTransactions}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 py-4 md:px-6 md:py-6 lg:px-4 lg:py-6">
        <div className="hidden md:flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-xl lg:text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <DollarSign className="mr-3 md:mr-2" size={26} />
              Analisis Pendapatan
            </h1>
            <p className="text-sm md:text-sm lg:text-sm text-gray-600 dark:text-gray-400 mt-2 md:mt-1">
              Pantau dan kelola pendapatan bisnis Anda • Periode:{" "}
              {getTimeRangeLabel()}
            </p>
          </div>

          <div className="flex items-center space-x-3 md:space-x-2 mt-4 md:mt-0">
            <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg">
              <Calendar size={16} />
              <select
                className="bg-transparent text-sm focus:outline-none cursor-pointer"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="today">Hari Ini</option>
                <option value="week">Minggu Ini</option>
                <option value="month">Bulan Ini</option>
                <option value="quarter">Kuartal Ini</option>
                <option value="year">Tahun Ini</option>
              </select>
            </div>

            <button
              onClick={handleExportReport}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm transition-colors"
            >
              <Download size={16} />
              <span>Export Laporan</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4">

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-4 md:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm md:text-sm text-blue-600 dark:text-blue-400 font-medium">
                  Total Pendapatan
                </p>
                <h3 className="text-xl md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  {formatCurrency(stats.totalRevenue).replace("Rp", "Rp ")}
                </h3>
              </div>
              <div className="p-2 md:p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <DollarSign
                  className="text-blue-600 dark:text-blue-400"
                  size={20}
                />
              </div>
            </div>
            <div className="flex items-center mt-4">
              {stats.comparisonData.growthPercentage > 0 ? (
                <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                  <TrendingUp size={14} />
                  <span className="ml-2 font-medium">
                    +{stats.comparisonData.growthPercentage.toFixed(1)}%
                  </span>
                </div>
              ) : (
                <div className="flex items-center text-red-600 dark:text-red-400 text-sm">
                  <TrendingDown size={14} />
                  <span className="ml-2 font-medium">
                    {stats.comparisonData.growthPercentage.toFixed(1)}%
                  </span>
                </div>
              )}
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-3 hidden md:inline">
                vs periode sebelumnya
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 md:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm md:text-sm text-gray-500 dark:text-gray-400">
                  Rata-rata Transaksi
                </p>
                <h3 className="text-xl md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  {formatCurrency(stats.avgTransaction).replace("Rp", "Rp ")}
                </h3>
              </div>
              <div className="p-2 md:p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <BarChart3
                  className="text-green-600 dark:text-green-400"
                  size={20}
                />
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              {stats.totalTransactions} transaksi
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 md:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm md:text-sm text-gray-500 dark:text-gray-400">
                  Tingkat Sukses
                </p>
                <h3 className="text-xl md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  {stats.successRate.toFixed(1)}%
                </h3>
              </div>
              <div className="p-2 md:p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <CheckCircle
                  className="text-purple-600 dark:text-purple-400"
                  size={20}
                />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 md:h-3">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-600"
                  style={{ width: `${Math.min(stats.successRate, 100)}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {
                  filteredTransactions.filter((t) => t.status === "Sukses")
                    .length
                }{" "}
                dari {stats.totalTransactions} transaksi
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 md:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm md:text-sm text-gray-500 dark:text-gray-400">
                  Total Refund
                </p>
                <h3 className="text-xl md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  {formatCurrency(stats.refundAmount).replace("Rp", "Rp ")}
                </h3>
              </div>
              <div className="p-2 md:p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <Repeat className="text-red-600 dark:text-red-400" size={20} />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                <div
                  className={`flex items-center text-sm md:text-base ${
                    stats.refundAmount > 0
                      ? "text-red-600 dark:text-red-400"
                      : "text-green-600 dark:text-green-400"
                  }`}
                >
                  <ArrowUpRight size={14} />
                  <span className="ml-2 font-medium">
                    {stats.totalRevenue > 0
                      ? (
                          (stats.refundAmount / stats.totalRevenue) *
                          100
                        ).toFixed(1)
                      : "0.0"}
                    %
                  </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-3 hidden md:inline">
                  dari pendapatan
                </span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {
                  filteredTransactions.filter((t) => t.status === "Dibatalkan")
                    .length
                }{" "}
                transaksi dibatalkan
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 mt-5">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 md:p-5">
            <div className="flex items-center justify-between mb-4 md:mb-5">
              <h3 className="font-semibold text-gray-900 dark:text-white text-base md:text-lg">
                Pendapatan per Kategori
              </h3>
              <PieChart size={20} className="text-gray-400" />
            </div>

            {revenueByCategory.length > 0 ? (
              <div className="space-y-4">
                {revenueByCategory.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center min-w-0 flex-1">
                        <div
                          className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${item.color} mr-3 flex-shrink-0`}
                        ></div>
                        <span className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 truncate">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-sm md:text-base font-medium text-gray-900 dark:text-white ml-3 text-right whitespace-nowrap">
                        {formatCurrency(item.amount).replace("Rp", "Rp ")}
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 md:h-3">
                        <div
                          className={`h-full rounded-full ${item.color}`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-3 w-10 text-right">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm md:text-base">
                Tidak ada data pendapatan untuk periode ini
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 md:p-5">
            <div className="flex items-center justify-between mb-4 md:mb-5">
              <h3 className="font-semibold text-gray-900 dark:text-white text-base md:text-lg">
                Metode Pembayaran
              </h3>
              <CreditCard size={20} className="text-gray-400" />
            </div>

            {revenueByMethod.length > 0 ? (
              <div className="space-y-4">
                {revenueByMethod.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center min-w-0 flex-1">
                      <div
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mr-3 md:mr-4 flex-shrink-0 ${
                          item.method === "Credit Card"
                            ? "bg-blue-100 dark:bg-blue-900/30"
                            : item.method === "Transfer Bank"
                            ? "bg-green-100 dark:bg-green-900/30"
                            : item.method === "E-Wallet"
                            ? "bg-purple-100 dark:bg-purple-900/30"
                            : "bg-gray-100 dark:bg-gray-800"
                        }`}
                      >
                        {item.method === "Credit Card" && (
                          <CreditCard
                            className="text-blue-600 dark:text-blue-400"
                            size={18}
                          />
                        )}
                        {item.method === "Transfer Bank" && (
                          <Wallet
                            className="text-green-600 dark:text-green-400"
                            size={18}
                          />
                        )}
                        {item.method === "E-Wallet" && (
                          <DollarSign
                            className="text-purple-600 dark:text-purple-400"
                            size={18}
                          />
                        )}
                        {item.method === "Cash" && (
                          <DollarSign
                            className="text-gray-600 dark:text-gray-400"
                            size={18}
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 truncate">
                          {item.method}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {item.percentage}% dari total
                        </div>
                      </div>
                    </div>
                    <div className="text-sm md:text-base font-medium text-gray-900 dark:text-white ml-3 text-right whitespace-nowrap">
                      {formatCurrency(item.amount).replace("Rp", "Rp ")}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm md:text-base">
                Tidak ada data metode pembayaran untuk periode ini
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mt-5">
          <div className="p-4 md:p-5 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-base md:text-lg">
                  Transaksi {getTimeRangeShortLabel()}
                </h3>
              </div>

              <div className="hidden md:flex items-center space-x-4">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Cari transaksi..."
                    className="pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 w-56"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Filter size={18} className="text-gray-400" />
                  <select
                    className="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="all">Semua Status</option>
                    <option value="Sukses">Sukses</option>
                    <option value="Pending">Pending</option>
                    <option value="Gagal">Gagal</option>
                    <option value="Dibatalkan">Dibatalkan</option>
                  </select>
                </div>

                <select
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedMethod}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                >
                  <option value="all">Semua Metode</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Transfer Bank">Transfer Bank</option>
                  <option value="E-Wallet">E-Wallet</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm md:text-base text-gray-600 dark:text-gray-400">
              <span>
                Menampilkan{" "}
                {Math.min(indexOfLastItem, filteredTransactions.length)} dari{" "}
                {filteredTransactions.length} transaksi
              </span>
              <span className="hidden md:inline">
                Total:{" "}
                {formatCurrency(
                  filteredTransactions
                    .filter((t) => t.status === "Sukses")
                    .reduce((sum, t) => sum + t.amount, 0)
                )}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="md:hidden">
              {loading ? (
                Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="p-4 border-b border-gray-200 dark:border-gray-700 animate-pulse"
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                        </div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                        <div className="flex justify-between">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                        </div>
                      </div>
                    </div>
                  ))
              ) : currentTransactions.length === 0 ? (
                <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                  Tidak ada transaksi yang ditemukan untuk periode{" "}
                  {getTimeRangeLabel()}
                </div>
              ) : (
                currentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/30"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-blue-600 dark:text-blue-400 text-sm">
                            {transaction.invoice}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {transaction.date}
                          </div>
                        </div>
                        <div>
                          <StatusBadge status={transaction.status} />
                        </div>
                      </div>

                      <div>
                        <div className="font-medium text-gray-900 dark:text-white text-sm">
                          {transaction.customer}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {transaction.product}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white text-base">
                            {formatCurrency(transaction.amount).replace(
                              "Rp",
                              "Rp "
                            )}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            <MethodBadge method={transaction.method} />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
                            title="Lihat detail"
                            onClick={() =>
                              alert(
                                `Detail transaksi: ${
                                  transaction.invoice
                                }\nTanggal: ${
                                  transaction.date
                                }\nJumlah: ${formatCurrency(
                                  transaction.amount
                                )}\nStatus: ${transaction.status}`
                              )
                            }
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            className="p-1.5 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded transition-colors"
                            title="Unduh invoice"
                            onClick={() =>
                              alert(`Mengunduh invoice: ${transaction.invoice}`)
                            }
                          >
                            <Download size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="hidden md:block lg:hidden">
              {loading ? (
                <div className="p-5">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {Array(4)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 dark:bg-gray-900 rounded-lg p-5 animate-pulse"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full mr-4"></div>
                              <div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-3"></div>
                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                              </div>
                            </div>
                            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-2"></div>
                              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                            </div>
                            <div>
                              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-2"></div>
                              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-28"></div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-5">
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                            <div className="flex space-x-3">
                              <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                              <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                              <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : currentTransactions.length === 0 ? (
                <div className="py-10 text-center text-gray-500 dark:text-gray-400 text-base">
                  Tidak ada transaksi yang ditemukan untuk periode{" "}
                  {getTimeRangeLabel()}
                </div>
              ) : (
                <div className="p-5">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {currentTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700 p-5 hover:bg-white dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center min-w-0">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                              <span className="text-blue-600 dark:text-blue-400 font-medium text-lg">
                                {transaction.customer.charAt(0)}
                              </span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-medium text-gray-900 dark:text-white text-base truncate">
                                {transaction.customer}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1 truncate">
                                <span className="text-blue-500">
                                  {transaction.invoice}
                                </span>
                              </div>
                            </div>
                          </div>
                          <StatusBadge status={transaction.status} />
                        </div>

                        <div className="space-y-3 mb-5">
                          <div className="flex items-center text-base text-gray-700 dark:text-gray-300">
                            <Calendar size={16} className="mr-3" />
                            {transaction.date}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {transaction.product}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-5">
                          <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                              Jumlah
                            </div>
                            <div className="font-bold text-gray-900 dark:text-white text-lg">
                              {formatCurrency(transaction.amount).replace(
                                "Rp",
                                "Rp "
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                              Metode
                            </div>
                            <MethodBadge method={transaction.method} />
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            Kategori: {transaction.category}
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() =>
                                alert(
                                  `Detail transaksi: ${
                                    transaction.invoice
                                  }\nTanggal: ${
                                    transaction.date
                                  }\nJumlah: ${formatCurrency(
                                    transaction.amount
                                  )}\nStatus: ${transaction.status}`
                                )
                              }
                              className="p-2.5 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                              title="Lihat detail"
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              onClick={() =>
                                alert(
                                  `Mengunduh invoice: ${transaction.invoice}`
                                )
                              }
                              className="p-2.5 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                              title="Unduh invoice"
                            >
                              <Download size={18} />
                            </button>
                            <button className="p-2.5 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                              <MoreVertical size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <table className="hidden lg:table w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900/50">
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Pelanggan
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Jumlah
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Metode
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {loading ? (
                  Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <tr key={index} className="animate-pulse">
                        <td className="py-4 px-4">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                        </td>
                      </tr>
                    ))
                ) : currentTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center">
                      <div className="text-gray-500 dark:text-gray-400">
                        Tidak ada transaksi yang ditemukan untuk periode{" "}
                        {getTimeRangeLabel()}
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-900/30"
                    >
                      <td className="py-4 px-4">
                        <div className="font-medium text-blue-600 dark:text-blue-400">
                          {transaction.invoice}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {transaction.id}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {transaction.customer}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {transaction.product}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-gray-700 dark:text-gray-300">
                          {transaction.date}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-gray-900 dark:text-white">
                          {formatCurrency(transaction.amount).replace(
                            "Rp",
                            "Rp "
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <StatusBadge status={transaction.status} />
                      </td>
                      <td className="py-4 px-4">
                        <MethodBadge method={transaction.method} />
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <button
                            className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
                            title="Lihat detail"
                            onClick={() =>
                              alert(
                                `Detail transaksi: ${
                                  transaction.invoice
                                }\nTanggal: ${
                                  transaction.date
                                }\nJumlah: ${formatCurrency(
                                  transaction.amount
                                )}\nStatus: ${transaction.status}`
                              )
                            }
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            className="p-1.5 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded transition-colors"
                            title="Unduh invoice"
                            onClick={() =>
                              alert(`Mengunduh invoice: ${transaction.invoice}`)
                            }
                          >
                            <Download size={14} />
                          </button>
                          <button
                            className="p-1.5 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                            title="Lainnya"
                          >
                            <MoreVertical size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!loading && filteredTransactions.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="text-sm text-gray-700 dark:text-gray-300 text-center md:text-left">
                  Halaman {currentPage} dari {totalPages}
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-1.5 md:p-1.5 lg:p-1.5 rounded border border-gray-300 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`w-8 h-8 md:w-9 md:h-9 lg:w-8 lg:h-8 rounded text-sm transition-colors ${
                          currentPage === pageNumber
                            ? "bg-blue-600 text-white"
                            : "border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-1.5 md:p-1.5 lg:p-1.5 rounded border border-gray-300 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-5">
          <div className="md:hidden space-y-3">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800 text-center">
              <h4 className="font-semibold text-green-800 dark:text-green-300 text-sm mb-1 flex items-center justify-center">
                Insight Pendapatan
              </h4>
              <p className="text-xs text-green-700 dark:text-green-400">
                {stats.comparisonData.growthPercentage > 0
                  ? `Tumbuh +${stats.comparisonData.growthPercentage.toFixed(
                      1
                    )}%`
                  : `Turun ${stats.comparisonData.growthPercentage.toFixed(
                      1
                    )}%`}
                • {stats.successRate.toFixed(1)}% sukses
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800 text-center">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 text-sm mb-1 flex items-center justify-center">
                Performa Terbaik
              </h4>
              <p className="text-xs text-blue-700 dark:text-blue-400">
                {revenueByCategory.length > 0
                  ? `${revenueByCategory[0]?.category}: ${revenueByCategory[0]?.percentage}%`
                  : "Tidak ada data"}
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-lg p-3 border border-yellow-200 dark:border-yellow-800 text-center">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 text-sm mb-1 flex items-center justify-center">
                Perhatian
              </h4>
              <p className="text-xs text-yellow-700 dark:text-yellow-400">
                Refund:{" "}
                {stats.totalRevenue > 0
                  ? ((stats.refundAmount / stats.totalRevenue) * 100).toFixed(1)
                  : "0.0"}
                %
              </p>
            </div>
          </div>

          <div className="hidden md:grid md:grid-cols-3 md:gap-5 mt-5">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-5 border border-green-200 dark:border-green-800 flex flex-col">
              <h4 className="font-semibold text-green-800 dark:text-green-300 text-lg mb-3">
                Insight Pendapatan
              </h4>
              <p className="text-base text-green-700 dark:text-green-400 leading-relaxed flex-1">
                {stats.comparisonData.growthPercentage > 0
                  ? `Pendapatan tumbuh +${stats.comparisonData.growthPercentage.toFixed(
                      1
                    )}% dari periode sebelumnya.`
                  : `Pendapatan turun ${stats.comparisonData.growthPercentage.toFixed(
                      1
                    )}% dari periode sebelumnya.`}{" "}
                Transaksi berhasil mencapai {stats.successRate.toFixed(1)}%.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-5 border border-blue-200 dark:border-blue-800 flex flex-col">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 text-lg mb-3">
                Performa Terbaik
              </h4>
              <p className="text-base text-blue-700 dark:text-blue-400 leading-relaxed flex-1">
                {revenueByCategory.length > 0
                  ? `Kategori "${revenueByCategory[0]?.category}" menyumbang ${revenueByCategory[0]?.percentage}% dari total pendapatan.`
                  : "Belum ada data kategori untuk periode ini."}
                {revenueByMethod.length > 0 &&
                  revenueByCategory.length > 0 &&
                  " "}
                {revenueByMethod.length > 0
                  ? `${revenueByMethod[0]?.method} menjadi metode pembayaran paling populer (${revenueByMethod[0]?.percentage}%).`
                  : ""}
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-lg p-5 border border-yellow-200 dark:border-yellow-800 flex flex-col">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 text-lg mb-3">
                Perhatian
              </h4>
              <p className="text-base text-yellow-700 dark:text-yellow-400 leading-relaxed flex-1">
                Refund mencapai{" "}
                {stats.totalRevenue > 0
                  ? ((stats.refundAmount / stats.totalRevenue) * 100).toFixed(1)
                  : "0.0"}
                % dari pendapatan.
                {stats.refundAmount > 0
                  ? " Perlu evaluasi untuk transaksi yang sering dibatalkan."
                  : " Tidak ada refund untuk periode ini."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenuePage;
