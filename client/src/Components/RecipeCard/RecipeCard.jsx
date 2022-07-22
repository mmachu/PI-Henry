import React from "react";
import styles from "./recipecard.module.css";
import imagen from "../../assets/test.jpg";

const RecipeCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.recipePictureContainer}>
        <img className={styles.recipeImage} alt="" src={imagen} />{" "}
      </div>
      <div className={styles.recipeTitle}>Aca va el titulo</div>
      <div className={styles.recipeDiets}>Aca va la descripcion</div>
    </div>
  );
};

export default RecipeCard;
