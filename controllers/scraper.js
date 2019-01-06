const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
var request = require('request');
const router = express.Router();
const Comments = require('../models/comments.js');
const Articles = require('../models/articles.js');


// Routes go below

// Index
router.get('/', (req, res) => {
   Articles.find({}, null, {sort: {_id: -1}}, (err, data) => {
       if(data.length === 0) {
           res.render("empty", {msg: "No articles have been scraped. Click Scrape to get the latest news."})
       } else {
           res.render('index', {articles: data});
       }
   })
});

// Scrape
router.get('/scrape', (req, res) => {
    request('https://www.nytimes.com/section/world', (err, res, html) => {
        let $ = cheerio.load(html);
        let result = {};

        $('div.story-body').each((i, element) => {
            let title = $(element).find('h2.headline').text().trim();
            let summary = $(element).find('p.summary').text().trim();
            let url = $(element).find('a').attr('href');
            let imgUrl = $(element).parent().find('figure.media').find('img').attr('src');
            

            result.title = title;
            result.url = url;

            if(imgUrl) {
                result.imgUrl = imgUrl;
            } else {
                result.imgUrl = $(element).find('.wide-thumb').find('img').attr('src');
            }
            
            if (summary) {
                result.summary = summary;
            };
            
            let newArticle = new Articles(result);
            Articles.find({title: result.title}, (err, data) => {
                if (data.length === 0) {
                    newArticle.save((err, data) => {
                        if (err) {
                            throw err;
                        }
                    });
                };
            });
        });
    });
    res.redirect('/');
});

// Saved articles
router.get('/saved', (req, res) => {
    Articles.find({saved: true}, null, {sort: {_id: -1}}, (err, data) => {
        if(data.length === 0) {
            res.render('empty', {msg: "You haven't saved any articles!"});
        } else {
            res.render('saved', {saved: data});
        }
    })
});

// Function to save articles
router.post('/save/:id', (req, res) => {
    Articles.findById(req.params.id, (err, data) => {
        if (err) throw err;
        if (data.saved) {
            Articles.findByIdAndUpdate(req.params.id, {$set: {saved: false}}, {new: true}, (err, data) => {
                res.redirect('/');
            });
        } else {
            Article.findByIdAndUpdate(req.params.id, {$set: {saved: true}}, {new: true}, (err, data) => {
                res.redirect("/"); 
            });
        }
    })
})

// Display article by ID: can be used for API viewing, also comments
app.get("/:id", (req, res) => {
	Article.findById(req.params.id, (err, data) => {
		res.json(data);
	})
})

// Post a new comment
app.post("/comment/:id", function(req, res) {
	var note = new Comments(req.body);
	note.save((err, data) => {
		if (err) throw err;
		Article.findByIdAndUpdate(req.params.id, {$set: {"comment": doc._id}}, {new: true}, (err, data) => {
			if (err) throw err;
			else {
				res.send(data);
			}
		});
	});
});
module.exports = router;