CREATE TABLE kiado (
	kiado_id int NOT NULL AUTO_INCREMENT,
    kiado_nev varchar(75),
    PRIMARY KEY (kiado_id)
)

INSERT INTO kiado (`kiado_nev`) VALUES 
    ('Ferenc kiadó'), 
    ('Géza kiadó'),
    ('Mór kiadó'), 
    ('Tolkein kiadó')