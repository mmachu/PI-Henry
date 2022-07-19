import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Main from "./Components/Main/Main.jsx";
import RecipeSearch from "./Components/RecipeSearch/RecipeSearch.jsx";
import RecipeDetail from "./Components/RecipeDetail/RecipeDetail.jsx";

function App() {
  return (
    <React.Fragment>
      <Route exact path="/" component={Main} />
      <Route path="/index" component={RecipeSearch} />
      <Route path="/recipe/:id" component={RecipeDetail} />
    </React.Fragment>
  );
}

export default App;
