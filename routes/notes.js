const { text }  = require("body-parser");
var express     = require("express");
var router      = express.Router();
var Note        = require("../models/note");
var User        = require("../models/user");

// INDEX - SHOW ALL NOTES
router.get("/",isLoggedIn, (req, res) => {
    // SEARCH FOR A SPECIFIC NOTE WITH THE TITLE EITHER WITH FULL STRING OR WITH MATHING CHARACTERS)
    currentUser = req.user;
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Note.find({'userID': req.user._id, title: regex}, function(err, allNotes){
            if(err){
                console.log(err);
            } else {
                res.render("notes", {currentUser: req.user , notes:allNotes});
            }
        });
    } else {
    // GET ALL NOTES FROM MONGODB FOR THE CURRENT USER
    Note.find({'userID': req.user._id}, function(err, allNotes){
        if(err){
            console.log(err);
        } else {
            res.render("notes", {currentUser: req.user , notes:allNotes});
        }
    });
}
});

// CREATES A NEW NOTE AND SAVE TO MONGODB
router.post("/", function(req, res){
    req.body.title
    req.body.content
    Note.create(({title: req.body.title, content: req.body.content, userID: currentUser, username: req.user.username }), function(err, note){
        if(err){
            console.log(err);
            // return res.render('register');
        } else {
            console.log("succesful");
            res.redirect("/notes");
        }
    });   
    });

// SHOWS THE CREATE NEW NOTE FORM IF A USER IS LOGGED IN
router.get("/new",isLoggedIn, (req, res) => {
    res.render("new.ejs");
});

// SHOWS MORE INFO ABOUT A NODE
router.get("/:id", function(req, res){
    Note.findById(req.params.id).exec(function(err, foundNote){
        if(err){
            console.log(err);
        } else {
            console.log(foundNote)
            res.render("show", {note: foundNote});
        }
    });
});

// EDIT NOTE ROUTE
router.get("/:id/edit", function(req, res){
    Note.findById(req.params.id, function(err, foundNote){
        if(err){
            res.redirect("notes")
        } else {
            res.render("edit", {note: foundNote});
        }
    });
});

// UPDATE NOTE ROUTE
router.put("/:id", function(req, res){
    //FIND AND UPDATE THE CORRECT NOTE
    Note.findByIdAndUpdate(req.params.id, req.body.note, function(err, updatedNote){
        if(err){
            res.redirect("notes");
        } else {
            res.redirect( req.params.id);
        }
    })

});

//DESTROY NOTE ROUTE
router.delete("/:id", function(req, res){
    Note.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect(err);
        } else {
            res.redirect("/notes");
        }
    });
});

// MIDLEWARE FUNCTION FOR AUTHENTICATION
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}

// REGULAR EXPRESSION FUNCTION FOR SPECIFIENG USER INPUT(FINDS NOTES BY MATHING CHARACTER)
function escapeRegex(text) {
    return text.replace();
}

module.exports = router;
