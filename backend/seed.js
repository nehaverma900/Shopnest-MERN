const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const Product = require("./model/Product");

dotenv.config();

connectDB();

const products = [
  {
    name: "iPhone 15",
    description: "Apple Smartphone",
    price: 70000,
    category: "Mobile",
    stock: 10,
    images: ["iphone15.jpg"],
  },
  {
    name: "Samsung Galaxy S24",
    description: "Samsung Smartphone",
    price: 65000,
    category: "Mobile",
    stock: 15,
    images: ["s24.jpg"],
  },
  {
    name: "Boat Airdopes",
    description: "Wireless Earbuds",
    price: 1999,
    category: "Accessories",
    stock: 50,
    images: ["boat.jpg"],
  },
];

const seedData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("Sample products inserted successfully.");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();