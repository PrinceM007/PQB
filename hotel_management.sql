-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 24, 2024 at 05:20 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hotel_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `roomId` int(11) DEFAULT NULL,
  `checkInDate` date DEFAULT NULL,
  `checkOutDate` date DEFAULT NULL,
  `status` enum('booked','canceled') DEFAULT 'booked',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `paymentMethod` varchar(255) NOT NULL,
  `phoneNumber` varchar(15) NOT NULL,
  `totalAmount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `userId`, `roomId`, `checkInDate`, `checkOutDate`, `status`, `createdAt`, `paymentMethod`, `phoneNumber`, `totalAmount`) VALUES
(1, 1, 102, '2024-11-13', '2024-11-14', 'booked', '2024-11-12 09:50:17', '', '', 0.00),
(6, 4, 102, '2024-11-16', '2024-11-19', 'booked', '2024-11-15 07:16:53', '', '', 0.00),
(10, 1, 1, '2024-11-22', '2024-11-23', 'booked', '2024-11-21 06:47:20', 'Card Payment', '76693018', 100.00),
(30, 1, 2, '2024-11-12', '2024-11-13', '', '2024-11-15 04:14:25', '', '', 0.00),
(31, 4, 3, '2024-11-12', '2024-11-14', '', '2024-11-15 04:14:25', '', '', 0.00),
(32, 3, 102, '2024-11-12', '2024-11-13', '', '2024-11-15 04:14:25', '', '', 0.00),
(33, 5, 104, '2024-11-15', '2024-11-16', '', '2024-11-15 04:14:25', '', '', 0.00),
(34, 7, 105, '2024-11-15', '2024-11-17', '', '2024-11-15 04:14:25', '', '', 0.00),
(42, 1, 1, '2024-11-22', '2024-11-23', 'booked', '2024-11-21 07:08:12', 'Card', '76693018', 100.00),
(43, 1, 3, '2024-11-22', '2024-11-23', 'booked', '2024-11-21 07:19:40', 'MOMO', '76693018', 250.00),
(44, 1, 1, '2024-11-27', '2024-11-28', 'booked', '2024-11-21 07:21:08', 'MOMO', '763537372', 150.00),
(45, 1, 3, '2024-11-22', '2024-11-23', 'booked', '2024-11-21 07:34:11', 'Card', '12345678', 250.00),
(46, 1, 1, '2024-11-23', '2024-11-26', 'booked', '2024-11-22 08:14:47', 'MOMO', '76693018', 450.00),
(47, 1, 2, '2024-11-23', '2024-11-25', 'booked', '2024-11-22 08:18:03', 'MOMO', '76693018', 200.00),
(48, 1, 102, '2024-11-23', '2024-11-24', 'booked', '2024-11-22 21:52:03', 'MOMO', '76693018', 2700.00),
(49, 1, 105, '2024-11-24', '2024-11-25', 'booked', '2024-11-22 22:27:59', 'MOMO', '76635352', 140.00),
(50, 1, 104, '2024-11-24', '2024-11-25', 'booked', '2024-11-22 22:33:40', 'MOMO', '76693736', 180.00),
(51, 1, 1, '2024-11-24', '2024-11-25', 'booked', '2024-11-22 23:15:11', 'MOMO', '7689656', 150.00),
(52, 1, 2, '2024-11-24', '2024-11-26', 'booked', '2024-11-22 23:23:19', 'MOMO', '73673522', 200.00);

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `isAvailable` tinyint(1) DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `imageURL` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `name`, `description`, `price`, `isAvailable`, `createdAt`, `imageURL`) VALUES
(1, 'Deluxe Room', 'Spacious room with a city view', 150.00, 0, '2024-11-20 22:00:00', 'F.jpg'),
(2, 'Your Home Away From Home', 'Experience the warmth and comfort of home in every stay.', 100.00, 0, '2024-11-12 18:55:13', 'A.jpg'),
(3, 'Where Every Stay Feels Like a Getaway', 'Find peace, relaxation, and a touch of luxury at PQB HOMES.', 250.00, 1, '2024-11-12 18:55:13', 'E.jpg'),
(102, 'Business Suite', 'First Class', 2700.00, 1, '2024-11-12 09:48:50', 'D.jpg'),
(104, 'Executive Suite', 'Suite with city view', 180.00, 1, '2024-11-15 02:14:28', 'C.jpg'),
(105, 'Family Room', 'Comfortable room for families', 140.00, 1, '2024-11-15 02:14:28', 'B.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'Receptionist',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `name`, `email`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'John Doe', 'johndoe@example.com', 'Manager', '2024-11-13 21:59:31', '2024-11-13 21:59:31'),
(2, 'Jane Smith', 'janesmith@example.com', 'Receptionist', '2024-11-13 21:59:31', '2024-11-13 21:59:31'),
(3, 'Samuel Adams', 'samueladams@example.com', 'Security', '2024-11-13 21:59:31', '2024-11-13 21:59:31');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullName` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullName`, `email`, `username`, `password`, `createdAt`) VALUES
(1, 'John Doe', 'john@example.com', 'john_doe', '$2a$10$SSpFVjv.mouIdNFrrhrPVulYsM4bAhqSlDsIQnfLKeWUNcwgdrgka', '2024-11-11 11:00:09'),
(3, 'Admin User', 'admin@example.com', 'admin_user', '$2a$10$SSpFVjv.mouIdNFrrhrPVulYsM4bAhqSlDsIQnfLKeWUNcwgdrgka', '2024-11-11 11:00:09'),
(4, 'Phila ', 'mabuzaphila2@gmail.com', 'prince123', '$2a$10$SSpFVjv.mouIdNFrrhrPVulYsM4bAhqSlDsIQnfLKeWUNcwgdrgka', '2024-11-12 14:59:08'),
(5, 'Majaha', 'majahamakhanya2@gmail.com', 'majaha123', '$2a$10$EUrwkZ3BRdFIg1xTATOVwe73QehYs4Z1brCrMlxUxeYKEmYvDuz7W', '2024-11-12 15:01:08'),
(7, 'New User', 'newuser@example.com', 'new_user', 'password_hash', '2024-11-13 12:00:00'),
(13, 'mazwi', 'mabuzaphila6@gmail.com', 'mazwi123', '$2a$10$dgLdfJ/.Y.L/OsNDk4Vsxe/o.qAe1pK6Nn5DvkICZjBAbKUA74OB6', '2024-11-22 23:03:01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `roomId` (`roomId`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
