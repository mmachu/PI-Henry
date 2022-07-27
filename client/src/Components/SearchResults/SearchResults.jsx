import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./searchresults.module.css";
import RecipeCard from "../RecipeCard/RecipeCard.jsx";
import Pagination from "../Pagination/Pagination.jsx";

const SearchResults = ({ selectedDiets }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [actualRecipes, setActualRecipes] = useState([]);
  const recipes = useSelector((state) => state.loadedRecipes);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRecipesRender = () => {
    const filteredRecipes = recipes.filter((recipe) => {
      if (recipe.diets.length === 0) return recipe;

      let shouldFilter = true;
      let count = 0;

      while (shouldFilter && count < selectedDiets.length) {
        if (
          recipe.diets.findIndex((diet) => diet === selectedDiets[count]) !== -1
        ) {
          shouldFilter = false;
        }
        count++;
      }

      if (!shouldFilter) return recipe;
    });

    if (JSON.stringify(filteredRecipes) !== JSON.stringify(actualRecipes)) {
      setActualRecipes(filteredRecipes);
    }
    const indexOfLastRecipe = currentPage * 9;
    const indexOfFirstRecipe = indexOfLastRecipe - 9;
    const currentRecipes = filteredRecipes.slice(
      indexOfFirstRecipe,
      indexOfLastRecipe
    );

    return currentRecipes.map((recipe) => {
      return <RecipeCard key={recipe.id} recipe={recipe} />;
    });
  };

  return (
    <div key={recipes.length}>
      <div className={styles.resultContainer}>{handleRecipesRender()}</div>
      {recipes.length !== 0 ? (
        <Pagination
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          actualRecipes={actualRecipes}
        />
      ) : null}
    </div>
  );
};

export default SearchResults;
