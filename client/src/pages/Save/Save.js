import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Note from "../../components/Note";
import Jumbotron from "../../components/Jumbotron";
import ModalContainer from "../../components/ModalContainer";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import "./Save.css"
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';

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

  popNote = () =>{

  };

  saveNote = (id) =>{
    API.saveNote(id)
    .then(res =>
      this.loadArticles()
    )
    .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadArticles())
        .catch(err => console.log(err));
    }
  };

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
                    <Note onClick={this.popNote} />

                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>Meow Meow, nothing saved</h3>
            )}
          </Col>
        </Row>
        <Row>
          <div className="modal" tabindex="-1" id="NoteModal" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className=" text-center modal-title">Note</h4>
                  <button type="button" id="NoteClose" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
        
                <div className="modal-body">
                  
                  <form id="Form">
                    <div className="form-group">
                    <div id="note"></div>
                      {/* {{!-- <label className="label-control">Notes </label> --}}
                      {{!-- <input placeholder="your notes" type="textarea" className="form-control" id="Notes"> --}}
                      {{!-- <textarea placeholder="your notes" type="textarea" cols="30" rows="10" className="form-control" id="newNote"> </textarea> --}}
                     */}
                    </div>

                  </form>
                  <div id="oldNotes">Older Notes</div>
                </div>
                  <button type="submit" id="addnote_btn" className="btn btn-success btn-outline-success submit">Submit</button>
                </div>
              </div>
            </div>
    
        </Row>
      </Container>
    );
  }
}

export default Save;
