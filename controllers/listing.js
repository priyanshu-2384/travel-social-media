const Booking = require("../models/booking.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

module.exports.index = async (req, res) => {
    let allListings = await Listing.find({}).populate("owner").populate("likedBy").populate("bookmarkedBy");
    let likeFlags = [];
    let bookmarkFlags = [];
    for (let i = 0; i < allListings.length; i++) {
        likeFlags[i] = false;
        bookmarkFlags[i] = false;
    }
    if (typeof res.locals.currUser !== 'undefined') {
        let currUser = res.locals.currUser;
        for (let i = 0; i < allListings.length; i++) {
            for (let j = 0; j < allListings[i].likedBy.length; j++) {
                if (allListings[i].likedBy[j].username == currUser.username) {
                    likeFlags[i] = true;
                    break;
                }
            }
        }

        for (let i = 0; i < allListings.length; i++) {
            for (let j = 0; j < allListings[i].bookmarkedBy.length; j++) {
                if (allListings[i].bookmarkedBy[j].username == currUser.username) {
                    bookmarkFlags[i] = true;
                    break;
                }
            }
        }
    }
    res.render("listings/index.ejs", { allListings,likeFlags,bookmarkFlags,category : "Recent Posts" });
};

module.exports.filter = async (req, res) => {
    let min = 0;
    let max = 1000000000;
    if (req.body.from && req.body.to) {
        min = req.body.from;
        max = req.body.to;
    }
    let totalListings = await Listing.find({}).populate("owner").populate("likedBy").populate("bookmarkedBy");
    let allListings = [];
    for (let listing of totalListings) {
        if (listing.price >= min && listing.price <= max) {
            allListings.push(listing);
        }
    }

    let likeFlags = [];
    let bookmarkFlags = [];
    for (let i = 0; i < allListings.length; i++) {
        likeFlags[i] = false;
        bookmarkFlags[i] = false;
    }
    if (typeof res.locals.currUser !== 'undefined') {
        let currUser = res.locals.currUser;
        for (let i = 0; i < allListings.length; i++) {
            for (let j = 0; j < allListings[i].likedBy.length; j++) {
                if (allListings[i].likedBy[j].username == currUser.username) {
                    likeFlags[i] = true;
                    break;
                }
            }
        }

        for (let i = 0; i < allListings.length; i++) {
            for (let j = 0; j < allListings[i].bookmarkedBy.length; j++) {
                if (allListings[i].bookmarkedBy[j].username == currUser.username) {
                    bookmarkFlags[i] = true;
                    break;
                }
            }
        }
    }

    res.render("listings/index.ejs", { allListings,likeFlags,bookmarkFlags });
}

module.exports.createListingForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.filterShow = (req, res) => {
    res.render("filters/filterByPrice.ejs");
};

module.exports.mostReviewed = async (req, res) => {
    let allListings = await Listing.find().populate("owner").populate("likedBy").populate("bookmarkedBy");
    allListings.sort((a, b) => {
        return (a.reviews.length+a.likedBy.length+a.bookmarkedBy.length) - (b.reviews.length+b.likedBy.length+b.bookmarkedBy.length);
    });
    
    let likeFlags = [];
    let bookmarkFlags = [];
    for (let i = 0; i < allListings.length; i++) {
        likeFlags[i] = false;
        bookmarkFlags[i] = false;
    }
    if (typeof res.locals.currUser !== 'undefined') {
        let currUser = res.locals.currUser;
        for (let i = 0; i < allListings.length; i++) {
            for (let j = 0; j < allListings[i].likedBy.length; j++) {
                if (allListings[i].likedBy[j].username == currUser.username) {
                    likeFlags[i] = true;
                    break;
                }
            }
        }

        for (let i = 0; i < allListings.length; i++) {
            for (let j = 0; j < allListings[i].bookmarkedBy.length; j++) {
                if (allListings[i].bookmarkedBy[j].username == currUser.username) {
                    bookmarkFlags[i] = true;
                    break;
                }
            }
        }
    }

    res.render("listings/index.ejs", { allListings, likeFlags, bookmarkFlags, category : "Trending"});
};

module.exports.showListings = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({ path: "reviews", populate: [{ path: "author"},{ path : "replies", populate : "author"}]}).populate("owner").populate("likedBy").populate("bookmarkedBy");  //nested Population is used here (listing -> reviews -> author)
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    let likeFlag = false;
    let bookmarkFlag = false;
    if (typeof res.locals.currUser !== 'undefined') {
        let currUser = res.locals.currUser;
            for (let j = 0; j < listing.likedBy.length; j++) {
                if (listing.likedBy[j].username == currUser.username) {
                    likeFlag = true;
                    break;
                }
            }

            for (let j = 0; j < listing.bookmarkedBy.length; j++) {
                if (listing.bookmarkedBy[j].username == currUser.username) {
                    bookmarkFlag = true;
                    break;
                }
            }
        }
    res.render("listings/show.ejs", { listing, likeFlag, bookmarkFlag });
};

