const router = require('express').Router();

router.get('/:categoryId/products/:productId', (req, res) => {
    const { categoryId, productId } = req.params;
    res.json({
        categoryId: categoryId,
        productId: productId,
    });
});

module.exports = router;
