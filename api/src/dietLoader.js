const { Diet } = require("./db.js");

const loadDiets = async () => {
  await Diet.bulkCreate([
    { name: "gluten free" },
    { name: "ketogenic" },
    { name: "vegetarian" },
    { name: "lacto vegetarian" },
    { name: "ovo vegetarian" },
    { name: "lacto ovo vegetarian" },
    { name: "vegan" },
    { name: "pescetarian" },
    { name: "paleo" },
    { name: "primal" },
    { name: "low fodmap" },
    { name: "whole30" },
    { name: "dairy free" },
  ]);
};

module.exports = loadDiets;
