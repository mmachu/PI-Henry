const cleanSteps = (recipe) => {
  let newSteps = [];
  let ingredients = new Set();
  let broke = false;
  let steps = recipe.analyzedInstructions[0].steps
    ? recipe.analyzedInstructions[0].steps
    : recipe.analyzedInstructions;

  for (var i = 0; i < steps.length; i++) {
    if (steps[i].ingredients === undefined) {
      broke = true;
      break;
    } else {
      newSteps.push({
        number: steps[i].number,
        step: steps[i].step,
      });
      for (var n = 0; n < steps[i].ingredients.length; n++) {
        ingredients.add(steps[i].ingredients[n].name);
      }
    }
  }
  if (broke) {
    return recipe;
  } else {
    recipe.analyzedInstructions = newSteps;
    recipe.ingredients = Array.from(ingredients);
    return recipe;
  }
};

const cleanDescription = (recipe) => {
  let newDescription = [];

  for (var i = 0; i < recipe.summary.length; i++) {
    if (recipe.summary[i] === "<") {
      if (recipe.summary[i + 2] === ">") {
        i = i + 2;
      } else if (recipe.summary[i + 3] === ">") {
        i = i + 3;
      } else {
        for (let n = i; n < recipe.summary.length; n++) {
          if (recipe.summary[n] === ">") {
            i = n;
            break;
          }
        }
      }
    } else {
      newDescription.push(recipe.summary[i]);
    }
  }
  recipe.summary = newDescription.join("");
  return recipe;
};

module.exports = {
  byIdCleanup: (recipe) => {
    let newRecipe = cleanDescription(recipe);
    let newestRecipe = cleanSteps(newRecipe);
    return newestRecipe;
  },
  recipeImportantFields: (recipesResult) => {
    return recipesResult.map((recipe) => {
      if (recipe.diets.length > 0) {
        return {
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
          healthScore: recipe.healthScore,
          diets: recipe?.diets?.map((diet) => {
            return recipe.from ? diet.name.toLowerCase() : diet.toLowerCase();
          }),
        };
      } else {
        return {
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
          healthScore: recipe.healthScore,
          diets: [],
        };
      }
    });
  },
  recipeExtractDiets: (recipesResult) => {
    let dietSet = new Set();
    recipesResult.forEach((recipe) => {
      if (recipe.diets.length > 0) {
        recipe.diets.forEach((diet) => {
          dietSet.add(diet);
        });
      }
    });
    return dietSet;
  },
};
