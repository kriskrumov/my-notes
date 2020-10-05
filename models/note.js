var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
const user = require('./user');
// const user = require('./user');

var NoteSchema = new mongoose.Schema({
    title: String,
    content: String,   
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    username: String
});

// NoteSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Note", NoteSchema);
