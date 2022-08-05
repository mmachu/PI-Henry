import React from "react";
import styles from "./adddiets.module.css";

const AddDiets = ({ handleAddDiet, handleRemoveDiet, showDiets }) => {
  return (
    <div className={styles.dietsContainer}>
      <h3 className={styles.h3}>Dietas</h3>
      <div className={styles.buttonContainer}>
        <button className={styles.button} type="button" onClick={handleAddDiet}>
          Agregar dieta
        </button>
        <button
          className={styles.button}
          type="button"
          onClick={handleRemoveDiet}
        >
          Eliminar ultima dieta
        </button>
      </div>
      {showDiets()}
    </div>
  );
};

export default AddDiets;
