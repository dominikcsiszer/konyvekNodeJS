# Könyvek nodejs

konyvek adatainak megjelenítése a HTML oldalon.
Táblázatban
Könyváruház

#### Model
mi reprezentálja a program állapotát? - tomb-be / objektumok - KONYV tábla tárolja az aktuálisan kezelendő könyveket
fetch - modellben
innen idnítjuk az aszinkron hívásokat
vissza kell adnia egy tömböt.
#### Controller
adatokat a megfelelő helyre irányítsa
Összeköti a modellt és a view-t
pédányosítja a modellt
példányosítja a viewt
reagál a view kéréseire - pl: törlésre, módosításra, új adat felvitelére
#### View
oldal megjelenítése
konyvAdminView - egy könyv adatai - (táblázat egyetlen sora) - tr-tagekbe bekerülnek az adatok
konyvekAdminView - az összes könyv adatait megjeleníti - táblázat létrehozása a fejléccel

##### Admin Oldal
-  listázni a könyveket
-  új könyv felvitele
-  Könyv adatainak módosítása
-  Könyv törölni
Táblázatos formában

##### Vásárlói oldal
-   listázni
-   kosárba rakni.
DIVEK-ben