module.exports = (sequelize, DataTypes) => {
  const Empresas = sequelize.define("Empresas", {
    id_empresa: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome_empresa: DataTypes.STRING,
    cnpj: DataTypes.INTEGER,
    endereço_comercial: DataTypes.STRING,
    telefone: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING
  }, {
    tableName: "empresas",
    timestamps: false
  });

  return Empresas;
};
