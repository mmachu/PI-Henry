import React from "react";
import styles from "../Main/main.module.css";
import { NavLink } from "react-router-dom";
const Register = () => {
  return (
    <>
      <h3>Si ya se encuentra registado, ingrese sus datos:</h3>
      <label>Email</label>
      <input type="text" className={styles.inputMain} />
      <label>Contraseña</label>
      <input type="password" className={styles.inputMain} />
      <button tpye="submit">Ingresar</button>
      <h4>
        O ingresar sin usuario haciendo click{" "}
        {<NavLink to="/index">aqui</NavLink>}
      </h4>
    </>
  );
};

export default Register;
