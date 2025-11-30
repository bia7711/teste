// back/middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');

// 🔑 LÊ A CHAVE SECRETA DO SEU ARQUIVO .ENV
const JWT_SECRET = process.env.JWT_SECRET; 

module.exports = (req, res, next) => {
    // 1. Tenta obter o token do cabeçalho 'Authorization'
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        // Se não houver token, nega acesso (401 Unauthorized)
        return res.status(401).json({ error: 'Acesso negado: Token não fornecido.' });
    }

    // 2. Extrai o token (Esperado: "Bearer [TOKEN_AQUI]")
    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ error: 'Formato de token inválido.' });
    }

    try {
        // 3. Verifica o token usando a chave secreta
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // 4. Anexa os dados do usuário à requisição
        req.user = decoded; 

        // 5. Prossegue para o próximo middleware/rota
        return next();
    } catch (err) {
        // Se o token for inválido ou expirado
        return res.status(401).json({ error: 'Token inválido ou expirado.' });
    }
};