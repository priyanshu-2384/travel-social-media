const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        list: [{
            url: String,
            filename: String
        }],
    },
    category: {
        type: String,
        enum: [
            "Mountains", 
            "Beaches and Coastal Areas", 
            "Forests and Jungles", 
            "Deserts", 
            "Historical and Cultural Sites", 
            "Urban Destinations", 
            "Countryside and Rural Areas", 
            "Islands", 
            "Lakes and Rivers", 
            "Special Interest and Seasonal Attractions"
        ],
        required: true,
    },
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    likedBy: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    bookmarkedBy: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    date : {
        type : Date,
        default : Date.now()
    },
});

//post mongoose middleware
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing.reviews) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;