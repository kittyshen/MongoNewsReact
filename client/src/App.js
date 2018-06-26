import React from "react";
import Articles from "./pages/Articles";
import Save from "./pages/Save";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route , Switch} from "react-router-dom";


const App = () => (
  // <div>
  //   <Nav />
  //   <Books />
  // </div>
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Articles} />
        <Route exact path="/save" component={Save} />
        {/* <Route exact path="/books/:id" component={Detail} /> */}
        <Route exact path="/scrape" component={Articles} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
