// Web Kelas Modern - Main JavaScript Engine
// Author: Antigravity Assistant

class ClassApp {
  constructor() {
    this.storageKey = 'class_web_xi_a1_official_v3';
    this.themeKey = 'class_web_theme';
    this.activeTab = 'beranda';
    this.data = this.loadData();
    this.audioContext = null;
    this.lofiPlaying = false;
    this.lofiAudioNode = null;
    this.activeDaySchedule = this.getCurrentDaySlug();
    this.studentSearchQuery = '';
    this.studentGenderFilter = 'ALL';
    this.galleryCategoryFilter = 'ALL';

    this.init();
  }

  // 1. Data Initialization & Persistence
  loadData() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Gagal memuat data dari LocalStorage, menggunakan data default.', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_CLASS_DATA));
  }

  saveData() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    } catch (e) {
      console.error('Gagal menyimpan data ke LocalStorage:', e);
    }
  }

  resetData() {
    if (confirm('Apakah kamu yakin ingin mereset semua data kelas kembali ke data awal?')) {
      this.data = JSON.parse(JSON.stringify(DEFAULT_CLASS_DATA));
      this.saveData();
      this.showToast('Data berhasil direset ke pengaturan awal!', 'success');
      this.init();
      this.render();
    }
  }

  exportDataJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Data_${this.data.profile.name.replace(/\s+/g, '_')}_Backup.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    this.showToast('Data berhasil diekspor sebagai file JSON!', 'success');
  }

  importDataJSON(fileInput) {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        if (importedData.profile && importedData.students) {
          this.data = importedData;
          this.saveData();
          this.showToast('Data kelas berhasil dipulihkan dari file backup!', 'success');
          this.init();
          this.render();
        } else {
          alert('Format file JSON tidak sesuai struktur data kelas.');
        }
      } catch (err) {
        alert('File tidak valid atau terjadi kesalahan saat membaca JSON.');
      }
    };
    reader.readAsText(file);
  }

  // 2. Sound Effects Engine (Web Audio API - 100% Reliable without external assets)
  getAudioContext() {
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
    }
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    return this.audioContext;
  }

  playClickSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {}
  }

  playSuccessSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = ctx.currentTime + (idx * 0.08);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.3);
      });
    } catch (e) {}
  }

  playWheelTick() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch (e) {}
  }

  toggleLofiAmbient() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    if (this.lofiPlaying) {
      if (this.lofiAudioNode) {
        this.lofiAudioNode.gain.setTargetAtTime(0.001, ctx.currentTime, 0.5);
        setTimeout(() => {
          if (this.lofiAudioNode) {
            this.lofiAudioNode.stop?.();
            this.lofiAudioNode = null;
          }
        }, 600);
      }
      this.lofiPlaying = false;
      this.updateLofiUI(false);
      this.showToast('Ambient lofi dihentikan', 'info');
    } else {
      // Create calm binaural warm study noise + chord generator
      try {
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
        masterGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1);

        // Pink noise generator for gentle rain/vinyl texture
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
          b6 = white * 0.115926;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        // Filter for soft rain sound
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(900, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(masterGain);

        // Gentle sub warm tone
        const oscWarm = ctx.createOscillator();
        oscWarm.type = 'sine';
        oscWarm.frequency.setValueAtTime(130.81, ctx.currentTime); // C3
        const warmGain = ctx.createGain();
        warmGain.gain.setValueAtTime(0.03, ctx.currentTime);
        oscWarm.connect(warmGain);
        warmGain.connect(masterGain);

        masterGain.connect(ctx.destination);
        whiteNoise.start();
        oscWarm.start();

        this.lofiAudioNode = {
          gain: masterGain,
          stop: () => {
            try { whiteNoise.stop(); oscWarm.stop(); } catch(e){}
          }
        };

        this.lofiPlaying = true;
        this.updateLofiUI(true);
        this.showToast('Memutar ambient study mode (Suara Tenang) 🌧️🎧', 'success');
      } catch (err) {
        console.error('Audio init error:', err);
      }
    }
  }

  updateLofiUI(playing) {
    const btn = document.getElementById('lofiBtn');
    const wave = document.getElementById('lofiWaves');
    const text = document.getElementById('lofiText');
    if (!btn) return;

    if (playing) {
      btn.classList.add('bg-blue-600', 'text-white', 'shadow-blue-500/30', 'shadow-lg');
      btn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-200');
      if (wave) wave.classList.remove('hidden');
      if (text) text.textContent = 'Study Ambient (Aktif)';
    } else {
      btn.classList.remove('bg-blue-600', 'text-white', 'shadow-blue-500/30', 'shadow-lg');
      btn.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-200');
      if (wave) wave.classList.add('hidden');
      if (text) text.textContent = 'Study Ambient';
    }
  }

  // 3. Theme Toggle (Dark & Light Mode)
  initTheme() {
    const savedTheme = localStorage.getItem(this.themeKey) || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    this.setTheme(savedTheme);
  }

  setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem(this.themeKey, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(this.themeKey, 'light');
    }
    this.updateThemeIcons(theme);
  }

  toggleTheme() {
    this.playClickSound();
    const isDark = document.documentElement.classList.contains('dark');
    this.setTheme(isDark ? 'light' : 'dark');
  }

  updateThemeIcons(theme) {
    const sunIcons = document.querySelectorAll('.theme-sun-icon');
    const moonIcons = document.querySelectorAll('.theme-moon-icon');
    if (theme === 'dark') {
      sunIcons.forEach(i => i.classList.remove('hidden'));
      moonIcons.forEach(i => i.classList.add('hidden'));
    } else {
      sunIcons.forEach(i => i.classList.add('hidden'));
      moonIcons.forEach(i => i.classList.remove('hidden'));
    }
  }

  // 4. Live Clock & Schedule Helper
  initClock() {
    const updateTime = () => {
      const now = new Date();
      const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const dateStr = now.toLocaleDateString('id-ID', optionsDate);
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const timeStr = `${hours}:${minutes}:${seconds} WIB`;

      const dateElem = document.getElementById('liveDateBadge');
      const timeElem = document.getElementById('liveTimeBadge');
      if (dateElem) dateElem.textContent = dateStr;
      if (timeElem) timeElem.textContent = timeStr;

      // Greeting
      const greetingElem = document.getElementById('dynamicGreeting');
      if (greetingElem) {
        const hr = now.getHours();
        let greeting = 'Selamat Malam';
        if (hr >= 4 && hr < 11) greeting = 'Selamat Pagi';
        else if (hr >= 11 && hr < 15) greeting = 'Selamat Siang';
        else if (hr >= 15 && hr < 18) greeting = 'Selamat Sore';
        greetingElem.textContent = `${greeting}, Calon Sukses! 👋`;
      }
    };
    updateTime();
    setInterval(updateTime, 1000);
  }

  getCurrentDaySlug() {
    const dayIndex = new Date().getDay();
    // 0: Minggu, 1: Senin, 2: Selasa, 3: Rabu, 4: Kamis, 5: Jumat, 6: Sabtu
    switch(dayIndex) {
      case 1: return 'senin';
      case 2: return 'selasa';
      case 3: return 'rabu';
      case 4: return 'kamis';
      case 5: return 'jumat';
      default: return 'senin'; // Weekend defaults to Senin
    }
  }

  // 5. Toast Notifications
  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    const colors = {
      success: 'bg-emerald-600 text-white shadow-emerald-500/20',
      error: 'bg-rose-600 text-white shadow-rose-500/20',
      info: 'bg-slate-900 dark:bg-slate-800 text-white shadow-black/30'
    };
    
    toast.className = `flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl text-sm font-medium border border-white/10 transition-all duration-300 transform translate-y-4 opacity-0 pointer-events-auto ${colors[type] || colors.info}`;
    
    let iconName = 'info';
    if (type === 'success') iconName = 'check-circle';
    if (type === 'error') iconName = 'alert-triangle';

    toast.innerHTML = `
      <i data-lucide="${iconName}" class="w-5 h-5 flex-shrink-0"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    // Animate in
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
    });

    // Animate out
    setTimeout(() => {
      toast.classList.add('opacity-0', '-translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // 6. Navigation System
  switchTab(tabId) {
    this.playClickSound();
    this.activeTab = tabId;

    // Update active nav button styles
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      const target = btn.dataset.tab;
      if (target === tabId) {
        btn.classList.add('bg-blue-600', 'text-white', 'shadow-md', 'shadow-blue-500/20');
        btn.classList.remove('text-slate-600', 'dark:text-slate-400', 'hover:bg-slate-100', 'dark:hover:bg-slate-800');
      } else {
        btn.classList.remove('bg-blue-600', 'text-white', 'shadow-md', 'shadow-blue-500/20');
        btn.classList.add('text-slate-600', 'dark:text-slate-400', 'hover:bg-slate-100', 'dark:hover:bg-slate-800');
      }
    });

    // Show/hide sections
    document.querySelectorAll('.tab-content-section').forEach(section => {
      if (section.id === `section-${tabId}`) {
        section.classList.remove('hidden');
        section.classList.add('block');
      } else {
        section.classList.add('hidden');
        section.classList.remove('block');
      }
    });

    // Close mobile drawer if open
    this.closeMobileMenu();

    // Trigger specific renders if needed
    if (tabId === 'kas') this.renderTreasuryChart();
    if (tabId === 'funzone') this.drawWheel();

    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.lucide) lucide.createIcons();
  }

  toggleMobileMenu() {
    const menu = document.getElementById('mobileMenuDrawer');
    if (!menu) return;
    menu.classList.toggle('hidden');
  }

  closeMobileMenu() {
    const menu = document.getElementById('mobileMenuDrawer');
    if (menu) menu.classList.add('hidden');
  }

  // 7. Render Views
  render() {
    this.renderHeaderAndBrand();
    this.renderDashboard();
    this.renderOrgStructure();
    this.renderStudents();
    this.renderSchedule();
    this.renderCleaningDuty();
    this.renderTasks();
    this.renderTreasury();
    this.renderGallery();
    this.renderFunZone();
    this.renderSettings();
    if (window.lucide) lucide.createIcons();
  }

  renderHeaderAndBrand() {
    const p = this.data.profile;
    document.querySelectorAll('.class-name-text').forEach(el => el.textContent = p.name);
    document.querySelectorAll('.class-nickname-text').forEach(el => el.textContent = p.nickname);
    document.querySelectorAll('.school-name-text').forEach(el => el.textContent = `${p.school}${p.location ? ' • ' + p.location : ''}`);
    document.querySelectorAll('.class-tagline-text').forEach(el => el.textContent = p.tagline);
    document.querySelectorAll('.class-academic-year').forEach(el => el.textContent = p.academicYear);

    // Homeroom Teacher Spotlight
    if (p.homeroomTeacher) {
      document.querySelectorAll('.homeroom-name-text').forEach(el => el.textContent = p.homeroomTeacher.name);
      document.querySelectorAll('.homeroom-subject-text').forEach(el => el.textContent = `${p.homeroomTeacher.subject} • ${p.homeroomTeacher.school || p.school}`);
      document.querySelectorAll('.homeroom-quote-text').forEach(el => el.textContent = `"${p.homeroomTeacher.quote}"`);
      document.querySelectorAll('.homeroom-nip-text').forEach(el => el.textContent = `NIP: ${p.homeroomTeacher.nip}`);
      document.querySelectorAll('.homeroom-avatar-img').forEach(el => {
        if (p.homeroomTeacher.avatar) el.src = p.homeroomTeacher.avatar;
      });
    }
  }

  // Dashboard / Beranda
  renderDashboard() {
    const statsTotalStudents = document.getElementById('statTotalStudents');
    const statsTreasuryBalance = document.getElementById('statTreasuryBalance');
    const statsActiveTasks = document.getElementById('statActiveTasks');
    const statsTodayDuty = document.getElementById('statTodayDuty');

    if (statsTotalStudents) statsTotalStudents.textContent = this.data.students.length;
    if (statsTreasuryBalance) statsTreasuryBalance.textContent = `Rp ${this.data.treasury.currentBalance.toLocaleString('id-ID')}`;
    
    const activeTasksCount = this.data.tasks.filter(t => t.status !== 'done').length;
    if (statsActiveTasks) statsActiveTasks.textContent = `${activeTasksCount} Tugas`;

    const currentDay = this.getCurrentDaySlug();
    const dutyToday = this.data.cleaningDuty[currentDay]?.team || [];
    if (statsTodayDuty) statsTodayDuty.textContent = `${dutyToday.length} Siswa (${currentDay.toUpperCase()})`;

    // Announcements
    const annContainer = document.getElementById('announcementsList');
    if (annContainer) {
      if (this.data.announcements.length === 0) {
        annContainer.innerHTML = `<div class="p-4 text-center text-slate-400 text-sm">Belum ada pengumuman baru.</div>`;
      } else {
        annContainer.innerHTML = this.data.announcements.map(ann => `
          <div class="p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 hover:border-blue-500/40 transition">
            <div class="flex items-center justify-between gap-2 mb-1.5">
              <span class="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                ann.badgeColor === 'red' ? 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400' :
                ann.badgeColor === 'amber' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400' :
                'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
              }">${ann.badge}</span>
              <span class="text-xs text-slate-400">${ann.date} • ${ann.author}</span>
            </div>
            <h4 class="font-bold text-slate-900 dark:text-white text-base mb-1">${ann.title}</h4>
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">${ann.content}</p>
          </div>
        `).join('');
      }
    }
  }

  // Struktur Organisasi Kelas
  renderOrgStructure() {
    const container = document.getElementById('orgStructureContainer');
    if (!container) return;

    container.innerHTML = this.data.orgStructure.map(member => `
      <div class="glass-panel glass-card p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between group">
        <div class="absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-br ${member.color} opacity-20 rounded-full blur-2xl group-hover:opacity-40 transition"></div>
        <div class="flex items-center gap-4">
          <img src="${member.photo}" alt="${member.name}" class="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/20 shadow-md">
          <div class="flex-1 min-w-0">
            <span class="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gradient-to-r ${member.color} text-white shadow-sm mb-1">
              ${member.role}
            </span>
            <h3 class="font-bold text-slate-900 dark:text-white text-base truncate">${member.name}</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 truncate">${member.subtitle || ''}</p>
          </div>
        </div>
        ${member.quote ? `
          <div class="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex items-start gap-2">
            <i data-lucide="quote" class="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5"></i>
            <p class="text-xs text-slate-600 dark:text-slate-300 italic line-clamp-2">"${member.quote}"</p>
          </div>
        ` : ''}
        ${member.ig ? `
          <div class="mt-2 text-right">
            <a href="https://instagram.com/${member.ig.replace('@', '')}" target="_blank" class="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-500 hover:text-blue-600">
              <i data-lucide="instagram" class="w-3.5 h-3.5"></i> ${member.ig}
            </a>
          </div>
        ` : ''}
      </div>
    `).join('');
  }

  // Direktori Siswa
  filterStudents(gender) {
    this.playClickSound();
    this.studentGenderFilter = gender;
    document.querySelectorAll('.gender-filter-btn').forEach(btn => {
      if (btn.dataset.gender === gender) {
        btn.classList.add('bg-blue-600', 'text-white', 'shadow-md');
        btn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-400');
      } else {
        btn.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
        btn.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-400');
      }
    });
    this.renderStudents();
  }

  onStudentSearch(query) {
    this.studentSearchQuery = query.toLowerCase();
    this.renderStudents();
  }

  renderStudents() {
    const container = document.getElementById('studentGridContainer');
    const counterBadge = document.getElementById('studentCountBadge');
    if (!container) return;

    let filtered = this.data.students.filter(student => {
      const matchGender = this.studentGenderFilter === 'ALL' || student.gender === this.studentGenderFilter;
      const matchSearch = student.name.toLowerCase().includes(this.studentSearchQuery) ||
                          student.nickname.toLowerCase().includes(this.studentSearchQuery) ||
                          student.absen.includes(this.studentSearchQuery) ||
                          student.dream.toLowerCase().includes(this.studentSearchQuery) ||
                          student.hobby.toLowerCase().includes(this.studentSearchQuery);
      return matchGender && matchSearch;
    });

    if (counterBadge) {
      counterBadge.textContent = `Menampilkan ${filtered.length} dari ${this.data.students.length} Siswa`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-16 text-center">
          <i data-lucide="user-x" class="w-12 h-12 mx-auto text-slate-400 mb-3"></i>
          <p class="text-slate-600 dark:text-slate-300 font-medium">Tidak ada siswa yang sesuai dengan kata kunci.</p>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    container.innerHTML = filtered.map(student => `
      <div class="glass-panel glass-card p-4 rounded-3xl flex flex-col justify-between group cursor-pointer" onclick="classApp.openStudentModal(${student.id})">
        <div>
          <div class="relative mb-3 overflow-hidden rounded-2xl aspect-square">
            <img src="${student.avatar}" alt="${student.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
            <span class="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-black/60 backdrop-blur-md text-white border border-white/20">
              #${student.absen}
            </span>
            <span class="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-xs font-bold ${
              student.gender === 'L' ? 'bg-blue-600/80 text-white' : 'bg-pink-600/80 text-white'
            } backdrop-blur-md">
              ${student.gender === 'L' ? 'Putra' : 'Putri'}
            </span>
          </div>
          <h4 class="font-bold text-slate-900 dark:text-white text-base group-hover:text-blue-500 transition truncate">${student.name}</h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Panggilan: <strong>${student.nickname}</strong>
          </p>
          <div class="mt-2 text-xs text-slate-600 dark:text-slate-300 line-clamp-1">
            <i data-lucide="target" class="w-3.5 h-3.5 inline text-indigo-500 mr-1"></i> ${student.dream}
          </div>
        </div>
        <div class="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs">
          <span class="text-slate-400 flex items-center gap-1">
            <i data-lucide="instagram" class="w-3.5 h-3.5"></i> ${student.ig}
          </span>
          <button class="text-blue-500 hover:text-blue-600 font-semibold inline-flex items-center gap-0.5">
            Detail <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    `).join('');
    if (window.lucide) lucide.createIcons();
  }

  openStudentModal(studentId) {
    this.playClickSound();
    const student = this.data.students.find(s => s.id === studentId);
    if (!student) return;

    const modal = document.getElementById('studentDetailModal');
    const content = document.getElementById('studentModalContent');
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="relative p-6 sm:p-8">
        <button onclick="classApp.closeStudentModal()" class="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white transition">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>

        <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div class="relative w-36 h-36 rounded-3xl overflow-hidden ring-4 ring-blue-500/20 shadow-xl flex-shrink-0">
            <img src="${student.avatar}" alt="${student.name}" class="w-full h-full object-cover">
            <span class="absolute bottom-2 left-2 right-2 text-center text-xs font-mono font-bold bg-black/70 text-white rounded-lg py-0.5">
              Absen #${student.absen}
            </span>
          </div>
          <div class="flex-1 text-center sm:text-left">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
              student.gender === 'L' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' : 'bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300'
            } mb-2">
              <span>${student.gender === 'L' ? 'Siswa Putra' : 'Siswi Putri'}</span>
              <span>•</span>
              <span>Zodiak: ${student.zodiac}</span>
            </div>
            <h2 class="text-2xl font-bold font-display text-slate-900 dark:text-white">${student.name}</h2>
            <p class="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Nama Panggilan: <span class="text-blue-500 font-semibold">${student.nickname}</span></p>

            <div class="mt-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-sm text-slate-700 dark:text-slate-300 italic">
              "${student.quote}"
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
          <div class="p-3.5 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60">
            <span class="text-xs text-slate-400 font-medium block">Cita-Cita / Impian</span>
            <div class="font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2 mt-1">
              <i data-lucide="compass" class="w-4 h-4 text-emerald-500"></i> ${student.dream}
            </div>
          </div>
          <div class="p-3.5 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60">
            <span class="text-xs text-slate-400 font-medium block">Hobi & Kegemaran</span>
            <div class="font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2 mt-1">
              <i data-lucide="gamepad-2" class="w-4 h-4 text-purple-500"></i> ${student.hobby}
            </div>
          </div>
          <div class="p-3.5 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60">
            <span class="text-xs text-slate-400 font-medium block">Tanggal Lahir</span>
            <div class="font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2 mt-1">
              <i data-lucide="calendar" class="w-4 h-4 text-amber-500"></i> ${student.birthday}
            </div>
          </div>
          <div class="p-3.5 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60">
            <span class="text-xs text-slate-400 font-medium block">Status Kas Bulan Ini</span>
            <div class="font-semibold flex items-center gap-2 mt-1 ${
              student.kasPaid ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'
            }">
              <i data-lucide="${student.kasPaid ? 'check-circle' : 'clock'}" class="w-4 h-4"></i>
              ${student.kasPaid ? 'Lunas (Rp 15.000)' : 'Belum Membayar'}
            </div>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-between pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
          <a href="https://instagram.com/${student.ig.replace('@', '')}" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium text-xs shadow-md shadow-pink-500/20 hover:opacity-90">
            <i data-lucide="instagram" class="w-4 h-4"></i> Ikuti di Instagram
          </a>
          <button onclick="classApp.toggleStudentKasPayment(${student.id})" class="px-4 py-2 rounded-xl text-xs font-semibold border ${
            student.kasPaid ? 'border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40' : 'border-emerald-300 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
          }">
            ${student.kasPaid ? 'Tandai Belum Bayar' : 'Tandai Sudah Lunas'}
          </button>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  }

  closeStudentModal() {
    this.playClickSound();
    const modal = document.getElementById('studentDetailModal');
    if (modal) modal.classList.add('hidden');
  }

  toggleStudentKasPayment(studentId) {
    this.playClickSound();
    const student = this.data.students.find(s => s.id === studentId);
    if (!student) return;
    student.kasPaid = !student.kasPaid;
    this.saveData();
    this.openStudentModal(studentId);
    this.renderTreasury();
    this.showToast(`Status kas ${student.name} berhasil diperbarui!`, 'success');
  }

  // Jadwal Pelajaran
  setScheduleDay(day) {
    this.playClickSound();
    this.activeDaySchedule = day;
    document.querySelectorAll('.schedule-day-tab').forEach(tab => {
      if (tab.dataset.day === day) {
        tab.classList.add('bg-blue-600', 'text-white', 'shadow-md');
        tab.classList.remove('text-slate-600', 'dark:text-slate-400', 'hover:bg-slate-100', 'dark:hover:bg-slate-800');
      } else {
        tab.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
        tab.classList.add('text-slate-600', 'dark:text-slate-400', 'hover:bg-slate-100', 'dark:hover:bg-slate-800');
      }
    });
    this.renderSchedule();
  }

  renderSchedule() {
    const container = document.getElementById('schedulePeriodsContainer');
    if (!container) return;

    const list = this.data.schedule[this.activeDaySchedule] || [];
    const isToday = this.getCurrentDaySlug() === this.activeDaySchedule;

    container.innerHTML = list.map((item, index) => {
      if (item.isBreak) {
        return `
          <div class="p-3.5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/40 border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-between text-slate-500 text-xs">
            <span class="flex items-center gap-2 font-medium">
              <i data-lucide="coffee" class="w-4 h-4 text-amber-500"></i> ${item.subject} (${item.room})
            </span>
            <span class="font-mono font-bold">${item.time}</span>
          </div>
        `;
      }

      return `
        <div class="glass-panel p-4 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-l-4 border-l-blue-500 hover:shadow-md transition">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex flex-col items-center justify-center font-bold text-xs flex-shrink-0">
              <span class="font-mono text-sm leading-none">0${index + 1}</span>
              ${item.periods ? `<span class="text-[9px] text-blue-500 font-bold mt-0.5">${item.periods.replace('Jam ', 'J-')}</span>` : ''}
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="font-bold text-slate-900 dark:text-white text-base">${item.subject}</h4>
                ${isToday && index === 0 ? `
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 animate-pulse">
                    Hari Ini
                  </span>
                ` : ''}
              </div>
              <p class="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-2.5 mt-1">
                <span class="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-200"><i data-lucide="user" class="w-3.5 h-3.5 text-blue-500"></i> ${item.teacher}</span>
                <span class="flex items-center gap-1"><i data-lucide="map-pin" class="w-3.5 h-3.5 text-emerald-500"></i> ${item.room}</span>
                ${item.periods ? `<span class="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-500 font-bold">${item.periods}</span>` : ''}
              </p>
            </div>
          </div>
          <div class="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-mono text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 self-end sm:self-center">
            <i data-lucide="clock" class="w-3.5 h-3.5 text-blue-500"></i> ${item.time}
          </div>
        </div>
      `;
    }).join('');
    if (window.lucide) lucide.createIcons();
  }

  // Jadwal Piket
  renderCleaningDuty() {
    const container = document.getElementById('cleaningDutyGrid');
    if (!container) return;

    const days = [
      { slug: 'senin', title: 'Senin' },
      { slug: 'selasa', title: 'Selasa' },
      { slug: 'rabu', title: 'Rabu' },
      { slug: 'kamis', title: 'Kamis' },
      { slug: 'jumat', title: 'Jumat' }
    ];

    const todaySlug = this.getCurrentDaySlug();

    container.innerHTML = days.map(d => {
      const duty = this.data.cleaningDuty[d.slug];
      const isToday = d.slug === todaySlug;

      return `
        <div class="glass-panel p-5 rounded-3xl ${isToday ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/10' : ''} flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3">
              <h4 class="font-bold font-display text-lg text-slate-900 dark:text-white flex items-center gap-2">
                ${d.title}
                ${isToday ? '<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white">Hari Ini</span>' : ''}
              </h4>
              <span class="text-xs text-slate-400">Koord: <strong>${duty?.leader || '-'}</strong></span>
            </div>

            <ul class="space-y-1.5">
              ${(duty?.team || []).map((name, i) => `
                <li class="flex items-center justify-between p-2 rounded-xl bg-white/40 dark:bg-slate-800/40 text-xs text-slate-700 dark:text-slate-300">
                  <span class="flex items-center gap-2">
                    <span class="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center text-[10px] font-bold">${i+1}</span>
                    ${name}
                  </span>
                  <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-500 opacity-60"></i>
                </li>
              `).join('')}
            </ul>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 text-[11px] text-slate-400 flex flex-col gap-1.5">
            <div class="flex items-center justify-between">
              <span>Tugas: Sapu, Pel, Papan</span>
              <span class="text-emerald-500 font-semibold flex items-center gap-1"><i data-lucide="check" class="w-3 h-3"></i> Terjadwal Resmi</span>
            </div>
            ${duty?.note ? `<div class="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-[10px] flex items-center gap-1.5"><i data-lucide="info" class="w-3.5 h-3.5 flex-shrink-0 text-amber-500"></i> ${duty.note}</div>` : ''}
          </div>
        </div>
      `;
    }).join('');
    if (window.lucide) lucide.createIcons();
  }

  // Papan Tugas & PR
  renderTasks() {
    const todoCol = document.getElementById('taskColTodo');
    const inprogCol = document.getElementById('taskColInprogress');
    const doneCol = document.getElementById('taskColDone');

    if (!todoCol || !inprogCol || !doneCol) return;

    const renderCard = (task) => {
      const priorityColors = {
        'Tinggi': 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400',
        'Sedang': 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400',
        'Rendah': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
      };

      return `
        <div class="glass-panel p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm hover:shadow-md transition group">
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${priorityColors[task.priority] || priorityColors['Sedang']}">
              ${task.priority}
            </span>
            <span class="text-xs font-mono text-slate-400 flex items-center gap-1">
              <i data-lucide="calendar" class="w-3 h-3"></i> ${task.deadline}
            </span>
          </div>

          <h5 class="font-bold text-slate-900 dark:text-white text-sm leading-snug mb-1">${task.title}</h5>
          <p class="text-xs text-blue-500 font-semibold mb-2">${task.subject} • ${task.teacher || 'Guru Pengampu'}</p>
          <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3">${task.description}</p>

          <div class="pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
            <div class="flex items-center gap-1">
              ${task.status !== 'todo' ? `
                <button onclick="classApp.updateTaskStatus('${task.id}', 'todo')" title="Pindahkan ke Belum Dikerjakan" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600">
                  <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
                </button>
              ` : ''}
              ${task.status !== 'inprogress' ? `
                <button onclick="classApp.updateTaskStatus('${task.id}', 'inprogress')" title="Pindahkan ke Sedang Dikerjakan" class="px-2 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 text-[10px] font-semibold hover:bg-amber-100">
                  Progres
                </button>
              ` : ''}
              ${task.status !== 'done' ? `
                <button onclick="classApp.updateTaskStatus('${task.id}', 'done')" title="Tandai Selesai" class="px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold hover:bg-emerald-100 flex items-center gap-0.5">
                  <i data-lucide="check" class="w-3 h-3"></i> Selesai
                </button>
              ` : ''}
            </div>

            <button onclick="classApp.deleteTask('${task.id}')" title="Hapus Tugas" class="p-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 text-slate-400 hover:text-rose-500 transition">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      `;
    };

    const todos = this.data.tasks.filter(t => t.status === 'todo');
    const inprogs = this.data.tasks.filter(t => t.status === 'inprogress');
    const dones = this.data.tasks.filter(t => t.status === 'done');

    todoCol.innerHTML = todos.length ? todos.map(renderCard).join('') : '<p class="text-xs text-center text-slate-400 py-6">Tidak ada tugas di kolom ini.</p>';
    inprogCol.innerHTML = inprogs.length ? inprogs.map(renderCard).join('') : '<p class="text-xs text-center text-slate-400 py-6">Tidak ada tugas di kolom ini.</p>';
    doneCol.innerHTML = dones.length ? dones.map(renderCard).join('') : '<p class="text-xs text-center text-slate-400 py-6">Belum ada tugas selesai.</p>';

    document.getElementById('badgeTaskTodoCount').textContent = todos.length;
    document.getElementById('badgeTaskInprogCount').textContent = inprogs.length;
    document.getElementById('badgeTaskDoneCount').textContent = dones.length;

    if (window.lucide) lucide.createIcons();
  }

  updateTaskStatus(taskId, newStatus) {
    this.playClickSound();
    const task = this.data.tasks.find(t => t.id === taskId);
    if (!task) return;
    task.status = newStatus;
    this.saveData();
    this.renderTasks();
    this.renderDashboard();

    if (newStatus === 'done') {
      this.playSuccessSound();
      if (typeof confetti === 'function') {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      }
      this.showToast(`Hore! Tugas "${task.title}" selesai dikerjakan! 🎉`, 'success');
    } else {
      this.showToast('Status tugas berhasil diperbarui.', 'info');
    }
  }

  addNewTask(e) {
    e.preventDefault();
    const form = e.target;
    const title = form.taskTitle.value.trim();
    const subject = form.taskSubject.value.trim();
    const deadline = form.taskDeadline.value;
    const priority = form.taskPriority.value;
    const description = form.taskDesc.value.trim() || 'Tidak ada deskripsi tambahan.';

    if (!title || !subject || !deadline) {
      alert('Harap isi judul tugas, mata pelajaran, dan deadline!');
      return;
    }

    const newTask = {
      id: 'task-' + Date.now(),
      title,
      subject,
      deadline,
      priority,
      status: 'todo',
      description
    };

    this.data.tasks.unshift(newTask);
    this.saveData();
    this.renderTasks();
    this.renderDashboard();
    form.reset();
    this.closeModal('addTaskModal');
    this.playSuccessSound();
    this.showToast('Tugas baru berhasil ditambahkan ke papan!', 'success');
  }

  deleteTask(taskId) {
    if (confirm('Hapus tugas ini dari papan?')) {
      this.data.tasks = this.data.tasks.filter(t => t.id !== taskId);
      this.saveData();
      this.renderTasks();
      this.renderDashboard();
      this.showToast('Tugas dihapus.', 'info');
    }
  }

  // Kas Kelas
  renderTreasury() {
    const t = this.data.treasury;
    const balanceElem = document.getElementById('treasuryCurrentBalance');
    const incomeElem = document.getElementById('treasuryTotalIncome');
    const expenseElem = document.getElementById('treasuryTotalExpense');

    if (balanceElem) balanceElem.textContent = `Rp ${t.currentBalance.toLocaleString('id-ID')}`;
    if (incomeElem) incomeElem.textContent = `+Rp ${t.totalIncome.toLocaleString('id-ID')}`;
    if (expenseElem) expenseElem.textContent = `-Rp ${t.totalExpense.toLocaleString('id-ID')}`;

    // Transactions list
    const trxList = document.getElementById('treasuryTransactionsList');
    if (trxList) {
      trxList.innerHTML = t.transactions.map(trx => `
        <div class="flex items-center justify-between p-3.5 rounded-2xl bg-white/40 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 hover:bg-white dark:hover:bg-slate-800 transition">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
              trx.type === 'income' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400'
            }">
              <i data-lucide="${trx.type === 'income' ? 'arrow-down-left' : 'arrow-up-right'}" class="w-5 h-5"></i>
            </div>
            <div>
              <h5 class="font-bold text-slate-900 dark:text-white text-sm">${trx.desc}</h5>
              <p class="text-xs text-slate-400">${trx.date} • Kategori: ${trx.category}</p>
            </div>
          </div>
          <div class="font-bold font-mono text-sm ${trx.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}">
            ${trx.type === 'income' ? '+' : '-'}Rp ${trx.amount.toLocaleString('id-ID')}
          </div>
        </div>
      `).join('');
    }

    // Student payment checklist
    const paymentGrid = document.getElementById('treasuryStudentsPaymentGrid');
    if (paymentGrid) {
      const paidCount = this.data.students.filter(s => s.kasPaid).length;
      document.getElementById('kasPaidCounter').textContent = `${paidCount}/${this.data.students.length} Siswa Lunas Bulan Ini`;

      paymentGrid.innerHTML = this.data.students.map(s => `
        <div class="flex items-center justify-between p-2 rounded-xl bg-white/30 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-700/50 text-xs">
          <span class="flex items-center gap-2 truncate">
            <span class="w-5 h-5 rounded-md bg-slate-200 dark:bg-slate-700 font-mono text-[10px] flex items-center justify-center font-bold">${s.absen}</span>
            <span class="truncate text-slate-800 dark:text-slate-200">${s.name}</span>
          </span>
          <button onclick="classApp.toggleStudentKasPayment(${s.id})" class="px-2 py-0.5 rounded-lg font-bold text-[10px] ${
            s.kasPaid ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400'
          }">
            ${s.kasPaid ? 'Lunas' : 'Belum'}
          </button>
        </div>
      `).join('');
    }

    this.renderTreasuryChart();
    if (window.lucide) lucide.createIcons();
  }

  renderTreasuryChart() {
    const canvas = document.getElementById('treasuryChartCanvas');
    if (!canvas || typeof Chart === 'undefined') return;

    if (this.treasuryChartInstance) {
      this.treasuryChartInstance.destroy();
    }

    const t = this.data.treasury;
    this.treasuryChartInstance = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['Sisa Saldo Kas', 'Total Pengeluaran'],
        datasets: [{
          data: [t.currentBalance, t.totalExpense],
          backgroundColor: ['#10b981', '#f43f5e'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 12,
              font: { family: "'Plus Jakarta Sans', sans-serif", size: 12 }
            }
          }
        },
        cutout: '72%'
      }
    });
  }

  addNewTransaction(e) {
    e.preventDefault();
    const form = e.target;
    const type = form.trxType.value; // 'income' or 'expense'
    const desc = form.trxDesc.value.trim();
    const amount = parseInt(form.trxAmount.value, 10);
    const category = form.trxCategory.value;
    const date = form.trxDate.value;

    if (!desc || !amount || amount <= 0 || !date) {
      alert('Harap isi deskripsi, jumlah nominal yang valid, dan tanggal transaksi!');
      return;
    }

    const newTrx = {
      id: 'trx-' + Date.now(),
      type,
      date,
      amount,
      desc,
      category
    };

    if (type === 'income') {
      this.data.treasury.totalIncome += amount;
      this.data.treasury.currentBalance += amount;
    } else {
      this.data.treasury.totalExpense += amount;
      this.data.treasury.currentBalance -= amount;
    }

    this.data.treasury.transactions.unshift(newTrx);
    this.saveData();
    this.renderTreasury();
    this.renderDashboard();
    form.reset();
    this.closeModal('addTransactionModal');
    this.playSuccessSound();
    this.showToast('Transaksi kas baru berhasil dicatat!', 'success');
  }

  // Galeri Kenangan
  filterGallery(category) {
    this.playClickSound();
    this.galleryCategoryFilter = category;
    document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
      if (btn.dataset.category === category) {
        btn.classList.add('bg-blue-600', 'text-white', 'shadow-md');
        btn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-400');
      } else {
        btn.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
        btn.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-400');
      }
    });
    this.renderGallery();
  }

  renderGallery() {
    const container = document.getElementById('galleryGridContainer');
    if (!container) return;

    const filtered = this.data.gallery.filter(item => {
      return this.galleryCategoryFilter === 'ALL' || item.category === this.galleryCategoryFilter;
    });

    if (filtered.length === 0) {
      container.innerHTML = `<div class="col-span-full py-12 text-center text-slate-400 text-sm">Tidak ada foto pada kategori ini.</div>`;
      return;
    }

    container.innerHTML = filtered.map(item => `
      <div class="glass-panel glass-card rounded-3xl overflow-hidden group cursor-pointer" onclick="classApp.openLightbox('${item.id}')">
        <div class="relative aspect-video overflow-hidden">
          <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
          <span class="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-md">
            ${item.category}
          </span>
        </div>
        <div class="p-4">
          <span class="text-xs text-slate-400 block mb-1">${item.date}</span>
          <h4 class="font-bold text-slate-900 dark:text-white text-base group-hover:text-blue-500 transition line-clamp-1">${item.title}</h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">${item.description}</p>
        </div>
      </div>
    `).join('');
    if (window.lucide) lucide.createIcons();
  }

  openLightbox(itemId) {
    this.playClickSound();
    const item = this.data.gallery.find(g => g.id === itemId);
    if (!item) return;

    const modal = document.getElementById('lightboxModal');
    const img = document.getElementById('lightboxImage');
    const title = document.getElementById('lightboxTitle');
    const desc = document.getElementById('lightboxDesc');
    const date = document.getElementById('lightboxDate');

    if (!modal || !img) return;
    img.src = item.image;
    if (title) title.textContent = item.title;
    if (desc) desc.textContent = item.description;
    if (date) date.textContent = `${item.date} • Kategori: ${item.category}`;

    modal.classList.remove('hidden');
  }

  closeLightbox() {
    this.playClickSound();
    const modal = document.getElementById('lightboxModal');
    if (modal) modal.classList.add('hidden');
  }

  addNewGalleryPhoto(e) {
    e.preventDefault();
    const form = e.target;
    const title = form.photoTitle.value.trim();
    const image = form.photoUrl.value.trim();
    const category = form.photoCategory.value;
    const date = form.photoDate.value;
    const description = form.photoDesc.value.trim();

    if (!title || !image || !date) {
      alert('Harap isi judul momen, URL foto, dan tanggal kegiatan!');
      return;
    }

    const newPhoto = {
      id: 'gal-' + Date.now(),
      title,
      image,
      category,
      date,
      description: description || 'Momen kebersamaan kelas yang penuh arti.'
    };

    this.data.gallery.unshift(newPhoto);
    this.saveData();
    this.renderGallery();
    form.reset();
    this.closeModal('addPhotoModal');
    this.playSuccessSound();
    this.showToast('Foto kenangan baru berhasil ditambahkan ke galeri!', 'success');
  }

  // Class Fun Zone: Lucky Wheel & Sticky Notes
  renderFunZone() {
    this.renderStickyNotes();
    this.drawWheel();
  }

  drawWheel(currentAngle = 0) {
    const canvas = document.getElementById('luckyWheelCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width / 2 - 10;

    const students = this.data.students;
    const numSegments = students.length;
    const angleStep = (2 * Math.PI) / numSegments;

    ctx.clearRect(0, 0, width, height);

    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4', '#6366f1', '#14b8a6'];

    for (let i = 0; i < numSegments; i++) {
      const startAngle = currentAngle + (i * angleStep);
      const endAngle = startAngle + angleStep;

      // Draw Slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.stroke();

      // Draw Text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + angleStep / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px Plus Jakarta Sans, sans-serif';
      ctx.fillText(students[i].nickname || students[i].name.split(' ')[0], radius - 15, 4);
      ctx.restore();
    }

    // Draw Center Circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 24, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#1e293b';
    ctx.stroke();

    // Center icon text
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 10px Plus Jakarta Sans, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SPIN', centerX, centerY + 3);
  }

  spinWheel() {
    if (this.isSpinning) return;
    this.isSpinning = true;

    const canvas = document.getElementById('luckyWheelCanvas');
    if (!canvas) return;

    const spinBtn = document.getElementById('spinWheelBtn');
    if (spinBtn) spinBtn.disabled = true;

    const students = this.data.students;
    const numSegments = students.length;
    const angleStep = (2 * Math.PI) / numSegments;

    // Random winner index
    const winnerIndex = Math.floor(Math.random() * numSegments);

    // Target angle: Pointer is at top (-Math.PI / 2).
    // Segment i spans [angle + i*step, angle + (i+1)*step]
    // To align center of winner segment with pointer (-PI/2), we calculate:
    const minSpins = 5;
    const fullRotations = minSpins * 2 * Math.PI;
    const segmentCenterAngle = (winnerIndex * angleStep) + (angleStep / 2);
    const targetAngle = fullRotations + ((3 * Math.PI / 2) - segmentCenterAngle);

    let currentAngle = 0;
    const duration = 4500; // 4.5 seconds
    const startTime = performance.now();

    let lastTickAngle = 0;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease out
      const ease = 1 - Math.pow(1 - progress, 3);
      currentAngle = targetAngle * ease;

      this.drawWheel(currentAngle);

      // Play tick sound whenever crossing segment boundary
      if (Math.abs(currentAngle - lastTickAngle) >= angleStep) {
        this.playWheelTick();
        lastTickAngle = currentAngle;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.isSpinning = false;
        if (spinBtn) spinBtn.disabled = false;
        this.onWheelSpinComplete(students[winnerIndex]);
      }
    };

    requestAnimationFrame(animate);
  }

  onWheelSpinComplete(student) {
    this.playSuccessSound();
    if (typeof confetti === 'function') {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
    }

    const winnerResult = document.getElementById('wheelWinnerResult');
    if (winnerResult) {
      winnerResult.innerHTML = `
        <div class="p-6 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl text-center animate-bounce">
          <span class="text-xs uppercase tracking-widest font-bold opacity-80">🎉 Pemenang Terpilih</span>
          <h3 class="text-2xl font-bold font-display mt-1">${student.name} (#${student.absen})</h3>
          <p class="text-xs opacity-90 mt-1">"${student.quote}"</p>
        </div>
      `;
    }

    this.showToast(`Selamat kepada ${student.name}! Terpilih dari putaran roda! 🎯`, 'success');
  }

  // Sticky Notes
  renderStickyNotes() {
    const container = document.getElementById('stickyNotesContainer');
    if (!container) return;

    container.innerHTML = this.data.stickyNotes.map(note => `
      <div class="p-5 rounded-3xl border ${note.color} shadow-sm relative flex flex-col justify-between transition hover:-translate-y-1">
        <div>
          <div class="flex items-center justify-between text-xs opacity-75 mb-2">
            <span class="font-bold">${note.sender}</span>
            <span>${note.date}</span>
          </div>
          <p class="text-sm font-medium leading-relaxed">${note.text}</p>
        </div>
        <div class="mt-4 pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
          <button onclick="classApp.likeStickyNote('${note.id}')" class="inline-flex items-center gap-1.5 text-xs font-bold hover:scale-110 transition">
            <i data-lucide="heart" class="w-4 h-4 fill-rose-500 text-rose-500"></i> ${note.likes} Suka
          </button>
          <button onclick="classApp.deleteStickyNote('${note.id}')" class="text-xs opacity-50 hover:opacity-100 hover:text-rose-500">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    `).join('');
    if (window.lucide) lucide.createIcons();
  }

  likeStickyNote(noteId) {
    this.playClickSound();
    const note = this.data.stickyNotes.find(n => n.id === noteId);
    if (!note) return;
    note.likes += 1;
    this.saveData();
    this.renderStickyNotes();
  }

  deleteStickyNote(noteId) {
    if (confirm('Hapus pesan sticky note ini?')) {
      this.data.stickyNotes = this.data.stickyNotes.filter(n => n.id !== noteId);
      this.saveData();
      this.renderStickyNotes();
      this.showToast('Pesan berhasil dihapus.', 'info');
    }
  }

  addNewStickyNote(e) {
    e.preventDefault();
    const form = e.target;
    const sender = form.noteSender.value.trim() || 'Anonim';
    const text = form.noteText.value.trim();
    const colorType = form.noteColor.value;

    if (!text) {
      alert('Tuliskan pesanmu terlebih dahulu!');
      return;
    }

    const colorMap = {
      amber: "bg-amber-100 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-100",
      blue: "bg-blue-100 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-100",
      emerald: "bg-emerald-100 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100",
      purple: "bg-purple-100 dark:bg-purple-950/40 border-purple-300 dark:border-purple-800 text-purple-900 dark:text-purple-100",
      pink: "bg-pink-100 dark:bg-pink-950/40 border-pink-300 dark:border-pink-800 text-pink-900 dark:text-pink-100"
    };

    const newNote = {
      id: 'note-' + Date.now(),
      sender,
      date: 'Baru saja',
      color: colorMap[colorType] || colorMap.amber,
      text,
      likes: 1
    };

    this.data.stickyNotes.unshift(newNote);
    this.saveData();
    this.renderStickyNotes();
    form.reset();
    this.closeModal('addNoteModal');
    this.playSuccessSound();
    this.showToast('Pesan apresiasi berhasil ditempel di mading! ✨', 'success');
  }

  // Pengaturan & Kustomisasi
  renderSettings() {
    const p = this.data.profile;
    const form = document.getElementById('classSettingsForm');
    if (!form) return;

    form.classNameInput.value = p.name || '';
    form.classNicknameInput.value = p.nickname || '';
    form.schoolNameInput.value = p.school || '';
    form.academicYearInput.value = p.academicYear || '';
    form.classTaglineInput.value = p.tagline || '';
    form.homeroomNameInput.value = p.homeroomTeacher?.name || '';
    form.homeroomSubjectInput.value = p.homeroomTeacher?.subject || '';
  }

  saveClassSettings(e) {
    e.preventDefault();
    const form = e.target;
    this.data.profile.name = form.classNameInput.value.trim();
    this.data.profile.nickname = form.classNicknameInput.value.trim();
    this.data.profile.school = form.schoolNameInput.value.trim();
    this.data.profile.academicYear = form.academicYearInput.value.trim();
    this.data.profile.tagline = form.classTaglineInput.value.trim();
    this.data.profile.homeroomTeacher.name = form.homeroomNameInput.value.trim();
    this.data.profile.homeroomTeacher.subject = form.homeroomSubjectInput.value.trim();

    this.saveData();
    this.render();
    this.playSuccessSound();
    this.showToast('Identitas kelas berhasil diperbarui!', 'success');
  }

  // Generic Modal Helpers
  openModal(modalId) {
    this.playClickSound();
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  }

  closeModal(modalId) {
    this.playClickSound();
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('hidden');
  }

  // Initialization
  init() {
    this.initTheme();
    this.initClock();
    this.render();

    // Event listener for Escape key to close modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay').forEach(modal => {
          modal.classList.add('hidden');
        });
      }
    });

    console.log('Website Kelas Modern successfully initialized! 🚀');
  }
}

// Global instance
let classApp;
window.addEventListener('DOMContentLoaded', () => {
  classApp = new ClassApp();
});
