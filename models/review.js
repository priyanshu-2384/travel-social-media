const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment : String,
    createdAt: {
        type : Date,
        default : Date.now()
    },
    author : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }, 
    replies : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review",
            default : []
        }
    ]
});
const Review = mongoose.model("Review",reviewSchema);
module.exports = Review;