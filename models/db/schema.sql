
-- Schema
DROP DATABASE IF EXISTS stock_db;
CREATE DATABASE stock_db;

USE stock_db;

-- Our stock table to hold data from IEX API as added from user input
CREATE TABLE stocks
(
    id int NOT NULL AUTO_INCREMENT,
    symbol varchar(255) NOT NULL,
    companyName VARCHAR(255),
    high INTEGER(10),
    low INTEGER(10),
    latestPrice INTEGER(10),
    PRIMARY KEY (id)
);

