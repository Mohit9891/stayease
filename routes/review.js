const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing.js");    
const expressError = require("../utils/ExpressError");
const Review = require("../models/review.js");  
const {listingSchema, reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const usercontroller = require("../controllers/review.js");


const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};

//review route
router.post("/",  validateReview,wrapAsync(usercontroller.review));

//review delete route
router.delete(
  "/:reviewId",
  wrapAsync(usercontroller.delete)
);

module.exports = router;