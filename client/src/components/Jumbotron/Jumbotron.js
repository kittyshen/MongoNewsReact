import React from "react";
import "./Jumbotron.css";

const Jumbotron = ( {children} ) => (
  <div 
    style={{ height: 300, clear: "both", paddingTop: 160, textAlign: "center"
  }}
    className="jumbotron" 
  >
    {children}
  </div>
);

export default Jumbotron;
