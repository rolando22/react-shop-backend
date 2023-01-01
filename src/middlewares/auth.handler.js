const boom = require('@hapi/boom');
const { config: { apiKey } } = require('../config');

function checkApiKey(req, res, next) {
    const apiKeyReq = req.headers['api'];
    if (apiKeyReq === apiKey) return next();
    next(boom.unauthorized());
}

module.exports = { checkApiKey };
