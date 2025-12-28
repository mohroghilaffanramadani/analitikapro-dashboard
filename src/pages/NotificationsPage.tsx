import React, { useState, useEffect } from "react";
import {
  Bell,
  Check,
  X,
  Eye,
  AlertCircle,
  Info,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Trash2,
  Filter,
  Calendar,
  Clock,
  Archive,
  Settings,
  Search,
  ChevronLeft,
  Download,
  BellOff,
  MoreVertical,
  Mail,
  Shield,
  CreditCard,
  FileText,
  Users,
  Server,
  RefreshCw,
  BellRing,
  Volume2,
  MailOpen,
  Pin,
  Tag,
  Star,
  Clock as ClockIcon,
  CheckSquare,
  Square,
  ChevronDown,
  SortAsc,
  Filter as FilterIcon,
  Grid,
  List,
  BarChart,
  Globe,
  Lock,
  UserPlus,
  TrendingUp,
  AlertOctagon,
  ShieldCheck,
  FileCheck,
  Database,
  Activity,
  Zap,
  Cpu,
  Network,
  Cloud,
  Key,
  Wallet,
  Receipt,
  CreditCard as CardIcon,
  ShoppingCart,
  Package,
  Truck,
  Users as UsersIcon,
  MessageSquare,
  Heart,
  Award,
  Target,
  PieChart,
  LineChart,
  Smartphone,
  Wifi,
  Database as DatabaseIcon,
  HardDrive,
  Layers,
  GitBranch,
  GitPullRequest,
  GitCommit,
  GitMerge,
  Code,
  Terminal,
  Box,
  Container,
  DownloadCloud,
  UploadCloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Sun,
  Moon,
  Wind,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  timestamp: Date;
  type: "info" | "warning" | "success" | "error" | "system" | "security";
  read: boolean;
  category:
    | "system"
    | "user"
    | "transaction"
    | "report"
    | "security"
    | "update"
    | "marketing"
    | "analytics"
    | "maintenance";
  priority: "low" | "medium" | "high" | "critical";
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
  actions?: {
    label: string;
    action: string;
    color: string;
    icon?: React.ReactNode;
  }[];
  metadata?: {
    userId?: string;
    amount?: number;
    reportId?: string;
    errorCode?: string;
    device?: string;
    location?: string;
    ipAddress?: string;
  };
  starred?: boolean;
  pinned?: boolean;
  tags?: string[];
}

