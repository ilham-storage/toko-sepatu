const db = require('../config/db');

//get card user
const getCart = async (req, res) => {
    try{
        const userId = req.user.id;

        const [rows] = await db.query(
            `SELECT 
                cart.id,
                cart.jumlah,
                produk.nama,
                produk.harga,
                produk.gambar,
                (cart.jumlah * produk.harga) AS subtotal
            FROM cart
            JOIN produk ON cart.produk_id = produk.id
            WHERE cart.user_id = ?`,
            [userId]
        );

        //Hitung total belanja
        const total = rows.reduce((acc, item) => acc + item.subtotal, 0);

        res.json({ cart: rows, total});

    } catch (err){
        console.error(err);
        res.status(500).json({ message: "Terjadi kesalahan server"});
    }
};

//tambah ke cart
const tambahCart = async (req, res) => {
    try{
        const userId = req.user.id;
        const { produk_id, jumlah } = req.body;

        //cek produk ada
        const [cekProduk] = await db.query(
            'SELECT * FROM produk WHERE id = ?',
            [produk_id]
        );

        if(cekProduk.length === 0){
            return res.status(404).json({
                message: "Produk tidak ditemukan!"
            });
        }

        //Cek stok cukup
        if(cekProduk[0].stok < jumlah){
            return res.status(400).json({
                message: "Stok tidak cukup!"
            });
        }

        //cek produk sudah ada di cart
        const [cekCart] = await db.query(
            'SELECT * FROM cart WHERE user_id = ? AND produk_id = ?',
            [userId, produk_id]
        );

        if(cekCart.length > 0 ){
            //kalau sudah ada -> update jumlahnya
            await db.query(
                'UPDATE cart SET jumlah = jumlah + ? WHERE user_id = ? AND produk_id = ?',
                [jumlah, userId, produk_id]
            );
        } else{
            //kalau belum ada -> tambah baru
            await db.query(
                'INSERT INTO cart(user_id, produk_id, jumlah) VALUES (?, ?, ?)',
                [userId, produk_id, jumlah]
            );
        }

        res.json({ message: "Produk berhasil ditambahkan ke cart!"});

    }catch (err){
        res.status(500).json({
            message: "Terjadi kesalahan server"
        });
    }
};

//update jumlah di cart
const updateCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cartId = req.params.id;
        const { jumlah } = req.body;

        //jumlah minimal 1
        if (jumlah < 1) {
            return res.status(400).json({
                message: "Jumlah minimal 1!"
            });
        }

        //cek cart ada dan milik user ini
        const [cekCart] = await db.query(
            'SELECT * FROM cart WHERE id = ? AND user_id = ?',
            [cartId, userId]
        );

        if (cekCart.length === 0) {
            return res.status(404).json({
                message : "Item cart tidak ditemukan!"
            });
        }

        await db.query(
            'UPDATE cart SET jumlah = ? WHERE id = ? AND user_id = ?',
            [jumlah, cartId, userId]
        );

        res.json({ message: "cart berhasil diupdate!"});

    } catch (err){
        res.status(500).json({
            message : "Terjadi kesalahan server"
        });
    }
};

//hapus dari cart
const hapusDariCart = async (req, res) => {
    try{
        const userId = req.user.id;
        const cartId = req.params.id;

        //cek car ada dan milik user ini
        const [cekCart] = await db.query(
            'SELECT * FROM cart WHERE id = ? AND user_id = ?',
            [cartId, userId]
        );

        if(cekCart.lenght === 0 ) {
            return res.status(404).json({
                message : "Item cart tidak ditemukan!"
            });
        }

        await db.query(
            'DELETE FROM cart WHERE id = ? AND user_id = ?',
            [cartId, userId]
        );

        res.json({ message: "Produk berhasil dihapus dari cart!"});

    } catch (err){
        res.status(500).json({
            message: "Terjadi kesalahan server"
        });
    }
};

const kosongkanCart = async (req,res) => {
    try {
        const userId = req.user.id;

        await db.query(
            'DELETE FROM cart WHERE user_id = ?',
            [userId]
        );

        res.json({ message: "Cart berhasil dikosongkan!"});

    } catch (err) {
        res.status(500).json({
            message: "Terjadi kesalahan server"
        });
    }
};




module.exports = {
    getCart,
    tambahCart,
    updateCart,
    hapusDariCart,
    kosongkanCart,
}