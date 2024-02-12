const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const db = require("./util/database.js");

app.set("view engine", "ejs");
app.set("views", "views");
const User = require("./models/user.model.js");
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

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

app.use("/admin", routes);
app.use("/", shop);

app.use((req, res) => {
  res.render("404", { docTitle: "Page Not found" });
});

mongoose
  .connect(
    "mongodb+srv://kevinR:Kevinr78@notes.rrkkckw.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Kevin R.",
          email: "Kevinr@gmail.com",
          cart: {
            items: [],
          },
        });

        user.save();
      }
    });

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
