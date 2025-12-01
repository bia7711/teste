const { Voluntario, Acao, Inscricao } = require('../models'); // Ajuste conforme suas tabelas

module.exports = {
    me: async (req, res) => {
        try {
            const voluntarioId = req.user.id; // definido pelo authMiddleware

            // Busca dados do voluntário (excluindo senha)
            const voluntario = await Voluntario.findByPk(voluntarioId, {
                attributes: { exclude: ['senha'] },
                include: [
                    {
                        model: Inscricao, // tabela que relaciona voluntário com ações
                        include: [
                            {
                                model: Acao, // dados da ação
                                attributes: ['id', 'nome', 'descricao']
                            }
                        ]
                    }
                ]
            });

            if (!voluntario) {
                return res.status(404).json({ error: 'Voluntário não encontrado.' });
            }

            // Mapeia as candidaturas
            const acoes_inscritas = voluntario.Inscricaos || []; 

            res.json({
                ...voluntario.toJSON(),
                acoes_inscritas
            });

        } catch (error) {
            console.error('Erro ao buscar perfil:', error);
            res.status(500).json({ error: 'Erro interno ao buscar perfil.' });
        }
    }
};
