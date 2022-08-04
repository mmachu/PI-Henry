import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./uniquevalueinputs.module.css";
const UniqueValueInputs = ({
  title,
  handleChangeTitle,
  healthScore,
  handleChangeHS,
  description,
  handleChangeDescription,
}) => {
  return (
    <div className={styles.staticFieldsContainer}>
      <div className={styles.staticInputsNames}>
        <p className={styles.p}>Nombre de la receta</p>
        <p className={styles.p}>Health score</p>
        <p className={styles.p}>Descripcion</p>
      </div>
      <div className={styles.staticInputsInput}>
        <input
          onChange={handleChangeTitle}
          value={title}
          className={styles.staticInputs}
          type="text"
          name="title"
        />
        <label className={styles.charCount}>
          {`${title.length}`}/50 caracteres
        </label>
        <input
          onChange={handleChangeHS}
          value={healthScore}
          className={styles.staticInputs}
          type="text"
          name="healthScore"
        />
        <label className={styles.charCount}>Minimo 0 - Maximo 100</label>
        <textarea
          onChange={handleChangeDescription}
          value={description}
          className={styles.staticInputs}
          type="textarea"
          name="summary"
        />
        <label>{`${description.length}`}/3000 caracteres</label>
      </div>
    </div>
  );
};

export default UniqueValueInputs;
