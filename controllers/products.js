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
  const product = new Product({ title, imageUrl, description, price });
  product.save();
  res.redirect("/");
};

exports.getEditProduct = (req, res) => {
  let editMode = req.query.edit;
  let prodId = req.params.productId;
  Product.findById(prodId).then((product) => {
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

  Product.findById(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDesc;

      return product.save();
    })
    .then((result) => {
      console.log("Saved");
      res.redirect("/products");
    });
  /*     updateProduct.save();  */
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

exports.deleteProduct = (req, res) => {
  const prodId = req.params.productId;

  Product.findOneAndDelete(prodId).then((result) => {
    res.redirect("/admin/products");
  });
};

exports.getAdminProducts = (req, res, next) => {
  Product.find().then((products) => {
    res.render("admin/products", {
      prods: products,
      docTitle: "Shop",
      path: "/",
    });
  });
};
