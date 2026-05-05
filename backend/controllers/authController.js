const db = require('../config/db')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//REGISTER
const register = async (req, res) => {
    try {
        const { nama, email, password } = req.body;

        //1. Cek data lengkap
        if (!nama || !email || !password){
            return res.status(400).json({
                message : "Semua field wajib diisi!"
            });
        }

        //Cek Email sudah terdaftar belum
        const [cekEmail] = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (cekEmail.length > 0){
            return res.status(400).json({
                message: "Email sudah terdaftar!"
            });
        }

        //Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Simpan ke database
        await db.query(
            'INSERT INTO users (nama, email, password) VALUES (?, ?, ?)',
            [nama, email, hashedPassword]
        );

        res.json({ message: "Register berhasil!"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message : "Terjadi kesalahan server"});
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Cek data lengkap
        if(!email || !password){
            return res.status(400).json({
                message: "Email dan password wajib diisi!"
            });
        }

        //cari user di database
        const[rows] = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if(rows.length === 0){
            return res.status(400).json({
                message: "Email tidak ditemukan!"
            });
        }

        const user = rows[0];

        //Cek Password
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({
                message: "Password salah!"
            });
        }

        //buat token
        const token = jwt.sign(
            { id: user.id, nama: user.nama, role: user.role},
            "SECRET_KEY",
            { expiresIn: "1h"}
        );

        res.json({
            message: "Login berhasil!",
            token,
            user: {
                id: user.id,
                nama: user.nama,
                role: user.role
            }
        });
    } catch (err){
        console.error(err)
            res.status(500).json({ message: "Terjadi kesalahan server"});
        }
};

module.exports = {register, login};