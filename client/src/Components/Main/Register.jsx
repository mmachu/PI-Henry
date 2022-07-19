import React, { Component } from "react";
import styles from "./main.module.css";
import { NavLink } from "react-router-dom";

const Register = () => {
  return (
    <>
      <h3>Ingrese sus datos</h3>
      <label>Email</label>
      <input type="text" />
      <label>Contraseña</label>
      <input type="password" />
      <button tpye="submit">Registrarme</button>
    </>
  );
};

export default Register;
