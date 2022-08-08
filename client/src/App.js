import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Main from "./Components/Main/Main.jsx";
import RecipeSearch from "./Components/RecipeSearch/RecipeSearch.jsx";
import RecipeDetail from "./Components/RecipeDetail/RecipeDetail.jsx";
import CreateRecipe from "./Components/CreateRecipe/CreateRecipe.js";

function App() {
  return (
    <React.Fragment>
      <Route exact path="/" component={Main} />
      <Route path="/searchRecipe" component={RecipeSearch} />
      <Route path="/recipe/:id" component={RecipeDetail} />
      <Route path="/createRecipe" component={CreateRecipe} />
    </React.Fragment>
  );
}

export default App;
