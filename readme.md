# QR Code Management Platform

This project is a backend system for a QR Code Management Platform that supports Dynamic QR Codes, Event Tracking, and Complete Analytics. It allows users to generate, update, and manage QR codes, track interactions, and analyze their performance.

## Table of Contents

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Project Structure](#project-structure)
4. [Setup](#setup)
5. [Running the Project](#running-the-project)
6. [API Endpoints](#api-endpoints)
7. [Testing with Postman](#testing-with-postman)

## Features

- User authentication and authorization
- Generate static and dynamic QR codes
- Update dynamic QR codes
- Track QR code scans and interactions
- Analyze QR code performance

## Prerequisites

- Node.js (v14 or later)
- MongoDB
- Postman (for testing API endpoints)

## Project Structure


The server will start running on `http://localhost:3000`.

## API Endpoints


### Authentication

- `POST /auth/register`: Register a new user
- `POST /auth/login`: Login and receive a JWT token
- `GET /auth/me`: Get current user details

### QR Code Management

- `POST /qr/generate-static`: Generate a static QR code
- `POST /qr/generate-dynamic`: Generate a dynamic QR code
- `PUT /qr/:id/update`: Update a dynamic QR code
- `POST /qr/:id/track`: Track a QR code scan event
- `GET /qr/:id/events`: Get events for a specific QR code
- `GET /qr/:id/analytics`: Get analytics for a specific QR code
- `GET /qr/my-codes`: Get all QR codes for the current user
- `GET /qr/:id/redirect`: Redirect endpoint for dynamic QR codes

## Testing with Postman

1. Open Postman and create a new collection for the QR Code Management Platform.

2. Set up environment variables:
   - `BASE_URL`: `http://localhost:3000`
   - `TOKEN`: (leave empty for now)

3. Create requests for each endpoint:

   a. Register a user:
   - Method: POST
   - URL: {{BASE_URL}}/auth/register
   - Body (raw JSON):
     ```json
     {
       "username": "testuser",
       "password": "testpassword"
     }