const db = require('../config/db');

//checkout
const checkout = async (req, res) => {
    try {
        const userId = req.user.id;

        //ambil semua item di cart
        const [items] = await db.query(
            `SELECT cart.*, produk.harga, produk.nama
             FROM cart
             JOIN produk ON cart.produk_id = produk.id
             WHERE cart.user_id = ?`,
            [userId]
        );

        //Cek cart tidak kosong
        if(items.length === 0){
            return res.status(400),json({
                message : "Cart masih kosong!"
            });
        }

        //hitung total
         const total = items.reduce((acc, item) => {
            return acc + (item.harga * item.jumlah);
        }, 0);

        //buat order baru
        const [order] = await db.query (
            'INSERT INTO orders (user_id, total) VALUES (?, ?)',
            [userId, total]
        );

        const orderId = order.insertId; //id order yang baru dibuat

        //simpan semua item ke order_items
        for(const item of items) {
            await db.query(
                'INSERT INTO order_items (order_id, produk_id, jumlah, harga) VALUES (?, ?, ?, ?)',
                [orderId, item.produk_id, item.jumlah, item.harga]
            );
        }

        //kosongkan chart
        await db.query(
            'DELETE FROM cart WHERE user_id = ?',
            [userId]
        );

        res.json({
            message : "Checkout berhasil!",
            order_id : orderId,
            total
        });
    } catch (err){
        console.error(err);
        res.status(500).json({ message: "Terjadi kesalahan server"});
    }
};

//get semua order user
const getOrders = async (req, res) => {
    try{
        const userId = req.user.id;
        
        const[rows] = await db.query(
            'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        );

        res.json(rows);

    } catch(err){
        res.status(500).json({
            message: "Terjadi kesalahan server"
        });
    }
};

//get detail order
const getOrderDetail = async (req, res) => {
    try {
        const userId = req.user.id;
        const orderId = req.params.id;

        //Check order ada dan milik user ini
        const [cekOrder] = await db.query(
            'SELECT * FROM orders WHERE id = ? AND user_id = ?',
            [orderId, userId]
        );

        if(cekOrder.length === 0) {
            return res.status(404).json({
                message: "Order tidak ditemukan!"
            });
        }

        //ambil semua item order
        const [items] = await db.query(
            `SELECT 
                order_items.*,
                produk.nama,
                produk.gambar,
                (order_items.jumlah * order_items.harga) AS subtotal
             FROM order_items
             JOIN produk ON order_items.produk_id = produk.id
             WHERE order_items.order_id = ?`,
             [orderId]
        );

        res.json({
            order: cekOrder[0],
            items
        });

    } catch (err){
        res.status(500).json({
            message: "Terjadi kesalahan server"
        });
    }
};

//UPDATE STATUS ORDER (admin only)
const updateStatusOrder = async (req, res) => {
    try {
        //cek role admin
        if (req.user.role !== 'admin'){
            return res.statu(403).json({
                message: "Akses ditolak! Hanya Admin"
            });
        }

        const orderId = req.params.id;
        const { status } = req.body;

        //validasi status
        const validStatus = ['pending', 'paid', 'shipped', 'done'];
        if(!validStatus.includes(status)){
            return res.status(400).json({
                message: "Status tidak valid!"
            });
        }

        //cek order ada
        const [cekOrder] = await db.query(
            'SELECT * FROM orders WHERE id = ?', [orderId]
        );
        if(cekOrder.length === 0) {
            return res.status(404).json({
                message: "Order tidak ditemukan!"
            });
        }

        //Update status
        await db.query(
            'UPDATE orders SET status = ? WHERE id = ?',
            [status, orderId]
        );

        res.json({
            message: "Statu order berhasil diupdate!"
        });
    }catch (err){
        console.error(err);
        res.status(500).json({
            message: "Terjadi kesalahan server"
        });
    }
};

const getAllOrders = async (req, res) => {
    try{
        if(req.user.role !== 'admin'){
            return res.admin(403).json({
                message: "Akses ditolak!"
            });
        }

        //JOIN dengan tabel users untuk dapat nama user
        const [rows] = await db.query(
            `SELECT orders.*, users.nama AS nama_user
             FROM orders
             JOIN users ON orders.user_id = users.id
             ORDER BY orders.created_at DESC`
        );

        res.json(rows);
    } catch (err){
        res.status(500).json({
            message: "Terjadi kesalahan server"
        });
    }
};

const hapusOrder = async (req, res) => {
    try{
        //cek role admin
        if (req.user.role !== 'admin'){
            return res.status(403).json({
                message: "Akses ditolak! hanya admin"
            });
        }

        const orderId = req.params.id;

        //cek order ada
        const[cekOrder] = await db.query(
            'SELECT * FROM orders WHERE id = ?', [orderId]
        );

        if (cekOrder.length === 0) {
            return res.status(404).json({
                message: "order tidak ditemukan!"
            });
        }

        //hapus order_items sebelum hapus order karena ada foreign key
        await db.query(
            'DELETE FROM order_items WHERE order_id = ?', [orderId]
        );

        //baru hapus ordernya
        await db.query(
            'DELETE FROM orders WHERE id = ?', [orderId]
        );

        res.json({
            message: "Order berhasil dihapus@"
        });
    } catch (err){
        console.error(err);
        res.status(500).json({
            message: "terjadi kesalahan server"
        });
    }
};

module.exports = { checkout, getOrders, getOrderDetail, updateStatusOrder, getAllOrders, hapusOrder};