import React from "react";
import { useLocation } from "react-router-dom";

import { NavLink } from "react-router-dom";
import styles from "./createrecipe.module.css";

function useQuery() {
  const location = useLocation();

  return location;
}

const CreateRecipe = () => {
  let query = useQuery();
  console.log(query);
  return <div>hola</div>;
};

export default CreateRecipe;
