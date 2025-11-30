module.exports = (sequelize, DataTypes) => {
 const Perfil = sequelize.define("Perfil", {
 id_perfil: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
 id_voluntario: {
        type: DataTypes.INTEGER,
        allowNull: false, // O perfil DEVE ter um voluntário
        unique: true      // Garante a relação One-to-One
    },
 bio: DataTypes.TEXT,
 data_criacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
 }, {
 tableName: "perfil",
 timestamps: false
 });

 return Perfil;
};