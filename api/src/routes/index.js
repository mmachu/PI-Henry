const { Router } = require("express");
const https = require("https");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Recipe } = require("../db.js");
const { Op } = require("sequelize");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/recipes", async (req, res) => {
  const name = req.query.name;
  console.log(`name: ${name}`);
  try {
    const recipes = await Recipe.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
    res.status(201).send(recipes);
    // https.get(
    //   `https://api.spoonacular.com/recipes/complexSearch?query=${name}&information&apiKey=${process.env.API_KEY}&addRecipeInformation=true`,
    //   (resp) => {
    //     let data = "";
    //     resp
    //       .on("data", (chunk) => {
    //         data += chunk;
    //       })
    //       .on("end", () => {
    //         let result = [JSON.parse(data), recipes];
    //         res.status(201).send(result);
    //       });
    //   }
    // );
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/recipes", async (req, res) => {
  const { name, description, h_lvl, s_by_s } = req.body;
  try {
    const nuevaReceta = await Recipe.create({
      name: name,
      description: description,
      h_lvl: h_lvl,
      s_by_s: s_by_s,
    });
    res.status(201).send(nuevaReceta);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
