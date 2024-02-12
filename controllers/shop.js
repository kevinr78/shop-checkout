const Product = require("../models/product.model");
const Cart = require("../models/cart.model");

exports.getIndex = (req, res, next) => {
  Product.find().then((products) => {
    res.render("shop/product-list", {
      prods: products,
      docTitle: "Shop",
      path: "/",
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.find().then((products) => {
    res.render("shop/product-list", {
      prods: products,
      docTitle: "Shop",
      path: "/",
    });
  });
};
exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;

  Product.findById(productId).then((product) => {
    res.render("shop/product-detail", {
      docTitle: product.title,
      product: product,
    });
  });
};

exports.getCart = (req, res, next) => {
  req.user.populate("cart.items.productId").then((products) => {
    console.log();
    res.render("shop/cart", {
      docTitle: "Your Cart",
      products: products.cart.items,
    });
  });
};
exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/cart",
    docTitle: "Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/cart",
    docTitle: "Checkout",
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  req.user
    .removeFromCart(prodId)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};
