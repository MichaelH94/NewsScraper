// Requirements
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080; 
const app = express();
const mongoose = require('mongoose');

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Express configurations
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(express.static(
    "public"
));

// Handlebars
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(require("./controllers/scraper.js"))


app.listen(PORT, ()=> {
    console.log('NewsScraper listening on PORT: ' + PORT)
});