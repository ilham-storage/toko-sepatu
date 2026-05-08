const multer = require('multer');
const path   = require('path');

// Atur penyimpanan file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // simpan ke folder uploads
    },
    filename: (req, file, cb) => {
        const ext      = path.extname(file.originalname); // ambil ekstensi .jpg .png dll
        const filename = Date.now() + ext;                // rename jadi timestamp
        cb(null, filename);
    }
});

// Filter hanya terima file gambar
const fileFilter = (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (allowed.includes(file.mimetype)) {
        cb(null, true);  // terima
    } else {
        cb(new Error('Format file harus JPG, PNG, atau WEBP!'), false); // tolak
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } // maksimal 2MB
});

module.exports = upload;