import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadDiets } from "../../Actions/actions.js";
import styles from "./createrecipe.module.css";
import Navigation from "../Navigation/Navigation.js";
import ErrorModal from "../ErrorModal/ErrorModal.js";
const axios = require("axios").default;

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
  const [diets, setDiets] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const allDiets = useSelector((state) => state.diets);

  console.log(diets);

  useEffect(async () => {
    await axios
      .get("http://localhost:3001/diets")
      .then((response) => {
        let dbDiets = [];
        response.data.map((diet) => dbDiets.push(diet.name));
        dispatch(loadDiets(dbDiets));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  const handleAddDiet = () => {
    const newDiets = [...diets];
    newDiets.push("");
    setDiets([...newDiets]);
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

  const handleRemoveIngredient = () => {
    if (ingredients.length <= 2) {
      setIsOpen(true);
      setError("Se necesitan al menos 2 ingredientes en la receta");
    } else {
      const newIngredients = [...ingredients];
      newIngredients.pop();
      setIngredients([...newIngredients]);
    }
  };

  const handleRemoveDiet = () => {
    if (diets.length === 0) return;
    const newDiets = [...diets];
    newDiets.pop();
    setDiets([...newDiets]);
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

  const handleChangeDiet = (e, i) => {
    let oldDiets = [...diets];
    oldDiets[i] = e.target.value;
    setDiets([...oldDiets]);
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

  const showDiets = () => {
    if (diets.length > 0) {
      return diets.map((diet, i) => {
        return (
          <div className={styles.ingredient} key={i}>
            <label>Dieta {i + 1}</label>
            <select
              id={i}
              onChange={(e) => handleChangeDiet(e, i)}
              key={i}
              name="dietas"
            >
              {allDiets.map((diet, n) => {
                return (
                  <option key={diet} id={`${diet}${n}`} value={diet}>
                    {diet}
                  </option>
                );
              })}
            </select>
          </div>
        );
      });
    }
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
                  <button
                    className={styles.button}
                    type="button"
                    onClick={handleAddStep}
                  >
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
              <div className={styles.ingredientsContainer}>
                <h3>Dietas</h3>
                <div className={styles.buttonContainer}>
                  <button
                    className={styles.button}
                    type="button"
                    onClick={handleAddDiet}
                  >
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
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
