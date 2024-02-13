const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session")(session);

const app = express();
const dotenv = require("dotenv").config();
const User = require("./models/user.model.js");
const db = require("./util/database.js");
const store = new mongoDBStore({
  uri: process.env.DB_URL,
  collection: "sessions",
});
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
    unset: "destroy",
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use((req, res, next) => {
  User.findById("65c7182e9b0ad8c80cb60abf")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch(() => {
      console.log("Error in middleware");
    });
});

const routes = require("./routes/admin.js");
const shop = require("./routes/shop.js");
const authRoutes = require("./routes/auth.js");

app.use("/admin", routes);
app.use("/", shop);
app.use("/", authRoutes);

app.use((req, res) => {
  res.render("404", {
    docTitle: "Page Not found",
    isAuthenticated: req.isLoggedIn,
  });
});

mongoose
  .connect(process.env.DB_URL)
  .then((result) => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
