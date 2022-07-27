import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
const RecipeDetail = () => {
  const { id } = useParams();
  return (
    <div>
      <p>Este seria el detalle de la receta {id}</p>
      <NavLink to="/">
        <button>Volvemo al main</button>
      </NavLink>
    </div>
  );
};

export default RecipeDetail;
