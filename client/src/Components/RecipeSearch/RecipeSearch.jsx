import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { AiOutlineDown } from "react-icons/ai";
import styles from "./recipesearch.module.css";
import FilterMenu from "../FilterMenu/FilterMenu.jsx";
import SearchResults from "../SearchResults/SearchResults.jsx";
import Pagination from "../Pagination/Pagination.jsx";

const RecipeSearch = () => {
  const [showFilters, setShowFilters] = useState(false);

  const handleShowFilters = () => {
    let current = showFilters;
    setShowFilters(!current);
  };

  const falsoID = 1;
  return (
    <div className={styles.container}>
      <div className={styles.topBars}>
        <nav className={styles.navStyle}>
          <div className={styles.navButtonsContainer}>
            <div className={styles.navButtons}>
              <p>Favoritos</p>
            </div>
            <div className={styles.navButtons}>
              <p>Crear Receta</p>
            </div>
            <div className={styles.navButtons}>
              <p>Ingresar Registrarse</p>
            </div>
          </div>
          <div className={styles.navName}>
            <p className={styles.title}>Food PI</p>
          </div>
        </nav>
        <div className={styles.searchBar}>
          <div className={styles.dietFilterButtonContainer}>
            <div
              className={styles.dietFilterButton}
              onClick={handleShowFilters}
            >
              Filtrar por dieta <AiOutlineDown />
            </div>
          </div>
          <div className={styles.inputContainer}>
            <p className={styles.searchText}>Buscar receta</p>

            <button className={styles.searchButton}>
              <BsSearch />
            </button>
            <input className={styles.filterInput} type="text" />
          </div>
        </div>
      </div>
      {showFilters && <FilterMenu />}
      <SearchResults />
      <Pagination />
    </div>
  );
};

export default RecipeSearch;
