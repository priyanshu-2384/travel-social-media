const express = require('express');
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const {saveRedirectUrl} = require('../middleware.js');
const userController = require('../controllers/user.js');
//Get request Signup
router.get("/signup",userController.signupForm);

//Post request Signup
router.post("/signup", wrapAsync(userController.signup));

//Get request Login
router.get("/login", userController.loginForm);

//Post request Login
//in the post request we have used passport.authenticate() middleware, which will check whether the user exists in the database or not 
router.post("/login",saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), wrapAsync(userController.login));

router.get("/logout",);

module.exports = router;