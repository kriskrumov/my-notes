var express                         = require("express");
const { check, validationResult }   = require("express-validator");
var router                          = express.Router();
var passport                        = require("passport");
var User                            = require("../models/user");

// ROOT ROUTE
router.get("/", (req, res) => {
    res.render("login");
});

// USER REGISTER FORM
router.get("/register", (req, res) => {
    res.render("register");
});

// REGISTER A USER AND SAVE TO MONGODB
router.post("/register",(req,res) => {
        req.body.username
        req.body.password
        User.register(new User({username: req.body.username}), req.body.password, function(err, user){
            if(err){
                console.log(err);
                return res.render('register');
            }
            passport.authenticate("local")(req, res , function(){
                res.redirect("/");
        });
    });    
});

// LOGIN LOGIC
router.post("/",passport.authenticate("local" ,{
    successRedirect: "/notes",
    failureRedirect: "/"
}) ,function(req, res){
});

// LOGOUT LOGIC
router.get("/logout", function(req, res){
    req.logOut();
    res.redirect("/"); 
});

// MIDLEWARE FUNCTION FOR AUTHENTICATION
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}

module.exports = router;