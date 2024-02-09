const DB = require("../util/database");
const Cart = require("../models/cart.model");

const products = [];

module.exports = class Product {
  constructor(id, title, price, imgUrl, description) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.imgUrl = imgUrl;
    this.description = description;
  }

  save() {
    return DB.execute(
      `INSERT INTO PRODUCTS(id,title,price,description) VALUES(?,?,?,?)`,
      [this.id, this.title, this.price, this.description]
    );
  }

  static updateProduct(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedPrice,
    updatedDesc
  ) {
    return DB.execute(
      "UPDATE PRODUCTS SET TITLE = ?,PRICE = ? ,DESCRIPTION = ? WHERE ID= ? ",
      [updatedTitle, updatedPrice, updatedDesc, prodId]
    );
  }

  static fetchAll(cb) {
    return DB.execute("SELECT * FROM PRODUCTS");
  }

  static deleteById(id) {
    return DB.execute(`DELETE FROM PRODUCTS WHERE ID=?`, [id]);
  }
  static findById(id) {
    return DB.execute(`SELECT * FROM PRODUCTS WHERE id=?`, [id]);
  }
};
