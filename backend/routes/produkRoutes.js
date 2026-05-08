const express        = require('express');
const router         = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const upload         = require('../middleware/uploadMiddleware');

const {
    getProduk,
    getProdukById,
    tambahProduk,
    editProduk,
    hapusProduk
} = require('../controllers/produkController');

// Publik
router.get('/',    getProduk);
router.get('/:id', getProdukById);

// Admin only → tambah upload.single('gambar')
router.post('/',    authMiddleware, upload.single('gambar'), tambahProduk);
router.put('/:id',  authMiddleware, upload.single('gambar'), editProduk);
router.delete('/:id', authMiddleware, hapusProduk);

module.exports = router;