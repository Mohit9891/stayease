const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { listingSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");

const { isLoggedIn } = require("../middleware.js");

const listingcontroller = require("../controllers/listing.js");

const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};

// if(! res.locals.currentUser && listing.owner._id.equals(res.locals.currentUser._id)){
//     req.flash("error","you don'have permission");
//     res.redirect(`/listings/${id}`);
//    }

// Update Route
router.put(
  "/:id",
  isLoggedIn,
  wrapAsync(listingcontroller.update)
);

// Delete Route
router.delete(
  "/:id",
  isLoggedIn,
  wrapAsync(listingcontroller.delete)
);

// Index Route
router.get("/", wrapAsync(listingcontroller.index));

// New Route
router.get("/new", isLoggedIn, (listingcontroller.new)
);

// Create Route
router.post(
  "/",
  isLoggedIn,
  wrapAsync(listingcontroller.create)
);

// Show Route
router.get(
  "/:id",

  wrapAsync(listingcontroller.show)
);

// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  wrapAsync(listingcontroller.edit)
);
module.exports = router;
