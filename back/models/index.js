const Sequelize = require("sequelize");
const config = require("../config/database");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: config.logging
  }
);

// Models import
const Voluntario = require("./voluntario")(sequelize, Sequelize.DataTypes);
const Perfil = require("./perfil")(sequelize, Sequelize.DataTypes);
const Empresas = require("./empresas")(sequelize, Sequelize.DataTypes);
const Administrador = require("./administrador")(sequelize, Sequelize.DataTypes);
const TipoPagamento = require("./tipo_pagamento")(sequelize, Sequelize.DataTypes);
const Pagamento = require("./pagamento")(sequelize, Sequelize.DataTypes);
const Doacao = require("./doacao")(sequelize, Sequelize.DataTypes);
const Contato = require("./contato")(sequelize, Sequelize.DataTypes);

// RELACIONAMENTOS
Voluntario.hasOne(Perfil, { foreignKey: "id_voluntario", onDelete: "CASCADE" });
Perfil.belongsTo(Voluntario, { foreignKey: "id_voluntario" });

TipoPagamento.hasMany(Pagamento, { foreignKey: "id_tipo_pagamento" });
Pagamento.belongsTo(TipoPagamento, { foreignKey: "id_tipo_pagamento" });

Pagamento.hasMany(Doacao, { foreignKey: "id_pagamento" });
Doacao.belongsTo(Pagamento, { foreignKey: "id_pagamento" });

module.exports = {
  sequelize,
  Voluntario,
  Perfil,
  Empresas,
  Administrador,
  TipoPagamento,
  Pagamento,
  Doacao,
  Contato
};
