import React from "react";
import "./ScrapeBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const ScrapeBtn = props => (
  <span className="btn btn-danger" {...props}>
    Search for new Articles
  </span>

);

export default ScrapeBtn;
