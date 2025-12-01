module.exports = (sequelize, DataTypes) => {
    const Empresa = sequelize.define("Empresa", {
        id_empresa: { 
            type: DataTypes.INTEGER, 
            autoIncrement: true, 
            primaryKey: true 
        },
        nome_empresa: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cnpj: {
            type: DataTypes.STRING(18),
            allowNull: false,
            unique: true
        },
        endereco_comercial: {
            type: DataTypes.STRING,
            field: "endereco_comercial" // Corrige nome real no BD
        },
        telefone: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        data_cadastro: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: "empresa", // nome correto da tabela
        timestamps: false
    });

    return Empresa;
};
