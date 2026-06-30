// Web Iqlima — link-in-bio profile app (ported from React 19 / Tailwind v4 AI Studio project)
// Ported to a standalone Vite + React module.
import { useState, useRef, useEffect } from 'react';

/* ─── Inline lucide-style icons (no external dep) ─────────────────────────── */
const ICON_PATHS = {
  home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  'shopping-bag': '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  'message-circle': '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  youtube: '<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  'share-2': '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>',
  'arrow-left': '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  send: '<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4Z"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  'eye-off': '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>',
  box: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
  music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  code: '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
  layers: '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
  save: '<path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5"/><path d="M12 3v12"/>',
  'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>',
  image: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
  'users': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  tiktok: '<path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>',
};

function Icon({ name, className, fill, style }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill={fill || 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: ICON_PATHS[name] || '' }}
    />
  );
}

const BRAND_COLORS = { 'message-circle': '#22C55E', youtube: '#FF0000', music: '#1DB954', send: '#229ED9', code: '#6366F1', box: '#0EA5E9' };
const AURORA_THEMES = {
  blue:    [['#38bdf8', '#f9a8d4'], ['#a78bfa', '#6ee7b7'], ['#fb7185', '#7dd3fc'], ['#34d399', '#c4b5fd']],
  violet:  [['#a78bfa', '#f0abfc'], ['#8b5cf6', '#c4b5fd'], ['#d946ef', '#a5b4fc'], ['#6366f1', '#e9d5ff']],
  emerald: [['#34d399', '#a7f3d0'], ['#10b981', '#7dd3fc'], ['#14b8a6', '#6ee7b7'], ['#22c55e', '#99f6e4']],
  sunset:  [['#fb923c', '#fda4af'], ['#f59e0b', '#fbcfe8'], ['#f43f5e', '#fdba74'], ['#f97316', '#fcd34d']],
  rose:    [['#fb7185', '#fbcfe8'], ['#f472b6', '#a5b4fc'], ['#ec4899', '#fda4af'], ['#f43f5e', '#fbcfe8']],
};

/* ─── Default data ────────────────────────────────────────────────────────── */
const profileData = {
  name: '@iqlimaraudhah',
  role: 'Optometris yang suka dengan AI',
  greeting: 'SELAMAT DATANG SEMUA',
  description: 'Semua online course AI ada di sini, KLIK JE, subcribe terus ya😊',
  avatarUrl: 'https://ui-avatars.com/api/?name=Iqlima&background=1e40af&color=fff&size=200',
  agencyLabel: 'Myrobot Ai',
  whatsappNumber: '60164224090',
  whatsappGroupUrl: 'https://chat.whatsapp.com/',
  tiktokUrl: 'https://www.tiktok.com/@iqlimaraudhah',
  theme: 'blue',
};

const mainLinks = [
  { id: 'bizstack', title: 'Bizstack - Digital Business Stack →', subtitle: '', icon: 'layers', isPrimary: true },
  { id: 'wa-channel', title: 'Channel WhatsApp', subtitle: 'Update, insight, & drop produk', icon: 'message-circle' },
  { id: 'aksensnap', title: 'DFY AksenSnap WhiteLabel', subtitle: 'Duplikasi sistem AksenSnap di bisni...', icon: 'box' },
  { id: 'sitelab', title: 'SiteLab - Custom Website Studio', subtitle: 'Jasa pembuatan web custom', icon: 'globe' },
  { id: 'youtube', title: 'YouTube - Ady Sheva', subtitle: 'Video, tutorial, & perjalanan build pr...', icon: 'youtube' },
  { id: 'spotify', title: 'Spotify - Ady Sheva', subtitle: 'Dengerin musik karya Ady Sheva', icon: 'music' },
  { id: 'music-maker', title: 'Music Maker (Shopee)', subtitle: 'Jasa pembuatan musik & lagu custo...', icon: 'music' },
  { id: 'vibecoding', title: 'VibeCoding - Cashflow', subtitle: 'Bukan belajar coding. Tapi bikin pro...', icon: 'code' },
];

