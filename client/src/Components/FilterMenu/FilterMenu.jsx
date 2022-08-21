import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./filtermenu.module.css";

const FilterMenu = ({ handleShowFilters, selectedDiets, setSelectedDiets }) => {
  const diets = useSelector((state) => state.diets);
  const [isChecked, setIsChecked] = useState(
    new Array(diets.length).fill(true)
  );

  useEffect(() => {
    let updatedIsChecked = [];
    diets.forEach((diet) => {
      if (selectedDiets.includes(diet)) {
        updatedIsChecked.push(true);
      } else {
        updatedIsChecked.push(false);
      }
    });
    setIsChecked([...updatedIsChecked]);
  }, []);

  const handleOnChange = (i, diet) => {
    let updatedChecked = isChecked.map((item, index) =>
      index === i ? !item : item
    );
    if (updatedChecked[i] === false) {
      let newSelectedDiets = selectedDiets.filter((d) => d !== diet);
      setSelectedDiets([...newSelectedDiets]);
    } else {
      let newSelectedDiets = [...selectedDiets, diet];
      setSelectedDiets([...newSelectedDiets]);
    }
    setIsChecked(updatedChecked);
  };

  const renderDietName = (diet) => {
    let splitDiet = diet.split(" ");
    let pascalCaseDiets = splitDiet.map((lowerCaseDiet) => {
      return lowerCaseDiet.charAt(0).toUpperCase() + lowerCaseDiet.slice(1);
    });
    return pascalCaseDiets.join(" ");
  };

  const renderDiets = () => {
    console.log(selectedDiets);
    return diets.map((diet, i) => {
      return (
        <li key={diet} className={styles.diet}>
          {renderDietName(diet)}
          <input
            checked={isChecked[i]}
            type="checkbox"
            id={diet.id}
            name={diet}
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
