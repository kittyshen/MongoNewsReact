import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import ScrapeBtn from "../../components/ScrapeBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import "./Save.css"

class Save extends Component {
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
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data})
      )
      .catch(err => console.log(err));
  }

  // handleInputChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   if (this.state.title && this.state.author) {
  //     API.saveBook({
  //       title: this.state.title,
  //       author: this.state.author,
  //       synopsis: this.state.synopsis
  //     })
  //       .then(res => this.loadArticles())
  //       .catch(err => console.log(err));
  //   }
  // };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron >
              <h2>Saved Articles</h2>
              {/* <ScrapeBtn onClick={this.scrapeArticles}/> */}
            </Jumbotron>
          </Col>
          <Col size="sm-12">

            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <Link to={"/articles/" + article._id}>
                      <strong>
                        {article.title}  
                      </strong>
                      <span>{article.summary}</span>
                    </Link>

                    <DeleteBtn onClick={() => this.deletearticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>Meow Meow</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Save;