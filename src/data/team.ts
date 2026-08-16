export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface Division {
  name: string;
  members: TeamMember[];
}

export const coreTeam: TeamMember[] = [
  { name: "Andi Saputra", role: "Ketua", image: "https://picsum.photos/seed/ketua/400/400" },
  { name: "Budi Santoso", role: "Sekretaris Jendral", image: "https://picsum.photos/seed/wakil/400/400" },
];

export const divisions: Division[] = [
  {
    name: "Research and Development (RnD)",
    members: [
      { name: "Citra Kirana", role: "Kepala Divisi", image: "https://picsum.photos/seed/kadivrnd/400/400" },
      { name: "Dewi Lestari", role: "Staff", image: "https://picsum.photos/seed/staffrnd1/400/400" },
      { name: "Eko Prasetyo", role: "Staff", image: "https://picsum.photos/seed/staffrnd2/400/400" },
    ]
  },
  {
    name: "Operasional & Lapangan",
    members: [
      { name: "Fajar Nugraha", role: "Kepala Divisi", image: "https://picsum.photos/seed/kadivop/400/400" },
      { name: "Gita Gutawa", role: "Staff", image: "https://picsum.photos/seed/staffop1/400/400" },
    ]
  },
  {
    name: "Media & Publikasi",
    members: [
      { name: "Hadi Setiawan", role: "Kepala Divisi", image: "https://picsum.photos/seed/kadivmed/400/400" },
      { name: "Intan Permata", role: "Staff", image: "https://picsum.photos/seed/staffmed1/400/400" },
    ]
  }
];

export const strukturBidang = [
  {
    nama: "Manajemen Inti",
    divisi: ["Ketua Pelaksana", "Sekretaris Jendral", "Sekretaris", "Bendahara", "Perizinan", "MSDM"]
  },
  {
    nama: "Bidang Research and Development",
    divisi: ["Divisi Kajian", "Divisi IT"]
  },
  {
    nama: "Bidang Acara",
    divisi: []
  },
  {
    nama: "Bidang Lapangan",
    divisi: ["Divisi Keamanan", "Divisi Medik"]
  },
  {
    nama: "Bidang Relasi",
    divisi: ["Divisi Intrakampus", "Divisi Ekstrakampus"]
  },
  {
    nama: "Bidang Operasional",
    divisi: []
  },
  {
    nama: "Bidang Fundraising",
    divisi: ["Divisi Entrepreneurship", "Divisi Sponsorship"]
  },
  {
    nama: "Bidang Kreatif",
    divisi: ["Divisi Publikasi dan Dokumentasi", "Divisi Grafis"]
  }
];
