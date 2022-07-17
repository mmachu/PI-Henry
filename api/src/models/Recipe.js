const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      recipe_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      h_lvl: {
        type: DataTypes.NUMERIC,
      },
      s_by_s: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
      },
      from: {
        type: DataTypes.VIRTUAL,
        get: function () {
          return "foodDB";
        },
      },
    },
    {
      timestamps: false,
      created_on: false,
    }
  );
};
