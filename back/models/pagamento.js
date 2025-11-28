module.exports = (sequelize, DataTypes) => {
  const Pagamento = sequelize.define("Pagamento", {
    id_pagamento: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    id_tipo_pagamento: DataTypes.INTEGER,
    pix_qrcode: DataTypes.BLOB,
    pix_chave: DataTypes.STRING,
    cartao_numero_mascarado: DataTypes.STRING,
    cartao_nome: DataTypes.STRING,
    boleto_codigo: DataTypes.STRING
  }, {
    tableName: "pagamento",
    timestamps: false
  });

  return Pagamento;
};
