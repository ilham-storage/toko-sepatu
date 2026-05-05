const express        = require('express');
const router         = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
    checkout,
    getOrders,
    getOrderDetail
} = require('../controllers/orderController');

// Semua route order butuh token!
router.post('/checkout', authMiddleware, checkout);
router.get('/',          authMiddleware, getOrders);
router.get('/:id',       authMiddleware, getOrderDetail);

module.exports = router;