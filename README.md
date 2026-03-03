# 🔐 Admin Report Generation System
AI Assessment Platform – Backend Module

A secure backend module that enables administrators to generate and download structured PDF reports for AI-based candidate assessments.

## 👩‍💻 Developed By
Valarmathi R

## 📌 Module Overview

The Admin Report Generation System is a secure backend module designed to generate downloadable assessment reports for candidates.

Only authenticated admin users are allowed to access, manage, and download reports.

This module is built for integration into the complete AI Assessment Platform.

## 🏗 Project Structure

## 🏗 Project Structure

```
AI_ASSESSMENT_ADMIN_REPORT_MODULE/
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
├── public/
│   ├── dashboard.html
│   └── login.html
│
├── routes/
│   ├── adminAuthRoutes.js
│   └── adminReportRoutes.js
│
├── seed.js
├── server.js
├── package.json
└── .gitignore
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

This module provides a structured, secure, and scalable backend solution for generating candidate assessment reports within the AI Assessment Platform.

Designed for smooth integration with other system modules.



