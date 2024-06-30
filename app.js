if (process.env.NODE_ENV != "production") {
    require('dotenv').config();   // save enviornment variables from env file to process.env
}

const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const port = 8080;
const ExpressError = require("./utils/ExpressError.js");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const session = require("express-session");
const MongoStore = require('connect-mongo');

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const bookingRouter = require("./routes/booking.js");
const allBookingsRouter = require("./routes/allBookings.js");

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const MONGO_URL = process.env.ATLASDB_URL;
const dBUrl = process.env.ATLASDB_URL;

async function main() {
    await mongoose.connect(dBUrl);
}
main().then(() => {
    console.log("Successfully Connected to DB");
}).catch((err) => {
    console.log(err);
});

const store = MongoStore.create({
    mongoUrl: dBUrl,      //stored in this database, the database which this url indicates(here cloud, we can also have the local computer one url)
    crypto: {
        secret: process.env.SECRET,
    },
    //session details is saved in browser
    touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("ERROR IN MONGO SESSION STORE", err);
});

const sessionOptions = {
    store: store,     //session details is stored in store database 
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};

app.use(session(sessionOptions));    //Included sessions in which will create new sessiion with unique users in different browsers
app.use(flash());     // use to display a message for only one time , stored in browser memory only until one time displayed

//passport initialisation which is helping in authentication
app.use(passport.initialize());    //session realted all information is tsore because of these 5 lines
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use( async (req, res, next) => {      //This middleware is used to store the session details in req.local(temp memory in browser) so that we can use it in ejs files also
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    res.locals.currentPath = req.path;
    next();
});

app.use("/listings", listingsRouter);    //use listings(required above from routes folder) whenever /listings comes
app.use("/listings/:id/reviews", reviewsRouter);  //use reviews(required above from routes folder) whenever /listings/:id/reviews comes
app.use("/", userRouter);
app.use("/listings/:id/booking", bookingRouter);
app.use("/plan", allBookingsRouter);


app.get("*", (req, res, next) => {
    next(new ExpressError(405, "Page Not Found"));
});

app.use((err, req, res, next) => {
    let { statuscode = 500, message = "Something went wrong" } = err;
    res.status(statuscode).render("error.ejs", { message });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});