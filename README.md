# 🌟 PurpleCare - Volunteer & Charity Platform

<div align="center">

![Platform Status](https://img.shields.io/badge/status-active-success.svg)
![Team](https://img.shields.io/badge/team-purple-purple.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

**Platform terintegrasi untuk menghubungkan volunteer, donatur, dan penyelenggara acara sosial**

[Demo](#) • [Dokumentasi](#dokumentasi) • [Tim](#-tim-pengembang)

</div>

---

## 📖 Tentang Proyek

**PurpleCare** adalah platform web modern yang dirancang untuk memfasilitasi kegiatan sosial dan charity. Platform ini menghubungkan tiga pihak utama:

- 🙋‍♂️ **Volunteer** - Relawan yang ingin berkontribusi dalam kegiatan sosial
- 💰 **Donatur** - Individu yang ingin berdonasi untuk campaign tertentu
- 👨‍💼 **Admin** - Pengelola yang mengorganisir event dan campaign

### ✨ Fitur Utama

#### 🔐 Sistem Autentikasi & Otorisasi
- Registrasi dan login dengan JWT (Access & Refresh Token)
- Role-based access control (Admin & User)
- Password reset via email (menggunakan Resend API)
- Protected routes untuk user dan admin

#### 📅 Manajemen Event Volunteer
- **Public:** Browse dan lihat detail event volunteer
- **User:** Daftar sebagai volunteer untuk event tertentu
- **Admin:** CRUD event, approve/reject pendaftaran volunteer
- Filter event berdasarkan kategori
- Upload dokumentasi aktivitas volunteer
- Status tracking: pending, approved, rejected, selesai

#### 💖 Manajemen Campaign Donasi
- **Public:** Browse dan lihat detail campaign donasi
- **User:** Donasi dengan upload bukti transfer
- **Admin:** CRUD campaign, verifikasi donasi
- Real-time progress bar target donasi
- Status donasi: pending, verified, rejected
- Transparansi total dana terkumpul

#### 👥 Manajemen Pengguna
- Profile management untuk semua user
- Admin dapat melihat semua user dan detailnya
- Dashboard personal untuk track aktivitas

#### 📊 Dashboard & Analytics (Admin)
- Statistik platform secara real-time
- Total volunteer, donatur, donasi terkumpul
- Event registrations management
- Donations verification panel
- Visual analytics dengan charts

#### 📧 Sistem Email
- Contact form untuk komunikasi dengan admin
- Password reset notification
- Email alerts untuk status approval

---

## 🛠️ Tech Stack

### Backend
- **Language:** Go 1.24+
- **Framework:** Fiber v2 (Fast HTTP framework)
- **ORM:** GORM (dengan MySQL driver)
- **Authentication:** JWT (golang-jwt/v5)
- **Email Service:** Resend API
- **Validation:** go-playground/validator/v10
- **Security:** bcrypt (password hashing)
- **Environment:** godotenv

### Frontend
- **Library:** React 19.1.1
- **Build Tool:** Vite 7.1.7
- **Styling:** Tailwind CSS 3.4.17
- **Routing:** React Router DOM 7.9.1
- **HTTP Client:** Axios 1.13.1
- **Animations:** Framer Motion 12.23.19
- **Icons:** Lucide React, React Icons
- **Charts:** Recharts 3.3.0
- **Notifications:** React Hot Toast 2.6.0

### Database
- **DBMS:** MySQL 8.0+
- **Schema:** 5 main tables (users, events, campaigns, donations, event_registrations)
- **Relations:** Foreign keys dengan cascade delete

---

## 📁 Struktur Proyek

```
volunteer-charity-purpleTeam/
├── backend/
│   ├── config/              # Konfigurasi (env, JWT)
│   ├── controllers/         # Business logic handlers
│   │   ├── auth_controller.go
│   │   ├── campaign_controller.go
│   │   ├── donation_controller.go
│   │   ├── email_controller.go
│   │   ├── event_controller.go
│   │   ├── upload_controller.go
│   │   └── user_controller.go
│   ├── database/            # Database connection & migration
│   ├── middleware/          # Auth & Role middleware
│   ├── models/              # GORM models (User, Event, Campaign, etc.)
│   ├── routes/              # API route definitions
│   ├── utils/               # Helper functions (JWT, validation, file handler)
│   ├── uploads/             # File storage directory
│   ├── main.go              # Entry point
│   ├── go.mod               # Go dependencies
│   └── init_database.sql    # Database initialization script
│
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── assets/          # Images, fonts
│   │   ├── components/      # React components
│   │   │   ├── admin/       # Admin dashboard components
│   │   │   ├── auth/        # Auth forms & layouts
│   │   │   ├── campaigns/   # Campaign components
│   │   │   ├── dashboard/   # User dashboard components
│   │   │   ├── events/      # Event components
│   │   │   ├── home/        # Landing page components
│   │   │   ├── layout/      # Navbar, Footer
│   │   │   └── ui/          # Reusable UI components
│   │   ├── config/          # API configuration
│   │   ├── context/         # React Context (AuthContext)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Page components
│   │   │   ├── Admin/       # Admin pages
│   │   │   └── *.jsx        # Public & user pages
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # React entry point
│   ├── package.json         # NPM dependencies
│   ├── vite.config.js       # Vite configuration
│   └── tailwind.config.js   # Tailwind configuration
│
└── README.md                # This file
```

---

## 🚀 Cara Menjalankan Proyek

### Prerequisites

- **Go** 1.24+ ([Download](https://go.dev/dl/))
- **Node.js** 18+ & npm ([Download](https://nodejs.org/))
- **MySQL** 8.0+ ([Download](https://dev.mysql.com/downloads/))
- **Git** ([Download](https://git-scm.com/))

### 1️⃣ Clone Repository

```bash
git clone <repository-url>
cd volunteer-charity-purpleTeam
```

### 2️⃣ Setup Database

```bash
# Login ke MySQL
mysql -u root -p

# Buat database
CREATE DATABASE charity_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# (Optional) Import schema
mysql -u root -p charity_platform < backend/init_database.sql
```

### 3️⃣ Setup Backend

```bash
cd backend

# Install dependencies
go mod tidy

# Copy environment file
cp env.example .env

# Edit .env dengan konfigurasi Anda
# - DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
# - JWT_SECRET (gunakan string random yang kuat)
# - RESEND_API_KEY (untuk email service)
# - PORT (default: 8080)

# Jalankan server
go run main.go
```

Server akan berjalan di `http://localhost:8080`

### 4️⃣ Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# (Optional) Setup environment
# Buat file .env jika perlu custom API URL
# VITE_API_BASE_URL=http://localhost:8080/api

# Jalankan development server
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`

### 5️⃣ Akses Aplikasi

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8080/api

---

## 📚 Dokumentasi API

### Base URL
```
http://localhost:8080/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/register` | Registrasi user baru | ❌ |
| POST | `/auth/login` | Login user | ❌ |
| POST | `/auth/refresh` | Refresh access token | ❌ |
| POST | `/auth/logout` | Logout user | ✅ |
| GET | `/auth/me` | Get current user info | ✅ |
| POST | `/auth/forgot-password` | Request password reset | ❌ |
| POST | `/auth/reset-password` | Reset password dengan token | ❌ |

### Events Endpoints

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/events` | Get all events | ❌ | - |
| GET | `/events/:id` | Get event detail | ❌ | - |
| POST | `/events` | Create new event | ✅ | Admin |
| PUT | `/events/:id` | Update event | ✅ | Admin |
| DELETE | `/events/:id` | Delete event | ✅ | Admin |
| POST | `/events/:id/join` | Join event as volunteer | ✅ | User |
| GET | `/events/:id/registrations` | Get event registrations | ✅ | Admin |
| PATCH | `/events/registrations/:regId/approve/:volunteerId` | Approve volunteer | ✅ | Admin |
| PATCH | `/events/registrations/:regId/reject/:volunteerId` | Reject volunteer | ✅ | Admin |
| PATCH | `/events/registrations/:regId/status` | Update registration status | ✅ | Admin |

### Campaigns Endpoints

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/campaigns` | Get all campaigns | ❌ | - |
| GET | `/campaigns/:id` | Get campaign detail | ❌ | - |
| POST | `/campaigns` | Create new campaign | ✅ | Admin |
| PUT | `/campaigns/:id` | Update campaign | ✅ | Admin |
| DELETE | `/campaigns/:id` | Delete campaign | ✅ | Admin |
| POST | `/campaigns/:id/donate` | Create donation | ✅ | User |

### Donations Endpoints

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/donations` | Get all donations | ✅ | Admin |
| PATCH | `/donations/:id/verify` | Verify donation | ✅ | Admin |

### Users Endpoints

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/users/me` | Get my profile | ✅ | User |
| PATCH | `/users/me` | Update my profile | ✅ | User |
| GET | `/users` | Get all users | ✅ | Admin |
| GET | `/users/:id` | Get user by ID | ✅ | Admin |

### Other Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/contact` | Send contact email | ❌ |
| POST | `/upload/documentation/:regId` | Upload volunteer documentation | ✅ |

### Request Examples

**Register User**
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Login**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Create Event (Admin)**
```bash
POST /api/events
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Beach Cleanup",
  "description": "Let's clean our beach!",
  "location": "Kuta Beach, Bali",
  "event_date": "2026-03-15T09:00:00Z",
  "category": "lingkungan"
}
```

**Donate to Campaign**
```bash
POST /api/campaigns/1/donate
Authorization: Bearer <access_token>
Content-Type: multipart/form-data

amount: 100000
proof_of_payment: [file]
message: "Semoga bermanfaat"
```

---

## 🎨 Fitur Frontend

### Halaman Public
- **Home** - Landing page dengan hero section, about preview, featured events
- **About** - Informasi lengkap tentang PurpleCare, misi, visi, dan values
- **Get Involved** - Panduan untuk menjadi volunteer atau donatur
- **Events** - Browse semua event dengan filter kategori dan search
- **Event Detail** - Detail lengkap event termasuk deskripsi, lokasi, tanggal
- **Campaigns** - Browse campaign donasi aktif
- **Campaign Detail** - Detail campaign dengan progress bar dan daftar donasi
- **Contact** - Form kontak dengan informasi alamat dan jam operasional
- **Terms & Privacy** - Syarat ketentuan dan kebijakan privasi

### Halaman Authentication
- **Login** - Form login dengan remember me
- **Register** - Form registrasi dengan validasi
- **Forgot Password** - Request reset password via email
- **Reset Password** - Set password baru dengan token

### Halaman User Dashboard
- **Dashboard** - Overview aktivitas personal (event joined, donations)
- **Join Event** - Form pendaftaran volunteer untuk event
- **Donate** - Form donasi dengan upload bukti transfer
- **Profile Management** - Edit profil dan informasi personal

### Halaman Admin Dashboard
- **Dashboard** - Statistik overview platform
- **Events Management** - CRUD events dengan tabel interaktif
- **Volunteers Management** - Approve/reject volunteer registrations
- **Campaigns Management** - CRUD campaigns
- **Donations Management** - Verify/reject donations
- **Users Management** - View all users dan detail
- **Analytics** - Visual reports dan charts
- **Event Registrations** - Detail pendaftaran per event

### UI/UX Features
- 🎨 Modern design dengan Tailwind CSS
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Smooth animations dengan Framer Motion
- 🔔 Toast notifications untuk feedback
- 🎯 Loading states dan error handling
- 🔍 Search dan filter functionality
- 📊 Interactive charts di analytics
- 🖼️ Image placeholders dan lazy loading

---

## 🔐 Security Features

- ✅ Password hashing dengan bcrypt
- ✅ JWT-based authentication (Access & Refresh tokens)
- ✅ HTTP-only cookies untuk refresh token
- ✅ CORS configuration
- ✅ Input validation (backend & frontend)
- ✅ SQL injection prevention (GORM parameterized queries)
- ✅ Role-based access control
- ✅ Protected file uploads
- ✅ Password reset dengan expiring tokens

---

## 📦 Database Schema

### Tables

**users**
- id (PK)
- name
- email (unique)
- password (hashed)
- role (admin/user)
- password_reset_token
- reset_token_expiry
- created_at, updated_at

**events**
- id (PK)
- title
- description
- location
- event_date
- photo_url
- category
- created_at, updated_at

**campaigns**
- id (PK)
- title
- description
- target (amount)
- collected (amount)
- image_url
- created_at, updated_at

**donations**
- id (PK)
- amount
- proof_of_payment (file path)
- message
- status (pending/verified/rejected)
- user_id (FK)
- campaign_id (FK)
- created_at, updated_at

**event_registrations**
- id (PK)
- status (pending/approved/rejected/selesai)
- documentation_upload (file path)
- user_id (FK)
- event_id (FK)
- created_at, updated_at

---

## 🧪 Testing

```bash
# Backend tests (if available)
cd backend
go test ./...

# Frontend tests (if available)
cd frontend
npm run test
```

---

## 📦 Build & Deployment

### Build Backend

```bash
cd backend
go build -o purplecare-api main.go
```

### Build Frontend

```bash
cd frontend
npm run build
# Output akan ada di folder dist/
```

### Deployment Options
- **Backend:** Deploy ke VPS (dengan systemd), Heroku, Railway, atau Docker
- **Frontend:** Deploy ke Vercel, Netlify, atau serve static files dari Nginx
- **Database:** MySQL di cloud (AWS RDS, DigitalOcean, etc.)

---

## 🤝 Kontribusi

Contributions are welcome! Untuk berkontribusi:

1. Fork repository ini
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'feat: add some amazing feature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

### Commit Message Convention

Gunakan conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Tim Pengembang

<table>
  <tr>
    <td align="center">
      <b>Nabil Pasha</b><br>
      <sub>Frontend Developer</sub><br>
      <a href="https://github.com/nbyl26">@nbyl26</a>
    </td>
    <td align="center">
      <b>M. Naufal Rafif Pratama</b><br>
      <sub>Backend Developer</sub><br>
      <a href="https://github.com/Naufal2376">@Naufal2376</a>
    </td>
  </tr>
</table>

**Team:** Purple 💜

---

## 📞 Kontak & Support

Jika ada pertanyaan atau issues, silakan:
- Buka [GitHub Issues](../../issues)
- Email: support@purplecare.com (if available)

---

## 🙏 Acknowledgments

- Thanks to semua open source libraries yang digunakan
- Fiber framework community
- React & Vite community
- Tailwind CSS team

---

<div align="center">

**Dibuat dengan ❤️ oleh Team Purple**

⭐ Star this repository jika bermanfaat!

</div>

