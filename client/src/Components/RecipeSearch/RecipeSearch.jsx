import React from "react";
import { NavLink } from "react-router-dom";
const RecipeSearch = () => {
  const falsoID = 1;
  return (
    <div>
      <p>Esta es la RecipeSearch page</p>
      <NavLink to={`/recipe/${falsoID}`}>
        <button>Vamos a ver el producto pa</button>
      </NavLink>
    </div>
  );
};

export default RecipeSearch;
