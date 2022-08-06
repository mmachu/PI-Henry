import React from "react";
import styles from "./confirmmodal.module.css";
const axios = require("axios").default;

const ConfirmModal = ({ setConfirmIsOpen, newRecipe }) => {
  const handleClose = () => {
    setConfirmIsOpen(false);
  };

  const saveRecipe = async () => {
    await axios.post("http://localhost:3001/recipes", newRecipe).then((res) => {
      if (res.status === 201) {
        console.log("se guardo la recetita");
      } else {
        console.log(res.data.error);
      }
    });
  };

  const renderDiet = () => {
    return (
      <div>
        <p>Su nueva receta es:</p>
        <ul className={styles.ul}>
          <label>Titulo</label>
          <li>{newRecipe.title}</li>
          <label>Health Score:</label>
          <li>{newRecipe.healthScore}</li>
          <label>Descripcion:</label>
          <li>{newRecipe.summary}</li>
          <label>Pasos:</label>
          {newRecipe.analyzedInstructions.map((step, index) => {
            return (
              <li key={index}>
                {step.number}. {step.step}
              </li>
            );
          })}
          <label>Ingredientes:</label>
          {newRecipe.ingredients.map((ing, index) => {
            return <li key={index}>{ing.ingredient}</li>;
          })}
          <label>Dietas:</label>
          {newRecipe.diets.length > 0 ? (
            newRecipe.diets.map((diet, index) => {
              return <li key={index}>{diet.name}</li>;
            })
          ) : (
            <li>No tiene dietas</li>
          )}
        </ul>
        <button onClick={handleClose}>Cancelar</button>
        <button onClick={saveRecipe}>Guardar</button>
      </div>
    );
  };

  return (
    <>
      <div className={styles.darkBG} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalContent}>{renderDiet()}</div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