const products = [
  { id: 'penjana-pantas', title: 'PENJANA PANTAS POSTER MARKETING DAN KONTEN MALAYSIA', description: 'Jana poster marketing dan konten untuk bisnes anda dengan pantas menggunakan AI.', imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop', url: 'https://nyrobotai.interactivelink.site/PENJANAPANTASPOSTERMARKETINGMALAYSIA' },
  { id: 'formpay', title: 'Formpay - WhiteLabel', description: 'FormPay Membantu Seller Mengumpulkan Data Pesanan Otomatis Dan Profesional. Kurangi Chat Bolak-Balik, Rapikan Order, Dan Percepat Proses Closing Tanpa Mengubah Kebiasaan Customer Menggunakan WhatsApp.', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop' },
  { id: 'ai-babu', title: 'Ai Jadi Babu', description: 'Kelas Yang Ngajarin Kamu Nyuruh AI - Biar Dia Yang Kerja, Kamu Yang Panen Hasilnya. Kelas Zoom 1 Sesi Yang Ngajarin Kamu Bikin Produk Digital - App, Landing Page, Sampe Form Order - Cuma Modal Ngetik Perintah. Gak Perlu Bisa Coding Sama Sekali.', imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop' },
  { id: 'adcanvas', title: 'AdCanvas', description: 'Desain Iklan Ala Brand Besar Kini Bisa Anda Buat Sendiri Dalam Hitungan Detik!', imageUrl: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1974&auto=format&fit=crop' },
  { id: 'rendermockup', title: 'RenderMockup', description: 'Orang Menilai Produk Dari Visual Pertama. RenderMockup Bikin Produk Kamu Tampil Lebih Premium, Profesional, Dan Meyakinkan', imageUrl: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070&auto=format&fit=crop' },
  { id: 'creatoros', title: 'CreatorOS', description: 'Ubah Skill AI Jadi Aset Digital & Penghasilan Nyata Tanpa Harus Bikin Semua Sendiri Sistem Terintegrasi Untuk Bangun, Jual, Dan Scale Produk Digital Berbasis AI, Lengkap Dengan Hak Jual Ulang Pakai Brand Kamu Sendiri.', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop' },
  { id: 'cloudlayer', title: 'CloudLayer - Membership', description: 'Cukup sekali, sistem membership + affiliate jadi milikmu. Tanpa biaya bulanan/tahunan.', imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop' },
];

// Galeri contoh hasil — dipaut ikut id produk supaya sentiasa muncul walaupun
// data tersimpan (localStorage) versi lama tiada medan ini.
const PRODUCT_GALLERIES = {
  'penjana-pantas': {
    title: 'Contoh Hasil Poster',
    images: [
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1634942537034-2531766767d1?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620207418302-439b387441b0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=800&auto=format&fit=crop',
    ],
  },
};
const ADMIN_PASSWORD = 'iqlima123';

// Pastikan setiap produk ada medan `gallery`; isi dari PRODUCT_GALLERIES jika tiada.
function withGalleries(list) {
  return (list || []).map(p => ({
    ...p,
    gallery: Array.isArray(p.gallery) ? p.gallery : ((PRODUCT_GALLERIES[p.id] && PRODUCT_GALLERIES[p.id].images) || []),
  }));
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return null;
}

function fallbackCopy(text) {
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch (e) { return false; }
}
function copyToClipboard(text) {
  return new Promise((resolve) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => resolve(true)).catch(() => resolve(fallbackCopy(text)));
    } else {
      resolve(fallbackCopy(text));
    }
  });
}

/* ─── Kongsi data melalui URL (tanpa pelayan) ──────────────────────────────── */
function encodeState(data) {
  try { return btoa(unescape(encodeURIComponent(JSON.stringify(data)))); } catch (e) { return ''; }
}
function decodeState(str) {
  try { return JSON.parse(decodeURIComponent(escape(atob(str)))); } catch (e) { return null; }
}
function readSharedFromUrl() {
  try {
    const m = (window.location.hash || '').match(/[#&]d=([^&]+)/);
    if (m && m[1]) return decodeState(decodeURIComponent(m[1]));
  } catch (e) {}
  return null;
}

/* ─── Firebase (isi config kau di sini selepas cipta projek) ───────────────
   1. console.firebase.google.com → Project Settings → Your apps → Web app → firebaseConfig
   2. Tukar nilai "YOUR_..." dengan nilai sebenar dari Firebase Console
   3. Dalam Firebase Console: aktifkan Firestore (test mode) + Storage (test mode)
   ─────────────────────────────────────────────────────────────────────────── */
const FIREBASE_CONFIG = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_MSG_ID",
  appId:             "YOUR_APP_ID",
};
const FB_ENABLED = FIREBASE_CONFIG.apiKey !== "YOUR_API_KEY" && typeof firebase !== 'undefined';

function getFb() {
  if (!FB_ENABLED) return null;
  try {
    if (!window._fbApp) window._fbApp = firebase.apps.length ? firebase.apps[0] : firebase.initializeApp(FIREBASE_CONFIG);
    return { db: firebase.firestore(), st: firebase.storage() };
  } catch (e) { return null; }
}

async function fbUploadImage(file, path) {
  const fb = getFb(); if (!fb) return null;
  try {
    const ref = fb.st.ref(path);
    await ref.put(file);
    return await ref.getDownloadURL();
  } catch (e) { console.error('fbUpload', e); return null; }
}

async function fbSave(data) {
  const fb = getFb(); if (!fb) return;
  try { await fb.db.collection('sites').doc('iqlima').set(data); } catch (e) { console.error('fbSave', e); }
}

async function fbLoad() {
  const fb = getFb(); if (!fb) return null;
  try {
    const doc = await fb.db.collection('sites').doc('iqlima').get();
    return doc.exists ? doc.data() : null;
  } catch (e) { return null; }
}

/* ─── Admin Panel ─────────────────────────────────────────────────────────── */
function AdminPanel({ profileData, links: initialLinks, products: initialProds, onSave, onClose }) {
  const [tab, setTab] = useState('profil');
  const [profile, setProfile] = useState({ ...profileData });
  const [links, setLinks] = useState(initialLinks.map(l => ({ ...l })));
  const [prods, setProds] = useState(initialProds.map(p => ({ ...p })));
  const [saved, setSaved] = useState(false);
  const [galUrlDraft, setGalUrlDraft] = useState({});
  const avatarInputRef = useRef(null);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleAvatarUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const url = await fbUploadImage(file, `avatars/${Date.now()}_${file.name}`);
    if (url) { setProfile(p => ({ ...p, avatarUrl: url })); return; }
    const base64 = await toBase64(file);
    setProfile(p => ({ ...p, avatarUrl: base64 }));
  };
  const handleProductImageUpload = async (e, idx) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const url = await fbUploadImage(file, `products/${Date.now()}_${file.name}`);
    if (url) { setProds(ps => ps.map((p, i) => (i === idx ? { ...p, imageUrl: url } : p))); return; }
    const base64 = await toBase64(file);
    setProds(ps => ps.map((p, i) => (i === idx ? { ...p, imageUrl: base64 } : p)));
  };
  const handleGalleryUpload = async (e, idx) => {
    const files = [...(e.target.files || [])];
    if (!files.length) return;
    const results = await Promise.all(files.map(async (file) => {
      const url = await fbUploadImage(file, `gallery/${Date.now()}_${file.name}`);
      return url || (await toBase64(file));
    }));
    setProds(ps => ps.map((p, i) => (i === idx ? { ...p, gallery: [...(p.gallery || []), ...results] } : p)));
    e.target.value = '';
  };
  const addGalleryUrl = (idx, url) => {
    const u = (url || '').trim();
    if (!u) return;
    setProds(ps => ps.map((p, i) => (i === idx ? { ...p, gallery: [...(p.gallery || []), u] } : p)));
  };
  const removeGalleryImage = (idx, gi) => {
    setProds(ps => ps.map((p, i) => (i === idx ? { ...p, gallery: (p.gallery || []).filter((_, g) => g !== gi) } : p)));
  };
  const handleSave = () => {
    onSave(profile, links, prods);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExport = () => {
    try {
      const data = JSON.stringify({ profile, links, products: prods }, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'iqlima-data.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1500);
    } catch (e) {}
  };

  const LINK_ICON_OPTIONS = ['layers', 'message-circle', 'box', 'globe', 'youtube', 'music', 'code', 'send', 'home', 'shopping-bag'];
  const addLink = () => setLinks(ls => [...ls, { id: 'link-' + Date.now(), title: 'Pautan Baru', subtitle: '', url: '', icon: 'globe' }]);
  const removeLink = (idx) => setLinks(ls => ls.filter((_, i) => i !== idx));
  const addProduct = () => setProds(ps => [...ps, { id: 'prod-' + Date.now(), title: 'Produk Baru', description: '', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400', url: '' }]);
  const removeProduct = (idx) => setProds(ps => ps.filter((_, i) => i !== idx));

  const inputClass = 'w-full bg-white/70 dark:bg-zinc-800/60 border border-blue-100 dark:border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-stone-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 placeholder-stone-300 dark:placeholder-zinc-600 transition-colors duration-300';
  const labelClass = 'text-[10px] font-bold text-stone-400 dark:text-zinc-500 uppercase tracking-widest mb-1 block';
  const cardClass = 'bg-white/60 dark:bg-zinc-900/50 border border-white/50 dark:border-zinc-700/50 rounded-2xl p-4 space-y-3 backdrop-blur-sm';

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md min-h-screen bg-[#F0F6FF] dark:bg-zinc-950 flex flex-col">
        <div className="sticky top-0 z-20 bg-blue-800 dark:bg-blue-950 text-white px-5 py-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <Icon name="lock" className="w-4 h-4 text-blue-200" />
            <h2 className="font-bold text-[13px] tracking-widest uppercase">Panel Admin</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
            <Icon name="x" className="w-4 h-4" />
          </button>
        </div>

        <div className="sticky top-[60px] z-10 flex border-b border-blue-100 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
          {['profil', 'pautan', 'produk'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3 text-[11px] font-bold uppercase tracking-widest transition-colors ${tab === t ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-stone-400 dark:text-zinc-500 hover:text-stone-600 dark:hover:text-zinc-300'}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex-1 p-5 space-y-4 pb-32">
          {tab === 'profil' && (
            <div className="space-y-4">
              <div className={`${cardClass} flex flex-col items-center gap-3`}>
                <p className={labelClass}>Gambar Profil</p>
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-zinc-700 shadow-lg bg-blue-50 dark:bg-zinc-800">
                  <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" onError={e => { e.target.src = 'https://ui-avatars.com/api/?name=Admin&background=1e40af&color=fff'; }} />
                </div>
                <input type="file" accept="image/*" ref={avatarInputRef} onChange={handleAvatarUpload} className="hidden" />
                <button onClick={() => avatarInputRef.current && avatarInputRef.current.click()} className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wide hover:bg-blue-200 dark:hover:bg-blue-800/60 transition-colors">
                  <Icon name="upload" className="w-3.5 h-3.5" />
                  Upload Gambar Profil
                </button>
              </div>
              <div className={cardClass}>
                <div><label className={labelClass}>Nama / Username</label><input className={inputClass} value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} /></div>
                <div><label className={labelClass}>Role / Jawatan</label><input className={inputClass} value={profile.role} onChange={e => setProfile(p => ({ ...p, role: e.target.value }))} /></div>
                <div><label className={labelClass}>Label Badge (atas)</label><input className={inputClass} value={profile.agencyLabel} onChange={e => setProfile(p => ({ ...p, agencyLabel: e.target.value }))} /></div>
                <div><label className={labelClass}>Tema Aurora (warna latar)</label><select className={inputClass} value={profile.theme || 'blue'} onChange={e => setProfile(p => ({ ...p, theme: e.target.value }))}><option value="blue">Biru (Default)</option><option value="violet">Ungu</option><option value="emerald">Hijau Emerald</option><option value="sunset">Sunset Oren</option><option value="rose">Rose Pink</option></select></div>
              </div>
              <div className={cardClass}>
                <div><label className={labelClass}>Tajuk Ucapan</label><input className={inputClass} value={profile.greeting} onChange={e => setProfile(p => ({ ...p, greeting: e.target.value }))} /></div>
                <div><label className={labelClass}>Penerangan Diri</label><textarea className={`${inputClass} resize-none`} rows={3} value={profile.description} onChange={e => setProfile(p => ({ ...p, description: e.target.value }))} /></div>
              </div>
              <div className={cardClass}>
                <div><label className={labelClass}>Nombor WhatsApp (dengan kod negara)</label><input className={inputClass} value={profile.whatsappNumber} onChange={e => setProfile(p => ({ ...p, whatsappNumber: e.target.value }))} placeholder="cth: 60164224090" /></div>
                <div><label className={labelClass}>Link Group WhatsApp Umum</label><input className={inputClass} value={profile.whatsappGroupUrl || ''} onChange={e => setProfile(p => ({ ...p, whatsappGroupUrl: e.target.value }))} placeholder="https://chat.whatsapp.com/..." /></div>
                <div><label className={labelClass}>Link TikTok</label><input className={inputClass} value={profile.tiktokUrl || ''} onChange={e => setProfile(p => ({ ...p, tiktokUrl: e.target.value }))} placeholder="https://www.tiktok.com/@..." /></div>
              </div>
            </div>
          )}

          {tab === 'pautan' && (
            <div className="space-y-4">
              {links.map((link, idx) => (
                <div key={link.id} className={cardClass}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={labelClass}>Pautan {idx + 1}</span>
                    <div className="flex items-center gap-2">
                      {link.isPrimary && <span className="text-[9px] font-bold bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">UTAMA</span>}
                      <button onClick={() => removeLink(idx)} title="Buang pautan" className="w-7 h-7 rounded-full bg-red-50 dark:bg-red-950/40 text-red-500 flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"><Icon name="x" className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                  <div><label className={labelClass}>Tajuk</label><input className={inputClass} value={link.title} onChange={e => setLinks(ls => ls.map((l, i) => (i === idx ? { ...l, title: e.target.value } : l)))} /></div>
                  {!link.isPrimary && (
                    <div><label className={labelClass}>Subtitle</label><input className={inputClass} value={link.subtitle || ''} onChange={e => setLinks(ls => ls.map((l, i) => (i === idx ? { ...l, subtitle: e.target.value } : l)))} /></div>
                  )}
                  <div><label className={labelClass}>URL Pautan</label><input className={inputClass} value={link.url || ''} onChange={e => setLinks(ls => ls.map((l, i) => (i === idx ? { ...l, url: e.target.value } : l)))} placeholder="https://..." /></div>
                  <div><label className={labelClass}>Ikon</label><select className={inputClass} value={link.icon || 'globe'} onChange={e => setLinks(ls => ls.map((l, i) => (i === idx ? { ...l, icon: e.target.value } : l)))}>{LINK_ICON_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}</select></div>
                </div>
              ))}
              <button onClick={addLink} className="w-full py-3 rounded-2xl font-bold text-[11px] uppercase tracking-widest border-2 border-dashed border-blue-200 dark:border-zinc-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-zinc-800/50 transition-colors flex items-center justify-center gap-2">＋ Tambah Pautan</button>
            </div>
          )}

          {tab === 'produk' && (
            <div className="space-y-5">
              {prods.map((prod, idx) => (
                <div key={prod.id} className={cardClass}>
                  <div className="flex items-center justify-between">
                    <span className={labelClass}>Produk {idx + 1}</span>
                    <button onClick={() => removeProduct(idx)} title="Buang produk" className="w-7 h-7 rounded-full bg-red-50 dark:bg-red-950/40 text-red-500 flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"><Icon name="x" className="w-3.5 h-3.5" /></button>
                  </div>
                  <div className="relative group aspect-video rounded-xl overflow-hidden bg-blue-50 dark:bg-zinc-800 cursor-pointer">
                    <img src={prod.imageUrl} alt={prod.title} className="w-full h-full object-cover" onError={e => { e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400'; }} />
                    <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Icon name="upload" className="w-6 h-6 text-white mb-1.5" />
                      <span className="text-white text-[10px] font-bold uppercase tracking-wide">Tukar Gambar</span>
                      <input type="file" accept="image/*" className="hidden" onChange={e => handleProductImageUpload(e, idx)} />
                    </label>
                  </div>
                  <div><label className={labelClass}>Tajuk Produk</label><input className={inputClass} value={prod.title} onChange={e => setProds(ps => ps.map((p, i) => (i === idx ? { ...p, title: e.target.value } : p)))} /></div>
                  <div><label className={labelClass}>Penerangan</label><textarea className={`${inputClass} resize-none`} rows={3} value={prod.description} onChange={e => setProds(ps => ps.map((p, i) => (i === idx ? { ...p, description: e.target.value } : p)))} /></div>
                  <div><label className={labelClass}>URL Produk</label><input className={inputClass} value={prod.url || ''} onChange={e => setProds(ps => ps.map((p, i) => (i === idx ? { ...p, url: e.target.value } : p)))} placeholder="https://..." /></div>
                  <div className="pt-1 border-t border-blue-100/70 dark:border-zinc-700/50">
                    <label className={labelClass}>Galeri Contoh Hasil ({(prod.gallery || []).length})</label>
                    <div className="grid grid-cols-4 gap-2 mb-2.5">
                      {(prod.gallery || []).map((src, gi) => (
                        <div key={gi} className="relative group aspect-[3/4] rounded-lg overflow-hidden bg-blue-50 dark:bg-zinc-800 border border-white/60 dark:border-zinc-700">
                          <img src={src} alt={`Hasil ${gi + 1}`} className="w-full h-full object-cover" onError={e => { e.target.src = 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=200'; }} />
                          <button onClick={() => removeGalleryImage(idx, gi)} title="Buang" className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Icon name="x" className="w-3 h-3" /></button>
                        </div>
                      ))}
                      <label className="aspect-[3/4] rounded-lg border-2 border-dashed border-blue-200 dark:border-zinc-700 flex flex-col items-center justify-center text-blue-500 dark:text-blue-400 cursor-pointer hover:bg-blue-50 dark:hover:bg-zinc-800/50 transition-colors">
                        <Icon name="upload" className="w-4 h-4" />
                        <span className="text-[8px] font-bold uppercase mt-0.5">Upload</span>
                        <input type="file" accept="image/*" multiple className="hidden" onChange={e => handleGalleryUpload(e, idx)} />
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <input className={inputClass} value={galUrlDraft[idx] || ''} onChange={e => setGalUrlDraft(d => ({ ...d, [idx]: e.target.value }))} onKeyDown={e => { if (e.key === 'Enter') { addGalleryUrl(idx, galUrlDraft[idx]); setGalUrlDraft(d => ({ ...d, [idx]: '' })); } }} placeholder="Tampal URL gambar..." />
                      <button onClick={() => { addGalleryUrl(idx, galUrlDraft[idx]); setGalUrlDraft(d => ({ ...d, [idx]: '' })); }} className="shrink-0 px-4 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[11px] font-bold uppercase tracking-wide hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors">Tambah</button>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={addProduct} className="w-full py-3 rounded-2xl font-bold text-[11px] uppercase tracking-widest border-2 border-dashed border-blue-200 dark:border-zinc-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-zinc-800/50 transition-colors flex items-center justify-center gap-2">＋ Tambah Produk</button>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-t border-blue-100 dark:border-zinc-800 p-4 space-y-2.5">
          <button onClick={handleSave} className={`w-full py-3.5 rounded-2xl font-bold text-[12px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg ${saved ? 'bg-green-500 text-white shadow-green-200/50 dark:shadow-green-900/50' : 'bg-blue-700 hover:bg-blue-600 text-white shadow-blue-200/50 dark:shadow-blue-900/50'}`}>
            {saved ? (<><Icon name="check-circle" className="w-4 h-4" />Tersimpan!</>) : (<><Icon name="save" className="w-4 h-4" />Simpan Semua Perubahan</>)}
          </button>
          <button onClick={handleExport} className="w-full py-3 rounded-2xl font-bold text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 bg-white dark:bg-zinc-900 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-zinc-700 hover:bg-blue-50 dark:hover:bg-zinc-800">
            <Icon name="upload" className="w-4 h-4" />
            Eksport Data (Simpan Kekal ke Fail)
          </button>
          <p className="text-[10px] text-stone-400 dark:text-zinc-500 text-center leading-relaxed">Tekan “Eksport” → hantar fail <b>iqlima-data.json</b> kepada Claude untuk jadikan kekal dalam web.</p>
          <div className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest ${FB_ENABLED ? 'bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400' : 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400'}`}>
            <div className={`w-2 h-2 rounded-full ${FB_ENABLED ? 'bg-green-500' : 'bg-amber-400'}`}></div>
            {FB_ENABLED ? 'Firebase Aktif — Gambar tersimpan online ✓' : 'Firebase belum dikonfigurasi'}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main App ────────────────────────────────────────────────────────────── */
function AuroraBg({ aur, isDark }) {
  const css = `
    @keyframes ab1 { 0%{transform:translate(0,0) scale(1)} 25%{transform:translate(130px,-95px) scale(1.28)} 50%{transform:translate(-80px,110px) scale(.9)} 75%{transform:translate(95px,55px) scale(1.16)} 100%{transform:translate(0,0) scale(1)} }
    @keyframes ab2 { 0%{transform:translate(0,0) scale(1)} 25%{transform:translate(-140px,80px) scale(1.22)} 50%{transform:translate(100px,-120px) scale(.9)} 75%{transform:translate(-70px,-60px) scale(1.2)} 100%{transform:translate(0,0) scale(1)} }
    @keyframes ab3 { 0%{transform:translate(0,0) scale(1)} 25%{transform:translate(90px,120px) scale(.92)} 50%{transform:translate(-120px,-80px) scale(1.3)} 75%{transform:translate(80px,-100px) scale(1.06)} 100%{transform:translate(0,0) scale(1)} }
    @keyframes ab4 { 0%{transform:translate(0,0) scale(1)} 25%{transform:translate(-110px,-110px) scale(1.26)} 50%{transform:translate(120px,90px) scale(.9)} 75%{transform:translate(-80px,70px) scale(1.16)} 100%{transform:translate(0,0) scale(1)} }
    @keyframes ab5 { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-50%) scale(1.38)} }
    @keyframes abhue { 0%,100%{filter:hue-rotate(0deg)} 50%{filter:hue-rotate(26deg)} }
    .ab-wrap { animation: abhue 18s ease-in-out infinite; }
    .ab1 { animation: ab1 19s ease-in-out infinite; }
    .ab2 { animation: ab2 24s ease-in-out infinite; }
    .ab3 { animation: ab3 21s ease-in-out infinite; }
    .ab4 { animation: ab4 27s ease-in-out infinite; }
    .ab5 { animation: ab5 16s ease-in-out infinite; }
  `;
  return (
    <div className={`ab-wrap fixed inset-0 overflow-hidden pointer-events-none z-0 transition-opacity duration-1000 ${isDark ? 'opacity-70' : 'opacity-90'}`}>
      <style>{css}</style>
      <div className="ab1 absolute -top-[12%] -right-[12%] w-[85vw] md:w-[58vw] h-[60vh] rounded-full blur-[70px]" style={{ backgroundImage: `linear-gradient(to bottom right, ${aur[0][0]}, ${aur[0][1]})` }}></div>
      <div className="ab2 absolute top-[12%] -left-[16%] w-[88vw] md:w-[60vw] h-[64vh] rounded-full blur-[80px]" style={{ backgroundImage: `linear-gradient(to top right, ${aur[1][0]}, ${aur[1][1]})` }}></div>
      <div className="ab3 absolute bottom-[8%] -right-[16%] w-[85vw] md:w-[58vw] h-[60vh] rounded-full blur-[70px]" style={{ backgroundImage: `linear-gradient(to bottom left, ${aur[2][0]}, ${aur[2][1]})` }}></div>
      <div className="ab4 absolute -bottom-[12%] -left-[12%] w-[85vw] md:w-[58vw] h-[60vh] rounded-full blur-[80px]" style={{ backgroundImage: `linear-gradient(to top left, ${aur[3][0]}, ${aur[3][1]})` }}></div>
      <div className="ab5 absolute left-1/2 top-1/2 w-[60vw] md:w-[42vw] h-[48vh] rounded-full blur-[90px]" style={{ backgroundImage: `radial-gradient(circle, ${aur[1][0]}, ${aur[2][1]}, transparent 70%)` }}></div>
    </div>
  );
}

function MarqueeGallery({ images, title }) {
  const trackRef = useRef(null);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf, x = 0, last = performance.now(), paused = false;
    const enter = () => { paused = true; };
    const leave = () => { paused = false; };
    track.addEventListener('pointerenter', enter);
    track.addEventListener('pointerleave', leave);
    const step = (now) => {
      const dt = now - last; last = now;
      if (!paused) {
        x -= (dt / 1000) * 32;
        const half = track.scrollWidth / 2;
        if (half && -x >= half) x += half;
        track.style.transform = `translateX(${x}px)`;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(raf); track.removeEventListener('pointerenter', enter); track.removeEventListener('pointerleave', leave); };
  }, [images]);
  const loop = [...images, ...images];
  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-4 px-1">
        <Icon name="image" className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        <h3 className="text-[11px] font-bold text-stone-700 dark:text-zinc-200 uppercase tracking-widest transition-colors duration-500">{title || 'Contoh Hasil'}</h3>
      </div>
      <div className="relative overflow-hidden -mx-1" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)', maskImage: 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)' }}>
        <div ref={trackRef} className="flex gap-3 px-1 w-max will-change-transform">
          {loop.map((src, i) => (
            <div key={i} className="shrink-0 w-[140px] aspect-[3/4] rounded-[1.1rem] overflow-hidden bg-blue-50 dark:bg-zinc-800 border border-white/40 dark:border-white/10 shadow-[0_10px_25px_-12px_rgba(59,130,246,0.35)] transition-colors duration-500">
              <img src={src} alt={`Hasil poster ${(i % images.length) + 1}`} loading="lazy" className="w-full h-full object-cover" onError={e => { e.target.src = 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=400'; }} />
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-[10px] text-stone-400 dark:text-zinc-500 mt-3 transition-colors duration-500">Geser atau hover untuk jeda</p>
    </div>
  );
}

function App() {
  const stored = loadFromStorage();
  const sharedData = readSharedFromUrl();
  const initSrc = sharedData || stored;
  const [profileState, setProfileState] = useState({ ...profileData, ...(initSrc && initSrc.profile ? initSrc.profile : {}) });
  const [linksState, setLinksState] = useState(initSrc && initSrc.links ? initSrc.links : mainLinks);
  const [productsState, setProductsState] = useState(withGalleries(initSrc && initSrc.products ? initSrc.products : products));

  const [activeTab, setActiveTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDark, setIsDark] = useState(() => { try { return localStorage.getItem('iqlima_dark') === '1'; } catch (e) { return false; } });

  const [showAdmin, setShowAdmin] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [shared, setShared] = useState(false);
  const [shareErr, setShareErr] = useState(false);
  const profileClickCount = useRef(0);
  const profileClickTimer = useRef();

  // Mod awam (dari link yang dikongsi) — admin dimatikan sepenuhnya
  const isPublicView = (() => {
    try { return !!sharedData || new URLSearchParams(window.location.search).has('share'); } catch (e) { return false; }
  })();

  // Muat data kekal daripada fail (iqlima-data.json) untuk pelawat baru / versi hosted.
  // Suntingan tempatan (localStorage) sentiasa diutamakan untuk pemilik.
  useEffect(() => {
    if (sharedData) return; // shared link — guna data dari URL
    let cancelled = false;
    // Cuba Firebase dulu (data terkini untuk semua pelawat)
    fbLoad().then(d => {
      if (cancelled) return;
      if (d) {
        if (d.profile) setProfileState(p => ({ ...profileData, ...d.profile }));
        if (Array.isArray(d.links)) setLinksState(d.links);
        if (Array.isArray(d.products)) setProductsState(withGalleries(d.products));
        return;
      }
      // Fallback: localStorage (pemilik) → iqlima-data.json → defaults
      if (loadFromStorage()) return;
      fetch('./iqlima-data.json', { cache: 'no-store' })
        .then(r => (r.ok ? r.json() : null))
        .then(j => {
          if (cancelled || !j) return;
          if (j.profile) setProfileState(p => ({ ...profileData, ...j.profile }));
          if (Array.isArray(j.links)) setLinksState(j.links);
          if (Array.isArray(j.products)) setProductsState(withGalleries(j.products));
        })
        .catch(() => {});
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    try { localStorage.setItem('iqlima_dark', isDark ? '1' : '0'); } catch (e) {}
  }, [isDark]);

  const handleProfileClick = () => {
    if (isPublicView) return; // tiada akses admin dalam mod kongsi
    profileClickCount.current += 1;
    if (profileClickTimer.current) clearTimeout(profileClickTimer.current);
    profileClickTimer.current = setTimeout(() => { profileClickCount.current = 0; }, 2000);
    if (profileClickCount.current >= 5) {
      profileClickCount.current = 0;
      setShowPasswordModal(true);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setShowPasswordModal(false);
      setPassword('');
      setPasswordError(false);
      setShowAdmin(true);
    } else {
      setPasswordError(true);
    }
  };

  const handleAdminSave = (profile, links, prods) => {
    setProfileState(profile);
    setLinksState(links);
    setProductsState(prods);
    const data = { profile, links, products: prods };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
    fbSave(data); // simpan ke Firebase jika dikonfigurasi
  };

  const renderHome = () => (
    <div className="pb-8 flex flex-col items-center pt-8 relative z-10">
      <div className="flex items-center justify-between w-full mb-8 pt-2">
        <div className="flex items-center gap-2 bg-white/30 dark:bg-zinc-900/30 rounded-full px-4 py-2 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-sm transition-colors duration-500">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </div>
          <span className="text-[10px] font-bold text-stone-600 dark:text-zinc-300 tracking-widest uppercase">{profileState.agencyLabel}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsDark(!isDark)} className="w-10 h-10 rounded-full bg-white/30 dark:bg-zinc-900/30 flex items-center justify-center text-stone-600 dark:text-zinc-300 hover:bg-white/50 dark:hover:bg-zinc-800 transition-colors backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-sm duration-500">
            {isDark ? <Icon name="sun" className="w-4 h-4" /> : <Icon name="moon" className="w-4 h-4" />}
          </button>
          <button
            onClick={async () => {
              // Kongsi link bersih sahaja (profil dimuat dari data app / iqlima-data.json)
              const shareUrl = window.location.origin + window.location.pathname;
              if (navigator.share) {
                try { await navigator.share({ title: profileState.name, url: shareUrl }); return; } catch (e) {}
              }
              await copyToClipboard(shareUrl);
              setShared(true);
              setTimeout(() => setShared(false), 1900);
            }}
            className="w-10 h-10 rounded-full bg-white/30 dark:bg-zinc-900/30 flex items-center justify-center text-stone-600 dark:text-zinc-300 hover:bg-white/50 dark:hover:bg-zinc-800 transition-colors backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-sm duration-500"
          >
            <Icon name="share-2" className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center mb-10 w-full relative z-10 fade-up">
        <div className="relative mb-6 group cursor-pointer" onClick={handleProfileClick}>
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/50 via-sky-400/50 to-blue-400/50 dark:from-blue-900/50 dark:via-sky-900/50 dark:to-blue-900/50 rounded-full blur opacity-40 group-hover:opacity-60 transition duration-500"></div>
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white dark:border-zinc-800 shadow-xl shadow-blue-200/50 dark:shadow-blue-900/20 relative bg-white dark:bg-zinc-900 transition-colors duration-500">
            <img src={profileState.avatarUrl} alt="Profile" className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500" onError={e => { e.target.src = 'https://ui-avatars.com/api/?name=Iqlima&background=1e40af&color=fff&size=200'; }} />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-stone-800 dark:text-white mb-1.5 text-center tracking-tight transition-colors duration-500">{profileState.name}</h1>
        <p className="text-[11px] font-bold text-blue-500 dark:text-blue-400 uppercase tracking-[0.25em] mb-6 text-center transition-colors duration-500">{profileState.role}</p>
        <div className="bg-white/30 dark:bg-zinc-900/35 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] w-full text-center relative z-20 transition-colors duration-500">
          <h2 className="text-[15px] font-bold text-stone-800 dark:text-white mb-2 uppercase tracking-wide bg-gradient-to-r from-blue-500 to-sky-500 dark:from-blue-400 dark:to-sky-500 bg-clip-text text-transparent transition-colors duration-500">{profileState.greeting}</h2>
          <p className="text-stone-600 dark:text-zinc-400 font-medium leading-relaxed text-[13px] transition-colors duration-500">{profileState.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full mb-10 relative z-10 fade-up">
        <button onClick={() => setActiveTab('produk')} className="group relative flex flex-col items-center justify-center gap-2 p-4 rounded-[1.25rem] bg-blue-800 dark:bg-blue-900 text-blue-50 overflow-hidden transition-all hover:bg-blue-700 dark:hover:bg-blue-800 hover:shadow-[0_8px_25px_rgba(59,130,246,0.25)] dark:hover:shadow-[0_8px_25px_rgba(59,130,246,0.4)] border border-blue-700 dark:border-blue-800">
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <Icon name="shopping-bag" className="w-5 h-5 text-blue-200" />
          <span className="text-[11px] font-bold uppercase tracking-widest z-10 text-blue-100 text-center leading-tight">Koleksi Webapps dan Tools</span>
        </button>
        <a href="https://t.me/revolusiai" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 p-4 rounded-[1.25rem] bg-white dark:bg-zinc-900 border border-blue-100 dark:border-zinc-800 text-stone-700 dark:text-zinc-300 transition-all hover:bg-blue-50 dark:hover:bg-zinc-800 hover:border-blue-200 dark:hover:border-zinc-700 hover:shadow-sm">
          <Icon name="send" className="w-5 h-5 text-blue-500 dark:text-blue-400 transition-colors duration-500" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-center">Telegram RevolusiAI</span>
        </a>
      </div>

      <div className="w-full relative z-10">
        <h3 className="text-[10px] font-bold text-stone-400 dark:text-zinc-500 tracking-[0.25em] mb-4 uppercase text-center flex items-center justify-center gap-3 transition-colors duration-500">
          <span className="w-8 h-[1px] bg-stone-200 dark:bg-zinc-800 transition-colors duration-500"></span>
          Pautan Eksklusif
          <span className="w-8 h-[1px] bg-stone-200 dark:bg-zinc-800 transition-colors duration-500"></span>
        </h3>
        <div className="space-y-3">
          {linksState.map((link, idx) => {
            if (link.isPrimary) {
              return (
                <a key={link.id} href={link.url || '#'} target={link.url ? '_blank' : '_self'} rel="noopener noreferrer" style={{ animationDelay: `${idx * 55}ms` }} className="fade-up flex items-center gap-4 bg-blue-800 dark:bg-blue-900 rounded-[1.25rem] p-4 transition-all hover:scale-[1.02] shadow-[0_8px_20px_rgba(59,130,246,0.25)] dark:shadow-[0_8px_20px_rgba(59,130,246,0.3)] text-blue-50 group border border-blue-700 dark:border-blue-800 hover:bg-blue-700 dark:hover:bg-blue-800">
                  <div className="w-12 h-12 bg-blue-600/50 dark:bg-blue-800/50 rounded-full flex items-center justify-center backdrop-blur-sm shrink-0 group-hover:scale-110 transition-transform text-blue-100">
                    <Icon name={link.icon} className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-[14px] uppercase tracking-wide">{link.title}</span>
                </a>
              );
            }
            return (
              <a key={link.id} href={link.url || '#'} target={link.url ? '_blank' : '_self'} rel="noopener noreferrer" style={{ animationDelay: `${idx * 55}ms` }} className="fade-up flex items-center justify-between bg-white/25 dark:bg-zinc-900/20 border border-white/35 dark:border-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_15px_rgba(0,0,0,0.3)] rounded-[1.25rem] p-3 transition-all group hover:bg-white/40 dark:hover:bg-zinc-900/30 backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/40 dark:bg-zinc-800/40 flex items-center justify-center text-blue-500 dark:text-blue-400 group-hover:bg-blue-100/60 dark:group-hover:bg-blue-950/60 group-hover:scale-105 transition-all shrink-0 border border-white/20">
                    <Icon name={link.icon} className="w-5 h-5" style={BRAND_COLORS[link.icon] ? { color: BRAND_COLORS[link.icon] } : undefined} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-800 dark:text-white mb-0.5 text-[13px] transition-colors duration-500">{link.title}</h4>
                    {link.subtitle && <p className="text-[10px] font-medium text-stone-400 dark:text-zinc-400 transition-colors duration-500">{link.subtitle}</p>}
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/40 dark:bg-zinc-800/40 flex items-center justify-center group-hover:bg-blue-100/60 dark:group-hover:bg-blue-950/60 transition-colors shrink-0 mr-1 text-stone-400 dark:text-zinc-500 group-hover:text-blue-500 dark:group-hover:text-blue-400">
                  <Icon name="chevron-right" className="w-4 h-4" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderProductsList = () => (
    <div className="pb-8 pt-8 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <h2 className="text-[24px] font-bold text-stone-800 dark:text-white mb-1 tracking-tight transition-colors duration-500">Koleksi Webapps dan Tools</h2>
        <p className="text-blue-500 dark:text-blue-400 font-semibold text-[10px] uppercase tracking-[0.25em] transition-colors duration-500">Pilihan Eksklusif</p>
      </div>
      <div className="grid grid-cols-1 gap-5">
        {productsState.map(product => (
          <div key={product.id} onClick={() => setSelectedProduct(product)} className="bg-white/30 dark:bg-zinc-900/25 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-[1.5rem] overflow-hidden cursor-pointer hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] hover:bg-white/45 dark:hover:bg-zinc-900/35 hover:-translate-y-1 transition-all duration-300 flex flex-col group p-2">
            <div className="aspect-[16/9] relative overflow-hidden bg-blue-50 dark:bg-zinc-800 rounded-[1rem] transition-colors duration-500">
              <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={e => { e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400'; }} />
            </div>
            <div className="p-4 flex flex-col">
              <h3 className="text-[15px] font-bold text-stone-800 dark:text-white mb-1.5 leading-tight transition-colors duration-500">{product.title}</h3>
              <p className="text-[12px] font-medium text-stone-500 dark:text-zinc-400 line-clamp-2 mb-4 leading-relaxed transition-colors duration-500">{product.description}</p>
              <button className="w-full py-3 rounded-xl bg-blue-800 dark:bg-blue-900 text-blue-100 dark:text-blue-50 font-semibold text-[11px] hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors uppercase tracking-widest mt-auto duration-500">Lihat Detail</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProductDetail = () => {
    if (!selectedProduct) return null;
    return (
      <div className="pb-8 pt-6 animate-in slide-in-from-right-8 fade-in duration-500 relative z-10">
        <button onClick={() => setSelectedProduct(null)} className="flex items-center gap-2 font-semibold text-stone-400 dark:text-zinc-400 hover:text-stone-800 dark:hover:text-white mb-6 transition-colors uppercase text-[10px] tracking-widest group duration-500">
          <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-zinc-700 transition-colors duration-500">
            <Icon name="arrow-left" className="w-3 h-3" />
          </div>
          <span>Kembali</span>
        </button>
        <div className="bg-white/30 dark:bg-zinc-900/25 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-[1.5rem] overflow-hidden shadow-[0_20px_40px_-15px_rgba(59,130,246,0.1)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] p-2 transition-colors duration-500">
          <div className="aspect-[4/3] overflow-hidden bg-blue-50 dark:bg-zinc-800 rounded-[1rem] relative transition-colors duration-500">
            <img src={selectedProduct.imageUrl} alt={selectedProduct.title} className="w-full h-full object-cover" onError={e => { e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400'; }} />
            <div className="absolute top-4 right-4 bg-white/90 dark:bg-zinc-950/90 backdrop-blur px-3 py-1.5 rounded-full transition-colors duration-500">
              <span className="text-[10px] font-bold text-stone-800 dark:text-white tracking-wider transition-colors duration-500">PREMIUM</span>
            </div>
          </div>
          <div className="p-6 text-center">
            <h1 className="text-xl font-bold text-stone-800 dark:text-white mb-3 tracking-tight transition-colors duration-500">{selectedProduct.title}</h1>
            <p className="font-medium text-stone-500 dark:text-zinc-400 text-[13px] mb-8 leading-relaxed transition-colors duration-500">{selectedProduct.description}</p>
            <div className="flex flex-col gap-3">
              {selectedProduct.url ? (
                <a href={selectedProduct.url} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center text-center bg-blue-800 dark:bg-blue-900 hover:bg-blue-700 dark:hover:bg-blue-800 text-blue-50 px-8 py-3.5 rounded-[1rem] font-semibold transition-all shadow-[0_8px_20px_rgba(59,130,246,0.25)] dark:shadow-[0_8px_20px_rgba(59,130,246,0.4)] text-[12px] uppercase tracking-widest border border-blue-700 dark:border-blue-800">Daftar Sekarang / Buka Pautan</a>
              ) : (
                <button className="w-full bg-blue-800 dark:bg-blue-900 hover:bg-blue-700 dark:hover:bg-blue-800 text-blue-50 px-8 py-3.5 rounded-[1rem] font-semibold transition-all shadow-[0_8px_20px_rgba(59,130,246,0.25)] dark:shadow-[0_8px_20px_rgba(59,130,246,0.4)] text-[12px] uppercase tracking-widest border border-blue-700 dark:border-blue-800">Daftar Sekarang</button>
              )}
              {selectedProduct.url ? (
                <a href={selectedProduct.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-stone-600 dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:bg-blue-50 dark:hover:bg-zinc-800 px-5 py-3.5 rounded-[1rem] font-semibold w-full border border-blue-100 dark:border-zinc-700 transition-colors cursor-pointer text-[12px] uppercase tracking-widest duration-500"><Icon name="globe" className="w-4 h-4" />Preview Salespage</a>
              ) : (
                <div className="flex items-center justify-center gap-2 text-stone-600 dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:bg-blue-50 dark:hover:bg-zinc-800 px-5 py-3.5 rounded-[1rem] font-semibold w-full border border-blue-100 dark:border-zinc-700 transition-colors cursor-pointer text-[12px] uppercase tracking-widest duration-500"><Icon name="globe" className="w-4 h-4" />Preview Salespage</div>
              )}
            </div>
          </div>
        </div>
        {selectedProduct.gallery && selectedProduct.gallery.length > 0 && (
          <MarqueeGallery images={selectedProduct.gallery} title={(PRODUCT_GALLERIES[selectedProduct.id] && PRODUCT_GALLERIES[selectedProduct.id].title) || 'Contoh Hasil'} />
        )}
      </div>
    );
  };

  const aur = AURORA_THEMES[profileState.theme] || AURORA_THEMES.blue;

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-zinc-950 text-stone-800 dark:text-white font-sans selection:bg-blue-100 dark:selection:bg-blue-900/50 selection:text-blue-900 dark:selection:text-white flex justify-center transition-colors duration-500 relative overflow-hidden">
        <AuroraBg aur={aur} isDark={isDark} />

        <div className="w-full max-w-md md:max-w-lg min-h-[100dvh] relative bg-white/20 dark:bg-zinc-950/30 backdrop-blur-[32px] shadow-[0_0_80px_rgba(59,130,246,0.15)] dark:shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden border-x border-white/35 dark:border-white/10 transition-colors duration-500 z-10">
          <main className="p-6 sm:p-7 h-[100dvh] overflow-y-auto hide-scrollbar pb-32 relative z-10">
            {activeTab === 'home' && renderHome()}
            {activeTab === 'produk' && !selectedProduct && renderProductsList()}
            {activeTab === 'produk' && selectedProduct && renderProductDetail()}
            {(activeTab === 'channel' || activeTab === 'youtube') && (
              <div className="flex flex-col items-center justify-center h-full text-center pb-24 relative z-10">
                <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-zinc-800 shadow-sm flex items-center justify-center mb-4 text-blue-500 dark:text-blue-400 transition-colors duration-500">
                  {activeTab === 'channel' ? <Icon name="message-circle" className="w-8 h-8" /> : <Icon name="youtube" className="w-8 h-8" />}
                </div>
                <h2 className="text-xl font-bold text-stone-800 dark:text-white mb-2 uppercase tracking-wide transition-colors duration-500">Segera Datang</h2>
                <p className="font-medium text-stone-500 dark:text-zinc-400 text-sm transition-colors duration-500">Kandungan untuk halaman ini sedang dikemaskini.</p>
              </div>
            )}
          </main>

          <a href={`https://wa.me/${profileState.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="absolute bottom-24 right-6 w-[52px] h-[52px] bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full flex items-center justify-center shadow-[0_8px_20px_rgb(37,211,102,0.3)] transition-transform hover:scale-105 z-50">
            <Icon name="message-circle" className="w-6 h-6" fill="currentColor" />
          </a>

          <div className="absolute bottom-0 left-0 w-full bg-[#E0F2FE]/90 dark:bg-slate-900/90 backdrop-blur-2xl border-t border-sky-200/50 dark:border-white/10 px-6 py-4 z-40 transition-colors duration-500">
            <div className="flex items-center justify-between px-2 max-w-sm mx-auto">
              <button onClick={() => { setActiveTab('home'); setSelectedProduct(null); }} className={`flex flex-col items-center gap-1.5 transition-colors duration-300 ${activeTab === 'home' ? 'text-black dark:text-white' : 'text-stone-400 dark:text-zinc-500 hover:text-black dark:hover:text-white'}`}>
                <div className={`p-2.5 rounded-xl transition-all ${activeTab === 'home' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-transparent'}`}><Icon name="home" className="w-5 h-5" /></div>
              </button>
              <button onClick={() => setActiveTab('produk')} className={`flex flex-col items-center gap-1.5 transition-colors duration-300 ${activeTab === 'produk' ? 'text-black dark:text-white' : 'text-stone-400 dark:text-zinc-500 hover:text-black dark:hover:text-white'}`}>
                <div className={`p-2.5 rounded-xl transition-all ${activeTab === 'produk' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-transparent'}`}><Icon name="shopping-bag" className="w-5 h-5" /></div>
              </button>
              <a href={profileState.whatsappGroupUrl || '#'} target="_blank" rel="noopener noreferrer" title="Group WhatsApp Umum" className="flex flex-col items-center gap-1.5 transition-colors duration-300 text-stone-400 dark:text-zinc-500 hover:text-black dark:hover:text-white">
                <div className="p-2.5 rounded-xl transition-all bg-transparent"><Icon name="users" className="w-5 h-5" /></div>
              </a>
              <a href={profileState.tiktokUrl || '#'} target="_blank" rel="noopener noreferrer" title="TikTok" className="flex flex-col items-center gap-1.5 transition-colors duration-300 text-stone-400 dark:text-zinc-500 hover:text-black dark:hover:text-white">
                <div className="p-2.5 rounded-xl transition-all bg-transparent"><Icon name="tiktok" className="w-5 h-5" fill="currentColor" /></div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {showPasswordModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 backdrop-blur-sm px-6">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-blue-100 dark:border-zinc-700">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center"><Icon name="lock" className="w-4 h-4 text-blue-600 dark:text-blue-400" /></div>
                <h3 className="font-bold text-stone-800 dark:text-white text-sm uppercase tracking-widest">Admin</h3>
              </div>
              <button onClick={() => { setShowPasswordModal(false); setPassword(''); setPasswordError(false); }} className="w-7 h-7 rounded-full bg-stone-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-stone-200 dark:hover:bg-zinc-700 transition-colors"><Icon name="x" className="w-3.5 h-3.5 text-stone-500 dark:text-zinc-400" /></button>
            </div>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => { setPassword(e.target.value); setPasswordError(false); }} placeholder="Masukkan kata laluan" autoFocus className={`w-full bg-stone-50 dark:bg-zinc-800 border rounded-xl px-4 py-3 text-sm text-stone-800 dark:text-white focus:outline-none focus:ring-2 pr-10 transition-colors ${passwordError ? 'border-red-300 dark:border-red-700 focus:ring-red-300' : 'border-stone-200 dark:border-zinc-700 focus:ring-blue-300 dark:focus:ring-blue-600'}`} />
                <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 dark:text-zinc-500 hover:text-stone-600 dark:hover:text-zinc-300">{showPass ? <Icon name="eye-off" className="w-4 h-4" /> : <Icon name="eye" className="w-4 h-4" />}</button>
              </div>
              {passwordError && <p className="text-red-500 text-[11px] font-semibold text-center">Kata laluan salah. Cuba lagi.</p>}
              <button type="submit" className="w-full py-3 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded-xl text-[12px] uppercase tracking-widest transition-colors">Masuk</button>
            </form>
          </div>
        </div>
      )}

      {showAdmin && (
        <AdminPanel profileData={profileState} links={linksState} products={productsState} onSave={handleAdminSave} onClose={() => setShowAdmin(false)} />
      )}

      {shared && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[400] flex items-center gap-2 bg-stone-900/90 dark:bg-white/90 text-white dark:text-stone-900 text-[12px] font-semibold px-4 py-2.5 rounded-full shadow-xl backdrop-blur animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Icon name="check-circle" className="w-4 h-4 text-green-400 dark:text-green-600" />
          Link web disalin ✓
        </div>
      )}
      {shareErr && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[400] flex items-start gap-2 max-w-[320px] bg-amber-500 text-white text-[12px] font-semibold px-4 py-3 rounded-2xl shadow-xl backdrop-blur animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Icon name="x" className="w-4 h-4 mt-0.5 shrink-0" />
          <span>Link terlalu panjang sebab gambar yang di-upload. Guna <b>URL gambar</b> (bukan upload) untuk galeri/produk, atau Eksport Data untuk versi kekal.</span>
        </div>
      )}
    </div>
  );
}

export default App;
