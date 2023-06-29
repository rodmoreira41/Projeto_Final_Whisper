DROP SCHEMA IF EXISTS `video_transcriptions`;
CREATE SCHEMA `video_transcriptions`;
USE `video_transcriptions`;

DROP TABLE IF EXISTS `transcriptions`;

CREATE TABLE `transcriptions` (
  `id_transcription` int NOT NULL AUTO_INCREMENT,
  `text` text DEFAULT NULL,
  PRIMARY KEY (`id_transcription`)
) ENGINE=InnoDB;

-- GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '12345678'