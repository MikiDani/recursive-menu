-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 07, 2023 at 02:58 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `recursivemenu`
--

-- --------------------------------------------------------

--
-- Table structure for table `menutable`
--

CREATE TABLE `menutable` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `menu` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`menu`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menutable`
--

INSERT INTO `menutable` (`id`, `name`, `menu`) VALUES
(1, 'Random Things 1.', '[{\"id\":1,\"name\":\"model car\",\"child\":[{\"id\":3,\"name\":\"milk\"},{\"id\":4,\"name\":\"remote\",\"child\":[{\"id\":7,\"name\":\"deodorant\",\"child\":[{\"id\":9,\"name\":\"bracelet\",\"child\":[{\"id\":10,\"name\":\"scotch tape\",\"child\":[{\"id\":11,\"name\":\"nail clippers\",\"child\":[{\"id\":12,\"name\":\"sticky note\"},{\"id\":13,\"name\":\"rusty nail\"}]}]}]},{\"id\":14,\"name\":\"pool stick\"}]}]},{\"id\":5,\"name\":\"shoes checkbook\"},{\"id\":6,\"name\":\"deodorant\",\"child\":[{\"id\":8,\"name\":\"tomato\"}]}]},{\"id\":16,\"name\":\"model car\"}]'),
(2, 'Random Things 2.', '[{\"id\":1,\"name\":\"remote\",\"child\":[{\"id\":7,\"name\":\"phone\"},{\"id\":9,\"name\":\"sandal\",\"child\":[{\"id\":14,\"name\":\"chapter book\"}]},{\"id\":13,\"name\":\"washing machine\",\"child\":[{\"id\":15,\"name\":\"chapter book\"},{\"id\":16,\"name\":\"tissue box\"}]}]},{\"id\":3,\"name\":\"rubber duck\",\"child\":[{\"id\":10,\"name\":\"glow stick\"},{\"id\":11,\"name\":\"tire swing\"}]},{\"id\":4,\"name\":\"soda can\",\"child\":[{\"id\":12,\"name\":\"headphones\",\"child\":[{\"id\":17,\"name\":\"apple\"},{\"id\":18,\"name\":\"computer\",\"child\":[{\"id\":19,\"name\":\"sailboat\"}]}]}]},{\"id\":5,\"name\":\"watch\",\"child\":[{\"id\":13,\"name\":\"mirror\"}]},{\"id\":6,\"name\":\"tire swing\"}]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `menutable`
--
ALTER TABLE `menutable`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `menutable`
--
ALTER TABLE `menutable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
