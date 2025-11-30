module.exports = (sequelize, DataTypes) => {
 const Empresas = sequelize.define("Empresas", {
 id_empresa: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
 nome_empresa: {
        type: DataTypes.STRING,
        allowNull: false
    },
 cnpj: {
  type: DataTypes.STRING(18), // 🛠️ CORREÇÃO: Deve ser STRING, não INTEGER
  allowNull: false,
 unique: true // Garante que o CNPJ seja único
 },
 endereço_comercial: DataTypes.STRING,
 telefone: DataTypes.STRING,
 email: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true // Garante que o E-mail seja único (CRÍTICO para Login)
    },
 senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
 }, {
 tableName: "empresas",
 timestamps: false
 });

 return Empresas;
};