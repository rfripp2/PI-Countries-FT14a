import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import Start from "./components/Start";
import Display from "./components/Display";
import Searcher from "./components/Searcher";
function App() {
  return (
    <div className="App">
      <h1>Henry Countries</h1>
      <Route exact path="/" component={Start}></Route>
      <Route path="/countries" component={Searcher}></Route>
      <Route path="/countries" component={Display}></Route>
    </div>
  );
}

export default App;