module.exports.createListing = async (req, res) => {
    let images = req.files.map(file => ({
        url: file.path,
        filename: file.filename
    }));
    let listingData = req.body.listing;
    let newListing = new Listing({
        ...listingData,
        owner: req.user._id,
        image: { list: images }
    });
    await newListing.save();

    let user = await User.findOne({ username: res.locals.currUser.username });
    user.posts.push(newListing);
    await user.save();

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};


module.exports.editListingForm = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Post you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing});
};

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    let listing = req.body.listing;
    let x = await Listing.findByIdAndUpdate(id, { ...listing }, { new: true });
    req.flash("success", "Post Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndDelete(id).populate("owner");

    await Booking.deleteMany({ listing: listing._id });

    let user = await User.findOne({ username: listing.owner.username }).populate("posts");
    user.posts = user.posts.filter(post => post._id.toString() !== listing._id.toString());
    await user.save();

    req.flash("success", "Post Deleted!");
    res.redirect("/listings");
};


module.exports.search = async (req, res) => {
    let location = req.body.location;
    let listings = await Listing.find({}).populate("owner").populate("likedBy").populate("bookmarkedBy");
    let allListings = []
    for (let l of listings) {
        if (l.location.toLowerCase() == location.toLowerCase()) {
            allListings.push(l);
        }
    }
    let likeFlags = [];
    let bookmarkFlags = [];
    for (let i = 0; i < allListings.length; i++) {
        likeFlags[i] = false;
        bookmarkFlags[i] = false;
    }
    if (typeof res.locals.currUser !== 'undefined') {
        let currUser = res.locals.currUser;
        for (let i = 0; i < allListings.length; i++) {
            for (let j = 0; j < allListings[i].likedBy.length; j++) {
                if (allListings[i].likedBy[j].username == currUser.username) {
                    likeFlags[i] = true;
                    break;
                }
            }
        }

        for (let i = 0; i < allListings.length; i++) {
            for (let j = 0; j < allListings[i].bookmarkedBy.length; j++) {
                if (allListings[i].bookmarkedBy[j].username == currUser.username) {
                    bookmarkFlags[i] = true;
                    break;
                }
            }
        }
    }

    res.render("listings/index.ejs", { allListings, likeFlags, bookmarkFlags, category : `Searched for ${location}`});
}

module.exports.like = async (req, res) => {
    try {
        let { id } = req.params;
        let user = await User.findOne({ username: res.locals.currUser.username });
        let listing = await Listing.findById(id);
        user.liked.push(listing);
        user.save();
        console.log(user.username);
        listing.likedBy.push(user);
        listing.save();
        res.status(200).json({ likesCount: listing.likedBy.length });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while trying to like the post" });
    }
}

module.exports.unlike = async (req, res) => {
    try {
        let { id } = req.params;
        let user = await User.findOne({ username: res.locals.currUser.username }).populate("liked");
        let listing = await Listing.findById(id).populate("likedBy");

        for (let i = user.liked.length - 1; i >= 0; i--) {
            console.log(user.liked[i]._id);
            console.log(listing._id);
            if (user.liked[i]._id.toString() == listing._id.toString()) {
                user.liked.splice(i, 1); // Remove the element at index i
                break;
            }
        }
        user.save();
        for (let i = listing.likedBy.length - 1; i >= 0; i--) {
            if (listing.likedBy[i].username == user.username) {
                listing.likedBy.splice(i, 1); // Remove the element at index i
                break;
            }
        }
        listing.save();
        res.status(200).json({ likesCount: listing.likedBy.length });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while trying to unlike the post" });
    }
}

