import React, { useState, useEffect } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  User,
  Check,
  X,
  EyeOff,
  Eye,
  AlertCircle,
  Info,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Trash2,
  Clock,
  Filter,
  MoreVertical,
  CreditCard,
  FileText,
  Users,
  Server,
  LogOut,
  Edit,
  Save,
  Camera,
  Shield,
  Moon,
  Sun,
  BarChart,
  MapPin,
  Upload,
  RefreshCw,
  UploadCloud,
  UserCircle,
  KeyRound,
  Shield as ShieldIcon,
  Globe as GlobeIcon,
  Palette as PaletteIcon,
  CheckSquare,
  Square,
} from "lucide-react";

interface TopNavProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  showFilters: boolean;
  onThemeChange?: (theme: "light" | "dark" | "system") => void;
  hideOnPages?: string[];
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "info" | "warning" | "success" | "error";
  read: boolean;
  category: "system" | "user" | "transaction" | "report";
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "superadmin" | "admin" | "manager" | "user";
  phone: string;
  avatar: string;
  joinedDate: string;
  lastLogin: string;
  location: string;
  notificationsEnabled: boolean;
  twoFactorEnabled: boolean;
  theme: "light" | "dark" | "system";
  bio: string;
}

const TopNav: React.FC<TopNavProps> = ({
  activeFilter,
  setActiveFilter,
  showFilters,
  onThemeChange,
  hideOnPages = [],
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" >("profile");
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [profile, setProfile] = useState<UserProfile>({
    id: "1",
    name: "Admin",
    email: "admin@dashboard.com",
    role: "admin",
    phone: "+62 812-3456-7890",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin&backgroundColor=00897b,00acc1,039be5,1e88e5&hairColor=2c1b18,4a312c,6d4c41",
    joinedDate: "15 Januari 2023",
    lastLogin: new Date().toLocaleString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    location: "Jakarta, Indonesia",
    notificationsEnabled: true,
    twoFactorEnabled: true,
    theme: "light",
    bio: "Administrator sistem dengan pengalaman 3 tahun dalam pengelolaan dashboard analitik.",
  });

  const [editForm, setEditForm] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    location: profile.location,
    bio: profile.bio,
    password: "",
    confirmPassword: "",
    currentPassword: "",
  });

  const [passwordErrors, setPasswordErrors] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    match: false,
  });

  const roles = [
    {
      id: "superadmin",
      label: "Super Admin",
      icon: Shield,
      color: "bg-purple-100 text-purple-800 border border-purple-200",
      description: "Akses penuh ke semua sistem",
      level: 4,
    },
    {
      id: "admin",
      label: "Admin",
      icon: User,
      color: "bg-blue-100 text-blue-800 border border-blue-200",
      description: "Administrator sistem",
      level: 3,
    },
    {
      id: "manager",
      label: "Manager",
      icon: BarChart,
      color: "bg-green-100 text-green-800 border border-green-200",
      description: "Manager departemen",
      level: 2,
    },
    {
      id: "user",
      label: "User",
      icon: Users,
      color: "bg-gray-100 text-gray-800 border border-gray-200",
      description: "Pengguna reguler",
      level: 1,
    },
  ];

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Pengguna Baru Mendaftar",
      message: "Budi Santoso telah bergabung dengan platform Anda",
      time: "5 menit lalu",
      type: "success",
      read: false,
      category: "user",
    },
    {
      id: "2",
      title: "Transaksi Berhasil",
      message: "Pembayaran Rp 1.250.000 telah diproses",
      time: "15 menit lalu",
      type: "success",
      read: false,
      category: "transaction",
    },
    {
      id: "3",
      title: "Peringatan Server",
      message: "Load server mencapai 85% - Pertimbangkan untuk scaling",
      time: "1 jam lalu",
      type: "warning",
      read: false,
      category: "system",
    },
    {
      id: "4",
      title: "Laporan Siap Didownload",
      message: "Laporan performa bulan November sudah tersedia",
      time: "2 jam lalu",
      type: "info",
      read: true,
      category: "report",
    },
    {
      id: "5",
      title: "Koneksi API Error",
      message: "Gagal terhubung ke service payment - Silakan cek logs",
      time: "3 jam lalu",
      type: "error",
      read: true,
      category: "system",
    },
  ]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width <= 1024);
      setIsDesktop(width > 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (editForm.password) {
      setPasswordErrors({
        length: editForm.password.length >= 8,
        uppercase: /[A-Z]/.test(editForm.password),
        lowercase: /[a-z]/.test(editForm.password),
        number: /[0-9]/.test(editForm.password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(editForm.password),
        match: editForm.password === editForm.confirmPassword,
      });
    } else {
      setPasswordErrors({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
        match: false,
      });
    }
  }, [editForm.password, editForm.confirmPassword]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Hanya file gambar yang diperbolehkan (JPG, PNG, GIF)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file maksimal 5MB");
      return;
    }

    setIsUploadingPhoto(true);

    const reader = new FileReader();
    reader.onloadstart = () => {
      setUploadProgress(10);
    };
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(progress);
      }
    };
    reader.onload = (event) => {
      setTimeout(() => {
        if (event.target?.result) {
          setProfile((prev) => ({
            ...prev,
            avatar: event.target!.result as string,
          }));
          setIsUploadingPhoto(false);
          setUploadProgress(100);
          alert("Foto profil berhasil diperbarui!");

          setTimeout(() => setUploadProgress(0), 1000);
        }
      }, 1000);
    };
    reader.onerror = () => {
      setIsUploadingPhoto(false);
      setUploadProgress(0);
      alert("Gagal membaca file. Silakan coba lagi.");
    };
    reader.readAsDataURL(file);
  };

  const handleRandomAvatar = () => {
    const colors = ["00897b", "00acc1", "039be5", "1e88e5", "43a047", "7b1fa2"];
    const hairColors = ["2c1b18", "4a312c", "6d4c41", "a1887f"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomHair = hairColors[Math.floor(Math.random() * hairColors.length)];

    setProfile((prev) => ({
      ...prev,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}&backgroundColor=${randomColor}&hairColor=${randomHair}`,
    }));
    alert("Avatar berhasil diubah!");
  };

  const categories = [
    { id: "all", label: "Semua", count: notifications.length },
    {
      id: "system",
      label: "System",
      count: notifications.filter((n) => n.category === "system").length,
    },
    {
      id: "user",
      label: "User",
      count: notifications.filter((n) => n.category === "user").length,
    },
    {
      id: "transaction",
      label: "Transaksi",
      count: notifications.filter((n) => n.category === "transaction").length,
    },
    {
      id: "report",
      label: "Laporan",
      count: notifications.filter((n) => n.category === "report").length,
    },
  ];

  const filters = [
    { id: "7days", label: "7 Hari" },
    { id: "30days", label: "30 Hari" },
    { id: "1year", label: "1 Tahun" },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filteredNotifications =
    selectedCategory === "all"
      ? notifications
      : notifications.filter((n) => n.category === selectedCategory);

  const getFilterInfo = (filterId: string) => {
    switch (filterId) {
      case "7days":
        return {
          color: "from-green-500 to-emerald-600",
          text: "Data Mingguan",
        };
      case "30days":
        return { color: "from-blue-500 to-cyan-600", text: "Data Bulanan" };
      case "1year":
        return { color: "from-purple-500 to-pink-600", text: "Data Tahunan" };
      default:
        return { color: "from-gray-500 to-gray-600", text: "Data" };
    }
  };

  const getNotificationConfig = (type: string) => {
    switch (type) {
      case "success":
        return {
          icon: (
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle size={isMobile ? 16 : 20} className="text-green-600" />
            </div>
          ),
          bg: "bg-green-50",
          border: "border-green-100",
          iconColor: "text-green-600",
          badgeColor: "bg-green-500",
        };
      case "warning":
        return {
          icon: (
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow-100 flex items-center justify-center">
              <AlertTriangle size={isMobile ? 16 : 20} className="text-yellow-600" />
            </div>
          ),
          bg: "bg-yellow-50",
          border: "border-yellow-100",
          iconColor: "text-yellow-600",
          badgeColor: "bg-yellow-500",
        };
      case "error":
        return {
          icon: (
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertCircle size={isMobile ? 16 : 20} className="text-red-600" />
            </div>
          ),
          bg: "bg-red-50",
          border: "border-red-100",
          iconColor: "text-red-600",
          badgeColor: "bg-red-500",
        };
      default:
        return {
          icon: (
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Info size={isMobile ? 16 : 20} className="text-blue-600" />
            </div>
          ),
          bg: "bg-blue-50",
          border: "border-blue-100",
          iconColor: "text-blue-600",
          badgeColor: "bg-blue-500",
        };
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "system":
        return <Server size={isMobile ? 12 : 14} />;
      case "user":
        return <Users size={isMobile ? 12 : 14} />;
      case "transaction":
        return <CreditCard size={isMobile ? 12 : 14} />;
      case "report":
        return <FileText size={isMobile ? 12 : 14} />;
      default:
        return <Bell size={isMobile ? 12 : 14} />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true);
    setEditForm({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      location: profile.location,
      bio: profile.bio,
      password: "",
      confirmPassword: "",
      currentPassword: "",
    });
  };

  const handleSaveProfile = () => {

    setProfile((prev) => ({
      ...prev,
      name: editForm.name,
      email: editForm.email,
      phone: editForm.phone,
      location: editForm.location,
      bio: editForm.bio,
    }));
    
    setIsEditingProfile(false);
    setEditForm((prev) => ({ 
      ...prev, 
      password: "", 
      confirmPassword: "", 
      currentPassword: "" 
    }));
    
    alert("Profil berhasil diperbarui!");
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    setActiveTab("profile");
    setEditForm({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      location: profile.location,
      bio: profile.bio,
      password: "",
      confirmPassword: "",
      currentPassword: "",
    });
  };

  const toggleNotifications = () => {
    setProfile((prev) => ({
      ...prev,
      notificationsEnabled: !prev.notificationsEnabled,
    }));
  };

  const toggleTwoFactor = () => {
    setProfile((prev) => ({
      ...prev,
      twoFactorEnabled: !prev.twoFactorEnabled,
    }));
  };

  const handleThemeChange = (theme: "light" | "dark" | "system") => {
    setProfile((prev) => ({ ...prev, theme }));
    onThemeChange?.(theme);
  };

  const handleTakePhoto = () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Browser tidak mendukung akses kamera");
      return;
    }

    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
        
        const modal = document.createElement('div');
        modal.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.9);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        `;
        
        const videoContainer = document.createElement('div');
        videoContainer.style.cssText = `
          width: 90%;
          max-width: 500px;
          aspect-ratio: 1;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 20px;
        `;
        
        video.style.cssText = `
          width: 100%;
          height: 100%;
          object-fit: cover;
        `;
        
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = `
          display: flex;
          gap: 16px;
        `;
        
        const captureBtn = document.createElement('button');
        captureBtn.textContent = 'Ambil Foto';
        captureBtn.style.cssText = `
          padding: 12px 24px;
          background: #3B82F6;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
        `;
        
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Batal';
        cancelBtn.style.cssText = `
          padding: 12px 24px;
          background: #6B7280;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
        `;
        
        captureBtn.onclick = () => {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(video, 0, 0);
            const imageData = canvas.toDataURL('image/png');
            
            setProfile((prev) => ({
              ...prev,
              avatar: imageData,
            }));
            
            alert("Foto berhasil diambil!");
          }
          
          stream.getTracks().forEach(track => track.stop());
          document.body.removeChild(modal);
        };
        
        cancelBtn.onclick = () => {
          stream.getTracks().forEach(track => track.stop());
          document.body.removeChild(modal);
        };
        
        videoContainer.appendChild(video);
        buttonContainer.appendChild(captureBtn);
        buttonContainer.appendChild(cancelBtn);
        modal.appendChild(videoContainer);
        modal.appendChild(buttonContainer);
        document.body.appendChild(modal);
      })
      .catch((err) => {
        alert("Gagal mengakses kamera: " + err.message);
      });
  };

  const filterInfo = getFilterInfo(activeFilter);

  const renderEditProfile = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="relative">
            <div className={`${isMobile ? 'w-24 h-24' : 'w-32 h-32'} rounded-xl overflow-hidden border-4 border-white shadow-lg`}>
              <img
                src={profile.avatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              {isUploadingPhoto && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-white text-sm">
                    Mengupload {uploadProgress}%
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => document.getElementById('avatar-upload')?.click()}
              className="absolute -bottom-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
              title="Upload Foto"
            >
              <UploadCloud size={isMobile ? 14 : 16} />
            </button>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Foto Profil</h3>
            <p className="text-sm text-gray-600 mb-3 sm:mb-4">
              Unggah foto baru atau ambil foto langsung dari kamera
            </p>
            
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button
                onClick={() => document.getElementById('avatar-upload')?.click()}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
              >
                <Upload size={isMobile ? 14 : 16} />
                <span>Upload</span>
              </button>
              
              <button
                onClick={handleTakePhoto}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors"
              >
                <Camera size={isMobile ? 14 : 16} />
                <span>Ambil Foto</span>
              </button>
              
              <button
                onClick={handleRandomAvatar}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-sm font-medium transition-colors"
              >
                <RefreshCw size={isMobile ? 14 : 16} />
                <span>Avatar Random</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {activeTab === "profile" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="nama@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+62 812-3456-7890"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lokasi
                </label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Kota, Negara"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio / Deskripsi
              </label>
              <textarea
                value={editForm.bio}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    bio: e.target.value,
                  }))
                }
                rows={3}
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ceritakan tentang diri Anda..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Maksimal 200 karakter
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
        <button
          onClick={handleCancelEdit}
          className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <X size={18} />
          <span>Batal</span>
        </button>
        
        <button
          onClick={handleSaveProfile}
          className="flex-1 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <Save size={18} />
          <span>Simpan Perubahan</span>
        </button>
      </div>
    </div>
  );

  const renderViewProfile = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className={`${isMobile ? 'w-16 h-16' : 'w-20 h-20'} rounded-xl overflow-hidden border-4 border-white shadow-lg`}>
            <img
              src={profile.avatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">{profile.name}</h2>
            <p className="text-sm text-gray-600">{profile.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${roles.find((r) => r.id === profile.role)?.color}`}>
                {roles.find((r) => r.id === profile.role)?.label}
              </span>
              <span className="text-xs text-gray-500 flex items-center">
                <MapPin size={10} className="mr-1" />
                {profile.location}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={handleEditProfile}
          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          title="Edit Profil"
        >
          <Edit size={isMobile ? 16 : 18} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-xs text-gray-500">Nama Lengkap</p>
          <p className="font-medium text-sm">{profile.name}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-gray-500">Email</p>
          <p className="font-medium text-sm">{profile.email}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-gray-500">Telepon</p>
          <p className="font-medium text-sm">{profile.phone}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-gray-500">Lokasi</p>
          <p className="font-medium text-sm">{profile.location}</p>
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-xs text-gray-500">Bio / Deskripsi</p>
        <p className="font-medium text-sm text-gray-900">{profile.bio}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-xl">
        <div className="text-center">
          <p className="text-lg sm:text-xl font-bold text-gray-900">24</p>
          <p className="text-xs text-gray-500">Projects</p>
        </div>
        <div className="text-center">
          <p className="text-lg sm:text-xl font-bold text-gray-900">156</p>
          <p className="text-xs text-gray-500">Tasks</p>
        </div>
        <div className="text-center">
          <p className="text-lg sm:text-xl font-bold text-gray-900">89%</p>
          <p className="text-xs text-gray-500">Completed</p>
        </div>
        <div className="text-center">
          <p className="text-lg sm:text-xl font-bold text-gray-900">2.5y</p>
          <p className="text-xs text-gray-500">Experience</p>
        </div>
      </div>

      <button
        onClick={() => {
          if (window.confirm("Yakin ingin keluar dari akun?")) {
            setIsProfileOpen(false);
          }
        }}
        className="w-full px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
      >
        <LogOut size={18} />
        <span>Keluar</span>
      </button>
    </div>
  );

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-gray-200/80">
      <div className="px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {isDesktop && ( 
            <>
              {showFilters ? (
                <div className="flex items-center space-x-3">
                  <div
                    className={`h-9 w-1.5 rounded-full bg-gradient-to-b ${filterInfo.color}`}
                  ></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {filterInfo.text}
                    </p>
                    <p className="text-xs text-gray-500">Filter aktif</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <div className="h-9 w-1.5 rounded-full bg-gradient-to-b from-blue-500 to-cyan-600"></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Dashboard Overview
                    </p>
                    <p className="text-xs text-gray-500">Analitika Pro</p>
                  </div>
                </div>
              )}
            </>
          )}

          <div className="flex items-center space-x-2 sm:space-x-4 ml-auto">
            {showFilters && isDesktop && (
              <div className="hidden lg:flex items-center space-x-1 bg-gray-100 p-1 rounded-xl">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    className={`
                      px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                      ${
                        activeFilter === filter.id
                          ? `bg-white text-gray-900 shadow-sm border border-gray-300`
                          : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                      }
                    `}
                    onClick={() => setActiveFilter(filter.id)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            )}

            {isDesktop && (
              <div className="hidden md:block">
                <div className="relative">
                  <Search
                    className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Cari dashboard..."
                    className="pl-11 pr-4 py-2.5 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white w-64 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="relative">
              <button
                className="relative p-2 sm:p-2.5 rounded-xl hover:bg-gray-100 transition-colors group"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              >
                <div className="relative">
                  <Bell
                    size={isMobile ? 20 : (isTablet ? 20 : 22)}
                    className="text-gray-600 group-hover:text-gray-900"
                  />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-4 h-4 sm:min-w-5 sm:h-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center px-1 animate-pulse">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </div>
              </button>

              {isNotificationsOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsNotificationsOpen(false)}
                  />
                  <div className={`
                    ${isMobile 
                      ? 'fixed inset-x-4 top-20 w-auto max-w-[calc(100vw-2rem)] mx-auto max-h-[70vh]' 
                      : 'absolute right-0 mt-2 w-[420px]'
                    } 
                    bg-white rounded-2xl shadow-2xl border border-gray-300/50 overflow-hidden z-50
                  `}>
                    <div className="p-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-xl bg-white/10 flex items-center justify-center`}>
                            <Bell size={isMobile ? 18 : (isTablet ? 20 : 24)} />
                          </div>
                          <div>
                            <h3 className={`${isMobile || isTablet ? 'text-base' : 'text-lg'} font-bold`}>Notifikasi</h3>
                            <p className="text-xs sm:text-sm text-gray-300">
                              {unreadCount} belum dibaca • {notifications.length} total
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={markAllAsRead}
                            disabled={unreadCount === 0}
                            className={`${isMobile || isTablet ? 'w-8 h-8' : 'w-10 h-10'} rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
                            title="Tandai semua sudah dibaca"
                          >
                            <Check size={isMobile || isTablet ? 16 : 20} />
                          </button>
                          <button
                            onClick={clearAllNotifications}
                            disabled={notifications.length === 0}
                            className={`${isMobile || isTablet ? 'w-8 h-8' : 'w-10 h-10'} rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
                            title="Hapus semua notifikasi"
                          >
                            <Trash2 size={isMobile || isTablet ? 16 : 20} />
                          </button>
                        </div>
                      </div>

                      <div className="flex space-x-1 overflow-x-auto pb-1">
                        {categories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`
                              flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all
                              ${
                                selectedCategory === category.id
                                  ? "bg-white text-gray-900"
                                  : "bg-white/10 hover:bg-white/20 text-white"
                              }
                            `}
                          >
                            <span className="flex-shrink-0">
                              {getCategoryIcon(category.id)}
                            </span>
                            <span>{category.label}</span>
                            <span
                              className={`text-xs px-1.5 py-0.5 rounded-full ${
                                selectedCategory === category.id
                                  ? "bg-gray-100"
                                  : "bg-white/20"
                              }`}
                            >
                              {category.count}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className={`overflow-y-auto ${isMobile || isTablet ? 'max-h-[50vh]' : 'max-h-[480px]'}`}>
                      {filteredNotifications.length === 0 ? (
                        <div className="p-6 text-center">
                          <div className="w-14 h-14 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
                            <Bell size={isMobile || isTablet ? 22 : 28} className="text-gray-400" />
                          </div>
                          <p className="text-gray-900 font-medium mb-1">
                            Tidak ada notifikasi
                          </p>
                          <p className="text-gray-500 text-sm">
                            Semua notifikasi sudah dibaca
                          </p>
                        </div>
                      ) : (
                        filteredNotifications.map((notification) => {
                          const config = getNotificationConfig(notification.type);
                          return (
                            <div
                              key={notification.id}
                              className={`p-3 sm:p-4 border-b border-gray-100 transition-colors ${
                                !notification.read
                                  ? "bg-blue-50/50"
                                  : "hover:bg-gray-50"
                              }`}
                            >
                              <div className="flex space-x-2 sm:space-x-3">
                                {config.icon}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between mb-1">
                                    <div className="flex items-center space-x-2">
                                      {!notification.read && (
                                        <div
                                          className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${config.badgeColor} animate-pulse`}
                                        ></div>
                                      )}
                                      <h4
                                        className={`font-semibold ${isMobile || isTablet ? 'text-sm' : ''} ${
                                          notification.read
                                            ? "text-gray-700"
                                            : "text-gray-900"
                                        }`}
                                      >
                                        {notification.title}
                                      </h4>
                                    </div>
                                    <div className="flex items-center space-x-1.5">
                                      <span className="text-xs text-gray-500 whitespace-nowrap">
                                        <Clock
                                          size={isMobile || isTablet ? 10 : 12}
                                          className="inline mr-1"
                                        />
                                        {notification.time}
                                      </span>
                                      <button className="text-gray-400 hover:text-gray-600">
                                        <MoreVertical size={isMobile || isTablet ? 14 : 16} />
                                      </button>
                                    </div>
                                  </div>

                                  <p className={`${isMobile || isTablet ? 'text-xs' : 'text-sm'} text-gray-600 mb-2 sm:mb-3 line-clamp-2`}>
                                    {notification.message}
                                  </p>

                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                      <span
                                        className={`text-xs px-2 py-1 rounded-full flex items-center ${
                                          notification.category === "system"
                                            ? "bg-blue-100 text-blue-800"
                                            : notification.category === "user"
                                            ? "bg-green-100 text-green-800"
                                            : notification.category === "transaction"
                                            ? "bg-purple-100 text-purple-800"
                                            : "bg-yellow-100 text-yellow-800"
                                        }`}
                                      >
                                        <span className="mr-1">
                                          {getCategoryIcon(notification.category)}
                                        </span>
                                        <span>
                                          {
                                            categories.find(
                                              (c) => c.id === notification.category
                                            )?.label
                                          }
                                        </span>
                                      </span>
                                    </div>

                                    <div className="flex items-center space-x-1">
                                      {!notification.read && (
                                        <button
                                          onClick={() => markAsRead(notification.id)}
                                          className="px-2 py-1 text-xs font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors flex items-center"
                                        >
                                          <Check size={isMobile || isTablet ? 10 : 12} className="mr-1" />
                                          {isMobile || isTablet ? 'Baca' : 'Tandai Baca'}
                                        </button>
                                      )}
                                      <button
                                        onClick={() => deleteNotification(notification.id)}
                                        className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Hapus notifikasi"
                                      >
                                        <X size={isMobile || isTablet ? 12 : 14} />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>

                    {notifications.length > 0 && (
                      <div className="p-3 sm:p-4 border-t border-gray-200 bg-gray-50/50">
                        <div className="flex items-center justify-between">
                          <a
                            href="/notifications"
                            className="text-xs sm:text-sm font-medium text-gray-700 hover:text-blue-600 flex items-center transition-colors"
                          >
                            {isMobile || isTablet ? 'Semua Notifikasi' : 'Buka halaman notifikasi'}
                            <ExternalLink size={isMobile || isTablet ? 12 : 14} className="ml-1.5" />
                          </a>
                          <div className="text-xs text-gray-500 flex items-center">
                            <Filter size={isMobile || isTablet ? 10 : 12} className="mr-1" />
                            {filteredNotifications.length} dari {notifications.length}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="relative">
              <button
                className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                {isMobile && (
                  <ChevronDown size={16} className="text-gray-400" />
                )}

                {isDesktop && (
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-gray-900 truncate max-w-[120px]">
                      {profile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {roles.find((r) => r.id === profile.role)?.label}
                    </p>
                  </div>
                )}

                <div className={`${isMobile ? 'w-8 h-8' : isTablet ? 'w-9 h-9' : 'w-10 h-10'} rounded-xl overflow-hidden border-2 border-white shadow-sm`}>
                  <img
                    src={profile.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {isDesktop && (
                  <ChevronDown size={16} className="text-gray-400" />
                )}
              </button>

              {isProfileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <div className={`
                    ${isMobile 
                      ? 'fixed inset-x-4 top-20 w-auto max-w-[calc(100vw-2rem)] mx-auto max-h-[80vh]' 
                      : isTablet
                      ? 'fixed inset-x-8 top-20 w-auto max-w-[calc(100vw-4rem)] mx-auto max-h-[80vh]'
                      : 'absolute right-0 mt-2 w-[480px] sm:w-[520px]'
                    } 
                    max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-gray-300/50 overflow-hidden z-50 flex flex-col
                  `}>

                    <div className={`overflow-y-auto ${isMobile ? 'max-h-[50vh] p-3 sm:p-4' : isTablet ? 'max-h-[60vh] p-4' : 'max-h-[500px] p-4 sm:p-6'}`}>
                      {isEditingProfile ? renderEditProfile() : renderViewProfile()}
                    </div>

                    {!isEditingProfile && (
                      <div className="p-3 sm:p-4 border-t border-gray-200 bg-gray-50">
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {showFilters && isMobile && (
        <div className="px-3 pb-3">
          <div className="flex items-center justify-center space-x-2 overflow-x-auto">
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`
                  flex-shrink-0 px-3 py-2 text-xs font-medium rounded-lg transition-all
                  ${
                    activeFilter === filter.id
                      ? `bg-gradient-to-r ${getFilterInfo(filter.id).color} text-white shadow-md`
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }
                `}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default TopNav;