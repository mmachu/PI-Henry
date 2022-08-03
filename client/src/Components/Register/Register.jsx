import React, { Component } from "react";
import styles from "../Main/main.module.css";
import { NavLink } from "react-router-dom";

const Register = () => {
  return (
    <>
      <h3>Ingrese sus datos</h3>
      <label>Email</label>
      <input type="text" className={styles.inputMain} />
      <label>Contraseña</label>
      <input type="password" className={styles.inputMain} />
      <button className={styles.button} type="submit">
        Registrarme
      </button>
    </>
  );
};

export default Register;
