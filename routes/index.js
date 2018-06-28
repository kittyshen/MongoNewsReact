const path = require("path");
const router = require("express").Router();
// const apiRoutes = require("./api");

// API Routes
// router.use("/api", apiRoutes);

var request = require("request");

var cheerio = require("cheerio");
var db = require("../models");


router.get("/", function (req, res) {
  db.Article.find({}).sort({ _id: -1 })
    .then(function (dbArticle) {
      res.json(dbArticle);
      // res.sendFile(path.join(__dirname, "../client/build/index.html"));
    })
})

router.get("/saved", function (req, res) {
  // TODO: Finish the route so it grabs all of the articles
  db.Article.find({ saved: true }).sort({ _id: -1 })
    .populate("notes")
    .then(function (dbArticle) {
      res.json(dbArticle);
      // res.render("save",{article:dbArticle});
    })
});

router.get("/scrape", function (req, res) {
  // First, we grab the body of the html with request
  // axios.get("http://www.echojs.com/").then(function(response) {
  // Then, we load that into cheerio and save it to $ for a shorthand selector
  request("https://www.nytimes.com/section/technology?action=click&pgtype=Homepage&region=TopBar&module=HPMiniNav&contentCollection=Tech&WT.nav=page", function (error, response, html) {

    var $ = cheerio.load(html);
    // Now, we grab every h2 within an article tag, and do the following:
    $("div.story-meta").each(function (i, element) {
      // Save an empty result object
      var result = {};
      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("h2.headline")
        .text();
      result.summary = $(this)
        .children("p.summary")
        .text();
      result.link = $(this)
        .parent("a")
        .attr("href");
      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function (dbArticle) {
          // View the added result in the console
          if (dbArticle) {
            console.log("*******************")
            // console.log(dbArticle);
            counter++;
            // res.send(dbArticle);
          }
          else
            return res.send("0");
        })
        .catch(function (err) {
          // If an error occurred, send it to the client
          console.log(err);
          res.json(err);
          // return res.send("no new articles");
        });
    })
    // If we were able to successfully scrape and save an Article, send a message to the client
    // res.send("Scrape Complete");
  })
  // res.send("Scrape Complete");
});

// Route for getting all Articles from the db
router.get("/articles", function (req, res) {
  // TODO: Finish the route so it grabs all of the articles
  db.Article.find({})
    .populate("notes")
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
});

// Route for grabbing a specific Article by id, populate it with it's note
router.put("/saveArticle/:id", function (req, res) {

  var id = req.params.id;
  db.Article.findOneAndUpdate({ _id: id }, { $set: { saved: true } })   //  db.Article.findOne(_id: id)
    // .populate("notes")
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
});

//deleting from saved
router.put("/removeArticle/:id", function (req, res) {
  // var newVal = req.body.saved ; // testing grab value out of updating method through req.body
  var id = req.params.id;
  db.Article.findOneAndUpdate({ _id: id }, { $set: { saved: false } })   //  db.Article.findOne(_id: id)
    .populate("notes")
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
});

//route for display a note to a article
router.get("/articles/:id", function (req, res) {

  var id = req.params.id;
  db.Article.findOne({ _id: id })   //  db.Article.findOne(_id: id)
    .populate("notes")
    .then(function (dbArticle) {
      res.json(dbArticle);
    })

});

// Route for saving/updating an Article's associated Note
router.post("/articles/:id", function (req, res) {

  db.Note.create(req.body)
    .then(function (dbNote) {
      // View the added result in the console
      console.log(dbNote._id);
      return dbNote._id;
    })
    .then(function (data) {
      var id = req.params.id;
      console.log(data);  //data contain the new note's id
      return db.Article.findOneAndUpdate({ _id: id }, { $push: { notes: data } })
      // .then(function(dbArticle) {
      //   res.json(dbArticle);
      // })
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      return res.json(err);
    });

});

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
