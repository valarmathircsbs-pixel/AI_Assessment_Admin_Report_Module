# 🔐 Admin Report Generation Integration Module
AI Assessment Platform – Backend Module

A secure backend module that enables administrators to generate and download structured PDF reports for AI-based candidate assessments.

## 👩‍💻 Developed By
Valarmathi R
🎯 Role
Backend Developer responsible for designing and implementing the Admin Report Generation & Integration Module.

## 📌 Module Overview

The Admin Report Generation Integration Module is a secure backend service that generates downloadable PDF assessment reports for candidates.

Only authenticated admin users are allowed to access, manage, and download reports.

This module is built for integration into the complete AI Assessment Platform.

🔗 Integration Responsibilities

This module integrates multiple assessment components into a unified admin report:

📥 Fetches candidate assessment data from the database

📊 Integrates evaluation scores from assessment modules

🧠 Incorporates performance analytics

🛡 Includes monitoring logs and risk indicators

📄 Generates a consolidated admin PDF report

🏗 Project Structure(Updated)
```
AI_ASSESSMENT_BACKEND/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── adminAuthController.js
│   └── adminReportController.js
│
├── middleware/
│   └── adminMiddleware.js
│
├── models/
│   └── Candidate.js
│
├── routes/
│   ├── adminAuthRoutes.js
│   └── adminReportRoutes.js
│
├── utils/
│   └── reportStructure.js
│
├── public/
│   ├── dashboard.html
│   └── login.html
│
├── seed.js
├── server.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
└── README.md
```

## 🚀 Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- PDFKit
- dotenv

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

git clone [https://github.com/valarmathircsbs-pixel/AI_Assessment_Admin_Report_Module.git](https://github.com/valarmathircsbs-pixel/AI_Assessment_Admin_Report_Module.git)
cd AI_Assessment_Admin_Report_Module

### 2️⃣ Install Dependencies

npm install

### 3️⃣ Create Environment Variables

Create a `.env` file in the root directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

⚠️ Replace these values in your local `.env` file only.  
Do NOT commit real credentials to GitHub.

### 4️⃣ Start the Server

node server.js

Server will run at:

[http://localhost:5000](http://localhost:5000)

## 🌐 Frontend Pages

Admin Login Page:

[http://localhost:5000/login.html](http://localhost:5000/login.html)

Admin Dashboard:

[http://localhost:5000/dashboard.html](http://localhost:5000/dashboard.html)

## 🔐 Authentication Flow

1. Admin logs in
2. JWT token is generated
3. Token must be included in request header:

Authorization: Bearer <token>

4. Only authenticated admin can access protected routes.

## 📡 API Endpoints

### Admin Authentication

Login:

POST /admin/auth/login

### Report Management (Protected)

Create Report:

POST /admin/report

Get All Reports:

GET /admin/report

Get Single Report:

GET /admin/report/:candidateId

Update Report:

PUT /admin/report/:candidateId

Delete Report:

DELETE /admin/report/:candidateId

Download PDF Report:

GET /admin/report/:candidateId/download


## 📊 Report Includes

Each generated PDF contains:

- Candidate Details
- Domain Information
- Question & Answer List
- Score Breakdown
- Performance Summary
- Monitoring Logs


## 🛡 Security Features

- JWT-based authentication
- Admin-only access control
- Middleware token validation
- Protected download route
- Unique candidateId validation
- Environment variable protection


## 🧪 Test Data

You can use:

node seed.js

To insert sample candidates for testing.


## 🔗 Integration Notes

This module is designed to be integrated with:

- Candidate Assessment Module
- AI Evaluation Module
- Frontend Dashboard Module

All APIs follow REST standards and return JSON responses suitable for integration.


## 🔄 System Flow

1. Admin logs in
2. Token is generated
3. Admin accesses dashboard
4. Candidate data fetched from MongoDB
5. PDF generated dynamically
6. Secure download provided

✨ Key Features

Modular MVC architecture

Secure admin authentication using JWT

Dynamic PDF report generation

Centralized candidate performance reporting

RESTful API design for system integration

Scalable backend structure
   


## 📌 Status

✔ Module Completed  
✔ Authentication Implemented  
✔ PDF Generation Working  
✔ Multi-Domain Support Added  
✔ Secure Routes Implemented  
✔ Ready for Integration  

## 👤 Default Admin (For Testing)

Email: admin@test.com  
Password: admin123


## 🏁 Conclusion

This module delivers a secure and scalable backend solution for generating consolidated admin assessment reports.

It integrates candidate data, evaluation metrics, and monitoring insights into a unified reporting system, enabling efficient administrative decision-making.

The system is production-ready and designed for seamless integration within large-scale assessment platforms.

