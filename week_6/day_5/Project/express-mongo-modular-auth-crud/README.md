# Client Project Tracker — Auth + CRUD

This project is a **Client/Project Management System** featuring **authentication, role-based access**, and **CRUD operations**. Users can manage their own projects; admins can manage all users and projects.

---

## 🚀 Features
- User registration & login (JWT + bcrypt)
- Role‑based authorization (User/Admin)
- Secure password hashing
- CRUD operations for client projects
- MongoDB database (Mongoose)
- MVC structured clean code architecture
- REST API backend ready to connect with frontend (React)

---

## 📂 Folder Structure
```
src/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middlewares/
 └── main.js
.env
package.json
```
---

## ⚙️ Installation

### 1️⃣ Clone Project
```bash
git clone <repository-url>
cd project-folder
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create `.env`:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Run App
```bash
npm run dev
```

---

## 📍 API Routes Overview

### 🔐 Auth
| Method | Endpoint | Description |
|--------|---------|------------|
POST | `/auth/register` | Create new account |
POST | `/auth/login` | Login user |
GET | `/auth/profile` | Get authenticated user info |

### 📦 Projects
| Method | Endpoint | Description |
|--------|---------|------------|
GET | `/projects` | Fetch projects |
POST | `/projects` | Add project |
PUT | `/projects/:id` | Update project |
DELETE | `/projects/:id` | Delete project |

---

## 📌 Tech Stack

| Backend | DB | Security | Tools |
|--------|---|----------|------|
Node.js | MongoDB | JWT, bcrypt | Nodemon, Mongoose |

---

## 📎 Future Improvements
- React frontend UI
- Project timeline + status board
- File uploads to Cloudinary
- Notifications + activity logs

---

## 📝 License
MIT License

---

### 👩‍💻 Author
Built for learning full‑stack development.
