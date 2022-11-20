const router = require('express').Router();

router.get('/', (req, res) => {
    const { limit, offset } = req.query;

    if (limit && offset) return res.json({ limit, offset });
    res.send('No hay parámetros');
});

module.exports = router;
