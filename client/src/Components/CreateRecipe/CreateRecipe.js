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
import RecipeDetail from "../RecipeDetail/RecipeDetail.jsx";
import ConfirmModal from "../ConfirmModal/ConfirmModal.js";

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
  const [errorIsOpen, setErrorIsOpen] = useState(false);
  const [confirmIsOpen, setConfirmIsOpen] = useState(false);
  const [info, setInfo] = useState([]);
  const [newRecipe, setNewRecipe] = useState({});
  const dispatch = useDispatch();
  const allDiets = useSelector((state) => state.diets);

  useEffect(async () => {
    await axios
      .get("http://localhost:3001/diets")
      .then((response) => {
        let formattedDiets = response.data;
        formattedDiets.forEach((diet) => {
          let dietWords = diet.name.split(" ");
          let dietName = dietWords.map((word) => {
            return word[0].toUpperCase() + word.slice(1);
          });
          diet.name = dietName.join(" ");
        });

        dispatch(loadDiets(formattedDiets));
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
    let selectedDiet = allDiets.filter((diet) => diet.name === e.target.value);
    let oldDiets = [...diets];
    oldDiets[i] = selectedDiet[0];
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
    newDiets.push({ id: -1, diet: "" });
    setDiets([...newDiets]);
  };

  const handleRemoveStep = () => {
    if (steps.length <= 5) {
      setErrorIsOpen(true);
      setInfo(["Se necesitan al menos 5 pasos en la receta"]);
    } else {
      const newSteps = [...steps];
      newSteps.pop();
      setSteps([...newSteps]);
    }
  };

  const handleRemoveIngredient = () => {
    if (ingredients.length <= 2) {
      setErrorIsOpen(true);
      setInfo(["Se necesitan al menos 2 ingredientes en la receta"]);
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
        <div className={styles.labelInputFormatter} key={step.number}>
          <label>Paso {step.number + 1}</label>
          <input
            className={styles.stepInputs}
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
        <div className={styles.labelInputFormatter} key={ing.number}>
          <label>Ingrediente {ing.number + 1}</label>
          <input
            className={styles.ingredientInputs}
            id={`ingredient-${ing.number}`}
            type="text"
            name={`ingredient ${ing.number}`}
            value={ing.ingredient}
            onChange={(e) => handleChangeIngredient(e, ing.number)}
          />
          <label>{`${ing.ingredient.length}`}/20 caracteres</label>
        </div>
      );
    });
  };

  const showDiets = () => {
    if (diets.length > 0) {
      return diets.map((dietAdded, i) => {
        return (
          <div className={styles.labelInputFormatter} key={i}>
            <label>Dieta {i + 1}</label>
            <select
              className={styles.select}
              id={i}
              onChange={(e) => handleChangeDiet(e, i)}
              key={i}
              name="dietas"
            >
              <option className={styles.option} value="">
                Seleccione una dieta
              </option>
              {allDiets.map((diet, n) => {
                return (
                  <option
                    className={styles.option}
                    key={diet.name}
                    id={`${diet.id} + ${diet.name}`}
                    value={diet.name}
                  >
                    {diet.name}
                  </option>
                );
              })}
            </select>
          </div>
        );
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = recordChecker([
      { field: "diets", data: diets },
      { field: "steps", data: steps },
      { field: "ingredients", data: ingredients },
    ]);
    if (title.length === 0)
      errors.push("El título de la receta no puede estar vacío");
    if (description.length === 0)
      errors.push("La descripción no puede estar vacía");
    if (healthScore.length === 0)
      errors.push("El health score no puede estar vacío");
    if (errors.length > 0) {
      setErrorIsOpen(true);
      setInfo([...errors]);
    } else {
      let ingValues = ingredients.map((ing) => ing.ingredient);
      let formatDiets = [];
      diets.forEach((diet) => {
        let dietWords = diet.name.split(" ");
        let dietName = dietWords.map((word) => {
          return word[0].toLowerCase() + word.slice(1);
        });
        diet.name = dietName.join(" ");
        formatDiets.push(diet);
      });
      const newRecord = {
        title: title,
        summary: description,
        healthScore: healthScore,
        analyzedInstructions: [...steps],
        ingredients: [...ingValues],
        diets: [...formatDiets],
      };
      setNewRecipe(newRecord);
      setConfirmIsOpen(true);
      // await axios
      //   .post("http://localhost:3001/recipes", newRecord)
      //   .then((res) => {
      //     console.log(res);
      //   });
    }
  };

  const recordChecker = (arrFields) => {
    const status = [];
    console.log(arrFields);
    arrFields.forEach((arr) => {
      let field = arr.field;
      let data = arr.data;
      let properties = data.length > 0 ? Object.keys(data[0]) : null;
      if (data.length > 0) {
        let isEmpty = false;
        let values = [];
        data.forEach((el) => {
          let cleanValue = el[properties[1]];
          values.push(cleanValue);
          if (cleanValue === "" && !isEmpty) {
            status.push(errorDescription(field, "empty"));
            isEmpty = true;
          }
        });
        let isRepetead = false;
        let testArr = [...values];
        values.forEach((el) => {
          testArr.shift();
          if (el !== "" && testArr.includes(el) && !isRepetead) {
            status.push(errorDescription(field, "repeated"));
            isRepetead = true;
          }
        });
      }
    });
    return status;
  };

  const errorDescription = (field, error) => {
    switch (field) {
      case "diets":
        if (error === "empty") {
          return "No puede haber dietas vacias";
        }
        if (error === "repeated") {
          return "No puede haber dietas repetidas";
        }
        break;
      case "steps":
        if (error === "empty") {
          return "No puede haber pasos vacíos";
        }
        if (error === "repeated") {
          return "No puede haber pasos repetidos";
        }
        break;
      case "ingredients":
        if (error === "empty") {
          return "No puede haber ingredientes vacíos";
        }
        if (error === "repeated") {
          return "No puede haber ingredientes repetidos";
        }
        break;
      default:
        return "Recipe is invalid";
        break;
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        {errorIsOpen && (
          <ErrorModal errorIsOpen={errorIsOpen} info={info} setInfo={setInfo} />
        )}
        {confirmIsOpen && (
          <ConfirmModal
            setConfirmIsOpen={setConfirmIsOpen}
            newRecipe={newRecipe}
          />
        )}
        <Navigation />
        <h3 className={styles.title}>Cargue los datos de la nueva receta</h3>
        <div className={styles.formContainer}>
          <form className={styles.formStyle} onSubmit={handleSubmit}>
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
              <button className={styles.button} type="submit">
                Guardar receta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipe;
