import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./navigation.module.css";
const Navigation = () => {
  return (
    <nav className={styles.navStyle}>
      <div className={styles.navButtonsContainer}>
        <div className={styles.navButtons}>
          <p>Favoritos</p>
        </div>
        <NavLink to="/createRecipe">
          <div className={styles.navButtons}>
            <p>Crear Receta</p>
          </div>
        </NavLink>
        <NavLink to="/">
          <div className={styles.navButtons}>
            <p>Ingresar Registrarse</p>
          </div>
        </NavLink>
      </div>
      <div className={styles.navName}>
        <p className={styles.title}>Food PI</p>
      </div>
    </nav>
  );
};

export default Navigation;
