# Template Nextjs dengan Sistem Autentikasi

Proyek ini adalah template projek Nextjs dengan sistem autentikasi yang mencakup kredensial (email/password) dan Google OAuth menggunakan NextAuth.js dan Prisma ORM dengan database PostgreSQL.

## Fitur

- Autentikasi dengan email/password
- Autentikasi dengan Google OAuth
- Validasi akun pengguna
- Pengecekan keberadaan akun
- Perlindungan rute tertentu

## Teknologi yang Digunakan

- Next.js 15
- NextAuth.js
- Prisma ORM
- PostgreSQL
- Shadcn UI
- Zod untuk validasi
- React Hook Form
- TypeScript

## Cara Menjalankan

1. Clone repositori ini
2. Install dependensi dengan `bun install`
3. Konfigurasi database PostgreSQL
4. Perbarui file `.env` dengan kredensial database dan OAuth
5. Jalankan migrasi database dengan `bunx prisma migrate dev`
6. Jalankan aplikasi dengan `bun dev`

## Konfigurasi OAuth

Untuk menggunakan Google OAuth, Anda perlu:

1. Membuat project di [Google Cloud Console](https://console.cloud.google.com/)
2. Mengaktifkan Google OAuth API
3. Membuat kredensial OAuth
4. Menambahkan URI redirect yang valid (http://localhost:3000/api/auth/callback/google untuk development)
5. Menyalin Client ID dan Client Secret ke file `.env`

## Struktur Proyek

- `/app` - Komponen halaman Next.js
- `/app/api` - API routes
- `/app/auth` - Halaman autentikasi (login/register)
- `/src/components` - Komponen React
- `/src/lib` - Utilitas dan fungsi helper
- `/prisma` - Skema database Prisma

## Fitur Autentikasi

### Login

- Validasi akun pengguna (baik kredensial maupun Google OAuth)
- Jika akun tidak terdaftar dalam database, blokir proses login
- Jika akun terdaftar, izinkan akses login

### Register

- Pengecekan keberadaan akun (kredensial/Google OAuth)
- Jika akun sudah terdaftar, tolak pendaftaran baru
- Jika akun belum terdaftar, izinkan proses registrasi
