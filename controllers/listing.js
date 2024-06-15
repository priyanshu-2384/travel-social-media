const Booking = require("../models/booking.js");
const Listing = require("../models/listing.js");

module.exports.index = async(req,res) => {
    let allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};

module.exports.filter = async(req,res) => {
    let min = 0;
    let max = 1000000000;
    if(req.body.from && req.body.to) {
      min = req.body.from;
      max = req.body.to;
    }
    let totalListings = await Listing.find({});
    let allListings = [];
    for(let listing of totalListings) {
        if(listing.price>=min && listing.price<=max) {
         allListings.push(listing);
        }
    }
    res.render("listings/index.ejs",{ allListings });
}

module.exports.createListingForm = (req,res) => {
    res.render("listings/new.ejs");
};

module.exports.filterShow = (req,res) => {
    res.render("filters/filterByPrice.ejs");
 };

module.exports.mostReviewed = async (req,res) => {
    let allListings = await Listing.find();
    allListings.sort((a,b) => {
       return b.reviews.length-a.reviews.length;
    });
    res.render("listings/index.ejs",{allListings});
};

module.exports.showListings = async (req,res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id).populate({path:"reviews",populate : { path: "author"}}).populate("owner");  //nested Population is used here (listing -> reviews -> author)
    if(!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{ listing });
};

module.exports.createListing = async (req,res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    let listing = req.body.listing;
    let newListing = new Listing(listing);
    newListing.owner = req.user._id;  //When user will create a post we will take id of user from sessions and assign that id as owner of the listing
    newListing.image = { url, filename };
    await newListing.save();
    console.log(newListing);
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

module.exports.editListingForm = async (req,res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      res.redirect("/listings");
    }
    let originalUrl = listing.image.url;
    originalUrl = originalUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs",{listing,originalUrl});
};

module.exports.editListing = async (req,res) => {
    let {id} = req.params;
    let listing = req.body.listing;
    let x = await Listing.findByIdAndUpdate(id, {...listing}, {new : true});
    
    if(typeof req.file!=="undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        x.image = { url, filename };
        console.log(x);
        await x.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req,res)=>{
    let {id} = req.params;
    let l = await Listing.findByIdAndDelete(id);
    await Booking.deleteMany({listing:l._id});
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};

module.exports.search = async (req,res) => {
    let country = req.body.country;
    let listings = await Listing.find({}); 
    let allListings = []
    for(let l of listings) {
       if(l.country==country) {
         allListings.push(l);
       }
    }
    res.render("listings/index.ejs",{ allListings });
}