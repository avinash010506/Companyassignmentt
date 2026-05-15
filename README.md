# Team Task Manager

**🔴 Live Application:** [https://companyassignmentt-production.up.railway.app/](https://companyassignmentt-production.up.railway.app/)

A full-stack web application for teams to create projects, assign tasks, and track progress, featuring robust role-based access control (Admin/Member).

## 🚀 Key Features

*   **Authentication**: Secure Signup and Login using Firebase Authentication.
*   **Project & Team Management**: 
    *   Create projects and become the project owner.
    *   Add team members to projects and assign roles (Admin/Member).
    *   Admins have the ability to remove members, modify roles, and delete the project.
*   **Task Creation, Assignment & Status Tracking**:
    *   Create tasks with titles, descriptions, priorities, and due dates (Admin only).
    *   Assign tasks to specific team members.
    *   Track and update task status (To Do, In Progress, Done). Task status can only be updated by Admins or the assigned Member.
*   **Role-Based Access Control**:
    *   **Admin**: Full control over the project, including managing tasks, members, and project deletion.
    *   **Member**: Read access to the project tasks and ability to update the status of tasks assigned specifically to them.
*   **Interactive Dashboard**: View a personalized overview of assigned tasks, their current statuses, and track overdue tasks.

## 🛠️ Technology Stack

*   **Frontend**: React, Vite, TanStack Router, TypeScript
*   **Styling**: Tailwind CSS, shadcn/ui components
*   **Backend / Database**: Firebase (Firestore - NoSQL)
*   **Authentication**: Firebase Auth
*   **Validation**: Zod for structured data and schema validation

## 📦 Local Development

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory and add your Firebase configuration variables.

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The application will be running at `http://localhost:8080/`.

## 🌐 Deployment

This application is successfully deployed on Railway.

**Live URL:** [https://companyassignmentt-production.up.railway.app/](https://companyassignmentt-production.up.railway.app/)

To deploy your own instance on Railway:
1. Connect your GitHub repository to Railway.
2. Add the required environment variables (Firebase config) to the Railway project settings.
3. Railway will automatically detect the Vite build process (`npm run build`) and deploy the application.

## 🗄️ Database Structure (Firestore)

*   **`profiles`**: Stores user account details (linked to Firebase Auth UID).
*   **`projects`**: Stores project metadata (name, description, owner_id).
*   **`project_members`**: A mapping collection defining which users belong to which project, along with their specific role (`admin` or `member`).
*   **`tasks`**: Stores individual tasks, referencing the `project_id` and the `assignee_id`.
