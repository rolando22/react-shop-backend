const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');

const UserService = require('../../../services/user.service');

const service = new UserService();

const LocalStrategy = new Strategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    async (email, password, done) => {
        try {
            const user = await service.findByEmail(email);
            if (!user) return done(boom.unauthorized('user incorrect.'), false);
            const isMatch = bcrypt.compare(password, user.password);
            if (!isMatch) return done(boom.unauthorized('password incorrect.'), false);
            delete user.dataValues.password;
            return done(null, user);
        } catch (error) {
            done(error, false);
        }
    },
);

module.exports = LocalStrategy;
