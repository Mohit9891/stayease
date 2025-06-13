const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
  },
  description: String,
  image: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1744221127502-727af70bc6e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
    set: (v) =>
      v === ""
        ? "https://images.unsplash.com/photo-1744221127502-727af70bc6e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8"
        : v,
  },

  price: Number,
  location: String,
  country: String,

  // ✅ Add this field:
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await review.deleteMany({
      _id: {
        $in: listing.reviews,
      },
    });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
