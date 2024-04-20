const express = require('express');
const router = express.Router({mergeParams:true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Booking = require('../models/booking.js');
const { isAvailable } = require('../middleware.js');

//Get Route 

router.get("/", wrapAsync(async (req,res) => {
    let allBookings = await Booking.find({}).populate({path:"listing",populate : {
        path : "owner"
    }}).populate("customer");
    res.render("allBookings/show.ejs",{allBookings});
}));

//Post Route Filter
router.post("/", wrapAsync(async (req,res) => {
    let start = new Date(req.body.from);
    let end = new Date(req.body.to);
    let x = await Booking.find({}).populate({path:"listing",populate : {
        path : "owner"
    }}).populate("customer");
    let allBookings = x.filter((obj) => {
        let curr = new Date(obj.bookedAt);
        if(curr>=start && curr<=end) {
           return obj;
        }
    });
    res.render("allBookings/show.ejs",{allBookings});
}));


module.exports = router;