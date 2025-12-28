import React, { useState, useMemo } from "react";
import {
  Search,
  ArrowUpDown,
  Eye,
  User,
  TrendingUp,
  TrendingDown,
  Clock,
  ChevronLeft,
  Filter,
} from "lucide-react";

interface PageAnalytics {
  id: number;
  page: string;
  pageTitle: string;
  views: number;
  visitors: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgTime: string;
  conversions: number;
  conversionRate: string;
  pageValue: string;
  entryRate: string;
  exitRate: string;
}

const allPagesData: PageAnalytics[] = [
  {
    id: 1,
    page: "",
    pageTitle: "Beranda Utama",
    views: 12450,
    visitors: 8920,
    uniqueVisitors: 7560,
    bounceRate: 32,
    avgTime: "4:20",
    conversions: 345,
    conversionRate: "3.9%",
    pageValue: "$1,245",
    entryRate: "45%",
    exitRate: "12%",
  },
  {
    id: 2,
    page: "beranda",
    pageTitle: "Beranda",
    views: 9870,
    visitors: 6540,
    uniqueVisitors: 5430,
    bounceRate: 34,
    avgTime: "3:45",
    conversions: 267,
    conversionRate: "4.1%",
    pageValue: "$987",
    entryRate: "38%",
    exitRate: "15%",
  },
  {
    id: 3,
    page: "home",
    pageTitle: "Home",
    views: 7650,
    visitors: 5230,
    uniqueVisitors: 4320,
    bounceRate: 36,
    avgTime: "3:20",
    conversions: 198,
    conversionRate: "3.8%",
    pageValue: "$765",
    entryRate: "32%",
    exitRate: "18%",
  },

  
  {
    id: 4,
    page: "produk",
    pageTitle: "Daftar Produk",
    views: 8760,
    visitors: 5430,
    uniqueVisitors: 4320,
    bounceRate: 45,
    avgTime: "3:15",
    conversions: 432,
    conversionRate: "8.0%",
    pageValue: "$2,340",
    entryRate: "15%",
    exitRate: "28%",
  },
  {
    id: 5,
    page: "produk laptop",
    pageTitle: "Laptop & Komputer",
    views: 5430,
    visitors: 3210,
    uniqueVisitors: 2780,
    bounceRate: 42,
    avgTime: "2:45",
    conversions: 287,
    conversionRate: "8.9%",
    pageValue: "$1,870",
    entryRate: "8%",
    exitRate: "32%",
  },
  {
    id: 6,
    page: "produk smartphone",
    pageTitle: "Smartphone",
    views: 4320,
    visitors: 2870,
    uniqueVisitors: 2340,
    bounceRate: 38,
    avgTime: "3:10",
    conversions: 234,
    conversionRate: "8.2%",
    pageValue: "$1,540",
    entryRate: "7%",
    exitRate: "30%",
  },
  {
    id: 7,
    page: "produk aksesoris",
    pageTitle: "Aksesoris",
    views: 3210,
    visitors: 1980,
    uniqueVisitors: 1670,
    bounceRate: 51,
    avgTime: "2:20",
    conversions: 87,
    conversionRate: "4.4%",
    pageValue: "$456",
    entryRate: "6%",
    exitRate: "45%",
  },
  {
    id: 8,
    page: "produk elektronik",
    pageTitle: "Elektronik Rumah",
    views: 2980,
    visitors: 1870,
    uniqueVisitors: 1540,
    bounceRate: 47,
    avgTime: "2:50",
    conversions: 123,
    conversionRate: "6.6%",
    pageValue: "$789",
    entryRate: "5%",
    exitRate: "42%",
  },

  {
    id: 9,
    page: "blog",
    pageTitle: "Blog & Artikel",
    views: 6890,
    visitors: 4210,
    uniqueVisitors: 3780,
    bounceRate: 38,
    avgTime: "5:10",
    conversions: 45,
    conversionRate: "1.1%",
    pageValue: "$230",
    entryRate: "12%",
    exitRate: "22%",
  },
  {
    id: 10,
    page: "blog tips-teknologi",
    pageTitle: "Tips & Teknologi",
    views: 4320,
    visitors: 2870,
    uniqueVisitors: 2540,
    bounceRate: 35,
    avgTime: "4:45",
    conversions: 32,
    conversionRate: "1.1%",
    pageValue: "$187",
    entryRate: "9%",
    exitRate: "25%",
  },
  {
    id: 11,
    page: "blog review-produk",
    pageTitle: "Review Produk",
    views: 3210,
    visitors: 1980,
    uniqueVisitors: 1760,
    bounceRate: 41,
    avgTime: "6:20",
    conversions: 56,
    conversionRate: "2.8%",
    pageValue: "$320",
    entryRate: "7%",
    exitRate: "28%",
  },
  {
    id: 12,
    page: "blog tutorial",
    pageTitle: "Tutorial & Panduan",
    views: 2870,
    visitors: 1760,
    uniqueVisitors: 1540,
    bounceRate: 32,
    avgTime: "7:15",
    conversions: 23,
    conversionRate: "1.3%",
    pageValue: "$145",
    entryRate: "6%",
    exitRate: "20%",
  },
  {
    id: 13,
    page: "blog berita",
    pageTitle: "Berita Terkini",
    views: 1540,
    visitors: 980,
    uniqueVisitors: 870,
    bounceRate: 45,
    avgTime: "3:30",
    conversions: 12,
    conversionRate: "1.2%",
    pageValue: "$78",
    entryRate: "4%",
    exitRate: "38%",
  },

  {
    id: 14,
    page: "tentang",
    pageTitle: "Tentang Kami",
    views: 4320,
    visitors: 2980,
    uniqueVisitors: 2650,
    bounceRate: 52,
    avgTime: "2:45",
    conversions: 34,
    conversionRate: "1.1%",
    pageValue: "$156",
    entryRate: "8%",
    exitRate: "48%",
  },
  {
    id: 15,
    page: "kontak",
    pageTitle: "Hubungi Kami",
    views: 3150,
    visitors: 1890,
    uniqueVisitors: 1670,
    bounceRate: 65,
    avgTime: "1:30",
    conversions: 67,
    conversionRate: "3.5%",
    pageValue: "$345",
    entryRate: "6%",
    exitRate: "60%",
  },
  {
    id: 16,
    page: "karir",
    pageTitle: "Karir & Lowongan",
    views: 1870,
    visitors: 1230,
    uniqueVisitors: 1090,
    bounceRate: 58,
    avgTime: "3:20",
    conversions: 23,
    conversionRate: "1.9%",
    pageValue: "$98",
    entryRate: "3%",
    exitRate: "52%",
  },
  {
    id: 17,
    page: "faq",
    pageTitle: "FAQ & Bantuan",
    views: 2540,
    visitors: 1870,
    uniqueVisitors: 1650,
    bounceRate: 42,
    avgTime: "4:10",
    conversions: 45,
    conversionRate: "2.4%",
    pageValue: "$210",
    entryRate: "5%",
    exitRate: "38%",
  },

  {
    id: 18,
    page: "kategori",
    pageTitle: "Kategori Produk",
    views: 4320,
    visitors: 2980,
    uniqueVisitors: 2540,
    bounceRate: 48,
    avgTime: "2:20",
    conversions: 187,
    conversionRate: "6.3%",
    pageValue: "$987",
    entryRate: "7%",
    exitRate: "42%",
  },
  {
    id: 19,
    page: "kategori terlaris",
    pageTitle: "Produk Terlaris",
    views: 3210,
    visitors: 2100,
    uniqueVisitors: 1870,
    bounceRate: 44,
    avgTime: "3:45",
    conversions: 234,
    conversionRate: "11.1%",
    pageValue: "$1,540",
    entryRate: "6%",
    exitRate: "38%",
  },
  {
    id: 20,
    page: "kategori promo",
    pageTitle: "Produk Promo",
    views: 5430,
    visitors: 3760,
    uniqueVisitors: 3210,
    bounceRate: 39,
    avgTime: "4:20",
    conversions: 432,
    conversionRate: "11.5%",
    pageValue: "$2,340",
    entryRate: "9%",
    exitRate: "32%",
  },
  {
    id: 21,
    page: "kategori baru",
    pageTitle: "Produk Baru",
    views: 2870,
    visitors: 1980,
    uniqueVisitors: 1760,
    bounceRate: 47,
    avgTime: "3:50",
    conversions: 156,
    conversionRate: "7.9%",
    pageValue: "$876",
    entryRate: "5%",
    exitRate: "40%",
  },

  {
    id: 22,
    page: "keranjang",
    pageTitle: "Keranjang Belanja",
    views: 4320,
    visitors: 3210,
    uniqueVisitors: 2980,
    bounceRate: 28,
    avgTime: "2:10",
    conversions: 987,
    conversionRate: "30.7%",
    pageValue: "$5,430",
    entryRate: "4%",
    exitRate: "25%",
  },
  {
    id: 23,
    page: "checkout",
    pageTitle: "Checkout",
    views: 2980,
    visitors: 2870,
    uniqueVisitors: 2650,
    bounceRate: 12,
    avgTime: "3:45",
    conversions: 876,
    conversionRate: "30.5%",
    pageValue: "$4,980",
    entryRate: "2%",
    exitRate: "15%",
  },
  {
    id: 24,
    page: "checkout sukses",
    pageTitle: "Pembayaran Sukses",
    views: 1870,
    visitors: 1760,
    uniqueVisitors: 1650,
    bounceRate: 8,
    avgTime: "1:20",
    conversions: 765,
    conversionRate: "43.5%",
    pageValue: "$4,320",
    entryRate: "1%",
    exitRate: "5%",
  },
  {
    id: 25,
    page: "checkout gagal",
    pageTitle: "Pembayaran Gagal",
    views: 540,
    visitors: 520,
    uniqueVisitors: 480,
    bounceRate: 65,
    avgTime: "0:45",
    conversions: 0,
    conversionRate: "0%",
    pageValue: "$0",
    entryRate: "1%",
    exitRate: "85%",
  },

  {
    id: 26,
    page: "akun",
    pageTitle: "Akun Saya",
    views: 2980,
    visitors: 2540,
    uniqueVisitors: 2430,
    bounceRate: 15,
    avgTime: "5:30",
    conversions: 123,
    conversionRate: "4.8%",
    pageValue: "$654",
    entryRate: "2%",
    exitRate: "12%",
  },
  {
    id: 27,
    page: "login",
    pageTitle: "Login",
    views: 4320,
    visitors: 3890,
    uniqueVisitors: 3650,
    bounceRate: 22,
    avgTime: "1:20",
    conversions: 765,
    conversionRate: "19.7%",
    pageValue: "$2,340",
    entryRate: "3%",
    exitRate: "20%",
  },
  {
    id: 28,
    page: "register",
    pageTitle: "Registrasi",
    views: 3210,
    visitors: 2870,
    uniqueVisitors: 2650,
    bounceRate: 35,
    avgTime: "2:10",
    conversions: 432,
    conversionRate: "15.1%",
    pageValue: "$1,870",
    entryRate: "2%",
    exitRate: "32%",
  },
  {
    id: 29,
    page: "lupa-password",
    pageTitle: "Lupa Password",
    views: 980,
    visitors: 870,
    uniqueVisitors: 820,
    bounceRate: 42,
    avgTime: "1:10",
    conversions: 45,
    conversionRate: "5.2%",
    pageValue: "$234",
    entryRate: "1%",
    exitRate: "38%",
  },

  {
    id: 30,
    page: "syarat-ketentuan",
    pageTitle: "Syarat & Ketentuan",
    views: 1540,
    visitors: 1320,
    uniqueVisitors: 1210,
    bounceRate: 68,
    avgTime: "1:45",
    conversions: 12,
    conversionRate: "0.9%",
    pageValue: "$65",
    entryRate: "2%",
    exitRate: "62%",
  },
  {
    id: 31,
    page: "kebijakan-privasi",
    pageTitle: "Kebijakan Privasi",
    views: 1320,
    visitors: 1090,
    uniqueVisitors: 980,
    bounceRate: 72,
    avgTime: "1:30",
    conversions: 8,
    conversionRate: "0.7%",
    pageValue: "$43",
    entryRate: "1%",
    exitRate: "68%",
  },
  {
    id: 32,
    page: "kebijakan-pengembalian",
    pageTitle: "Kebijakan Pengembalian",
    views: 980,
    visitors: 760,
    uniqueVisitors: 680,
    bounceRate: 65,
    avgTime: "2:10",
    conversions: 23,
    conversionRate: "3.0%",
    pageValue: "$123",
    entryRate: "1%",
    exitRate: "58%",
  },
];

