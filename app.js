const express = require("express");
const path = require("path");
const app = express();

const db = require("./util/database.js");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const routes = require("./routes/admin.js");
const shop = require("./routes/shop.js");

app.use("/admin", routes);
app.use("/", shop);

app.use((req, res) => {
  res.render("404", { docTitle: "Page Not found" });
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
