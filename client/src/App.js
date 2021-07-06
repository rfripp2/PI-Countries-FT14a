import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import Start from "./components/Start";
import Countries from "./components/Countries";
function App() {
  return (
    <div className="App">
      <h1>Henry Countries</h1>
      <Route exact path="/" component={Start}></Route>
      <Route path="/countries" component={Countries}></Route>
    </div>
  );
}

export default App;
