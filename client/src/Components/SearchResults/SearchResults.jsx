import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./searchresults.module.css";
import RecipeCard from "../RecipeCard/RecipeCard.jsx";
import Pagination from "../Pagination/Pagination.jsx";

const SearchResults = ({ selectedDiets }) => {
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
      let recipeDietNames = recipe.diets.map((diet) => diet.name);
      let selectedDietNames = selectedDiets.map((diet) => diet.name);
      let hasDiet = recipeDietNames.filter((diet) =>
        selectedDietNames.includes(diet)
      );
      console.log(hasDiet);
      if (hasDiet.length > 0) {
        return (
          <div key={recipe + i} className={styles.recipeCard}>
            <RecipeCard recipe={recipe} />
          </div>
        );
      }
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
