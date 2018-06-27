import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import ModalContainer from "../../components/ModalContainer";
import API from "../../utils/API";
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
    API.getArticlesSaved()
      .then(res =>
        this.setState({ articles: res.data})
      )
      .catch(err => console.log(err));
  };

  deleteArticle = (id) =>{
    API.deleteArticle(id)
    .then(res =>
      this.loadArticles()
    )
    .catch(err => console.log(err));
  };


  // saveNote = (id) =>{
  //   API.saveNote(id)
  //   .then(res =>
  //     this.loadArticles()
  //   )
  //   .catch(err => console.log(err));
  // };


  // saveNote = () => {
  //   console.log('hi')
  // }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron >
              <h2 style={{color:"white"}}>Saved Articles</h2>
              {/* <ScrapeBtn onClick={this.scrapeArticles}/> */}
            </Jumbotron>
          </Col>
          <Col size="sm-12">

            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <h4>
                      {article.title}  
                      <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                    </h4>
                    <span>{article.summary}</span>
                    <a href= {article.link}>  {article.link} </a>
                    <br/>
                    <ModalContainer id={article._id} />


                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>Meow Meow, nothing saved</h3>
            )}
          </Col>
        </Row>
        
      </Container>
    );
  }
}

export default Save;
