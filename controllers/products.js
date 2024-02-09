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
  product
    .save()
    .then((data) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res) => {
  let editMode = req.query.edit;
  let prodId = req.params.productId;

  Product.findById(prodId)
    .then(([rows, data]) => {
      res.render("admin/edit-product", {
        docTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: rows[0],
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.postEditProduct = (req, res) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;

  Product.updateProduct(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedPrice,
    updatedDesc
  )
    .then((data) => {
      res.redirect("/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, feildData]) => {
      res.render("shop/product-list", {
        prods: rows,
        docTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteProduct = (req, res) => {
  const prodId = req.params.productId;
  Product.deleteById(prodId)
    .then((data) => {
      console.log(data);
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, feildData]) => {
      res.render("admin/products", {
        prods: rows,
        docTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
