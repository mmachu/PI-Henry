module.exports = {
  cleanDescription: (recipe) => {
    let newDescription = [];
    for (var i = 0; i < recipe.description.length; i++) {
      if (recipe.description[i] === "<") {
        if (recipe.description[i + 2] === ">") {
          i = i + 2;
        } else if (recipe.description[i + 3] === ">") {
          i = i + 3;
        } else {
          for (let n = i; n < recipe.description.length; n++) {
            if (recipe.description[n] === ">") {
              i = n;
              break;
            }
          }
        }
      } else {
        newDescription.push(recipe.description[i]);
      }
    }
    recipe.description = newDescription.join("");
    return recipe;
  },
};
