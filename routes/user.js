const express = require('express');
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const {saveRedirectUrl} = require('../middleware.js');
const userController = require('../controllers/user.js');
const {isLoggedIn, isOwner} = require("../middleware.js");
const multer = require('multer');
const {storage} = require('../cloudConfig.js');
const upload = multer({storage});   //multer will save the uploads , which are done using it in the cloud storage of cloudinary

//Get request Signup
router.get("/signup",userController.signupForm);

//Post request Signup
router.post("/signup", wrapAsync(userController.signup));

//Get request Login
router.get("/login", userController.loginForm);

//Post request Login
//in the post request we have used passport.authenticate() middleware, which will check whether the user exists in the database or not 
router.post("/login",saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), wrapAsync(userController.login));

router.get("/logout",userController.logout);
//User profile route get request
router.get("/profile",isLoggedIn, wrapAsync(userController.profile));
//User Profile put request
router.put("/profile/:id",isLoggedIn, upload.single('currUser[image]'),wrapAsync(userController.editProfile));




module.exports = router;