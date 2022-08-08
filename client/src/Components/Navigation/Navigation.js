import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./navigation.module.css";
const Navigation = () => {
  return (
    <nav className={styles.navStyle}>
      <div className={styles.navButtonsContainer}>
        <NavLink to="/createRecipe">
          <div className={styles.navButtons}>
            <p>Crear Receta</p>
          </div>
        </NavLink>
        <NavLink to="/searchRecipe">
          <div className={styles.navButtons}>
            <p>Buscar Recetas</p>
          </div>
        </NavLink>
      </div>
      <div className={styles.navName}>
        <NavLink to="/">
          <p className={styles.title}>Food PI</p>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
