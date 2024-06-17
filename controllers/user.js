const User = require("../models/user.js");

module.exports.signupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async (req, res,next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if(err) {
             return next(err);
            }
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        });
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};

module.exports.loginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
    req.flash("success","Welcome back to Wanderlust, You are logged in!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout =  (req,res,next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success","Logged you out!");
        res.redirect("/listings");
    });
};

//user profile
module.exports.profile = async (req,res) => {
    let username = req.user.username;
    let currUser = await User.findOne({username : username});
    res.render("users/profile.ejs", {currUser});
}

module.exports.editProfile = async (req,res) => {
    let {id : username} = req.params;
    let userInfo = req.body.currUser;
    let u = await User.findOne({username : username});
    let x = await User.findByIdAndUpdate(u._id, {...userInfo}, {new : true});
    
    if(typeof req.file!=="undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        x.image = {url, filename};
        await x.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/profile`);
};