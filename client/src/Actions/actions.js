export const LOAD_RECIPES = "LOAD_RECIPES";
export const GET_RECIPES = "GET_RECIPES";
export const LOAD_DIETS = "LOAD_DIETS";

export const SELECT_RECIPE = "SELECT_RECIPE";
export const WIPE_RECIPES = "WIPE_RECIPES";
export const UNSELECT_RECIPE = "UNSELECT_RECIPE";

export function loadRecipes(recipes) {
  // return function (dispatch) {
  //   return dispatch({ type: LOAD_RECIPES, payload: recipes });
  // };
  return {
    type: LOAD_RECIPES,
    payload: recipes,
  };
}

export const getLoadedRecipes = () => {
  return {
    type: GET_RECIPES,
  };
};

export const loadDiets = (diets) => {
  return {
    type: LOAD_DIETS,
    payload: diets,
  };
};

export const selectRecipe = (id) => {
  return function (dispatch) {
    return dispatch({ type: SELECT_RECIPE, payload: id });
  };
};

export const wipeRecipes = () => {
  return function (dispatch) {
    return dispatch({ type: WIPE_RECIPES, payload: [] });
  };
};

export const unselectRecipe = () => {
  return function (dispatch) {
    return dispatch({ type: UNSELECT_RECIPE, payload: null });
  };
};
