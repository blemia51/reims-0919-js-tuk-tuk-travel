drop database if exists tuktuktravel; 
CREATE DATABASE `tuktuktravel`;
USE `tuktuktravel`;

CREATE TABLE `users`(
  `userID` INT NOT NULL AUTO_INCREMENT,
  `lastname` VARCHAR(100) NOT NULL,
  `firstname` VARCHAR(100) NOT NULL, 
  `password` VARCHAR(255) NOT NULL,
  `birthday` DATE NOT NULL,
  `sex` VARCHAR(10) NOT NULL,  
  `country` VARCHAR(100) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `phone_number` VARCHAR(15) NOT NULL,
  `description` TEXT NULL,
  `avatar` TEXT,
  PRIMARY KEY (`userID`) 
);

CREATE TABLE `travels`(
    `travelID` INT NOT NULL AUTO_INCREMENT,
    `IDuser_creator` INT NOT NULL,
    `destination` VARCHAR(255),
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `number_of_travelers_max` INT,
    `description` TEXT,
    `cityPic` VARCHAR(100),
    FOREIGN KEY (`IDuser_creator`) REFERENCES `users`(`userID`),
    PRIMARY KEY (`travelID`)    
);

CREATE TABLE `travel_user`(
    `travel_user_id` INT NOT NULL AUTO_INCREMENT,
    `id_user` INT NOT NULL,
    `id_travel` INT NOT NULL,
    `rate` INT,
    `comment` TEXT,
    FOREIGN KEY (`id_user`) REFERENCES `users`(`userID`),
    FOREIGN KEY (`id_travel`) REFERENCES `travels`(`travelID`),
    PRIMARY KEY (`travel_user_id`)
);

