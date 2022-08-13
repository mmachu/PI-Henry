import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./main.module.css";
import { TbDeviceFloppy, TbFilter } from "react-icons/tb";
import { MdBrightness1, MdOutlineCreate, MdSearch } from "react-icons/md";
import { SiCookiecutter } from "react-icons/si";
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";
import img1 from "../../assets/main/main-bg1.jpg";
import img2 from "../../assets/main/main-bg2.jpg";
import img3 from "../../assets/main/main-bg3.jpg";
const Main = () => {
  const [intervalID, setIntervalID] = useState(null);
  //const [userSelection, setUserSelection] = useState(true);

  useEffect(() => {
    setIntervalID(setInterval(changeBackground, 5000));
  }, []);

  let imageID = 0;

  const images = [img1, img2, img3];

  const changeBackground = () => {
    let section = document.querySelector("section");
    section.style.backgroundImage = `url(${images[imageID]})`;
    imageID === 2 ? (imageID = 0) : imageID++;
  };

  const stopInterval = () => {
    clearInterval(intervalID);
  };

  // const handleSelection = (e) => {
  //   const register = document.getElementById("r");
  //   const login = document.getElementById("l");
  //   if (
  //     e.currentTarget.id === "l" &&
  //     register.classList.contains(styles.active)
  //   ) {
  //     register.classList.remove(styles.active);
  //     login.classList.add(styles.active);
  //     setUserSelection(true);
  //   } else if (
  //     e.currentTarget.id === "r" &&
  //     login.classList.contains(styles.active)
  //   ) {
  //     login.classList.remove(styles.active);
  //     register.classList.add(styles.active);
  //     setUserSelection(false);
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  return (
    <section className={styles.background}>
      <div className={styles.styleSetter}>
        <div className={styles.textContainer}>
          {/* <NavLink to="/index" style={{ textDecoration: "none", margin: "0px" }}> */}
          <h2 className={styles.h2}>Food PI</h2>
          <p className={styles.activites1}>En esta pagina podras:</p>
          <ul className={styles.ul}>
            <li className={styles.activities2}>
              <MdSearch /> - Buscar recetas
            </li>
            <li className={styles.activities2}>
              <SiCookiecutter /> - Ver el paso a paso de cada receta
            </li>
            <li className={styles.activities2}>
              <TbFilter /> - Filtrar recetas por tipo de dieta
            </li>
            <li className={styles.activities2}>
              <MdOutlineCreate /> - Crear tus propias recetas
            </li>
            <li className={styles.activities2}>
              <TbDeviceFloppy /> - Guardar tus recetas favoritas
            </li>
          </ul>
          {/* </NavLink> */}
        </div>
      </div>
      <div className={styles.formContainer}>
        {/* <div className={styles.form}>
          <div className={styles.formButtonsContainer}>
            <div
              id="l"
              className={`${styles.formButtons} ${styles.active}`}
              onClick={handleSelection}
            >
              <div className={`${styles.formButtonsText} `}>Ingresar</div>
            </div>
            <div
              id="r"
              className={styles.formButtons}
              onClick={handleSelection}
            >
              <div className={styles.formButtonsText}>Registrarse</div>
            </div>
          </div>
          <form className={styles.userLogin} onSubmit={handleSubmit}>
            {userSelection ? <Login intervalID={intervalID} /> : <Register />}
          </form>
        </div> */}

        <NavLink
          className={styles.button}
          to="/searchRecipe"
          onClick={stopInterval}
        >
          <button className={styles.button}>Ingresar</button>
        </NavLink>
      </div>
    </section>
  );
};

export default Main;
