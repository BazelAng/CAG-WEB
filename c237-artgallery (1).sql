-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 18, 2024 at 05:52 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `c237-artgallery`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `accID` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `pass` varchar(100) NOT NULL,
  `role` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`accID`, `name`, `pass`, `role`) VALUES
(1, 'baz', 'baz', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `artwork`
--

CREATE TABLE `artwork` (
  `art_Id` int(11) NOT NULL,
  `artwork_name` varchar(500) NOT NULL,
  `artist_name` varchar(500) NOT NULL,
  `country` varchar(500) NOT NULL,
  `year` varchar(100) DEFAULT NULL,
  `dsc` varchar(1000) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `artwork`
--

INSERT INTO `artwork` (`art_Id`, `artwork_name`, `artist_name`, `country`, `year`, `dsc`, `image`) VALUES
(1, 'Mona Lisa', 'Leonardo Da Vinci', 'Italy', '1503', 'The Mona Lisa, painted by Leonardo da Vinci in the early 16th century, is a renowned portrait of a woman with an enigmatic smile. Housed in the Louvre Museum, Paris, it is celebrated for its exquisite detail, masterful use of sfumato, and its captivating, mysterious expression.', 'monalisa.jpg'),
(2, 'The Persistence of Memory', 'Salvador Dali', 'Spain', '1931', '\"The Persistence of Memory\" by Salvador Dalí, created in 1931, is a surreal masterpiece featuring melting clocks draped over various objects in a dreamlike landscape. This iconic painting explores themes of time, reality, and the unconscious, epitomizing Dalí\'s unique, imaginative style and his fascination with the bizarre and irrational.', 'clock.jpg'),
(3, 'Starry Night', 'Vincent Van Gogh', 'France', '1889', '\"Starry Night,\" painted by Vincent van Gogh in 1889, depicts a swirling night sky filled with vibrant stars over a quiet village. The artwork is famous for its bold, expressive brushstrokes and vivid colors, capturing the turbulence and beauty of the night. It reflects van Gogh\'s emotional intensity and unique artistic vision.', 'starrynight.jpg'),
(4, 'Self Portrait', 'Vincent Van Gogh', 'France', '1888', 'This self portrait painted by Vincent van Gogh in 1889, depicts a man facing towards the canvas at a slightly tilted angle. The other side of his ear is hidden, likely to symbolize his missing ear.', 'van.jpg'),
(13, 'Vintage image 1', 'Vintage artist 1', 'France', '1889', 'Vintage image example', 'vintage.jpg'),
(14, 'Vintage image 2', 'Vintage Artist 2', 'Spain', '1905', 'Vintage image 2', 'vintage2.jpg'),
(15, 'Scream', 'Edward Munch', 'Norway', '1893', 'An artwork by Edward Munch in 1893 depicting a man screaming, giving a surreal feel as well', 'scream.jpg'),
(18, 'Singapore', 'Singaporean artist', 'Singapore', '2019', 'A watercolour painting of Singapore as a special surprise', 'sg.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`accID`);

--
-- Indexes for table `artwork`
--
ALTER TABLE `artwork`
  ADD PRIMARY KEY (`art_Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `accID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `artwork`
--
ALTER TABLE `artwork`
  MODIFY `art_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
