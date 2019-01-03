// Require Mongoose for database manipulation
const mongoose = require('mongoose');
let Schema = mongoose.Schema;


// New Schema for Mongoose
let commentSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: "John Doe"
    },
    comment: {
        type: String,
        required: true
    }
});

let Comments = mongoose.model("Comments", commentSchema);

module.exports = Comments;