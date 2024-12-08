# Notes App

A full-stack application for creating, reading, updating, and deleting (CRUD) personal notes. The project is organized into two directories:

- **backend/**: A Nest.js server connecting to MongoDB for storing notes.
- **frontend/**: A Next.js application for managing notes from the browser.

## Features

- **Backend (Nest.js)**:

  - Endpoints for creating, retrieving, updating, and deleting notes.
  - MongoDB integration with Mongoose.
  - Basic input validation.

- **Frontend (Next.js)**:
  - Displays the list of notes.
  - Form to add/edit notes.
  - Delete notes via a button.
  - Styled with Tailwind CSS.

## Prerequisites

- **Node.js** (LTS recommended)
- **npm** or **yarn**
- **MongoDB** (local or remote)

Make sure you have a running instance of MongoDB. Update the connection URL in the backend's `.env` or module configuration.

## Getting Started

### 1. Clone the Repository

- git clone "git@github.com:DamirFM/Blog-post.git"
- cd "blog-post" folder

### 2. Run the backend

cd backend
npm install
npm run start:dev

This will start the Nest.js backend server on http://localhost:3000

### 3. Run the frontend

cd frontend
npm install
npm run dev

Next.js runs on http://localhost:3001

## Screenshots

### Home Page

![Home Page](/screenshots/home.png)

### Edit Page

![Home Page](/screenshots/edit.png)

### Insomnia GET

![Home Page](/screenshots/get.png)

### Insomnia POST

![Home Page](/screenshots/post.png)

### Insomnia PUT

![Home Page](/screenshots/put.png)
