# 🛍️ ShopNest – MERN E-Commerce Application

## 📌 Project Overview

ShopNest is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) e-commerce web application that allows users to browse products, manage their shopping cart, place orders, and securely authenticate using JWT.

The application follows a client-server architecture with a RESTful API and MongoDB database.

---

## ✨ Key Features

- User Registration & Login (JWT Authentication)
- Secure Password Encryption (bcrypt)
- Product Listing & Product Details
- Shopping Cart Management
- Checkout & Order Placement
- User Order History
- Admin Order Management
- Image Upload using Cloudinary
- REST API Architecture
- Responsive User Interface

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js
- Multer
- Cloudinary

---

## 📂 Project Structure

```
ShopNest/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── model/
│   ├── routes/
│   └── index.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── package.json
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/nehaverma900/Shopnest-MERN.git
```

### Install Dependencies

Backend

```bash
cd backend
npm install
```

Frontend

```bash
cd frontend
npm install
```

---

## ▶️ Run the Project

### Start Backend

```bash
cd backend
npm start
```

### Start Frontend

```bash
cd frontend
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file inside the backend folder.

Example:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 📸 Screenshots

Add screenshots of:

- Home Page
- Product Details
- Shopping Cart
- Checkout
- Orders Page
- Admin Dashboard

---

## 🚀 Future Improvements

- Online Payment Gateway
- Product Search & Filters
- Wishlist
- Product Reviews
- Email Notifications
- Inventory Management

---

## 👩‍💻 Author

**Neha Verma**

---

## 📄 License

This project is created for educational and portfolio purposes.
