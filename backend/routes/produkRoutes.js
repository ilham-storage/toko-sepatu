const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
    getProduk,
    getProdukById,
    getProdukByKategori,
    tambahProduk,
    editProduk,
    hapusProduk
} = require('../controllers/produkController');

//Publik tidak perlu token
// Publik
router.get('/',    getProduk);    // GET /produk atau /produk?kategori=sneakers
router.get('/:id', getProdukById);

// Admin only
router.post('/',    authMiddleware, tambahProduk);
router.put('/:id',  authMiddleware, editProduk);
router.delete('/:id', authMiddleware, hapusProduk);

module.exports = router;