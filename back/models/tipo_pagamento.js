module.exports = (sequelize, DataTypes) => {
  const TipoPagamento = sequelize.define("TipoPagamento", {
    id_tipo_pagamento: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    metodo: DataTypes.STRING
  }, {
    tableName: "tipo_pagamento",
    timestamps: false
  });

  return TipoPagamento;
};
