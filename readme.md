

QR Code Management Platform

This backend system supports Dynamic QR Codes, Event Tracking, and Complete Analytics. It enables users to generate, update, and manage QR codes, track interactions, and analyze their performance.

Table of Contents

	1.	Features
	2.	Prerequisites
	3.	Project Structure
	4.	Setup
	5.	Running the Project
	6.	API Endpoints
	7.	Testing with Postman

Features

	•	User Authentication and Authorization (JWT-based).
	•	Generate Static and Dynamic QR Codes.
	•	Update Dynamic QR Codes.
	•	Track QR Code scans and interactions.
	•	Analyze QR Code performance with metrics such as:
	•	Total scans
	•	Unique users
	•	Scans per day

Prerequisites

Make sure you have the following installed:
	•	Node.js (v14 or later)
	•	MongoDB (local or cloud database)
	•	Postman (for API testing)

Install required dependencies:

npm install express dotenv mongoose qrcode jsonwebtoken bcrypt joi cors

Project Structure

HEALTHPRO
├── node_modules/         # Installed dependencies
├── src/
│   ├── middleware/
│   │   └── auth.js       # Authentication middleware
│   ├── models/
│   │   ├── Event.js      # Event model (tracks interactions)
│   │   ├── QRCode.js     # QR Code model
│   │   └── User.js       # User model
│   ├── routes/
│   │   ├── authRoutes.js # Authentication routes
│   │   └── qrRoutes.js   # QR Code management routes
│   └── app.js            # Main server file
├── .env                  # Environment variables
├── package.json          # Project metadata and dependencies
└── README.md             # Documentation

Setup

	1.	Clone the repository and navigate to the project directory:

git clone <repository-url>
cd HEALTHPRO


	2.	Install the dependencies:

npm install


	3.	Configure environment variables:
Create a .env file in the root directory and add the following:

PORT=3000
BASE_URL=http://localhost:3000
MONGO_URI=<your-mongo-db-uri>
JWT_SECRET=<your-jwt-secret>


	4.	Start MongoDB (if using locally):

mongod

Running the Project

To start the development server:

npx nodemon src/app.js

The server will run at http://localhost:3000.

API Endpoints

Authentication

	•	POST /auth/register: Register a new user.
	•	POST /auth/login: Log in and receive a JWT token.
	•	GET /auth/me: Get current user details (requires authorization).

QR Code Management

	•	POST /qr/generate-static: Generate a static QR code.
	•	POST /qr/generate-dynamic: Generate a dynamic QR code.
	•	PUT /qr/:id/update: Update the URL of a dynamic QR code.
	•	POST /qr/:id/track: Track an event (e.g., location, device type).
	•	GET /qr/:id/events: Fetch all events for a specific QR code.
	•	GET /qr/:id/analytics: Fetch analytics (e.g., scans, unique users).
	•	GET /qr/my-codes: Fetch all QR codes created by the user.
	•	GET /qr/:id/redirect: Redirect to the URL associated with the QR code.

Testing with Postman

	1.	Set Up Environment Variables in Postman:
	•	BASE_URL: http://localhost:3000
	•	TOKEN: (Leave empty initially)
	2.	Test Endpoints:

a. Register a User

	•	Method: POST
	•	URL: {{BASE_URL}}/auth/register
	•	Body (JSON):

{
  "email": "testmail@gmail.com",
  "username": "testuser",
  "password": "testpassword"
}

b. Login

	•	Method: POST
	•	URL: {{BASE_URL}}/auth/login
	•	Body (JSON):

{
  "username": "testuser",
  "password": "testpassword"
}


	•	After a successful response, save the returned TOKEN for authorization.

c. Generate Static QR Code

	•	Method: POST
	•	URL: {{BASE_URL}}/qr/generate-static
	•	Headers:

{
  "Authorization": "Bearer {{TOKEN}}"
}


	•	Body (JSON):

{
  "url": "https://example.com",
  "metadata": {
    "campaign": "Summer Sale"
  }
}

d. Generate Dynamic QR Code

	•	Method: POST
	•	URL: {{BASE_URL}}/qr/generate-dynamic
	•	Headers: Same as above
	•	Body (JSON):

{
  "url": "https://example.com/promo",
  "metadata": {
    "campaign": "Winter Promo"
  }
}

e. Update Dynamic QR Code

	•	Method: PUT
	•	URL: {{BASE_URL}}/qr/:id/update
	•	Headers: Same as above
	•	Body (JSON):

{
  "newUrl": "https://example.com/updated-promo"
}

f. Track QR Code Scan

	•	Method: POST
	•	URL: {{BASE_URL}}/qr/:id/track
	•	Body (JSON):

{
  "location": "New York",
  "deviceType": "iPhone"
}

g. Fetch QR Code Events

	•	Method: GET
	•	URL: {{BASE_URL}}/qr/:id/events
	•	Headers: Same as above

h. Fetch QR Code Analytics

	•	Method: GET
	•	URL: {{BASE_URL}}/qr/:id/analytics
	•	Headers: Same as above

i. Fetch User’s QR Codes

	•	Method: GET
	•	URL: {{BASE_URL}}/qr/my-codes
	•	Headers: Same as above

