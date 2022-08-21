import React, { useState } from "react";
import styles from "./confirmmodal.module.css";
const axios = require("axios").default;

const ConfirmModal = ({ setConfirmIsOpen, newRecipe, handleReset }) => {
  const [apiMessage, setApiMessage] = useState("");

  const handleClose = (e) => {
    if (e.target.id === "reset") {
      handleReset();
    }
    setConfirmIsOpen(false);
  };

  const saveRecipe = async () => {
    await axios
      .post("http://localhost:3001/recipes", newRecipe)
      .then((res) => {
        setApiMessage("Receta guardada con exito!");
      })
      .catch((err) => {
        console.log(err);
        setApiMessage(err.response.data.message);
      });
  };

  const renderMessage = () => {
    return (
      <div>
        <h2>Ocurrio el siguiente error:</h2>
        <h4>{apiMessage}</h4>
        <button
          id="reset"
          className={`${styles.cancel} ${styles.button}`}
          onClick={handleClose}
        >
          Cerrar
        </button>
      </div>
    );
  };

  const renderDiet = () => {
    return (
      <div className={styles.over}>
        <h3>Su nueva receta es:</h3>
        <ul className={styles.ul}>
          <h4>Titulo</h4>
          <li>{newRecipe.title}</li>
          <h4>Health Score:</h4>
          <li>{newRecipe.healthScore}</li>
          <h4>Descripcion:</h4>
          <li>{newRecipe.summary}</li>
          <h4>Pasos:</h4>
          {newRecipe.analyzedInstructions.map((step, index) => {
            return (
              <li className={styles.li} key={index}>
                {step.number + 1}. {step.step}
              </li>
            );
          })}
          <h4>Ingredientes:</h4>
          {newRecipe.ingredients.map((ing, index) => {
            return (
              <li className={styles.li} key={index}>
                {ing}
              </li>
            );
          })}
          <h4>Dietas:</h4>
          {newRecipe.diets.length > 0 ? (
            newRecipe.diets.map((diet, index) => {
              return <li key={index}>{diet.name}</li>;
            })
          ) : (
            <li>No tiene dietas</li>
          )}
        </ul>
        <button
          className={`${styles.cancel} ${styles.button}`}
          onClick={handleClose}
        >
          Cancelar
        </button>
        <button
          className={`${styles.save} ${styles.button}`}
          onClick={saveRecipe}
        >
          Guardar
        </button>
      </div>
    );
  };

  return (
    <>
      <div className={styles.darkBG} />
      <div className={styles.centered}>
        <div className={styles.over}>
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              {apiMessage === "" ? renderDiet() : renderMessage()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
