# WEB PROFILE IQLIMA

Web profil **link-in-bio** untuk **@iqlimaraudhah** — Optometris yang suka dengan AI. Satu tempat untuk semua pautan, channel & online course AI.

Dibina sebagai projek **Vite + React** (sedia untuk deploy di Vercel).

🔗 **Live:** https://iqlimaraudhah-profil.vercel.app

---

## ✨ Ciri-ciri

- **Profil link-in-bio** — avatar, role, ucapan & butang WhatsApp
- **Senarai pautan utama** — Bizstack, Channel WhatsApp, AksenSnap, dll.
- **Galeri produk / course** — kad produk dengan gambar & penerangan
- **Mod gelap (dark mode)** — toggle terang/gelap, kekal tersimpan
- **Mod kongsi** — link `?share=1` untuk paparan awam (panel admin dimatikan)
- **Latar aurora beranimasi** — beberapa pilihan tema warna
- **Panel admin tersembunyi** — edit profil, pautan & produk terus dari pelayar

---

## 🔐 Panel Admin

1. **Klik gambar profil 5 kali** berturut-turut
2. Masukkan kata laluan: `iqlima123`
3. Edit tab **Profil / Pautan / Produk** → tekan **Simpan**

> Suntingan disimpan dalam pelayar (localStorage). Tukar kata laluan default dalam `src/App.jsx` sebelum guna untuk awam.

---

## 🚀 Run di komputer (perlu Node.js)

```bash
npm install
npm run dev      # buka http://localhost:5173
npm run build    # hasilkan folder dist/ untuk produksi
```

## ☁️ Deploy ke Vercel

Vercel auto-kesan projek Vite:

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

**Cara A — GitHub + Vercel (auto-deploy)**
1. Push repo ini ke GitHub
2. Di Vercel: **Add New → Project → Import Git Repository** → pilih repo ini → **Deploy**
3. Setiap `git push` selepas ini akan auto-deploy

---

## 📁 Struktur

```
index.html            # Entry point Vite (Tailwind CDN, Poppins, animasi aurora, Firebase opsional)
src/
  main.jsx            # Mount React ke #root
  App.jsx             # Logik app — data profil, pautan, produk, panel admin
vite.config.js        # Konfigurasi Vite + plugin React
package.json          # Dependencies & skrip
legacy-bundle.html    # Versi lama self-contained (rujukan sahaja)
app.jsx               # Sumber asal single-file (rujukan sahaja)
support.js            # Runtime versi .dc.html lama (rujukan)
```

---

## 🛠️ Dibina dengan

Vite · React · Tailwind CSS · Poppins · animasi CSS kustom
