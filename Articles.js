import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import ScrapeBtn from "../../components/ScrapeBtn";
import SaveBtn from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import "./Articles.css"
import swal from "sweetalert"

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

  scrapeArticles = () =>{
    API.scrapeArticles()
      .then(res =>{
        // alert("scrape complete! ");

        swal("Good job!", "scrape complete! ", "success");
        this.loadArticles();
      })
      .catch(err => console.log(err));
  }


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron >
              <ScrapeBtn onClick={() => this.scrapeArticles()}/>
            </Jumbotron>
          </Col>
          <Col size="sm-12">

            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                      <h4>
                        {article.title}  
                        <SaveBtn onClick={() => this.saveArticle(article._id)} />

                      </h4>

                      <span>{article.summary}</span>
                    <a href= {article.link}>  {article.link} </a>
                    {/* <Link to={"/articles/" + article._id}>

                    </Link> */}

                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
