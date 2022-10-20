CREATE TABLE szerzo (
	szerzo_id int NOT NULL AUTO_INCREMENT,
    szerzo_nev varchar(50),
    PRIMARY KEY (szerzo_id)
)

INSERT INTO szerzo (`szerzo_id`, `szerzo_nev`) VALUES 
    (NULL, 'Molnár Ferenc'), 
    (NULL, 'Gárdonyi Géza'),
    (NULL, 'Jókai Mór'), 
    (NULL, 'J. R. R. Tolkien')