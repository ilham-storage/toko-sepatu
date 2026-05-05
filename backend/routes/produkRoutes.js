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
router.get('/', getProduk);
router.get('/kategori', (req, res, next) => {
    console.log("Masuk route kategori!"); // ← tambah ini
    console.log("Query:", req.query);      // ← dan ini
    next();
}, getProdukByKategori);
router.get('/:id', getProdukById);

//admin only perlu token
router.post('/', authMiddleware,tambahProduk);
router.put('/:id', authMiddleware,editProduk);
router.delete('/:id', authMiddleware,hapusProduk);

module.exports = router;