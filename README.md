# Task Management App

This is a **Task Management** application built using **Next.js**. Users can create, update, delete, and manage their tasks efficiently with authentication and database integration. The project is deployed on **Vercel**.

## 🚀 Tech Stack

- **Framework:** Next.js 14
- **Authentication:** NextAuth.js
- **Database:** PostgreSQL (via Prisma ORM)
- **UI Components:** Tailwind CSS, ShadCN, Lucide React Icons
- **State Management:** Recoil
- **Forms & Validation:** React Hook Form, Zod

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
  git clone https://github.com/vishwas-babar/task-manager
  cd task_management_next
```

### 2. Install Dependencies
```bash
  npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory and add the following variables:
```env
DATABASE_URL=<your_database_connection_string>
AUTH_SECRET=<your_random_auth_secret>
```

### 4. Run Database Migrations
```bash
  npm run prisma:migrate
  npm run prisma:generate
```

### 5. Start the Development Server
```bash
  npm run dev
```
The app will be available at **http://localhost:3000**

## 📜 Scripts
- `npm run dev` - Start development server
- `npm run build` - Build the project
- `npm run start` - Start the production server
- `npm run prisma:migrate` - Apply database migrations
- `npm run prisma:generate` - Generate Prisma client

## 📜 License
This project is **open-source** and available for use.

