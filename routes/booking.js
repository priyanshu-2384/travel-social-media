const express = require('express');
const router = express.Router({mergeParams:true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Booking = require('../models/booking.js');
const { isAvailable } = require('../middleware.js');


//get req Booking  New Booking Route
router.get("/", wrapAsync(async (req,res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("booking/newBooking.ejs",{listing});
}));

//post req booking Create Route
router.post("/",isAvailable, wrapAsync(async(req,res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let bookingData = req.body.booking;
    let newBooking = new Booking(bookingData);
    let startDate = new Date(bookingData.startDate);
    let endDate = new Date(bookingData.endDate);
    //calculating amount
    let sd = startDate.getDate();
    let ed = endDate.getDate();
    if(ed<sd) {
       newBooking.amount = (((31-sd)+ed)+1)*(listing.price);
    } else {
        newBooking.amount = ((ed-sd)+1)*(listing.price);
    }
    newBooking.customer = req.user._id;
    newBooking.listing = listing._id;
    await newBooking.save();
    let bookingId = newBooking._id;
    let booking = await Booking.findById(bookingId).populate({path: "listing", populate : {path : "owner"}}).populate("customer");
    req.flash("success", "Congrats!!,Booking Succesfull!");
    res.render(`booking/reciept.ejs`,{booking});
}));

module.exports = router;