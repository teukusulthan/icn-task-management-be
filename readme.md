# Task Management API

REST API sederhana untuk mengelola aktivitas harian dalam bentuk tasks dengan dukungan manajemen user, autentikasi, dan relasi database one-to-many antara users dan tasks.

Project ini dibuat sebagai bagian dari Junior Backend Developer Technical Test di ICN.

API memungkinkan user untuk:

- melakukan registrasi dan login
- membuat dan mengelola tasks
- melihat tasks milik user tertentu
- melakukan operasi CRUD pada tasks

---

# Tech Stack

Backend ini dibangun menggunakan teknologi berikut:

- **Node.js**
- **Express.js**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL (Neon Database)**
- **JWT Authentication**
- **bcrypt** (password hashing)
- **Zod** (request validation)

---

# Installation & Setup

## 1. Clone Repository

```bash
git clone <repository-url>
cd <repository-name>
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Setup Environment Variables

Copy file `.env.example`

```bash
cp .env.example .env
```

Contoh `.env`

```env
DATABASE_URL=your_database_url
PORT=3000
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173,http://localhost:3000
```

---

## 4. Generate Prisma Client

```bash
npx prisma generate
```

---

## 5. Run Server

Development mode

```bash
npm run dev
```

Production

```bash
npm run build
npm start
```

Server akan berjalan di

```
http://localhost:3000
```

---

# Database Setup

Project ini menggunakan PostgreSQL dengan Prisma ORM.

Relasi database:

```
User (1) ---- (N) Task
```

Artinya satu user dapat memiliki banyak task.

### User Table

| Field     | Type     |
| --------- | -------- |
| id        | string   |
| email     | string   |
| password  | string   |
| createdAt | datetime |

### Task Table

| Field       | Type     |
| ----------- | -------- |
| id          | string   |
| title       | string   |
| description | string   |
| completed   | boolean  |
| userId      | string   |
| createdAt   | datetime |

---

# Authentication

Autentikasi menggunakan JWT yang disimpan dalam HTTP-only cookie.

Flow autentikasi:

```
User login
      │
      ▼
Server membuat JWT
      │
      ▼
JWT disimpan di cookie
      │
      ▼
Protected routes memverifikasi token
```

Endpoint yang membutuhkan autentikasi:

```
POST   /tasks
GET    /tasks/my-tasks
PUT    /tasks/:id
DELETE /tasks/:id
```

---

# API Endpoints

## User Endpoints

| Method | Endpoint           | Description          |
| ------ | ------------------ | -------------------- |
| POST   | `/users`           | Register user        |
| GET    | `/users`           | Get all users        |
| GET    | `/users/:id`       | Get user by ID       |
| PUT    | `/users/:id`       | Update user          |
| DELETE | `/users/:id`       | Delete user          |
| POST   | `/users/login`     | User login           |
| GET    | `/users/:id/tasks` | Get tasks by user ID |

---

## Task Endpoints

| Method | Endpoint          | Description              | Auth Required |
| ------ | ----------------- | ------------------------ | ------------- |
| POST   | `/tasks`          | Create task              | Yes           |
| GET    | `/tasks`          | List all tasks           | No            |
| GET    | `/tasks/my-tasks` | Get current user's tasks | Yes           |
| GET    | `/tasks/:id`      | Get task by ID           | No            |
| PUT    | `/tasks/:id`      | Update task              | Yes           |
| DELETE | `/tasks/:id`      | Delete task              | Yes           |

---

# Example Requests & Responses

## Register User

```
POST /users
```

Request

```json
{
  "email": "user@mail.com",
  "password": "123456"
}
```

Response

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "...",
    "email": "user@mail.com",
    "createdAt": "..."
  }
}
```

---

## Login

```
POST /users/login
```

Request

```json
{
  "email": "user@mail.com",
  "password": "123456"
}
```

Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "userId": "..."
  }
}
```

---

## Create Task

```
POST /tasks
```

Request

```json
{
  "title": "Finish technical test",
  "description": "Complete backend API",
  "completed": false
}
```

Response

```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": "...",
    "title": "Finish technical test",
    "description": "Complete backend API",
    "completed": false
  }
}
```

---

# Environment Variables

Project ini menggunakan environment variables berikut:

| Variable     | Description                    |
| ------------ | ------------------------------ |
| DATABASE_URL | PostgreSQL database connection |
| PORT         | Port server                    |
| JWT_SECRET   | Secret key untuk JWT           |
| CLIENT_URL   | Allowed CORS origins           |

File `.env.example` sudah disediakan di repository.

---

# Postman Collection

Untuk mempermudah testing API, Postman collection tersedia di folder:

```
postman/
```

Import collection tersebut ke Postman untuk mencoba semua endpoint dengan cepat.

# Notes

- Repository ini bersifat public sesuai requirement submission.
- File `.env` tidak di commit ke repository.
- Folder `node_modules` juga tidak disertakan dalam repository.
- Semua konfigurasi environment tersedia pada file `.env.example`.
