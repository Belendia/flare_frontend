import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Security/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/login" component={Login} />
      </div>
    </Router>
  );
}

export default App;
