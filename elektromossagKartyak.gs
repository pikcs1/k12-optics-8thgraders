/**
 * Elektromosság kártyák adatai
 * A 8. osztályos elektromosság témájú kártyajáték kártyáinak definíciói
 */

/**
 * Elektromosság témájú kártyák létrehozása
 * @returns {Array} Az elektromosság kártyapakli
 */
function letrehozElektromossagPakli() {
  const cards = [];
  let cardId = 10000; // Egyedi ID az elektromosság paklinak (10000-től kezdve)
  
  // 1. Alapfogalmak (Kék kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Sztatikus elektromosság',
    description: 'Elektromos töltések egyensúlyhiánya egy anyagon belül.',
    property: 'alapfogalom',
    type: 'concept',
    color: 'blue'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Elektromos töltés',
    description: 'Az anyagban lévő elektromos tulajdonság, ami vonzással vagy taszítással hat.',
    property: 'alapfogalom',
    type: 'concept',
    color: 'blue'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Elektromos áram',
    description: 'Töltések rendezett mozgása egy vezetőben.',
    property: 'alapfogalom',
    type: 'concept',
    color: 'blue'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Feszültség',
    description: 'Két pont közötti potenciálkülönbség, ami az áramlást okozza.',
    property: 'alapfogalom',
    type: 'concept',
    color: 'blue'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Ellenállás',
    description: 'Egy anyag azon tulajdonsága, hogy mennyire akadályozza az áram folyását.',
    property: 'alapfogalom',
    type: 'concept',
    color: 'blue'
  });
  
  // 2. Áramtípusok (Piros kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Egyenáram (DC)',
    description: 'Olyan áram, amely egyetlen irányban folyik.',
    property: 'áramtípus',
    type: 'law',
    color: 'red'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Váltakozó áram (AC)',
    description: 'Olyan áram, amely periodikusan változtatja irányát.',
    property: 'áramtípus',
    type: 'law',
    color: 'red'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Frekvencia',
    description: 'Azt mutatja meg, hányszor változtatja irányát a váltakozó áram 1 másodperc alatt.',
    property: 'áramtípus',
    type: 'law',
    color: 'red'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Amplitúdó',
    description: 'A váltakozó áram vagy feszültség maximális értéke.',
    property: 'áramtípus',
    type: 'law',
    color: 'red'
  });
  
  // 3. Áramköri elemek (Zöld kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Ellenállás',
    description: 'Áramköri elem, ami korlátozza az áram erősségét.',
    property: 'áramköri elem',
    type: 'object',
    color: 'green'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Elem/Tápegység',
    description: 'Elektromos energiát szolgáltató forrás, ami biztosítja a feszültséget.',
    property: 'áramköri elem',
    type: 'object',
    color: 'green'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'LED',
    description: 'Fényt kibocsátó dióda, amely fénnyé alakítja az elektromos energiát.',
    property: 'áramköri elem',
    type: 'object',
    color: 'green'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Kapcsoló',
    description: 'Az áramkör zárását vagy megszakítását biztosító eszköz.',
    property: 'áramköri elem',
    type: 'object',
    color: 'green'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Kondenzátor',
    description: 'Elektromos töltéseket és energiát tárol két vezető lemez között.',
    property: 'áramköri elem',
    type: 'object',
    color: 'green'
  });
  
  // 4. Áramköri kapcsolások (Sárga kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Soros kapcsolás',
    description: 'Az áramköri elemek egymás után kapcsolódnak, az áram erőssége mindenhol ugyanakkora.',
    property: 'kapcsolás',
    type: 'device',
    color: 'yellow'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Párhuzamos kapcsolás',
    description: 'Az áramköri elemek párhuzamosan kapcsolódnak, a feszültség ugyanakkora minden ágban.',
    property: 'kapcsolás',
    type: 'device',
    color: 'yellow'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Rövidzárlat',
    description: 'Olyan kapcsolás, ahol az áram a legkisebb ellenállású úton halad.',
    property: 'kapcsolás',
    type: 'device',
    color: 'yellow'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Szakadás',
    description: 'Az áramkör megszakítása, ahol az áram nem tud átfolyni.',
    property: 'kapcsolás',
    type: 'device',
    color: 'yellow'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Kirchhoff törvényei',
    description: 'Az áramkörökben folyó áramok és feszültségek meghatározására szolgáló törvények.',
    property: 'kapcsolás',
    type: 'device',
    color: 'yellow'
  });
  
  // 5. Mértékegységek (Lila kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Amper (A)',
    description: 'Az elektromos áram erősségének mértékegysége.',
    property: 'mértékegység',
    type: 'application',
    color: 'purple'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Volt (V)',
    description: 'Az elektromos feszültség mértékegysége.',
    property: 'mértékegység',
    type: 'application',
    color: 'purple'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Ohm (Ω)',
    description: 'Az elektromos ellenállás mértékegysége.',
    property: 'mértékegység',
    type: 'application',
    color: 'purple'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Watt (W)',
    description: 'Az elektromos teljesítmény mértékegysége.',
    property: 'mértékegység',
    type: 'application',
    color: 'purple'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Joule (J)',
    description: 'Az energia mértékegysége, az elektromos munkát is ebben mérjük.',
    property: 'mértékegység',
    type: 'application',
    color: 'purple'
  });
  
  // 6. Alkalmazások (Narancs kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Villanymotor',
    description: 'Eszköz, ami az elektromos energiát mechanikai energiává alakítja.',
    property: 'alkalmazás',
    type: 'example',
    color: 'orange'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Generátor',
    description: 'Eszköz, ami a mechanikai energiát elektromos energiává alakítja.',
    property: 'alkalmazás',
    type: 'example',
    color: 'orange'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Transzformátor',
    description: 'A váltakozó feszültség értékét változtatja meg.',
    property: 'alkalmazás',
    type: 'example',
    color: 'orange'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Háztartási áramkörök',
    description: 'Otthonokban használt elektromos rendszerek, általában 230V feszültséggel.',
    property: 'alkalmazás',
    type: 'example',
    color: 'orange'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Biztonsági eszközök',
    description: 'Az áramütés és túlterhelés elleni védelem eszközei (pl. biztosíték).',
    property: 'alkalmazás',
    type: 'example',
    color: 'orange'
  });
  
  // 7. Joker kártyák (Fekete kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Ohm törvénye',
    description: 'Az áram erőssége egyenesen arányos a feszültséggel és fordítottan arányos az ellenállással: I = U/R',
    property: 'joker',
    type: 'joker',
    color: 'black'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Faraday',
    description: 'Michael Faraday fedezte fel az elektromágneses indukciót, ami a modern elektromos eszközök alapja.',
    property: 'joker',
    type: 'joker',
    color: 'black'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Tesla',
    description: 'Nikola Tesla a váltakozó áram rendszerének fejlesztésében játszott kulcsszerepet.',
    property: 'joker',
    type: 'joker',
    color: 'black'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Edison',
    description: 'Thomas Edison számos elektromos találmányt fejlesztett ki, köztük a villanykörtét.',
    property: 'joker',
    type: 'joker',
    color: 'black'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Maxwell',
    description: 'James Clerk Maxwell matematikailag írta le az elektromágneses jelenségeket egyenleteivel.',
    property: 'joker',
    type: 'joker',
    color: 'black'
  });
  
  return cards;
}