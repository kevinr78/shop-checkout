const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  prodId: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
