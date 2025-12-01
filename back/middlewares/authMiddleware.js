// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({
            auth: false,
            needLogin: true,
            message: "Você precisa estar logado para se candidatar."
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.voluntarioId = decoded.id; // salva ID do voluntário no request
        next();
    } catch (error) {
        return res.status(401).json({
            auth: false,
            needLogin: true,
            message: "Token inválido ou expirado. Faça login novamente."
        });
    }
};
