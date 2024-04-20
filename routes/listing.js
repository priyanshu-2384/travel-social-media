const express = require('express');
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");

const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");


//Index Route 
router.get("/", wrapAsync(async(req,res) => {
    let allListings = await Listing.find({});
    res.render("listings/index.ejs",{ allListings });
}));

//New Route
router.get("/new",isLoggedIn, (req,res) => {
   res.render("listings/new.ejs");
});

//Show Route,.... Always put this id route below as if not done, the routes which will be below this and have same url like : /listings/new here new will be intrepreted as id
router.get("/:id", wrapAsync(async (req,res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id).populate({path:"reviews",populate : { path: "author"}}).populate("owner");  //nested Population is used here (listing -> reviews -> author)
    if(!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{ listing });
}));

//Create Route
router.post("/",validateListing, wrapAsync(async (req,res) => {
   let listing = req.body.listing;
   let newListing = new Listing(listing);
   console.log(newListing);
   newListing.owner = req.user._id;  //When user will create a post we will take id of user from sessions and assign that id as owner of the listing
   await newListing.save();
   req.flash("success", "New Listing Created!");
   res.redirect("/listings");
}));

//Edit route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(async (req,res) => {
  let {id} = req.params;
  console.log({id});
  let listing = await Listing.findById(id);
  if(!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  }
  res.render("listings/edit.ejs",{listing});
}));

//Update Route, PUT request
router.put("/:id",validateListing,isOwner, wrapAsync(async (req,res) => {
   let {id} = req.params;
   let listing = req.body.listing;
   let x = await Listing.findByIdAndUpdate(id, {...listing}, {new : true});
   req.flash("success", "Listing Updated!");
   res.redirect(`/listings/${id}`);
}));

//Delete Route
router.delete("/:id",isLoggedIn,isOwner, wrapAsync(async (req,res)=>{
   let {id} = req.params;
   await Listing.findByIdAndDelete(id);
   req.flash("success", "Listing Deleted!");
   res.redirect("/listings");
}));


module.exports = router;