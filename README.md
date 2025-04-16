Swiftarc (Zuvees-Ecommerce) Backend
A Node.js backend for an e-commerce platform with Google OAuth authentication, product management, order processing, and role-based access control.

### Features
Google OAuth 2.0 authentication

Role-based authorization (admin, rider, user)

Product catalog management
Order processing system
MongoDB database integration
Express.js REST API

### Installation

```
git clone https://github.com/yourusername/zuvees-backend.git
cd zuvees-backend

```

```
npm install
```
Create a .env file based on .env.example and fill in your credentials

Start the server
```
npm start
Environment Variables
PORT: Server port (default: 5000)
MONGO_URI: MongoDB connection string
GOOGLE_CLIENT_ID: Google OAuth client ID
GOOGLE_CLIENT_SECRET: Google OAuth client secret
GOOGLE_CALLBACK_URL: Google OAuth callback URL
SESSION_SECRET: Session encryption secret
JWT_SECRET: JWT encryption secret
```
API Endpoints
/auth/google - Google OAuth login

/products - Product catalog
/orders - Order management
/admin - Admin operations
/rider - Delivery rider operations

