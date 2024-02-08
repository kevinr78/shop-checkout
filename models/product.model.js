const fs = require("fs");
const path = require("path");
const Cart = require("../models/cart.model");

const products = [];

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProductFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    return cb(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(id, title, price, imgUrl, description) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.imgUrl = imgUrl;
    this.description = description;
  }

  save() {
    getProductFromFile((products) => {
      if (this.id) {
        const existingProdIndex = products.findIndex(
          (prod) => prod.id === this.id
        );

        const updatedProducts = [...products];
        updatedProducts[existingProdIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      }
      this.id = Math.random().toString();

      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductFromFile(cb);
  }

  static deleteById(id) {
    getProductFromFile((products) => {
      const product = products.find((prod) => {
        console.log(id, prod.id);
        return prod.id === id;
      });
      const updatedProduct = products.filter((prod) => prod.id != id);

      fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }
  static findById(id, cb) {
    getProductFromFile((products) => {
      const product = products.find((p) => {
        return p.id === id;
      });

      cb(product);
    });
  }
};
