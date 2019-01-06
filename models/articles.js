// Require Mongoose for database manipulation
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

// New Schema for Mongoose
let articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    summary: {
        type: String
    },
    url: {
        type: String,
        required: true
    },

    imgURL: {
        type: String,
        default: "/assets/images/not-found.png"
    },

    saved: {
        type: Boolean,
        default: false
    },
    
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comments"
    }

});

let Articles = mongoose.model("Articles", articleSchema);

module.exports = Articles;