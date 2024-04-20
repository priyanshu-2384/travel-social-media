const Listing = require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");
const mongoose = require("mongoose");
const { reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");
const Booking = require("./models/booking.js");

const validateListing = (req,res,next) => {
   let {error} = listingSchema.validate(req.body);
   if(error) {
       return new ExpressError(400,error);
   } else {
       next();
   }
};

const validateReview = (req,res,next) => {
   console.log(reviewSchema);
   let { error } = reviewSchema.validate(req.body);
   if(error) {
       return new ExpressError(400,error);
   } else {
       next();
   }
};

const isLoggedIn = (req,res,next) => {
   if(!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in first");
    return res.redirect("/login");
   }
   next();
};

const saveRedirectUrl = (req,res,next) => {
   console.log(req.session.redirectUrl);
   if(req.session.redirectUrl) {
      res.locals.redirectUrl = req.session.redirectUrl;
   } 
   next();
};

const isOwner = async (req,res,next) => {
   let { id } = req.params;
   let listing = await Listing.findById(id);
   if(!listing.owner._id.equals(res.locals.currUser._id)) {
      req.flash("error","You are not owner of the listing");
      return res.redirect(`/listings/${id}`);
   }
   next();
}
const isOwnerReview = async (req,res,next) => {
   console.log("in middleware");
   let { id, reviewId} = req.params;
   let review = await Review.findById(reviewId);
   if(!review.author._id.equals(res.locals.currUser._id)) {
      req.flash("error","You are not owner of the Review");
      return res.redirect(`/listings/${id}`);
   }
   next();
}

const isAvailable = async (req,res,next) => {
   let {id} = req.params;
   let bookingData = req.body.booking;
   let start = new Date(bookingData.startDate);
   let end = new Date(bookingData.endDate);
   if(start>end) {
      req.flash("error","Please Enter valid dates");
      return res.redirect(`/listings/${id}`);
   }
   let listing = await Listing.findById(id);
   let list = await Booking.find({listing : listing._id});
   for(el of list) {
      let s = new Date(el.startDate);
      let e = new Date(el.endDate);
      console.log(el.startDate);
      console.log(el.endDate);
      if((start>=s && start<=e) || (end>=s && end<=e) || (start<=s && end>=e)) {
         console.log("Yes");
         req.flash("error","Hotel not Available for the provided date, Please choose another date");
         return res.redirect(`/listings/${id}`);
      }
   }
   next();
}
module.exports = {isLoggedIn,saveRedirectUrl,isOwner,validateListing,validateReview,isOwnerReview,isAvailable};   //order of exporting is important if not sendas object(i.e isLoggedIn,saveRedirectUrl)