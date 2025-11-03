# PurpleCare – Volunteer & Charity Platform

PurpleCare adalah platform berbasis web yang menghubungkan **volunteer, donatur, dan penyelenggara acara sosial** dalam satu tempat.  
Dibangun dengan teknologi modern **React + Vite + Tailwind CSS**, PurpleCare memudahkan pengguna untuk **bergabung sebagai relawan, berdonasi, dan melihat dampak nyata dari kegiatan sosial** di seluruh komunitas.

---

## 🌐 Demo Preview
 *Demo URL akan ditambahkan setelah deployment*

---

## 🧭 Project Overview

PurpleCare memiliki tampilan antarmuka modern dan intuitif, dengan struktur halaman utama berikut:

1. **Landing Page**
   - Hero section dengan CTA utama (Join / Donate)
   - About Us — memperkenalkan misi PurpleCare
   - Get Involved — menjelaskan cara ikut berpartisipasi
   - Events Section — menampilkan daftar kegiatan sosial/volunteer
   - Impact / Stats — menampilkan data kontribusi & donasi
   - Contact / Footer — informasi kontak dan link media sosial

2. **Events Page**
   - Daftar event dengan card interaktif (gambar, judul, tanggal, lokasi)
   - Tombol detail -> menuju ke halaman EventDetail
   - User bisa search dan memfilter kegiatan yang ingin dicari

3. **Event Detail Page**
   - Menampilkan informasi lengkap event (judul, deskripsi, tanggal, lokasi, jumlah volunteer yang dibutuhkan)
   - Tombol:
     - 💪 **Join as Volunteer** -> ke halaman JoinEvent (form pendaftaran volunteer)
     - 💰 **Donate Now** -> ke halaman Donate (donasi spesifik event)

4. **JoinEvent Page**
   - Menampilkan detail event terpilih
   - Form untuk calon volunteer:
     - Nama lengkap
     - Nomor telepon
     - Email
     - Alasan bergabung
   - Submit → menampilkan konfirmasi 

5. **Donate Page**
   - Informasi event tujuan donasi
   - Form donasi dengan input:
     - Nominal (Rp)
     - Upload bukti transfer
     - Pesan opsional
   - QR Code untuk pembayaran (simulasi)
   - Pesan sukses otomatis setelah submit

6. **Get Involved Page**
   - Menampilkan ajakan untuk user ikut bergabung menjadi Relawan dan Donatur
   - Tombol Gabung sekarang -> ke Halaman Event 
   - Tombol Donasi -> ke Halaman Event
   - Tombol Hubungi Kami -> ke Halaman Contact

7. **About Page**
   - Tombol Mari Berpartisipasi -> ke halaman Event
   - Menampilkan Informasi mengenai PurpleCare

8. **Contact Page**
   - Menampilkan Informasi Kontak (email, nomor, dan lokasi)
   - Informasi Jam Operasional
   - Form berisi Nama, Email, dan Pesan yang akan diteruskan ke Email Bisnis kami: purplecare01@gmail.com 

9. **Authentication Pages**
   - 🔐 **Login Page** — simulasi autentikasi dengan validasi input
   - 📝 **Register Page** — simulasi pembuatan akun
   - 🔁 **Forgot Password** — form pemulihan akun

---

## ⚙️ Tech Stack


| **Frontend Framework** | [React.js (Vite)](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Icons** | [lucide-react](https://lucide.dev/) |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) |
| **Routing** | [react-router-dom](https://reactrouter.com/) |
| **State Management (Lightweight)** | React Hooks (`useState`, `useEffect`, `useContext`) |
| **Image Assets** | SVG custom + Unsplash placeholders |
| **Font** | Poppins (Heading) & Inter (Body) |
| **Design System** | Clean, minimal, accessible, soft-rounded UI (Tailwind utility classes) |

---

## 🧩 Folder Structure

src/
│
├── assets/ # Gambar, ikon, ilustrasi, QR Code
├── components/ # Reusable UI components
├── config/ #menyimpan api.js
├── context/ #menyimpan Auth Context
├── data/ # Data statis (events.js dll)
├── hooks/ # menyimpan use auth
├── pages/ # Semua halaman utama (Home, Login, Register, Events, dsb)
├── App.jsx # Root komponen utama
└── main.jsx # Entry point aplikasi


---

## 🚀 Fitur Utama (Frontend)

| **Landing Page Dinamis** | Hero, About Us, Get Involved, Events, Impact, dan Contact |
| **Event Listing & Detail** | Menampilkan daftar event sosial dan detail tiap kegiatan |
| **Volunteer Registration** | Form interaktif untuk pendaftaran volunteer berdasarkan event |
| **Donation System (Simulasi)** | Donasi via QR dan upload bukti transfer |
| **Authentication Pages (Mock)** | Login, Register, dan Forgot Password simulasi |
| **UI/UX Modern & Responsif** | Menggunakan Tailwind + Framer Motion untuk animasi halus |
| **Theming Consistent** | Warna utama: Purple (#6C4AB6), Coral (#FF6F61), Accent Hijau Soft (#34D399) |
| **Fully Responsive** | Desain adaptif untuk mobile, tablet, dan desktop |

---

## 🧠 User Flow (ringkas)

Landing Page
↓
Events Page
↓
Event Detail
├── Join as Volunteer → JoinEvent Page
└── Donate Now → Donate Page


---

## Setup & Installation

```bash
# 1. Clone repository
git clone https://github.com/nbyl26/volunteer-charity-purpleTeam.git
cd purplecare

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
