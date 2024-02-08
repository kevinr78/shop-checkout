const express = require("express");
const path = require("path");
const router = express.Router();

const rootDir = require("../util/path");
const productsController = require("../controllers/products");

router.get("/add-product", productsController.getAddProduct);

router.post("/add-product", productsController.postAddProduct);

router.get("/products", productsController.getAdminProducts);

router.get("/edit-product/:productId", productsController.getEditProduct);

router.post("/edit-product", productsController.postEditProduct);

router.post("/delete-product/:productId", productsController.deleteProduct);

module.exports = router;
