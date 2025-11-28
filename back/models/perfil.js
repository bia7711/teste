module.exports = (sequelize, DataTypes) => {
  const Perfil = sequelize.define("Perfil", {
    id_perfil: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    id_voluntario: DataTypes.INTEGER,
    bio: DataTypes.TEXT,
    data_criacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: "perfil",
    timestamps: false
  });

  return Perfil;
};
