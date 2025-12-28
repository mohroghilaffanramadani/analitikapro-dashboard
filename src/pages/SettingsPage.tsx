import React, { useState, useEffect, useRef } from 'react';
import {
  Settings,
  Save,
  User,
  Bell,
  Shield,
  Database,
  Globe,
  Moon,
  Sun,
  Download,
  Upload,
  Trash2,
  Check,
  X,
  AlertCircle,
  Lock,
  Palette,
  Mail,
  Smartphone,
  Eye,
  EyeOff,
  CreditCard,
  FileText,
  Users,
  Key,
  Menu,
  ChevronDown
} from 'lucide-react';

interface AppSettings {
  general: {
    appName: string;
    timezone: string;
    dateFormat: string;
    language: string;
  };
  notifications: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    monthlyReports: boolean;
    transactionAlerts: boolean;
    userActivity: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: number;
    passwordExpiry: number;
    ipWhitelist: string[];
    loginAlerts: boolean;
  };
  appearance: {
    theme: 'light' | 'dark' | 'auto';
    primaryColor: string;
    sidebarSize: 'compact' | 'normal' | 'large';
    fontSize: 'small' | 'medium' | 'large';
  };
  integrations: {
    googleAnalytics: boolean;
    googleAnalyticsId: string;
    stripe: boolean;
    stripeKey: string;
    mailchimp: boolean;
    mailchimpKey: string;
  };
}

