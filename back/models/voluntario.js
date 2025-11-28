module.exports = (sequelize, DataTypes) => {
  const Voluntario = sequelize.define("Voluntario", {
    id_voluntario: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    telefone: DataTypes.STRING,
    data_nascimento: DataTypes.DATE,
    endereco: DataTypes.STRING,
    data_inscricao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: "voluntario",
    timestamps: false
  });

  return Voluntario;
};
