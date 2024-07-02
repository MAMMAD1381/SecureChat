# Table of Contents
- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Client Prerequisites](#client-prerequisites)
  - [Server Prerequisites](#server-prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
  - [Client](#client)
  - [Server](#server)


# Overview
SecureChat is a secure real-time private and group chat application designed with robust authentication mechanisms and support for different user roles. Key features include message encoding, signing for enhanced security, and real-time communication capabilities. The project utilizes React for the frontend and Node.js for the backend. Setup involves running npm install in both the server and client directories. SecureChat aims to provide a secure and efficient platform for private and group communications.

# Setup
Here's the setup section for your project:

## Prerequisites
Ensure you have Node.js and npm installed on your system. This project requires the following dependencies for both the client and server:

## Client Prerequisites
- @testing-library/jest-dom
- @testing-library/react
- @testing-library/user-event
- axios
- bootstrap
- dotenv
- node-forge
- react
- react-bootstrap
- react-dom
- react-router-dom
- react-scripts
- socket.io-client
- web-vitals

## Server Prerequisites
- bcryptjs
- cors
- crypto
- dotenv
- express
- jsonwebtoken
- mongoose
- node-forge
- nodemon
- socket.io
- winston

## Installation
1. Clone the repository or download the project files.
    ```bash
    git clone https://github.com/MAMMAD1381/SecureChat.git
    ```
2. Navigate to the client directory and install the required packages:
    ```bash
    cd client
    npm install
    ```
3. Navigate to the server directory and install the required packages:
    ```bash
    cd server
    npm install
    ```
4. Create a `.env` file in both the client and server directories with the necessary environment variables.


# Project Structure

## Client

```
client/
│
├── node_modules/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── auth/
│   │   ├── chats/
│   │   ├── dashboards/
│   │   ├── lists/
│   │   ├── GlobalMessage.js
│   │   ├── LandingPage.js
│   │   └── MessageContext.js
│   │
│   ├── controllers/
│   │   ├── admin.js
│   │   ├── auth.js
│   │   ├── group.js
│   │   └── user.js
│   │
│   ├── utils/
│   │   ├── Crypto.js
│   │   └── localStorage.js
│   │
│   ├── App.js
│   ├── env.js
│   ├── index.css
│   ├── index.js
│   └── reportWebVitals.js
│
├── .gitignore
├── package-lock.json
└── package.json
```

**Description**

- **components/**: Contains React components for various parts of the application.
- **controllers/**: Business logic and handling for different aspects like admin, auth, group, and user.
- **utils/**: Utility functions used throughout the client-side application.
- **App.js**: Main component for the client application.
- **index.js**: Entry point for the client application.
## Server

```
server/
│
├── node_modules/
│
├── servers/
│   ├── expressServer.js
│   └── socketServer.js
│
├── src/
│   ├── controllers/
│   │   ├── admin/
│   │   ├── group/
│   │   ├── poll/
│   │   ├── user/
│   │   └── socketController.js
│   │
│   ├── middlewares/
│   │   ├── authenticate.js
│   │   ├── authorize.js
│   │   ├── checkFields.js
│   │   └── socketAuth.js
│   │
│   ├── models/
│   │   ├── Cert.js
│   │   ├── Group.js
│   │   ├── GroupInvitation.js
│   │   ├── Poll.js
│   │   ├── RequestAdmin.js
│   │   ├── User.js
│   │   └── Vote.js
│   │
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── groupRoutes.js
│   │   ├── pollRoutes.js
│   │   ├── socketRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── utils/
│   │   ├── connectDB.js
│   │   ├── Crypto.js
│   │   ├── CustomError.js
│   │   ├── errorHandler.js
│   │   ├── generateKeys.js
│   │   ├── jwt.js
│   │   └── logger.js
│
├── .env
├── .gitignore
├── package-lock.json
├── package.json
└── server.js
```

**Description**

- **controllers/**: Contains the server-side controllers handling different routes.
- **middlewares/**: Middleware functions for request processing.
- **models/**: Data models for the application's database.
- **routes/**: Defines the different API routes.
- **utils/**: Utility functions and helpers for the server-side application.
- **server.js**: Main entry point for the server application.

This structure should make it clear and easy to understand the layout and organization of your project.