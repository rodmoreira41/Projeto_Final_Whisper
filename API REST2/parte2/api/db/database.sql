CREATE schema `movies`;

use `movies`;

CREATE TABLE `actor`(
    `id` int NOT NULL AUTO_INCREMENT,
    `name` nvarchar(50) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB; 

CREATE TABLE `director`(
    `id` int NOT NULL AUTO_INCREMENT,
    `name` nvarchar(50) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB; 

CREATE TABLE `movies`(
    `id` int NOT NULL AUTO_INCREMENT,
    `language` nchar(5) NOT NULL,
    `original_title` nvarchar(50) NOT NULL,
    `release_date` date NOT NULL,
    `runtime` int NOT NULL,
    `actor_id` int NOT NULL,
    `director_id` int NOT NULL,
	CONSTRAINT `actor_id_fk` FOREIGN KEY (`actor_id`) REFERENCES `actor` (`id`) ON DELETE cascade ON UPDATE CASCADE,
    CONSTRAINT `director_id_fk` FOREIGN KEY (`director_id`) REFERENCES `director` (`id`) ON DELETE cascade ON UPDATE CASCADE,
    KEY `actor_id_fk_idx` (`actor_id`),
    KEY `director_id_fk_idx` (`director_id`),
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;


CREATE TABLE `genre`(
    `id` int NOT NULL AUTO_INCREMENT,
    `genre` nvarchar(50) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB; 


CREATE TABLE `movie_genre`(
	`id` int NOT NULL,
    `movie_id` int NOT NULL,
    `genre_id` int NOT NULL,
    CONSTRAINT FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE cascade ON UPDATE CASCADE,
    CONSTRAINT FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`) ON DELETE cascade ON UPDATE CASCADE
    -- KEY `movies_id_fk_idx` (`movie_id`),
    -- KEY `genre_id_fk_idx` (`genre_id`)
) ENGINE=InnoDB;


DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_movie`(IN meuid int)
BEGIN

select meuid;

 delete from movie_genre where movie_id=meuid;
 
 delete from movies where id=meuid;
 
END$$
DELIMITER ;


INSERT into `actor` (`name`) VALUES 
('Armando'),
('Estela'),
('Rodrigo'),
('Michael'),
('Billie'),
('Rivers'),
('Dave'),
('David'),
('Tom'),
('Zendaya'),
('Riley');

INSERT into `director` (`name`) VALUES 
('José'),
('João'),
('Maria'),
('Ana'),
('Leonardo'),
('Rafael'),
('Mário'),
('Donatelo'),
('Thomas'),
('Manuel'),
('Mariana');

INSERT INTO `movies` (`language`, `original_title`, `release_date`, `runtime`, `actor_id`, `director_id`) VALUES 
('en', 'Spider-Man: No Way Home', CAST('2021-12-15' AS Date), 148, 1, 3),
('en', 'Dont Look Up', CAST('2021-12-07' AS Date), 138, 4, 6),
('en', 'The Matrix Resurrections', CAST('021-12-16' AS Date), 148, 1, 6),
('en','Encanto', CAST('2021-11-24' AS Date), 102, 7,11),
('en', 'Resident Evil: Welcome to Raccoon City', CAST('2021-11-24' AS Date), 107, 11, 7),
('en' , 'Venom: Let There Be Carnage', CAST('2021-09-30' AS Date), 97, 4, 8),
('en','Last Looks', CAST('2021-12-02' AS Date), 111, 4, 9),
('en','No Time to Die', CAST('2021-09-29' AS Date), 163, 11, 1),
('en', 'Dune', CAST('2021-09-15' AS Date), 155, 9, 6),
('en','Spider-Man: Far From Home', CAST('2019-06-28' AS Date), 129, 7, 10),
('en', 'Ghostbusters: Afterlife', CAST('2021-11-11' AS Date), 124, 4, 7),
('pt', 'Lulli', CAST('2021-12-26' AS Date), 90, 1, 1),
('en', 'The King´s Man', CAST('2021-12-21' AS Date), 131, 2, 2),
('en', 'Red Notice', CAST('2021-11-04' AS Date), 117, 3, 3),
('en', 'Shang-Chi and the Legend of the Ten Rings', CAST('2021-09-01' AS Date), 132, 4, 4),
('en', 'The Amazing Spider-Man', CAST('2012-06-23' AS Date), 136,5 ,5),
('en', 'Spider-Man: Homecoming', CAST('2017-07-05' AS Date), 133,6 ,6),
('en', 'Clifford the Big Red Dog', CAST('2021-11-10' AS Date), 97,7 ,7),
('en', 'Encounter', CAST('2021-12-03' AS Date), 108,8 ,8),
('en', 'The Amazing Spider-Man 2', CAST('2014-04-16' AS Date), 142, 9, 9),
('en','Sing 2', CAST('2021-12-01' AS Date), 110, 10, 10),
('en', 'Eternals', CAST('2021-11-03' AS Date), 157, 11, 11),
('en', 'Spider-Man', CAST('2002-05-01' AS Date), 121, 1,2),
('en', 'Ida Red', CAST('2021-11-05' AS Date), 111, 3, 4),
('en', 'The Last Duel', CAST('2021-10-13' AS Date), 152, 5, 6),
('en', 'The Greatest Game Ever Played', CAST('2005-09-30' AS Date), 120, 7, 8),
('en', 'Furnace', CAST('2007-12-11' AS Date), 90, 9, 10),
('en','Twelve OClock High', CAST('1949-12-21' AS Date), 132, 11, 1),
('pt', 'Quando as Mulheres Querem Provas', CAST('1975-03-04' AS Date), 110, 11, 2),
('en', 'The Second Arrival', CAST('1998-11-06' AS Date), 101, 2, 10);

INSERT into `genre` (`genre`) VALUES 
('Action'),
('Adventure'),
('Animation'),
('Comedy'),
('Crime'),
('Documentary'),
('Drama'),
('Family'),
('Fantasy'),
('History'),
('Horror'),
('Music'),
('Mystery'),
('Romance'),
('Science Fiction'),
('V movie'),
('Thriller'),
('War'),
('Western');

INSERT `movie_genre` (`id`, `movie_id`, `genre_id`) VALUES 
(1, 1, 1),
(2, 1, 2),
(3, 1, 15),
(4, 2, 4),
(5, 2, 7),
(6, 2, 15),
(7, 3, 1),
(8, 3, 15),
(9, 4, 3),
(10, 4, 4),
(11, 4, 8),
(12, 4, 9),
(13, 5, 11),
(14, 5, 1),
(15, 5, 15),
(16, 6, 15),
(17, 6, 1),
(18, 6, 2),
(19, 7, 1),
(20, 7, 5),
(21, 7, 17),
(22, 8, 2),
(23, 8, 1),
(24, 8, 17),
(25, 9, 15),
(26, 9, 2),
(27, 10, 1),
(28, 10, 2),
(29, 10, 15),
(30, 11, 4),
(31, 11, 9),
(32, 11, 2),
(33, 11, 15),
(34, 12, 4),
(35, 12, 14),
(36, 12, 9),
(37, 13, 1),
(38, 13, 2),
(39, 13, 17),
(40,14, 1),
(41,14, 4),
(42, 14, 5),
(43, 14, 17),
(44, 15, 1),
(45, 15, 2),
(46, 15, 9),
(47, 16, 1),
(48, 16, 2),
(49, 16, 9),
(50, 17, 1),
(51, 17, 2),
(52, 17, 15),
(53, 17, 7),
(54, 18, 3),
(55, 18, 4),
(56, 18, 8),
(57, 19, 15),
(58, 19, 17),
(59, 19, 2),
(60, 20, 1),
(61, 20, 2),
(62, 20, 9),
(63, 21, 3),
(64, 21, 4),
(65, 21, 8),
(66, 21, 12),
(67, 22, 1),
(68, 22, 2),
(69, 22, 9),
(70, 22, 15),
(71, 23, 9),
(72, 23, 1),
(73, 24, 5),
(74, 24, 17),
(75, 24, 7),
(76, 24, 1),
(77, 25, 1),
(78, 25, 7),
(79, 25, 10),
(80, 26, 7),
(81, 27, 5),
(82, 27, 11),
(83, 27, 13),
(84, 28, 18),
(85, 28, 1),
(86, 28, 7),
(87, 29, 4),
(88, 29, 14),
(89, 30, 15);


GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '12345678'