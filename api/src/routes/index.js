const { Router } = require("express");
const https = require("https");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Recipe, RecipeDiet, Diet, Op } = require("../db.js");
//const {  } = require("sequelize");
const { send } = require("process");
const helper = require("../helper/helpers.js");
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
  if (!name) throw new Error("No se ha especificado un nombre de receta");
  try {
    const recipesResult = await Recipe.findAll({
      where: {
        title: {
          [Op.like]: `%${name}%`,
        },
      },
      attributes: ["id", "title", "image", "healthScore"],
      include: [
        { model: Diet, attributes: ["name"], through: { attributes: [] } },
      ],
    });
    const recipes = recipesResult.map((recipe) => {
      if (recipe.diets.length > 0) {
        return {
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
          healthScore: recipe.healthScore,
          diets: recipe.diets.map((diet) => diet.name.toLowerCase()),
        };
      } else {
        return recipe;
      }
    });

    let dietSet = new Set();
    recipes.forEach((recipe) => {
      if (recipe.diets.length > 0) {
        recipe.diets.forEach((diet) => {
          // console.log(diet);
          // let lowerDiet =
          //   diet.name?.toLowerCase() || diet.toLowerCase();
          dietSet.add(diet);
        });
      }
    });
    let dietsArr = Array.from(dietSet);
    recipes.push(dietsArr);
    res.status(200).send(recipes);

    // https.get(
    //   `https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=${process.env.API_KEY}&number=20&addRecipeInformation=true`,
    //   (resp) => {
    //     let data = "";
    //     resp
    //       .on("data", (chunk) => {
    //         data += chunk;
    //       })
    //       .on("end", () => {
    //         const jsonData = JSON.parse(data);
    //         const spoonacularResults = jsonData.results.map((recipe) => {
    //           return {
    //             id: recipe.id,
    //             title: recipe.title,
    //             image: recipe.image,
    //             description: recipe.description,
    //             diets: recipe.diets,
    //             healthScore: recipe.healthScore,
    //             steps: recipe.steps,
    //           };
    //         });

    //         if (recipes.length === 0 && spoonacularResults.length === 0) {
    //           res.status(404).send("No se encontraron recetas");
    //         }
    //         let results = [...spoonacularResults, ...recipes];
    //         let dietSet = new Set();
    //         results.forEach((recipe) => {
    //           if (recipe.diets.length > 0) {
    //             recipe.diets.forEach((diet) => {
    //               dietSet.add(diet);
    //             });
    //           }
    //         });
    //         let dietsArr = Array.from(dietSet);
    //         results.sort((a, b) => {
    //           return a.title < b.title ? -1 : 1;
    //         });
    //         results.push(dietsArr);
    //         res.status(200).send(results);
    //       });
    //   }
    // );
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
      if (Object.keys(recipe).length === 0) {
        res.status(404).send("No se encontró la receta");
      } else {
        recipe = helper.cleanDescription(recipe);
        res.status(200).send(recipe);
      }
    } else {
      https.get(
        `https://api.spoonacular.com/recipes/${id}?apiKey=${process.env.API_KEY}&addRecipeInformation=true`,
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
                recipe = JSON.parse(data);
                res.status(201).send(recipe);
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
  const { title, description, image, healthScore, steps, diets, ingredients } =
    req.body;
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
      description: description,
      healthScore: healthScore,
      ingredients: ingredients,
      steps: steps,
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
