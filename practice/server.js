const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  session({ secret: "mysupersecret", resave: false, saveUninitialized: true })
);

app.use(flash());

app.get("/register", (req, res) => {
    let{name="anonymous"} = req.query;
    req.session.name = name;
    req.flash("success", `Welcome ${name}`);
    res.redirect("/test");
});

app.get("/test", (req, res) => {

    if (req.session.count) {
    req.session.count++;
    }else {
    req.session.count = 1;
    }
  res.render("page.ejs", {
    name: req.session.name,
    count: req.session.count,
    success: req.flash("success"),
    error: req.flash("error"),
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
