exports.getLogin = (req, res, next) => {
  res.render("auth/login", { docTitle: "Login" });
};

exports.postLogin = (req, res, next) => {};
