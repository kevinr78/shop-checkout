const Product = require("../models/product.model");
const Cart = require("../models/cart.model");

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, feildData]) => {
      res.render("shop/index", {
        prods: rows,
        docTitle: "Shop",
        path: "/",
      });
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
exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;

  Product.findById(productId).then(([rows, data]) => {
    res.render("shop/product-detail", {
      docTitle: rows.docTitle,
      product: rows[0],
    });
  });
};

exports.getCart = async (req, res, next) => {
  let [cart] = await Cart.getCart();
  console.log(cart);
  res.render("shop/cart", {
    docTitle: "Cart",
    products: cart,
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

exports.postCart = async (req, res, next) => {
  let Updatedcart;
  const prodId = req.body.productId;
  let [checkIfPrdExistInCart] = await Cart.getProductById(prodId);

  if (checkIfPrdExistInCart.length > 0) {
    Updatedcart = await Cart.updateProduct(
      prodId,
      checkIfPrdExistInCart[0].price
    );
  } else {
    let product = await Product.findById(prodId);
    Updatedcart = await Cart.addNewProduct(product[0][0]);
  }

  /*  res.render("shop/cart", { docTitle: "Cart" }); */
};
