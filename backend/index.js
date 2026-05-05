const express = require('express');
const cors = require('cors');
const app = express();

//import routes
const authRoutes = require('./routes/authRoutes');
const produkRoutes = require('./routes/produkRoutes');
const cartRoutes   = require('./routes/cartRoutes');
const orderRoutes  = require('./routes/orderRoutes');

// Middleware global
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth',   authRoutes);
app.use('/produk', produkRoutes);
app.use('/cart',   cartRoutes);
app.use('/order',  orderRoutes);

// Jalankan server
app.listen(3000, () => {
    console.log('Server toko sepatu jalan di port 3000 🚀');
});