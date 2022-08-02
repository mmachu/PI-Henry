import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styles from "./createrecipe.module.css";
import Navigation from "../Navigation/Navigation.js";

function useQuery() {
  const location = useLocation();

  return location;
}

const CreateRecipe = () => {
  const [steps, setSteps] = useState([
    { number: 0, step: "" },
    { number: 1, step: "" },
    { number: 2, step: "" },
    { number: 3, step: "" },
    { number: 4, step: "" },
  ]);
  const [ingredients, setIngredients] = useState([
    { number: 0, ingredient: "" },
    { number: 1, ingredient: "" },
  ]);

  let query = useQuery();
  console.log(query);
  return (
    <div className={styles.container}>
      <Navigation />
      <h3 className={styles.title}>Cargue los datos de la nueva receta</h3>
      <div className={styles.formContainer}>
        <form className={styles.formStyle}>
          <div className={styles.inputContainer}>
            <div className={styles.staticFieldsContainer}>
              <div className={styles.staticInputsNames}>
                <p>Nombre de la receta</p>
                <p>Health score</p>
                <p>Descripcion</p>
              </div>
              <div className={styles.staticInputsInput}>
                <input
                  className={styles.staticInputs}
                  type="text"
                  name="name"
                />
                <input
                  className={styles.staticInputs}
                  type="text"
                  name="healthScore"
                />
                <textarea
                  className={styles.staticInputs}
                  type="textarea"
                  name="summary"
                />
                <label>0/3000 caracteres</label>
              </div>
            </div>
            <div className={styles.stepsAndIngredients}>
              <div className={styles.stepsContainer}>
                <h3>Agregar pasos</h3>
                <button>Agregar un nuevo paso</button>
                <div className={styles.step}></div>
              </div>
              <div className={styles.ingredientsContainer}>
                <h3>Ingredientes</h3>
                <button>Agregar un nuevo ingrediente</button>
                <div className={styles.ingredient}></div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
