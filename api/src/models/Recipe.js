const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(2048),
        default: null,
      },
      summary: {
        type: DataTypes.STRING(3000),
        allowNull: false,
      },
      healthScore: {
        type: DataTypes.INTEGER,
      },
      analyzedInstructions: {
        type: DataTypes.ARRAY(DataTypes.JSON),
      },
      ingredients: {
        type: DataTypes.ARRAY(DataTypes.STRING(20)),
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
