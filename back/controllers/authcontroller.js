const { Voluntario } = require("../models");
const bcrypt = require("bcrypt");

module.exports = {
    async register(req, res) {
        try {
            const { nome, email, senha } = req.body;

            const existe = await Voluntario.findOne({ where: { email } });
            if (existe) return res.status(400).json({ error: "Email já cadastrado." });

            const hash = await bcrypt.hash(senha, 10);

            const novo = await Voluntario.create({
                nome,
                email,
                senha: hash
            });

            res.status(201).json(novo);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async login(req, res) {
        try {
            const { email, senha } = req.body;

            const user = await Voluntario.findOne({ where: { email } });
            if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

            const match = await bcrypt.compare(senha, user.senha);
            if (!match) return res.status(401).json({ error: "Senha incorreta" });

            req.session.user = {
                id: user.id_voluntario,
                nome: user.nome,
                email: user.email
            };

            res.json({ message: "Login bem-sucedido!" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    logout(req, res) {
        req.session.destroy(() => {
            res.json({ message: "Logout realizado!" });
        });
    }
};
