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
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `productID` varchar(10) NOT NULL,
  `productName` varchar(20) DEFAULT NULL,
  `productCost` int DEFAULT NULL,
  `productInventory` int DEFAULT NULL,
  `productSales` int DEFAULT NULL,
  PRIMARY KEY (`productID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('PRC0001','제육덮밥',5000,98,42),('PRC0002','짜장밥',5000,128,6),('PRC0003','치킨마요덥밥',5500,131,19),('PRC0004','함박스테이크',5500,186,60),('PRC0005','계란후라이',700,129,54),('PRC0006','공기밥',500,186,88),('PRC0007','신라면',2800,146,78),('PRC0008','너구리',2800,168,30),('PRC0009','참깨라면',2800,104,12),('PRC0010','진라면',2800,104,82),('PRC0011','단무지',0,162,18),('PRC0012','불닭볶음면',3000,180,64),('PRC0013','불닭볶음면 + 치즈',4000,103,79),('PRC0014','불닭복음면과 치킨조각',5500,187,90),('PRC0015','비빔면',3000,119,22),('PRC0016','비빔면과 치킨 3조각',4500,129,41),('PRC0017','만두라면',4500,114,18),('PRC0018','김치말이 국수',5500,166,77),('PRC0019','신라면 와 공기밥',3300,188,35),('PRC0020','너구리 과 공기밥',3300,145,44),('PRC0021','참깨라면 와 공기밥',3300,160,16),('PRC0022','헛깨차',1700,165,44),('PRC0023','옥수수 수염차',1700,142,76),('PRC0024','델몬트 드링크 (망고)',600,124,41),('PRC0025','쓰비',1000,194,75),('PRC0026','립톤 아이스티',1300,195,59),('PRC0027','맥콜',1300,193,69),('PRC0028','밀키스',1300,183,66),('PRC0029','스파클링 복숭아',1300,136,27),('PRC0030','아이스티 (복숭아)',1000,131,33),('PRC0031','얼음컵',300,142,86),('PRC0032','웰치스 (청포도)',1300,130,20),('PRC0033','잔치집 식혜',1300,126,40),('PRC0034','칠성 사이다.',1300,131,46),('PRC0035','칸타타 라떼',2000,178,10),('PRC0036','컨피던스',1300,199,12),('PRC0037','도도한 나쵸',1500,161,31),('PRC0038','뿌셔뿌셔',1000,109,17),('PRC0039','썬칩',1500,164,89),('PRC0040','애낙',500,193,98),('PRC0041','에이스',400,172,23),('PRC0042','오레오',700,183,19),('PRC0043','오징어 땅콩',1500,199,25),('PRC0044','오징어집',1500,136,77),('PRC0045','쫀쪼니',500,128,69),('PRC0046','쫄병 (매콤한맛)',1200,106,39),('PRC0047','포카칩 (어니언)',1500,142,86),('PRC0048','프링글스 (어니언)',1500,184,24),('PRC0049','프링글서 (오리지널)',1500,155,3),('PRC0050','닥터유 에너지바',1200,184,75),('PRC0051','자유시간',200,159,70),('PRC0052','군만두 (6개)',2500,143,25),('PRC0053','김말이 튀김 (5개)',2000,137,14),('PRC0054','찐 만두 (8개)',3000,155,92),('PRC0055','순살치킨 (3조각)',1300,164,22),('PRC0056','아메리칸 치즈와 소세지',2000,158,32),('PRC0057','찐 만두 (2개)',2000,195,95);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-28 22:48:44
