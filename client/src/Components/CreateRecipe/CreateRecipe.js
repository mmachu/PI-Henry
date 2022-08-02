import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./createrecipe.module.css";
import Navigation from "../Navigation/Navigation.js";
import ErrorModal from "../ErrorModal/ErrorModal.js";

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
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  const handleStepChange = (e, stepNumber) => {
    const newSteps = [...steps];
    newSteps[stepNumber] = { ...newSteps[stepNumber], step: e.target.value };
    setSteps(newSteps);
  };

  const handleIngredientChange = (e, ingredientNumber) => {
    const newIngredients = [...ingredients];
    newIngredients[ingredientNumber] = {
      ...newIngredients[ingredientNumber],
      ingredient: e.target.value,
    };
    setIngredients(newIngredients);
  };

  const handleAddStep = () => {
    const newSteps = [...steps];
    newSteps.push({ number: newSteps.length, step: "" });
    setSteps([...newSteps]);
  };

  const handleAddIngredient = () => {
    const newIngredients = [...ingredients];
    newIngredients.push({ number: newIngredients.length, ingredient: "" });
    setIngredients([...newIngredients]);
  };

  const handleRemoveStep = () => {
    if (steps.length <= 5) {
      setIsOpen(true);
      setError("Se necesitan al menos 5 pasos en la receta");
    } else {
      const newSteps = [...steps];
      newSteps.pop();
      setSteps([...newSteps]);
    }
  };

  const handleDeleteIngredient = () => {
    if (ingredients.length <= 2) {
      setIsOpen(true);
      setError("Se necesitan al menos 2 ingredientes en la receta");
    } else {
      const newIngredients = [...ingredients];
      newIngredients.pop();
      setIngredients([...newIngredients]);
    }
  };

  const showSteps = () => {
    return steps.map((step) => {
      return (
        <div className={styles.step} key={step.number}>
          <label>Paso {step.number + 1}</label>
          <input
            id={`step-${step.number}`}
            type="text"
            name="step"
            value={step.step}
            onChange={(e) => handleStepChange(e, step.number)}
          />
        </div>
      );
    });
  };

  const showIngredients = () => {
    return ingredients.map((ingredient) => {
      return (
        <div
          className={styles.ingredient}
          key={ingredient.number + ingredient.ingredient}
        >
          <label>Ingrediente {ingredient.number + 1}</label>
          <input
            id={`ingredient-${ingredient.number}`}
            type="text"
            name={`ingredient ${ingredient.number}`}
            value={ingredient.ingredient}
            onChange={(e) => handleIngredientChange(e, ingredient.number)}
          />
        </div>
      );
    });
  };

  return (
    <div className={styles.container}>
      {isOpen && (
        <ErrorModal setIsOpen={setIsOpen} error={error} setError={setError} />
      )}
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
                <div className={styles.buttonContainer}>
                  <button type="button" onClick={handleAddStep}>
                    Agregar un nuevo paso
                  </button>{" "}
                  <button type="button" onClick={handleRemoveStep}>
                    Eliminar el ultimo paso
                  </button>
                </div>
                {showSteps()}
              </div>
              <div className={styles.ingredientsContainer}>
                <h3>Ingredientes</h3>
                <div className={styles.buttonContainer}>
                  <button type="button" onClick={handleAddIngredient}>
                    Agregar un nuevo ingrediente
                  </button>
                  <button type="button" onClick={handleDeleteIngredient}>
                    Eliminar el ultimo ingrediente
                  </button>
                </div>
                {/* <div className={styles.ingredient}> */}
                {showIngredients()}
                {/* </div> */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
