import React from "react";
import styles from "./addingredients.module.css";

const AddIngredients = ({
  handleAddIngredient,
  handleRemoveIngredient,
  showIngredients,
}) => {
  return (
    <div className={styles.ingredientsContainer}>
      <h3>Ingredientes</h3>
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          type="button"
          onClick={handleAddIngredient}
        >
          Agregar un nuevo ingrediente
        </button>
        <button
          className={styles.button}
          type="button"
          onClick={handleRemoveIngredient}
        >
          Eliminar el ultimo ingrediente
        </button>
      </div>
      {/* <div className={styles.ingredient}> */}
      {showIngredients()}
      {/* </div> */}
    </div>
  );
};

export default AddIngredients;
