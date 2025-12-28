import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  ChevronLeft,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  User,
  Users,
  UserPlus,
  Shield,
  CheckCircle,
  XCircle,
  ChevronDown,
  ArrowUpDown,
  Mail as MailIcon,
  Smartphone,
  Globe,
  Clock,
  Star,
  Award,
  Activity,
  TrendingUp,
  BarChart,
  CreditCard,
  FileText,
  Settings,
  Bell,
  Lock,
  Unlock,
  Plus,
  RefreshCw,
  ExternalLink,
  UserCheck,
  UserX,
  Key,
  Database,
  HardDrive,
  ShieldCheck,
  AlertTriangle,
  X,
  Menu,
  ChevronRight,
} from 'lucide-react';

interface UserType {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'superadmin' | 'admin' | 'manager' | 'user' | 'viewer';
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  joinDate: string;
  lastLogin: string;
  location: string;
  avatar: string;
  department?: string;
  totalOrders: number;
  totalSpent: number;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  tags: string[];
}

const AllUsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserType[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'joinDate' | 'totalSpent'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    pending: 0,
    admins: 0,
  });

  const isMobile = window.innerWidth < 768;
  const itemsPerPage = isMobile ? 5 : 10;

  useEffect(() => {
    const generateUsers = () => {
      const sampleUsers: UserType[] = [];
      const names = [
        'Ahmad Rizki', 'Budi Santoso', 'Citra Dewi', 'Doni Prasetyo', 'Eka Wulandari',
        'Fajar Nugroho', 'Gita Permata', 'Hendra Wijaya', 'Indah Sari', 'Joko Purnomo',
        'Kartika Putri', 'Luki Hermawan', 'Maya Indah', 'Nina Kusuma', 'Oki Setiawan',
        'Putri Ayu', 'Rudi Hartono', 'Sari Mulyani', 'Tono Wijaya', 'Umi Fatimah',
        'Vina Anggraini', 'Wahyu Pratama', 'Xena Amelia', 'Yoga Saputra', 'Zahra Azizah'
      ];
      
      const departments = [
        'IT', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Support', 'Product', 'Design'
      ];

      const locations = [
        'Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang', 
        'Makassar', 'Denpasar', 'Yogyakarta', 'Malang', 'Palembang'
      ];

      const tagsList = [
        ['VIP', 'Premium'], ['New', 'Trial'], ['Beta', 'Tester'], 
        ['Enterprise'], ['Small Business'], ['Personal']
      ];

      for (let i = 0; i < 100; i++) {
        const name = names[Math.floor(Math.random() * names.length)];
        const firstName = name.split(' ')[0].toLowerCase();
        const lastName = name.split(' ')[1]?.toLowerCase() || '';
        
        const roles: UserType['role'][] = ['user', 'user', 'user', 'manager', 'admin', 'superadmin', 'viewer'];
        const statuses: UserType['status'][] = ['active', 'active', 'active', 'inactive', 'pending', 'suspended'];
        
        const role = roles[Math.floor(Math.random() * roles.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        
        const joinDate = new Date();
        joinDate.setDate(joinDate.getDate() - Math.floor(Math.random() * 365));
        
        const lastLogin = new Date();
        lastLogin.setDate(lastLogin.getDate() - Math.floor(Math.random() * 30));

        sampleUsers.push({
          id: `USER${String(i + 1).padStart(3, '0')}`,
          name,
          email: `${firstName}.${lastName}${i}@example.com`,
          phone: `+62 ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
          role,
          status,
          joinDate: joinDate.toLocaleDateString('id-ID', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          lastLogin: lastLogin.toLocaleDateString('id-ID', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          location: locations[Math.floor(Math.random() * locations.length)],
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}&backgroundColor=00897b,00acc1,039be5,1e88e5`,
          department: departments[Math.floor(Math.random() * departments.length)],
          totalOrders: Math.floor(Math.random() * 100),
          totalSpent: Math.floor(Math.random() * 10000000),
          emailVerified: Math.random() > 0.2,
          twoFactorEnabled: Math.random() > 0.7,
          tags: tagsList[Math.floor(Math.random() * tagsList.length)]
        });
      }

      return sampleUsers;
    };

    setIsLoading(true);
    setTimeout(() => {
      const generatedUsers = generateUsers();
      setUsers(generatedUsers);
      setFilteredUsers(generatedUsers);
      updateStats(generatedUsers);
      setIsLoading(false);
    }, 1000);
  }, []);

  const updateStats = (userList: UserType[]) => {
    setStats({
      total: userList.length,
      active: userList.filter(u => u.status === 'active').length,
      inactive: userList.filter(u => u.status === 'inactive').length,
      pending: userList.filter(u => u.status === 'pending').length,
      admins: userList.filter(u => u.role === 'admin' || u.role === 'superadmin').length,
    });
  };

  useEffect(() => {
    let filtered = [...users];

    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.includes(searchQuery) ||
        user.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedRole !== 'all') {
      filtered = filtered.filter(user => user.role === selectedRole);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(user => user.status === selectedStatus);
    }

    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === 'joinDate') {
        return sortOrder === 'asc' 
          ? new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime()
          : new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
      } else if (sortBy === 'totalSpent') {
        return sortOrder === 'asc' 
          ? a.totalSpent - b.totalSpent
          : b.totalSpent - a.totalSpent;
      }
      return 0;
    });

    setFilteredUsers(filtered);
    updateStats(filtered);
  }, [users, searchQuery, selectedRole, selectedStatus, sortBy, sortOrder]);

  const roles = [
    { id: 'all', label: 'Semua', color: 'bg-gray-100 text-gray-800' },
    { id: 'superadmin', label: 'Super Admin', color: 'bg-purple-100 text-purple-800' },
    { id: 'admin', label: 'Admin', color: 'bg-blue-100 text-blue-800' },
    { id: 'manager', label: 'Manager', color: 'bg-green-100 text-green-800' },
    { id: 'user', label: 'User', color: 'bg-gray-100 text-gray-800' },
    { id: 'viewer', label: 'Viewer', color: 'bg-yellow-100 text-yellow-800' },
  ];

  const statuses = [
    { id: 'all', label: 'Semua', color: 'bg-gray-100', dot: 'bg-gray-400' },
    { id: 'active', label: 'Aktif', color: 'bg-green-100', dot: 'bg-green-500' },
    { id: 'inactive', label: 'Nonaktif', color: 'bg-gray-100', dot: 'bg-gray-400' },
    { id: 'pending', label: 'Pending', color: 'bg-yellow-100', dot: 'bg-yellow-500' },
    { id: 'suspended', label: 'Ditangguhkan', color: 'bg-red-100', dot: 'bg-red-500' },
  ];

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      const currentPageUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
      setSelectedUsers(currentPageUsers.map(user => user.id));
    }
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleDeleteUser = (userId: string) => {
    setUserToDelete(userId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(prev => prev.filter(user => user.id !== userToDelete));
      setSelectedUsers(prev => prev.filter(id => id !== userToDelete));
      setShowDeleteConfirm(false);
      setUserToDelete(null);
    }
  };

  const handleEditUser = (user: UserType) => {
    setSelectedUser(user);
    setShowEditUserModal(true);
  };

  const handleStatusChange = (userId: string, newStatus: UserType['status']) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
  };

  const handleRoleChange = (userId: string, newRole: UserType['role']) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  const handleBulkAction = (action: 'activate' | 'deactivate' | 'delete' | 'export') => {
    switch (action) {
      case 'activate':
        setUsers(prev =>
          prev.map(user =>
            selectedUsers.includes(user.id) ? { ...user, status: 'active' } : user
          )
        );
        setSelectedUsers([]);
        break;
      case 'deactivate':
        setUsers(prev =>
          prev.map(user =>
            selectedUsers.includes(user.id) ? { ...user, status: 'inactive' } : user
          )
        );
        setSelectedUsers([]);
        break;
      case 'delete':
        setUsers(prev => prev.filter(user => !selectedUsers.includes(user.id)));
        setSelectedUsers([]);
        break;
      case 'export':
        alert(`Mengekspor ${selectedUsers.length} pengguna...`);
        setSelectedUsers([]);
        break;
    }
  };

  const getStatusColor = (status: UserType['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: UserType['role']) => {
    switch (role) {
      case 'superadmin': return <Shield size={isMobile ? 12 : 14} />;
      case 'admin': return <UserCheck size={isMobile ? 12 : 14} />;
      case 'manager': return <BarChart size={isMobile ? 12 : 14} />;
      case 'user': return <User size={isMobile ? 12 : 14} />;
      case 'viewer': return <Eye size={isMobile ? 12 : 14} />;
      default: return <User size={isMobile ? 12 : 14} />;
    }
  };

  const getStatusIcon = (status: UserType['status']) => {
    switch (status) {
      case 'active': return <CheckCircle size={isMobile ? 12 : 14} />;
      case 'inactive': return <XCircle size={isMobile ? 12 : 14} />;
      case 'pending': return <Clock size={isMobile ? 12 : 14} />;
      case 'suspended': return <AlertTriangle size={isMobile ? 12 : 14} />;
      default: return <XCircle size={isMobile ? 12 : 14} />;
    }
  };

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'user' as UserType['role'],
    department: 'IT',
    location: 'Jakarta'
  });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      alert('Nama dan email harus diisi');
      return;
    }

    const newUserObj: UserType = {
      id: `USER${String(users.length + 1).padStart(3, '0')}`,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      status: 'pending',
      joinDate: new Date().toLocaleDateString('id-ID', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      lastLogin: 'Belum pernah login',
      location: newUser.location,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newUser.name}&backgroundColor=00897b,00acc1,039be5,1e88e5`,
      department: newUser.department,
      totalOrders: 0,
      totalSpent: 0,
      emailVerified: false,
      twoFactorEnabled: false,
      tags: ['New']
    };

    setUsers(prev => [newUserObj, ...prev]);
    setNewUser({
      name: '',
      email: '',
      phone: '',
      role: 'user',
      department: 'IT',
      location: 'Jakarta'
    });
    setShowAddUserModal(false);
    alert('Pengguna berhasil ditambahkan!');
  };

  const formatDateForMobile = (date: string) => {
    if (!isMobile) return date;
    const d = new Date(date);
    return d.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatPhoneForMobile = (phone: string) => {
    if (!isMobile) return phone;
    const numbers = phone.replace(/\D/g, '');
    return numbers.slice(-8);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-3 md:p-6">
      <div className="max-w-7xl mx-auto">
        {isMobile && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <button
                  onClick={() => navigate('/')}
                  className="p-1.5 rounded-lg bg-white hover:bg-gray-100 transition-colors shadow-sm border border-gray-200 mr-2"
                  title="Kembali"
                >
                  <ChevronLeft size={18} />
                </button>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">
                    Semua Pengguna
                  </h1>
                  <p className="text-xs text-gray-600">
                    {stats.total} pengguna total
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="p-1.5 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {isFilterOpen ? <X size={18} /> : <Filter size={18} />}
                </button>
                <button
                  onClick={() => setShowAddUserModal(true)}
                  className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <UserPlus size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-white rounded-lg p-2 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500">Total</div>
                    <div className="font-bold text-gray-900 text-sm">
                      {stats.total}
                    </div>
                  </div>
                  <div className="p-1 bg-blue-100 rounded">
                    <Users size={14} className="text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-2 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500">Aktif</div>
                    <div className="font-bold text-green-600 text-sm">
                      {stats.active}
                    </div>
                  </div>
                  <div className="p-1 bg-green-100 rounded">
                    <CheckCircle size={14} className="text-green-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-2 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500">Admin</div>
                    <div className="font-bold text-purple-600 text-sm">
                      {stats.admins}
                    </div>
                  </div>
                  <div className="p-1 bg-purple-100 rounded">
                    <Shield size={14} className="text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mb-3">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Cari pengguna..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {isFilterOpen && (
              <div className="bg-white rounded-lg border border-gray-200 p-3 mb-3">
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Role</label>
                    <select
                      className="w-full px-2 py-1.5 bg-white border border-gray-300 rounded-lg text-xs"
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                    >
                      <option value="all">Semua Role</option>
                      <option value="superadmin">Super Admin</option>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="user">User</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Status</label>
                    <select
                      className="w-full px-2 py-1.5 bg-white border border-gray-300 rounded-lg text-xs"
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      <option value="all">Semua Status</option>
                      <option value="active">Aktif</option>
                      <option value="inactive">Nonaktif</option>
                      <option value="pending">Pending</option>
                      <option value="suspended">Ditangguhkan</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <button
                    onClick={() => handleBulkAction('activate')}
                    disabled={selectedUsers.length === 0}
                    className="w-full flex items-center space-x-2 p-1.5 text-xs text-green-600 hover:bg-green-50 rounded disabled:opacity-50"
                  >
                    <CheckCircle size={12} />
                    <span>Aktifkan Terpilih</span>
                  </button>
                  <button
                    onClick={() => handleBulkAction('delete')}
                    disabled={selectedUsers.length === 0}
                    className="w-full flex items-center space-x-2 p-1.5 text-xs text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
                  >
                    <Trash2 size={12} />
                    <span>Hapus Terpilih</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {!isMobile && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/')}
                  className="p-2 rounded-lg bg-white hover:bg-gray-100 transition-colors shadow-sm border border-gray-200"
                  title="Kembali ke Dashboard"
                >
                  <ChevronLeft size={20} />
                </button>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Manajemen Pengguna
                  </h1>
                  <p className="text-gray-600">
                    Kelola semua pengguna sistem Anda di satu tempat
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm border border-gray-200"
                >
                  <Download size={18} />
                  <span>Ekspor</span>
                  <ChevronDown size={16} />
                </button>
                <button
                  onClick={() => setShowAddUserModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <UserPlus size={18} />
                  <span>Tambah Pengguna</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Pengguna</p>
                    <p className="text-2xl font-bold">{stats.total}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users size={24} className="text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Aktif</p>
                    <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CheckCircle size={24} className="text-green-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Admin</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.admins}</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Shield size={24} className="text-purple-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Clock size={24} className="text-yellow-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Nonaktif</p>
                    <p className="text-2xl font-bold text-gray-600">{stats.inactive}</p>
                  </div>
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <UserX size={24} className="text-gray-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
          {!isMobile && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sticky top-6">
                <div className="mb-6">
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="text"
                      placeholder="Cari pengguna..."
                      className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Role</h3>
                  <div className="space-y-2">
                    {roles.map((role) => (
                      <button
                        key={role.id}
                        onClick={() => setSelectedRole(role.id)}
                        className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                          selectedRole === role.id
                            ? "bg-blue-50 text-blue-700"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${role.color}`}>
                            {role.label}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {users.filter(u => role.id === 'all' || u.role === role.id).length}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Status</h3>
                  <div className="space-y-2">
                    {statuses.map((status) => (
                      <button
                        key={status.id}
                        onClick={() => setSelectedStatus(status.id)}
                        className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                          selectedStatus === status.id
                            ? "bg-blue-50 text-blue-700"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${status.dot}`}></div>
                          <span>{status.label}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {users.filter(u => status.id === 'all' || u.status === status.id).length}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Aksi Massal</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleBulkAction('activate')}
                      disabled={selectedUsers.length === 0}
                      className="w-full flex items-center space-x-2 p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CheckCircle size={16} />
                      <span>Aktifkan Terpilih</span>
                    </button>
                    <button
                      onClick={() => handleBulkAction('deactivate')}
                      disabled={selectedUsers.length === 0}
                      className="w-full flex items-center space-x-2 p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <XCircle size={16} />
                      <span>Nonaktifkan Terpilih</span>
                    </button>
                    <button
                      onClick={() => handleBulkAction('delete')}
                      disabled={selectedUsers.length === 0}
                      className="w-full flex items-center space-x-2 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 size={16} />
                      <span>Hapus Terpilih</span>
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Urutkan</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setSortBy('name');
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                      }}
                      className="w-full flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <span>Nama</span>
                      <ArrowUpDown size={14} />
                    </button>
                    <button
                      onClick={() => {
                        setSortBy('joinDate');
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                      }}
                      className="w-full flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <span>Tanggal Bergabung</span>
                      <ArrowUpDown size={14} />
                    </button>
                    <button
                      onClick={() => {
                        setSortBy('totalSpent');
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                      }}
                      className="w-full flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <span>Total Pengeluaran</span>
                      <ArrowUpDown size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className={`${isMobile ? '' : 'lg:col-span-3'}`}>
            {!isMobile && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                        onChange={handleSelectAll}
                        className="rounded"
                      />
                      <span className="text-sm text-gray-600">
                        {selectedUsers.length} terpilih dari {filteredUsers.length} pengguna
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-sm text-gray-500">
                      Halaman {currentPage} dari {totalPages}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isMobile ? (
              <div>
                {paginatedUsers.length === 0 ? (
                  <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                    <User size={36} className="mx-auto text-gray-300 mb-3" />
                    <h3 className="font-medium text-gray-900 mb-1">
                      Tidak ada pengguna ditemukan
                    </h3>
                    <p className="text-sm text-gray-600">
                      {searchQuery
                        ? "Coba ubah pencarian Anda"
                        : "Tidak ada pengguna dalam daftar"}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {paginatedUsers.map((user) => (
                      <div key={user.id} className="bg-white rounded-lg border border-gray-200 p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-8 h-8 rounded-lg mr-2"
                            />
                            <div>
                              <div className="font-medium text-gray-900 text-sm">
                                {user.name}
                              </div>
                              <div className="text-xs text-gray-500 flex items-center">
                                <MailIcon size={10} className="mr-1" />
                                <span className="truncate">{user.email}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => handleEditUser(user)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <div>
                            <div className="text-xs text-gray-500">Role</div>
                            <div className="flex items-center space-x-1">
                              {getRoleIcon(user.role)}
                              <span className="text-xs font-medium capitalize">
                                {user.role === 'superadmin' ? 'Super Admin' : 
                                 user.role === 'admin' ? 'Admin' : 
                                 user.role === 'manager' ? 'Manager' : 
                                 user.role === 'viewer' ? 'Viewer' : 'User'}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Status</div>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(user.status)}
                              <span className="text-xs font-medium">
                                {user.status === 'active' ? 'Aktif' : 
                                 user.status === 'inactive' ? 'Nonaktif' : 
                                 user.status === 'pending' ? 'Pending' : 
                                 'Ditangguhkan'}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <div className="text-xs text-gray-500">
                            Bergabung: {formatDateForMobile(user.joinDate)}
                          </div>
                          <div className="text-xs text-gray-500">
                            ID: {user.id}
                          </div>
                        </div>
                        
                        <div className="flex items-center mt-2">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleSelectUser(user.id)}
                            className="rounded mr-2"
                          />
                          <span className="text-xs text-gray-600">Pilih</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3 px-4 text-left">
                          <input
                            type="checkbox"
                            checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                            onChange={handleSelectAll}
                            className="rounded"
                          />
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Pengguna</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Role</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Status</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Bergabung</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {paginatedUsers.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 px-4 text-center">
                            <User size={48} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                              Tidak ada pengguna ditemukan
                            </h3>
                            <p className="text-gray-600">
                              {searchQuery
                                ? "Tidak ada pengguna yang cocok dengan pencarian Anda"
                                : "Coba ubah filter pencarian"}
                            </p>
                          </td>
                        </tr>
                      ) : (
                        paginatedUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-4">
                              <input
                                type="checkbox"
                                checked={selectedUsers.includes(user.id)}
                                onChange={() => handleSelectUser(user.id)}
                                className="rounded"
                              />
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={user.avatar}
                                  alt={user.name}
                                  className="w-10 h-10 rounded-lg"
                                />
                                <div>
                                  <div className="font-medium text-gray-900">{user.name}</div>
                                  <div className="text-sm text-gray-500 flex items-center space-x-2">
                                    <MailIcon size={12} />
                                    <span>{user.email}</span>
                                  </div>
                                  <div className="text-xs text-gray-400 flex items-center space-x-2 mt-1">
                                    <Smartphone size={10} />
                                    <span>{user.phone}</span>
                                    <Globe size={10} />
                                    <span>{user.location}</span>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <span className={`text-xs px-2 py-1 rounded-full ${roles.find(r => r.id === user.role)?.color}`}>
                                  <div className="flex items-center space-x-1">
                                    {getRoleIcon(user.role)}
                                    <span>{user.role}</span>
                                  </div>
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(user.status)}`}>
                                  <div className="flex items-center space-x-1">
                                    {getStatusIcon(user.status)}
                                    <span>
                                      {user.status === 'active' && 'Aktif'}
                                      {user.status === 'inactive' && 'Nonaktif'}
                                      {user.status === 'pending' && 'Pending'}
                                      {user.status === 'suspended' && 'Ditangguhkan'}
                                    </span>
                                  </div>
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="text-sm text-gray-600">{user.joinDate}</div>
                              <div className="text-xs text-gray-400">Login: {user.lastLogin}</div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleEditUser(user)}
                                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="Edit"
                                >
                                  <Edit size={16} />
                                </button>
                                <button
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Hapus"
                                >
                                  <Trash2 size={16} />
                                </button>
                                <div className="relative">
                                  <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                    <MoreVertical size={16} />
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {totalPages > 1 && (
              <div className={`${isMobile ? 'mt-4' : 'border-t border-gray-200 p-4'} bg-white rounded-lg border border-gray-200 p-3 md:p-4 mt-4 md:mt-0`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
                  <div className="text-sm text-gray-600">
                    Menampilkan {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredUsers.length)} dari {filteredUsers.length} pengguna
                  </div>
                  <div className="flex items-center justify-center space-x-1 md:space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isMobile ? '←' : 'Sebelumnya'}
                    </button>
                    {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage <= 2) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 1) {
                        pageNum = totalPages - 2 + i;
                      } else {
                        pageNum = currentPage - 1 + i;
                      }
                      return (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-medium rounded-lg transition-colors ${
                            currentPage === pageNum
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isMobile ? '→' : 'Selanjutnya'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 md:p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3 className="text-lg font-bold text-gray-900">Tambah Pengguna Baru</h3>
                <button
                  onClick={() => setShowAddUserModal(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-3 md:space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="user@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telepon
                  </label>
                  <input
                    type="tel"
                    value={newUser.phone}
                    onChange={(e) => setNewUser(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="+62 812-3456-7890"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value as UserType['role'] }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      <option value="user">User</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lokasi
                    </label>
                    <select
                      value={newUser.location}
                      onChange={(e) => setNewUser(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      <option value="Jakarta">Jakarta</option>
                      <option value="Surabaya">Surabaya</option>
                      <option value="Bandung">Bandung</option>
                      <option value="Medan">Medan</option>
                      <option value="Semarang">Semarang</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddUserModal(false)}
                  className="px-3 md:px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleAddUser}
                  className="px-3 md:px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Tambah Pengguna
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 md:p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-4 md:p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle size={20} className="text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Hapus Pengguna</h3>
                <p className="text-gray-600 text-sm">Apakah Anda yakin ingin menghapus pengguna ini?</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Tindakan ini tidak dapat dibatalkan. Semua data pengguna akan dihapus secara permanen.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-3 md:px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-3 md:px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {showExportMenu && !isMobile && (
        <div className="fixed inset-0 z-40" onClick={() => setShowExportMenu(false)}>
          <div className="absolute right-4 top-24 bg-white rounded-xl shadow-2xl border border-gray-200 w-48 overflow-hidden">
            <button
              onClick={() => {
                alert('Mengekspor data ke CSV...');
                setShowExportMenu(false);
              }}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <FileText size={16} />
              <span>CSV</span>
            </button>
            <button
              onClick={() => {
                alert('Mengekspor data ke Excel...');
                setShowExportMenu(false);
              }}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <FileText size={16} />
              <span>Excel</span>
            </button>
            <button
              onClick={() => {
                alert('Mengekspor data ke PDF...');
                setShowExportMenu(false);
              }}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <FileText size={16} />
              <span>PDF</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsersPage;