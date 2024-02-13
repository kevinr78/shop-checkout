const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
exports.getLogin = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    docTitle: "Login",
    isAuthenticated: false,
  });
};
exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    docTitle: "Sign Up",
    isAuthenticated: false,
  });
};
exports.postSignup = (req, res) => {
  const { email, password, confirmPassword } = req.body;

  let doesUserExist = User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        return res.redirect("/signup");
      }

      return bcrypt.hash(password, 12);
    })
    .then((hashPass) => {
      const user = new User({
        email: email,
        password: hashPass,
        cart: { items: [] },
      });

      return user.save();
    })
    .then((result) => {
      res.redirect("/login");
    })
    .catch((err) => {
      console.error(err);
    });
};
exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;

  let loggedUser = User.findOne({ email: email })
    .then((userDoc) => {
      if (!userDoc) {
        return res.redirect("/login");
      }

      let validpassword = bcrypt.compareSync(password, userDoc.password);

      if (validpassword) {
        req.session.isLoggedIn = true;
        req.session.user = userDoc;
        req.session.save((err) => {
          res.redirect("/");
        });
      } else {
        console.log("Wrong pass");
      }
    })
    .catch((err) => {});

  User.findById("65c7182e9b0ad8c80cb60abf")
    .then((user) => {})
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res) => {
  console.log("Logout");
  req.session = null;
  res.redirect("/");
};
