import React from "react";
import styles from "./addsteps.module.css";

const AddSteps = ({ handleAddStep, handleRemoveStep, showSteps }) => {
  return (
    <div className={styles.stepsContainer}>
      <h3>Agregar pasos</h3>
      <div className={styles.buttonContainer}>
        <button className={styles.button} type="button" onClick={handleAddStep}>
          Agregar un nuevo paso
        </button>{" "}
        <button
          className={styles.button}
          type="button"
          onClick={handleRemoveStep}
        >
          Eliminar el ultimo paso
        </button>
      </div>
      {showSteps()}
    </div>
  );
};

export default AddSteps;
