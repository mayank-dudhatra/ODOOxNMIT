# SynergySphere  

## Video Link: [View](https://drive.google.com/file/d/1NryU90Q-F_4E4DSFJP7Mxm8SFb-SNCBn/view?usp=drivesdk)

A full-stack **Role-Based Project & Collaboration Platform** built with **React, Node.js, Express, and MongoDB**.  
Users can **sign up / log in**, create & manage projects, assign tasks, collaborate with teams, chat in real-time, and access dashboards based on their role (**User / Admin**).  

---

## 🚀 Features  

- 🔑 **Authentication & Authorization** (JWT based)  
- 👥 **Role-based Access**  
  - **User Dashboard** for regular users  
  - **Admin Dashboard** with elevated privileges  
- 📂 **Project Management** – Create & manage projects  
- ✅ **Task Management** – Assign tasks with status & due dates  
- 💬 **Project Chat System**  
  - Fetch messages via `GET /api/messages/:projectId`  
  - Send messages via `POST /api/messages`  
  - Reply functionality with threaded UI  
  - Auto-scroll to latest message  
  - Improved chat UI for readability  
- 🔔 **Notifications** for important events  

---

## 🛠️ Tech Stack  

**Frontend**  
- React + Vite  
- React Router  
- ShadCN/UI + TailwindCSS  
- React Query  

**Backend**  
- Node.js + Express  
- MongoDB + Mongoose  
- JWT Authentication  
- bcrypt for password hashing  

---

## ⚙️ Installation  

### 1️⃣ Clone the repository  
```bash
git clone [https://github.com/your-username/synergysphere.git](https://github.com/your-username/synergysphere.git)
cd synergysphere

# SynergySphere

A collaborative project management and communication platform with role-based access, project chat, and task management.

---

## 🚀 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside **backend/** with:

```env
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
```

Run backend:

```bash
npm start
```

Server will start at: [http://localhost:5000](http://localhost:5000)

---

## 💻 Frontend Setup

```bash
cd frontend
npm install
```

Update fetch API URLs in your frontend to:

```bash
http://localhost:5000/api/...
```

Run frontend:

```bash
npm run dev
```

Frontend will start at: [http://localhost:3000](http://localhost:3000)

---

## 🔑 Authentication Flow

* **Sign Up** → User selects role (**user / admin**)
* **Login** → JWT token + user info saved in `localStorage`
* **Protected Routes** → Only accessible if logged in

### Role-Based Navigation

* `/dashboard` → User Dashboard
* `/admin/dashboard` → Admin Dashboard

---

## 📂 Project Structure

```css
synergysphere/
│
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   ├── messageController.js
│   │   └── ...
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   ├── Message.js
│   │   └── ...
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── messageRoutes.js
│   │   └── ...
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── contexts/auth-context.tsx
│   │   ├── pages/
│   │   │   ├── AuthPage.tsx
│   │   │   ├── UserDashboard.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── ProjectChat.tsx
│   │   │   └── NotFound.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
│
└── README.md
```

---

## 🧪 API Endpoints

### Auth Routes

* `POST /api/auth/register` → Register user/admin
* `POST /api/auth/login` → Login user/admin

### Project Routes

* `POST /api/projects` → Create a project (**admin only**)
* `GET /api/projects` → Get all projects (**authenticated users**)

### Message Routes

* `GET /api/messages/:projectId` → Fetch all messages for a project
* `POST /api/messages` → Send new message (with optional `replyId`)

---

fix: handle login redirect issue
chore: update README file
