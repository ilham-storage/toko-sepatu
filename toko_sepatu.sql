-- phpMyAdmin SQL Dump
-- version 6.0.0-dev+20260421.e3a1824fe4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 08, 2026 at 03:27 PM
-- Server version: 8.4.3
-- PHP Version: 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `toko_sepatu`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `produk_id` int DEFAULT NULL,
  `jumlah` int DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `produk_id`, `jumlah`) VALUES
(15, 2, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `total` int DEFAULT NULL,
  `status` enum('pending','paid','shipped','done') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `total`, `status`, `created_at`) VALUES
(1, 3, 3000000, 'pending', '2026-04-30 10:35:31'),
(2, 4, 1500000, 'pending', '2026-04-30 10:58:49'),
(6, 7, 2700000, 'done', '2026-05-08 07:34:57'),
(7, 6, 5400000, 'done', '2026-05-08 12:13:29'),
(8, 6, 1500000, 'done', '2026-05-08 12:33:21'),
(9, 6, 3000000, 'done', '2026-05-08 12:39:45');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int NOT NULL,
  `order_id` int DEFAULT NULL,
  `produk_id` int DEFAULT NULL,
  `jumlah` int DEFAULT NULL,
  `harga` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `produk_id`, `jumlah`, `harga`) VALUES
(1, 1, 1, 2, 1500000),
(2, 2, 1, 1, 1500000),
(9, 6, 1, 1, 1500000),
(10, 6, 2, 1, 1200000),
(11, 7, 1, 2, 1500000),
(12, 7, 2, 2, 1200000),
(13, 8, 1, 1, 1500000),
(14, 9, 1, 2, 1500000);

-- --------------------------------------------------------

--
-- Table structure for table `produk`
--

CREATE TABLE `produk` (
  `id` int NOT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `deskripsi` text,
  `harga` int DEFAULT NULL,
  `stok` int DEFAULT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  `kategori` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `produk`
--

INSERT INTO `produk` (`id`, `nama`, `deskripsi`, `harga`, `stok`, `gambar`, `kategori`) VALUES
(1, 'Nike Air Max', 'Sepatu lari nyaman dengan bantalan udara', 1500000, 8, '1778225373074.jpg', 'sneakers'),
(2, 'Adidas Samba', 'Sepatu kasual ikonik dengan desain klasik', 1200000, 8, '1778225514621.webp', 'sneakers'),
(3, 'Converse Chuck Taylor', 'Sepatu canvas klasik yang timeless', 800000, 15, '1778225539506.webp', 'casual'),
(4, 'Vans Old Skool', 'Sepatu skate legendaris dengan stripe khas', 900000, 12, '1778225549966.jpg', 'casual'),
(5, 'New Balance 574', 'Sepatu retro running yang stylish', 1300000, 6, '1778225561674.jpeg', 'sneakers'),
(9, 'Brodo Ace Neptune', 'Sneaker Indo Pride', 450000, 10, '1778224812311.jpg', 'sneakers');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('user','admin') DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nama`, `email`, `password`, `role`) VALUES
(1, 'Ilham', 'ilham@gmail.com', '$2b$10$ghd2oqqqx/8k3.UbjTvgVu3toT5xbYSIJNBE6/6qkvLmhF6PBGJPW', 'user'),
(2, 'Admin Toko', 'admin@toko.com', '$2b$10$Nj3unp9MU/G94p1negWUCOpGq0iO9eByqD9qMKLZRtBQ/KgwKxDxC', 'admin'),
(3, 'giselle', 'giselle@aeri.com', '$2b$10$f4EbITdJkltRbpX6RAf.SuX3.KzB3/t/QX2PygrUf7p8uVSGkDjOO', 'user'),
(4, 'Asa', 'asa@enami@gmail.com', '$2b$10$Gz4AJjyGxVGEKLXcPIDwiOPpsSKMUGc2EiF9IUcQCSzRoK99j0fhW', 'user'),
(6, 'reza', 'reza@gmail.com', '$2b$10$YgXixFw87grN8HdgNnUu6O5DqVrnSpwHAgwE59xxmAr2QIYuPJd5u', 'user'),
(7, 'james', 'james@gmail.com', '$2b$10$k39XQsS61i.8mKFFpgwSFekQ9yJIMGtr8hj6HaD63gsbP.m2RVinq', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `produk_id` (`produk_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `produk_id` (`produk_id`);

--
-- Indexes for table `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `produk`
--
ALTER TABLE `produk`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`produk_id`) REFERENCES `produk` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`produk_id`) REFERENCES `produk` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
