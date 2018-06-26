import React from "react";
import "./Note.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const Note = props => (
  <span className="btn btn-info" {...props}>
   Note
  </span>

);

export default Note;
