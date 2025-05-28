const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { listingSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");
const Listing = require("../models/listing.js");
const { isLoggedIn } = require("../middleware.js");

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
  wrapAsync(async (req, res) => {
    let { id } = req.params;
     let listing =  await Listing.findById(id);
      if (!listing.owner || listing.owner.toString() !== currentUser._id.toString()) {
      req.flash("error", "You don't have permission to edit this listing.");
      return res.redirect(`/listings/${id}`);
    }
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  })
);

// Delete Route
router.delete(
  "/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
  })
);

// Index Route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const alllistings = await Listing.find({});
    res.render("./listings/index.ejs", { alllistings });
  })
);

// New Route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("./listings/new.ejs");
});

// Create Route
router.post(
  "/",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    listingSchema.validateAsync(req.body);

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "Successfully made a new listing!");

    res.redirect("/listings");
  })
);

// Show Route
router.get(
  "/:id",

  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listings = await Listing.findById(id)
      .populate("reviews")
      .populate("owner");
        console.log("Listing:", listings);
    console.log("Current User:", req.user);
   res.render("./listings/show.ejs", { listings, currentUser: req.user });

  })
);

// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listings = await Listing.findById(id);
    res.render("./listings/edit.ejs", { listings });
  })
);
module.exports = router;
