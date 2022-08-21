const axios = require("axios");
const helper = require("../helper/helpers.js");
const API_KEY = process.env.API_KEY;

module.exports = {
  getRecipes: async (recipeName) => {
    const recipesResult = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${recipeName}&apiKey=${API_KEY}&number=100&addRecipeInformation=true`,
      (req, resp) => {
        return resp;
      }
    );
    let manageableResults = JSON.parse(
      JSON.stringify(recipesResult.data.results)
    );
    return helper.recipeImportantFields(manageableResults);
  },
  getRecipeByID: async (id) => {
    const recipeResult = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`,
      (req, resp) => {
        return resp;
      }
    );
    let manageableResults = JSON.parse(JSON.stringify(recipeResult.data));
    return helper.byIdCleanup(manageableResults);
  },
};
