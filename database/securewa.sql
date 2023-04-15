CREATE DATABASE  IF NOT EXISTS `secure_wa` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `secure_wa`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: secure_wa
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(200) NOT NULL,
  `answers` varchar(400) NOT NULL,
  `correct_answer` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,'What is 9 + 10?','19,10,21,910,91,54,97,61,100','21'),(2,'When did professor Zagar get his phd?','2009,2020,1925,1949,2001,1991,1943,2019,2021','2009'),(3,'What year was Prof. Dr. Sc. Martin Zagar born?','2009,2020,1925,1981,2001,1991,1943,2019,2021','1981'),(4,'What is the largest continent in the world?','North America,South America,Europe,Asia,Africa,Australia,Antarctica,Greenland,Oceania','Asia'),(5,'Which of these is a primary color?','Red,Blue,Green,Yellow,Purple,Orange,Brown,Pink,Black','Red'),(6,'Which of these is a programming language?','HTML,CSS,PHP,SQL,XML,JSON,YAML,TOML,PNG','PHP'),(7,'Who was the first person to walk on the moon?','Neil Armstrong,Buzz Aldrin,Yuri Gagarin,John Glenn,Alan Shepard,Michael Collins,Gus Grissom,Sally Ride,Valentina Tereshkova','Neil Armstrong'),(8,'Which of these is a type of mammal?','Salmon,Crocodile,Eagle,Spider,Bat,Trout,Shark,Octopus,Lobster','Bat'),(9,'Which country is home to the tallest mountain in the world, Mount Everest?','China,Nepal,India,Bhutan,Japan,Russia,United States,Canada,Brazil','Nepal'),(10,'What is the capital of Australia?','Sydney,Melbourne,Perth,Adelaide,Brisbane,Canberra,Darwin,Hobart,Alice Springs','Canberra'),(11,'Who wrote the novel \'Pride and Prejudice\'?','Jane Austen,William Shakespeare,Charles Dickens,Mark Twain,Ernest Hemingway,J.K Rowling,Virginia Woolf,F. Scott Fitzgerald,Harper Lee','Jane Austen'),(12,'Which planet is closest to the Sun?','Earth,Venus,Mars,Mercury,Saturn,Jupiter,Uranus,Neptune,Pluto','Mercury'),(13,'Who is the current Prime Minister of the United Kingdom?','Boris Johnson,Theresa May,David Cameron,Rishi Sunak,Margaret Thatcher,Winston Churchill,Harold Wilson,Clement Attlee,Edward Heath','Rishi Sunak'),(14,'What is the name of the highest waterfall in the world?','Angel Falls,Victoria Falls,Iguazu Falls,Niagara Falls,Tugela Falls,Yosemite Falls,Gullfoss,Kaieteur Falls,Huangguoshu Waterfall','Angel Falls'),(15,'Who directed the movie \'Jurassic Park\'?','Steven Spielberg,James Cameron, Christopher Nolan,Quentin Tarantino,Martin Scorsese,Ridley Scott,George Lucas,Peter Jackson,J.J. Abrams','Steven Spielberg'),(16,'What is the largest mammal in the world?','Blue Whale,Elephant,Hippopotamus,Giraffe,Rhino,Gorilla,Lion,Tiger,Polar Bear','Blue Whale'),(17,'Who is the lead singer of the band Coldplay?','Chris Martin,Thom Yorke,Bono,Brandon Flowers,Matt Bellamy,Dave Grohl,Adam Levine,Eddie Vedder,Anthony Kiedis','Chris Martin'),(18,'What is the name of the highest mountain in Africa?','Mount Kilimanjaro,Mount Everest,Mount Denali,Mount Elbrus,Mount Aconcagua,Mount Vinson,Mount Kosciuszko,Mount Whitney,Mount Logan','Mount Kilimanjaro'),(19,'Who is the current President of the United States?','Joe Biden,Donald Trump,Barack Obama,George W. Bush,Bill Clinton,Jimmy Carter,Ronald Reagan,John F. Kennedy,Dwight D. Eisenhower','Joe Biden'),(20,'What is the currency used in Japan?','Japanese yen,Chinese yuan,Euro,US dollar,British pound,Canadian dollar,Australian dollar,Indian rupee,South Korean won','Japanese yen'),(21,'Which animal is known for its ability to change its color according to its surroundings?','Chameleon,Octopus,Cuttlefish,Squid,Komodo Dragon,Panther,Leopard,Snowshoe Hare,Arctic Fox','Chameleon'),(22,'Who founded the social media platform Facebook?','Mark Zuckerberg,Bill Gates,Steve Jobs,Larry Page,Sergey Brin,Jeff Bezos,Elon Musk,Tim Cook,Jack Dorsey','Mark Zuckerberg'),(23,'What is the smallest country in the world by land area?','Vatican City,Monaco,Nauru,Tuvalu,San Marino,Liechtenstein,Marshall Islands,Saint Kitts and Nevis,Maldives','Vatican City'),(24,'Who wrote the Harry Potter book series?','J.K. Rowling,Stephenie Meyer,Suzanne Collins,Veronica Roth,George R.R. Martin,Dan Brown,John Green,E.L. James,Rick Riordan','J.K. Rowling'),(25,'What is the world\'s largest ocean?','Pacific Ocean,Atlantic Ocean,Indian Ocean,Southern Ocean,Arctic Ocean,Mediterranean Sea,Caribbean Sea,Gulf of Mexico,Red Sea','Pacific Ocean'),(26,'Who painted the famous artwork \'The Starry Night\'?','Vincent van Gogh,Pablo Picasso,Leonardo da Vinci,Michelangelo,Salvador Dali,Claude Monet,Johannes Vermeer,Rembrandt,Edvard Munch','Vincent van Gogh'),(27,'What is the largest organ in the human body?','Skin,Liver,Heart,Lungs,Brain,Kidneys,Intestines,Stomach,Pancreas','Skin'),(28,'Which planet in our solar system is known as the \'Red Planet\'?','Mars,Venus,Jupiter,Uranus,Saturn,Neptune,Mercury,Earth,Pluto','Mars'),(29,'Who is the author of the \'Lord of the Rings\' book series?','J.R.R. Tolkien,C.S. Lewis,J.K. Rowling,George R.R. Martin,Stephenie Meyer,Suzanne Collins,Veronica Roth,Dan Brown,Rick Riordan','J.R.R. Tolkien'),(30,'What is the name of the world\'s largest desert?','Sahara Desert,Arabian Desert,Gobi Desert,Kalahari Desert,Great Victoria Desert,Patagonian Desert,Thar Desert,Atacama Desert,Simpson Desert','Sahara Desert');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(64) NOT NULL,
  `trophies` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'mn6559@g.rit.edu','marin','b07e06c72abdc86490ce504953841e5145448b2839540e6e15bf7ef14b555a2d',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-15 15:20:06
