-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: PC
-- ------------------------------------------------------
-- Server version	8.0.33-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `seat`
--

DROP TABLE IF EXISTS `seat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seat` (
  `seatID` int NOT NULL,
  `seatMemberID` varchar(20) DEFAULT NULL,
  `seatBrokend` tinyint DEFAULT NULL,
  PRIMARY KEY (`seatID`),
  KEY `seatMemberID` (`seatMemberID`),
  CONSTRAINT `seat_ibfk_1` FOREIGN KEY (`seatMemberID`) REFERENCES `member` (`memberID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seat`
--

LOCK TABLES `seat` WRITE;
/*!40000 ALTER TABLE `seat` DISABLE KEYS */;
INSERT INTO `seat` VALUES (1,NULL,1),(2,NULL,0),(3,'qdpl1953',1),(4,NULL,0),(5,NULL,0),(6,NULL,0),(7,NULL,1),(8,NULL,1),(9,'xdev1961',1),(10,'jkdc1953',1),(11,'exbb1954',1),(12,NULL,1),(13,NULL,1),(14,NULL,1),(15,NULL,0),(16,NULL,1),(17,NULL,1),(18,NULL,1),(19,'tmzq1959',1),(20,NULL,0),(21,NULL,0),(22,NULL,1),(23,NULL,1),(24,NULL,1),(25,'brte1960',1),(26,NULL,0),(27,'jkdc1953',1),(28,NULL,1),(29,'gwyl1960',1),(30,NULL,1),(31,'joba1953',1),(32,'exbb1954',1),(33,'kajj1952',1),(34,NULL,1),(35,NULL,0),(36,NULL,1),(37,'wvus1958',1),(38,NULL,1),(39,NULL,0),(40,NULL,1),(41,NULL,1),(42,'dklz1955',1),(43,NULL,1),(44,'nphu1964',1),(45,'xudn1960',1),(46,NULL,1),(47,NULL,1),(48,NULL,1),(49,NULL,1),(50,NULL,0);
/*!40000 ALTER TABLE `seat` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-28 22:48:43
