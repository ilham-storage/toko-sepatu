const db = require('../config/db');

//Get semua produk
const getProduk = async (req, res) => {
    try {
        const { kategori } = req.query;

        let query  = 'SELECT * FROM produk';
        let params = [];

        // Kalau ada ?kategori=... → filter
        if (kategori) {
            query  = 'SELECT * FROM produk WHERE kategori = ?';
            params = [kategori];
        }

        const [rows] = await db.query(query, params);
        res.json(rows);

    } catch (err) {
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};

//Get prduk by id
const getProdukById = async (req, res) => {
    try { 
        const produkId = req.params.id;

        const [rows] = await db.query(
            'SELECT * FROM produk WHERE id = ?',
            [produkId]
        );

        if (rows.length === 0){
            return res.status(404).json({
                message: "Produk tidak ditemukan!"
            });
        }
        res.json(rows[0]);

    }catch (err){
        res.status(500).json({
            message: "terjadi kesalahan server"
        });
    }
};

//get produk by kategori
const getProdukByKategori = async (req, res) => {
    try{
        const { kategori } = req.query;
        console.log("Kategori:", kategori);

        const [rows] = await db.query(
            'SELECT * FROM produk WHERE kategori = ?',
            [kategori]
        );

        res.json(rows);

    }catch  (err){
        res.status(500).json({ message: "Terjadi kesalahan server"});
    }
};

//tambah produk

const tambahProduk = async (req, res) => {
    try{
        //Cek role admin
        if(req.user.role !== 'admin'){
            return res.status(403).json({
                message: "Akses ditolak! Hanya admin! "
            });
        }

        const { nama, deskripsi, harga, stok, gambar, kategori } = req.body;

        //cek data lengkap
        if(!nama || !harga || !stok){
            return res.status(400).json({
                message: "Nama, harga, stok wajib diisi!"
            });
        }

        await db.query(
            'INSERT INTO produk (nama, deskripsi, harga, stok, gambar, kategori) VALUES (?, ?, ?, ?, ?, ?)',
            [nama, deskripsi, harga, stok, gambar, kategori]
        );

        res.json({ message: "Produk berhasil ditambahkan!"});
    } catch (err){
        res.status(500).json({
            message: "Terjadi kesalahan server"
        });
    }
};

//Edit produk hanya admin yang bisa
const editProduk = async (req, res) => {
    try{
        if(req.user.role !== 'admin'){
            return res.status(403).json({
                message: "Akses ditolak! Hanya admin!"
            });
        }
        
        const produkId = req.params.id;
        const { nama, deskripsi, harga, stok, gambar, kategori } = req.body;

        //Cek produk ada
        const [cekProduk] = await db.query(
            'SELECT * FROM produk WHERE id = ?',
            [produkId]
        );

        if(cekProduk.length === 0){
            return res.status(404).json({
                message: "Produk tidak ditemukan!"
            });
        }
        await db.query(
            'UPDATE produk SET nama=?, deskripsi=?, harga=?, stok=?, gambar=?, kategori=? WHERE id=?',
            [nama, deskripsi, harga, stok, gambar, kategori, produkId]
        );

        res.json({ message: "Produk berhasil diupdate!"});

    }catch (err){
        res.status(500).json({ message: "Terjadi kesalahan server"});
    }
};

//hapus produk hanya admin

const hapusProduk = async(req, res) => {
    try{
        //cek role admin
        if (req.user.role !== 'admin'){
            return res.status(403).json({
                message: "Akses ditolak! hanya admin!"
            });
        }

        const produkId = req.params.id
        
        //cek produk ada
        const [cekProduk] = await db.query(
            'SELECT * FROM produk WHERE id = ?',
            [produkId]
        );

        if(cekProduk.length === 0) {
            return res.status(404).json({
                message: "Produk tidak ditemukan"
            });
        }

        await db.query('DELETE FROM produk WHERE id = ?', [produkId]);

        res.json({ message: "Produk berhasil dihapus!"});

    } catch (err) {
        res.status(500).json({
            message: "Terjadi kesalahan server"
        });
    }
};

module.exports = {
    getProduk,
    getProdukById,
    getProdukByKategori,
    tambahProduk,
    editProduk,
    hapusProduk
};