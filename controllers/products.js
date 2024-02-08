const Product = require("../models/product.model");
const Cart = require("../models/cart.model");

exports.getAddProduct = (req, res) => {
  res.render("admin/edit-product", {
    docTitle: "Add Product",
    editing: false,
    path: "/admin/edit-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  let { title, imageUrl, description, price } = req.body;
  const product = new Product(null, title, price, imageUrl, description);
  product.save();
  res.redirect("/");
};

exports.getEditProduct = (req, res) => {
  let editMode = req.query.edit;
  let prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    res.render("admin/edit-product", {
      docTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
};
exports.postEditProduct = (req, res) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;

  const updateProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedPrice,
    updatedDesc
  );

  updateProduct.save();
  res.redirect("/products");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      docTitle: "Shop",
      path: "/",
    });
  });
};

exports.deleteProduct = (req, res) => {
  const prodId = req.params.productId;
  Product.deleteById(prodId);
  res.redirect("/admin/products");
};

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      docTitle: "Shop",
      path: "/",
    });
  });
};
