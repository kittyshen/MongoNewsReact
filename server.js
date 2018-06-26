const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const routes = require("./routes");
const app = express();
var request = require("request");

var cheerio = require("cheerio");
var db = require("./models");  // this is for the routes directly in server.js file

const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
// app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines");


// routes and controller directly in server.js
app.get("/",function(req,res){
  db.Article.find({}).sort({_id:-1})
  .then(function(dbArticle){
    // res.json(dbArticle);
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
  })
})

app.get("/saved", function(req, res) {
  // TODO: Finish the route so it grabs all of the articles
  db.Article.find({saved:true}).sort({_id:-1})  
  .populate("notes")
  .then(function(dbArticle) {
    res.json(dbArticle);
    // res.render("save",{article:dbArticle});
  })
});

app.get("/scrape", function(req, res) {

  // First, we grab the body of the html with request
  // axios.get("http://www.echojs.com/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
  request("https://www.nytimes.com/section/technology?action=click&pgtype=Homepage&region=TopBar&module=HPMiniNav&contentCollection=Tech&WT.nav=page", function(error, response, html) {

    var $ = cheerio.load(html);
    // Now, we grab every h2 within an article tag, and do the following:
    $("div.story-meta").each(function(i, element) {
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
        .then(function(dbArticle) {
          // View the added result in the console
          if(dbArticle){
            console.log("*******************")
            // console.log(dbArticle);
            counter ++;
            // res.send(dbArticle);

          }
          else 
           return res.send("0");
        })
        .catch(function(err) {
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
app.get("/articles", function(req, res) {
  // TODO: Finish the route so it grabs all of the articles
  db.Article.find({})  
  .populate("notes")
  .then(function(dbArticle) {
    res.json(dbArticle);
  })
});




// Route for grabbing a specific Article by id, populate it with it's note
app.put("/saveArticle/:id", function(req, res) {

  var id = req.params.id;
  db.Article.findOneAndUpdate( {_id:id},{$set:{saved:true}})   //  db.Article.findOne(_id: id)
  // .populate("notes")
  .then(function(dbArticle) {
    res.json(dbArticle);
  })
});

//deleting from saved
app.put("/removeArticle/:id", function(req, res) {
  // var newVal = req.body.saved ; // testing grab value out of updating method through req.body
  var id = req.params.id;
  db.Article.findOneAndUpdate( {_id:id},{$set:{saved:false}})   //  db.Article.findOne(_id: id)
  .populate("notes")
  .then(function(dbArticle) {
    res.json(dbArticle);
  })
});

//route for display a note to a article
app.get("/articles/:id", function(req, res) {

  var id = req.params.id;
  db.Article.findOne( {_id:id})   //  db.Article.findOne(_id: id)
  .populate("notes")
  .then(function(dbArticle) {
    res.json(dbArticle);
  })

});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function(req, res) {

  db.Note.create(req.body)
  .then(function(dbNote) {
    // View the added result in the console
    console.log(dbNote._id);
    return dbNote._id;
  })
  .then(function(data){
    var id = req.params.id;
    console.log(data);  //data contain the new note's id
    return db.Article.findOneAndUpdate({_id:id},{$push:{notes:data}})
    // .then(function(dbArticle) {
    //   res.json(dbArticle);
    // })
  })
  .catch(function(err) {
    // If an error occurred, send it to the client
    return res.json(err);
  });

});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
