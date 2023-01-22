const router = require('express').Router();
const passport = require('passport');

const AuthService = require('../services/auth.service');

const service = new AuthService();

router.post('/login', 
    passport.authenticate('local', { session: false }), 
    async (req, res, next) => {
        try {
            const { user, token } = service.signToken(req.user);
            res.json({
                data: user,
                token,
            });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
