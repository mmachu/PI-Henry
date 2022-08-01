import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { GiCook } from "react-icons/gi";

import styles from "./recipedetail.module.css";
const RecipeDetail = (props) => {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();
  const axios = require("axios").default;

  useEffect(async () => {
    await axios.get(`http://localhost:3001/recipes/${id}`).then((res) => {
      setRecipe(res.data);
      console.log(res.data);
    });
  }, []);

  const mapIngredients = () => {
    return recipe?.ingredients?.map((ingredient, index) => {
      return (
        <li key={ingredient + index} className={styles.listItem}>
          <GiCook style={{ color: "#000", marginRight: "10px" }} /> {ingredient}
        </li>
      );
    });
  };

  const mapSteps = () => {
    return recipe?.steps?.map((step, index) => {
      return (
        <li key={step.step} className={styles.steps}>
          {step.step}
        </li>
      );
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{recipe.title}</div>
      <div className={styles.description}>{recipe.description}</div>
      <div className={styles.ingredientsContainer}>
        <div className={styles.contentTitle}>Ingredientes</div>
        <ul className={styles.ingredientsList}>
          {mapIngredients()}
          {/* <li className={styles.listItem}>
            <GiCook style={{ color: "#000", marginRight: "10px" }} /> 1/2 pound
            smoked salmon
          </li>
          <li className={styles.listItem}>
            <GiCook style={{ color: "#000", marginRight: "10px" }} /> 1/2 pound
            smoked haddock
          </li>
          <li className={styles.listItem}>
            <GiCook style={{ color: "#000", marginRight: "10px" }} /> 1/2 cup
            chopped onion
          </li>
          <li className={styles.listItem}>
            <GiCook style={{ color: "#000", marginRight: "10px" }} /> 1/2 cup
            chopped celery
          </li>
          <li className={styles.listItem}>
            <GiCook style={{ color: "#000", marginRight: "10px" }} /> 1/2 cup
            chopped parsley
          </li> */}
        </ul>
        <div className={styles.contentTitle}>Paso a paso</div>
        <ul className={styles.ingredientsList}>
          {mapSteps()}
          {/* <li className={styles.steps}>1/2 pound smoked salmon</li>
          <li className={styles.steps}>1/2 pound smoked haddock</li>
          <li className={styles.steps}>1/2 cup chopped onion</li>
          <li className={styles.steps}>1/2 cup chopped celery</li>
          <li className={styles.steps}>1/2 cup chopped parsley</li> */}
        </ul>
      </div>
      <NavLink to="/">
        <button>Volvemo al main</button>
      </NavLink>
    </div>
  );
};

export default RecipeDetail;
