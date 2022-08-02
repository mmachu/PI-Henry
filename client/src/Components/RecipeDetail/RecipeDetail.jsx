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
          <GiCook style={{ color: "#fff", marginRight: "10px" }} />{" "}
          {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
        </li>
      );
    });
  };

  const mapSteps = () => {
    return recipe?.analyzedInstructions?.map((step, index) => {
      return (
        <li key={step.step} className={styles.steps}>
          {step.step}
        </li>
      );
    });
  };

  const showRecipe = () => {
    if (!recipe.title) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div className={styles.container}>
          <div className={styles.title}>{recipe.title}</div>
          <div className={styles.description}>{recipe.summary}</div>
          <div className={styles.mainSection}>
            <div className={styles.leftColumn}>
              <div className={styles.contentTitle}>Ingredientes</div>
              <ul className={styles.ingredientsList}>{mapIngredients()}</ul>
              <div className={styles.contentTitle}>Paso a paso</div>
              <ul className={styles.ingredientsList}>{mapSteps()}</ul>
            </div>
            <img className={styles.img} src={recipe.image} />
          </div>
          <div className={styles.buttonContainer}>
            <NavLink to="/index">
              <button>Buscar otras recetas</button>
            </NavLink>
          </div>
        </div>
      );
    }
  };

  return <div className={styles.background}>{showRecipe()}</div>;
};

export default RecipeDetail;
