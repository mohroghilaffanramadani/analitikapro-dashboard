export interface User {
  id: string;
  nama: string;
  email: string;
  status: 'Aktif' | 'Ditangguhkan' | 'Tidak Aktif';
  tanggalBergabung: string;
  perangkat: 'Desktop' | 'Mobile' | 'Tablet';
}

export interface StatCardData {
  label: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  period: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string | string[];
  }[];
}

export interface DashboardData {
  statCards: StatCardData[];
  pertumbuhanPengguna: ChartData;
  pendapatanBulanan: ChartData;
  distribusiPerangkat: ChartData;
  penggunaTerbaru: User[];
}