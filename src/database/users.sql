-- Creating user table
CREATE TABLE users (
    `id` INT(50) UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(50) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `lastname` VARCHAR(50) NOT NULL,
    `country` VARCHAR(50) NOT NULL,
    `role` VARCHAR(50) NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    `signupDate` DATE DEFAULT CURRENT_TIMESTAMP,
    `birthday` DATE,
    `mobile` VARCHAR(50),
    `phone` VARCHAR(50),
    `avatar` VARCHAR(255),
    `description` VARCHAR(255),
    `company` VARCHAR(50),
    `appointment` VARCHAR(100),
    PRIMARY KEY (`id`),
    UNIQUE KEY `email` (`email`),
    UNIQUE KEY `mobile` (`mobile`)
);

-- Alert if names & lastnames are equal
ALERT TABLE users ADD UNIQUE INDEX fullName (`name`, `lastname`);