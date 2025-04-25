/**
 * Hőtan és anyagszerkezet kártyák adatai
 * A 7. osztályos fizika: hőtan, anyagszerkezet témájú kártyajáték kártyáinak definíciói
 */

/**
 * Hőtan és anyagszerkezet témájú kártyák létrehozása
 * @returns {Array} A hőtan és anyagszerkezet kártyapakli
 */
function letrehozHotanPakli() {
  const cards = [];
  let cardId = 30000; // Egyedi ID a hőtan paklinak (30000-től kezdve)
  
  // 1. Hőtan alapjai (Kék kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Hőmérséklet',
    description: 'Az anyag részecskéinek átlagos mozgási energiáját jellemző mennyiség.',
    property: 'alapfogalom',
    type: 'concept',
    color: 'blue'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Hőmennyiség',
    description: 'Az a mennyiség, amelyet egy test leadhat vagy felvesz hőátadás során.',
    property: 'alapfogalom',
    type: 'concept',
    color: 'blue'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Fajhő',
    description: 'Megmutatja, hogy 1 kg anyag hőmérsékletét 1 °C-kal növelni mennyi hő szükséges.',
    property: 'alapfogalom',
    type: 'concept',
    color: 'blue'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Hőtágulás',
    description: 'Az anyagok méretének változása a hőmérséklet hatására.',
    property: 'alapfogalom',
    type: 'concept',
    color: 'blue'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Hővezetés',
    description: 'Hőterjedés közvetlen érintkezéssel, a részecskék adják át az energiát egymásnak.',
    property: 'alapfogalom',
    type: 'concept',
    color: 'blue'
  });
  
  // 2. Halmazállapot-változások (Piros kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Olvadás',
    description: 'Szilárd anyag folyékonnyá válása hő hatására, állandó hőmérsékleten történik.',
    property: 'halmazállapot-változás',
    type: 'law',
    color: 'red'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Fagyás',
    description: 'Folyékony anyag szilárddá válása hőelvonás hatására, állandó hőmérsékleten történik.',
    property: 'halmazállapot-változás',
    type: 'law',
    color: 'red'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Forrás',
    description: 'A folyadék teljes tömegében gőzzé alakul, állandó hőmérsékleten történik.',
    property: 'halmazállapot-változás',
    type: 'law',
    color: 'red'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Lecsapódás',
    description: 'A gőz halmazállapotú anyag folyadékká alakul, hőleadással jár.',
    property: 'halmazállapot-változás',
    type: 'law',
    color: 'red'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Szublimáció',
    description: 'Szilárd anyag közvetlenül gázzá alakul, kimarad a folyékony halmazállapot.',
    property: 'halmazállapot-változás',
    type: 'law',
    color: 'red'
  });
  
  // 3. Anyag halmazállapotai (Zöld kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Szilárd halmazállapot',
    description: 'Az anyag részecskéi egymáshoz közel, rezgőmozgást végeznek, meghatározott alakkal és térfogattal rendelkezik.',
    property: 'halmazállapot',
    type: 'object',
    color: 'green'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Folyékony halmazállapot',
    description: 'Az anyag részecskéi szabadon mozognak, meghatározott térfogattal rendelkezik, alakja változó.',
    property: 'halmazállapot',
    type: 'object',
    color: 'green'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Légnemű halmazállapot',
    description: 'Az anyag részecskéi nagy sebességgel, szabadon mozognak, sem meghatározott alakja, sem térfogata nincs.',
    property: 'halmazállapot',
    type: 'object',
    color: 'green'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Plazma',
    description: 'A negyedik halmazállapot, ionizált, elektromosan vezető gáz, magas hőmérsékleten.',
    property: 'halmazállapot',
    type: 'object',
    color: 'green'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Kristályrács',
    description: 'Szilárd anyagokban a részecskék szabályos térbeli elrendeződése.',
    property: 'halmazállapot',
    type: 'object',
    color: 'green'
  });
  
  // 4. Hőmérsékleti jellemzők (Sárga kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Olvadáspont',
    description: 'Az a hőmérséklet, amelyen az anyag szilárd halmazállapotból folyékonnyá válik.',
    property: 'jellemző',
    type: 'device',
    color: 'yellow'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Forráspont',
    description: 'Az a hőmérséklet, amelyen az anyag folyékony halmazállapotból légneművé válik.',
    property: 'jellemző',
    type: 'device',
    color: 'yellow'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Olvadáshő',
    description: 'Az a hőmennyiség, amely 1 kg anyag megolvasztásához szükséges az olvadásponton.',
    property: 'jellemző',
    type: 'device',
    color: 'yellow'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Forráshő',
    description: 'Az a hőmennyiség, amely 1 kg folyadék elpárologtatásához szükséges a forráspontján.',
    property: 'jellemző',
    type: 'device',
    color: 'yellow'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Celsius-skála',
    description: 'Hőmérsékleti skála, melyen a víz fagyáspontja 0°C, forráspontja 100°C.',
    property: 'jellemző',
    type: 'device',
    color: 'yellow'
  });
  
  // 5. Atom és molekulaszerkezet (Lila kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Atom',
    description: 'Az anyag legkisebb, kémiai módszerekkel tovább nem bontható építőeleme.',
    property: 'atomi',
    type: 'application',
    color: 'purple'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Molekula',
    description: 'Két vagy több atom által alkotott, kovalens kötéssel összekapcsolt részecske.',
    property: 'atomi',
    type: 'application',
    color: 'purple'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Elektron',
    description: 'Negatív töltésű elemi részecske, az atom héjain található.',
    property: 'atomi',
    type: 'application',
    color: 'purple'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Proton',
    description: 'Pozitív töltésű elemi részecske, az atom magjában található.',
    property: 'atomi',
    type: 'application',
    color: 'purple'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Neutron',
    description: 'Semleges töltésű elemi részecske, az atom magjában található.',
    property: 'atomi',
    type: 'application',
    color: 'purple'
  });
  
  // 6. Kölcsönhatások (Narancs kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Mágneses kölcsönhatás',
    description: 'Mágnesek vagy mágneses anyagok között fellépő erőhatás, ami vonzást vagy taszítást eredményez.',
    property: 'kölcsönhatás',
    type: 'example',
    color: 'orange'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Érintkezéses kölcsönhatás',
    description: 'Testek közvetlen fizikai kapcsolatakor létrejövő hatás (pl. súrlódás, rugalmas ütközés).',
    property: 'kölcsönhatás',
    type: 'example',
    color: 'orange'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Elektromos kölcsönhatás',
    description: 'Elektromos töltéssel rendelkező testek között létrejövő erőhatás.',
    property: 'kölcsönhatás',
    type: 'example',
    color: 'orange'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Gravitációs kölcsönhatás',
    description: 'Tömegek között fellépő vonzóerő, amely a távolság négyzetével fordítottan arányos.',
    property: 'kölcsönhatás',
    type: 'example',
    color: 'orange'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Erőterek',
    description: 'Olyan térrész, ahol erőhatás lép fel anélkül, hogy a testek fizikailag érintkeznének (pl. mágneses, gravitációs).',
    property: 'kölcsönhatás',
    type: 'example',
    color: 'orange'
  });
  
  // 7. Joker kártyák (Fekete kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Időjárás',
    description: 'A légkör fizikai állapotváltozásainak összessége, amely hőtani és mechanikai folyamatok eredménye.',
    property: 'joker',
    type: 'joker',
    color: 'black'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Hőszigetelés',
    description: 'A hőátadás megakadályozása különböző anyagok vagy rétegek segítségével.',
    property: 'joker',
    type: 'joker',
    color: 'black'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Víz anomális viselkedése',
    description: 'A víz 4°C-on a legsűrűbb, ezért a jég úszik a víz felszínén, ami az élet fennmaradásának egyik feltétele.',
    property: 'joker',
    type: 'joker',
    color: 'black'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Hőerőgépek',
    description: 'Olyan eszközök, amelyek a hőenergiát mechanikai munkává alakítják (pl. gőzgép, belső égésű motor).',
    property: 'joker',
    type: 'joker',
    color: 'black'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Brown-mozgás',
    description: 'Folyadékokban vagy gázokban lebegő apró részecskék rendezetlen, cikk-cakkos mozgása.',
    property: 'joker',
    type: 'joker',
    color: 'black'
  });
  
  return cards;
}