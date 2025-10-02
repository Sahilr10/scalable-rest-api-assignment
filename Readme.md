# REST API Assignment

A full-stack web application featuring user authentication, product management, and admin functionalities built with Node.js, Express, MongoDB, and React.

## Features

- **User Authentication**: Register, login, logout, and password management
- **Product Management**: View products (public), create/update/delete products (admin only)
- **Admin Dashboard**: Manage users and their roles
- **Role-Based Access Control**: User and Admin roles with different permissions
- **JWT Authentication**: Secure token-based authentication
- **Responsive Frontend**: Built with React and Tailwind CSS

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcrypt** for password hashing
- **CORS** for cross-origin requests

### Frontend
- **React** with Vite
- **React Router** for navigation
- **Axios** for API calls
- **Tailwind CSS** for styling

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sahilr10/scalable-rest-api-assignment
   cd Assignment_primetrade
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend/RestApi-assignment
   npm install
   ```

### Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/assignment
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
CORS_ORIGIN=http://localhost:5173
```

### Running the Application

1. **Start MongoDB** (if running locally)

2. **Start Backend**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:3000`

3. **Start Frontend**
   ```bash
   cd frontend/RestApi-assignment
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

## User Roles and Admin Setup

**Important Note:** By default, all registered users have the `user` role. To access admin features, you need to manually create at least one admin user.

### Creating an Admin User

Since the application uses role-based access control, you'll need at least one admin user to manage the system. Here are the steps to create an admin user:

1. **Register a regular user** through the frontend registration form or API
2. **Manually update the user role** in the database:
   - Connect to your MongoDB database
   - Find the user document and update the `role` field to `"admin"`
   - Example MongoDB command:
     ```javascript
     db.users.updateOne(
       { username: "your_admin_username" },
       { $set: { role: "admin" } }
     )
     ```
3. **Login with the admin user** to access admin features

Alternatively, you can use the admin API endpoint to update user roles once you have an admin account, but initially, you'll need to manually set the first admin.

## API Documentation

Detailed API documentation is available in `API_Documentation.md`. It includes:
- Authentication endpoints
- Product management
- Admin operations
- Request/response examples
- Error handling

## Project Structure

```
Assignment_primetrade/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   ├── constants.js
│   │   ├── index.js
│   │   └── app.js
│   ├── package.json
│   └── README.md
├── frontend/
│   └── RestApi-assignment/
│       ├── src/
│       │   ├── components/
│       │   ├── context/
│       │   ├── assets/
│       │   └── ...
│       ├── package.json
│       └── README.md
├── API_Documentation.md
├── RestApi-Assignment.postman_collection.json
└── README.md (this file)
```

## Available Scripts

### Backend
- `npm run dev` - Start development server with nodemon

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Contact

For questions or support, please contact: rautsahil102005@gmail.com
