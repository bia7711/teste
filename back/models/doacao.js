module.exports = (sequelize, DataTypes) => {
  const Doacao = sequelize.define("Doacao", {
    id_doacao: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    nome: {
      type: DataTypes.STRING, 
      allowNull: false 
    },
    email: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    telefone: DataTypes.STRING,
    data_nascimento: DataTypes.DATE,
    sexo: DataTypes.STRING,
    como_ficou_sabendo: DataTypes.STRING,
    valor_doacao: { 
      type: DataTypes.DECIMAL, 
      allowNull: false 
    },
    id_pagamento: DataTypes.INTEGER,
  }, {
    tableName: "doacao",

    // Aqui vem a mágica:
    timestamps: true,       // ainda cria createdAt automaticamente
    createdAt: 'created_at',
    updatedAt: false,
    underscored: true
  });

  return Doacao;
};
