# Team Task Manager (Full-Stack)

A full-stack web application where users can create projects, assign tasks, and track progress with role-based access (Admin/Member).

## Key Features
- **Authentication:** Signup and Login powered by Supabase Auth.
- **Project & Team Management:** Create projects and add members as Admins or standard Members.
- **Task Management:** Create tasks, assign them to team members, set due dates, priorities, and track status.
- **Dashboard:** At-a-glance overview of tasks, their statuses, and overdue items.
- **Role-Based Access Control:** Only project Admins can edit/delete projects and team members. All team members can manage their own tasks.

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, shadcn/ui (Radix UI), TanStack Router & Query.
- **Backend & Database:** Supabase (PostgreSQL, Row Level Security, Auth).
- **Deployment:** Railway.

---

## Local Setup

### Prerequisites
- Node.js (v18+)
- Supabase Project (with the provided SQL migrations applied)

### Environment Variables
Create a `.env` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run Locally
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```

---

## Deployment (Railway)

This application is configured for deployment on [Railway](https://railway.app/).

1. Create a new project on Railway.
2. Select **Deploy from GitHub repo** and connect this repository.
3. Once connected, go to your Railway Project **Variables** and add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Railway will automatically detect the Node.js environment, install dependencies, build the project (`npm run build`), and start it (`npm run start`).

---

## Submission Details

- **Live URL:** `[Add your Railway URL here]`
- **GitHub Repo:** `[Add your GitHub repo link here]`
- **Demo Video:** `[Add the link to your 2-5 min demo video here]`
