import React, { Component } from "react";
import styles from "./filtermenu.module.css";

const FilterMenu = () => {
  return (
    <div id="test" className={styles.filterContainer}>
      <ul className={styles.ul}>
        <li className={styles.diet}>
          Gluten Free
          <input type="checkbox" id="1" name="Gluten Free" value="1"></input>
        </li>
        <li className={styles.diet}>
          Ketogenic
          <input type="checkbox" id="2" name="Ketogenic" value="2"></input>
        </li>
        <li className={styles.diet}>
          Vegetarian
          <input type="checkbox" id="3" name="Vegetarian" value="3"></input>
        </li>
        <li className={styles.diet}>
          Lacto-Vegetarian
          <input
            type="checkbox"
            id="4"
            name="Lacto-Vegetarian"
            value="4"
          ></input>
        </li>
        <li className={styles.diet}>
          Ovo-Vegetarian
          <input type="checkbox" id="5" name="Ovo-Vegetarian" value="5"></input>
        </li>
        <li className={styles.diet}>
          Vegan
          <input type="checkbox" id="6" name="Vegan" value="6"></input>
        </li>
        <li className={styles.diet}>
          Pescetarian
          <input type="checkbox" id="7" name="Pescetarian" value="7"></input>
        </li>
        <li className={styles.diet}>
          Paleo
          <input type="checkbox" id="8" name="Paleo" value="8"></input>
        </li>
        <li className={`${styles.diet} ${styles.lastItem}`}>
          Primal
          <input type="checkbox" id="9" name="Primal" value="9"></input>
        </li>
      </ul>
    </div>
  );
};

export default FilterMenu;
