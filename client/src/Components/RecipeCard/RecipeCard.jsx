import React from "react";
import styles from "./recipecard.module.css";
import imagen from "../../assets/test.jpg";

const RecipeCard = ({ recipe }) => {
  const mapDiets = () => {
    const dietNames = recipe?.diets?.map((diet) => diet.name);
    return dietNames.join(" | ");
  };

  return (
    <div key={recipe && recipe.id} className={styles.container}>
      <div className={styles.recipePictureContainer}>
        <img
          className={styles.recipeImage}
          alt=""
          src={recipe && recipe.image}
        />{" "}
      </div>
      <div className={styles.recipeTitle}>{recipe && recipe.title}</div>
      <div className={styles.recipeDiets}>{mapDiets()}</div>
    </div>
  );
};

export default RecipeCard;
