# Backend - Platform Volunteer & Charity

Ini adalah backend REST API untuk platform Volunteer & Charity. Proyek ini mengelola event kerelawanan, campaign donasi, dan manajemen user (Admin, Volunteer, Donatur).

Proyek ini dibuat oleh **Purple Team**.

## ✨ Fitur Utama

* **Autentikasi & Otorisasi:** Sistem login dan registrasi berbasis JWT (Access & Refresh Token) untuk tiga peran: Admin, Volunteer, dan Donatur.
* **Manajemen Event (Admin):** Admin dapat membuat, membaca, memperbarui, dan menghapus (CRUD) event volunteer.
* **Manajemen Campaign (Admin):** Admin dapat membuat, membaca, memperbarui, dan menghapus (CRUD) campaign donasi.
* **Alur Pendaftaran Volunteer:** Volunteer dapat melihat daftar event dan mendaftar, kemudian statusnya akan menunggu persetujuan admin.
* **Alur Donasi:** Donatur dapat melihat campaign dan mengirimkan donasi dengan mengupload bukti transfer.
* **Verifikasi Admin:** Admin dapat memverifikasi bukti transfer donasi (approve/reject) dan menyetujui (approve) pendaftaran volunteer.
* **Manajemen Profil:** User dapat melihat dan memperbarui data profil mereka.
* **Upload File:** Mendukung upload file untuk bukti donasi dan dokumentasi aktivitas volunteer (opsional).

## 🛠️ Teknologi yang Digunakan

* **Go (Golang)**
* **Fiber:** Framework web Go yang ekspresif dan cepat.
* **GORM:** ORM untuk interaksi database.
* **MySQL:** Database SQL.
* **JWT (golang-jwt/v5):** Untuk implementasi Access Token dan Refresh Token.
* **Godotenv:** Untuk manajemen environment variable dari file `.env`.
* **Validator V10:** Untuk validasi struct pada input request.
* **Bcrypt:** Untuk hashing password.

## 🚀 Cara Menjalankan

### 1. Prasyarat

* **Go** (versi 1.18+ direkomendasikan).
* **MySQL** (atau database SQL lain yang didukung GORM).
* Sebuah tool API client seperti Postman atau Insomnia.

### 2. Instalasi

1.  **Clone Repositori**
    ```bash
    git clone <url-repositori-anda>
    cd backend
    ```

2.  **Setup Environment (.env)**
    Buat file bernama `.env` di dalam folder `backend/` (sejajar dengan `main.go`). Salin konten di bawah ini dan sesuaikan dengan konfigurasi lokal Anda.

    ```env
    # Server Configuration
    PORT=8080

    # Database (MySQL) - GANTI INI
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_USER=root
    DB_PASSWORD=secret
    DB_NAME=volunteer_db

    # JWT Secrets - GANTI INI DENGAN KATA ACAK YANG KUAT
    JWT_ACCESS_SECRET="ganti-saya-dengan-access-secret-yang-aman"
    JWT_REFRESH_SECRET="ganti-saya-dengan-refresh-secret-yang-aman"
    JWT_EXPIRATION=15m
    ```

3.  **Buat Database**
    Pastikan Anda telah membuat database di MySQL dengan nama yang Anda tentukan di `.env` (contoh: `volunteer_db`).
    ```sql
    CREATE DATABASE volunteer_db;
    ```

4.  **Instalasi Dependensi**
    Jalankan perintah ini untuk mengunduh semua library yang diperlukan:
    ```bash
    go mod tidy
    ```

5.  **Jalankan Server**
    ```bash
    go run main.go
    ```
    Server akan berjalan di `http://localhost:8080` (atau port yang Anda tentukan di `.env`).

## 📁 Struktur Folder

```
/backend
├── config/       # Mengelola config (JWT, Port) dari .env
├── controllers/  # Logika bisnis (request handler) untuk setiap model
├── database/     # Koneksi DB GORM & fungsi migrasi
├── middleware/   # Middleware (Auth JWT, Role Based)
├── models/       # Struct GORM (skema tabel database)
├── routes/       # Definisi endpoint API dan routing
├── utils/        # Fungsi pembantu (Validator, JWT generator)
├── uploads/      # (Folder ini akan dibuat otomatis untuk menyimpan file)
├── .env          # (File rahasia, tidak di-commit)
├── main.go       # Entry point aplikasi (inisiasi server)
└── go.mod        # Manajemen dependensi
```

## 📋 Daftar API Endpoint

<details>
<summary>Klik untuk melihat semua endpoint</summary>

### 1. 🏛️ Publik / Guest (Tidak Perlu Login)

* **Registrasi User (Volunteer / Donatur)**
    * `POST /auth/register`
    * Body (JSON): `{ "name": "...", "email": "...", "password": "...", "role": "volunteer" }`

* **Login User**
    * `POST /auth/login`
    * Body (JSON): `{ "email": "...", "password": "..." }`

* **Refresh Access Token**
    * `POST /auth/refresh`
    * Body (JSON): `{ "refresh_token": "..." }`

* **Lihat Semua Event**
    * `GET /events`

* **Liat Detail Event**
    * `GET /events/:id`

* **Lihat Semua Campaign Donasi**
    * `GET /campaigns`

* **Lihat Detail Campaign Donasi**
    * `GET /campaigns/:id`

### 2. 👤 User Terotentikasi (Memerlukan Auth Header)

* **Cek Profil Singkat (Siapa saya?)**
    * `GET /auth/me`

* **Lihat Profil Lengkap (Termasuk Riwayat)**
    * `GET /users/me`

* **Update Profil (Nama / Email)**
    * `PATCH /users/me`
    * Body (JSON): `{ "name": "...", "email": "..." }`

### 3. 🧑‍🤝‍🧑 Khusus Volunteer (Role: "volunteer")

* **Mendaftar Ikut Event**
    * `POST /events/:id/join`

* **Upload Dokumentasi Aktivitas**
    * `POST /upload/documentation/:regId`
    * Body: `Form-Data` (Key: `documentation`, Value: [File])

### 4. 💰 Khusus Donatur (Role: "donatur")

* **Kirim Donasi ke Campaign**
    * `POST /campaigns/:id/donate`
    * Body: `Form-Data` (Key: `amount`, Value: `50000`; Key: `proof_of_payment`, Value: [File])

### 5. 👑 Khusus Admin (Role: "admin")

* **Membuat Event Baru**
    * `POST /events`
    * Body (JSON): `{ "title": "...", "description": "...", "location": "...", "event_date": "..." }`

* **Update Event**
    * `PUT /events/:id`
    * Body (JSON): (Sama seperti membuat event)

* **Hapus Event**
    * `DELETE /events/:id`

* **Approve Pendaftaran Volunteer**
    * `PATCH /events/registrations/:regId/approve/:volunteerId`

* **Membuat Campaign Donasi Baru**
    * `POST /campaigns`
    * Body (JSON): `{ "title": "...", "description": "...", "target": 10000000.0 }`

* **Update Campaign Donasi**
    * `PUT /campaigns/:id`
    * Body (JSON): (Sama seperti membuat campaign)

* **Hapus Campaign Donasi**
    * `DELETE /campaigns/:id`

* **Verifikasi Donasi Masuk**
    * `PATCH /donations/:id/verify`
    * Body (JSON): `{ "status": "verified" }` atau `{ "status": "rejected" }`

* **Lihat Semua User**
    * `GET /users`

* **Lihat Detail User**
    * `GET /users/:id`

</details>

---

## 👥 Kontributor

* **Nabil Pasha** (Frontend)
* **M. Naufal Rafif** (Backend)