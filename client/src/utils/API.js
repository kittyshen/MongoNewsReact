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
  getArticlesSaved:function(){
    return axios.get("/saved");
  },
  // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.put("/removeArticle/" + id);
  },
  // Saves a article to the database
  saveArticle: function(id) {
    return axios.put("/saveArticle/"+id);
  },

  // saveNote: function(obj,id) {
  //   return axios.post("/saveArticle/"+id,obj);
  // }
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
