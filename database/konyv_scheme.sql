CREATE TABLE konyv (
	konyv_id int NOT NULL AUTO_INCREMENT,
    cim varchar(75),
    szerzo int,
    kiado int,
    mufaj int,
    ar int,
    kiadas_datum date,
    kep varchar(75),
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime DEFAULT NULL,
    PRIMARY KEY (konyv_id),
    FOREIGN KEY (szerzo) REFERENCES szerzo(szerzo_id),
    FOREIGN KEY (kiado) REFERENCES kiado(kiado_id),
    FOREIGN KEY (mufaj) REFERENCES mufaj(mufaj_id)
)

INSERT INTO konyv (`cim`, `szerzo`, `kiado`, `mufaj`, `ar`) VALUES 
    ('Pál utcai fiúk', '1', '1', '1', '10000'), 
    ('Egri csillagok', '2', '2', '2', '7500'),
    ('Az arany ember', '3', '3', '3', '5000'), 
    ('A Gyűrűk Ura', '4', '4', '4', '15000')