const SettingsPage = () => {
  const [settings, setSettings] = useState<AppSettings>({
    general: {
      appName: 'AnalitikaPro Dashboard',
      timezone: 'Asia/Jakarta',
      dateFormat: 'DD/MM/YYYY',
      language: 'Bahasa Indonesia'
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      monthlyReports: true,
      transactionAlerts: true,
      userActivity: false
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
      ipWhitelist: ['192.168.1.1', '10.0.0.1'],
      loginAlerts: true
    },
    appearance: {
      theme: 'light',
      primaryColor: '#3b82f6',
      sidebarSize: 'normal',
      fontSize: 'medium'
    },
    integrations: {
      googleAnalytics: true,
      googleAnalyticsId: 'UA-123456789-1',
      stripe: true,
      stripeKey: 'pk_test_************',
      mailchimp: false,
      mailchimpKey: ''
    }
  });

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [backupData, setBackupData] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleSettingChange = (category: keyof AppSettings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  const handleArrayChange = (category: keyof AppSettings, key: string, index: number, value: string) => {
    const newArray = [...(settings[category][key as keyof typeof settings[typeof category]] as string[])];
    newArray[index] = value;
    
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: newArray
      }
    }));
    setHasUnsavedChanges(true);
  };

  const handleAddToArray = (category: keyof AppSettings, key: string) => {
    const currentArray = settings[category][key as keyof typeof settings[typeof category]] as string[];
    
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: [...currentArray, '']
      }
    }));
    setHasUnsavedChanges(true);
  };

  const handleRemoveFromArray = (category: keyof AppSettings, key: string, index: number) => {
    const currentArray = settings[category][key as keyof typeof settings[typeof category]] as string[];
    const newArray = currentArray.filter((_, i) => i !== index);
    
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: newArray
      }
    }));
    setHasUnsavedChanges(true);
  };

  const handleSaveSettings = () => {
    setLoading(true);
    setTimeout(() => {
      alert('Pengaturan berhasil disimpan!');
      setHasUnsavedChanges(false);
      setLoading(false);
    }, 1000);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Apakah Anda yakin ingin mengembalikan pengaturan ke default?')) {
      setSettings({
        general: {
          appName: 'AnalitikaPro Dashboard',
          timezone: 'Asia/Jakarta',
          dateFormat: 'DD/MM/YYYY',
          language: 'Bahasa Indonesia'
        },
        notifications: {
          emailNotifications: true,
          pushNotifications: true,
          monthlyReports: true,
          transactionAlerts: true,
          userActivity: false
        },
        security: {
          twoFactorAuth: false,
          sessionTimeout: 30,
          passwordExpiry: 90,
          ipWhitelist: ['192.168.1.1', '10.0.0.1'],
          loginAlerts: true
        },
        appearance: {
          theme: 'light',
          primaryColor: '#3b82f6',
          sidebarSize: 'normal',
          fontSize: 'medium'
        },
        integrations: {
          googleAnalytics: true,
          googleAnalyticsId: 'UA-123456789-1',
          stripe: true,
          stripeKey: 'pk_test_************',
          mailchimp: false,
          mailchimpKey: ''
        }
      });
      setHasUnsavedChanges(true);
    }
  };

  const handleBackupSettings = () => {
    const backup = {
      ...settings,
      backupDate: new Date().toISOString(),
      version: '1.0.0'
    };
    
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `settings-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    alert('Backup pengaturan berhasil diunduh!');
  };

  const handleRestoreSettings = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const restoredSettings = JSON.parse(event.target?.result as string);
          setSettings(restoredSettings);
          setBackupData(restoredSettings);
          setHasUnsavedChanges(true);
          alert('Backup berhasil dibaca! Klik simpan untuk menerapkan.');
        } catch (error) {
          alert('Gagal membaca file backup. Format tidak valid.');
        }
      };
      
      reader.readAsText(file);
    };
    
    input.click();
  };

  const tabs = [
    { id: 'general', label: 'Umum', icon: <Settings size={18} /> },
    { id: 'notifications', label: 'Notifikasi', icon: <Bell size={18} /> },
    { id: 'security', label: 'Keamanan', icon: <Shield size={18} /> },
    { id: 'integrations', label: 'Integrasi', icon: <Database size={18} /> },
    { id: 'backup', label: 'Backup', icon: <Download size={18} /> }
  ];

  const getCurrentTabLabel = () => {
    const tab = tabs.find(t => t.id === activeTab);
    return tab?.label || 'Umum';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              Pengaturan
            </h1>
          </div>
          
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            {isMobileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                <div className="py-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center px-4 py-3 text-sm font-medium ${
                        activeTab === tab.id
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span className="mr-3">{tab.icon}</span>
                      {tab.label}
                      {activeTab === tab.id && (
                        <span className="ml-auto">
                          <Check size={16} />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="px-4 pb-3">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <span>Menu aktif:</span>
            <span className="ml-2 font-medium text-gray-900 dark:text-white">
              {getCurrentTabLabel()}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 py-4 md:px-4 md:py-6">
        <div className="hidden md:flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <Settings className="mr-2" size={22} />
              Pengaturan Sistem
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Kelola konfigurasi dan preferensi aplikasi
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
            {hasUnsavedChanges && (
              <div className="flex items-center text-yellow-600 dark:text-yellow-400 text-sm">
                <AlertCircle size={14} className="mr-1" />
                <span>Perubahan belum disimpan</span>
              </div>
            )}
            
            <button
              onClick={handleResetDefaults}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm whitespace-nowrap"
              disabled={loading}
            >
              Reset Default
            </button>
            
            <button
              onClick={handleSaveSettings}
              disabled={loading || !hasUnsavedChanges}
              className={`px-3 py-2 rounded-lg text-sm flex items-center whitespace-nowrap ${
                loading || !hasUnsavedChanges
                  ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <Save size={14} className="mr-1" />
              {loading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 md:p-6">
              {loading ? (
                <div className="space-y-4">
                  {Array(3).fill(0).map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-3"></div>
                      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {activeTab === 'general' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <Settings className="mr-2" size={20} />
                        Pengaturan Umum
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Nama Aplikasi
                          </label>
                          <input
                            type="text"
                            value={settings.general.appName}
                            onChange={(e) => handleSettingChange('general', 'appName', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Zona Waktu
                          </label>
                          <select
                            value={settings.general.timezone}
                            onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                          >
                            <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                            <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                            <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                            <option value="UTC">UTC</option>
                          </select>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Format Tanggal
                            </label>
                            <select
                              value={settings.general.dateFormat}
                              onChange={(e) => handleSettingChange('general', 'dateFormat', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                            >
                              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Bahasa
                            </label>
                            <select
                              value={settings.general.language}
                              onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                            >
                              <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                              <option value="English">English</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'notifications' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <Bell className="mr-2" size={20} />
                        Pengaturan Notifikasi
                      </h3>
                      
                      <div className="space-y-3">
                        {Object.entries(settings.notifications).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 dark:text-white text-sm md:text-base capitalize">
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                              </div>
                              <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {key === 'emailNotifications' && 'Kirim notifikasi melalui email'}
                                {key === 'pushNotifications' && 'Tampilkan notifikasi push di browser'}
                                {key === 'monthlyReports' && 'Kirim laporan bulanan otomatis'}
                                {key === 'transactionAlerts' && 'Berikan alert untuk transaksi besar'}
                                {key === 'userActivity' && 'Notifikasi aktivitas pengguna baru'}
                              </div>
                            </div>
                            
                            <button
                              onClick={() => handleSettingChange('notifications', key, !value)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full ml-3 ${
                                value ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                  value ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'security' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <Shield className="mr-2" size={20} />
                        Pengaturan Keamanan
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <Key size={18} className="text-blue-600 dark:text-blue-400 mr-2" />
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white text-sm md:text-base">
                                  Two-Factor Authentication
                                </div>
                                <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                                  Tambahkan lapisan keamanan ekstra
                                </div>
                              </div>
                            </div>
                            
                            <button
                              onClick={() => handleSettingChange('security', 'twoFactorAuth', !settings.security.twoFactorAuth)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                                settings.security.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                  settings.security.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                          
                          {settings.security.twoFactorAuth && (
                            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                              <div className="text-sm text-blue-700 dark:text-blue-300">
                                2FA diaktifkan. Gunakan aplikasi authenticator untuk login.
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="mb-3">
                            <div className="font-medium text-gray-900 dark:text-white text-sm md:text-base mb-1">
                              Session Timeout
                            </div>
                            <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                              Waktu sebelum sesi login kadaluarsa (menit)
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <input
                              type="range"
                              min="5"
                              max="120"
                              step="5"
                              value={settings.security.sessionTimeout}
                              onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                              className="flex-1"
                            />
                            <span className="font-medium text-gray-900 dark:text-white w-12 text-sm md:text-base">
                              {settings.security.sessionTimeout}m
                            </span>
                          </div>
                        </div>

                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="mb-3">
                            <div className="font-medium text-gray-900 dark:text-white text-sm md:text-base mb-1">
                              IP Whitelist
                            </div>
                            <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                              Hanya izinkan akses dari IP berikut
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            {settings.security.ipWhitelist.map((ip, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <input
                                  type="text"
                                  value={ip}
                                  onChange={(e) => handleArrayChange('security', 'ipWhitelist', index, e.target.value)}
                                  placeholder="Contoh: 192.168.1.1"
                                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm"
                                />
                                <button
                                  onClick={() => handleRemoveFromArray('security', 'ipWhitelist', index)}
                                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            ))}
                            
                            <button
                              onClick={() => handleAddToArray('security', 'ipWhitelist')}
                              className="px-3 py-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg text-sm"
                            >
                              + Tambah IP Address
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'integrations' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <Database className="mr-2" size={20} />
                        Integrasi Pihak Ketiga
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              <Globe size={18} className="text-blue-600 dark:text-blue-400 mr-2" />
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white text-sm md:text-base">
                                  Google Analytics
                                </div>
                                <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                                  Lacak analytics dan traffic pengguna
                                </div>
                              </div>
                            </div>
                            
                            <button
                              onClick={() => handleSettingChange('integrations', 'googleAnalytics', !settings.integrations.googleAnalytics)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                                settings.integrations.googleAnalytics ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                  settings.integrations.googleAnalytics ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                          
                          {settings.integrations.googleAnalytics && (
                            <div className="mt-3">
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Tracking ID
                              </label>
                              <input
                                type="text"
                                value={settings.integrations.googleAnalyticsId}
                                onChange={(e) => handleSettingChange('integrations', 'googleAnalyticsId', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm"
                                placeholder="UA-XXXXXXXXX-X"
                              />
                            </div>
                          )}
                        </div>

                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              <CreditCard size={18} className="text-purple-600 dark:text-purple-400 mr-2" />
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white text-sm md:text-base">
                                  Stripe Payments
                                </div>
                                <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                                  Proses pembayaran dengan Stripe
                                </div>
                              </div>
                            </div>
                            
                            <button
                              onClick={() => handleSettingChange('integrations', 'stripe', !settings.integrations.stripe)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                                settings.integrations.stripe ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                  settings.integrations.stripe ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                          
                          {settings.integrations.stripe && (
                            <div className="mt-3">
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                API Key (Publishable)
                              </label>
                              <div className="relative">
                                <input
                                  type={showPassword ? 'text' : 'password'}
                                  value={settings.integrations.stripeKey}
                                  onChange={(e) => handleSettingChange('integrations', 'stripeKey', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 pr-10 text-sm"
                                  placeholder="pk_test_************"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                >
                                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Gunakan publishable key untuk frontend
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'backup' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <Download className="mr-2" size={20} />
                        Backup & Restore
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-center mb-3">
                            <Download className="text-green-600 dark:text-green-400 mr-2" size={18} />
                            <div className="font-medium text-gray-900 dark:text-white">
                              Backup Pengaturan
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Unduh backup semua pengaturan sistem Anda.
                          </p>
                          
                          <button
                            onClick={handleBackupSettings}
                            className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center text-sm"
                          >
                            <Download size={16} className="mr-2" />
                            Backup Sekarang
                          </button>
                        </div>

                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-center mb-3">
                            <Upload className="text-blue-600 dark:text-blue-400 mr-2" size={18} />
                            <div className="font-medium text-gray-900 dark:text-white">
                              Restore Pengaturan
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Upload file backup untuk mengembalikan pengaturan.
                          </p>
                          
                          <button
                            onClick={handleRestoreSettings}
                            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center text-sm"
                          >
                            <Upload size={16} className="mr-2" />
                            Restore dari File
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="font-medium text-gray-900 dark:text-white mb-3 text-sm md:text-base">
                          Informasi Sistem
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <div className="text-gray-500 dark:text-gray-400 text-xs">Versi Aplikasi</div>
                            <div className="font-medium">v2.1.0</div>
                          </div>
                          <div>
                            <div className="text-gray-500 dark:text-gray-400 text-xs">Last Backup</div>
                            <div className="font-medium">24 Des 2024</div>
                          </div>
                          <div>
                            <div className="text-gray-500 dark:text-gray-400 text-xs">Total Settings</div>
                            <div className="font-medium">42 konfigurasi</div>
                          </div>
                          <div>
                            <div className="text-gray-500 dark:text-gray-400 text-xs">System Status</div>
                            <div className="font-medium text-green-600 dark:text-green-400">✓ Normal</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {activeTab === 'general' && (
            <div className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <AlertCircle className="text-red-600 dark:text-red-400 mr-2" size={18} />
                <div className="font-medium text-red-800 dark:text-red-300 text-sm md:text-base">
                  Zona Berbahaya
                </div>
              </div>
              
              <p className="text-xs md:text-sm text-red-700 dark:text-red-400 mb-4">
                Aksi di bawah ini tidak dapat dibatalkan.
              </p>
              
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <button
                  onClick={() => {
                    if (window.confirm('Apakah Anda yakin ingin menghapus semua data? Aksi ini tidak dapat dibatalkan!')) {
                      alert('Data berhasil dihapus (simulasi)');
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center text-sm"
                >
                  <Trash2 size={16} className="mr-2" />
                  Hapus Semua Data
                </button>
                
                <button
                  onClick={() => {
                    if (window.confirm('Apakah Anda yakin ingin menonaktifkan akun? Akun akan dinonaktifkan selama 30 hari.')) {
                      alert('Akun berhasil dinonaktifkan (simulasi)');
                    }
                  }}
                  className="flex-1 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-sm"
                >
                  Nonaktifkan Akun
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {hasUnsavedChanges && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 z-20">
          <div className="flex items-center justify-between">
            <div className="text-sm text-yellow-600 dark:text-yellow-400 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              Ada perubahan belum disimpan
            </div>
            <button
              onClick={handleSaveSettings}
              disabled={loading}
              className={`px-4 py-2 rounded-lg text-sm flex items-center ${
                loading
                  ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <Save size={14} className="mr-1" />
              {loading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;