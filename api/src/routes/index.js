const { Router } = require("express");
const https = require("https");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Recipe, RecipeDiet, Diet, Op } = require("../db.js");
//const {  } = require("sequelize");
const { send } = require("process");
const helper = require("../helper/helpers.js");
const router = Router();

const API_KEY = process.env.API_KEY;
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
  if (!name) throw new Error("No se ha especificado un nombre de receta");
  try {
    const recipesResult = await Recipe.findAll({
      where: {
        title: {
          [Op.like]: `%${name}%`,
        },
      },
      attributes: ["id", "title", "image", "healthScore", "from"],
      include: [
        { model: Diet, attributes: ["name"], through: { attributes: [] } },
      ],
    });

    const recipes = helper.recipeImportantFields(recipesResult);

    https.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=${API_KEY}&number=20&addRecipeInformation=true`,
      (resp) => {
        let data = "";
        resp
          .on("data", (chunk) => {
            data += chunk;
          })
          .on("end", () => {
            const jsonData = JSON.parse(data);

            const spoonacularResults = helper.recipeImportantFields(
              jsonData.results
            );

            if (recipes.length === 0 && spoonacularResults.length === 0) {
              res.status(404).send("No se encontraron recetas");
            }
            let results = [...spoonacularResults, ...recipes];

            let dietsArr = Array.from(helper.recipeExtractDiets(results));
            results.sort((a, b) => {
              return a.title < b.title ? -1 : 1;
            });
            results.push(dietsArr);
            res.status(200).send(results);
          });
      }
    );
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let recipe;
    if (isNaN(Number(id))) {
      recipe = await Recipe.findOne({
        where: { id: id },
        include: [
          { model: Diet, attributes: ["name"], through: { attributes: [] } },
        ],
      });

      if (recipe === null) {
        res.status(404).send("No se encontró la receta");
      } else {
        recipe = helper.byIdCleanup(recipe);
        res.status(200).send(recipe);
      }
    } else {
      https.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`,
        (resp) => {
          if (resp.statusCode === 404) {
            res.status(404).send("No se encontró la receta");
          } else {
            let data = "";
            resp
              .on("data", (chunk) => {
                data += chunk;
              })
              .on("end", () => {
                let allData = JSON.parse(data);
                let recipe = {
                  id: allData.id,
                  title: allData.title,
                  image: allData.image,
                  summary: allData.summary,
                  diets: allData.diets,
                  healthScore: allData.healthScore,
                  analyzedInstructions: allData.analyzedInstructions,
                };
                recipe = helper.byIdCleanup(recipe.results);
                res.status(200).send(recipe);
              });
          }
        }
      );
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
      analyzedInstructions: analyzedInstructions,
    });
    newRecipe.addDiet(dietsIdsToAdd);
    res.status(201).send(newRecipe);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get("/test", async (req, res) => {
  const rectitas = await Recipe.findAll({
    include: [
      { model: Diet, attributes: ["name"], through: { attributes: [] } },
    ],
  });
  res.status(200).send(rectitas);
});

module.exports = router;
