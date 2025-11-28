module.exports = (sequelize, DataTypes) => {
  const Administrador = sequelize.define("Administrador", {
    id_administrador: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    telefone: DataTypes.STRING
  }, {
    tableName: "administrador",
    timestamps: false
  });

  return Administrador;
};
