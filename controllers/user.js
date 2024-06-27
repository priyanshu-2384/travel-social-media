const User = require("../models/user.js");

module.exports.signupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
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
    req.flash("success", "Welcome back to Wanderlust, You are logged in!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged you out!");
        res.redirect("/listings");
    });
};

//user profile
module.exports.profile = async (req, res) => {
    let username = req.user.username;
    let currUser = await User.findOne({ username: username });
    res.render("users/profile.ejs", { currUser });
}

module.exports.editProfile = async (req, res) => {
    let { id: username } = req.params;
    let userInfo = req.body.currUser;
    let u = await User.findOne({ username: username });
    let x = await User.findByIdAndUpdate(u._id, { ...userInfo }, { new: true });

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        x.image = { url, filename };
        await x.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/profile`);
};

//User profile by username
module.exports.userProfile = async (req, res) => {
    let { id: username } = req.params;
    let flag = false;
    if (typeof res.locals.currUser !== 'undefined') {
        let currUser = await User.findOne({ username: res.locals.currUser.username }).populate("following");
        let isFollow = () => {
            for (let i = 0; i < currUser.following.length; i++) {
                if (currUser.following[i].username == username) {
                    return 1;
                }
            }
            return 0;
        }
        flag = isFollow();
    }
    let user = await User.findOne({ username: username }).populate("posts");
    res.render("users/userProfile.ejs", { user, flag });

}

//user follow

module.exports.userFollow = async (req, res) => {
    try {
        let { id: username } = req.params;
        let user = await User.findOne({ username: username });
        let currUser = await User.findOne({ username: res.locals.currUser.username }).populate("following");
        if (user.username == currUser.username) {
            return res.status(400).json({ message: "You cannot follow yourself." });
        }
        user.followers.push(currUser);
        user.save();
        currUser.following.push(user);
        currUser.save();
        res.status(200).json({ followersCount: user.followers.length })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while trying to follow the user." });
    }
}

module.exports.userUnfollow = async (req, res) => {
    try {
        let { id: username } = req.params;
        let user = await User.findOne({ username: username }).populate("followers");
        let currUser = await User.findOne({ username: res.locals.currUser.username }).populate("following");
        if (user.username == currUser.username) {
            return res.status(400).json({ message: "You cannot follow yourself." });;
        }
        for (let i = user.followers.length - 1; i >= 0; i--) {
            if (user.followers[i].username == currUser.username) {
                user.followers.splice(i, 1); // Remove the element at index i
            }
        }
        user.save();
        for (let i = currUser.following.length - 1; i >= 0; i--) {
            if (currUser.following[i].username == user.username) {
                currUser.following.splice(i, 1); // Remove the element at index i
            }
        }
        currUser.save();
        res.status(200).json({ followersCount: user.followers.length });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while trying to unfollow the user." });
    }
}