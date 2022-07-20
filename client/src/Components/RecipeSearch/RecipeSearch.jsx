import React from "react";
import { NavLink } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import styles from "./recipesearch.module.css";

const RecipeSearch = () => {
  const falsoID = 1;
  return (
    <div>
      <nav>
        <div className={styles.navButtons}>
          <p className={styles.navButtonsDescription}>Favoritos</p>
        </div>
        <div className={styles.navButtons}>
          <p className={styles.navButtonsDescription}>Ingresar/Registrarse</p>
        </div>
        <div className={styles.navName}>
          <p>Food PI</p>
        </div>
      </nav>
      <div className={styles.filterContainer}>
        <div>
          <p className={styles.searchText}>Buscar receta</p>
          <div className={styles.filterInputContainer}>
            <button>
              <BsSearch />
            </button>
            <input className={styles.filterInput} type="text" />
          </div>
        </div>
      </div>
      {/* <p>Esta es la RecipeSearch page</p>
      <NavLink to={`/recipe/${falsoID}`}>
        <button>Vamos a ver el producto pa</button>
      </NavLink> */}
    </div>
  );
};

export default RecipeSearch;
