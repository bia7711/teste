// 1. Importar dependências essenciais
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
// 🗑️ Removido: const session = require('express-session'); // NÃO USA MAIS SESSÃO

// Carregar variáveis de ambiente
dotenv.config();

// 2. Inicializa o Express e define a porta
const app = express();
const PORT = process.env.PORT || 3001;

// 3. Middlewares Globais

// 🗑️ Removida a configuração de Sessão (Não é compatível com JWT)
/* app.use(session({ ... }))
*/

// CORS (Simplificado e eficiente para JWT)
app.use(cors({
    // Permite todas as origens (ou apenas as específicas como ['http://127.0.0.1:5500', 'http://localhost:5500'])
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'], // 🔑 ESSENCIAL: Permite que o Front-end envie o JWT
    credentials: false // 🗑️ Não precisa de credenciais de cookie/sessão
}));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Servir arquivos estáticos do front-end
const frontendPath = path.join(__dirname, '../');
app.use(express.static(frontendPath));


// 5. Conectar ao Banco com Sequelize
console.log("🔄 Conectando ao banco MySQL via Sequelize...");

const { sequelize } = require('./models');

sequelize.authenticate()
    .then(() => console.log("✅ Conexão com MySQL estabelecida!"))
    .catch(err => console.error("❌ ERRO ao conectar ao MySQL:", err));


// 6. Importar TODAS as rotas criadas
// 🗑️ Removido: const authRoutes = require('./routes/authRoutes'); // Arquivo deletado
const contatoRoutes = require('./routes/contatoRoutes');
const doacaoRoutes = require('./routes/doacaoRoutes');
const voluntarioRoutes = require('./routes/voluntarioRoutes');
const perfilRoutes = require('./routes/perfilRoutes');
const empresasRoutes = require('./routes/empresasRoutes');
const administradorRoutes = require('./routes/administradorRoutes');
const tipoPagamentoRoutes = require('./routes/tipoPagamentoRoutes');
const pagamentoRoutes = require('./routes/pagamentoRoutes');

// 🔑 Middleware de Autenticação JWT
const authMiddleware = require('./middlewares/authMiddleware');

// 7. Registrar rotas com prefixo /api
// Rotas Públicas (Login, Cadastro, Contato)
app.use('/api/voluntarios', voluntarioRoutes); // Contém /login e /criar
app.use('/api/empresas', empresasRoutes);      // Contém /login e /criar
app.use('/api/doacoes', doacaoRoutes);  //Rota de Doacoes
app.use('/api/contatos', contatoRoutes); //Rota de Contatos

// Rotas Protegidas (Exemplo: Tudo após o Login e Cadastro)
// Todas as rotas abaixo requerem um Token JWT válido para acesso!
app.use(authMiddleware); // Aplica o middleware JWT a TODAS as rotas a seguir!

app.use('/api/perfil', perfilRoutes);
app.use('/api/administrador', administradorRoutes);
app.use('/api/tipo-pagamento', tipoPagamentoRoutes);
app.use('/api/pagamento', pagamentoRoutes);

// 8. Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📌 Back-end iniciado com todas as rotas em /api/`);
});