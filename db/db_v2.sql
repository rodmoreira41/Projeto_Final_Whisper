DROP SCHEMA IF EXISTS `whisper_project`;
CREATE SCHEMA `whisper_project`;
USE `whisper_project`;

DROP TABLE IF EXISTS `transcriptions`;

CREATE TABLE `transcriptions` (
  `id_transcription` int NOT NULL AUTO_INCREMENT,
  `text` text DEFAULT NULL,
  `source` varchar(200)
  PRIMARY KEY (`id_transcription`)
) ENGINE=InnoDB;

-- GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '12345678'