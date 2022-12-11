const router = require('express').Router();

const UserService = require('../services/user.service');

const service = new UserService;

router.get('/', async (req, res, next) => {
    try {
        const users = await service.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
