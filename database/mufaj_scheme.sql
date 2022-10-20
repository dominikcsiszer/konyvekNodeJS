CREATE TABLE mufaj (
	mufaj_id int NOT NULL AUTO_INCREMENT,
    megnevezes varchar(75),
    PRIMARY KEY (mufaj_id)
)

INSERT INTO mufaj (`megnevezes`) VALUES 
    ('Ifjúsági regény'), 
    ('Történelmi regény'),
    ('Társadalmi regény'), 
    ('Fantasy regény')