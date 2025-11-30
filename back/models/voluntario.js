module.exports = (sequelize, DataTypes) => {
 const Voluntario = sequelize.define("Voluntario", {
 id_voluntario: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
 
 nome: {
 type: DataTypes.STRING,
 allowNull: false 
 },
 email: {
 type: DataTypes.STRING,
 allowNull: false,
        unique: true // 🔑 CRÍTICO: E-mail deve ser único para Login
 },
 senha: {
 type: DataTypes.STRING, 
 allowNull: false 
 },
 
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