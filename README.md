# LesSkynn Monorepo

LesSkynn is an AI-powered skincare platform that provides personalized skincare routines and enables users to book consultations with skincare influencers. This repository follows a **monorepo structure** containing both frontend and backend codebases.

---

## 📁 Repository Structure

```text
LesSkynn-Monorepo/
├── frontend/        # React + Vite + Tailwind CSS
├── backend/         # FastAPI backend
├── vercel.json      # Deployment configuration
└── .gitignore
⚙️ Prerequisites
Make sure you have the following installed:

Node.js (v18+ recommended)

npm

Python (3.9+ recommended)

Git

🚀 Frontend Setup
bash
Copy code
cd frontend
npm install
npm run dev
Frontend runs at:
http://localhost:5173

🔧 Backend Setup (FastAPI)
bash
Copy code
cd backend
python -m venv venv
venv\Scripts\activate.bat
pip install -r requirements.txt
uvicorn main:app --reload

Backend runs at:
http://localhost:8000
Environment Variables
Backend environment variables are configured using a .env file.

Example file:

text

backend/.env.example
Create your own .env file based on the example and update values as required.

🌐 Deployment
Deployed using Vercel

Automatic deployments on every push to the main branch

🛠 Tech Stack
Frontend
React

TypeScript

Tailwind CSS

Vite

Backend
FastAPI

Python

Firebase

External AI & pricing APIs
