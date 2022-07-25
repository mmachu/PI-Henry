import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./searchresults.module.css";
import RecipeCard from "../RecipeCard/RecipeCard.jsx";
import Pagination from "../Pagination/Pagination.jsx";

const SearchResults = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recipes = useSelector((state) => state.loadedRecipes);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRecipesRender = () => {
    const indexOfLastRecipe = currentPage * 9;
    const indexOfFirstRecipe = indexOfLastRecipe - 9;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
    return currentRecipes.map((recipe, i) => {
      return (
        <div key={recipe + i} className={styles.recipeCard}>
          <RecipeCard recipe={recipe} />
        </div>
      );
    });
  };

  return (
    <div key="searchResults">
      <div className={styles.resultContainer}>
        {handleRecipesRender()}
        {/* <RecipeCard />
      <RecipeCard />
      <RecipeCard /> */}
        {/* </div> */}
        {/* <div className={styles.cardContainer}> */}
        {/* <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard /> */}
        {/* </div> */}
      </div>
      {recipes.length !== 0 ? (
        <Pagination
          handlePageChange={handlePageChange}
          currentPage={currentPage}
        />
      ) : null}
    </div>
  );
};

export default SearchResults;
