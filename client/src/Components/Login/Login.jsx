import React from "react";
import styles from "../Main/main.module.css";
import { NavLink } from "react-router-dom";
const Login = ({ intervalID }) => {
  const stopInterval = () => {
    clearInterval(intervalID);
  };

  return (
    <>
      <h3>Si ya se encuentra registado, ingrese sus datos:</h3>
      <label className={styles.label}>Email</label>
      <input type="text" className={styles.inputMain} />
      <label className={styles.label}>Contraseña</label>
      <input type="password" className={styles.inputMain} />
      <button className={styles.button} type="submit">
        Ingresar
      </button>
      <h4>
        O ingresar sin usuario haciendo click{" "}
        {
          <NavLink to="/index" onClick={stopInterval}>
            aqui
          </NavLink>
        }
      </h4>
    </>
  );
};

export default Login;
