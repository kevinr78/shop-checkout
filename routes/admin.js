const express = require("express");
const path = require("path");
const router = express.Router();
const verifyAuth = require("../middleware/verifyAuth");
const rootDir = require("../util/path");
const productsController = require("../controllers/products");

router.get("/add-product", verifyAuth, productsController.getAddProduct);

router.post("/add-product", verifyAuth, productsController.postAddProduct);

router.get("/products", verifyAuth, productsController.getAdminProducts);

router.get(
  "/edit-product/:productId",
  verifyAuth,
  productsController.getEditProduct
);

router.post("/edit-product", verifyAuth, productsController.postEditProduct);

router.post(
  "/delete-product/:productId",
  verifyAuth,
  productsController.deleteProduct
);

module.exports = router;