const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('7days'); 
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<
    Notification[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    []
  );
  const [sortBy, setSortBy] = useState<"time" | "priority">("time");
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setShowFilters(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const categories = [
    { id: "all", label: "Semua", icon: Bell, count: 0 },
    { id: "system", label: "System", icon: Server, count: 0 },
    { id: "user", label: "User", icon: Users, count: 0 },
    { id: "transaction", label: "Transaksi", icon: CreditCard, count: 0 },
    { id: "report", label: "Laporan", icon: FileText, count: 0 },
    { id: "security", label: "Keamanan", icon: Shield, count: 0 },
    { id: "update", label: "Update", icon: Download, count: 0 },
    { id: "marketing", label: "Marketing", icon: TrendingUp, count: 0 },
    { id: "analytics", label: "Analitik", icon: BarChart, count: 0 },
    { id: "maintenance", label: "Maintenance", icon: Settings, count: 0 },
  ];

  const priorities = [
    { id: "all", label: "Semua Prioritas", color: "bg-gray-200" },
    { id: "critical", label: "Critical", color: "bg-red-500" },
    { id: "high", label: "High", color: "bg-orange-500" },
    { id: "medium", label: "Medium", color: "bg-yellow-500" },
    { id: "low", label: "Low", color: "bg-green-500" },
  ];

  const types = [
    { id: "all", label: "Semua Tipe", icon: Bell },
    { id: "success", label: "Success", icon: CheckCircle },
    { id: "warning", label: "Warning", icon: AlertTriangle },
    { id: "error", label: "Error", icon: AlertCircle },
    { id: "info", label: "Info", icon: Info },
    { id: "system", label: "System", icon: Server },
    { id: "security", label: "Security", icon: ShieldCheck },
  ];

  const generateNotifications = () => {
    const sampleNotifications: Notification[] = [
      {
        id: "1",
        title: "SERVER DOWN - Emergency",
        message:
          "Server utama mengalami downtime. Segera cek status dan lakukan recovery.",
        time: "5 menit lalu",
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        type: "error",
        read: false,
        category: "system",
        priority: "critical",
        icon: <AlertOctagon size={isMobile ? 16 : 20} />,
        bgColor: "bg-red-100",
        textColor: "text-red-800",
        actions: [
          {
            label: "Cek Status",
            action: "check_status",
            color: "text-red-600",
            icon: <Activity size={isMobile ? 12 : 14} />,
          },
          {
            label: "Restart Server",
            action: "restart",
            color: "text-red-600",
            icon: <RefreshCw size={isMobile ? 12 : 14} />,
          },
        ],
        metadata: {
          device: "Server-01",
          location: "Data Center Jakarta",
          ipAddress: "192.168.1.100",
        },
        pinned: true,
        tags: ["urgent", "server", "downtime"],
      },
      {
        id: "2",
        title: "Security Breach Detected",
        message:
          "Terdeteksi upaya akses tidak sah dari IP 203.0.113.25. Segera blokir.",
        time: "15 menit lalu",
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        type: "security",
        read: false,
        category: "security",
        priority: "critical",
        icon: <Shield size={isMobile ? 16 : 20} />,
        bgColor: "bg-red-100",
        textColor: "text-red-800",
        actions: [
          {
            label: "Blokir IP",
            action: "block_ip",
            color: "text-red-600",
            icon: <Lock size={isMobile ? 12 : 14} />,
          },
          {
            label: "Lihat Logs",
            action: "view_logs",
            color: "text-red-600",
            icon: <FileText size={isMobile ? 12 : 14} />,
          },
        ],
        metadata: {
          ipAddress: "203.0.113.25",
          location: "Singapore",
        },
        pinned: true,
        tags: ["security", "intrusion", "block"],
      },

      {
        id: "3",
        title: "Transaksi Besar Detected",
        message: "Transaksi sebesar Rp 250.000.000 berhasil diproses.",
        time: "30 menit lalu",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        type: "success",
        read: false,
        category: "transaction",
        priority: "high",
        icon: <CreditCard size={isMobile ? 16 : 20} />,
        bgColor: "bg-green-100",
        textColor: "text-green-800",
        actions: [
          {
            label: "Lihat Detail",
            action: "view_details",
            color: "text-green-600",
            icon: <Eye size={isMobile ? 12 : 14} />,
          },
          {
            label: "Download Invoice",
            action: "download_invoice",
            color: "text-green-600",
            icon: <Download size={isMobile ? 12 : 14} />,
          },
        ],
        metadata: {
          amount: 250000000,
        },
        starred: true,
        tags: ["transaction", "large", "success"],
      },
      {
        id: "4",
        title: "Laporan Bulanan Siap",
        message: "Laporan performa bulan Desember 2023 sudah bisa diunduh.",
        time: "1 jam lalu",
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        type: "info",
        read: true,
        category: "report",
        priority: "high",
        icon: <BarChart size={isMobile ? 16 : 20} />,
        bgColor: "bg-blue-100",
        textColor: "text-blue-800",
        actions: [
          {
            label: "Download PDF",
            action: "download_pdf",
            color: "text-blue-600",
            icon: <DownloadCloud size={isMobile ? 12 : 14} />,
          },
          {
            label: "Analisis Data",
            action: "analyze",
            color: "text-blue-600",
            icon: <LineChart size={isMobile ? 12 : 14} />,
          },
        ],
        metadata: {
          reportId: "REP-2023-12",
        },
        tags: ["report", "monthly", "analytics"],
      },

      {
        id: "5",
        title: "10 Pengguna Baru Bergabung",
        message:
          "10 pengguna baru telah bergabung dalam 24 jam terakhir. Selamat datang!",
        time: "2 jam lalu",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        type: "success",
        read: true,
        category: "user",
        priority: "medium",
        icon: <UserPlus size={isMobile ? 16 : 20} />,
        bgColor: "bg-purple-100",
        textColor: "text-purple-800",
        actions: [
          {
            label: "Lihat Pengguna",
            action: "view_users",
            color: "text-purple-600",
            icon: <Users size={isMobile ? 12 : 14} />,
          },
          {
            label: "Kirim Welcome Email",
            action: "send_email",
            color: "text-purple-600",
            icon: <Mail size={isMobile ? 12 : 14} />,
          },
        ],
        metadata: {
          userId: "multiple",
        },
        tags: ["users", "growth", "welcome"],
      },
      {
        id: "6",
        title: "Update Sistem v2.5.0",
        message:
          "Versi terbaru sudah tersedia dengan fitur-fitur baru dan perbaikan bug.",
        time: "3 jam lalu",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        type: "info",
        read: true,
        category: "update",
        priority: "medium",
        icon: <Download size={isMobile ? 16 : 20} />,
        bgColor: "bg-indigo-100",
        textColor: "text-indigo-800",
        actions: [
          {
            label: "Lihat Changelog",
            action: "view_changelog",
            color: "text-indigo-600",
            icon: <FileText size={isMobile ? 12 : 14} />,
          },
          {
            label: "Update Sekarang",
            action: "update_now",
            color: "text-indigo-600",
            icon: <Zap size={isMobile ? 12 : 14} />,
          },
        ],
        tags: ["update", "version", "improvement"],
      },

      {
        id: "7",
        title: "Aplikasi Mobile Update",
        message:
          "Versi terbaru aplikasi mobile sudah tersedia di App Store dan Play Store.",
        time: "4 jam lalu",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        type: "info",
        read: true,
        category: "update",
        priority: "low",
        icon: <Smartphone size={isMobile ? 16 : 20} />,
        bgColor: "bg-teal-100",
        textColor: "text-teal-800",
        actions: [
          {
            label: "App Store",
            action: "app_store",
            color: "text-teal-600",
            icon: <Download size={isMobile ? 12 : 14} />,
          },
          {
            label: "Play Store",
            action: "play_store",
            color: "text-teal-600",
            icon: <Download size={isMobile ? 12 : 14} />,
          },
        ],
        tags: ["mobile", "app", "store"],
      },
      {
        id: "8",
        title: "Target Bulanan Tercapai",
        message: "Selamat! Tim telah mencapai target penjualan bulan Desember.",
        time: "5 jam lalu",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        type: "success",
        read: true,
        category: "analytics",
        priority: "low",
        icon: <Target size={isMobile ? 16 : 20} />,
        bgColor: "bg-emerald-100",
        textColor: "text-emerald-800",
        actions: [
          {
            label: "Lihat Dashboard",
            action: "view_dashboard",
            color: "text-emerald-600",
            icon: <PieChart size={isMobile ? 12 : 14} />,
          },
        ],
        tags: ["target", "achievement", "sales"],
      },
      {
        id: "9",
        title: "Two-Factor Auth Diaktifkan",
        message: "Two-factor authentication berhasil diaktifkan untuk akun Anda.",
        time: "6 jam lalu",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        type: "security",
        read: true,
        category: "security",
        priority: "medium",
        icon: <ShieldCheck size={isMobile ? 16 : 20} />,
        bgColor: "bg-cyan-100",
        textColor: "text-cyan-800",
        actions: [
          {
            label: "Pengaturan Keamanan",
            action: "security_settings",
            color: "text-cyan-600",
            icon: <Settings size={isMobile ? 12 : 14} />,
          },
        ],
        tags: ["security", "2fa", "authentication"],
      },
      {
        id: "10",
        title: "Order #ORD-7890 Dikirim",
        message: "Pesanan Anda telah dikirimkan via JNE Express.",
        time: "7 jam lalu",
        timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000),
        type: "success",
        read: true,
        category: "transaction",
        priority: "low",
        icon: <Package size={isMobile ? 16 : 20} />,
        bgColor: "bg-amber-100",
        textColor: "text-amber-800",
        actions: [
          {
            label: "Lacak Pengiriman",
            action: "track_shipment",
            color: "text-amber-600",
            icon: <Truck size={isMobile ? 12 : 14} />,
          },
          {
            label: "Detail Pesanan",
            action: "order_details",
            color: "text-amber-600",
            icon: <Receipt size={isMobile ? 12 : 14} />,
          },
        ],
        metadata: {
          amount: 1250000,
        },
        tags: ["order", "shipping", "delivery"],
      },
      {
        id: "11",
        title: "Database Optimization",
        message: "Optimasi database berhasil dilakukan. Performa meningkat 25%.",
        time: "8 jam lalu",
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        type: "system",
        read: true,
        category: "system",
        priority: "medium",
        icon: <Database size={isMobile ? 16 : 20} />,
        bgColor: "bg-violet-100",
        textColor: "text-violet-800",
        actions: [
          {
            label: "Lihat Metrics",
            action: "view_metrics",
            color: "text-violet-600",
            icon: <Activity size={isMobile ? 12 : 14} />,
          },
        ],
        tags: ["database", "optimization", "performance"],
      },
      {
        id: "12",
        title: "CDN Cache Updated",
        message: "Cache CDN berhasil diperbarui untuk semua region.",
        time: "9 jam lalu",
        timestamp: new Date(Date.now() - 9 * 60 * 60 * 1000),
        type: "system",
        read: true,
        category: "system",
        priority: "low",
        icon: <Globe size={isMobile ? 16 : 20} />,
        bgColor: "bg-sky-100",
        textColor: "text-sky-800",
        tags: ["cdn", "cache", "network"],
      },
      {
        id: "13",
        title: "Campaign Performance",
        message: "Kampanye Q4 2023 mencapai ROI 325%.",
        time: "10 jam lalu",
        timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
        type: "success",
        read: true,
        category: "marketing",
        priority: "medium",
        icon: <TrendingUp size={isMobile ? 16 : 20} />,
        bgColor: "bg-pink-100",
        textColor: "text-pink-800",
        tags: ["marketing", "campaign", "roi"],
      },
      {
        id: "14",
        title: "Scheduled Maintenance",
        message: "Maintenance terjadwal Minggu depan 02:00-04:00 WIB.",
        time: "11 jam lalu",
        timestamp: new Date(Date.now() - 11 * 60 * 60 * 1000),
        type: "warning",
        read: true,
        category: "maintenance",
        priority: "medium",
        icon: <Settings size={isMobile ? 16 : 20} />,
        bgColor: "bg-orange-100",
        textColor: "text-orange-800",
        tags: ["maintenance", "scheduled"],
      },
      {
        id: "15",
        title: "5 Pesan Baru",
        message: "Anda memiliki 5 pesan belum dibaca dari pelanggan.",
        time: "12 jam lalu",
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
        type: "info",
        read: false,
        category: "user",
        priority: "medium",
        icon: <MessageSquare size={isMobile ? 16 : 20} />,
        bgColor: "bg-rose-100",
        textColor: "text-rose-800",
        tags: ["messages", "inbox"],
      },
    ];

    return sampleNotifications;
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const generatedNotifications = generateNotifications();
      setNotifications(generatedNotifications);
      setFilteredNotifications(generatedNotifications);
      
      categories.forEach((cat) => {
        cat.count = generatedNotifications.filter(
          (n) => cat.id === "all" || n.category === cat.id
        ).length;
      });
      
      setIsLoading(false);
    }, 1000);
  }, [isMobile]);

  useEffect(() => {
    let filtered = [...notifications];

    if (selectedCategory !== "all") {
      filtered = filtered.filter((n) => n.category === selectedCategory);
    }

    if (selectedPriority !== "all") {
      filtered = filtered.filter((n) => n.priority === selectedPriority);
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((n) => n.type === selectedType);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (n) =>
          n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.tags?.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    filtered.sort((a, b) => {
      if (sortBy === "time") {
        return b.timestamp.getTime() - a.timestamp.getTime();
      } else {
        const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
    });

    setFilteredNotifications(filtered);
  }, [
    notifications,
    selectedCategory,
    selectedPriority,
    selectedType,
    searchQuery,
    sortBy,
  ]);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const toggleStar = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, starred: !notif.starred } : notif
      )
    );
  };

  const togglePin = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, pinned: !notif.pinned } : notif
      )
    );
  };

  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map((n) => n.id));
    }
  };

  const handleSelectNotification = (id: string) => {
    setSelectedNotifications((prev) =>
      prev.includes(id)
        ? prev.filter((nId) => nId !== id)
        : [...prev, id]
    );
  };

  const handleBulkAction = (action: "read" | "unread" | "delete" | "star" | "archive") => {
    switch (action) {
      case "read":
        setNotifications((prev) =>
          prev.map((notif) =>
            selectedNotifications.includes(notif.id)
              ? { ...notif, read: true }
              : notif
          )
        );
        break;
      case "unread":
        setNotifications((prev) =>
          prev.map((notif) =>
            selectedNotifications.includes(notif.id)
              ? { ...notif, read: false }
              : notif
          )
        );
        break;
      case "delete":
        setNotifications((prev) =>
          prev.filter((notif) => !selectedNotifications.includes(notif.id))
        );
        setSelectedNotifications([]);
        break;
      case "star":
        setNotifications((prev) =>
          prev.map((notif) =>
            selectedNotifications.includes(notif.id)
              ? { ...notif, starred: !notif.starred }
              : notif
          )
        );
        break;
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const starredCount = notifications.filter((n) => n.starred).length;
  const pinnedCount = notifications.filter((n) => n.pinned).length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle size={isMobile ? 14 : 16} className="text-green-600" />;
      case "warning":
        return <AlertTriangle size={isMobile ? 14 : 16} className="text-yellow-600" />;
      case "error":
        return <AlertCircle size={isMobile ? 14 : 16} className="text-red-600" />;
      case "security":
        return <Shield size={isMobile ? 14 : 16} className="text-blue-600" />;
      case "system":
        return <Server size={isMobile ? 14 : 16} className="text-purple-600" />;
      default:
        return <Info size={isMobile ? 14 : 16} className="text-blue-600" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/')}
                className="p-2 rounded-lg bg-white hover:bg-gray-100 transition-colors shadow-sm border border-gray-200"
              >
                <ChevronLeft size={isMobile ? 18 : 20} />
              </button>
              <div>
                <h1 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold text-gray-900`}>
                  Notifikasi
                </h1>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>
                  Kelola semua notifikasi sistem Anda
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {!isMobile && (
                <button
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                  className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  <Check size={16} />
                  <span>Tandai Semua Dibaca</span>
                </button>
              )}
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`sm:hidden p-2 rounded-lg ${showFilters ? 'bg-blue-100 text-blue-600' : 'bg-white hover:bg-gray-100'} transition-colors shadow-sm border border-gray-200`}
              >
                <Filter size={18} />
              </button>
              <button className="p-2 rounded-lg bg-white hover:bg-gray-100 transition-colors shadow-sm border border-gray-200">
                <Settings size={isMobile ? 18 : 20} />
              </button>
            </div>
          </div>

          {isMobile && (
            <button
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="w-full mb-4 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              <Check size={16} />
              <span>Tandai Semua Notifikasi Dibaca</span>
            </button>
          )}

          <div className={`${isMobile ? 'grid grid-cols-2' : 'grid grid-cols-2 md:grid-cols-4'} gap-3 mb-4`}>
            <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>Total</p>
                  <p className={`${isMobile ? 'text-lg' : 'text-xl sm:text-2xl'} font-bold`}>{notifications.length}</p>
                </div>
                <div className={`${isMobile ? 'p-2' : 'p-3'} bg-blue-100 rounded-lg`}>
                  <Bell size={isMobile ? 18 : 20} className="text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>Belum Dibaca</p>
                  <p className={`${isMobile ? 'text-lg' : 'text-xl sm:text-2xl'} font-bold text-red-600`}>
                    {unreadCount}
                  </p>
                </div>
                <div className={`${isMobile ? 'p-2' : 'p-3'} bg-red-100 rounded-lg`}>
                  <BellOff size={isMobile ? 18 : 20} className="text-red-600" />
                </div>
              </div>
            </div>
            {!isMobile && (
              <>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Disimpan</p>
                      <p className="text-xl sm:text-2xl font-bold text-yellow-600">
                        {starredCount}
                      </p>
                    </div>
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <Star size={20} className="text-yellow-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Ditandai</p>
                      <p className="text-xl sm:text-2xl font-bold text-purple-600">
                        {pinnedCount}
                      </p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Pin size={20} className="text-purple-600" />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {isMobile && showFilters && (
            <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowFilters(false)} />
          )}
          
          <div className={`${isMobile ? (showFilters ? 'fixed inset-y-0 left-0 w-64 z-50 transform translate-x-0' : 'hidden') : 'w-full lg:w-64'} transition-transform duration-300 ease-in-out`}>
            <div className={`${isMobile ? 'h-full overflow-y-auto' : ''} bg-white rounded-xl shadow-sm border border-gray-200 p-4 ${isMobile ? 'm-4' : ''}`}>
              {isMobile && (
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-gray-900">Filter</h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-1 rounded-lg hover:bg-gray-100"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}

              <div className="mb-4">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={isMobile ? 16 : 18}
                  />
                  <input
                    type="text"
                    placeholder="Cari notifikasi..."
                    className="w-full pl-9 pr-3 py-2 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-2 text-sm">Kategori</h3>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        if (isMobile) setShowFilters(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors text-sm ${
                        selectedCategory === category.id
                          ? "bg-blue-50 text-blue-700"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <category.icon size={isMobile ? 14 : 16} />
                        <span className="truncate">{category.label}</span>
                      </div>
                      <span className="text-xs bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded-full min-w-6 text-center">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-2 text-sm">Prioritas</h3>
                <div className="space-y-2">
                  {priorities.map((priority) => (
                    <button
                      key={priority.id}
                      onClick={() => {
                        setSelectedPriority(priority.id);
                        if (isMobile) setShowFilters(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors text-sm ${
                        selectedPriority === priority.id
                          ? "bg-blue-50 text-blue-700"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${priority.color}`}
                        ></div>
                        <span className="truncate">{priority.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-2 text-sm">Tipe</h3>
                <div className="space-y-1">
                  {types.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setSelectedType(type.id);
                        if (isMobile) setShowFilters(false);
                      }}
                      className={`w-full flex items-center space-x-2 p-2 rounded-lg transition-colors text-sm ${
                        selectedType === type.id
                          ? "bg-blue-50 text-blue-700"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <type.icon size={isMobile ? 14 : 16} />
                      <span className="truncate">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2 text-sm">Aksi Cepat</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      handleBulkAction("delete");
                      if (isMobile) setShowFilters(false);
                    }}
                    disabled={selectedNotifications.length === 0}
                    className="w-full flex items-center space-x-2 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm disabled:opacity-50"
                  >
                    <Trash2 size={isMobile ? 14 : 16} />
                    <span>Hapus Terpilih</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm">
                    <Download size={isMobile ? 14 : 16} />
                    <span>Ekspor Semua</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                <div className="flex items-center justify-between sm:justify-start sm:space-x-4">
                  <button
                    onClick={handleSelectAll}
                    className="flex items-center space-x-2"
                  >
                    {selectedNotifications.length === filteredNotifications.length ? (
                      <CheckSquare size={isMobile ? 18 : 20} className="text-blue-600" />
                    ) : (
                      <Square size={isMobile ? 18 : 20} className="text-gray-400" />
                    )}
                    <span className="text-sm">
                      {selectedNotifications.length} terpilih
                    </span>
                  </button>
                  <div className="flex items-center space-x-1 sm:hidden">
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-1.5 rounded-lg ${
                        viewMode === "list"
                          ? "bg-blue-100 text-blue-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <List size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-1.5 rounded-lg ${
                        viewMode === "grid"
                          ? "bg-blue-100 text-blue-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <Grid size={16} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:space-x-4">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <SortAsc size={isMobile ? 14 : 16} className="text-gray-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-transparent border-0 focus:outline-none focus:ring-0 text-sm"
                    >
                      <option value="time">Terbaru</option>
                      <option value="priority">Prioritas</option>
                    </select>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    {filteredNotifications.length} dari {notifications.length}
                  </div>
                </div>
              </div>
            </div>

            {viewMode === "list" ? (
              <div className="space-y-3">
                {filteredNotifications.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 text-center">
                    <Bell size={isMobile ? 32 : 48} className="mx-auto text-gray-300 mb-3 sm:mb-4" />
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                      Tidak ada notifikasi
                    </h3>
                    <p className="text-sm text-gray-600">
                      {searchQuery
                        ? "Tidak ada notifikasi yang cocok dengan pencarian Anda"
                        : "Semua notifikasi telah dibaca"}
                    </p>
                  </div>
                ) : (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`bg-white rounded-xl shadow-sm border transition-all duration-200 ${
                        !notification.read
                          ? "border-blue-200 bg-blue-50/30"
                          : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                      }`}
                    >
                      <div className="p-3 sm:p-4">
                        <div className="flex items-start space-x-2 sm:space-x-3">
                          <input
                            type="checkbox"
                            checked={selectedNotifications.includes(notification.id)}
                            onChange={() => handleSelectNotification(notification.id)}
                            className={`mt-1 ${isMobile && window.innerWidth < 400 ? 'hidden sm:block' : ''}`}
                          />

                          <div
                            className={`${isMobile ? 'p-2' : 'p-3'} rounded-lg ${notification.bgColor} flex-shrink-0`}
                          >
                            {notification.icon}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2">
                              <div className="flex items-start space-x-2 mb-1 sm:mb-0">
                                {!notification.read && (
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-500 animate-pulse mt-1.5 flex-shrink-0"></div>
                                )}
                                <h3
                                  className={`font-medium text-sm sm:text-base line-clamp-2 ${
                                    !notification.read
                                      ? "text-gray-900"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {notification.title}
                                </h3>
                              </div>
                              <div className="flex items-center justify-between sm:justify-end space-x-2">
                                <span
                                  className={`text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full border ${getPriorityColor(
                                    notification.priority
                                  )}`}
                                >
                                  {isMobile ? notification.priority.charAt(0).toUpperCase() : notification.priority.toUpperCase()}
                                </span>
                                <div className="flex items-center space-x-1">
                                  <span className="text-xs text-gray-500 whitespace-nowrap">
                                    <Clock size={isMobile ? 10 : 12} className="inline mr-0.5" />
                                    {notification.time}
                                  </span>
                                  <button
                                    onClick={() => toggleStar(notification.id)}
                                    className={`p-0.5 sm:p-1 rounded ${
                                      notification.starred
                                        ? "text-yellow-500 hover:text-yellow-600"
                                        : "text-gray-400 hover:text-gray-600"
                                    }`}
                                  >
                                    <Star
                                      size={isMobile ? 12 : 14}
                                      fill={
                                        notification.starred
                                          ? "currentColor"
                                          : "none"
                                      }
                                    />
                                  </button>
                                  <button className="text-gray-400 hover:text-gray-600 p-0.5 sm:p-1">
                                    <MoreVertical size={isMobile ? 14 : 16} />
                                  </button>
                                </div>
                              </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2 sm:line-clamp-3">
                              {notification.message}
                            </p>

                            {notification.tags && (
                              <div className="flex overflow-x-auto gap-1 sm:gap-2 mb-2 sm:mb-3 pb-1">
                                <span
                                  className={`text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full ${notification.bgColor} ${notification.textColor} flex-shrink-0`}
                                >
                                  {isMobile ? notification.category.charAt(0).toUpperCase() : notification.category}
                                </span>
                                {notification.tags.slice(0, isMobile ? 1 : 2).map((tag, index) => (
                                  <span
                                    key={index}
                                    className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full bg-gray-100 text-gray-600 flex-shrink-0 whitespace-nowrap"
                                  >
                                    {isMobile && tag.length > 6 ? `${tag.substring(0, 6)}...` : tag}
                                  </span>
                                ))}
                                <span className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full bg-gray-100 text-gray-600 flex items-center flex-shrink-0">
                                  {getTypeIcon(notification.type)}
                                  {!isMobile && (
                                    <span className="ml-1">
                                      {notification.type}
                                    </span>
                                  )}
                                </span>
                              </div>
                            )}

                            {notification.metadata && !isMobile && (
                              <div className="text-xs text-gray-500 mb-2 sm:mb-3">
                                {notification.metadata.amount && (
                                  <span className="mr-3">
                                    💰 Rp{" "}
                                    {notification.metadata.amount.toLocaleString(
                                      "id-ID"
                                    )}
                                  </span>
                                )}
                                {notification.metadata.device && (
                                  <span className="mr-3">
                                    📱 {notification.metadata.device}
                                  </span>
                                )}
                              </div>
                            )}

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                              <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto pb-1">
                                {notification.actions?.slice(0, isMobile ? 1 : 2).map((action, index) => (
                                  <button
                                    key={index}
                                    className={`text-xs font-medium ${action.color} hover:underline flex items-center whitespace-nowrap`}
                                  >
                                    {action.icon && !isMobile && (
                                      <span className="mr-1">
                                        {action.icon}
                                      </span>
                                    )}
                                    {action.label}
                                  </button>
                                ))}
                              </div>
                              <div className="flex items-center space-x-2 sm:space-x-3">
                                {!notification.read && (
                                  <button
                                    onClick={() => markAsRead(notification.id)}
                                    className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                                  >
                                    <Check size={isMobile ? 10 : 12} className="mr-1" />
                                    {isMobile ? 'Baca' : 'Tandai Dibaca'}
                                  </button>
                                )}
                                <button
                                  onClick={() => deleteNotification(notification.id)}
                                  className="text-xs text-red-600 hover:text-red-800 flex items-center"
                                >
                                  <Trash2 size={isMobile ? 10 : 12} className="mr-1" />
                                  {isMobile ? 'Hapus' : 'Hapus'}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`bg-white rounded-xl shadow-sm border transition-all duration-200 hover:shadow-md ${
                      !notification.read
                        ? "border-blue-200 bg-blue-50/30"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="p-3 sm:p-4">
                      <div className="flex items-start justify-between mb-2 sm:mb-3">
                        <div className="flex items-center space-x-2">
                          {!notification.read && (
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-500 animate-pulse"></div>
                          )}
                          <div
                            className={`p-1.5 sm:p-2 rounded-lg ${notification.bgColor}`}
                          >
                            {notification.icon}
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => toggleStar(notification.id)}
                            className={`p-0.5 sm:p-1 rounded ${
                              notification.starred
                                ? "text-yellow-500"
                                : "text-gray-400"
                            }`}
                          >
                            <Star
                              size={isMobile ? 12 : 14}
                              fill={
                                notification.starred ? "currentColor" : "none"
                              }
                            />
                          </button>
                        </div>
                      </div>

                      <h3
                        className={`font-medium mb-1 sm:mb-2 line-clamp-2 text-sm sm:text-base ${
                          !notification.read
                            ? "text-gray-900"
                            : "text-gray-700"
                        }`}
                      >
                        {notification.title}
                      </h3>

                      <p className="text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">
                        {notification.message}
                      </p>

                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full border ${getPriorityColor(
                            notification.priority
                          )}`}
                        >
                          {isMobile ? notification.priority.charAt(0).toUpperCase() : notification.priority}
                        </span>
                        <span className="text-xs text-gray-500">
                          {notification.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredNotifications.length > 0 && (
              <div className="mt-4 sm:mt-6 flex justify-center">
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                  Muat Lebih Banyak
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;