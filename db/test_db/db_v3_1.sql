DROP SCHEMA IF EXISTS `whisper_project_v2`;
CREATE SCHEMA `whisper_project_v2`;
USE `whisper_project_v2`;

DROP TABLE IF EXISTS `api_keys`;
CREATE TABLE `api_keys` (
  `id` int NOT NULL AUTO_INCREMENT,
  `api_key` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `transcriptions`;
CREATE TABLE `transcriptions` (
  `id_transcription` int NOT NULL AUTO_INCREMENT,
  `text` text DEFAULT NULL,
  `source` varchar(200),
  `source_type` varchar(20),
  `api_key_id` int,
  PRIMARY KEY (`id_transcription`),
  FOREIGN KEY (`api_key_id`) REFERENCES `api_keys` (`id`)
) ENGINE=InnoDB;

-- GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '12345678'