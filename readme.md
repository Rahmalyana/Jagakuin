JAGAKUIN adalah aplikasi inovatif berbasis mobile yang dirancang untuk mempermudah masyarakat menemukan atau menawarkan jasa penjagaan anak, lansia, serta properti (rumah, toko, kos) dalam periode singkat, yaitu maksimal tiga hari untuk setiap sesi. Berbeda dengan layanan serupa yang berfokus pada pembayaran uang semata.
JAGAKUIN mengutamakan konsep barter jasa, di mana pengguna dapat saling bertukar layanan penjagaan sesuai kesepakatan. Namun, untuk fleksibilitas, aplikasi ini juga memungkinkan kompensasi dalam bentuk uang atau barang jika kedua belah pihak menyetujuinya. Konsep ini menggabungkan prinsip kolaborasi komunitas dan kemudahan transaksi, sehingga lebih inklusif dan ramah bagi pengguna dengan keterbatasan finansial.


# Tech Stack

## Backend
- Laravel
- PHP 8+
- MySQL

## Frontend
- React (Vite)
- Axios


---

# Requirements

Pastikan sudah install:

- PHP 8+
- Composer
- Node.js (LTS)
- MySQL / Laragon


# Cara Install (Clone Project)

## 1. Clone repository

git clone https://github.com/Rahmalyana/Jagakuin.git
cd Jagakuin

## 2. Setup Backend
cd backend

composer install
cp .env.example .env

edit .env database:

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=db_jagakuin
    DB_USERNAME=root
    DB_PASSWORD=

generate key & migrate:

    php artisan key:generate
    php artisan migrate
    php artisan serve

## 3. Setup Frontend (React)
cd frontend
npm install
npm run dev

akses localhost
