import React, { Component } from "react";
import { NavLink } from "react-router-dom";
const RecipeDetail = () => {
  return (
    <div>
      <p>Este seria el detalle de la receta</p>
      <NavLink to="/">
        <button>Volvemo al main</button>
      </NavLink>
    </div>
  );
};

export default RecipeDetail;
