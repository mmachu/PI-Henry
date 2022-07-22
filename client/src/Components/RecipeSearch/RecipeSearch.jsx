import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { AiOutlineDown } from "react-icons/ai";
import {
  TbSortAscendingLetters,
  TbSortDescendingLetters,
  TbSortAscendingNumbers,
  TbSortDescendingNumbers,
} from "react-icons/tb";
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
              <p>
                Filtrar por dieta <AiOutlineDown />
              </p>
            </div>
          </div>
          <div className={styles.searchContainer}>
            <p className={styles.searchText}>Buscar receta</p>
            <div className={styles.searchInput}>
              <button className={styles.searchButton}>
                <BsSearch />
              </button>
              <input className={styles.filterInput} type="text" />
            </div>
          </div>
          <div className={styles.orderContainer}>
            <div className={styles.orderTitle}>Ordenar por Dieta</div>
            <div className={styles.orderButtons}>
              <div id="ascendingLetters" className={styles.orderButton}>
                <TbSortAscendingLetters />
              </div>
              <div id="descendingLetters" className={styles.orderButton}>
                <TbSortDescendingLetters />
              </div>
            </div>
          </div>
          <div className={styles.orderContainer}>
            <div className={styles.orderTitle}>Ordenar por Health Score</div>
            <div className={styles.orderButtons}>
              <div id="ascendingNumbers" className={styles.orderButton}>
                <TbSortAscendingNumbers />
              </div>
              <div id="ascendingNumbers" className={styles.orderButton}>
                <TbSortDescendingNumbers />
              </div>
            </div>
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
