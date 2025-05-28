const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing.js");    
const expressError = require("../utils/ExpressError");
const Review = require("../models/review.js");  
const {listingSchema, reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");


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
router.post("/",  validateReview,wrapAsync(async(req, res) => {  
    console.log(req.params.id);
   let listing1 = await Listing.findById(req.params.id)
   let newReview  = new Review(req.body.review);

   listing1.reviews.push(newReview); // ✅ push to the instance, not the model

   await newReview.save();
    await listing1.save();

  res.redirect(`/listings/${req.params.id}`);

}));

//review delete route
router.delete(
  "/:reviewId",
  wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;