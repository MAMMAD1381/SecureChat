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

# Project Features

### Configuration Management

- **External Configuration Files**: Sensitive information such as database credentials, server ports, and other crucial settings are stored in separate configuration files rather than being hard-coded in the server files. This ensures that during server startup, all essential data is loaded securely from these files.

- **Avoiding Hard-Coding Secrets**: We avoid embedding critical secrets (e.g., API keys, database URLs) directly in the codebase. Instead, they are loaded from secure environments, reducing the risk of exposure in public repositories or during code sharing.

### Logging and Monitoring

- **Detailed Logging**: The system maintains comprehensive logs that track significant actions and events, including:
  - User sign-up and login attempts.
  - Profile access requests.
  - Message exchanges between users.

- **Log Files**: All logs are recorded in structured log files, such as `combined.log`, which facilitates easy monitoring and debugging. Logs include user activities, authorization attempts, and error messages.

### Integrity Verification

- **Message Integrity**: Each message’s integrity is verified to ensure that it hasn’t been tampered with during transmission. This verification process helps maintain the authenticity of the communication.

### Security Measures

- **Domain-based Request Restrictions**: Security mechanisms are in place to ensure that only authorized domains can send requests to our system. This is part of our Cross-Origin Resource Sharing (CORS) configuration, which restricts which domains can interact with our APIs.

- **CORS Configuration**: CORS policies are implemented to:
  - Block unauthorized domains from making requests.
  - Control the types of headers and methods allowed in requests.
  - Ensure that only specific, pre-defined headers are used in communications.

### API and Data Access

- **Restricted API Methods**: Not all HTTP methods are accessible by default. Only allowed methods are exposed, limiting the attack surface and preventing unauthorized actions.

- **Header Validation**: Incoming requests are checked for specific headers. If a request does not contain the necessary headers, it is blocked. This helps to prevent malicious requests and ensures only legitimate traffic reaches our server.

- **Cookie Security**: Cookies are used securely to manage session data and authentication tokens. Appropriate flags (such as `HttpOnly`, `Secure`, and `SameSite`) are applied to prevent unauthorized access and transmission of cookie data.

- ## Error Handling

- **Developer vs. User Errors**: Errors are handled differently for developers and users:
  - **Developer Errors**: Detailed error logs are maintained on the server side, providing developers with comprehensive information about issues. For instance, if a variable is used that doesn’t exist, this is logged for developers to debug.
  - **User Errors**: Users receive simplified error messages that do not expose sensitive implementation details. Instead of informing the user about a specific undefined variable, they receive a general error message, such as "Login failed." This approach helps in maintaining security by not revealing server-side details to users.

- **Logging**: Error logs are stored in different formats:
  - **Console Logs**: Errors are logged to the console during development for quick debugging.
  - **File Logs**: Errors are also logged to files for persistent storage and future analysis.

### Key Management

- **Key Generation**: Public keys are generated using a specific type of cryptographic algorithm and stored in secure files. The type of keys used and the algorithms are documented for developer reference.

- **Password Handling**: User passwords are never sent in plain text. They are securely hashed and stored using industry-standard practices to ensure their protection.

- **Token Management**: Authentication tokens are set with expiration dates to enhance security:
  - **Cookie-based Tokens**: Tokens used for authentication are stored in cookies with a specific expiration date, such as 30 days. This prevents tokens from being valid indefinitely and reduces the risk of unauthorized access.

## Session Management Methods

- **Token-Based Authentication**: 
  - **Usage**: Users can authenticate using tokens. After login or registration, the system issues a token that the user can use to access protected routes.
  - **Storage**: Tokens are typically stored on the client-side, such as in local storage or session storage.
  
- **Cookie-Based Authentication**:
  - **Usage**: Users can also authenticate using cookies. Upon login or registration, a cookie containing the session token is set in the user's browser.
  - **Storage**: Cookies are automatically managed by the browser and can be configured to have specific properties such as `HttpOnly`, `Secure`, and expiration dates.

### Route-Specific Authentication

- **Flexible Authentication Methods**: Each route specifies which authentication method it supports:
  - **Token-Required Routes**: Some routes are configured to require token-based authentication. These routes do not rely on cookies and are used when tokens are preferred for session management.
  - **Cookie-Required Routes**: Other routes can require cookie-based authentication, where the presence of a valid cookie is necessary for access. This is useful in scenarios where cookies are a more convenient or secure option.

- **Route Configuration**: Routes are clearly documented to indicate their required authentication method. For example, routes labeled with `auth-token` require token-based authentication, while those with `auth-cookie` require cookie-based authentication.

### Practical Application

- **Token Use Case**: Ideal for APIs where clients (such as mobile apps or single-page applications) store tokens and include them in requests to access resources.
- **Cookie Use Case**: Suitable for web applications where maintaining session state via cookies is convenient and secure.

## User Roles

- **Role Hierarchy**: The system supports three distinct roles:
  - **Super Admin**: The highest level of access, capable of performing all administrative tasks, including approving new Admins.
  - **Admin**: Can manage certain administrative tasks but cannot elevate other users to Admin or Super Admin status without approval from a Super Admin.
  - **Regular User**: Default role for all new registrations. Users start with basic access and can be elevated to Admin status.

- **Role Assignment**:
  - **Default Assignment**: Upon registration, all users are assigned the Regular User role by default.
  - **Admin Elevation**: Users can be elevated to Admin status, but this change must be approved by a Super Admin.
  - **Super Admin Creation**: A user cannot directly create a Super Admin account. Instead, the first user to register in the system or database is automatically assigned the Super Admin role. This ensures that there is no direct method for creating additional Super Admins, thus limiting high-level access.

### Security Mechanisms

- **Controlled Elevation**: 
  - **Approval Requirement**: Elevation to Admin requires approval from a Super Admin, ensuring controlled and secure promotion processes.
  - **No Direct Super Admin Creation**: The system does not allow the creation of Super Admins through any direct method, such as registration or form submissions. The only way to have a Super Admin is by the system's automatic assignment during the first user registration.

- **Manual Role Changes**: To further secure the system, any changes to roles (especially to Super Admin) must be done manually within the database. This prevents any unintended or unauthorized elevation of privileges through the application interface.

### Practical Application

- **Initial Setup**: During initial setup, the first registered user gains Super Admin status automatically, ensuring that the system has an initial point of high-level control.
- **Subsequent Access Control**: All subsequent changes in user roles are tightly controlled and monitored to maintain the integrity and security of the access control system.
