import React from "react";
import styles from "./searchresults.module.css";
import RecipeCard from "../RecipeCard/RecipeCard.jsx";

const SearchResults = () => {
  return (
    <div className={styles.resultContainer}>
      {/* Comienzo del gif de loading */}
      {/* <div className={styles.loading}>
         <img className={styles.loadingImage} src="loading.svg" /> 
      </div> */}
      {/* Fin del gif de loading */}
      {/* <div className={styles.cardContainer}> */}
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      {/* </div> */}
      {/* <div className={styles.cardContainer}> */}
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      {/* </div> */}
    </div>
  );
};

export default SearchResults;
