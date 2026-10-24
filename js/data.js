// =================================================================
// Data Resmi Kelas XI A1 (IPS) - SMA Negeri 1 Pasir Sakti, Lampung Timur
// Sesuai Poster Struktur Resmi & Jadwal Piket WhatsApp TA 2026/2027
// =================================================================

// Helper Pembuat Logo Profil Avatar Vektor Modern (Privasi Aman, Tanpa Foto Orang Asli)
function createAvatarLogo(initials, color1, color2, gender) {
  const isFemale = gender === 'P';
  const icon = isFemale
    ? `<path d="M12 14c-4 0-7 2.2-7 5v1h14v-1c0-2.8-3-5-7-5z" fill="#ffffff" fill-opacity="0.9"/><circle cx="12" cy="8" r="4.2" fill="#ffffff"/><path d="M6.5 9c0 3.8 2.4 5.2 5.5 5.2s5.5-1.4 5.5-5.2" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" fill="none" opacity="0.6"/>`
    : `<path d="M12 14c-4 0-7 2.2-7 5v1h14v-1c0-2.8-3-5-7-5z" fill="#ffffff" fill-opacity="0.9"/><circle cx="12" cy="8" r="4.2" fill="#ffffff"/><path d="M7 6.5l5-2.5 5 2.5" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" fill="none" opacity="0.6"/>`;
    
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs>
      <linearGradient id="g_${initials}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${color1}"/>
        <stop offset="100%" stop-color="${color2}"/>
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="32" fill="url(#g_${initials})"/>
    <circle cx="50" cy="50" r="44" stroke="#ffffff" stroke-opacity="0.2" stroke-width="2" fill="none"/>
    <g transform="translate(26, 18) scale(2)">
      ${icon}
    </g>
    <rect x="24" y="68" width="52" height="22" rx="11" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
    <text x="50" y="83" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="800" font-size="11" fill="#ffffff" text-anchor="middle" letter-spacing="1">${initials}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const DEFAULT_CLASS_DATA = {
  profile: {
    name: "XI A1",
    nickname: "CLASS ELEVEN A-ONE (IPS)",
    school: "SMA Negeri 1 Pasir Sakti",
    location: "Lampung Timur",
    major: "Ilmu Pengetahuan Sosial (IPS)",
    academicYear: "2026 / 2027",
    tagline: "Solidaritas Tanpa Batas, Cerdas Berkarakter Bersama XI A1 ✨",
    description: "Portal resmi kelas XI A1 SMA Negeri 1 Pasir Sakti, Lampung Timur. Wadah kebersamaan, transparansi kas, agenda piket, dan catatan prestasi siswa.",
    igClass: "@elevenaone.smansapas",
    tiktokClass: "@xi_a1.pasirsakti",
    headmaster: {
      name: "Hasbulloh, S.Pd., M.Pd.",
      role: "Kepala Sekolah SMAN 1 Pasir Sakti",
      avatar: createAvatarLogo("HS", "#1e3a8a", "#3b82f6", "L")
    },
    homeroomTeacher: {
      name: "Maria Yuliati, S.Pd.I.",
      nip: "19820715 200801 2 015",
      subject: "Pendidikan Agama & Budi Pekerti",
      school: "SMA Negeri 1 Pasir Sakti",
      quote: "Keberhasilan bukan hanya diukur dari tingginya nilai akademik, melainkan dari ketulusan hati, akhlak mulia, dan kebersamaan kita.",
      avatar: createAvatarLogo("MY", "#047857", "#10b981", "P"),
      phone: "+62 813-7300-8921",
      instagram: "@maria.yuliati.edu"
    }
  },

  announcements: [
    {
      id: "ann-1",
      title: "Jadwal Piket Kebersihan Resmi Kelas XI A1",
      date: "2026-10-24",
      author: "Ayunda & Pengurus Kelas",
      category: "Kebersihan",
      badge: "Piket",
      badgeColor: "emerald",
      content: "Jadwal piket Senin s/d Jumat telah dirilis resmi. Diharapkan regu piket hadir 15 menit lebih awal dan membawa perlengkapan kain lap sesuai instruksi Bu Maria."
    },
    {
      id: "ann-2",
      title: "Penilaian Tengah Semester (PTS) Ganjil SMAN 1 Pasir Sakti",
      date: "2026-10-28",
      author: "Wali Kelas (Bu Maria Yuliati)",
      category: "Akademik",
      badge: "Penting",
      badgeColor: "red",
      content: "Pelaksanaan PTS Ganjil dimulai pekan depan. Siapkan materi Geografi, Ekonomi, Matematika Wajib, dan Sejarah. Belajar yang tekun anak-anakku XI A1!"
    },
    {
      id: "ann-3",
      title: "Iuran Kas Kelas XI A1 Bulan Oktober",
      date: "2026-10-20",
      author: "Bendahara (Oxa Nindy)",
      category: "Keuangan",
      badge: "Kas Kelas",
      badgeColor: "amber",
      content: "Iuran kas sebesar Rp 10.000 per siswa untuk keperluan spidol, perlengkapan kebersihan kelas, dan dana sosial kelas harap segera dilunasi."
    }
  ],

  // Struktur Organisasi Kelas Resmi (Sesuai Gambar Banner STRUKTUR KELAS XI A1)
  orgStructure: [
    {
      role: "Kepala Sekolah",
      name: "Hasbulloh, S.Pd., M.Pd.",
      subtitle: "Pelindung & Kepala SMAN 1 Pasir Sakti",
      photo: createAvatarLogo("HS", "#1e3a8a", "#2563eb", "L"),
      color: "from-blue-700 to-indigo-800",
      level: 0
    },
    {
      role: "Wali Kelas",
      name: "Maria Yuliati, S.Pd.I.",
      subtitle: "Pembimbing & Guru Pend. Agama",
      photo: createAvatarLogo("MY", "#059669", "#10b981", "P"),
      quote: "Keberhasilan sejati lahir dari akhlak mulia dan ketekunan.",
      color: "from-emerald-600 to-teal-700",
      level: 0
    },
    {
      role: "Ketua Kelas",
      name: "Gabriel",
      subtitle: "Koordinator Utama Kelas XI A1",
      photo: createAvatarLogo("GB", "#2563eb", "#06b6d4", "L"),
      quote: "Pemimpin yang baik adalah yang merangkul dan berjalan bersama temannya.",
      color: "from-blue-600 to-cyan-600",
      level: 1
    },
    {
      role: "Wakil Ketua Kelas",
      name: "David Afriyansyah",
      subtitle: "Pendamping & Penegak Disiplin",
      photo: createAvatarLogo("DV", "#3b82f6", "#6366f1", "L"),
      quote: "Kompak di dalam kelas, tangguh di luar kelas.",
      color: "from-sky-500 to-indigo-600",
      level: 1
    },
    {
      role: "Sekretaris 1",
      name: "Puspita (Ananda Syifa)",
      subtitle: "Notulensi & Administrasi Kelas",
      photo: createAvatarLogo("PS", "#0d9488", "#14b8a6", "P"),
      quote: "Catatan rapi, pikiran tenang, belajar menyenangkan.",
      color: "from-teal-500 to-emerald-600",
      level: 2
    },
    {
      role: "Sekretaris 2",
      name: "Arin (Syafira Qurnia)",
      subtitle: "Presensi & Pembukuan Agenda",
      photo: createAvatarLogo("AR", "#059669", "#34d399", "P"),
      quote: "Selalu hadir dan bersemangat menyambut ilmu baru.",
      color: "from-teal-500 to-emerald-600",
      level: 2
    },
    {
      role: "Bendahara",
      name: "Oxa Nindy Permata",
      subtitle: "Pengelola Keuangan & Kas Kelas",
      photo: createAvatarLogo("OX", "#d97706", "#f59e0b", "P"),
      quote: "Keuangan transparan, kelas nyaman dan aman.",
      color: "from-amber-500 to-orange-600",
      level: 2
    },
    {
      role: "Seksi Olahraga",
      name: "Rhaza, Nadia Cibel, David",
      subtitle: "Aktivitas Fisik & Sportivitas",
      photo: createAvatarLogo("OR", "#ea580c", "#f97316", "L"),
      quote: "Mens sana in corpore sano, sportif dan kompak!",
      color: "from-orange-500 to-amber-600",
      level: 3
    },
    {
      role: "Seksi Kebersihan",
      name: "Ayunda, Rafa, Rista",
      subtitle: "Koordinator Piket & Kenyamanan Ruang",
      photo: createAvatarLogo("KB", "#059669", "#10b981", "P"),
      quote: "Kebersihan sebagian dari iman, kelas bersih belajar pun asyik.",
      color: "from-emerald-500 to-green-600",
      level: 3
    },
    {
      role: "Seksi Keagamaan",
      name: "Aura & Zemindra",
      subtitle: "Pembinaan Rohani & Doa Bersama",
      photo: createAvatarLogo("RO", "#7c3aed", "#8b5cf6", "P"),
      quote: "Ilmu tanpa akhlak laksana pohon tanpa buah.",
      color: "from-purple-500 to-indigo-600",
      level: 3
    },
    {
      role: "Seksi Kesenian",
      name: "Stepanus & Aida",
      subtitle: "Kreativitas & Dekorasi Kelas",
      photo: createAvatarLogo("SN", "#db2777", "#ec4899", "L"),
      quote: "Seni memberi warna dan kehangatan pada persahabatan kita.",
      color: "from-pink-500 to-rose-600",
      level: 3
    },
    {
      role: "Seksi Keamanan",
      name: "Ilham & Melani",
      subtitle: "Ketertiban & Keharmonisan Kelas",
      photo: createAvatarLogo("KM", "#dc2626", "#ef4444", "L"),
      quote: "Saling menjaga, saling menghargai antarteman.",
      color: "from-rose-500 to-red-600",
      level: 3
    }
  ],

  // Direktori Lengkap Anggota Siswa XI A1 dengan Logo Profil Vektor
  students: [
    {
      id: 1,
      absen: "01",
      name: "ABI MUHAMMAD NUH FAHRIZI",
      nickname: "Abi",
      gender: "L",
      birthday: "12 Januari 2009",
      zodiac: "Capricorn",
      dream: "Wirausahawan & Diplomat",
      hobby: "Organisasi & Futsal",
      quote: "Bekerja keras dalam sunyi, biarkan kesuksesan yang bersuara.",
      ig: "@abi.fahrizi",
      kasPaid: true,
      avatar: createAvatarLogo("AB", "#2563eb", "#3b82f6", "L")
    },
    {
      id: 2,
      absen: "02",
      name: "AHMAD RHAZA ARFIAN",
      nickname: "Rhaza",
      gender: "L",
      birthday: "18 Maret 2009",
      zodiac: "Pisces",
      dream: "Ekonom & Banker Nasional",
      hobby: "Badminton & Game Strategi",
      quote: "Setiap langkah kecil hari ini adalah awal lompatan besar.",
      ig: "@rhaza_arfian",
      kasPaid: true,
      avatar: createAvatarLogo("RH", "#0284c7", "#38bdf8", "L")
    },
    {
      id: 3,
      absen: "03",
      name: "ANANDA SYIFA AZAHRA (PUSPITA)",
      nickname: "Puspita",
      gender: "P",
      birthday: "05 Mei 2009",
      zodiac: "Taurus",
      dream: "Guru & Praktisi Pendidikan",
      hobby: "Membaca Buku & Menulis Cerpen",
      quote: "Ilmu adalah cahaya yang menerangi jalan kehidupan.",
      ig: "@ananda.syifaa",
      kasPaid: true,
      avatar: createAvatarLogo("PS", "#0d9488", "#2dd4bf", "P")
    },
    {
      id: 4,
      absen: "04",
      name: "ANNISA BELA",
      nickname: "Bela",
      gender: "P",
      birthday: "22 Agustus 2009",
      zodiac: "Leo",
      dream: "Public Relations Specialist",
      hobby: "Menyanyi & Desain Grafis",
      quote: "Senyum ramah adalah bahasa universal yang disukai semua orang.",
      ig: "@annisa.bela",
      kasPaid: true,
      avatar: createAvatarLogo("BL", "#ec4899", "#f472b6", "P")
    },
    {
      id: 5,
      absen: "05",
      name: "AQISTA FEBRIYAN",
      nickname: "Aqista",
      gender: "L",
      birthday: "14 Februari 2009",
      zodiac: "Aquarius",
      dream: "Ahli Geografi & Konservasi Alam",
      hobby: "Menjelajah Alam & Fotografi",
      quote: "Mengenal bumi membuat kita semakin bersyukur atas keagungan Tuhan.",
      ig: "@aqista.febriyan",
      kasPaid: true,
      avatar: createAvatarLogo("AQ", "#059669", "#34d399", "L")
    },
    {
      id: 6,
      absen: "06",
      name: "AURELIA PURNAMA PUTRI (AURA)",
      nickname: "Aura",
      gender: "P",
      birthday: "30 Juli 2009",
      zodiac: "Leo",
      dream: "Manajer Keuangan & Akuntan",
      hobby: "Memasak & Menulis Jurnal",
      quote: "Cermat mengelola waktu, bijak merancang masa depan.",
      ig: "@aurelia_putri",
      kasPaid: true,
      avatar: createAvatarLogo("AU", "#8b5cf6", "#a78bfa", "P")
    },
    {
      id: 7,
      absen: "07",
      name: "CHANDRA EDWARD SIRILUS TAMBA",
      nickname: "Chandra",
      gender: "L",
      birthday: "09 November 2008",
      zodiac: "Scorpio",
      dream: "Konsultan Hukum & Pengacara",
      hobby: "Debat Hukum & Gitar Akustik",
      quote: "Tegakkan kebenaran dengan landasan keadilan dan kejujuran.",
      ig: "@chandra.tamba",
      kasPaid: true,
      avatar: createAvatarLogo("CH", "#4f46e5", "#818cf8", "L")
    },
    {
      id: 8,
      absen: "08",
      name: "DAVID AFRIYANSYAH",
      nickname: "David",
      gender: "L",
      birthday: "27 September 2008",
      zodiac: "Libra",
      dream: "Digital Marketer & Entrepreneur",
      hobby: "Editing Video & Sepak Bola",
      quote: "Kreativitas adalah modal terbaik di era serba modern.",
      ig: "@david.afriansyah",
      kasPaid: false,
      avatar: createAvatarLogo("DV", "#2563eb", "#60a5fa", "L")
    },
    {
      id: 9,
      absen: "09",
      name: "DINDA NURANISA",
      nickname: "Dinda",
      gender: "P",
      birthday: "16 April 2009",
      zodiac: "Aries",
      dream: "Psikolog Remaja & Konselor",
      hobby: "Mendengarkan Musik & Melukis",
      quote: "Setiap insan berharga dan punya cerita unik masing-masing.",
      ig: "@dinda_nuranisa",
      kasPaid: true,
      avatar: createAvatarLogo("DN", "#db2777", "#f472b6", "P")
    },
    {
      id: 10,
      absen: "10",
      name: "FAUZIA NUR WAHYUDIN (ZIA)",
      nickname: "Zia",
      gender: "P",
      birthday: "03 Oktober 2009",
      zodiac: "Libra",
      dream: "Peneliti Sosial Budaya",
      hobby: "Membaca Sejarah & Kaligrafi",
      quote: "Bangsa yang besar adalah yang menghargai budayanya sendiri.",
      ig: "@fauzia_nurw",
      kasPaid: true,
      avatar: createAvatarLogo("ZI", "#7c3aed", "#c084fc", "P")
    },
    {
      id: 11,
      absen: "11",
      name: "FEBRITIA ARISKA",
      nickname: "Febri",
      gender: "P",
      birthday: "08 Februari 2009",
      zodiac: "Aquarius",
      dream: "Instruktur Olahraga & Fisioterapis",
      hobby: "Bola Voli & Senam Aerobik",
      quote: "Tubuh yang sehat melahirkan jiwa yang tangguh dan ceria.",
      ig: "@febritia_ariska",
      kasPaid: true,
      avatar: createAvatarLogo("FB", "#ea580c", "#fb923c", "P")
    },
    {
      id: 12,
      absen: "12",
      name: "FENIKA AYUNDA SAPUTRI",
      nickname: "Ayunda",
      gender: "P",
      birthday: "19 Juni 2009",
      zodiac: "Gemini",
      dream: "Jurnalis Televisi & Presenter",
      hobby: "Public Speaking & Menulis Berita",
      quote: "Sampaikan kebaikan melalui tutur kata yang menginspirasi.",
      ig: "@fenika.ayunda",
      kasPaid: true,
      avatar: createAvatarLogo("AY", "#0d9488", "#14b8a6", "P")
    },
    {
      id: 13,
      absen: "13",
      name: "GABRIEL",
      nickname: "Gabriel",
      gender: "L",
      birthday: "15 Januari 2009",
      zodiac: "Capricorn",
      dream: "Pemimpin Bisnis & Eksekutif Muda",
      hobby: "Leadership, Futsal, & Catur",
      quote: "Memimpin bukan tentang kekuasaan, melainkan tentang memberi teladan.",
      ig: "@gabriel.official",
      kasPaid: true,
      avatar: createAvatarLogo("GB", "#1e40af", "#3b82f6", "L")
    },
    {
      id: 14,
      absen: "14",
      name: "ILHAM",
      nickname: "Ilham",
      gender: "L",
      birthday: "09 November 2008",
      zodiac: "Scorpio",
      dream: "Aparat Penegak Hukum & Disiplin",
      hobby: "Bela Diri & Lari Sprint",
      quote: "Ketertiban adalah awal dari keberhasilan belajar bersama.",
      ig: "@ilham_smansapas",
      kasPaid: true,
      avatar: createAvatarLogo("IL", "#dc2626", "#f87171", "L")
    },
    {
      id: 15,
      absen: "15",
      name: "ISRA PUTRI WIDIASTUTI",
      nickname: "Isra",
      gender: "P",
      birthday: "25 Desember 2008",
      zodiac: "Capricorn",
      dream: "Dosen Sosiologi & Penulis Buku",
      hobby: "Membaca Novel & Menulis Opini",
      quote: "Pena lebih tajam daripada pedang jika digunakan dengan bijak.",
      ig: "@isra_putri",
      kasPaid: true,
      avatar: createAvatarLogo("IS", "#059669", "#34d399", "P")
    },
    {
      id: 16,
      absen: "16",
      name: "LELY APRIYANI SUBEKTI",
      nickname: "Leli",
      gender: "P",
      birthday: "11 April 2009",
      zodiac: "Aries",
      dream: "Perancang Busana / Fashion Designer",
      hobby: "Merancang Busana & Kerajinan Tangan",
      quote: "Kreativitas tanpa batas menciptakan karya yang berkelas.",
      ig: "@lely.apriyani",
      kasPaid: true,
      avatar: createAvatarLogo("LE", "#d97706", "#fde047", "P")
    },
    {
      id: 17,
      absen: "17",
      name: "MEILANY NURHALIZA (LIZA)",
      nickname: "Liza",
      gender: "P",
      birthday: "02 Mei 2009",
      zodiac: "Taurus",
      dream: "Apoteker & Konsultan Nutrisi",
      hobby: "Baking & Menanam Bunga",
      quote: "Kebaikan hati akan kembali pada orang yang menebarkannya.",
      ig: "@meilany.nurhaliza",
      kasPaid: false,
      avatar: createAvatarLogo("LZ", "#ec4899", "#fda4af", "P")
    },
    {
      id: 18,
      absen: "18",
      name: "MELANI PUTRI",
      nickname: "Melani",
      gender: "P",
      birthday: "17 Januari 2009",
      zodiac: "Capricorn",
      dream: "Manajer Hotel & Pariwisata",
      hobby: "Traveling & Kuliner Tradisional",
      quote: "Jelajahi keindahan negeri dengan rasa cinta dan bangga.",
      ig: "@melani.putrii",
      kasPaid: true,
      avatar: createAvatarLogo("ML", "#7c3aed", "#a78bfa", "P")
    },
    {
      id: 19,
      absen: "19",
      name: "NADIA CINTA BELA",
      nickname: "Nadia Cibel",
      gender: "P",
      birthday: "21 Juli 2009",
      zodiac: "Cancer",
      dream: "Diplomat di Kedutaan Besar",
      hobby: "Belajar Bahasa Asing & Biola",
      quote: "Bermimpilah setinggi langit, Tuhan menyertai usahamu.",
      ig: "@nadiacintabela",
      kasPaid: true,
      avatar: createAvatarLogo("NC", "#e11d48", "#fb7185", "P")
    },
    {
      id: 20,
      absen: "20",
      name: "NADILA FALENCIA",
      nickname: "Nadila",
      gender: "P",
      birthday: "04 Maret 2009",
      zodiac: "Pisces",
      dream: "Fotografer Profesional & Kurator Seni",
      hobby: "Fotografi & Desain Ilustrasi",
      quote: "Setiap momen berharga layak diabadikan dengan indah.",
      ig: "@nadila.falencia",
      kasPaid: true,
      avatar: createAvatarLogo("ND", "#2563eb", "#67e8f9", "P")
    },
    {
      id: 21,
      absen: "21",
      name: "NADYA SEKAR MAHARANI",
      nickname: "Nadya",
      gender: "P",
      birthday: "13 Oktober 2009",
      zodiac: "Libra",
      dream: "Content Creator Edukasi & Penyiar",
      hobby: "Podcast & Menari Tradisional",
      quote: "Berbagi inspirasi positif untuk generasi muda.",
      ig: "@nadyasekar_m",
      kasPaid: true,
      avatar: createAvatarLogo("NY", "#c026d3", "#f0abfc", "P")
    },
    {
      id: 22,
      absen: "22",
      name: "NOVIA TIKA SUWESTI",
      nickname: "Novia",
      gender: "P",
      birthday: "28 November 2008",
      zodiac: "Sagittarius",
      dream: "Pegawai Negeri Sipil & Abdi Negara",
      hobby: "Membaca & Memasak",
      quote: "Pengabdian yang tulus menghasilkan berkah berlimpah.",
      ig: "@novia_tika",
      kasPaid: true,
      avatar: createAvatarLogo("NV", "#059669", "#6ee7b7", "P")
    },
    {
      id: 23,
      absen: "23",
      name: "NUR AIDA ASILVIA",
      nickname: "Aida",
      gender: "P",
      birthday: "07 Juni 2009",
      zodiac: "Gemini",
      dream: "Pendidik & Aktivis Literasi",
      hobby: "Mendongeng & Kerajinan DIY",
      quote: "Mendidik adalah menanam benih masa depan gemilang.",
      ig: "@nuraida_asilvia",
      kasPaid: true,
      avatar: createAvatarLogo("AD", "#0284c7", "#38bdf8", "P")
    },
    {
      id: 24,
      absen: "24",
      name: "OXA NINDY PERMATA",
      nickname: "Oxa",
      gender: "P",
      birthday: "15 September 2009",
      zodiac: "Virgo",
      dream: "Arsitek Desain Interior & Banker",
      hobby: "Sketsa Bangunan & Menata Ruang",
      quote: "Ruang yang estetis menenangkan pikiran yang lelah.",
      ig: "@oxa.nindy",
      kasPaid: true,
      avatar: createAvatarLogo("OX", "#d97706", "#fbbf24", "P")
    },
    {
      id: 25,
      absen: "25",
      name: "RANY FEBRIANTY",
      nickname: "Rani",
      gender: "P",
      birthday: "20 Februari 2009",
      zodiac: "Pisces",
      dream: "Manajer Sumber Daya Manusia (HRD)",
      hobby: "Membaca Psikologi & Badminton",
      quote: "Memahami orang lain adalah kunci kepemimpinan yang berhasil.",
      ig: "@rany.febrianty",
      kasPaid: false,
      avatar: createAvatarLogo("RN", "#db2777", "#f472b6", "P")
    },
    {
      id: 26,
      absen: "26",
      name: "RICARDO TRI OKTA (ARDHO)",
      nickname: "Ardho",
      gender: "L",
      birthday: "03 Oktober 2008",
      zodiac: "Libra",
      dream: "Perwira Penegak Hukum",
      hobby: "Bela Diri & Lari Marathon",
      quote: "Disiplin adalah jembatan antara cita-cita dan pencapaian.",
      ig: "@ricardo_okta",
      kasPaid: true,
      avatar: createAvatarLogo("RC", "#dc2626", "#fb7185", "L")
    },
    {
      id: 27,
      absen: "27",
      name: "RISTA ANDINA CAHYA PUTRI",
      nickname: "Rista",
      gender: "P",
      birthday: "10 Agustus 2009",
      zodiac: "Leo",
      dream: "Konsultan Pajak & Keuangan",
      hobby: "Menghitung Statistik & Menari",
      quote: "Ketelitian menghasilkan kesempurnaan.",
      ig: "@rista.andina",
      kasPaid: true,
      avatar: createAvatarLogo("RS", "#4f46e5", "#a5b4fc", "P")
    },
    {
      id: 28,
      absen: "28",
      name: "STEFANUS TRIO PRASETYO",
      nickname: "Stepanus",
      gender: "L",
      birthday: "26 Desember 2008",
      zodiac: "Capricorn",
      dream: "Programmer & Web Developer",
      hobby: "Komputer, Musik Rock & Game",
      quote: "Teknologi adalah sarana untuk mempermudah hidup manusia.",
      ig: "@stefanus.trio",
      kasPaid: true,
      avatar: createAvatarLogo("ST", "#0284c7", "#38bdf8", "L")
    },
    {
      id: 29,
      absen: "29",
      name: "SYAFIRA QURNIA ZAHRIN (ARIN)",
      nickname: "Arin",
      gender: "P",
      birthday: "12 Mei 2009",
      zodiac: "Taurus",
      dream: "Dokter Gigi & Sukarelawan Medis",
      hobby: "Membaca Jurnal & Menjahit",
      quote: "Bermanfaat bagi sesama adalah kebahagiaan sejati.",
      ig: "@syafira_qurnia",
      kasPaid: true,
      avatar: createAvatarLogo("AR", "#059669", "#34d399", "P")
    },
    {
      id: 30,
      absen: "30",
      name: "TASYA ANNISA",
      nickname: "Tasya",
      gender: "P",
      birthday: "19 Maret 2009",
      zodiac: "Pisces",
      dream: "Pengusaha Kuliner Modern",
      hobby: "Baking Kue & Mengembangkan Resep",
      quote: "Cita rasa terbaik lahir dari hati yang penuh cinta.",
      ig: "@tasya_annisaa",
      kasPaid: true,
      avatar: createAvatarLogo("TS", "#ea580c", "#fed7aa", "P")
    },
    {
      id: 31,
      absen: "31",
      name: "ZEMINDRA ADITYA PRATAMA",
      nickname: "Zemindra",
      gender: "L",
      birthday: "31 Agustus 2008",
      zodiac: "Virgo",
      dream: "Manajer Klub Olahraga & Atlet",
      hobby: "Futsal, Sepak Bola & Esport",
      quote: "Kemenangan sejati adalah saat kita bisa bekerja sama sebagai tim.",
      ig: "@zemindra.aditya",
      kasPaid: true,
      avatar: createAvatarLogo("ZM", "#2563eb", "#93c5fd", "L")
    }
  ],

  // JADWAL KBM RESMI SEMESTER GANJIL SMAN 1 PASIR SAKTI (KELAS: XI A1)
  schedule: {
    senin: [
      { time: "07:15 - 08:45", periods: "Jam 1 - 2", subject: "Matematika Wajib", teacher: "Syarif Hidayat, S.Pd.", room: "Ruang XI A1", color: "blue" },
      { time: "08:45 - 10:15", periods: "Jam 3 - 5", subject: "Bahasa Inggris Lanjut", teacher: "Yuyun Nurhidayati Amalia, M.Pd", room: "Ruang XI A1", color: "violet" },
      { time: "10:15 - 10:45", periods: "-", subject: "Istirahat Pertama", teacher: "-", room: "Kantin Sekolah", isBreak: true },
      { time: "10:45 - 12:45", periods: "Jam 6 - 8", subject: "Penjaskes (Olahraga)", teacher: "Hari Setiawan, S.Pd", room: "Lapangan Olahraga", color: "orange" },
      { time: "12:45 - 13:15", periods: "-", subject: "Istirahat Kedua & Sholat Dzuhur", teacher: "-", room: "Masjid Sekolah", isBreak: true },
      { time: "13:15 - 14:00", periods: "Jam 9", subject: "Bimbingan Konseling (BK)", teacher: "Andreas TW, S.Pd", room: "Ruang Konseling / XI A1", color: "teal" },
      { time: "14:00 - 15:30", periods: "Jam 10 - 11", subject: "Mulok - Pend. Antikorupsi", teacher: "Umi Afifah, S.Pd", room: "Ruang XI A1", color: "rose" }
    ],
    selasa: [
      { time: "07:15 - 08:45", periods: "Jam 1 - 2", subject: "Geografi", teacher: "I Wayan Adi P, S.Pd", room: "Ruang XI A1", color: "emerald" },
      { time: "08:45 - 10:15", periods: "Jam 3 - 4", subject: "Bahasa Indonesia", teacher: "Heti Kus Endang, S.Pd", room: "Ruang XI A1", color: "amber" },
      { time: "10:15 - 10:45", periods: "-", subject: "Istirahat Pertama", teacher: "-", room: "Kantin Sekolah", isBreak: true },
      { time: "10:45 - 12:15", periods: "Jam 5 - 6", subject: "Sejarah Indonesia", teacher: "Lia Dwi Susanti, S.Pd.", room: "Ruang XI A1", color: "indigo" },
      { time: "12:15 - 13:00", periods: "-", subject: "Istirahat Kedua & Sholat Dzuhur", teacher: "-", room: "Masjid Sekolah", isBreak: true },
      { time: "13:00 - 14:15", periods: "Jam 7 - 8", subject: "Matematika Wajib", teacher: "Syarif Hidayat, S.Pd.", room: "Ruang XI A1", color: "blue" },
      { time: "14:15 - 15:45", periods: "Jam 9 - 11", subject: "Bahasa Inggris", teacher: "Yuyun Nurhidayati Amalia, M.Pd", room: "Ruang XI A1", color: "violet" }
    ],
    rabu: [
      { time: "07:15 - 08:45", periods: "Jam 1 - 2", subject: "Seni Budaya", teacher: "Margareta Sri Yamah, SE", room: "Ruang Seni / XI A1", color: "pink" },
      { time: "08:45 - 10:15", periods: "Jam 3 - 4", subject: "Ekonomi", teacher: "Nuraini, SE", room: "Ruang XI A1", color: "cyan" },
      { time: "10:15 - 10:45", periods: "-", subject: "Istirahat", teacher: "-", room: "Kantin Sekolah", isBreak: true },
      { time: "10:45 - 13:45", periods: "Jam 5 - 8", subject: "Geografi", teacher: "I Wayan Adi P, S.Pd", room: "Lab / Ruang XI A1", color: "emerald" }
    ],
    kamis: [
      { time: "07:15 - 08:45", periods: "Jam 1 - 2", subject: "PKn (Pendidikan Kewarganegaraan)", teacher: "Tuti Handayani, S.Pd", room: "Ruang XI A1", color: "red" },
      { time: "08:45 - 10:15", periods: "Jam 3 - 4", subject: "Informatika", teacher: "Nadhea Zaintika, S.Pd", room: "Lab Komputer SMAN 1 Pasir Sakti", color: "sky" },
      { time: "10:15 - 10:45", periods: "-", subject: "Istirahat Pertama", teacher: "-", room: "Kantin Sekolah", isBreak: true },
      { time: "10:45 - 12:15", periods: "Jam 5 - 6", subject: "Bahasa Inggris Lanjut", teacher: "Yuyun Nurhidayati Amalia, M.Pd", room: "Ruang XI A1", color: "violet" },
      { time: "12:15 - 13:00", periods: "-", subject: "Istirahat Kedua & Sholat Dzuhur", teacher: "-", room: "Masjid Sekolah", isBreak: true },
      { time: "13:00 - 14:15", periods: "Jam 7 - 9", subject: "Ekonomi", teacher: "Nuraini, SE", room: "Ruang XI A1", color: "cyan" },
      { time: "14:15 - 15:45", periods: "Jam 10 - 11", subject: "Bahasa Indonesia", teacher: "Heti Kus Endang, S.Pd", room: "Ruang XI A1", color: "amber" }
    ],
    jumat: [
      { time: "07:00 - 08:30", periods: "Jam 1 - 3", subject: "Informatika", teacher: "Nadhea Zaintika, S.Pd", room: "Lab Komputer SMAN 1 Pasir Sakti", color: "sky" },
      { time: "08:30 - 09:45", periods: "Jam 4 - 5", subject: "Prakarya & Kewirausahaan (PKWU)", teacher: "Suryaman, S.Pd", room: "Ruang XI A1", color: "teal" },
      { time: "09:45 - 10:15", periods: "-", subject: "Istirahat Pagi", teacher: "-", room: "Kantin Sekolah", isBreak: true },
      { time: "10:15 - 11:45", periods: "Jam 6 - 8", subject: "Pendidikan Agama & Budi Pekerti", teacher: "Maria Yuliati, S.Pd.I.", room: "Ruang XI A1", color: "emerald" }
    ]
  },

  // Jadwal Piket Kebersihan Harian (Sesuai Chat Grup WhatsApp "CLASS ELEVEN A-ONE")
  cleaningDuty: {
    senin: {
      team: ["Ayunda", "Novia", "Febri", "Aida", "Liza", "Gievran", "Davit", "Abi"],
      leader: "Ayunda",
      note: "Bawa lap kain & bersihkan papan tulis serta lantai depan kelas."
    },
    selasa: {
      team: ["Oxa", "Nadia", "Melani", "Nadila", "Brian", "Stevan", "Razza"],
      leader: "Oxa",
      note: "Menyapu ruang kelas, rapikan meja, dan buang tempat sampah."
    },
    rabu: {
      team: ["Nabila", "Aura", "Isra", "Rista", "Aurel", "Rafa", "Azam"],
      leader: "Aura",
      note: "Pembersihan jendela dan lantai ruang belajar XI A1."
    },
    kamis: {
      team: ["Tasya", "Rani", "Arin", "Bela", "Dinda", "Ardho", "Gabriel"],
      leader: "Gabriel",
      note: "Piket kebersihan kelas dan penataan kursi belajar."
    },
    jumat: {
      team: ["Zia", "Aqista", "Nadya", "Leli", "Ilham", "Zemindra", "Chandra"],
      leader: "Zia",
      note: "Jumat bersih menyeluruh sebelum sholat Jumat."
    }
  },

  // Papan Tugas & PR XI A1
  tasks: [
    {
      id: "task-1",
      title: "Makalah Analisis Fenomena Geosfer di Lampung Timur",
      subject: "Geografi",
      teacher: "I Wayan Adi P, S.Pd",
      deadline: "2026-10-28",
      priority: "Tinggi",
      status: "inprogress",
      description: "Tugas kelompok geografi. Pembahasan bentang alam dan potensi wilayah Pasir Sakti."
    },
    {
      id: "task-2",
      title: "Latihan Siklus Akuntansi & Laporan Laba Rugi",
      subject: "Ekonomi",
      teacher: "Nuraini, SE",
      deadline: "2026-10-29",
      priority: "Tinggi",
      status: "todo",
      description: "Kerjakan buku paket halaman 112 bagian B nomor 1-5 di buku bergaris merah."
    },
    {
      id: "task-3",
      title: "Esai Perjuangan Pahlawan Kemerdekaan Daerah Lampung",
      subject: "Sejarah Indonesia",
      teacher: "Lia Dwi Susanti, S.Pd.",
      deadline: "2026-11-02",
      priority: "Sedang",
      status: "todo",
      description: "Panjang esai minimal 500 kata dengan referensi sejarah terpercaya."
    },
    {
      id: "task-4",
      title: "Speaking Task: Youth Inspiration & Leadership",
      subject: "Bahasa Inggris Lanjut",
      teacher: "Yuyun Nurhidayati Amalia, M.Pd",
      deadline: "2026-11-05",
      priority: "Sedang",
      status: "inprogress",
      description: "Presentasi berpasangan durasi 5 menit per kelompok."
    },
    {
      id: "task-5",
      title: "Rangkuman Materi Akhlak Terpuji & Budi Pekerti",
      subject: "Pendidikan Agama",
      teacher: "Maria Yuliati, S.Pd.I.",
      deadline: "2026-10-23",
      priority: "Rendah",
      status: "done",
      description: "Catatan mind map ringkasan bab 3 di buku catatan agama."
    }
  ],

  // Transparansi Kas Kelas XI A1
  treasury: {
    monthlyFee: 10000,
    currentBalance: 1350000,
    totalIncome: 2450000,
    totalExpense: 1100000,
    transactions: [
      { id: "trx-1", type: "income", date: "2026-10-02", amount: 310000, desc: "Iuran Kas Minggu 1 (31 Siswa)", category: "Iuran Kas" },
      { id: "trx-2", type: "expense", date: "2026-10-05", amount: 85000, desc: "Spidol Whiteboard & Tinta Refill", category: "Perlengkapan" },
      { id: "trx-3", type: "expense", date: "2026-10-10", amount: 120000, desc: "Peralatan Kebersihan (Sapu & Kain Pel)", category: "Perlengkapan" },
      { id: "trx-4", type: "income", date: "2026-10-12", amount: 250000, desc: "Uang Pembinaan Lomba Kebersihan Kelas", category: "Hadiah Lomba" },
      { id: "trx-5", type: "expense", date: "2026-10-16", amount: 200000, desc: "Tali Kasih Menjenguk Rekan Sekelas", category: "Sosial" },
      { id: "trx-6", type: "income", date: "2026-10-21", amount: 280000, desc: "Iuran Kas Minggu 3", category: "Iuran Kas" }
    ]
  },

  // Galeri Kenangan
  gallery: [
    {
      id: "gal-1",
      title: "Upacara Bendera Hari Senin SMAN 1 Pasir Sakti",
      date: "05 Oktober 2026",
      category: "Akademik",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
      description: "Barisan rapi dan disiplin siswa-siswi XI A1 saat pelaksanaan upacara bendera."
    },
    {
      id: "gal-2",
      title: "Pengamatan Lapangan Lingkungan Geografi Pasir Sakti",
      date: "12 September 2026",
      category: "Praktikum",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      description: "Mempelajari tata guna lahan dan kontur alam bersama Pak I Wayan Adi P, S.Pd."
    },
    {
      id: "gal-3",
      title: "Supporter Kompak XI A1 di Turnamen Antar Kelas",
      date: "04 Oktober 2026",
      category: "Classmeet",
      image: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80",
      description: "Sorak semangat penuh kekompakan mendukung tim kebanggaan kelas XI A1."
    },
    {
      id: "gal-4",
      title: "Praktik Komputer di Laboratorium Informatika",
      date: "08 Oktober 2026",
      category: "Praktikum",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80",
      description: "Sesi pembelajaran pengolah data dan perangkat lunak bersama Bu Nadhea Zaintika."
    },
    {
      id: "gal-5",
      title: "Momen Syukuran Bersama Bu Maria Yuliati",
      date: "14 Oktober 2026",
      category: "Momen Seru",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
      description: "Ungkapan rasa terima kasih dan kebersamaan hangat bersama wali kelas tercinta."
    },
    {
      id: "gal-6",
      title: "Belajar Kelompok Materi Ekonomi & Sejarah",
      date: "19 Oktober 2026",
      category: "Akademik",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
      description: "Diskusi seru dan saling berbagi rangkuman materi persiapan evaluasi belajar."
    }
  ],

  // Sticky Notes / Mading Virtual XI A1
  stickyNotes: [
    {
      id: "note-1",
      sender: "Ketua Kelas (Gabriel)",
      date: "Kemarin",
      color: "bg-blue-100 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-100",
      text: "Semangat buat teman-teman XI A1! Tetap kompak, jaga kebersihan kelas, dan saling bantu saat belajar ya! 🔥✨",
      likes: 32
    },
    {
      id: "note-2",
      sender: "Koordinator Piket (Ayunda)",
      date: "Kemarin",
      color: "bg-emerald-100 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100",
      text: "Pengingat untuk regu piket: jangan lupa datang pagi dan sediakan lap kain sesuai instruksi Bu Maria ya 🧹✨",
      likes: 24
    },
    {
      id: "note-3",
      sender: "Warga XI A1",
      date: "2 hari lalu",
      color: "bg-amber-100 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-100",
      text: "Terima kasih untuk Bu Maria Yuliati yang selalu sabar dan membimbing kita dengan penuh kasih sayang ❤️",
      likes: 35
    },
    {
      id: "note-4",
      sender: "Seksi Olahraga (Rhaza)",
      date: "Minggu lalu",
      color: "bg-purple-100 dark:bg-purple-950/40 border-purple-300 dark:border-purple-800 text-purple-900 dark:text-purple-100",
      text: "Gas terus latihannya! Jadikan XI A1 juara umum di setiap event sekolah! 🏆💪",
      likes: 28
    }
  ]
};
