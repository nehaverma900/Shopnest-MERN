const express = require("express");

const router = express.Router();


const upload = require("../middleware/multer");

const {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");


// Create Product with Image Upload
router.post(
    "/create",
    upload.array("images", 5),
    createProduct
);


// Get All Products
router.get(
    "/",
    getAllProducts
);


// Get Single Product
router.get(
    "/:id",
    getSingleProduct
);


// Update Product
router.put(
    "/:id",
    updateProduct
);


// Delete Product
router.delete(
    "/:id",
    deleteProduct
);


module.exports = router;