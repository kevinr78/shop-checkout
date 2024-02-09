const DB = require("../util/database");
module.exports = class Cart {
  static addNewProduct({ id, title, price }) {
    console.log(id, title, price);
    return DB.execute(
      "INSERT INTO  CART (prodId, userId,title,price,quantity) VALUES(?,?,?,?,?)",
      [id, "2", title, price, 1]
    );
  }

  static updateProduct(id, productPrice) {
    return DB.execute(
      "UPDATE CART SET price=price+?, quantity=quantity+1 where prodId=?",
      [productPrice, id]
    );
  }

  static deleteProduct(id, productPrice) {}

  static getProductById(id) {
    return DB.execute(
      `SELECT *  FROM CART c, products p  WHERE p.id = c.prodid and prodId=?`,
      [id]
    );
  }

  static getCart(cb) {
    return DB.execute(
      "select prodId, title, sum(price) as totPrice,quantity from cart group by prodId,title ,quantity order by prodId"
    );
  }
};
