module.exports = (sequelize, DataTypes) => {
 const TipoPagamento = sequelize.define("TipoPagamento", {
 id_tipo_pagamento: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
 metodo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Garante que não haja tipos de pagamento duplicados
    }
 }, {
 tableName: "tipo_pagamento",
 timestamps: false
 });

 return TipoPagamento;
};