import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadRecipes, loadDiets } from "../../Actions/actions.js";
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
import Navigation from "../Navigation/Navigation.js";
import FilterMenu from "../FilterMenu/FilterMenu.jsx";
import SearchResults from "../SearchResults/SearchResults.jsx";
const axios = require("axios").default;

const RecipeSearch = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDiets, setSelectedDiets] = useState([]);
  const recipes = useSelector((state) => state.loadedRecipes);
  const allDiets = useSelector((state) => state.diets);
  const dispatch = useDispatch();

  useEffect(() => {
    if (recipes?.length > 0) {
      setSelectedDiets([...allDiets]);
    } else {
      axios
        .get(`http://localhost:3001/recipes?name=`)
        .then((res) => {
          console.log(res.data);
          let diets = res.data.pop();
          dispatch(loadDiets(diets));
          dispatch(loadRecipes(res.data));
          setSelectedDiets([...diets]);
        })
        .catch((err) => {
          window.alert(
            `Error al cargar las recetas: ${err.response.data.message}`
          );
        });
    }
  }, []);

  const handleSearch = async () => {
    if (searchTerm === "") {
      window.alert("Debe ingresar un termino de busqueda");
    } else {
      axios
        .get(`http://localhost:3001/recipes?name=${searchTerm}`)
        .then((res) => {
          let diets = res.data.pop();
          dispatch(loadDiets(diets));
          dispatch(loadRecipes(res.data));
          setSelectedDiets([...diets]);
        })
        .catch((err) => {
          window.alert(
            `Error al cargar las recetas: ${err.response.data.message}`
          );
        });
    }
  };

  const handleSearchTermLoad = (e) => {
    let searchRegex = /[^0-9!@#/\\\?\$%\^\&*\)\(+=\[\]\{\}|.,_-]+$/g;
    if (e.target.value.match(searchRegex) || e.target.value === "") {
      setSearchTerm(e.target.value);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleShowFilters = () => {
    let current = showFilters;
    setShowFilters(!current);
  };

  const sortTitleAsc = async (e) => {
    if (recipes?.length > 0) {
      recipes.sort((a, b) => {
        return a.title < b.title ? -1 : 1;
      });
      dispatch(loadRecipes(recipes));
      changeActiveFilter(e.currentTarget.id);
    }
  };

  const sortTitleDesc = async (e) => {
    if (recipes?.length > 0) {
      recipes.sort((a, b) => {
        return a.title < b.title ? -1 : 1;
      });
      recipes.reverse();
      dispatch(loadRecipes(recipes));
      changeActiveFilter(e.currentTarget.id);
    }
  };

  const sortHealthAsc = async (e) => {
    if (recipes?.length > 0) {
      recipes.sort((a, b) => {
        return a.healthScore - b.healthScore;
      });
      dispatch(loadRecipes(recipes));
      changeActiveFilter(e.currentTarget.id);
    }
  };

  const sortHealthDesc = async (e) => {
    if (recipes?.length > 0) {
      recipes.sort((a, b) => {
        return a.healthScore - b.healthScore;
      });
      recipes.reverse();
      dispatch(loadRecipes(recipes));
      changeActiveFilter(e.currentTarget.id);
    }
  };

  const changeActiveFilter = (id) => {
    if (recipes?.length > 0) {
      let current = document.getElementsByClassName(
        `${styles.orderButtonActive}`
      );
      current[0].classList.remove(`${styles.orderButtonActive}`);
      document.getElementById(id).classList.add(`${styles.orderButtonActive}`);
    }
  };

  const falsoID = 1;
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.topBars}>
          <Navigation />
          <div className={styles.searchBar}>
            <div
              className={`${styles.dietFilterButtonContainer} ${
                recipes.length > 0 ? styles.dietFilterActive : null
              }`}
            >
              {recipes?.length > 0 && (
                <div
                  className={styles.dietFilterButton}
                  onClick={handleShowFilters}
                >
                  <p>
                    Filtrar por dieta <AiOutlineDown />
                  </p>
                </div>
              )}
            </div>
            <div className={styles.searchContainer}>
              <p className={styles.searchText}>Buscar receta</p>
              <div className={styles.searchInput}>
                <button className={styles.searchButton} onClick={handleSearch}>
                  <BsSearch />
                </button>
                <input
                  className={styles.filterInput}
                  onChange={handleSearchTermLoad}
                  onKeyDown={handleEnter}
                  type="text"
                  value={searchTerm}
                />
              </div>
            </div>
            <div className={styles.orderContainer}>
              <div className={styles.orderTitle}>Ordenar por Dieta</div>
              <div className={styles.orderButtons}>
                <div
                  id="ascTitle"
                  onClick={(e) => sortTitleAsc(e)}
                  className={`${styles.orderButton} ${
                    recipes?.length !== 0 ? styles.orderButtonActive : ""
                  }`}
                >
                  <TbSortAscendingLetters />
                </div>
                <div
                  id="descTitle"
                  onClick={(e) => sortTitleDesc(e)}
                  className={styles.orderButton}
                >
                  <TbSortDescendingLetters />
                </div>
              </div>
            </div>
            <div className={styles.orderContainer}>
              <div className={styles.orderTitle}>Ordenar por Health Score</div>
              <div className={styles.orderButtons}>
                <div
                  id="ascHealth"
                  onClick={(e) => sortHealthAsc(e)}
                  className={styles.orderButton}
                >
                  <TbSortAscendingNumbers />
                </div>
                <div
                  id="descHealth"
                  onClick={(e) => sortHealthDesc(e)}
                  className={styles.orderButton}
                >
                  <TbSortDescendingNumbers />
                </div>
              </div>
            </div>
          </div>
        </div>
        {showFilters && (
          <FilterMenu
            handleShowFilters={handleShowFilters}
            selectedDiets={selectedDiets}
            setSelectedDiets={setSelectedDiets}
          />
        )}
        <SearchResults selectedDiets={selectedDiets} />
      </div>
    </div>
  );
};

export default RecipeSearch;
