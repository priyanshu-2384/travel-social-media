const express = require('express');
const router = express.Router({mergeParams:true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Booking = require('../models/booking.js');
const { isAvailable } = require('../middleware.js');
const allBookingController = require('../controllers/allBookings.js')
//Get Route 

router.get("/", wrapAsync(async (req,res) => {
    let allBookings = await Booking.find({}).populate({path:"listing",populate : {
        path : "owner"
    }}).populate("customer");
    res.render("allBookings/show.ejs",{allBookings});
}));

//Post Route Filter
router.post("/", wrapAsync(allBookingController.filter));
module.exports = router;