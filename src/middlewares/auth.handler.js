const boom = require('@hapi/boom');
const { config: { apiKey } } = require('../config');

function checkApiKey (req, res, next) {
    const apiKeyReq = req.headers['api'];
    if (apiKeyReq === apiKey) return next();
    next(boom.unauthorized());
}

function checkRoles (...roles) {
    return (req, res, next) => {
        const { user } = req;
        if (roles.includes(user.role)) return next();
        next(boom.forbidden('Se requieren permisos de administrador'));
    };
}

module.exports = { checkApiKey, checkRoles };
