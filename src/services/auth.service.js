const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

const UserService = require('../../../services/user.service');
const { config: { jwtSecret } } = require('../config');

const service = new UserService();

class AuthService {

    async getUser (email, password) {
        const user = await service.findByEmail(email);
        if (!user) throw boom.unauthorized('user incorrect.');
        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) throw boom.unauthorized('password incorrect.');
        delete user.dataValues.password;
        return user;
    }

    signToken (user) {
        const payload = {
            sub: user.id,
            role: user.role,
        };
        const token = jwt.sign(payload, jwtSecret);
        return { user, token };
    }

}

module.exports = AuthService;
