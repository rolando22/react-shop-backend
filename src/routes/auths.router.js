const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { config: { jwtSecret } } = require('../config');

router.post('/login', 
    passport.authenticate('local', { session: false }), 
    async (req, res, next) => {
        try {
            const { user } = req;
            const payload = {
                sub: user.id,
                role: user.role,
            };
            const token = jwt.sign(payload, jwtSecret);
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
