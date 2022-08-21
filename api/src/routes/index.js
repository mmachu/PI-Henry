const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Recipe, RecipeDiet, Diet, Op } = require("../db.js");
const helper = require("../helper/helpers.js");
const spoonacular = require("../spoonacularAPI/spoonacularAPI.js");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/diets", async (req, res) => {
  try {
    const diets = await Diet.findAll();
    res.status(200).send(diets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/recipes", async (req, res) => {
  const name = req.query.name;
  //if (!name) throw new Error("No se ha especificado un nombre de receta");
  try {
    const recipesResult = await Recipe.findAll({
      where: {
        title: {
          [Op.iLike]: `%${name}%`,
        },
      },
      attributes: ["id", "title", "image", "healthScore", "from"],
      include: [
        { model: Diet, attributes: ["name"], through: { attributes: [] } },
      ],
    });

    const foodPIRecipes = helper.recipeImportantFields(recipesResult);
    const spoonacularResults = await spoonacular.getRecipes(name);
    const results = [...spoonacularResults, ...foodPIRecipes];
    if (results.length === 0) {
      throw new Error("No se encontraron recetas");
    }
    results.sort((a, b) => {
      return a.title < b.title ? -1 : 1;
    });

    let healthyResults = results.filter((recipe) => recipe.healthScore > 70);
    console.log(healthyResults);
    let dietsArr = Array.from(helper.recipeExtractDiets(results));
    healthyResults.push(dietsArr);
    res.status(200).send(healthyResults);
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (isNaN(Number(id))) {
      let recipe = await Recipe.findOne({
        where: { id: id },
        include: [
          { model: Diet, attributes: ["name"], through: { attributes: [] } },
        ],
      });

      if (recipe === null) {
        throw new Error("No se encontró la receta");
      } else {
        recipe = helper.byIdCleanup(recipe);
        res.status(200).send(recipe);
      }
    } else {
      let recipe = await spoonacular.getRecipeByID(id);
      let newRecipe = {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        diets: recipe.diets,
        analyzedInstructions: recipe.analyzedInstructions,
        ingredients: recipe.ingredients,
      };
      newRecipe = helper.byIdCleanup(newRecipe);
      res.status(200).send(newRecipe);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/recipes", async (req, res) => {
  const {
    title,
    summary,
    image,
    healthScore,
    analyzedInstructions,
    diets,
    ingredients,
  } = req.body;

  try {
    const dietList = await Diet.findAll();
    const dietLower = dietList.map((diet) => diet.name.toLowerCase());
    let dietsIdsToAdd = [];
    for (let i = 0; i < diets.length; i++) {
      if (!dietLower.includes(diets[i].name)) {
        throw new Error(`La dieta ${diets[i].name} no existe`);
      } else {
        dietsIdsToAdd.push(diets[i].id);
      }
    }
    const newRecipe = await Recipe.create({
      id: (+new Date()).toString(36),
      title: title,
      image: image,
      summary: summary,
      healthScore: healthScore,
      ingredients: ingredients,
      image:
        "https://t3.ftcdn.net/jpg/00/36/94/26/360_F_36942622_9SUXpSuE5JlfxLFKB1jHu5Z07eVIWQ2W.jpg",
      analyzedInstructions: analyzedInstructions,
    });
    newRecipe.addDiet(dietsIdsToAdd);
    res.status(201).send(newRecipe);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
