import {
  LOAD_RECIPES,
  SELECT_RECIPE,
  WIPE_RECIPES,
  UNSELECT_RECIPE,
} from "../Actions/actions.js";

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
  }
};
