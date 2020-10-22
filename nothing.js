// ROUTES
///////////////
// app.get("/", (req, res) => {
//     res.render("login");
// });
//////////////

// INDEX - show all Notes
// app.get("/notes",isLoggedIn, (req, res) => {
//     currentUser = req.user;
//     // Get all notes from db
//     Note.find({'userID': req.user._id}, function(err, allNotes){
//         if(err){
//             console.log(err);
//         } else {
//             res.render("notes", {currentUser: req.user , notes:allNotes});
//         }
//     });
// });

// CREATE - creates a new note
// app.post("/notes", function(req, res){
//     req.body.title
//     req.body.content
//     // Create a new Note and save to DB
//     Note.create(({title: req.body.title, content: req.body.content, userID: currentUser, username: req.user.username }), function(err, note){
//         if(err){
//             console.log(err);
//             // return res.render('register');
//         } else {
//             console.log("succesful");
//             res.redirect("/notes");
//         }
//     });   
//     });

// Shows the create a note route if a user is logged in
// app.get("/notes/new",isLoggedIn, (req, res) => {
//     res.render("new.ejs");
// });

// Shows more info about a Note
// app.get("/notes/:id", function(req, res){
//     Note.findById(req.params.id).exec(function(err, foundNote){
//         if(err){
//             console.log(err);
//         } else {
//             console.log(foundNote)
//             res.render("show", {note: foundNote});
//         }
//     });
// });

// Auth Routes

// Sign up route
// app.get("/register", (req, res) => {
//     res.render("register");
// });

// handling user sign up
// app.post("/register", (req,res) => {
//     req.body.username
//     req.body.password
//     User.register(new User({username: req.body.username}), req.body.password, function(err, user){
//         if(err){
//             console.log("error");
//             return res.render('register');
//         }
//         passport.authenticate("local")(req, res , function(){
//             res.redirect("/");
//         });
//     });    
// });

// Login Logic
// app.post("/",passport.authenticate("local",{
//     successRedirect: "/notes",
//     failureRedirect: "/"
// }) ,function(req, res){
// });


// app.get("/logout", function(req, res){
//     req.logOut();
//     res.redirect("/"); 
// });

// EDIT NOTE ROUTE
// app.get("/notes/:id/edit", function(req, res){
//     Note.findById(req.params.id, function(err, foundNote){
//         if(err){
//             res.redirect("notes")
//         } else {
//             res.render("edit", {note: foundNote});
//         }
//     });
// });

// UPDATE NOTE ROUTE

// app.put("/notes/:id", function(req, res){
    
    // find and update the correct note
//     Note.findByIdAndUpdate(req.params.id, req.body.note, function(err, updatedNote){
//         if(err){
//             res.redirect("notes");
//         } else {
//             res.redirect( req.params.id);
//         }
//     })

// });

// DESTROY NOTE ROUTE
// app.delete("/notes/:id", function(req, res){
//     // 
//     Note.findByIdAndRemove(req.params.id, function(err){
//         if(err){
//             res.redirect(err);
//         } else {
//             res.redirect("/notes");
//         }
//     });
// });

// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/");
// }



// SORTING FAIL
// }else if(req.query.sort){
//     Note.find({'userID':req.user._id}, null, {sort: {title: "desc"}}, function (err, allNotes) {
//         res.render("notes", {currentUser:req.user , notes:allNotes});
//     });