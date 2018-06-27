import React from 'react';
import Modal from 'react-responsive-modal';
import Note from "../Note";
import API from "../../utils/API";


class ModalContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      title:"",
      body:"",
      notes:[]
    }
  };
  
  onOpenModal = () => {
    this.setState({ open: true });
    this.loadArticle(this.props.id);
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };

  loadArticle = (id) => {
    API.getArticle(id)
      .then(res =>
        {
          console.log(res.data.notes);
          this.setState({ notes: res.data.notes})
        }
      )
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state.title);
    console.log("comments");
    console.log(this.state.body);
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.body) {
      API.saveNote({
        title: this.state.title,
        body: this.state.body,
      }, this.props.id)
        .then(res => console.log("note written"))
        .catch(err => console.log(err));
    }
    this.setState({
      title:"",
      body:""
    });
    this.onCloseModal();
  };
 
  render() {
    const { open } = this.state;
    return (
      <div>
        <Note onClick={this.onOpenModal}/>
        <Modal open={open} onClose={this.onCloseModal} center>
          <div className="modal-body">
            <form id="Form">
              <div className="form-group">
                <label className="label-control">Notes </label> 
                <input onChange = {this.handleInputChange} name ="title" value ={this.state.title} placeholder="your name" type="textarea" className="form-control" id="Notes"/>
                <textarea placeholder="your notes" type="textarea" onChange = {this.handleInputChange} name ="body" value ={this.state.body} cols="50" rows="8" className="form-control" id="newNote" /> 
              </div>
              <button onClick={this.handleFormSubmit} type="submit" id="addnote_btn" className="btn btn-success btn-outline-success submit">Submit</button>

            </form>
            <div id="oldNotes">Older Notes</div>
            <div>
              {this.state.notes.map(note => (
                <li>
                  <h6>{`${note.title} says:` }</h6>
                  <span>{note.body}</span>
                </li>
              ))}
             </div>
          </div>
        </Modal>
      </div>
    );
  }
}
 
export default ModalContainer;
