const { Router } = require("express");
const https = require("https");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Recipe, RecipeDiet, Diet, Op } = require("../db.js");
//const {  } = require("sequelize");
const { send } = require("process");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/recipes", async (req, res) => {
  const name = req.query.name;
  console.log("ta por aca perrin");
  try {
    const recipes = await Recipe.findAll({
      where: {
        title: {
          [Op.like]: `%${name}%`,
        },
      },
      attributes: ["id", "title", "image", "h_lvl"],
      include: [
        { model: Diet, attributes: ["name"], through: { attributes: [] } },
      ],
    });
    res.status(200).send(recipes);
    // https.get(
    //   `https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=33ad83164c5b4a189915daf114101f1b&number=1`,
    //   (resp) => {
    //     let data = "";
    //     resp
    //       .on("data", (chunk) => {
    //         data += chunk;
    //       })
    //       .on("end", () => {
    //         if (recipes.length === 0 && data.results.length === 0) {
    //           res.status(404).send("No se encontraron recetas");
    //         }
    //         let result = { spoonacular: JSON.parse(data), foodDB: recipes };
    //         res.status(200).send(result);
    //       });
    //   }
    // );
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!Number(id)) {
      let recipe = await Recipe.findOne({
        where: { recipe_id: id },
        include: [
          { model: Diet, attributes: ["name"], through: { attributes: [] } },
        ],
      });
      if (Object.keys(recipe).length === 0) {
        res.status(404).send("No se encontró la receta");
      } else {
        res.status(200).send(recipe);
      }
    } else {
      https.get(
        `https://api.spoonacular.com/recipes/${id}?information&apiKey=${process.env.API_KEY}&addRecipeInformation=true`,
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
                let result = JSON.parse(data);
                res.status(201).send(result);
              });
          }
        }
      );
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/diets", async (req, res) => {
  try {
    const diets = await Diet.findAll({
      attributes: ["name"],
    });
    res.status(200).send(diets);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/recipes", async (req, res) => {
  const { title, description, image, h_lvl, s_by_s, diets } = req.body;
  try {
    const dietList = await Diet.findAll();
    const dietIDs = dietList.map((diet) => diet.id);
    let dietsIdsToAdd = [];
    for (let i = 0; i < diets.length; i++) {
      if (!dietIDs.includes(diets[i].id)) {
        throw new Error(`La dieta ${diets[i].name} no existe`);
      } else {
        dietsIdsToAdd.push(diets[i].id);
      }
    }
    const newRecipe = await Recipe.create({
      id: (+new Date()).toString(36) + "food",
      title: title,
      image: image,
      description: description,
      h_lvl: h_lvl,
      s_by_s: s_by_s,
    });
    newRecipe.addDiet(dietsIdsToAdd);
    res.status(201).send(newRecipe);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get("/test", async (req, res) => {
  const dietitas = await Diet.findAll();
  res.status(200).send(dietitas);
});

module.exports = router;
