const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("activity", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dificulty: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
        max: 5,
        min: 1,
      },
    },
    duration: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
      },
    },
    season: {
      type: DataTypes.STRING,
    },
  });
};
