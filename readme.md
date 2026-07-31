# Sahayak – Local Service Marketplace

> **Connecting Service Seekers with Trusted Local Service Providers**

Sahayak is a full-stack MERN application that enables users to discover, hire, and manage verified local service professionals such as plumbers, electricians, carpenters, painters, cleaners, gardeners, and more.

The platform is designed to simplify the process of finding reliable workers while providing service providers with a centralized platform to showcase their skills and receive work opportunities.

> **Live Demo:** https://sahayak360.vercel.com

---

# Table of Contents

* Features
* Tech Stack
* Project Structure
* Getting Started
* Installation
* Running the Project
* Environment Variables
* Application Workflow
* Current Status
* Future Roadmap
* Contributing
* License

---

# Features

## Authentication

* Secure JWT Authentication
* Access Token & Refresh Token mechanism
* HTTP-only Refresh Token Cookies
* Role-based Login
* User Registration
* Secure Logout
* Password Encryption using bcrypt

---

## User Roles

### Service Seeker

* Create service requests
* Browse available categories
* Manage profile
* View task history
* Hire workers
* Track task status

### Service Provider

* Register as a worker
* View available work
* Manage assigned tasks
* Update work progress
* Manage personal profile

---

## Task Management

* Publish Tasks
* View Task Details
* Task Status Tracking
* Assign Workers
* Progress Updates
* Task Completion Workflow

---

## Profile Management

* Personal Information
* Profile Image
* Multiple Addresses
* Default Address Support
* Account Information

---

## Security

* JWT Authentication
* Refresh Token Rotation
* HTTP-only Cookies
* Password Hashing
* Protected Routes
* Role-based Authorization

---

## User Experience

* Responsive UI
* Modern Dashboard
* Clean Interface
* Fast Navigation
* Mobile Friendly

---

# Tech Stack

## Frontend

* React.js
* Redux Toolkit
* React Router DOM
* Axios
* Tailwind CSS
* Framer Motion

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Cookie Parser
* CORS
* Multer
* Cloudinary
* Redis
* Zod

---

# Project Structure

```
Sahayak
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
    ├──src/
│       ├── controllers/
│       ├── routes/
│       ├── middleware/
│       ├── models/
│       ├── utils/
│       ├── config/
│   └── package.json
│
└── README.md
```

---

# Getting Started

## Prerequisites

Before running the project, ensure you have:

* Node.js (Latest LTS Recommended)
* npm
* MongoDB
* Redis
* Cloudinary Account

---

# Installation

Clone the repository

```bash
git clone https://github.com/Devkant01/SAHAYAK.git
```

Move into the project

```bash
cd sahayak
```

---

# Running the Frontend

Navigate to the frontend directory

```bash
cd frontend
```

Install dependencies

```bash
npm i
```

Start the development server

```bash
npm start
```

---

# Running the Backend

Navigate to the backend directory

```bash
cd backend
```

Install dependencies

```bash
npm i
```

Start the server

```bash
npm start
```

---

## Environment Variables

Create separate `.env` files inside the `frontend` and `backend` directories.

### Frontend (`frontend/.env`)

```env
VITE_BACKEND_URL=http://localhost:3000/api/v1
```

> For production, set `VITE_BACKEND_URL` to your deployed backend URL.

---

### Backend (`backend/.env`)

```env
# Server
NODE_ENV=development
PORT=3000

# Database
DATABASE_CONNECTION_STRING=<your_mongodb_connection_string>

# Redis
REDIS_CONNECTION_STRING=<your_redis_connection_string>

# JWT
ACCESS_JWT_SECRET=<your_access_jwt_secret>
REFRESH_JWT_SECRET=<your_refresh_jwt_secret>

# Cloudinary
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>

# Twilio
TWILIO_ACCOUNT_SID=<your_twilio_account_sid>
TWILIO_AUTH_TOKEN=<your_twilio_auth_token>
TWILIO_SERVICE_SID=<your_twilio_service_sid>

# Sandbox API
SANDBOX_API_KEY=<your_sandbox_api_key>
SANDBOX_API_SECRET=<your_sandbox_api_secret>
```

> Replace all placeholder values (`<...>`) with your own credentials before running the application.

---

# Application Workflow

## Service Seeker

1. Register/Login
2. Complete Profile
3. Publish a Task
4. Receive Worker Suggestions
5. Hire a Worker
6. Track Progress
7. Complete Task

---

## Service Provider

1. Register
2. Complete Profile
3. Browse Available Tasks
4. Accept Work
5. Update Progress
6. Complete Assigned Task

---

# Current Status

This project is currently in its **Early Access / Initial Development Phase**.

The core architecture has been implemented successfully. While many essential features are functional, several planned features are still under active development.

Some sections of the application may be incomplete or temporarily unavailable.

---

# Future Roadmap

Planned improvements include:

* Aadhaar Verification
* Mobile OTP Verification
* Real-time Notifications
* In-App Chat
* Payment Gateway Integration
* Worker Ratings & Reviews
* Search & Filtering
* Location-based Recommendations
* Admin Dashboard
* Booking History Improvements
* Analytics Dashboard
* Performance Optimizations
* Better Error Handling
* Progressive Web App (PWA) Support

---

# Contributing

Contributions are welcome.

If you'd like to improve Sahayak:

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/your-feature
```

3. Commit your changes

```bash
git commit -m "feat: your feature"
```

4. Push your branch

```bash
git push origin feature/your-feature
```

5. Open a Pull Request

---

# License

This project is developed for educational and portfolio purposes.

---

# Author

**Devkant Kumar**

* MERN Stack Developer
* Data Structures & Algorithms Enthusiast

---

## Live Demo

**https://sahayak360.vercel.com**

---

### Thank You

If you found this project helpful or interesting, consider giving the repository a ⭐.
