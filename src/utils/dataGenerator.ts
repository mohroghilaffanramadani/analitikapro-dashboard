import { DashboardData } from '../types';

export const generateDashboardData = (period: string = '30days'): DashboardData => {
  if (period === '7days') {
    return {
      statCards: [
        {
          label: 'Total Pengguna',
          value: 8850,
          change: 3.2,
          changeType: 'increase' as const,
          period: '7 hari terakhir'
        },
        {
          label: 'Pendapatan Mingguan',
          value: 24500000,
          change: 5.1,
          changeType: 'increase' as const,
          period: '7 hari terakhir'
        },
        {
          label: 'Pengguna Aktif',
          value: 3280,
          change: 1.8,
          changeType: 'increase' as const,
          period: '7 hari terakhir'
        },
        {
          label: 'Tingkat Konversi',
          value: 4.1,
          change: 0.3,
          changeType: 'increase' as const,
          period: '7 hari terakhir'
        }
      ],
      pertumbuhanPengguna: {
        labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
        datasets: [
          {
            label: 'Pengguna Harian',
            data: [420, 450, 480, 520, 580, 610, 680],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)'
          },
          {
            label: 'Sesi Aktif',
            data: [1250, 1320, 1400, 1480, 1550, 1620, 1700],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)'
          }
        ]
      },
      pendapatanBulanan: {
        labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
        datasets: [
          {
            label: 'Pendapatan Harian (Juta Rp)',
            data: [3.2, 3.5, 3.8, 4.1, 4.5, 5.2, 5.8],
            backgroundColor: [
              'rgba(59, 130, 246, 0.7)',
              'rgba(59, 130, 246, 0.8)',
              'rgba(59, 130, 246, 0.9)',
              'rgba(59, 130, 246, 1)',
              'rgba(59, 130, 246, 0.9)',
              'rgba(59, 130, 246, 0.8)',
              'rgba(59, 130, 246, 0.7)'
            ]
          }
        ]
      },
      distribusiPerangkat: {
        labels: ['Desktop', 'Mobile', 'Tablet'],
        datasets: [
          {
            label: 'Distribusi Pengguna',
            data: [52, 43, 5],
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',
              'rgba(16, 185, 129, 0.8)',
              'rgba(245, 158, 11, 0.8)'
            ]
          }
        ]
      },
      penggunaTerbaru: [
        { id: '1', nama: 'Ahmad Fauzi', email: 'ahmad.fauzi@email.com', status: 'Aktif' as const, tanggalBergabung: 'Hari Ini', perangkat: 'Mobile' as const },
        { id: '2', nama: 'Lisa Anggraini', email: 'lisa.anggraini@email.com', status: 'Aktif' as const, tanggalBergabung: 'Kemarin', perangkat: 'Desktop' as const },
        { id: '3', nama: 'Rudi Hartono', email: 'rudi.hartono@email.com', status: 'Ditangguhkan' as const, tanggalBergabung: '2 Hari Lalu', perangkat: 'Mobile' as const },
        { id: '4', nama: 'Sinta Wati', email: 'sinta.wati@email.com', status: 'Aktif' as const, tanggalBergabung: '3 Hari Lalu', perangkat: 'Tablet' as const },
        { id: '5', nama: 'Bambang S', email: 'bambang.s@email.com', status: 'Tidak Aktif' as const, tanggalBergabung: '4 Hari Lalu', perangkat: 'Desktop' as const },
        { id: '6', nama: 'Dewi Lestari', email: 'dewi.lestari@email.com', status: 'Aktif' as const, tanggalBergabung: '5 Hari Lalu', perangkat: 'Mobile' as const }
      ]
    };
  }

  if (period === '30days') {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'];
    return {
      statCards: [
        {
          label: 'Total Pengguna',
          value: 12480,
          change: 12.5,
          changeType: 'increase' as const,
          period: '30 hari terakhir'
        },
        {
          label: 'Pendapatan Bulanan',
          value: 85620000,
          change: 8.3,
          changeType: 'increase' as const,
          period: '30 hari terakhir'
        },
        {
          label: 'Pengguna Aktif',
          value: 3245,
          change: -2.1,
          changeType: 'decrease' as const,
          period: '30 hari terakhir'
        },
        {
          label: 'Tingkat Konversi',
          value: 3.8,
          change: 0.4,
          changeType: 'increase' as const,
          period: '30 hari terakhir'
        }
      ],
      pertumbuhanPengguna: {
        labels: months,
        datasets: [
          {
            label: 'Pengguna Baru',
            data: [850, 920, 1050, 1120, 1240, 1320],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)'
          },
          {
            label: 'Pengguna Aktif',
            data: [2450, 2650, 2840, 3020, 3120, 3245],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)'
          }
        ]
      },
      pendapatanBulanan: {
        labels: months,
        datasets: [
          {
            label: 'Pendapatan (Juta Rp)',
            data: [72.5, 78.2, 82.1, 79.8, 85.6, 91.2],
            backgroundColor: [
              'rgba(59, 130, 246, 0.7)',
              'rgba(59, 130, 246, 0.8)',
              'rgba(59, 130, 246, 0.9)',
              'rgba(59, 130, 246, 0.8)',
              'rgba(59, 130, 246, 0.7)',
              'rgba(59, 130, 246, 1)'
            ]
          }
        ]
      },
      distribusiPerangkat: {
        labels: ['Desktop', 'Mobile', 'Tablet'],
        datasets: [
          {
            label: 'Distribusi Pengguna',
            data: [55, 40, 5],
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',
              'rgba(16, 185, 129, 0.8)',
              'rgba(245, 158, 11, 0.8)'
            ]
          }
        ]
      },
      penggunaTerbaru: [
        { id: '1', nama: 'Budi Santoso', email: 'budi.santoso@email.com', status: 'Aktif' as const, tanggalBergabung: '15 Mar 2024', perangkat: 'Desktop' as const },
        { id: '2', nama: 'Sari Dewi', email: 'sari.dewi@email.com', status: 'Aktif' as const, tanggalBergabung: '10 Mar 2024', perangkat: 'Mobile' as const },
        { id: '3', nama: 'Agus Wijaya', email: 'agus.wijaya@email.com', status: 'Ditangguhkan' as const, tanggalBergabung: '5 Mar 2024', perangkat: 'Desktop' as const },
        { id: '4', nama: 'Rina Melati', email: 'rina.melati@email.com', status: 'Aktif' as const, tanggalBergabung: '28 Feb 2024', perangkat: 'Mobile' as const },
        { id: '5', nama: 'Fajar Nugroho', email: 'fajar.nugroho@email.com', status: 'Tidak Aktif' as const, tanggalBergabung: '20 Feb 2024', perangkat: 'Tablet' as const },
        { id: '6', nama: 'Maya Indah', email: 'maya.indah@email.com', status: 'Aktif' as const, tanggalBergabung: '15 Feb 2024', perangkat: 'Desktop' as const }
      ]
    };
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  return {
    statCards: [
      {
        label: 'Total Pengguna',
        value: 56890,
        change: 24.7,
        changeType: 'increase' as const,
        period: '1 tahun terakhir'
      },
      {
        label: 'Pendapatan Tahunan',
        value: 945000000,
        change: 18.9,
        changeType: 'increase' as const,
        period: '1 tahun terakhir'
      },
      {
        label: 'Pengguna Aktif',
        value: 15840,
        change: 15.2,
        changeType: 'increase' as const,
        period: '1 tahun terakhir'
      },
      {
        label: 'Tingkat Konversi',
        value: 4.3,
        change: 0.9,
        changeType: 'increase' as const,
        period: '1 tahun terakhir'
      }
    ],
    pertumbuhanPengguna: {
      labels: months,
      datasets: [
        {
          label: 'Pengguna Baru',
          data: [850, 920, 1050, 1120, 1240, 1320, 1450, 1620, 1780, 1920, 2100, 2350],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)'
        },
        {
          label: 'Pengguna Aktif',
          data: [2450, 2650, 2840, 3020, 3120, 3245, 4580, 6250, 8920, 11200, 13450, 15840],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)'
        }
      ]
    },
    pendapatanBulanan: {
      labels: months,
      datasets: [
        {
          label: 'Pendapatan (Juta Rp)',
          data: [72.5, 78.2, 82.1, 79.8, 85.6, 91.2, 88.5, 95.3, 102.8, 110.5, 118.9, 125.4],
          backgroundColor: months.map((_, i) => 
            `rgba(59, 130, 246, ${0.5 + (i * 0.04)})`
          )
        }
      ]
    },
    distribusiPerangkat: {
      labels: ['Desktop', 'Mobile', 'Tablet'],
      datasets: [
        {
          label: 'Distribusi Pengguna',
          data: [50, 45, 5],
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)'
          ]
        }
      ]
    },
    penggunaTerbaru: [
      { id: '1', nama: 'Dian Prasetyo', email: 'dian.prasetyo@email.com', status: 'Aktif' as const, tanggalBergabung: 'Jan 2024', perangkat: 'Desktop' as const },
      { id: '2', nama: 'Anita Sari', email: 'anita.sari@email.com', status: 'Aktif' as const, tanggalBergabung: 'Des 2023', perangkat: 'Mobile' as const },
      { id: '3', nama: 'Rizki Maulana', email: 'rizki.maulana@email.com', status: 'Ditangguhkan' as const, tanggalBergabung: 'Nov 2023', perangkat: 'Desktop' as const },
      { id: '4', nama: 'Citra Ayu', email: 'citra.ayu@email.com', status: 'Aktif' as const, tanggalBergabung: 'Okt 2023', perangkat: 'Mobile' as const },
      { id: '5', nama: 'Hendra Kurniawan', email: 'hendra.kurniawan@email.com', status: 'Tidak Aktif' as const, tanggalBergabung: 'Sep 2023', perangkat: 'Tablet' as const },
      { id: '6', nama: 'Putri Ramadhani', email: 'putri.ramadhani@email.com', status: 'Aktif' as const, tanggalBergabung: 'Agu 2023', perangkat: 'Desktop' as const }
    ]
  };
};