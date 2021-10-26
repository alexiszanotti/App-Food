const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        //Nombre
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        //Summary
        type: DataTypes.TEXT,
        allowNull: false,
      },
      spoonacularScore: {
        //
        type: DataTypes.INTEGER,
      },
      healthScore: {
        type: DataTypes.INTEGER,
      },
      instructions: {
        type: DataTypes.TEXT,
      },
    },
    { timestamps: false }
  );
};
