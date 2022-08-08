import {
  LOAD_RECIPES,
  GET_RECIPES,
  LOAD_DIETS,
  LOAD_ALL_DIETS,
  SELECT_RECIPE,
  WIPE_RECIPES,
  UNSELECT_RECIPE,
} from "../Actions/actions.js";

const initialState = {
  loadedRecipes: [],
  selectedRecipe: null,
  lastSearched: "",
  diets: [],
  allDiets: [],
};

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_RECIPES:
      console.log({ x: "Esto es el reducer", payload: action.payload });
      return {
        ...JSON.parse(JSON.stringify(state)),
        loadedRecipes: JSON.parse(JSON.stringify(action.payload)),
      };
    case LOAD_ALL_DIETS:
      return {
        ...JSON.parse(JSON.stringify(state)),
        allDiets: JSON.parse(JSON.stringify(action.payload)),
      };
    case GET_RECIPES:
      console.log(...JSON.parse(JSON.stringify(state.loadedRecipes)));
      return {
        ...JSON.parse(JSON.stringify(state.loadedRecipes)),
      };
    case LOAD_DIETS:
      return {
        ...JSON.parse(JSON.stringify(state)),
        diets: JSON.parse(JSON.stringify(action.payload)),
      };

    case SELECT_RECIPE:
      return {
        ...JSON.parse(JSON.stringify(state)),
        selectedRecipe: JSON.parse(JSON.stringify(action.payload)),
      };
    case WIPE_RECIPES:
      return {
        ...JSON.parse(JSON.stringify(state)),
        loadedRecipes: [],
      };
    case UNSELECT_RECIPE:
      return {
        ...JSON.parse(JSON.stringify(state)),
        selectedRecipe: null,
      };
    default:
      return {
        ...JSON.parse(JSON.stringify(state)),
      };
  }
}
