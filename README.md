👟 SepatuKu — Toko Sepatu Online

> Aplikasi e-commerce toko sepatu berbasis web yang dibangun dengan Node.js, Express.js, MySQL, dan Vanilla JavaScript. Dilengkapi dengan fitur autentikasi JWT, manajemen produk, keranjang belanja, dan sistem pesanan.

🌐 Live Demo: [http://103.197.190.160/login.html](http://103.197.190.160/login.html)

Untuk melihat halaman Admin 
Email : admin@toko.com
Password : admin123

---

📋 Daftar Isi

- [Fitur](#-fitur)
- [Tech Stack](#-tech-stack)
- [Struktur Project](#-struktur-project)
- [Cara Menjalankan](#-cara-menjalankan)
- [Menjalankan dengan Docker](#-menjalankan-dengan-docker)
- [API Endpoint](#-api-endpoint)
- [Author](#-author)

---

✨ Fitur

👤 User
- Register & Login dengan JWT Authentication
- Lihat semua produk sepatu
- Filter produk berdasarkan kategori
- Search produk berdasarkan nama
- Lihat detail produk
- Tambah produk ke keranjang belanja
- Update & hapus item di keranjang
- Checkout pesanan
- Lihat riwayat pesanan & detail pesanan

👑 Admin
- Login khusus admin
- Dashboard kelola produk (Tambah, Edit, Hapus)
- Upload gambar produk
- Kelola semua pesanan
- Update status pesanan (Pending → Paid → Shipped → Done)
- Hapus pesanan

---

🛠 Tech Stack

Frontend
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

Backend
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

Database
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)

DevOps
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![VPS](https://img.shields.io/badge/VPS-Biznet-blue?style=for-the-badge)

---

📁 Struktur Project

```
toko-sepatu/
├── 📁 backend/
│   ├── 📁 config/
│   │   └── db.js               # Konfigurasi koneksi MySQL
│   ├── 📁 controllers/
│   │   ├── authController.js   # Logic register & login
│   │   ├── produkController.js # Logic CRUD produk
│   │   ├── cartController.js   # Logic keranjang belanja
│   │   └── orderController.js  # Logic pesanan
│   ├── 📁 middleware/
│   │   ├── authMiddleware.js   # Verifikasi JWT token
│   │   └── uploadMiddleware.js # Upload gambar (Multer)
│   ├── 📁 routes/
│   │   ├── authRoutes.js       # Route autentikasi
│   │   ├── produkRoutes.js     # Route produk
│   │   ├── cartRoutes.js       # Route keranjang
│   │   └── orderRoutes.js      # Route pesanan
│   ├── 📁 uploads/             # Folder penyimpanan gambar
│   ├── index.js                # Entry point server
│   ├── package.json
│   └── Dockerfile
│
├── 📁 frontend/
│   ├── 📁 css/
│   │   └── style.css           # Global stylesheet
│   ├── 📁 img/                 # Gambar statis
│   ├── index.html              # Halaman produk
│   ├── login.html              # Halaman login
│   ├── register.html           # Halaman register
│   ├── detail.html             # Halaman detail produk
│   ├── cart.html               # Halaman keranjang
│   ├── orders.html             # Halaman pesanan user
│   ├── admin.html              # Dashboard admin produk
│   └── admin-orders.html       # Dashboard admin pesanan
│
└── docker-compose.yml
```

---

🚀 Cara Menjalankan

Prerequisites
Pastikan sudah menginstall:
- [Node.js](https://nodejs.org/) v18+
- [MySQL](https://www.mysql.com/) v8+
- [Git](https://git-scm.com/)

1. Clone Repository
```bash
git clone https://github.com/ilham-storage/toko-sepatu.git
cd toko-sepatu
```

2. Setup Backend
```bash
cd backend
npm install
```

3. Setup Database
3. Setup Database
Import file SQL yang sudah tersedia:

1. Buka phpMyAdmin atau MySQL
2. Buat database baru bernama `toko_sepatu`
3. Klik Import → pilih file `database/toko_sepatu.sql`
4. Klik Go
```

### 4. Konfigurasi Environment
Sesuaikan konfigurasi database di `backend/config/db.js`:
```js
const db = mysql.createPool({
    host:     'localhost',
    user:     'root',
    password: '',          // sesuaikan password MySQL kamu
    database: 'toko_sepatu'
});
```

### 5. Jalankan Server
```bash
cd backend
node index.js
# Server berjalan di http://localhost:5000
```

### 6. Buka Frontend
Buka file `frontend/index.html` di browser atau gunakan Live Server.

---

## 🐳 Menjalankan dengan Docker

### Prerequisites
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Langkah-langkah

```bash
# 1. Clone repository
git clone https://github.com/ilham-storage/toko-sepatu.git
cd toko-sepatu

# 2. Jalankan dengan Docker Compose
docker-compose up -d

# 3. Cek container berjalan
docker-compose ps

# 4. Akses aplikasi
# Frontend : http://localhost:80
# Backend  : http://localhost:5000
```

### Menghentikan Container
```bash
docker-compose down
```

---

## 📡 API Endpoint

### 🔐 Auth
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| POST | `/auth/register` | Daftar akun baru | ❌ |
| POST | `/auth/login` | Login & dapat token | ❌ |

### 👟 Produk
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | `/produk` | Ambil semua produk | ❌ |
| GET | `/produk?kategori=sneakers` | Filter by kategori | ❌ |
| GET | `/produk/:id` | Detail produk | ❌ |
| POST | `/produk` | Tambah produk | 👑 Admin |
| PUT | `/produk/:id` | Edit produk | 👑 Admin |
| DELETE | `/produk/:id` | Hapus produk | 👑 Admin |

### 🛒 Cart
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | `/cart` | Lihat isi cart | ✅ |
| POST | `/cart` | Tambah ke cart | ✅ |
| PUT | `/cart/:id` | Update jumlah | ✅ |
| DELETE | `/cart/:id` | Hapus item | ✅ |
| DELETE | `/cart/kosong` | Kosongkan cart | ✅ |

### 📦 Order
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| POST | `/order/checkout` | Checkout | ✅ |
| GET | `/order` | Lihat pesanan saya | ✅ |
| GET | `/order/:id` | Detail pesanan | ✅ |
| GET | `/order/admin/all` | Semua pesanan | 👑 Admin |
| PATCH | `/order/:id/status` | Update status | 👑 Admin |
| DELETE | `/order/:id` | Hapus pesanan | 👑 Admin |

---

## 🗄️ Database Schema

```
users ──────────────── cart ──────── produk
  │         user_id →    │              │
  │                      │ ← produk_id  │
  │                                     │
  │──────────────── orders              │
        user_id →     │                 │
                      │ ← order_id      │
                 order_items ─── produk_id
```

---

👤 Author

**Ilham Santoso**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ilham-storage)

---

📄 License

Project ini dibuat untuk keperluan belajar/portofolio dll.

---

> Dibuat dengan ❤️ oleh **Ilham Santoso**