module.exports.bookmark = async (req, res) => {
    try {
        let { id } = req.params;
        let user = await User.findOne({ username: res.locals.currUser.username });
        let listing = await Listing.findById(id);
        user.bookmarks.push(listing);
        user.save();
        listing.bookmarkedBy.push(user);
        listing.save();
        res.status(200).json({ bookmarksCount: listing.bookmarkedBy.length });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while trying to bookmark the post" });
    }
}

module.exports.unbookmark = async (req, res) => {
    try {
        let { id } = req.params;
        let user = await User.findOne({ username: res.locals.currUser.username }).populate("bookmarks");
        let listing = await Listing.findById(id).populate("bookmarkedBy");

        for (let i = user.bookmarks.length - 1; i >= 0; i--) {
            if (user.bookmarks[i]._id.toString() == listing._id.toString()) {
                user.bookmarks.splice(i, 1); // Remove the element at index i
                break;
            }
        }
        user.save();
        for (let i = listing.bookmarkedBy.length - 1; i >= 0; i--) {
            if (listing.bookmarkedBy[i].username == user.username) {
                listing.bookmarkedBy.splice(i, 1); // Remove the element at index i
                break;
            }
        }
        listing.save();
        res.status(200).json({ bookmarksCount: listing.bookmarkedBy.length });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while trying to unbookmark the post" });
    }
}

module.exports.sortByCategory = async (req,res) => {
    let {id} = req.params;
    let allListings = await Listing.find({category : id}).populate("owner").populate("likedBy").populate("bookmarkedBy");
    let likeFlags = [];
    let bookmarkFlags = [];
    for (let i = 0; i < allListings.length; i++) {
        likeFlags[i] = false;
        bookmarkFlags[i] = false;
    }
    if (typeof res.locals.currUser !== 'undefined') {
        let currUser = res.locals.currUser;
        for (let i = 0; i < allListings.length; i++) {
            for (let j = 0; j < allListings[i].likedBy.length; j++) {
                if (allListings[i].likedBy[j].username == currUser.username) {
                    likeFlags[i] = true;
                    break;
                }
            }
        }

        for (let i = 0; i < allListings.length; i++) {
            for (let j = 0; j < allListings[i].bookmarkedBy.length; j++) {
                if (allListings[i].bookmarkedBy[j].username == currUser.username) {
                    bookmarkFlags[i] = true;
                    break;
                }
            }
        }
    }
    res.render("listings/index.ejs", { allListings,likeFlags,bookmarkFlags,category : id});
}


module.exports.myBookmarks = async (req, res) => {
    let currUser = await User.findOne({username : res.locals.currUser.username});
    let allListings = await Listing.find({ bookmarkedBy: { $in: [currUser._id] } }).populate("owner").populate("likedBy").populate("bookmarkedBy");
    let likeFlags = [];
    let bookmarkFlags = [];
    for (let i = 0; i < allListings.length; i++) {
        likeFlags[i] = false;
        bookmarkFlags[i] = false;
    }
    if (typeof res.locals.currUser !== 'undefined') {
        let currUser = res.locals.currUser;
        for (let i = 0; i < allListings.length; i++) {
            for (let j = 0; j < allListings[i].likedBy.length; j++) {
                if (allListings[i].likedBy[j].username == currUser.username) {
                    likeFlags[i] = true;
                    break;
                }
            }
        }

        for (let i = 0; i < allListings.length; i++) {
            for (let j = 0; j < allListings[i].bookmarkedBy.length; j++) {
                if (allListings[i].bookmarkedBy[j].username == currUser.username) {
                    bookmarkFlags[i] = true;
                    break;
                }
            }
        }
    }
    res.render("listings/index.ejs", { allListings,likeFlags,bookmarkFlags,category : "Your Bookmarks" });
};

