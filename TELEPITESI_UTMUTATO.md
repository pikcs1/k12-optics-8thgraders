# Optikai Kártyajáték - Telepítési útmutató

Ez a dokumentum részletes útmutatót nyújt az Optikai Kártyajáték telepítéséhez a Google Apps Script platformon. A játék egy magyar nyelvű, többjátékos oktatójáték, amely az optika alapjaival ismerteti meg a 8. osztályos fizika tanulókat.

## Tartalomjegyzék

1. [Követelmények](#követelmények)
2. [Telepítés lépései](#telepítés-lépései)
3. [Játék tesztelése](#játék-tesztelése)
4. [Hibaelhárítás](#hibaelhárítás)
5. [Játékszabályok](#játékszabályok)

## Követelmények

A játék telepítéséhez a következőkre lesz szüksége:

- Google-fiók (lehetőleg Google Workspace for Education)
- Adminisztrátori jogosultság (ha iskolai környezetben telepíti)
- Alapvető ismeretek a Google Apps Script használatáról

## Telepítés lépései

### 1. Google Apps Script projekt létrehozása

1. Nyissa meg a [Google Apps Script](https://script.google.com/home) oldalt és jelentkezzen be a Google-fiókjával.
2. Kattintson a **+ Új projekt** gombra.
3. Nevezze el a projektet "Optikai Kártyajáték"-nak.

### 2. Fájlok létrehozása

A projektben a következő fájlokat kell létrehoznia:

1. `Code.gs`: A fő szkript fájl
2. `cards.gs`: Kártyák definícióit tartalmazó fájl
3. `database.gs`: Adatbázis műveleteket tartalmazó fájl
4. `gameLogic.gs`: Játékmechanika fájl
5. `index.html`: Fő HTML oldal
6. `script.html`: JavaScript kód
7. `style.html`: CSS stílusok
8. `appsscript.json`: Projekt konfiguráció

#### Fájlok létrehozása

1. A bal oldali panelen kattintson a **+** gombra a **Fájlok** mellett.
2. Válassza a **Script** vagy **HTML** lehetőséget a fájl típusától függően.
3. Nevezze el a fájlt megfelelően.
4. Másolja be a fájl tartalmát a kódszerkesztőbe.

##### Különleges fájlok

- Az `appsscript.json` fájl létrehozásához kattintson a **Projekt beállítások** gombra, majd másolja be a megfelelő tartalmat.
- Az `index.html`, `script.html` és `style.html` fájlokat HTML típusként hozza létre.

### 3. Kód másolása a fájlokba

Másolja be a megfelelő kódot minden fájlba a jelen GitHub repository-ból. Minden fájlnál győződjön meg arról, hogy a teljes tartalmat átmásolta.

### 4. Projekt beállítások

1. Kattintson a **Projekt beállítások** gombra a bal oldali menüben.
2. Az **Általános** fülön állítsa be a megfelelő időzónát.
3. A **Szkript tulajdonságok** részben adjon hozzá egy új tulajdonságot:
   - Név: `SPREADSHEET_ID`
   - Érték: (hagyja üresen, ezt a program automatikusan létrehozza)

### 5. Webes alkalmazásként való közzététel

1. Kattintson a **Telepítés > Új telepítés** menüpontra.
2. A **Kinek van hozzáférése** opciónál válassza a következőt:
   - Iskolai környezetben: "Bárkinek a [domain neve]-ban/ben"
   - Egyéni használatra: "Bárki"
3. A **Futtatás mint** opciónál válassza az "Engem" (ha ez a saját felhasználói fiókjához kapcsolódó adatok hozzáféréséhez szükséges) vagy az "A kéréseket indító felhasználó" (ajánlott).
4. Kattintson a **Telepítés** gombra.
5. Másolja ki a generált webes alkalmazás URL-jét.

### 6. Engedélyek kezelése

Az első indításkor a webapplikáció kérni fogja, hogy engedélyezze a hozzáférést. Kattintson az **Engedélyezés** gombra.

## Játék tesztelése

1. Nyissa meg a telepítési folyamat során kapott URL-t.
2. Adja meg a játékos nevét és hozzon létre egy új játékszobát.
3. Adja meg a játékszoba azonosítóját más játékosoknak, hogy csatlakozhassanak.
4. Tesztelje az alapvető funkciókat:
   - Játékszoba létrehozása
   - Csatlakozás játékszobához
   - Játék indítása
   - Kártyák kijátszása
   - Kártyák húzása
   - Játék befejezése

## Hibaelhárítás

### Gyakori problémák és megoldásaik

1. **Hozzáférési hiba**: Ellenőrizze, hogy megfelelően állította-e be a hozzáférési jogosultságokat a webes alkalmazás közzétételekor.

2. **Szkript időtúllépési hiba**: A Google Apps Script futtatási ideje korlátozott. Ha hosszú műveleteket végez, próbálja meg optimalizálni a kódot vagy felosztani a műveletet több részre.

3. **Táblázat hozzáférési hiba**: Ellenőrizze, hogy a szkript megfelelő jogosultsággal rendelkezik-e a Google Táblázatok hozzáféréséhez.

4. **Üres játékszoba azonosító**: Ha a játékszoba azonosító nem jelenik meg, ellenőrizze, hogy megfelelően fut-e a `generateGameId()` függvény.

5. **Csatlakozási problémák**: Ellenőrizze, hogy helyesen írta-e be a játékszoba azonosítóját. Az azonosító kis- és nagybetű érzékeny.

### Hibák jelentése

Ha olyan hibát tapasztal, amely nincs feltüntetve ebben a dokumentációban, kérjük, jelentse a rendszergazdának a következő információkkal:

- A hiba pontos leírása
- Az akció, amely kiváltotta a hibát
- Képernyőkép a hibaüzenetről (ha van)
- A böngésző típusa és verziója
- Az eszköz típusa (asztali számítógép, laptop, tablet, telefon)

## Játékszabályok

### A játék célja

Az Optikai Kártyajáték célja, hogy a játékosok elsőként szabaduljanak meg az összes kártyájuktól, miközben megismerik az optika alapjait.

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

### Oktatási célok

A játék során a résztvevők megismerik:
- Az optika alapfogalmait
- A fényvisszaverődés és fénytörés törvényeit
- Az optikai eszközök működését
- A gyakori optikai jelenségek magyarázatát

---

© 2025 Optikai Kártyajáték - Minden jog fenntartva.