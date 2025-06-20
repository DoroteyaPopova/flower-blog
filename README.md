# Flower Blog

A full-stack React application for flower enthusiasts to share their passion for flowers, post blogs, and interact with the community.

## Table of Contents

-  [Overview](#overview)
-  [Features](#features)
-  [Tech Stack](#tech-stack)
-  [Frontend Implementation](#frontend-implementation)
-  [Backend Implementation](#backend-implementation)
-  [Authentication Implementation](#authentication-implementation)
-  [Installation](#installation)
-  [Usage](#usage)
-  [API Reference](#api-reference)
-  [License](#license)

## Overview

Welcome to Flower Blog, a platform where users can register, create posts about flowers, and engage with other flower enthusiasts. The application features a responsive design and user authentication system.

## Features

-  User authentication (register, login, logout)
-  Create, read, update, and delete blog posts
-  View all posts from the community
-  Personalized user dashboard to manage posts
-  Responsive design for various screen sizes

## Tech Stack

### Frontend

-  React.js
-  CSS for styling

### Backend

-  Node.js
-  Express.js
-  MongoDB (Database)

## Deployment Notes

> **Important:** This application's backend is deployed on Render's free tier, which means:
>
> -  The backend service automatically spins down after 15 minutes of inactivity
> -  When a new request comes in after inactivity, it takes approximately 50-60 seconds for the server to "wake up" and respond
> -  This cold start delay affects the first request only; subsequent requests will be processed normally as long as the service remains active
> -  If you experience a loading delay when first visiting the site or after a period of inactivity, please be patient as the server restarts
>
> This behavior is normal for applications hosted on free-tier services and is not indicative of any issues with the application itself.

## Frontend Implementation

The frontend of Flower Blog is built with React and implements various modern React features:

### React Core Concepts Used

-  **Component-Based Architecture**: Modular design with reusable components
-  **React Router**: For navigation and route management with protected routes
-  **React Hooks**:
   -  useState for local state management
   -  useEffect for side effects and data fetching
   -  useContext for global state access
-  **Custom Hooks**: Created for reusable logic across components
-  **Context API**: For global state management and sharing data between components
-  **Guard Routing**: Protected routes to restrict access based on authentication status
-  **Form Handling**: Controlled components for form inputs with validation

### Key Components

-  Authentication components (Register, Login)
-  Post management (Create, Edit, Delete, Update)
-  Navigation and layout components
-  User profile and dashboard

## Backend Implementation

The backend is built with Node.js and Express.js, providing a RESTful API that connects to a MongoDB database.

### Features:

-  RESTful API endpoints
-  Authentication using JWT (JSON Web Tokens)
-  Database operations with MongoDB
-  Data validation and error handling

## Authentication Implementation

This project uses localStorage for JWT token storage due to cross-domain deployment constraints (client on Vercel, API on Render).

### Implementation Details

-  **Token Storage**: localStorage with automatic expiry validation
-  **Security Features**:
   -  Token expiry checking (7-day lifespan matching JWT)
   -  Automatic cleanup of expired tokens
   -  Centralized token management through utility functions
   -  Authorization header-based API requests

### Security Considerations

**Current Approach:**

-  Uses localStorage for cross-domain compatibility
-  Implements token expiry validation
-  Provides automatic cleanup mechanisms

**Security Trade-offs:**

-  Acknowledges XSS vulnerability considerations
-  localStorage tokens persist until manually cleared or expired

**Production Alternative:**
For same-domain deployments, httpOnly cookies would be preferred for enhanced security against XSS attacks.

### Token Manager Utility

The application includes a professional token management system:

-  Centralized localStorage operations
-  Automatic expiry validation
-  Clean token lifecycle management
-  Separation of concerns from React components

## Installation

```
# Clone the repository
git clone https://github.com/DoroteyaPopova/flower-blog.git

# Navigate to the project directory
cd flower-blog

# Setup and start the server
cd server
npm install
npm run dev  # or npm start

# In a new terminal, setup and start the client
cd client
npm install
npm run dev
```

Note: You need to run both the server and client separately. Make sure the server is running before starting the client for proper functionality.

## Usage

After installation, the application will be running on `http://localhost:3000`.

### User Registration

1. Navigate to the Register page
2. Fill in the required information
3. Submit the form to create an account

### Creating a Flower Post

1. Log in to your account
2. Navigate to the "Upload" page
3. Fill in the flower post details and submit

## API Reference

The API endpoints available in this application include:

### Authentication

-  `GET /rtp/users/` - Get all users
-  `POST /rtp/users/register` - Register a new user
-  `POST /rtp/users/login` - Log in a user
-  `GET /rtp/users/profile` - Get user profile
-  `POST /rtp/users/update` - Update user profile

### Flowers

-  `GET /rtp/flowers/catalog` - Get all flowers
-  `GET /rtp/flowers/:id` - Get a specific flower
-  `POST /rtp/flowers/upload` - Create a new flower
-  `PUT /rtp/flowers/:id` - Update a flower
-  `DELETE /rtp/flowers/:id` - Delete a flower
-  `GET /rtp/flowers/user/:userId` - Get all flowers for the current user

### Likes

-  `GET /rtp/likes/` - Create a new like
-  `DELETE /rtp/likes/:userId/:flowerId` - Remove a like
-  `GET /rtp/likes/check/:userId/:flowerId` - Check if user has liked a specific flower
-  `GET /rtp/likes/count/flower/:flowerId` - Get total like count for a flower
-  `GET /rtp/likes/flower/:flowerId` - Get like objects for a specific flower
-  `GET /rtp/likes/count/user/:userId` - Get count of flowers liked by a user
-  `GET /rtp/likes/user/:userId` - Get all likes for a specific user
-  `GET /rtp/likes/top-flowers` - Get top 3 most liked flowers

## License

This project is licensed under the MIT License - see the LICENSE file for details.
