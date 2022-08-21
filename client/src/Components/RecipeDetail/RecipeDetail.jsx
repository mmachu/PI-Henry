import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { GiCook } from "react-icons/gi";
import Navigation from "../Navigation/Navigation.js";
import styles from "./recipedetail.module.css";
import loading from "../../assets/loading.gif";
const RecipeDetail = () => {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();
  const axios = require("axios").default;
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(false);
  const [errorMsj, setErrorMsj] = useState("");

  useEffect(async () => {
    await axios
      .get(`http://localhost:3001/recipes/${id}`)
      .then((res) => {
        setRecipe(res.data);
      })
      .catch((err) => {
        setErrorMsj(err.response.data);
        setError(true);
      });
    setLoadingData(false);
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
    return recipe?.analyzedInstructions?.map((step) => {
      return (
        <li key={step.step} className={styles.steps}>
          {step.step}
        </li>
      );
    });
  };

  const wasError = () => {
    if (error && !loadingData) {
      return (
        <div className={styles.informError}>
          <h3>Ocurrio el siguiente error:</h3>
          <p>{errorMsj}</p>
        </div>
      );
    }
  };

  const isRecipe = () => {
    if (!error && !loadingData) {
      return (
        <>
          {" "}
          <div className={styles.title}>{recipe.title}</div>
          <div className={styles.description}>{recipe.summary}</div>
          <div className={styles.mainSection}>
            <div className={styles.leftColumn}>
              <div className={styles.contentTitle}>Ingredientes</div>
              <ul className={styles.ingredientsList}>{mapIngredients()}</ul>
              <div className={styles.contentTitle}>Paso a paso</div>
              <ul className={styles.ingredientsList}>{mapSteps()}</ul>
            </div>
            {recipe.image !== null ? (
              <img className={styles.img} src={recipe.image} />
            ) : null}
          </div>
          <div className={styles.buttonContainer}>
            <NavLink to="/searchRecipe">
              <button className={styles.button}>Buscar otras recetas</button>
            </NavLink>
          </div>
        </>
      );
    }
  };

  const showRecipe = () => {
    return (
      <div className={styles.container}>
        <Navigation />
        {loadingData && <img className={styles.loading} src={loading} />}
        {isRecipe()}
        {wasError()}
      </div>
    );
  };

  return <div className={styles.background}>{showRecipe()}</div>;
};

export default RecipeDetail;
