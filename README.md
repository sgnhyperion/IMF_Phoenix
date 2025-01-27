# 🕵️ Gadget Management API

A RESTful API for managing spy gadgets with cutting-edge features and seamless integration.

## ✨ Features

- 🔐 JWT Authentication with HTTP-only cookies
- 🗝 Swagger/OpenAPI Documentation
- 🤖 OpenAI Integration for codename generation
- 🔄 CRUD operations for gadgets
- 𝴄 PostgreSQL with Sequelize ORM
- 🔒 Protected routes and middleware
- 🚀 Deployment-ready configuration
- 📜 Integrated logging for error tracking and monitoring

## 🕠 Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- Swagger/OpenAPI
- JWT Authentication
- OpenAI API
- Supabase
- Winston (for logging)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- PostgreSQL database
- OpenAI API key
- Supabase account

### Installation Steps

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/gadget-management-api.git
   cd IMF_Phoenix/backend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file with the following configuration:
   ```
   PORT=5000
   DATABASE_URL=your_postgresql_url
   JWT_SECRET=your_jwt_secret
   OPENAI_API_KEY=your_openai_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_key
   ```

4. Replace the server url in `src/config/swagger.config.js` with `http://loaclhost:5000` 

4. Start the development server
   ```bash
   npm run dev
   ```

## 🔓 API Endpoints

### Authentication Routes

| Method | Endpoint       | Description               |
|--------|----------------|---------------------------|
| POST   | `/auth/signup` | Register a new user       |
| POST   | `/auth/login`  | Login user                |
| POST   | `/auth/logout` | Logout user               |
| GET    | `/auth/check`  | Check authentication status|

### Gadget Routes

| Method | Endpoint                 | Description                 |
|--------|--------------------------|-----------------------------| 
| GET    | `/gadgets`               | Get all gadgets             |
| POST   | `/gadgets`               | Create a new gadget         |
| PATCH  | `/gadgets/:id`           | Update a gadget             |
| DELETE | `/gadgets/:id`           | Decommission a gadget       |
| POST   | `/gadgets/:id/self-destruct/request` | Request self-destruct confirmation code |
| POST   | `/gadgets/:id/self-destruct/execute` | Execute self-destruct with confirmation code |

## 📚 API Documentation

Access the full Swagger/OpenAPI documentation at: 
https://imf-phoenix.onrender.com/api-docs/

## 🔒 Authentication

This API uses JWT (JSON Web Tokens) for authentication:
- Tokens are stored in HTTP-only cookies
- All protected routes require a valid token
- Token-based authentication with role-based access control

## 📜 Logging

The application uses **Winston** for logging purposes, which helps in tracking errors, debugging, and monitoring the application's performance.

## 📞 Contact

Harsh Kumar - dev.harshhkumar@gmail.com
```