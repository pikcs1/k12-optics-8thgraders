# Optikai Kártyajáték

Ez a projekt egy Google Apps Script alapú kártyajáték, amely segít a 8. osztályos diákoknak az optika alapjainak elsajátításában. A magyar nyelvű játék többjátékos módban játszható, játékszoba funkcionalitással.

## Áttekintés

Az Optikai Kártyajáték egy oktatási célú kártyajáték, amely a fizika tantárgy optika fejezetének fogalmait, törvényeit és jelenségeit dolgozza fel játékos formában. A játékban a tanulók különböző színű és típusú kártyákat játszhatnak ki, miközben megismerik az optika alapfogalmait.

### Főbb funkciók

- Játékszoba létrehozás és csatlakozás funkció
- 2-10 játékos egyidejű játéka
- Magyar nyelvű oktatási tartalom
- Egyszerű, intuitív kezelőfelület
- Valós idejű játékmenet

## A játék szabályai

### A játék célja

A játékosok célja, hogy elsőként szabaduljanak meg az összes kártyájuktól.

### Játékmenet

1. Minden játékos 5 kártyával kezd.
2. A játékot létrehozó játékos kezd.
3. A játékosok az óramutató járásával megegyező irányban követik egymást.
4. A soron következő játékos csak olyan kártyát tehet le, amely:
   - megegyezik az asztalon lévő kártya színével, vagy
   - megegyezik az asztalon lévő kártya típusával, vagy
   - megegyezik az asztalon lévő kártya tulajdonságával
5. Ha a játékos nem tud kártyát letenni, húznia kell egyet a pakliból.
6. A fekete Joker kártyák bármikor kijátszhatók.
7. A játék addig tart, amíg valaki megszabadul az összes kártyájától.

### Kártyatípusok

- **Fogalom (kék):** Optikai alapfogalmakat tartalmazó kártyák
- **Törvény (piros):** Optikai törvények és szabályok kártyái
- **Tárgy (zöld):** Optikai tárgyak kártyái
- **Eszköz (sárga):** Komplex optikai eszközök kártyái
- **Alkalmazás (lila):** Fénytani alkalmazások kártyái
- **Példa (narancs):** Konkrét példák optikai jelenségekre
- **Joker (fekete):** Speciális kártyák, bármikor kijátszhatók

## Telepítés és használat

A részletes telepítési útmutatót a [TELEPITESI_UTMUTATO.md](TELEPITESI_UTMUTATO.md) fájlban találod.

### Előnézet és tesztelés

A projekt tartalmaz egy `preview.html` fájlt, amely lehetővé teszi a játék tesztelését Google Apps Script környezeten kívül. Ez a változat csak demonstrációs célokat szolgál és korlátozott funkcionalitással bír.

Az előnézet megtekintéséhez:
1. Nyisd meg a `preview.html` fájlt egy webböngészőben
2. Használd a játék alapvető funkcióit (játékszoba létrehozás, csatlakozás, kártyakijátszás)

## Hibajavítás

Ha a játék telepítésekor a következő hibaüzenetbe ütközöl:
```
Hiba a játékszoba létrehozásakor: { [Exception: You can't remove all the sheets in a document.] name: 'Exception' }
```

Akkor a hiba oka, hogy a Google Spreadsheets API nem engedi az összes munkalap törlését egy táblázatból. A legfrissebb verzióban ezt a hibát javítottuk azzal, hogy az alapértelmezett munkalapot nem töröljük, hanem átnevezzük.

## Technikai részletek

A projekt a következő technológiákat használja:

- **Google Apps Script**: A backend logika és a webes alkalmazás futtatása
- **Google Spreadsheets API**: Adatok tárolása és kezelése
- **HTML/CSS/JavaScript**: Felhasználói felület és kliens oldali logika
- **Bootstrap 5**: Reszponzív design és UI komponensek

## A projekt fájlstruktúrája

- `Code.gs`: Fő szkript fájl
- `cards.gs`: Kártyák definícióit tartalmazó fájl
- `database.gs`: Adatbázis műveleteket tartalmazó fájl
- `gameLogic.gs`: Játékmechanika fájl
- `index.html`: Fő HTML oldal
- `script.html`: JavaScript kód
- `style.html`: CSS stílusok
- `appsscript.json`: Projekt konfiguráció
- `preview.html`: Előnézeti mód a teszteléshez
- `mock-gas.js`: Google Apps Script API szimuláció az előnézeti módhoz
- `TELEPITESI_UTMUTATO.md`: Részletes telepítési útmutató

## Licence

Ez a projekt oktatási célokra szabadon felhasználható.

## Kapcsolat

Ha kérdésed vagy javaslatod van a játékkal kapcsolatban, keress minket az iskola belső kommunikációs csatornáin.