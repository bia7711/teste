module.exports = (sequelize, DataTypes) => {
 const Contato = sequelize.define("Contato", {
 id_contato: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
 
 // CAMPOS DEVE SER explícitamente NOT NULL (allowNull: false)
nome: {
 type: DataTypes.STRING,
 allowNull: false
 },
 sobrenome: {
 type: DataTypes.STRING,
 allowNull: false
},
email: {
 type: DataTypes.STRING,
 allowNull: false
 },
mensagem: {
 type: DataTypes.TEXT,
 allowNull: false
},
    
 data_envio: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
 }, {
 tableName: "contato",
 timestamps: false
 });

 return Contato;
};