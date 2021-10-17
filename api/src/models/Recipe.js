const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
        allowNull: false,
      },
      nombre: {
        //Title
        type: DataTypes.STRING,
        allowNull: false,
      },
      resumen_receta: {
        //Summary
        type: DataTypes.TEXT,
        allowNull: false,
      },
      puntuacion: {
        //
        type: DataTypes.INTEGER,
      },
      nivel_comida_saludable: {
        type: DataTypes.INTEGER,
      },
      paso_a_paso: {
        type: DataTypes.TEXT,
      },
      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
