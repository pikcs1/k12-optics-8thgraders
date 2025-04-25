/**
 * Matematika kártyák adatai
 * Az 5-8. osztályosok számára készült matematika témájú kártyajáték definíciói
 */

/**
 * Matematika témájú kártyák létrehozása
 * @returns {Array} A matematika kártyapakli
 */
function letrehozMatematikaPakli() {
  const cards = [];
  let cardId = 50000; // Egyedi ID a matematika paklinak (50000-től kezdve)
  
  // 1. Alapfogalmak (Kék kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Páros szám',
    description: 'Olyan szám, amely osztható 2-vel maradék nélkül (pl. 2, 4, 6, 8).',
    property: 'alapfogalom',
    type: 'concept',
    color: 'blue'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Páratlan szám',
    description: 'Olyan szám, amely nem osztható 2-vel maradék nélkül (pl. 1, 3, 5, 7).',
    property: 'alapfogalom',
    type: 'concept',
    color: 'blue'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Prímszám',
    description: 'Olyan természetes szám, aminek pontosan két osztója van: 1 és önmaga (pl. 2, 3, 5, 7, 11).',
    property: 'alapfogalom',
    type: 'concept',
    color: 'blue'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Tört',
    description: 'Két egész szám hányadosa (pl. 3/4, 1/2), amit használhatunk részek kifejezésére.',
    property: 'alapfogalom',
    type: 'concept',
    color: 'blue'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Tizedes tört',
    description: 'Olyan szám, amelyben tizedesvessző választja el az egész és tört részt (pl. 3,14).',
    property: 'alapfogalom',
    type: 'concept',
    color: 'blue'
  });
  
  // 2. Műveletek (Piros kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Összeadás',
    description: 'Két vagy több szám együttes értékének kiszámítása (pl. 3 + 4 = 7).',
    property: 'művelet',
    type: 'law',
    color: 'red'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Kivonás',
    description: 'Egy számból egy másik kivonása, a különbség meghatározása (pl. 8 - 3 = 5).',
    property: 'művelet',
    type: 'law',
    color: 'red'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Szorzás',
    description: 'Egy szám többszörözése, ismételt összeadás (pl. 4 × 3 = 12).',
    property: 'művelet',
    type: 'law',
    color: 'red'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Osztás',
    description: 'Egy szám felosztása egyenlő részekre, a szorzás fordított művelete (pl. 12 ÷ 3 = 4).',
    property: 'művelet',
    type: 'law',
    color: 'red'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Hatványozás',
    description: 'Egy szám önmagával való többszöri szorzása (pl. 2³ = 2×2×2 = 8).',
    property: 'művelet',
    type: 'law',
    color: 'red'
  });
  
  // 3. Geometriai alakzatok (Zöld kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Háromszög',
    description: 'Három egyenes szakasz által határolt síkidom, aminek három csúcsa és három oldala van.',
    property: 'alakzat',
    type: 'object',
    color: 'green'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Négyzet',
    description: 'Négy egyenlő oldalú és négy derékszögű síkidom, a téglalap speciális esete.',
    property: 'alakzat',
    type: 'object',
    color: 'green'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Kör',
    description: 'Olyan síkidom, amelynek minden pontja egyenlő távolságra van egy középponttól.',
    property: 'alakzat',
    type: 'object',
    color: 'green'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Kocka',
    description: 'Hat négyzetlappal határolt test, minden csúcsából három él indul ki.',
    property: 'alakzat',
    type: 'object',
    color: 'green'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Gömb',
    description: 'Olyan test, amelynek minden pontja egyenlő távolságra van egy középponttól.',
    property: 'alakzat',
    type: 'object',
    color: 'green'
  });
  
  // 4. Mérések és mértékegységek (Sárga kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Kerület',
    description: 'Síkidomok határvonalának hossza, a síkidomot körülvevő vonal hosszúsága.',
    property: 'mérés',
    type: 'device',
    color: 'yellow'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Terület',
    description: 'Síkidom által lefedett felület nagysága, mértékegysége pl. cm², m².',
    property: 'mérés',
    type: 'device',
    color: 'yellow'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Térfogat',
    description: 'Test által kitöltött tér mennyisége, mértékegysége pl. cm³, m³.',
    property: 'mérés',
    type: 'device',
    color: 'yellow'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Szög',
    description: 'Két félegyenes által bezárt tartomány, mértékegysége a fok (°).',
    property: 'mérés',
    type: 'device',
    color: 'yellow'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Arány',
    description: 'Két mennyiség összehasonlítása egymáshoz viszonyítva (pl. 3:4).',
    property: 'mérés',
    type: 'device',
    color: 'yellow'
  });
  
  // 5. Alkalmazások (Lila kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Százalékszámítás',
    description: 'Valaminek a századrészét kifejező számítási mód (pl. 25% = 1/4).',
    property: 'alkalmazás',
    type: 'application',
    color: 'purple'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Egyenlet',
    description: 'Olyan matematikai állítás, ahol az ismeretlen értékét keressük (pl. x + 3 = 8).',
    property: 'alkalmazás',
    type: 'application',
    color: 'purple'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Koordinátarendszer',
    description: 'Síkbeli vagy térbeli pontok helyzetének meghatározására szolgáló rendszer.',
    property: 'alkalmazás',
    type: 'application',
    color: 'purple'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Diagramok',
    description: 'Adatok vizuális megjelenítésére szolgáló eszközök, pl. oszlop-, kör- vagy vonaldiagram.',
    property: 'alkalmazás',
    type: 'application',
    color: 'purple'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Valószínűségszámítás',
    description: 'Egy esemény bekövetkezési esélyének kiszámítása (pl. kockadobásnál 1/6 az esélye a 6-osnak).',
    property: 'alkalmazás',
    type: 'application',
    color: 'purple'
  });
  
  // 6. Példák (Narancs kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Pitagorasz-tétel',
    description: 'Derékszögű háromszögben a befogók négyzetének összege egyenlő az átfogó négyzetével: a² + b² = c².',
    property: 'példa',
    type: 'example',
    color: 'orange'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Pi (π)',
    description: 'A kör kerületének és átmérőjének hányadosa, értéke kb. 3,14.',
    property: 'példa',
    type: 'example',
    color: 'orange'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Számtani sorozat',
    description: 'Olyan sorozat, ahol minden tag az előzőből ugyanannak a számnak a hozzáadásával keletkezik.',
    property: 'példa',
    type: 'example',
    color: 'orange'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Fibonacci-sorozat',
    description: 'Sorozat, ahol minden szám az előző kettő összege: 1, 1, 2, 3, 5, 8, 13...',
    property: 'példa',
    type: 'example',
    color: 'orange'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Kombinatorika',
    description: 'Különböző elrendezések, csoportosítások számát meghatározó matematikai terület.',
    property: 'példa',
    type: 'example',
    color: 'orange'
  });
  
  // 7. Joker kártyák (Fekete kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Matematikai gondolkodás',
    description: 'Logikus gondolkodásmód, amely segít problémákat megoldani és összefüggéseket felfedezni.',
    property: 'joker',
    type: 'joker',
    color: 'black'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Számológép',
    description: 'Eszköz, ami segít elvégezni matematikai műveleteket, de a gondolkodást nem helyettesíti.',
    property: 'joker',
    type: 'joker',
    color: 'black'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Matematikai verseny',
    description: 'Olyan esemény, ahol diákok matematikai feladatokat oldanak meg versenyhelyzetben.',
    property: 'joker',
    type: 'joker',
    color: 'black'
  });
  
  return cards;
}