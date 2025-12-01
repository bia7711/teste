// models/Voluntario.js
module.exports = (sequelize, DataTypes) => {
    const Voluntario = sequelize.define("Voluntario", {
        id_voluntario: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        nome: { type: DataTypes.STRING, allowNull: false },
        sobrenome: { type: DataTypes.STRING, allowNull: false },
        cpf: { type: DataTypes.STRING, allowNull: false, unique: true },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        senha: { type: DataTypes.STRING, allowNull: false },
        telefone: DataTypes.STRING,
        endereco: DataTypes.STRING,
        data_nascimento: DataTypes.DATE,
        data_inscricao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, {
        tableName: "voluntario",
        timestamps: false
    });
    return Voluntario;
};
