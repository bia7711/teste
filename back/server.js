// 1. Importar dependências essenciais
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');

// Carregar variáveis de ambiente
dotenv.config();

// 2. Inicializa o Express e define a porta
const app = express();
const PORT = process.env.PORT || 3001;

// 3. Middlewares Globais

// Configuração de Sessão
app.use(session({
    secret: process.env.SESSION_SECRET || 'chave_secreta_default',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 // 1 dia
    }
}));

// CORS
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Servir arquivos estáticos do front-end
const frontendPath = path.join(__dirname, '../');
app.use(express.static(frontendPath));


// 5. Conectar ao Banco com Sequelize
console.log("🔄 Conectando ao banco MySQL via Sequelize...");

const { sequelize } = require('./models'); // Importa index.js dos models

sequelize.authenticate()
    .then(() => console.log("✅ Conexão com MySQL estabelecida!"))
    .catch(err => console.error("❌ ERRO ao conectar ao MySQL:", err));


// 6. Importar TODAS as rotas criadas
const authRoutes = require('./routes/authRoutes');
const contatoRoutes = require('./routes/contatoRoutes');
const doacaoRoutes = require('./routes/doacaoRoutes');
const voluntarioRoutes = require('./routes/voluntarioRoutes');
const perfilRoutes = require('./routes/perfilRoutes');
const empresasRoutes = require('./routes/empresasRoutes');
const administradorRoutes = require('./routes/administradorRoutes');
const tipoPagamentoRoutes = require('./routes/tipoPagamentoRoutes');
const pagamentoRoutes = require('./routes/pagamentoRoutes');


// 7. Registrar rotas com prefixo /api
app.use('/api/auth', authRoutes);
app.use('/api/contato', contatoRoutes);
app.use('/api/doacao', doacaoRoutes);
app.use('/api/voluntarios', voluntarioRoutes);
app.use('/api/perfil', perfilRoutes);
app.use('/api/empresas', empresasRoutes);
app.use('/api/administrador', administradorRoutes);
app.use('/api/tipo-pagamento', tipoPagamentoRoutes);
app.use('/api/pagamento', pagamentoRoutes);


// 8. Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📌 Back-end iniciado com todas as rotas em /api/`);
});
