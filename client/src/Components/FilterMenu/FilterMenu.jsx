import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./filtermenu.module.css";

const FilterMenu = ({ handleShowFilters, selectedDiets, setSelectedDiets }) => {
  const diets = useSelector((state) => state.diets);
  const [isChecked, setIsChecked] = useState(
    new Array(diets.length).fill(true)
  );

  const handleOnChange = (i, diet) => {
    let updatedChecked = isChecked.map((item, index) =>
      index === i ? !item : item
    );
    let what = [...selectedDiets, diet.name];
    console.log(what);
    console.log(`Diet.name es ${diet.name}`);
    if (updatedChecked[i] === false) {
      let test = selectedDiets.filter((d) => d.name !== diet.name);
      setSelectedDiets([...test]);
    } else {
      console.log("entro al else");
      setSelectedDiets([...selectedDiets, { id: i, name: diet.name }]);
    }
    setIsChecked(updatedChecked);
  };

  const renderDiets = () => {
    return diets.map((diet, i) => {
      return (
        <li key={diet.name} className={styles.diet}>
          {diet.name}
          <input
            checked={isChecked[i]}
            type="checkbox"
            id={diet.id}
            name={diet.name}
            value={diet.id}
            onChange={() => handleOnChange(i, diet)}
          ></input>
        </li>
      );
    });
  };

  return (
    <div id="test" className={styles.filterContainer}>
      <ul className={styles.ul}>
        {renderDiets()}
        {/* <li className={styles.diet}>
          Gluten Free
          <input type="checkbox" id="1" name="Gluten Free" value="1"></input>
        </li>
        <li className={styles.diet}>
          Ketogenic
          <input
            checked
            type="checkbox"
            id="2"
            name="Ketogenic"
            value="2"
          ></input>
        </li>
        <li className={styles.diet}>
          Vegetarian
          <input
            checked
            type="checkbox"
            id="3"
            name="Vegetarian"
            value="3"
          ></input>
        </li>
        <li className={styles.diet}>
          Lacto-Vegetarian
          <input
            checked
            type="checkbox"
            id="4"
            name="Lacto-Vegetarian"
            value="4"
          ></input>
        </li>
        <li className={styles.diet}>
          Ovo-Vegetarian
          <input
            checked
            type="checkbox"
            id="5"
            name="Ovo-Vegetarian"
            value="5"
          ></input>
        </li>
        <li className={styles.diet}>
          Vegan
          <input checked type="checkbox" id="6" name="Vegan" value="6"></input>
        </li>
        <li className={styles.diet}>
          Pescetarian
          <input
            checked
            type="checkbox"
            id="7"
            name="Pescetarian"
            value="7"
          ></input>
        </li>
        <li className={styles.diet}>
          Paleo
          <input checked type="checkbox" id="8" name="Paleo" value="8"></input>
        </li>
        <li className={`${styles.diet} `}>
          Primal
          <input checked type="checkbox" id="9" name="Primal" value="9"></input>
        </li>
        */}
        <li
          onClick={handleShowFilters}
          className={`${styles.diet} ${styles.lastItem} ${styles.closeFilters}`}
        >
          Cerrar
        </li>
      </ul>
    </div>
  );
};

export default FilterMenu;
