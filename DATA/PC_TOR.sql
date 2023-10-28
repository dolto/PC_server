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
-- Table structure for table `TOR`
--

DROP TABLE IF EXISTS `TOR`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TOR` (
  `TOR_MemberID` varchar(20) DEFAULT NULL,
  `TOR_Payment` varchar(6) DEFAULT NULL,
  `TOR_PName` varchar(10) DEFAULT NULL,
  `TOR_InputCost` int DEFAULT NULL,
  `TOR_OutputCost` int DEFAULT NULL,
  `TOR_Index` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`TOR_Index`),
  KEY `TOR_MemberID` (`TOR_MemberID`),
  CONSTRAINT `TOR_ibfk_1` FOREIGN KEY (`TOR_MemberID`) REFERENCES `member` (`memberID`)
) ENGINE=InnoDB AUTO_INCREMENT=201 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TOR`
--

LOCK TABLES `TOR` WRITE;
/*!40000 ALTER TABLE `TOR` DISABLE KEYS */;
INSERT INTO `TOR` VALUES ('ncrh1961','카드','1시간',NULL,NULL,1),('gacr1955','카드','10시간',NULL,NULL,2),('psgf1952','현금','2시간',5000,3000,3),('wzkj1953','카드','10시간',NULL,NULL,4),('bbvs1962','카드','5시간',NULL,NULL,5),('zdbr1953','카드','10시간',NULL,NULL,6),('mqyx1963','카드','10시간',NULL,NULL,7),('pypy1961','카드','5시간',NULL,NULL,8),('wiuq1954','현금','10시간',50000,40000,9),('exbb1954','카드','1시간',NULL,NULL,10),('xbjm1962','카드','5시간',NULL,NULL,11),('ufkp1956','카드','50시간',NULL,NULL,12),('eken1958','카드','1시간',NULL,NULL,13),('clyt1954','카드','5시간',NULL,NULL,14),('nasl1959','카드','2시간',NULL,NULL,15),('nrua1963','현금','1시간',5000,4000,16),('kajj1952','현금','5시간',10000,5000,17),('wnjg1956','카드','50시간',NULL,NULL,18),('ysus1954','카드','5시간',NULL,NULL,19),('byik1958','카드','10시간',NULL,NULL,20),('itdf1963','카드','10시간',NULL,NULL,21),('pypy1961','현금','1시간',1000,0,22),('pzdm1957','카드','50시간',NULL,NULL,23),('jtfq1955','카드','2시간',NULL,NULL,24),('wuup1959','현금','3시간',5000,2000,25),('xdev1961','카드','50시간',NULL,NULL,26),('gibd1962','카드','3시간',NULL,NULL,27),('pigi1961','카드','3시간',NULL,NULL,28),('wnjg1956','카드','5시간',NULL,NULL,29),('ncrh1961','카드','3시간',NULL,NULL,30),('ncrh1961','카드','5시간',NULL,NULL,31),('dklz1955','카드','3시간',NULL,NULL,32),('dklz1955','카드','5시간',NULL,NULL,33),('ptrg1954','카드','10시간',NULL,NULL,34),('zzhp1952','현금','10시간',50000,40000,35),('byik1958','현금','2시간',5000,3000,36),('yvgf1953','카드','3시간',NULL,NULL,37),('bsis1958','카드','1시간',NULL,NULL,38),('wuup1959','카드','1시간',NULL,NULL,39),('datr1964','현금','10시간',10000,0,40),('exbb1954','카드','1시간',NULL,NULL,41),('wvus1958','카드','2시간',NULL,NULL,42),('qdpl1953','카드','2시간',NULL,NULL,43),('eeen1961','현금','5시간',50000,45000,44),('zdbr1953','카드','50시간',NULL,NULL,45),('yvgf1953','카드','5시간',NULL,NULL,46),('psgf1952','현금','50시간',50000,0,47),('ecdr1952','카드','5시간',NULL,NULL,48),('jtfq1955','카드','1시간',NULL,NULL,49),('kmnp1959','카드','2시간',NULL,NULL,50),('qdpl1953','현금','50시간',50000,0,51),('jewr1952','카드','1시간',NULL,NULL,52),('qdpl1953','카드','3시간',NULL,NULL,53),('lbnc1956','카드','10시간',NULL,NULL,54),('emwd1959','카드','50시간',NULL,NULL,55),('nwzo1959','카드','2시간',NULL,NULL,56),('datr1964','카드','10시간',NULL,NULL,57),('byik1958','카드','3시간',NULL,NULL,58),('qdpl1953','카드','5시간',NULL,NULL,59),('mqyx1963','카드','3시간',NULL,NULL,60),('qdcc1958','카드','50시간',NULL,NULL,61),('fmvs1954','카드','10시간',NULL,NULL,62),('eken1958','카드','5시간',NULL,NULL,63),('oxmy1961','현금','3시간',50000,47000,64),('gacr1955','카드','1시간',NULL,NULL,65),('zbrt1961','카드','3시간',NULL,NULL,66),('rfdz1960','카드','50시간',NULL,NULL,67),('vior1952','카드','10시간',NULL,NULL,68),('npld1957','카드','2시간',NULL,NULL,69),('azlc1964','현금','50시간',50000,0,70),('cccf1954','카드','2시간',NULL,NULL,71),('ftsa1952','카드','1시간',NULL,NULL,72),('wiuq1954','카드','1시간',NULL,NULL,73),('bbvs1962','카드','1시간',NULL,NULL,74),('xudn1960','카드','2시간',NULL,NULL,75),('itdf1963','카드','5시간',NULL,NULL,76),('yvgf1953','카드','10시간',NULL,NULL,77),('clyt1954','카드','2시간',NULL,NULL,78),('yowz1959','카드','10시간',NULL,NULL,79),('afsj1963','카드','3시간',NULL,NULL,80),('npld1957','카드','10시간',NULL,NULL,81),('cvzl1952','카드','5시간',NULL,NULL,82),('nrua1963','카드','10시간',NULL,NULL,83),('gojv1963','카드','10시간',NULL,NULL,84),('oxmy1961','카드','10시간',NULL,NULL,85),('oxmy1961','현금','1시간',10000,9000,86),('rtvr1961','현금','1시간',5000,4000,87),('dmbf1953','현금','10시간',10000,0,88),('bjnl1962','카드','5시간',NULL,NULL,89),('bekj1953','카드','10시간',NULL,NULL,90),('ozin1961','카드','2시간',NULL,NULL,91),('exbb1954','카드','1시간',NULL,NULL,92),('yvgf1953','카드','3시간',NULL,NULL,93),('pzdm1957','카드','3시간',NULL,NULL,94),('esmx1960','카드','10시간',NULL,NULL,95),('ysus1954','현금','50시간',50000,0,96),('bsis1958','카드','10시간',NULL,NULL,97),('itdf1963','카드','5시간',NULL,NULL,98),('jkdc1953','카드','50시간',NULL,NULL,99),('vzfj1962','현금','2시간',50000,48000,100),('qdcc1958','카드','2시간',NULL,NULL,101),('zzhp1952','카드','2시간',NULL,NULL,102),('nmim1959','카드','50시간',NULL,NULL,103),('zdbr1953','카드','10시간',NULL,NULL,104),('pjye1961','카드','5시간',NULL,NULL,105),('rfdz1960','현금','50시간',50000,0,106),('xdev1961','카드','10시간',NULL,NULL,107),('gacr1955','카드','10시간',NULL,NULL,108),('wzkj1953','현금','2시간',50000,48000,109),('byik1958','현금','2시간',5000,3000,110),('npld1957','현금','10시간',10000,0,111),('emwd1959','카드','1시간',NULL,NULL,112),('jkdc1953','카드','1시간',NULL,NULL,113),('datr1964','카드','3시간',NULL,NULL,114),('acol1956','현금','5시간',10000,5000,115),('xzzh1959','현금','2시간',50000,48000,116),('mqyx1963','카드','10시간',NULL,NULL,117),('ycig1952','카드','5시간',NULL,NULL,118),('nvod1960','카드','50시간',NULL,NULL,119),('wnjg1956','카드','1시간',NULL,NULL,120),('nrua1963','카드','5시간',NULL,NULL,121),('ptrg1954','카드','3시간',NULL,NULL,122),('nmim1959','현금','1시간',10000,9000,123),('tmzq1959','카드','50시간',NULL,NULL,124),('yywk1957','카드','5시간',NULL,NULL,125),('kpqh1959','카드','5시간',NULL,NULL,126),('psgf1952','현금','5시간',5000,0,127),('rtvr1961','카드','50시간',NULL,NULL,128),('ftsa1952','카드','10시간',NULL,NULL,129),('datr1964','카드','1시간',NULL,NULL,130),('prxn1960','카드','2시간',NULL,NULL,131),('enls1960','현금','1시간',1000,0,132),('bekj1953','카드','2시간',NULL,NULL,133),('emwd1959','카드','50시간',NULL,NULL,134),('nwzo1959','카드','3시간',NULL,NULL,135),('xdev1961','카드','5시간',NULL,NULL,136),('vior1952','카드','2시간',NULL,NULL,137),('kmnp1959','카드','1시간',NULL,NULL,138),('rfdz1960','카드','5시간',NULL,NULL,139),('kajj1952','카드','1시간',NULL,NULL,140),('pigi1961','카드','10시간',NULL,NULL,141),('svzq1953','현금','5시간',5000,0,142),('rbas1959','카드','5시간',NULL,NULL,143),('wvus1958','카드','50시간',NULL,NULL,144),('sxsz1963','카드','1시간',NULL,NULL,145),('ftsa1952','카드','10시간',NULL,NULL,146),('rtvr1961','카드','1시간',NULL,NULL,147),('xbjm1962','현금','5시간',5000,0,148),('afsj1963','카드','3시간',NULL,NULL,149),('nwzo1959','카드','1시간',NULL,NULL,150),('gacr1955','카드','5시간',NULL,NULL,151),('psgf1952','현금','1시간',5000,4000,152),('kmnp1959','카드','50시간',NULL,NULL,153),('xbjm1962','카드','1시간',NULL,NULL,154),('bbvs1962','현금','3시간',10000,7000,155),('ecdr1952','카드','10시간',NULL,NULL,156),('ufkp1956','카드','2시간',NULL,NULL,157),('exbb1954','카드','10시간',NULL,NULL,158),('pzdm1957','현금','3시간',10000,7000,159),('byik1958','현금','2시간',10000,8000,160),('zbrt1961','카드','10시간',NULL,NULL,161),('pypy1961','카드','5시간',NULL,NULL,162),('zzhp1952','카드','5시간',NULL,NULL,163),('mqyx1963','카드','2시간',NULL,NULL,164),('kmnp1959','현금','10시간',10000,0,165),('exbb1954','카드','5시간',NULL,NULL,166),('czhf1963','카드','1시간',NULL,NULL,167),('brte1960','카드','10시간',NULL,NULL,168),('eken1958','카드','5시간',NULL,NULL,169),('bbvs1962','현금','5시간',5000,0,170),('prxn1960','카드','3시간',NULL,NULL,171),('ftsa1952','카드','10시간',NULL,NULL,172),('nmim1959','카드','50시간',NULL,NULL,173),('xudn1960','카드','1시간',NULL,NULL,174),('esmx1960','카드','10시간',NULL,NULL,175),('acol1956','카드','3시간',NULL,NULL,176),('jkdc1953','카드','2시간',NULL,NULL,177),('idrz1964','카드','50시간',NULL,NULL,178),('ftsa1952','카드','50시간',NULL,NULL,179),('dmbf1953','카드','1시간',NULL,NULL,180),('gwyl1960','카드','5시간',NULL,NULL,181),('wuup1959','카드','5시간',NULL,NULL,182),('rfdz1960','카드','5시간',NULL,NULL,183),('dklz1955','카드','5시간',NULL,NULL,184),('pypy1961','카드','10시간',NULL,NULL,185),('dmbf1953','카드','5시간',NULL,NULL,186),('cvzl1952','카드','1시간',NULL,NULL,187),('lrpd1965','카드','2시간',NULL,NULL,188),('lrpd1965','카드','5시간',NULL,NULL,189),('bsis1958','카드','2시간',NULL,NULL,190),('eeen1961','현금','10시간',10000,0,191),('kpqh1959','현금','10시간',50000,40000,192),('eken1958','현금','2시간',50000,48000,193),('ftsa1952','카드','5시간',NULL,NULL,194),('gacr1955','현금','3시간',10000,7000,195),('ptrg1954','카드','1시간',NULL,NULL,196),('gojv1963','카드','2시간',NULL,NULL,197),('aiap1954','카드','5시간',NULL,NULL,198),('ysus1954','카드','5시간',NULL,NULL,199),('lknv1955','현금','1시간',5000,4000,200);
/*!40000 ALTER TABLE `TOR` ENABLE KEYS */;
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
