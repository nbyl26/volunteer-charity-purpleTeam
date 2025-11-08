# Backend - Platform Volunteer & Charity

Ini adalah backend REST API untuk platform Volunteer & Charity. Proyek ini mengelola semua logika bisnis, data, dan autentikasi untuk aplikasi web.

Proyek ini dibuat oleh **Purple Team**.

## ✨ Fitur Utama

* **Autentikasi Berbasis Cookie:** Sistem autentikasi aman menggunakan **HttpOnly Cookies** untuk menyimpan JWT (Access & Refresh Token).
* **Alur Reset Password:** Fungsionalitas "Lupa Password" lengkap dengan verifikasi token via email (logika pengiriman email ada di `email_controller.go` dan `utils/password_reset.go`).
* **Sistem Peran (Role):** Dua peran utama (Admin/User) dengan proteksi *middleware*.
* **Manajemen Event (Multipart):** Admin dapat membuat event baru, termasuk meng-upload **foto event** dan mengatur **kategori** dalam satu *request* `form-data`.
* **Filter Event:** Publik dapat memfilter event berdasarkan kategori (`GET /api/events?category=...`).
* **Alur Donasi (Multipart):** User dapat mengirim donasi (`amount` + `proof_of_payment`) dalam satu *request* `form-data`.
* **Manajemen Donasi (Admin):** Admin dapat melihat semua donasi (`GET /api/donations`) dan memverifikasinya.
* **Validasi Input:** Setiap *request* divalidasi menggunakan `validator/v10`.

## 🛠️ Tumpukan Teknologi (Tech Stack)

* **Bahasa:** Go (Golang)
* **Framework:** Fiber v2
* **Database:** MySQL
* **ORM:** GORM
* **Autentikasi:** JWT (golang-jwt/v5) & Cookies
* **Validasi:** Validator V10
* **Hashing Password:** Bcrypt
* **Manajemen Environment:** Godotenv

## 🚀 Cara Menjalankan

### 1. Prasyarat

* Go (versi 1.18+ direkomendasikan).
* Server Database MySQL yang sedang berjalan.
* Alat klien API seperti Postman atau Insomnia.

### 2. Instalasi

1.  **Clone Repositori**
    ```bash
    git clone [https://github.com/naufal2376/volunteer-charity-purpleteam.git](https://github.com/naufal2376/volunteer-charity-purpleteam.git)
    cd volunteer-charity-purpleteam/backend
    ```

2.  **Buat File `.env`**
    Salin file `env.example` menjadi file baru bernama `.env`. Buka file `.env` dan isi semua nilainya sesuai dengan konfigurasi lokal Anda.

3.  **Buat Database**
    Pastikan Anda telah membuat database di MySQL dengan nama yang Anda tentukan di `.env` (contoh: `volunteer_db`).

4.  **Buat Folder `uploads`**
    Aplikasi perlu menyimpan file yang di-upload. Buat folder ini secara manual di *root* `backend/`.
    ```bash
    mkdir uploads
    ```

5.  **Instalasi Dependensi**
    ```bash
    go mod tidy
    ```

6.  **Jalankan Server**
    ```bash
    go run main.go
    ```
    Server akan berjalan di `http://localhost:8080` (atau port yang Anda tentukan di `.env`). GORM akan secara otomatis menjalankan migrasi database (`database.MigrateDB()`).

## 📋 Dokumentasi API Endpoint

Semua *endpoint* berada di bawah *prefix* `/api`.

### 1. 🏛️ Autentikasi (Publik)

* **`POST /api/auth/register`**
    Mendaftarkan user baru (otomatis sebagai *role* "user").
    * **Body:** `JSON` (`name`, `email`, `password`)

* **`POST /api/auth/login`**
    Melakukan login user. Mengatur `access_token` dan `refresh_token` sebagai HttpOnly Cookies.
    * **Body:** `JSON` (`email`, `password`)

* **`POST /api/auth/logout`**
    Menghapus *cookie* sesi.
    * **Body:** Kosong

* **`POST /api/auth/refresh`**
    Menggunakan `refresh_token` (dari *cookie*) untuk mendapatkan `access_token` baru.
    * **Body:** Kosong

* **`POST /api/auth/forgot-password`**
    Memulai alur reset password. Mengirim token ke email user (jika `email_controller` dikonfigurasi).
    * **Body:** `JSON` (`email`)

* **`GET /api/auth/reset-password/:token`**
    Memverifikasi apakah token reset valid.
    * **Params:** `token` (dari link email)

* **`POST /api/auth/reset-password/:token`**
    Menetapkan password baru.
    * **Params:** `token` (dari link email)
    * **Body:** `JSON` (`password`)

### 2. 🌍 Konten Publik

* **`GET /api/events`**
    Mendapatkan semua event. Mendukung filter: `/api/events?category=pendidikan`.

* **`GET /api/events/:id`**
    Mendapatkan detail satu event.

* **`GET /api/campaigns`**
    Mendapatkan semua campaign donasi.

* **`GET /api/campaigns/:id`**
    Mendapatkan detail satu campaign.

* **`POST /api/contact`**
    *Endpoint* untuk *form* "Hubungi Kami".

* **`GET /files/:filename`**
    *Endpoint* statis untuk mengambil gambar yang telah di-upload (misal: `/files/foto-event.jpg`).

### 3. 👤 User (Memerlukan Autentikasi Cookie)

* **`GET /api/auth/me`**
    Mendapatkan data singkat user yang sedang login.

* **`GET /api/users/me`**
    Mendapatkan data profil lengkap (termasuk riwayat event dan donasi).

* **`PATCH /api/users/me`**
    Memperbarui profil user (nama atau email).

* **`POST /api/events/:id/join`**
    Mendaftarkan user (sebagai volunteer) ke sebuah event.

* **`POST /api/campaigns/:id/donate`**
    Mengirim donasi ke sebuah campaign.
    * **Body:** `multipart/form-data` (`amount`, `proof_of_payment` [file])

* **`POST /api/upload/documentation/:regId`**
    Meng-upload file dokumentasi untuk event yang telah diikuti.
    * **Body:** `multipart/form-data` (`documentation` [file])

### 4. 👑 Admin (Memerlukan Autentikasi Cookie + Role "admin")

* **`POST /api/events`**
    Membuat event baru.
    * **Body:** `multipart/form-data` (`title`, `description`, `location`, `category`, `event_date` [teks, format ISO], `photo` [file])

* **`PUT /api/events/:id`**
    Memperbarui data **teks** event.

* **`DELETE /api/events/:id`**
    Menghapus event.

* **`PATCH /api/events/registrations/:regId/approve/:volunteerId`**
    Menyetujui pendaftaran volunteer untuk sebuah event.

* **`POST /api/campaigns`**
    Membuat campaign donasi baru.

* **`PUT /api/campaigns/:id`**
    Memperbarui campaign donasi.

* **`DELETE /api/campaigns/:id`**
    Menghapus campaign donasi.

* **`GET /api/donations`**
    Mendapatkan daftar semua donasi yang masuk dari semua user.

* **`PATCH /api/donations/:id/verify`**
    Memverifikasi atau menolak donasi.
    * **Body:** `JSON` (`status`: `"verified"` / `"rejected"`)

* **`GET /api/users`**
    Mendapatkan daftar semua user di platform.

* **`GET /api/users/:id`**
    Mendapatkan detail profil lengkap dari satu user.