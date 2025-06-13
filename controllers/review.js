const Listing = require("../models/listing");


module.exports.review = async(req, res) => {  
    console.log(req.params.id);
   let listing1 = await Listing.findById(req.params.id)
   let newReview  = new Review(req.body.review);

   listing1.reviews.push(newReview); // ✅ push to the instance, not the model

   await newReview.save();
    await listing1.save();

  res.redirect(`/listings/${req.params.id}`);

}

module.exports.delete = async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
  }
