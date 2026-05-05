const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
    getCart,
    tambahCart,
    updateCart,
    hapusDariCart,
    kosongkanCart
} = require('../controllers/cartController');

//semua route cart butuh token!
router.get('/', authMiddleware, getCart);
router.post('/', authMiddleware, tambahCart);
router.put('/:id', authMiddleware, updateCart);
router.delete('/kosong', authMiddleware, kosongkanCart);
router.delete('/:id', authMiddleware, hapusDariCart);

module.exports = router;