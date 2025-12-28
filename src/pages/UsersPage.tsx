import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  MoreVertical,
  UserPlus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Eye,
  X,
  BarChart3,
  DollarSign,
  AlertCircle,
  Save,
  User,
  Building,
  CreditCard,
  Globe,
  Menu,
  ChevronDown,
} from "lucide-react";

interface UserData {
  id: string;
  nama: string;
  email: string;
  telepon: string;
  lokasi: string;
  status: "Aktif" | "Tidak Aktif" | "Ditangguhkan" | "Baru";
  tanggalBergabung: string;
  totalTransaksi: number;
  nilaiTransaksi: number;
  segmentasi: "Premium" | "Reguler" | "Free";
  lastActive: string;
  perusahaan?: string;
  posisi?: string;
  sumber?: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedSegment, setSelectedSegment] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    nama: "",
    email: "",
    telepon: "",
    lokasi: "Jakarta",
    status: "Baru" as "Aktif" | "Tidak Aktif" | "Ditangguhkan" | "Baru",
    segmentasi: "Reguler" as "Premium" | "Reguler" | "Free",
    perusahaan: "",
    posisi: "",
    sumber: "Website",
  });

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    new: 0,
    inactive: 0,
    totalRevenue: 0,
    avgTransaction: 0,
  });

  useEffect(() => {
    const generateDummyUsers = (): UserData[] => {
      const names = [
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
        "Hendra Kurniawan",
        "Putri Ramadhani",
        "Ahmad Fauzi",
        "Lisa Anggraini",
        "Rudi Hartono",
        "Sinta Wati",
        "Bambang Setiawan",
        "Dewi Lestari",
      ];

      const companies = [
        "PT ABC Digital",
        "CV Makmur Jaya",
        "UD Sejahtera",
        "PT Teknologi Maju",
        "CV Karya Bersama",
        "PT Global Solution",
        "CV Mandiri Abadi",
        "PT Inovasi Digital",
      ];

      const positions = [
        "Manager",
        "Supervisor",
        "Staff",
        "Director",
        "Analyst",
        "Developer",
        "Marketing",
        "Sales",
      ];

      const sources = [
        "Website",
        "Mobile App",
        "Referral",
        "Event",
        "Social Media",
      ];

      const cities = [
        "Jakarta",
        "Bandung",
        "Surabaya",
        "Medan",
        "Makassar",
        "Yogyakarta",
      ];
      const statuses: ("Aktif" | "Tidak Aktif" | "Ditangguhkan" | "Baru")[] = [
        "Aktif",
        "Tidak Aktif",
        "Ditangguhkan",
        "Baru",
      ];
      const segments: ("Premium" | "Reguler" | "Free")[] = [
        "Premium",
        "Reguler",
        "Free",
      ];

      const dummyUsers: UserData[] = names.map((name, index) => {
        const totalTransaksi = Math.floor(Math.random() * 50);
        const nilaiTransaksi = Math.floor(Math.random() * 10000000) + 1000000;
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const segmentasi =
          segments[Math.floor(Math.random() * segments.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];
        const company = companies[Math.floor(Math.random() * companies.length)];
        const position =
          positions[Math.floor(Math.random() * positions.length)];
        const source = sources[Math.floor(Math.random() * sources.length)];
        const month = String(Math.floor(Math.random() * 12) + 1).padStart(
          2,
          "0"
        );
        const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0");

        return {
          id: `USR${String(index + 1).padStart(3, "0")}`,
          nama: name,
          email: `${name.toLowerCase().replace(/\s+/g, ".")}@email.com`,
          telepon: `+62 ${String(
            8000000000 + Math.floor(Math.random() * 2000000000)
          )}`,
          lokasi: city,
          status: status,
          tanggalBergabung: `2024-${month}-${day}`,
          totalTransaksi: totalTransaksi,
          nilaiTransaksi: nilaiTransaksi,
          segmentasi: segmentasi,
          lastActive: `${Math.floor(Math.random() * 7)} hari yang lalu`,
          perusahaan: company,
          posisi: position,
          sumber: source,
        };
      });

      return dummyUsers;
    };

    const calculateStats = (usersData: UserData[]) => {
      const total = usersData.length;
      const active = usersData.filter((u) => u.status === "Aktif").length;
      const newUsers = usersData.filter((u) => u.status === "Baru").length;
      const inactive = usersData.filter(
        (u) => u.status === "Tidak Aktif"
      ).length;
      const totalRevenue = usersData.reduce(
        (sum, user) => sum + user.nilaiTransaksi,
        0
      );
      const avgTransaction = totalRevenue / total;

      setStats({
        total,
        active,
        new: newUsers,
        inactive,
        totalRevenue,
        avgTransaction,
      });
    };

    setLoading(true);
    setTimeout(() => {
      const dummyUsers = generateDummyUsers();
      setUsers(dummyUsers);
      setFilteredUsers(dummyUsers);
      calculateStats(dummyUsers);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let result = users;

    if (searchQuery) {
      result = result.filter(
        (user) =>
          user.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.perusahaan?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.posisi?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedStatus !== "all") {
      result = result.filter((user) => user.status === selectedStatus);
    }

    if (selectedSegment !== "all") {
      result = result.filter((user) => user.segmentasi === selectedSegment);
    }

    setFilteredUsers(result);
    setCurrentPage(1); 
  }, [searchQuery, selectedStatus, selectedSegment, users]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
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

  const StatusBadge = ({ status }: { status: string }) => {
    const getStatusConfig = (status: string) => {
      switch (status) {
        case "Aktif":
          return {
            bg: "bg-green-100 dark:bg-green-900/30",
            text: "text-green-800 dark:text-green-300",
            icon: <CheckCircle size={12} />,
          };
        case "Tidak Aktif":
          return {
            bg: "bg-red-100 dark:bg-red-900/30",
            text: "text-red-800 dark:text-red-300",
            icon: <XCircle size={12} />,
          };
        case "Ditangguhkan":
          return {
            bg: "bg-yellow-100 dark:bg-yellow-900/40",
            text: "text-yellow-800 dark:text-yellow-400",
            icon: <AlertCircle size={12} />,
          };
        case "Baru":
          return {
            bg: "bg-blue-100 dark:bg-blue-900/30",
            text: "text-blue-800 dark:text-blue-300",
            icon: <CheckCircle size={12} />,
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
        <span className="sm:hidden">
          {status === "Aktif"
            ? "Aktf"
            : status === "Tidak Aktif"
            ? "Tidak Aktif"
            : status === "Ditangguhkan"
            ? "Ditangguhkan"
            : "Baru"}
        </span>
      </div>
    );
  };

  const SegmentBadge = ({ segment }: { segment: string }) => {
    const getSegmentConfig = (segment: string) => {
      switch (segment) {
        case "Premium":
          return {
            bg: "bg-purple-100 dark:bg-purple-900/30",
            text: "text-purple-800 dark:text-purple-300",
          };
        case "Reguler":
          return {
            bg: "bg-blue-100 dark:bg-blue-900/30",
            text: "text-blue-800 dark:text-blue-300",
          };
        case "Free":
          return {
            bg: "bg-gray-100 dark:bg-gray-800",
            text: "text-gray-800 dark:text-gray-300",
          };
        default:
          return { bg: "bg-gray-100", text: "text-gray-800" };
      }
    };

    const config = getSegmentConfig(segment);

    return (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${config.bg} ${config.text}`}
      >
        <span className="hidden sm:inline">{segment}</span>
        <span className="sm:hidden">
          {segment === "Premium"
            ? "Premium"
            : segment === "Reguler"
            ? "Reguler"
            : "Free"}
        </span>
      </span>
    );
  };

  const handleViewUser = (user: UserData) => {
    setSelectedUser(user);
  };

  const handleEditUser = (user: UserData) => {
    alert(`Edit user: ${user.nama}\n\nFitur edit akan datang segera!`);
  };

  const handleDeleteUser = (user: UserData) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus ${user.nama}?`)) {
      setUsers(users.filter((u) => u.id !== user.id));
      alert(`${user.nama} berhasil dihapus`);
    }
  };

  const generateNewUserId = () => {
    if (users.length === 0) return "USR001";

    const maxId = Math.max(
      ...users.map((user) => parseInt(user.id.replace("USR", "")))
    );
    return `USR${String(maxId + 1).padStart(3, "0")}`;
  };

  const handleAddUser = async () => {
    setIsAddingUser(true);

    if (!newUser.nama || !newUser.email || !newUser.telepon) {
      alert("Nama, email, dan telepon harus diisi!");
      setIsAddingUser(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUser.email)) {
      alert("Format email tidak valid!");
      setIsAddingUser(false);
      return;
    }

    setTimeout(() => {
      const newUserId = generateNewUserId();
      const today = new Date().toISOString().split("T")[0];

      const newUserData: UserData = {
        id: newUserId,
        nama: newUser.nama,
        email: newUser.email,
        telepon: newUser.telepon,
        lokasi: newUser.lokasi,
        status: newUser.status,
        segmentasi: newUser.segmentasi,
        tanggalBergabung: today,
        totalTransaksi: 0,
        nilaiTransaksi: 0,
        lastActive: "Baru ditambahkan",
        perusahaan: newUser.perusahaan,
        posisi: newUser.posisi,
        sumber: newUser.sumber,
      };

      setUsers((prevUsers) => [newUserData, ...prevUsers]);

      setStats((prevStats) => ({
        ...prevStats,
        total: prevStats.total + 1,
        new: prevStats.new + (newUser.status === "Baru" ? 1 : 0),
        active: prevStats.active + (newUser.status === "Aktif" ? 1 : 0),
        totalRevenue: prevStats.totalRevenue + 0,
        avgTransaction: (prevStats.totalRevenue + 0) / (prevStats.total + 1),
      }));

      setNewUser({
        nama: "",
        email: "",
        telepon: "",
        lokasi: "Jakarta",
        status: "Baru",
        segmentasi: "Reguler",
        perusahaan: "",
        posisi: "",
        sumber: "Website",
      });

      setShowAddUserModal(false);
      setIsAddingUser(false);

      alert(`Pengguna ${newUser.nama} berhasil ditambahkan!`);

      if (currentPage === 1) {
        setTimeout(() => {
          const tableContainer = document.querySelector(".overflow-x-auto");
          if (tableContainer) {
            tableContainer.scrollTop = 0;
          }
        }, 100);
      }
    }, 1000);
  };

  const resetForm = () => {
    setNewUser({
      nama: "",
      email: "",
      telepon: "",
      lokasi: "Jakarta",
      status: "Baru",
      segmentasi: "Reguler",
      perusahaan: "",
      posisi: "",
      sumber: "Website",
    });
  };

  const locations = [
    "Jakarta",
    "Bandung",
    "Surabaya",
    "Medan",
    "Makassar",
    "Yogyakarta",
    "Bali",
    "Semarang",
  ];

  const sources = [
    "Website",
    "Mobile App",
    "Referral",
    "Event",
    "Social Media",
    "Email Marketing",
    "Offline Store",
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              Pengguna
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowAddUserModal(true)}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <UserPlus size={18} />
            </button>

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
                  placeholder="Cari pengguna..."
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
                    <option value="Aktif">Aktif</option>
                    <option value="Tidak Aktif">Tidak Aktif</option>
                    <option value="Ditangguhkan">Ditangguhkan</option>
                    <option value="Baru">Baru</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                    Segment
                  </label>
                  <select
                    className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedSegment}
                    onChange={(e) => setSelectedSegment(e.target.value)}
                  >
                    <option value="all">Semua Segment</option>
                    <option value="Premium">Premium</option>
                    <option value="Reguler">Reguler</option>
                    <option value="Free">Free</option>
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
                Total Pengguna
              </div>
              <div className="font-bold text-gray-900 dark:text-white text-sm">
                {stats.total.toLocaleString("id-ID")}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Aktif
              </div>
              <div className="font-medium text-gray-900 dark:text-white text-sm">
                {stats.active}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 py-4 md:px-6 md:py-6 lg:px-4 lg:py-6">
        <div className="hidden md:flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-xl lg:text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <Users className="mr-3 md:mr-2" size={26} />
              Manajemen Pengguna
            </h1>
            <p className="text-sm md:text-sm lg:text-sm text-gray-600 dark:text-gray-400 mt-2 md:mt-1">
              Kelola dan analisis data pengguna Anda
            </p>
          </div>

          <div className="flex items-center space-x-3 md:space-x-2 mt-4 md:mt-0">
            <button
              onClick={() => setShowAddUserModal(true)}
              className="flex items-center space-x-2 px-4 md:px-3 py-2.5 md:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm md:text-sm transition-colors"
            >
              <UserPlus size={18} />
              <span>Tambah Pengguna</span>
            </button>
            <button className="flex items-center space-x-2 px-4 md:px-3 py-2.5 md:py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm md:text-sm transition-colors">
              <Download size={18} />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-xs text-gray-500 dark:text-gray-400">
                  Total
                </p>
                <h3 className="text-base md:text-lg lg:text-lg font-bold text-gray-900 dark:text-white mt-1">
                  {stats.total.toLocaleString("id-ID")}
                </h3>
              </div>
              <div className="p-1.5 md:p-2 lg:p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Users className="text-blue-600 dark:text-blue-400" size={16} />
              </div>
            </div>
            <div className="flex items-center text-xs text-green-600 dark:text-green-400 mt-2">
              <TrendingUp size={10} />
              <span className="ml-1 md:inline lg:inline">+12.5%</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-xs text-gray-500 dark:text-gray-400">
                  Aktif
                </p>
                <h3 className="text-base md:text-lg lg:text-lg font-bold text-gray-900 dark:text-white mt-1">
                  {stats.active}
                </h3>
              </div>
              <div className="p-1.5 md:p-2 lg:p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <CheckCircle
                  className="text-green-600 dark:text-green-400"
                  size={16}
                />
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {((stats.active / stats.total) * 100).toFixed(1)}%
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-xs text-gray-500 dark:text-gray-400">
                  Baru
                </p>
                <h3 className="text base md:text-lg lg:text-lg font-bold text-gray-900 dark:text-white mt-1">
                  {stats.new}
                </h3>
              </div>
              <div className="p-1.5 md:p-2 lg:p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <UserPlus
                  className="text-blue-600 dark:text-blue-400"
                  size={16}
                />
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Bulan ini
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-xs text-gray-500 dark:text-gray-400">
                  Tidak Aktif
                </p>
                <h3 className="text-base md:text-lg lg:text-lg font-bold text-gray-900 dark:text-white mt-1">
                  {stats.inactive}
                </h3>
              </div>
              <div className="p-1.5 md:p-2 lg:p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <XCircle className="text-red-600 dark:text-red-400" size={16} />
              </div>
            </div>
            <div className="flex items-center text-xs text-red-600 dark:text-red-400 mt-2">
              <TrendingDown size={10} />
              <span className="ml-1 md:inline lg:inline">Perhatian</span>
            </div>
          </div>

          <div className="md:hidden col-span-2 space-y-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Pendapatan
                  </p>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mt-1">
                    {formatCurrency(stats.totalRevenue).replace("Rp", "Rp ")}
                  </h3>
                </div>
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <DollarSign
                    className="text-purple-600 dark:text-purple-400"
                    size={20}
                  />
                </div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Dari semua pengguna
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Rata-rata Transaksi
                  </p>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mt-1">
                    {formatCurrency(stats.avgTransaction).replace("Rp", "Rp ")}
                  </h3>
                </div>
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <BarChart3
                    className="text-yellow-600 dark:text-yellow-400"
                    size={20}
                  />
                </div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Per pengguna
              </div>
            </div>
          </div>

          <div className="hidden md:block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-xs text-gray-500 dark:text-gray-400">
                  Total Pendapatan
                </p>
                <h3 className="text-base md:text-lg lg:text-lg font-bold text-gray-900 dark:text-white mt-1">
                  {formatCurrency(stats.totalRevenue).replace("Rp", "Rp ")}
                </h3>
              </div>
              <div className="p-1.5 md:p-2 lg:p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <DollarSign
                  className="text-purple-600 dark:text-purple-400"
                  size={16}
                />
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Dari semua pengguna
            </div>
          </div>

          <div className="hidden md:block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-xs text-gray-500 dark:text-gray-400">
                  Rata-rata Transaksi
                </p>
                <h3 className="text-base md:text-lg lg:text-lg font-bold text-gray-900 dark:text-white mt-1">
                  {formatCurrency(stats.avgTransaction).replace("Rp", "Rp ")}
                </h3>
              </div>
              <div className="p-1.5 md:p-2 lg:p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <BarChart3
                  className="text-yellow-600 dark:text-yellow-400"
                  size={16}
                />
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Per pengguna
            </div>
          </div>
        </div>

        <div className="hidden md:block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 md:p-4 lg:p-4 mt-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-3 lg:gap-3">
            <div className="flex-1">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Cari pengguna berdasarkan nama, email, atau ID..."
                  className="w-full pl-10 pr-4 py-3 md:py-2 lg:py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-3 md:space-x-3 lg:space-x-3">
              <div className="flex items-center space-x-2">
                <Filter size={18} className="text-gray-400" />
                <select
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3 md:px-3 lg:px-3 py-2.5 md:py-2 lg:py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">Semua Status</option>
                  <option value="Aktif">Aktif</option>
                  <option value="Tidak Aktif">Tidak Aktif</option>
                  <option value="Ditangguhkan">Ditangguhkan</option>
                  <option value="Baru">Baru</option>
                </select>
              </div>

              <select
                className="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3 md:px-3 lg:px-3 py-2.5 md:py-2 lg:py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedSegment}
                onChange={(e) => setSelectedSegment(e.target.value)}
              >
                <option value="all">Semua Segment</option>
                <option value="Premium">Premium</option>
                <option value="Reguler">Reguler</option>
                <option value="Free">Free</option>
              </select>
            </div>
          </div>

          <div className="mt-3 flex flex-col md:flex-row md:items-center justify-between text-sm text-gray-600 dark:text-gray-400 gap-1 md:gap-0 lg:gap-0">
            <span>
              Menampilkan {filteredUsers.length} dari {users.length} pengguna
            </span>
            <span className="text-xs md:text-sm lg:text-sm">
              {selectedStatus !== "all" && `Status: ${selectedStatus} • `}
              {selectedSegment !== "all" && `Segment: ${selectedSegment}`}
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden mt-4">
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
            ) : currentUsers.length === 0 ? (
              <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                Tidak ada pengguna yang ditemukan
              </div>
            ) : (
              currentUsers.map((user) => (
                <div
                  key={user.id}
                  className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/30"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-3">
                          <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                            {user.nama.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white text-sm">
                            {user.nama}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                            <Calendar size={10} className="mr-1" />
                            {user.tanggalBergabung}
                          </div>
                        </div>
                      </div>
                      <div>
                        <StatusBadge status={user.status} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                        <Mail size={10} className="mr-2" />
                        <span className="truncate">{user.email}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                        <Phone size={10} className="mr-2" />
                        <span>{user.telepon}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Segment
                        </div>
                        <SegmentBadge segment={user.segmentasi} />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Transaksi
                        </div>
                        <div className="font-medium text-gray-900 dark:text-white text-sm">
                          {user.totalTransaksi} transaksi
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Terakhir: {user.lastActive}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewUser(user)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
                          title="Lihat detail"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => handleEditUser(user)}
                          className="p-1.5 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user)}
                          className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                          title="Hapus"
                        >
                          <Trash2 size={14} />
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
              <div className="p-4 md:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 animate-pulse"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full mr-3"></div>
                            <div>
                              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
                              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                            </div>
                          </div>
                          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                          </div>
                          <div>
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                          <div className="flex space-x-2">
                            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : currentUsers.length === 0 ? (
              <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                Tidak ada pengguna yang ditemukan
              </div>
            ) : (
              <div className="p-4 md:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {currentUsers.map((user) => (
                    <div
                      key={user.id}
                      className="bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:bg-white dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-3">
                            <span className="text-blue-600 dark:text-blue-400 font-medium">
                              {user.nama.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {user.nama}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                              <Calendar size={10} className="mr-1" />
                              {user.tanggalBergabung}
                            </div>
                          </div>
                        </div>
                        <StatusBadge status={user.status} />
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                          <Mail size={12} className="mr-2" />
                          <span className="truncate">{user.email}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Phone size={10} className="mr-2" />
                          {user.telepon}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            Segmentasi
                          </div>
                          <SegmentBadge segment={user.segmentasi} />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            Lokasi
                          </div>
                          <div className="font-medium text-gray-900 dark:text-white text-sm">
                            {user.lokasi}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            Transaksi
                          </div>
                          <div className="font-medium text-gray-900 dark:text-white text-sm">
                            {user.totalTransaksi} transaksi
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            Nilai
                          </div>
                          <div className="font-medium text-gray-900 dark:text-white text-sm">
                            {formatCurrency(user.nilaiTransaksi).replace(
                              "Rp",
                              "Rp"
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Terakhir: {user.lastActive}
                        </div>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleViewUser(user)}
                            className="p-1.5 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded transition-colors"
                            title="Lihat detail"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleEditUser(user)}
                            className="p-1.5 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded transition-colors"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user)}
                            className="p-1.5 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                            title="Hapus"
                          >
                            <Trash2 size={16} />
                          </button>
                          <button className="p-1.5 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="hidden lg:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900/50">
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Pengguna
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Kontak
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Segmentasi
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Transaksi
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
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full mr-3"></div>
                              <div className="space-y-2">
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="space-y-2">
                              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="space-y-2">
                              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                          </td>
                        </tr>
                      ))
                  ) : currentUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center">
                        <div className="text-gray-500 dark:text-gray-400">
                          Tidak ada pengguna yang ditemukan
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-900/30"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-3">
                              <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                                {user.nama.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {user.nama}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                                <Calendar size={10} className="mr-1" />
                                {user.tanggalBergabung}
                              </div>
                              {user.perusahaan && (
                                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                                  <Building size={10} className="mr-1" />
                                  {user.perusahaan}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                              <Mail size={12} className="mr-2" />
                              {user.email}
                            </div>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <Phone size={10} className="mr-2" />
                              {user.telepon}
                            </div>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <MapPin size={10} className="mr-2" />
                              {user.lokasi}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="space-y-2">
                            <StatusBadge status={user.status} />
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Terakhir aktif: {user.lastActive}
                            </div>
                            {user.sumber && (
                              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                <Globe size={10} className="mr-1" />
                                Sumber: {user.sumber}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <SegmentBadge segment={user.segmentasi} />
                          {user.posisi && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {user.posisi}
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <div className="font-medium text-gray-900 dark:text-white">
                              {user.totalTransaksi} transaksi
                            </div>
                            <div className="text-sm text-gray-700 dark:text-gray-300">
                              {formatCurrency(user.nilaiTransaksi).replace(
                                "Rp",
                                "Rp "
                              )}
                            </div>
                            {user.segmentasi === "Premium" && (
                              <div className="text-xs text-purple-600 dark:text-purple-400 flex items-center">
                                <CreditCard size={10} className="mr-1" />
                                Member Premium
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleViewUser(user)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
                              title="Lihat detail"
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              onClick={() => handleEditUser(user)}
                              className="p-1.5 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded transition-colors"
                              title="Edit"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user)}
                              className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                              title="Hapus"
                            >
                              <Trash2 size={14} />
                            </button>
                            <button className="p-1.5 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors">
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
          </div>

          {!loading && filteredUsers.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="text-sm text-gray-700 dark:text-gray-300 text-center md:text-left">
                  Menampilkan {indexOfFirstItem + 1} -{" "}
                  {Math.min(indexOfLastItem, filteredUsers.length)} dari{" "}
                  {filteredUsers.length} pengguna
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
      </div>

      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-3 md:p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Tambah Pengguna Baru
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Isi form berikut untuk menambahkan pengguna baru
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowAddUserModal(false);
                    resetForm();
                  }}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div className="space-y-3 md:space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nama Lengkap *
                      </label>
                      <div className="relative">
                        <User
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={16}
                        />
                        <input
                          type="text"
                          value={newUser.nama}
                          onChange={(e) =>
                            setNewUser({ ...newUser, nama: e.target.value })
                          }
                          className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="Masukkan nama lengkap"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={16}
                        />
                        <input
                          type="email"
                          value={newUser.email}
                          onChange={(e) =>
                            setNewUser({ ...newUser, email: e.target.value })
                          }
                          className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="contoh@email.com"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nomor Telepon *
                      </label>
                      <div className="relative">
                        <Phone
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={16}
                        />
                        <input
                          type="tel"
                          value={newUser.telepon}
                          onChange={(e) =>
                            setNewUser({ ...newUser, telepon: e.target.value })
                          }
                          className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="+62 812 3456 7890"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Lokasi
                      </label>
                      <div className="relative">
                        <MapPin
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={16}
                        />
                        <select
                          value={newUser.lokasi}
                          onChange={(e) =>
                            setNewUser({ ...newUser, lokasi: e.target.value })
                          }
                          className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                          {locations.map((location) => (
                            <option key={location} value={location}>
                              {location}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Perusahaan
                      </label>
                      <div className="relative">
                        <Building
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={16}
                        />
                        <input
                          type="text"
                          value={newUser.perusahaan}
                          onChange={(e) =>
                            setNewUser({
                              ...newUser,
                              perusahaan: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="Nama perusahaan"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Posisi
                      </label>
                      <input
                        type="text"
                        value={newUser.posisi}
                        onChange={(e) =>
                          setNewUser({ ...newUser, posisi: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="Posisi/jabatan"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Status
                      </label>
                      <select
                        value={newUser.status}
                        onChange={(e) =>
                          setNewUser({
                            ...newUser,
                            status: e.target.value as any,
                          })
                        }
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      >
                        <option value="Baru">Baru</option>
                        <option value="Aktif">Aktif</option>
                        <option value="Tidak Aktif">Tidak Aktif</option>
                        <option value="Ditangguhkan">Ditangguhkan</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Segmentasi
                      </label>
                      <select
                        value={newUser.segmentasi}
                        onChange={(e) =>
                          setNewUser({
                            ...newUser,
                            segmentasi: e.target.value as any,
                          })
                        }
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      >
                        <option value="Reguler">Reguler</option>
                        <option value="Premium">Premium</option>
                        <option value="Free">Free</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Sumber Pengguna
                    </label>
                    <div className="relative">
                      <Globe
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={16}
                      />
                      <select
                        value={newUser.sumber}
                        onChange={(e) =>
                          setNewUser({ ...newUser, sumber: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      >
                        {sources.map((source) => (
                          <option key={source} value={source}>
                            {source}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 md:p-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Preview Pengguna Baru:
                    </h4>
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <p>
                        <span className="font-medium">ID:</span>{" "}
                        {generateNewUserId()}
                      </p>
                      <p>
                        <span className="font-medium">Nama:</span>{" "}
                        {newUser.nama || "-"}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span>{" "}
                        {newUser.email || "-"}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Status:</span>
                        <StatusBadge status={newUser.status} />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Segmentasi:</span>
                        <SegmentBadge segment={newUser.segmentasi} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => {
                      setShowAddUserModal(false);
                      resetForm();
                    }}
                    className="px-3 md:px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm"
                    disabled={isAddingUser}
                  >
                    Batal
                  </button>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={resetForm}
                      className="px-3 md:px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm"
                      disabled={isAddingUser}
                    >
                      Reset
                    </button>
                    <button
                      onClick={handleAddUser}
                      disabled={isAddingUser}
                      className="flex items-center space-x-1 md:space-x-2 px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                    >
                      {isAddingUser ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Menambahkan...</span>
                        </>
                      ) : (
                        <>
                          <Save size={14} />
                          <span>Simpan</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-3 md:p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Detail Pengguna
                </h3>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 text-xl md:text-2xl font-bold">
                      {selectedUser.nama.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                      {selectedUser.nama}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                      {selectedUser.email}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <StatusBadge status={selectedUser.status} />
                      <SegmentBadge segment={selectedUser.segmentasi} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div className="space-y-2 md:space-y-3">
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400">
                        ID Pengguna
                      </label>
                      <p className="font-medium text-sm md:text-base">
                        {selectedUser.id}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400">
                        Telepon
                      </label>
                      <p className="font-medium text-sm md:text-base">
                        {selectedUser.telepon}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400">
                        Lokasi
                      </label>
                      <p className="font-medium text-sm md:text-base">
                        {selectedUser.lokasi}
                      </p>
                    </div>
                    {selectedUser.perusahaan && (
                      <div>
                        <label className="text-xs text-gray-500 dark:text-gray-400">
                          Perusahaan
                        </label>
                        <p className="font-medium text-sm md:text-base">
                          {selectedUser.perusahaan}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400">
                        Tanggal Bergabung
                      </label>
                      <p className="font-medium text-sm md:text-base">
                        {selectedUser.tanggalBergabung}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400">
                        Total Transaksi
                      </label>
                      <p className="font-medium text-sm md:text-base">
                        {selectedUser.totalTransaksi} transaksi
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400">
                        Total Nilai
                      </label>
                      <p className="font-medium text-sm md:text-base">
                        {formatCurrency(selectedUser.nilaiTransaksi)}
                      </p>
                    </div>
                    {selectedUser.sumber && (
                      <div>
                        <label className="text-xs text-gray-500 dark:text-gray-400">
                          Sumber
                        </label>
                        <p className="font-medium text-sm md:text-base">
                          {selectedUser.sumber}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-2 md:space-x-3 pt-4 md:pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="px-3 md:px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm"
                  >
                    Tutup
                  </button>
                  <button
                    onClick={() => handleEditUser(selectedUser)}
                    className="px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Edit Pengguna
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
