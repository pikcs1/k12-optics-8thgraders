/**
 * Mozgás és mechanika kártyák adatai
 * A 7. osztályos fizika: mozgás, mechanika témájú kártyajáték kártyáinak definíciói
 */

/**
 * Mozgás és mechanika témájú kártyák létrehozása
 * @returns {Array} A mozgás és mechanika kártyapakli
 */
function letrehozMozgasPakli() {
  const cards = [];
  let cardId = 20000; // Egyedi ID a mozgás paklinak (20000-től kezdve)
  
  // 1. Mozgás alapfogalmai (Kék kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Mozgás',
    description: 'A testek helyzetének megváltozása a megfigyelő viszonylatában.',
    property: 'mozgás',
    type: 'concept',
    color: 'blue'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Egyenes vonalú mozgás',
    description: 'Olyan mozgás, ahol a test egy egyenes mentén halad.',
    property: 'mozgás',
    type: 'concept',
    color: 'blue'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Egyenes vonalú egyenletes mozgás',
    description: 'Egyenes vonalon, állandó sebességgel történő mozgás.',
    property: 'mozgás',
    type: 'concept',
    color: 'blue'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Egyenes vonalú egyenletesen változó mozgás',
    description: 'Egyenes vonalon, állandó gyorsulással történő mozgás.',
    property: 'mozgás',
    type: 'concept',
    color: 'blue'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Pályagörbe',
    description: 'A mozgó test által megtett út vonala a térben.',
    property: 'mozgás',
    type: 'concept',
    color: 'blue'
  });
  
  // 2. Newton törvényei (Piros kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Newton I. törvénye',
    description: 'Tehetetlenség törvénye: minden test nyugalomban marad vagy egyenes vonalú egyenletes mozgást végez, amíg külső erő nem hat rá.',
    property: 'törvény',
    type: 'law',
    color: 'red'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Newton II. törvénye',
    description: 'A dinamika alaptörvénye: a testre ható erő egyenesen arányos a test gyorsulásával és tömegével (F = m·a).',
    property: 'törvény',
    type: 'law',
    color: 'red'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Newton III. törvénye',
    description: 'Hatás-ellenhatás törvénye: két test kölcsönhatásakor az erők egyenlő nagyságúak, ellentétes irányúak.',
    property: 'törvény',
    type: 'law',
    color: 'red'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Lendületmegmaradás',
    description: 'Zárt rendszerben a testek lendületeinek összege állandó marad a kölcsönhatások során.',
    property: 'törvény',
    type: 'law',
    color: 'red'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Szabadesés',
    description: 'A gravitációs erő hatására történő gyorsuló mozgás, ahol g ≈ 9,81 m/s².',
    property: 'törvény',
    type: 'law',
    color: 'red'
  });
  
  // 3. Alapmennyiségek (Zöld kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Út',
    description: 'A test által megtett pálya teljes hossza; jele: s, mértékegysége: méter (m).',
    property: 'mennyiség',
    type: 'object',
    color: 'green'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Sebesség',
    description: 'A megtett út és az eltelt idő hányadosa; jele: v, mértékegysége: m/s.',
    property: 'mennyiség',
    type: 'object',
    color: 'green'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Gyorsulás',
    description: 'A sebesség időbeli változása; jele: a, mértékegysége: m/s².',
    property: 'mennyiség',
    type: 'object',
    color: 'green'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Erő',
    description: 'Testek között fellépő kölcsönhatás; jele: F, mértékegysége: newton (N).',
    property: 'mennyiség',
    type: 'object',
    color: 'green'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Tömeg',
    description: 'Az anyag mennyiségét jellemző fizikai mennyiség; jele: m, mértékegysége: kilogramm (kg).',
    property: 'mennyiség',
    type: 'object',
    color: 'green'
  });
  
  // 4. Vektor mennyiségek és összefüggések (Sárga kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Vektor',
    description: 'Olyan fizikai mennyiség, amelyet nagysága mellett iránya is jellemez (pl. erő, sebesség).',
    property: 'vektor',
    type: 'device',
    color: 'yellow'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Skalár',
    description: 'Olyan fizikai mennyiség, amelyet csak nagysága jellemez (pl. tömeg, út).',
    property: 'vektor',
    type: 'device',
    color: 'yellow'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 's = v·t',
    description: 'Egyenes vonalú egyenletes mozgásnál a megtett út egyenlő a sebesség és az idő szorzatával.',
    property: 'összefüggés',
    type: 'device',
    color: 'yellow'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'v = a·t',
    description: 'Egyenes vonalú egyenletesen változó mozgásnál a sebességváltozás a gyorsulás és az idő szorzata.',
    property: 'összefüggés',
    type: 'device',
    color: 'yellow'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 's = (a·t²)/2',
    description: 'Egyenes vonalú egyenletesen változó mozgásnál a megtett út, ha kezdősebesség nulla.',
    property: 'összefüggés',
    type: 'device',
    color: 'yellow'
  });
  
  // 5. Emelők (Lila kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Egykarú emelő',
    description: 'Olyan emelő, amelynél a forgáspont az erő és a teher között helyezkedik el.',
    property: 'emelő',
    type: 'application',
    color: 'purple'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Kétkarú emelő',
    description: 'Olyan emelő, amelynél a forgáspont az erő és a teher között helyezkedik el (pl. mérleg, olló).',
    property: 'emelő',
    type: 'application',
    color: 'purple'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Emelő törvénye',
    description: 'Az erő szorozva a forgásponttól mért távolságával egyenlő a teher és a teher forgásponttól mért távolságának szorzatával.',
    property: 'emelő',
    type: 'application',
    color: 'purple'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Csiga',
    description: 'Kerék, amely kerületén kötél vagy lánc fut, használható erő átirányítására vagy előny szerzésére.',
    property: 'emelő',
    type: 'application',
    color: 'purple'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Lejtő',
    description: 'Egyszerű gép, amely kisebb erővel teszi lehetővé a testek emelését vízszinteshez képest ferde felületen.',
    property: 'emelő',
    type: 'application',
    color: 'purple'
  });
  
  // 6. Munka és teljesítmény (Narancs kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Fizikai munka',
    description: 'Az erő és az erő irányába eső elmozdulás szorzata; jele: W, mértékegysége: joule (J).',
    property: 'munka',
    type: 'example',
    color: 'orange'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Teljesítmény',
    description: 'Az időegység alatt végzett munka; jele: P, mértékegysége: watt (W).',
    property: 'munka',
    type: 'example',
    color: 'orange'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Hatásfok',
    description: 'A hasznos munka és a befektetett munka hányadosa, százalékban kifejezve.',
    property: 'munka',
    type: 'example',
    color: 'orange'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Energia',
    description: 'A test munkavégző képessége; jele: E, mértékegysége: joule (J).',
    property: 'munka',
    type: 'example',
    color: 'orange'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Energiamegmaradás',
    description: 'Zárt rendszerben az energia összmennyisége állandó, csak átalakulhat egyik formából a másikba.',
    property: 'munka',
    type: 'example',
    color: 'orange'
  });
  
  // 7. Joker kártyák (Fekete kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Galilei',
    description: 'Olasz tudós, aki a modern fizika megalapozója, a szabadesés törvényszerűségeit vizsgálta.',
    property: 'joker',
    type: 'joker',
    color: 'black'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Newton',
    description: 'Angol fizikus és matematikus, aki lefektette a klasszikus mechanika alapjait, három törvénye meghatározó.',
    property: 'joker',
    type: 'joker',
    color: 'black'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Arkhimédész',
    description: 'Ókori görög tudós, aki az emelők törvényeit tanulmányozta, és kijelentette: "Adjatok egy fix pontot, és kimozdítom helyéből a Földet!"',
    property: 'joker',
    type: 'joker',
    color: 'black'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Súrlódás',
    description: 'A mozgást akadályozó erő, amely a testek érintkező felületei között lép fel.',
    property: 'joker',
    type: 'joker',
    color: 'black'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Tehetetlenség',
    description: 'A testeknek az a tulajdonsága, hogy ellentmondanak mozgásállapotuk megváltoztatásának.',
    property: 'joker',
    type: 'joker',
    color: 'black'
  });
  
  return cards;
}