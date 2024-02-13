const express = require("express");
const path = require("path");
const verifyAuth = require("../middleware/verifyAuth");

const shopController = require("../controllers/shop");
const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);
router.get("/products/:productId", shopController.getProduct);
router.get("/cart", verifyAuth, shopController.getCart);
router.post("/cart", verifyAuth, shopController.postCart);
router.get("/orders", shopController.getOrders);
router.get("/checkout", shopController.getCheckout);
router.post(
  "/cart-delete-item",
  verifyAuth,
  shopController.postCartDeleteProduct
);
module.exports = router;
