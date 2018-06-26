import React from 'react';
import Modal from 'react-responsive-modal';
import Note from "../Note";

class ModalContainer extends React.Component {
  state = {
    open: false,
  };
 
  onOpenModal = () => {
    this.setState({ open: true });
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
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
                {/* <div id="note"></div> */}
                <label className="label-control">Notes </label> 
                <input placeholder="your name" type="textarea" className="form-control" id="Notes"/>
                <textarea placeholder="your notes" type="textarea" cols="30" rows="10" className="form-control" id="newNote"> </textarea>
              </div>
            </form>
            <div id="oldNotes">Older Notes</div>
            <button type="submit" id="addnote_btn" className="btn btn-success btn-outline-success submit">Submit</button>

          </div>
        </Modal>
      </div>
    );
  }
}
 
export default ModalContainer;
