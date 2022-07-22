export const LOAD_RECIPES = "LOAD_RECIPES";
export const SELECT_RECIPE = "SELECT_RECIPE";
export const WIPE_RECIPES = "WIPE_RECIPES";
export const UNSELECT_RECIPE = "UNSELECT_RECIPE";

export const loadRecipes = (recipes) => {
  return function (dispatch) {
    return dispatch({ type: LOAD_RECIPES, payload: recipes });
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
