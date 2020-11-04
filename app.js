var  express                     = require('express'),
     mongoose                    = require('mongoose'),
     flash                       = require('connect-flash'),
     passport                    = require('passport'),
     bodyParser                  = require('body-parser'),
     methodOverride              = require("method-override"),
     User                        = require('./models/user'),    
     LocalStrategy               = require('passport-local')

var noteRoutes                   = require("./routes/notes"),
    indexRoutes                  = require("./routes/index");

// MONGOOSE CONFIG AND CONNECTING TO THE MONGODB
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/my_notes_demo");
var PORT = 3000

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "NotesAppSecret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/public', express.static('public'));
app.use(methodOverride("_method"));
app.use(flash());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/notes", noteRoutes);
app.use(indexRoutes);

app.listen(PORT, () => {
    console.log("Server is running");
});