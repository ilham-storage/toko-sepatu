const express        = require('express');
const router         = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
    checkout,
    getOrders,
    getOrderDetail,
    updateStatusOrder,
    getAllOrders,
    hapusOrder
} = require('../controllers/orderController');

// Semua route order butuh token!
router.post('/checkout', authMiddleware, checkout);
router.get('/admin/all', authMiddleware, getAllOrders);
router.get('/',          authMiddleware, getOrders);
router.get('/:id',       authMiddleware, getOrderDetail);

//route admin
router.patch('/:id/status', authMiddleware, updateStatusOrder);
router.delete('/:id', authMiddleware, hapusOrder);


module.exports = router;