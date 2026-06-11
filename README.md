# 🏌️ GolfScore Pro

A full-stack web application for managing golf scores, subscriptions, and daily draw participation.

---

## 📌 Project Overview

GolfScore Pro is a web-based platform that allows users to register, log in, manage golf scores, subscribe to plans, and participate in a draw system.

The project was built to demonstrate full-stack web development concepts including authentication, database management, REST APIs, deployment, and user dashboard functionality.

---



## ✨ Key Features

### User Authentication
- User Registration
- User Login
- JWT-based Authentication
- Protected Routes

### Score Management
- Add Scores
- View Scores
- Delete Scores
- Score Validation (1-45)

### Subscription System
- Weekly Plan ($10)
- Monthly Plan ($35)
- Yearly Plan ($420)

Current implementation simulates payment processing.

### Draw System
- Random winning numbers generation
- Countdown timer
- Manual draw trigger
- Automatic draw capability
- Winning number display

---

## 🛠 Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas



---

## 📂 Project Structure

```text
GolfScorePro/
│
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Draw.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── user.js
│   │   ├── draw.js
│   │   └── admin.js
│   │
│   └── server.js
│
├── frontend/
│   ├── index.html
│   ├── register.html
│   ├── dashboard.html
│   ├── payment.html
│   ├── app.js
│   ├── style.css
│   └── download.jpg
│
└── README.md
```

---

## 🏗 System Architecture

```text
Frontend
(HTML/CSS/JS)
      │
      ▼
REST API Requests
      │
      ▼
Node.js + Express.js
      │
      ▼
MongoDB Atlas
```

The frontend communicates with the backend through REST API calls.

The backend handles:
- Authentication
- Score management
- Draw logic
- Subscription handling

MongoDB stores user information and draw records.

---

## 🗄 Database Design

### User Collection

```json
{
  "email": "user@example.com",
  "password": "hashed_password",
  "subscribed": true,
  "scores": [
    {
      "score": 12,
      "date": "2025-06-10"
    }
  ]
}
```

### Draw Collection

```json
{
  "numbers": [5, 12, 20, 33, 41],
  "winners": [
    {
      "email": "user@example.com",
      "matches": 3
    }
  ],
  "date": "2025-06-10"
}
```

---

## 🔗 API Endpoints

### Authentication

#### Register User

```http
POST /api/auth/register
```

#### Login User

```http
POST /api/auth/login
```

Returns JWT token.

---

### User Routes

#### Add Score

```http
POST /api/user/score
```

#### Get Scores

```http
GET /api/user/scores
```

#### Delete Score

```http
POST /api/user/delete-score
```

#### Subscribe

```http
POST /api/user/subscribe
```

---

### Draw Routes

#### Run Draw

```http
GET /api/draw/run
```

#### Draw History

```http
GET /api/draw/history
```

---

## 🔐 Authentication Flow

1. User enters email and password.
2. Backend validates credentials.
3. JWT token is generated.
4. Token is stored in browser localStorage.
5. Protected requests include the token in the Authorization header.

---

## 🎯 Draw Logic

1. Users add golf scores.
2. Draw system generates random numbers.
3. User scores are compared against draw numbers.
4. Matching scores determine winners.
5. Winning numbers are displayed on the dashboard.
6. Draw results are stored in MongoDB.

---

## ⚡ Challenges Faced During Development

### Deployment

**Problem:**
Local API URLs failed after deployment.

**Solution:**
Updated frontend API configuration to use Render backend URL.

---

### Database Connectivity

**Problem:**
Render could not access local MongoDB.

**Solution:**
Migrated database to MongoDB Atlas and configured environment variables.

---

### CORS Errors

**Problem:**
Frontend requests were blocked.

**Solution:**
Configured Express CORS middleware.

---

## 📈 Future Improvements

- Real payment integration (Stripe/Razorpay)
- Role-based admin dashboard
- Email notifications
- Analytics dashboard
- Mobile application
- React frontend migration

---

## 🎓 Viva Preparation Topics

This project covers the following concepts:

- REST APIs
- CRUD Operations
- JWT Authentication
- MongoDB Schema Design
- Express Routing
- Middleware
- Deployment
- Environment Variables
- CORS
- Full-Stack Development
- Client-Server Architecture

---

## 👨‍💻 Author

Suryakiran Kunchala

GitHub:
https://github.com/suryakirankunchala06
