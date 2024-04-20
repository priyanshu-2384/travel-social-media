const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./review.js");
const listingSchema = new Schema({
    title: {
        type : String,
        required : true,
    },
    description: String,
    image:  {
        type : String,
        default : "https://www.pngkey.com/png/detail/233-2332677_ega-png.png",
        set : (v) => v===""? "https://www.pngkey.com/png/detail/233-2332677_ega-png.png":v
    },
    price: {
        type : Number,
    },
    location: String,
    country : String,
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review"
        }
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
});

//post mongoose middleware
listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing.reviews) {
        await Review.deleteMany({_id : {$in : listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;