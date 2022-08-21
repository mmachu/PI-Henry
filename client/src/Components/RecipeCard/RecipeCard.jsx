import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./recipecard.module.css";
import imagen from "../../assets/test.jpg";

const RecipeCard = ({ recipe }) => {
  const mapDiets = () => {
    if (recipe.diets.length === 0)
      return "No hay informacion de dietas para este plato";
    //const dietNames = recipe?.diets?.map((diet) => diet);
    // return dietNames.join(" | ");
    let dietsFormatted = recipe?.diets?.map((diet) => {
      let dietArr = diet.split(" ");
      let dietPascal = dietArr.map((dietP) => {
        return dietP.charAt(0).toUpperCase() + dietP.slice(1);
      });
      return dietPascal.join(" ");
    });
    return dietsFormatted.join(" | ");
  };
  return (
    <NavLink className={styles.container} to={`/recipe/${recipe.id}`}>
      {/* <div key={recipe && recipe.id} className={styles.container}> */}
      <div className={styles.recipePictureContainer}>
        <img
          className={styles.recipeImage}
          alt=""
          src={recipe && recipe.image}
        />{" "}
      </div>
      <div className={styles.recipeTitle}>{recipe && recipe.title}</div>
      <div className={styles.recipeHealthScore}>
        {recipe && <p>Health Score: {recipe.healthScore}</p>}
      </div>
      <div className={styles.recipeDiets}>{mapDiets()}</div>
      {/* </div> */}
    </NavLink>
  );
};

export default RecipeCard;
