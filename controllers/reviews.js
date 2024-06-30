const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

module.exports.createReview = async (req,res)=> {
    console.log("hello");
    let {id} = req.params;
    let listing = await Listing.findById(id).populate("reviews");
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    console.log(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "Review Added!");
    res.redirect(`/listings/${req.params.id}`);
};

module.exports.destroyReview = async (req,res) => {
    let {id,reviewId } = req.params;
    await Listing.findByIdAndUpdate(id , {$pull :{reviews : reviewId} } );
    let x = await Review.findById(reviewId).populate("replies");
    for(let i=0; i<x.replies.length; i++) {
        await Review.findByIdAndDelete(x.replies[i]._id);
    }
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
};

module.exports.addReply = async (req,res) => {
    let {id,reviewId } = req.params;
    let reply = req.body.reply;
    let review = await Review.findById(reviewId).populate("replies");
    let newReview = new Review(reply);
    newReview.author = req.user._id;
    newReview.save();
    review.replies.push(newReview);
    console.log(review.replies);
    review.save();
    req.flash("success", "Reply Added!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyReply = async (req,res) => {
    let {id,reviewId, replyId} = req.params;
    await Review.findByIdAndUpdate(reviewId , {$pull :{replies: replyId} } );
    await Review.findByIdAndDelete(replyId);
    req.flash("success", "Reply Deleted!");
    res.redirect(`/listings/${id}`);
};

