const axios = require("axios");
const helper = require("../helper/helpers.js");
const API_KEY = process.env.API_KEY;

module.exports = {
  getRecipes: async (recipeName) => {
    const recipesResult = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${recipeName}&apiKey=e6d2c1e2ab284a09a790e6908a3ca627&number=20&addRecipeInformation=true`,
      (req, resp) => {
        return resp;
      }
    );
    let manageableResults = JSON.parse(
      JSON.stringify(recipesResult.data.results)
    );
    return helper.recipeImportantFields(manageableResults);
    //JSON.parse(JSON.stringify(recipesResult.data.results));
  },
};
