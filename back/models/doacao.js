module.exports = (sequelize, DataTypes) => {
  const Doacao = sequelize.define("Doacao", {
    id_doacao: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    telefone: DataTypes.STRING,
    data_nascimento: DataTypes.DATE,
    sexo: DataTypes.ENUM("Masculino", "Feminino", "Outro"),
    como_ficou_sabendo: DataTypes.STRING,
    valor_doacao: DataTypes.DECIMAL,
    id_pagamento: DataTypes.INTEGER,
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: "doacao",
    timestamps: false
  });

  return Doacao;
};
