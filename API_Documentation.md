# REST API Documentation

## Base URL
```
http://localhost:3000/api/v1
```

## Authentication
This API uses JWT (JSON Web Token) for authentication. After logging in, include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Table of Contents
1. [User Authentication](#user-authentication)
2. [Products (Public)](#products-public)
3. [Products (Admin)](#products-admin)
4. [Admin Operations](#admin-operations)

---

## User Authentication

### 1. Register User
Create a new user account.

**Endpoint:** `POST /users/register`

**Request Body:**
```json
{
  "fullName": "John Doe",
  "username": "john",
  "email": "john@example.com",
  "password": "SecurePass123!",
}
```

**Response (201 Created):**
```json
{
   "statusCode": 200,
    "data": {
        "_id": "68de64ac8164a0e42adb76c9",
        "username": "john",
        "fullName": "John Doe",
        "email": "John@example.com",
        "role": "user",
        "createdAt": "2025-10-02T11:40:28.734Z",
        "updatedAt": "2025-10-02T11:40:28.734Z",
        "__v": 0
    },
    "message": "User created successfully",
    "success": true
}
```

**Error Responses:**
- `400 Bad Request` - Invalid input data
- `409 Conflict` - Email already exists

---

### 2. Login User
Authenticate user and receive JWT token.

**Endpoint:** `POST /users/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (200 OK):**
```json
{
   "statusCode": 200,
    "data": {
        "user": {
            "_id": "68de5e94522559378832fe17",
            "username": "john",
            "fullName": "John Doe",
            "email": "John@Example.com",
            "role": "user",
            "createdAt": "2025-10-02T11:14:28.299Z",
            "updatedAt": "2025-10-02T11:30:40.878Z",
            "__v": 0
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI",
        "refreshToken": "dfD7duJBk7u722zSJMBUKIyc3A"
    },
    "message": "User logged in successfully",
    "success": true
}
```

**Error Responses:**
- `401 Unauthorized` - Invalid credentials
- `404 Not Found` - User not found

---

### 3. Logout User
Invalidate current user session.

**Endpoint:** `POST /users/logout`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

**Error Responses:**
- `401 Unauthorized` - Invalid or missing token

---

### 4. Refresh Token
Get a new JWT token using refresh token.

**Endpoint:** `POST /users/refresh-token`

**Request Body:**
```json
{
  "refreshToken": "your_refresh_token_here"
}
```

**Response (200 OK):**
```json
{
  "success": ,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "new_refresh_token_here"
  }
}
```

**Error Responses:**
- `401 Unauthorized` - Invalid refresh token

---

### 5. Get Current User
Retrieve authenticated user's profile information.

**Endpoint:** `GET /users/current-user`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "statusCode": 200,
    "data": {
        "_id": "68de5e94522559378832fe17",
        "username": "john",
        "fullName": "John Doe",
        "email": "John@example.com",
        "role": "user",
        "createdAt": "2025-10-02T11:14:28.299Z",
        "updatedAt": "2025-10-02T11:30:40.878Z",
        "__v": 0
    },
    "message": "User fetched successfully",
    "success": true
}
```

**Error Responses:**
- `401 Unauthorized` - Invalid or missing token

---

### 6. Change Password
Update user password.

**Endpoint:** `PUT /users/change-password`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "currentPassword": "OldPass123!",
  "newPassword": "NewSecurePass456!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Error Responses:**
- `400 Bad Request` - Invalid password format
- `401 Unauthorized` - Current password incorrect

---

## Products (Public)

### 7. Get All Products
Retrieve list of all products (public access).

**Endpoint:** `GET /products`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search term
- `category` (optional): Filter by category

**Example Request:**
```
GET /products
```

**Response (200 OK):**
```json
{
   "statusCode": 200,
    "data": [
        {
            "_id": "68de3e1ba4ba28d722167f8c",
            "name": "Test Product",
            "description": "A test product",
            "price": 99.99,
            "createdBy": null,
            "createdAt": "2025-10-02T08:55:55.062Z",
            "updatedAt": "2025-10-02T08:55:55.062Z",
            "__v": 0
        }
    ],
    "message": "Products fetched successfully",
    "success": true
}
```

---

### 8. Get Product by ID
Retrieve details of a specific product.

**Endpoint:** `GET /products/:id`

**URL Parameters:**
- `id`: Product ID

**Example Request:**
```
GET /products/p123
```

**Response (200 OK):**
```json
{
  "statusCode": 200,
    "data": {
        "_id": "68de3e1ba4ba28d722167f8c",
        "name": "Test Product",
        "description": "A test product",
        "price": 99.99,
        "createdBy": null,
        "createdAt": "2025-10-02T08:55:55.062Z",
        "updatedAt": "2025-10-02T08:55:55.062Z",
        "__v": 0
    },
    "message": "Product fetched successfully",
    "success": true
}
```

**Error Responses:**
- `404 Not Found` - Product not found

---

## Products (Admin)

### 9. Create Product
Create a new product (Admin only).

**Endpoint:** `POST /products`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "Smartphone",
  "description": "Latest model smartphone",
  "price": 699.99
}
```

**Response (201 Created):**
```json
{
   "statusCode": 201,
    "data": {
        "name": "Test Product2",
        "description": "A test product2",
        "price": 19.99,
        "createdBy": "68de5e94522559378832fe17",
        "_id": "68de67b98164a0e42adb76d2",
        "createdAt": "2025-10-02T11:53:29.641Z",
        "updatedAt": "2025-10-02T11:53:29.641Z",
        "__v": 0
    },
    "message": "Product created successfully",
    "success": true
}
```

**Error Responses:**
- `400 Bad Request` - Invalid input data
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not authorized (not admin)

---

### 10. Update Product
Update existing product details (Admin only).

**Endpoint:** `PUT /products/:id`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**URL Parameters:**
- `id`: Product ID

**Request Body:**
```json
{
  
    "name": "product update"

}
```

**Response (200 OK):**
```json
{
   "statusCode": 200,
    "data": {
        "_id": "68de67b98164a0e42adb76d2",
        "name": "product update",
        "description": "A test product2",
        "price": 19.99,
        "createdBy": "68de5e94522559378832fe17",
        "createdAt": "2025-10-02T11:53:29.641Z",
        "updatedAt": "2025-10-02T11:56:35.510Z",
        "__v": 0
    },
    "message": "Product updated successfully",
    "success": true
}
```

**Error Responses:**
- `400 Bad Request` - Invalid input data
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not authorized (not admin)
- `404 Not Found` - Product not found

---

### 11. Delete Product
Delete a product (Admin only).

**Endpoint:** `DELETE /products/:id`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**URL Parameters:**
- `id`: Product ID

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

**Error Responses:**
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not authorized (not admin)
- `404 Not Found` - Product not found

---

## Admin Operations

### 12. Get All Users
Retrieve list of all users (Admin only).

**Endpoint:** `GET /admin/users`

**Headers:**
```
Authorization: Bearer <admin_token>
```



**Response (200 OK):**
```json
{
  
    "statusCode": 200,
    "data": [
        {
            "_id": "68de10022e7bc4e3a6b4871f",
            "username": "sahil123",
            "fullName": "Sahil",
            "email": "sahil@gmail.com",
            "role": "user",
            "createdAt": "2025-10-02T05:39:14.701Z",
            "updatedAt": "2025-10-02T09:04:34.927Z",
            "__v": 0
        },
        {
            "_id": "68de5e3e522559378832fe13",
            "username": "example123",
            "fullName": "exampleuser",
            "email": "example@mail.com",
            "role": "user",
            "createdAt": "2025-10-02T11:13:02.134Z",
            "updatedAt": "2025-10-02T11:30:23.537Z",
            "__v": 0
        },
        {
            "_id": "68de5e94522559378832fe17",
            "username": "admin123",
            "fullName": "admin",
            "email": "admin@mail.com",
            "role": "admin",
            "createdAt": "2025-10-02T11:14:28.299Z",
            "updatedAt": "2025-10-02T11:30:40.878Z",
            "__v": 0
        },
        {
            "_id": "68de64ac8164a0e42adb76c9",
            "username": "example12",
            "fullName": "example",
            "email": "exampl@mail.com",
            "role": "user",
            "createdAt": "2025-10-02T11:40:28.734Z",
            "updatedAt": "2025-10-02T11:40:28.734Z",
            "__v": 0
        }
    ],
    "message": "Users fetched successfully",
    "success": true
}
```

**Error Responses:**
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not authorized (not admin)

---

### 13. Update User Role
Change a user's role (Admin only).

**Endpoint:** `PUT /admin/users/:id`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**URL Parameters:**
- `id`: User ID

**Request Body:**
```json
{
  "role": "admin"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User role updated successfully",
  "data": {
    "userId": "123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin",
    "updatedAt": "2025-01-20T15:00:00Z"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Invalid role
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not authorized (not admin)
- `404 Not Found` - User not found

---

### 14. Delete User
Delete a user account (Admin only).

**Endpoint:** `DELETE /admin/users/:id`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**URL Parameters:**
- `id`: User ID

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

**Error Responses:**
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not authorized (not admin)
- `404 Not Found` - User not found

---

## Error Response Format

All error responses follow this structure:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message"
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR` - Input validation failed
- `AUTHENTICATION_ERROR` - Authentication failed
- `AUTHORIZATION_ERROR` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `CONFLICT` - Resource already exists
- `SERVER_ERROR` - Internal server error

---

## Status Codes Summary

| Status Code | Description |
|-------------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 500 | Internal Server Error |

---

## Rate Limiting

- Rate limit: 100 requests per 15 minutes per IP
- Rate limit headers included in response:
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Time when limit resets

---

## Security Best Practices

1. **Always use HTTPS** in production
2. **Store tokens securely** (httpOnly cookies or secure storage)
3. **Never share your JWT token**
4. **Passwords must be**:
   - At least 8 characters
   - Include uppercase, lowercase, numbers, and special characters
5. **Token expiry**:
   - Access token: 15 minutes
   - Refresh token: 7 days

---



## Version History

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2025-01-20 | Initial API release |

---

## Support

For issues or questions, please contact:
- Email: rautsahil102005@gmail.com


---

**Last Updated:** October 2, 2025