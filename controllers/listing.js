const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  const alllistings = await Listing.find({});
  res.render("./listings/index.ejs", { alllistings });
};

module.exports.update = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (
    !listing.owner._id ||
    listing.owner._id.toString() !== currentUser._id.toString()
  ) {
    req.flash("error", "You don't have permission to edit this listing.");
    return res.redirect(`/listings/${id}`);
  }
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
};

module.exports.delete = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
};

module.exports.new = (req, res) => {
  res.render("./listings/new.ejs");
};

module.exports.create = async (req, res) => {
  listingSchema.validateAsync(req.body);

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "Successfully made a new listing!");

  res.redirect("/listings");
};

 module.exports.show = async (req, res) => {
    let { id } = req.params;
    const listings = await Listing.findById(id)
      .populate("reviews")
      .populate("owner");
    console.log("Listing:", listings);
    res.render("./listings/show.ejs", { listings, currentUser: req.user });
  }

  
 module.exports.edit = async (req, res) => {
    let { id } = req.params;
    const listings = await Listing.findById(id);
    res.render("./listings/edit.ejs", { listings });
  }