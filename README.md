# Task Management API

A simple REST API to manage daily activities in the form of tasks with support for user management, authentication, and a one-to-many database relationship between users and tasks.

This project was created as part of the Junior Backend Developer Technical Test at ICN.

The API allows users to:

- register and log in
- create and manage tasks
- view tasks belonging to a specific user
- perform CRUD operations on tasks

---

# Tech Stack

This backend is built using the following technologies:

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

Copy the `.env.example` file

```bash
cp .env.example .env
```

Example `.env`

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

The server will run at

```
http://localhost:3000
```

---

# Database Setup

This project uses PostgreSQL with Prisma ORM.

Database relationship:

```
User (1) ---- (N) Task
```

This means one user can have many tasks.

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

Authentication uses JWT stored in an HTTP-only cookie.

Authentication flow:

```
User login
      │
      ▼
Server generates JWT
      │
      ▼
JWT stored in cookie
      │
      ▼
Protected routes verify token
```

Endpoints that require authentication:

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

This project uses the following environment variables:

| Variable     | Description                    |
| ------------ | ------------------------------ |
| DATABASE_URL | PostgreSQL database connection |
| PORT         | Server port                    |
| JWT_SECRET   | Secret key for JWT             |
| CLIENT_URL   | Allowed CORS origins           |

The `.env.example` file is provided in the repository.

---

# Postman Collection

To make API testing easier, a Postman collection is available in the folder:

```
postman/
```

Import the collection into Postman to quickly test all endpoints.

# Notes

- This repository is public according to the submission requirement.
- The `.env` file is not committed to the repository.
- The `node_modules` folder is also not included in the repository.
- All environment configuration is available in the `.env.example` file.
