import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadDiets } from "../../Actions/actions.js";
import styles from "./createrecipe.module.css";
import Navigation from "../Navigation/Navigation.js";
import ErrorModal from "../ErrorModal/ErrorModal.js";
import UniqueValueInputs from "../UniqueValueInputs/UniqueValueInputs.js";
import AddSteps from "../AddSteps/AddSteps.js";
import AddIngredients from "../AddIngredients/AddIngredients.js";
import AddDiets from "../AddDiets/AddDiets.js";

const axios = require("axios").default;

const CreateRecipe = () => {
  const [title, setTitle] = useState("");
  const [healthScore, setHealthScore] = useState(0);
  const [description, setDescription] = useState("");
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

  const handleChangeTitle = (e) => {
    if (e.target.value.length === 0) {
      setTitle(e.target.value);
      return;
    }
    if (e.target.value.length <= 50) {
      let titleRegEx = /[^0-9!@#\?\$%\^\&*\)\(+=._-]+$/g;
      let pass = titleRegEx.test(e.target.value);
      if (pass) {
        setTitle(e.target.value);
      }
    }
  };

  const handleChangeHS = (e) => {
    if (e.target.value.length === 0) {
      setHealthScore(e.target.value);
      return;
    }
    if (e.target.value.length <= 3) {
      let hsRegEx = /^[0-9]+$/g;
      let pass = hsRegEx.test(e.target.value);
      if (pass) {
        if (Number(e.target.value) <= 100) {
          setHealthScore(Number(e.target.value));
        }
      }
    }
  };

  const handleChangeDescription = (e) => {
    if (e.target.value.length === 0) {
      setDescription(e.target.value);
      return;
    }
    if (e.target.value.length <= 3000) {
      let descriptionRegEx = /^[a-zA-Z0-9,. ]+$/gm;
      let pass = descriptionRegEx.test(e.target.value);
      if (pass) {
        setDescription(e.target.value);
      }
    }
  };

  const handleChangeStep = (e, stepNumber) => {
    if (e.target.value.length === 0) {
      let newSteps = [...steps];
      newSteps[stepNumber] = {
        ...newSteps[stepNumber],
        step: e.target.value,
      };
      setSteps(newSteps);
      return;
    }
    if (e.target.value.length <= 200) {
      let stepRegEx = /^[a-zA-Z0-9,. ]+$/g;
      let pass = stepRegEx.test(e.target.value);
      if (pass) {
        const newSteps = [...steps];
        newSteps[stepNumber] = {
          ...newSteps[stepNumber],
          step: e.target.value,
        };
        setSteps(newSteps);
      }
    }
  };

  const handleChangeIngredient = (e, ingredientNumber) => {
    console.log(ingredients);
    if (e.target.value.length === 0) {
      let newIngredients = [...ingredients];
      newIngredients[ingredientNumber] = {
        ...newIngredients[ingredientNumber],
        ingredient: e.target.value,
      };
      setIngredients([...newIngredients]);
      return;
    }
    if (e.target.value.length <= 20) {
      let ingredientRegEx = /[^0-9!@#\?\$%\^\&*\)\(+=._-]+$/g;
      let pass = ingredientRegEx.test(e.target.value);
      if (pass) {
        const newIngredients = [...ingredients];
        newIngredients[ingredientNumber] = {
          ...newIngredients[ingredientNumber],
          ingredient: e.target.value,
        };
        setIngredients(newIngredients);
      }
    }
  };

  const handleChangeDiet = (e, i) => {
    let oldDiets = [...diets];
    oldDiets[i] = e.target.value;
    setDiets([...oldDiets]);
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
            onChange={(e) => handleChangeStep(e, step.number)}
          />
          <label>{`${step.step.length}`}/200 caracteres</label>
        </div>
      );
    });
  };

  const showIngredients = () => {
    return ingredients.map((ing) => {
      return (
        <div className={styles.ingredient} key={ing.number}>
          <label>Ingrediente {ing.number + 1}</label>
          <input
            id={`ingredient-${ing.number}`}
            type="text"
            name={`ingredient ${ing.number}`}
            value={ing.ingredient}
            onChange={(e) => handleChangeIngredient(e, ing.number)}
          />
        </div>
      );
    });
  };

  const showDiets = () => {
    const formattedDiets = allDiets.map((diet) => {
      let splitDiet = diet.split(" ");
      let formattedDiet = splitDiet.map((word) => {
        return word[0].toUpperCase() + word.slice(1);
      });
      return formattedDiet.join(" ");
    });
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
              <option value="">Seleccione una dieta</option>
              {formattedDiets.map((diet, n) => {
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
            <UniqueValueInputs
              title={title}
              handleChangeTitle={handleChangeTitle}
              healthScore={healthScore}
              handleChangeHS={handleChangeHS}
              description={description}
              handleChangeDescription={handleChangeDescription}
            />
            <div className={styles.stepsAndIngredients}>
              <AddSteps
                handleAddStep={handleAddStep}
                handleRemoveStep={handleRemoveStep}
                showSteps={showSteps}
              />
              <AddIngredients
                handleAddIngredient={handleAddIngredient}
                handleRemoveIngredient={handleRemoveIngredient}
                showIngredients={showIngredients}
              />
              <AddDiets
                handleAddDiet={handleAddDiet}
                handleRemoveDiet={handleRemoveDiet}
                showDiets={showDiets}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
