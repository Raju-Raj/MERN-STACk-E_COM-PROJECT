const express = require("express");
const { getProducts, getProduct } = require("../controllers/productController");

const router = express.Router();

//GET ALL PRODUCTS
router.route("/products").get(getProducts);

//GET SINGLE PRODUCT
router.route("/products/:id").get(getProduct);

module.exports = router;
