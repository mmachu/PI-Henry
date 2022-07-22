export const LOAD_RECIPES = "LOAD_RECIPES";
export const SELECT_RECIPE = "SELECT_RECIPE";

export const setLoadedRecipes = (recipes) => {
  return function (dispatch) {
    return dispatch({ type: LOAD_RECIPES, payload: recipes });
  };
};

export const setSelectedRecipe = (id) => {
  return function (dispatch) {
    return dispatch({ type: SELECT_RECIPE, payload: id });
  };
};
