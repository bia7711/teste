module.exports = (sequelize, DataTypes) => {
  const Contato = sequelize.define("Contato", {
    id_contato: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: DataTypes.STRING,
    sobrenome: DataTypes.STRING,
    email: DataTypes.STRING,
    mensagem: DataTypes.TEXT,
    data_envio: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: "contato",
    timestamps: false
  });

  return Contato;
};
