import React, { useEffect, useState } from "react";

import styles from "./main.module.css";
import { TbDeviceFloppy, TbFilter } from "react-icons/tb";
import { MdOutlineCreate, MdSearch } from "react-icons/md";
import { SiCookiecutter } from "react-icons/si";
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";

const Main = () => {
  const [intervalID, setIntervalID] = useState(null);
  const [userSelection, setUserSelection] = useState(true);

  useEffect(() => {
    setIntervalID(setInterval(changeBackground, 5000));
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  let imageID = 0;
  const images = [
    "https://images.pling.com/img/00/00/61/48/12/1548289/f3bb364543e98a1e68d86a47a2927e03ec4294714cb50103cd212c20aa1b1afc7f14.jpg",
    "https://images.pling.com/img/00/00/63/48/00/1649068/c7d26d06a8dd33e0c922d9455fdab7eacac41a3a024c810db38fa0cb636f4232cca5.jpg",
    "https://wallpaperaccess.com/full/1412206.jpg",
  ];
  const changeBackground = () => {
    let section = document.querySelector("section");
    section.style.backgroundImage = `url(${images[imageID]})`;
    imageID === 2 ? (imageID = 0) : imageID++;
  };

  const handleSelection = (e) => {
    const register = document.getElementById("r");
    const login = document.getElementById("l");
    if (
      e.currentTarget.id === "l" &&
      register.classList.contains(styles.active)
    ) {
      register.classList.remove(styles.active);
      login.classList.add(styles.active);
      setUserSelection(true);
    } else if (
      e.currentTarget.id === "r" &&
      login.classList.contains(styles.active)
    ) {
      login.classList.remove(styles.active);
      register.classList.add(styles.active);
      setUserSelection(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className={styles.background}>
      <div className={styles.styleSetter}>
        <div className={styles.textContainer}>
          {/* <NavLink to="/index" style={{ textDecoration: "none", margin: "0px" }}> */}
          <h2>Food PI</h2>
          <p>En esta pagina podras:</p>
          <ul>
            <li>
              <MdSearch /> - Buscar recetas
            </li>
            <li>
              <SiCookiecutter /> - Ver el paso a paso de cada receta
            </li>
            <li>
              <TbFilter /> - Filtrar recetas por tipo de dieta
            </li>
            <li>
              <MdOutlineCreate /> - Crear tus propias recetas
            </li>
            <li>
              <TbDeviceFloppy /> - Guardar tus recetas favoritas
            </li>
          </ul>
          {/* </NavLink> */}
        </div>
      </div>
      <div className={styles.formContainer}>
        <div className={styles.form}>
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
            {userSelection ? <Login /> : <Register />}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Main;
