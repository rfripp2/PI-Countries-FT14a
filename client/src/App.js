import "./App.css";
import React from "react";
import { Switch } from "react-router";
import { Route } from "react-router-dom";
import Start from "./components/Start";
import Display from "./components/Display";
import Searcher from "./components/Searcher";
import Filters from "./components/Filters";
import Nav from "./components/Nav";
import Activity from "./components/Activity";
import CountryDetails from "./components/CountryDetails";
function App() {
  return (
    <div className="App">
      <h1>Henry Countries</h1>
      <Route exact path="/" component={Start}></Route>
      <Switch>
        <Route path="/countries" component={Nav}></Route>
        <Route path="/activities" component={Nav}></Route>
      </Switch>
      <Route exact path="/countries" component={Filters}></Route>
      <Route exact path="/countries" component={Searcher}></Route>
      <Route exact path="/countries" component={Display}></Route>
      <Route exact path="/activities" component={Activity}></Route>
      <Route exact path="/countries/:id" component={CountryDetails}></Route>
    </div>
  );
}

export default App;
