// Requirements
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const PORT = process.env.PORT || 8080; 
const app = express();

// Express configurations
app.use(express.urlencoded({
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
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

const scraper = require("./controllers/scraper.js");

app.use(scraper, express)

app.listen(PORT, ()=> {
    console.log('NewsScraper listening on PORT: ' + PORT)
});