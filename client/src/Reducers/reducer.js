import { LOAD_RECIPES, SELECT_RECIPE } from "../Actions/actions.js";

const initialState = {
  loadedRecipes: [],
  selectedRecipe: null,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_RECIPES:
      return {
        ...JSON.parse(JSON.stringify(state)),
        loadedRecipes: JSON.parse(JSON.stringify(action.payload)),
      };
    case SELECT_RECIPE:
      return {
        ...JSON.parse(JSON.stringify(state)),
        selectedRecipe: JSON.parse(JSON.stringify(action.payload)),
      };
  }
};
