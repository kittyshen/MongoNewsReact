# MongoNewsReact

build a react version of mongo news.


### Technologe used
1. reactjs
2. express
3. mongoose
4. body-parser
5. axios
6. request
7. sweetalert
8. react-router-dom
9. react-responsive-modal


### Deployment Notes
1. set the port on server.js to
```js
const PORT = process.env.PORT || 8080;
```
2. Run this command in your Terminal/Bash window:

    * `heroku addons:create mongolab`

    * This command will add the free mLab provision to your project.

3. When you go to connect your mongo database to mongoose, do so the following way:

```js
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
```

### Instructions

* Create an app that accomplishes the following:

  1. Whenever a user visits your site, the app should scrape stories from a news outlet of your choice and display them for the user. Each scraped article should be saved to your application database. At a minimum, the app should scrape and display the following information for each article:

     * Headline - the title of the article

     * Summary - a short summary of the article

     * URL - the url to the original article

     * Feel free to add more content to your database (photos, bylines, and so on).

  2. Users should also be able to leave comments on the articles displayed and revisit them later. The comments should be saved to the database as well and associated with their articles. Users should also be able to delete comments left on articles. All stored comments should be visible to every user.


### Helpful Links

* [MongoDB Documentation](https://docs.mongodb.com/manual/)
* [Mongoose Documentation](http://mongoosejs.com/docs/api.html)
* [Cheerio Documentation](https://github.com/cheeriojs/cheerio)

## learning points

```js
//react module format quick reference
import React from "react";
import "./Note.css";
// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const Note = props => (
  <span className="btn btn-info" {...props}>
   Leave Note
  </span>
);
export default Note;
```

```js
//git heroku related commands
git remote rm heroku
heroku create
git remote -v
heroku apps:rename abcdefg
heroku addons:create mongolab
heroku config:get MONGODB_URI
heroku logs -t
```

```js
//axios front end ajax call quick reference

import axios from "axios";

export default {
  saveArticle: function(id) {
    return axios.put("/saveArticle/"+id);
  },

  saveNote: function(obj,id) {
    return axios({
      method: 'post',
      url: "/articles/"+id,
      data: obj
    }).then(function (response) {
      //handle success
      console.log(response);
    }).catch(function (response) {
      //handle error
      console.log(response);
    });
  }
};
```

```js
// react components with state class syntax quick ref
import API from "../../utils/API";

class Articles extends Component {
  state = {
    articles: [],
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data})
      )
      .catch(err => console.log(err));
  };

  saveArticle = id => {
    API.saveArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
      ...
      <List>
        {this.state.articles.map(article => (
            <ListItem key={article._id}>
                <h4>
                {article.title}  
                <SaveBtn onClick={() => this.saveArticle(article._id)} />
                </h4>
                <span>{article.summary}</span>
            <a href= {article.link}>  {article.link} </a>
            </ListItem>
        ))}
      </List>
      ...
      </Container>
    )   
  }
}
```

```js
// react router usage example need to use <Link> for all nav bar
const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Articles} />
        <Route exact path="/saved" component={Save} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
```

```js
//formbtn example
import React from "react";

export const FormBtn = props => (
  <button {...props} style={{ float: "right", marginBottom: 10 }} className="btn btn-success">
    {props.children}
  </button>
);

```

```js
//es6 template literal and map example 
<div>
    {this.state.notes.map(note => (
    <li key={note._id}>
        <h6>{`${note.title} says:` }</h6>
        <span>{note.body}</span>
    </li>
    ))}
</div>
```


## Link to the site
[https://kitty-reactmongonews.herokuapp.com](https://kitty-reactmongonews.herokuapp.com)

## Author 
[Kitty Shen ](https://github.com/kittyshen)

https://github.com/kittyshen

### [Link to Portfolio Site](https://kittyshen.github.io/Portfolio/)

## License
Standard MIT License
