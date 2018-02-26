DROP DATABASE IF EXISTS slamazon;

CREATE DATABASE slamazon;

USE slamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);
    
INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ('pointy guitar', 'musical instruments', 666.66, 6), ('ampeg 8x10 cabinet', 'sound gear', 666.06, 8),
		('demilich - nespithe', 'music albums', 6.99, 66), ('defeated sanity - psalms of the moribund', 'music albums', 6.66, 42),
        ('mesa/boogie triple rectifier head', 'sound gear', 875.00, 4), ('slow chromatic heaviness', 'sounds', 9001.00, 9000),
        ('cast iron skillet', 'really metal stuff', 19.99, 32), ('grab-bag of rare old misprinted coins', 'really metal stuff', 10.00, 99),
        ('mesa/boogie subway D-800 head', 'sound gear', 799.99, 7), ('blast beats', 'sounds', 9000.00, 9999),
        ('guttural vocals', 'sounds', 7000.00, 6000), ('parasitic ejaculation - echoes of depravity', 'music albums', 7.00, 60),
        ('5-string bass' ,'musical instruments', 599.99, 5), ('drum set', 'musical instruments', 699.99, 11);
