const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const Listing = require("./models/listing.js");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
// const { listingSchema, reviewSchema } = require("./schema.js");
const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";
const listings_routed = require("./routes/listing.js");
const reviews_routed = require("./routes/review.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User =  require("./models/user.js");
// const Review = require("./models/review.jconst 
const user_routed = require("./routes/user.js");

main()
  .then(() => {
    console.log("connection is succesful");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(mongo_url);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


const sessionOptions = {
  secret:"mysecretsupercode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});


// app.get("/demouser", async(req,res)=>{
//   let fakeUser = new User ({
//     email: "student@gmail.com",
//     username : "mohit123",
//   });
//    let regUser = await User.register(fakeUser, "helloworld");
//    res.send(regUser);
// });




app.use("/listings", listings_routed); // single route for all listings
 app.use("/listings/:id/reviews", reviews_routed); // single route for all reviews
app.use("/",user_routed);


// 404 Handler
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});



// Error Handler
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
    res.render("error.ejs", {message});
  //   res.status(statusCode).send(message);
});


app.listen(8080, () => {
  console.log("server is working");
});
