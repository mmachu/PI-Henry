const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "diet",
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamp: false,
      created_on: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};
