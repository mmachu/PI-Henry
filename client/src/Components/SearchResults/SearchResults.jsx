import React from "react";
import styles from "./searchresults.module.css";
import RecipeCard from "../RecipeCard/RecipeCard.jsx";

const SearchResults = () => {
  return (
    <div className={styles.resultContainer}>
      {/* <div className={styles.cardContainer}> */}
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      {/* </div> */}
      {/* <div className={styles.cardContainer}> */}
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      {/* </div> */}
    </div>
  );
};

export default SearchResults;