type SortField =
  | "views"
  | "visitors"
  | "uniqueVisitors"
  | "bounceRate"
  | "conversions"
  | "page";
type SortDirection = "asc" | "desc";

interface AllPagesAnalyticsProps {
  onBack?: () => void;
  timeRange?: string;
}

const AllPagesAnalytics: React.FC<AllPagesAnalyticsProps> = ({
  onBack,
  timeRange = "7days",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("views");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1024;
  const isDesktop = window.innerWidth > 1024;

  const formatNumber = (num: number) => {
    return num.toLocaleString("id-ID");
  };

  const filteredPages = useMemo(() => {
    return allPagesData.filter(
      (page) =>
        page.page.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.pageTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const sortedPages = useMemo(() => {
    return [...filteredPages].sort((a, b) => {
      let aValue: string | number = a[sortField];
      let bValue: string | number = b[sortField];

      if (sortField === "page") {
        aValue = a.page.toLowerCase();
        bValue = b.page.toLowerCase();
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [filteredPages, sortField, sortDirection]);

  const totalPages = Math.ceil(sortedPages.length / itemsPerPage);
  const paginatedPages = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedPages.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedPages, currentPage]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) return null;
    return (
      <span className="ml-1 text-xs">
        {sortDirection === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  const totalViews = sortedPages.reduce((sum, page) => sum + page.views, 0);
  const totalVisitors = sortedPages.reduce(
    (sum, page) => sum + page.visitors,
    0
  );
  const avgBounceRate = Math.round(
    sortedPages.reduce((sum, page) => sum + page.bounceRate, 0) /
      sortedPages.length
  );
  const totalConversions = sortedPages.reduce(
    (sum, page) => sum + page.conversions,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 md:p-4 lg:p-6 overflow-x-hidden">
      <div className="mb-4 md:mb-6">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center space-x-1 md:space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-3 md:mb-4 text-sm"
          >
            <ChevronLeft size={isTablet ? 16 : 18} />
            <span>Kembali ke Dashboard</span>
          </button>
        )}

        <div className="mb-4 md:mb-6">
          <h1
            className={`font-bold text-gray-900 dark:text-white ${
              isTablet ? "text-xl" : isMobile ? "text-lg" : "text-2xl"
            }`}
          >
            Analisis Semua Halaman
          </h1>
          <p
            className={`text-gray-600 dark:text-gray-400 mt-1 ${
              isTablet ? "text-sm" : "text-sm"
            }`}
          >
            Analisis performa mendetail untuk semua halaman website
          </p>
          <div
            className={`mt-2 text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg inline-block ${
              isTablet ? "text-xs" : "text-sm"
            }`}
          >
            Periode:{" "}
            {timeRange === "7days"
              ? "7 hari terakhir"
              : timeRange === "30days"
              ? "30 hari terakhir"
              : timeRange === "90days"
              ? "90 hari terakhir"
              : "1 tahun terakhir"}{" "}
            • {formatNumber(sortedPages.length)} halaman
          </div>
        </div>

        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 md:mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Total Views
                </p>
                <p
                  className={`font-bold text-gray-900 dark:text-white ${
                    isTablet ? "text-base" : "text-lg"
                  }`}
                >
                  {formatNumber(totalViews)}
                </p>
              </div>
              <Eye
                className={`text-blue-500 ${isTablet ? "w-4 h-4" : "w-5 h-5"}`}
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Total Visitors
                </p>
                <p
                  className={`font-bold text-gray-900 dark:text-white ${
                    isTablet ? "text-base" : "text-lg"
                  }`}
                >
                  {formatNumber(totalVisitors)}
                </p>
              </div>
              <User
                className={`text-green-500 ${isTablet ? "w-4 h-4" : "w-5 h-5"}`}
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Avg. Bounce Rate
                </p>
                <p
                  className={`font-bold text-gray-900 dark:text-white ${
                    isTablet ? "text-base" : "text-lg"
                  }`}
                >
                  {avgBounceRate}%
                </p>
              </div>
              <TrendingDown
                className={`text-red-500 ${isTablet ? "w-4 h-4" : "w-5 h-5"}`}
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Total Conversions
                </p>
                <p
                  className={`font-bold text-gray-900 dark:text-white ${
                    isTablet ? "text-base" : "text-lg"
                  }`}
                >
                  {formatNumber(totalConversions)}
                </p>
              </div>
              <TrendingUp
                className={`text-purple-500 ${
                  isTablet ? "w-4 h-4" : "w-5 h-5"
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 md:p-4 mb-4 md:mb-6 border border-gray-200 dark:border-gray-700">
        <div className="mb-3 md:mb-4">
          <div className="relative">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${
                isTablet ? "w-4 h-4" : "w-5 h-5"
              }`}
            />
            <input
              type="text"
              placeholder="Cari halaman atau judul..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isTablet
                  ? "pl-9 pr-4 py-1.5 text-sm"
                  : "pl-10 pr-4 py-2 text-sm"
              }`}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Filter size={isTablet ? 14 : 16} className="text-gray-500" />
            <span
              className={`text-gray-600 dark:text-gray-400 ${
                isTablet ? "text-xs" : "text-sm"
              }`}
            >
              Urutkan:
            </span>
          </div>
          <select
            value={sortField}
            onChange={(e) => handleSort(e.target.value as SortField)}
            className={`bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isTablet ? "px-2 py-1.5 text-xs" : "px-3 py-2 text-sm"
            }`}
          >
            <option value="views">Views (Tertinggi)</option>
            <option value="visitors">Visitors (Tertinggi)</option>
            <option value="uniqueVisitors">Unique (Tertinggi)</option>
            <option value="bounceRate">Bounce Rate (Terendah)</option>
            <option value="conversions">Conversions (Tertinggi)</option>
            <option value="page">Nama Halaman (A-Z)</option>
          </select>
        </div>

        <div
          className={`mt-3 text-gray-600 dark:text-gray-400 ${
            isTablet ? "text-xs" : "text-sm"
          }`}
        >
          Menemukan {filteredPages.length} halaman yang sesuai dengan pencarian
        </div>
      </div>

      
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        
        {isTablet ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900/50">
                  <th
                    className="py-2 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("page")}
                  >
                    <div className="flex items-center">
                      Halaman {renderSortIndicator("page")}
                    </div>
                  </th>
                  <th
                    className="py-2 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("views")}
                  >
                    <div className="flex items-center">
                      Views {renderSortIndicator("views")}
                    </div>
                  </th>
                  <th
                    className="py-2 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("visitors")}
                  >
                    <div className="flex items-center">
                      Visitors {renderSortIndicator("visitors")}
                    </div>
                  </th>
                  <th
                    className="py-2 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("bounceRate")}
                  >
                    <div className="flex items-center">
                      Bounce {renderSortIndicator("bounceRate")}
                    </div>
                  </th>
                  <th
                    className="py-2 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("conversions")}
                  >
                    <div className="flex items-center">
                      Conv {renderSortIndicator("conversions")}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedPages.map((page) => (
                  <tr
                    key={page.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-900/30"
                  >
                    <td className="py-3 px-3">
                      <div className="flex items-start space-x-2">
                        <div
                          className={`bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center flex-shrink-0 ${
                            isTablet ? "w-8 h-8" : "w-10 h-10"
                          }`}
                        >
                          <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">
                            {page.page === "/"
                              ? "H"
                              : page.page.charAt(1).toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <code className="font-mono text-gray-800 dark:text-gray-300 block truncate text-xs">
                            {page.page}
                          </code>
                          <p className="text-gray-600 dark:text-gray-400 truncate text-xs">
                            {page.pageTitle}
                          </p>
                          <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs mt-1">
                            <Clock size={10} className="mr-1" />
                            {page.avgTime}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-gray-900 dark:text-white text-sm">
                        {formatNumber(page.views)}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs">
                        {Math.round((page.views / totalViews) * 100)}%
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="text-gray-700 dark:text-gray-300 text-sm">
                        {formatNumber(page.visitors)}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs">
                        {formatNumber(page.uniqueVisitors)} unique
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          page.bounceRate > 60
                            ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                            : page.bounceRate > 40
                            ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                            : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                        }`}
                      >
                        {page.bounceRate}%
                      </div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                        Entry: {page.entryRate}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-gray-900 dark:text-white text-sm">
                        {formatNumber(page.conversions)}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs">
                        {page.conversionRate} rate
                      </div>
                      <div className="text-green-600 dark:text-green-400 text-xs font-medium">
                        {page.pageValue}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <>
            
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900/50">
                    <th
                      className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("page")}
                    >
                      <div className="flex items-center">
                        Halaman {renderSortIndicator("page")}
                      </div>
                    </th>
                    <th
                      className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("views")}
                    >
                      <div className="flex items-center">
                        Views {renderSortIndicator("views")}
                      </div>
                    </th>
                    <th
                      className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("visitors")}
                    >
                      <div className="flex items-center">
                        Visitors {renderSortIndicator("visitors")}
                      </div>
                    </th>
                    <th
                      className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("uniqueVisitors")}
                    >
                      <div className="flex items-center">
                        Unique {renderSortIndicator("uniqueVisitors")}
                      </div>
                    </th>
                    <th
                      className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("bounceRate")}
                    >
                      <div className="flex items-center">
                        Bounce Rate {renderSortIndicator("bounceRate")}
                      </div>
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Avg Time
                    </th>
                    <th
                      className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("conversions")}
                    >
                      <div className="flex items-center">
                        Conversions {renderSortIndicator("conversions")}
                      </div>
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Page Value
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {paginatedPages.map((page) => (
                    <tr
                      key={page.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-900/30"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">
                              {page.page === "/"
                                ? "H"
                                : page.page.charAt(1).toUpperCase()}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <code className="font-mono text-sm text-gray-800 dark:text-gray-300 block truncate">
                              {page.page}
                            </code>
                            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                              {page.pageTitle}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {formatNumber(page.views)}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {Math.round((page.views / totalViews) * 100)}% dari
                          total
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-gray-700 dark:text-gray-300">
                          {formatNumber(page.visitors)}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-gray-700 dark:text-gray-300">
                          {formatNumber(page.uniqueVisitors)}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {Math.round(
                            (page.uniqueVisitors / page.visitors) * 100
                          )}
                          % dari visitors
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            page.bounceRate > 60
                              ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                              : page.bounceRate > 40
                              ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                              : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                          }`}
                        >
                          {page.bounceRate}%
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Entry: {page.entryRate} • Exit: {page.exitRate}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center text-gray-700 dark:text-gray-300">
                          <Clock size={14} className="mr-1 text-gray-400" />
                          {page.avgTime}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {formatNumber(page.conversions)}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {page.conversionRate} rate
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium text-green-700 dark:text-green-400">
                          {page.pageValue}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            
            <div className="md:hidden">
              {paginatedPages.map((page) => (
                <div
                  key={page.id}
                  className="p-4 border-b border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 dark:text-blue-400 font-bold">
                          {page.page === "/"
                            ? "H"
                            : page.page.charAt(1).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <code className="font-mono text-sm text-gray-800 dark:text-gray-300 block">
                          {page.page}
                        </code>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {page.pageTitle}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`px-2 py-1 rounded text-xs ${
                        page.bounceRate > 60
                          ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                          : page.bounceRate > 40
                          ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                          : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                      }`}
                    >
                      {page.bounceRate}%
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-gray-600 dark:text-gray-400 text-xs">
                        Views
                      </div>
                      <div className="font-medium">
                        {formatNumber(page.views)}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600 dark:text-gray-400 text-xs">
                        Visitors
                      </div>
                      <div className="font-medium">
                        {formatNumber(page.visitors)}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600 dark:text-gray-400 text-xs">
                        Conversions
                      </div>
                      <div className="font-medium">
                        {formatNumber(page.conversions)}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600 dark:text-gray-400 text-xs">
                        Page Value
                      </div>
                      <div className="font-medium text-green-600 dark:text-green-400">
                        {page.pageValue}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div>Avg: {page.avgTime}</div>
                    <div>Conversion: {page.conversionRate}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        
        <div className="px-3 md:px-4 py-3 md:py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
            <div
              className={`text-gray-600 dark:text-gray-400 ${
                isTablet ? "text-xs" : "text-sm"
              }`}
            >
              Menampilkan {(currentPage - 1) * itemsPerPage + 1} -{" "}
              {Math.min(currentPage * itemsPerPage, sortedPages.length)} dari{" "}
              {formatNumber(sortedPages.length)} halaman
            </div>

            <div className="flex items-center space-x-1 md:space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 ${
                  isTablet ? "px-2 py-1 text-xs" : "px-3 py-2 text-sm"
                }`}
              >
                ←
              </button>

              <div className="flex items-center space-x-1">
                
                {totalPages > 3 && currentPage > 2 && (
                  <>
                    <button
                      onClick={() => setCurrentPage(1)}
                      className={`font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 ${
                        isTablet ? "px-2 py-1 text-xs" : "px-3 py-2 text-sm"
                      }`}
                    >
                      1
                    </button>
                    {currentPage > 3 && (
                      <span className="px-1 md:px-2 text-gray-500">...</span>
                    )}
                  </>
                )}

                {(() => {
                  let pages = [];

                  if (totalPages <= 3) {
                    for (let i = 1; i <= totalPages; i++) {
                      pages.push(i);
                    }
                  } else {
                    if (currentPage === 1) {
                      pages = [1, 2, 3];
                    } else if (currentPage === totalPages) {
                      pages = [totalPages - 2, totalPages - 1, totalPages];
                    } else {
                      pages = [currentPage - 1, currentPage, currentPage + 1];
                    }
                  }

                  return pages.map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`font-medium rounded ${
                        currentPage === pageNum
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                      } ${
                        isTablet ? "px-2 py-1 text-xs" : "px-3 py-2 text-sm"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ));
                })()}

                {totalPages > 3 && currentPage < totalPages - 1 && (
                  <>
                    {currentPage < totalPages - 2 && (
                      <span className="px-1 md:px-2 text-gray-500">...</span>
                    )}
                    {currentPage <= totalPages - 2 && (
                      <button
                        onClick={() => setCurrentPage(totalPages)}
                        className={`font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 ${
                          isTablet ? "px-2 py-1 text-xs" : "px-3 py-2 text-sm"
                        }`}
                      >
                        {totalPages}
                      </button>
                    )}
                  </>
                )}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className={`font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 ${
                  isTablet ? "px-2 py-1 text-xs" : "px-3 py-2 text-sm"
                }`}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-4 md:mt-6">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-3 md:p-4 border border-blue-200 dark:border-blue-800 text-center">
          <h3
            className={`font-semibold text-blue-800 dark:text-blue-300 mb-2 ${
              isTablet ? "text-sm" : "text-sm"
            }`}
          >
            Performa Halaman
          </h3>
          <p
            className={`text-blue-700 dark:text-blue-400 ${
              isTablet ? "text-xs" : "text-xs"
            }`}
          >
            Halaman checkout memiliki conversion rate tertinggi (30.7%). Fokus
            optimasi pada UX checkout.
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-3 md:p-4 border border-green-200 dark:border-green-800 text-center">
          <h3
            className={`font-semibold text-green-800 dark:text-green-300 mb-2 ${
              isTablet ? "text-sm" : "text-sm"
            }`}
          >
            Perhatian
          </h3>
          <p
            className={`text-green-700 dark:text-green-400 ${
              isTablet ? "text-xs" : "text-xs"
            }`}
          >
            Halaman legal bounce rate tinggi (&gt;65%). Buat konten lebih
            engaging.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-3 md:p-4 border border-purple-200 dark:border-purple-800 text-center">
          <h3
            className={`font-semibold text-purple-800 dark:text-purple-300 mb-2 ${
              isTablet ? "text-sm" : "text-sm"
            }`}
          >
            Optimasi
          </h3>
          <p
            className={`text-purple-700 dark:text-purple-400 ${
              isTablet ? "text-xs" : "text-xs"
            }`}
          >
            Halaman blog waktu rata-rata tinggi (5-7 menit). Manfaatkan untuk
            promosi.
          </p>
        </div>
      </div>

      <div className="mt-4 md:mt-6 bg-white dark:bg-gray-800 rounded-lg p-3 md:p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
          <div>
            <h3
              className={`font-medium text-gray-900 dark:text-white ${
                isTablet ? "text-sm" : "text-base"
              }`}
            >
              Export Data
            </h3>
            <p
              className={`text-gray-600 dark:text-gray-400 ${
                isTablet ? "text-xs" : "text-sm"
              }`}
            >
              Download data semua halaman dalam CSV atau Excel
            </p>
          </div>
          <div className="flex space-x-2 md:space-x-3">
            <button
              className={`font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
                isTablet ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
              }`}
            >
              Export CSV
            </button>
            <button
              className={`font-medium text-white bg-blue-600 rounded hover:bg-blue-700 ${
                isTablet ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
              }`}
            >
              Export Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPagesAnalytics;
