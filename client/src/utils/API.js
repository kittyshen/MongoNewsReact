import axios from "axios";

export default {
  // Gets all articles
  getArticles: function() {
    return axios.get("/articles");
  },
  scrapeArticles:function(){
    return axios.get("/scrape");
  },
  // Gets the article with the given id
  getArticle: function(id) {
    return axios.get("/articles/" + id);
  },
  // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.delete("/articles/" + id);
  },
  // Saves a article to the database
  saveArticle: function(id) {
    return axios.post("/articles"+id);
  }
};
