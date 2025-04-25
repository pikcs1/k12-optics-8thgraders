/**
 * Internet biztonság és közösségi média kártyák adatai
 * Az 5-8. osztályosok számára készült internet használattal kapcsolatos kártyajáték definíciói
 */

/**
 * Internet és közösségi média témájú kártyák létrehozása
 * @returns {Array} Az internet és közösségi média kártyapakli
 */
function letrehozInternetPakli() {
  const cards = [];
  let cardId = 40000; // Egyedi ID az internet paklinak (40000-től kezdve)
  
  // 1. Alapfogalmak (Kék kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Internet',
    description: 'Az egész világot összekötő számítógépes hálózat, amit információkeresésre, kommunikációra használunk.',
    property: 'alapfogalom',
    type: 'concept',
    color: 'blue'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Közösségi média',
    description: 'Olyan internetes oldalak vagy alkalmazások, ahol másokkal megoszthatjuk gondolatainkat, képeinket.',
    property: 'alapfogalom',
    type: 'concept',
    color: 'blue'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Digitális lábnyom',
    description: 'Az összes információ, amit online hagyunk magunk után böngészés, posztolás és kommentálás során.',
    property: 'alapfogalom',
    type: 'concept',
    color: 'blue'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Jelszó',
    description: 'Titkos kód, amivel megvédjük fiókjainkat az illetéktelen hozzáféréstől.',
    property: 'alapfogalom',
    type: 'concept',
    color: 'blue'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Adatvédelem',
    description: 'A személyes adataink biztonságban tartása, csak azokkal osztjuk meg, akikkel szükséges.',
    property: 'alapfogalom',
    type: 'concept',
    color: 'blue'
  });
  
  // 2. Online fenyegetések (Piros kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Vírus',
    description: 'Káros program, ami megfertőzi a számítógépedet és problémákat okoz.',
    property: 'fenyegetés',
    type: 'law',
    color: 'red'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Adathalászat',
    description: 'Amikor csalók megtévesztő üzenetekkel próbálják megszerezni személyes adataidat.',
    property: 'fenyegetés',
    type: 'law',
    color: 'red'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Spam',
    description: 'Kéretlen üzenetek, reklámok, amelyek elárasztják az e-mail fiókodat.',
    property: 'fenyegetés',
    type: 'law',
    color: 'red'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Cyberbullying',
    description: 'Online zaklatás, amikor valakit az interneten keresztül bántanak, megaláznak vagy fenyegetnek.',
    property: 'fenyegetés',
    type: 'law',
    color: 'red'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Személyiséglopás',
    description: 'Amikor valaki a te adataidat használja fel, és úgy tesz, mintha ő lenne te.',
    property: 'fenyegetés',
    type: 'law',
    color: 'red'
  });
  
  // 3. Eszközök és platformok (Zöld kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Okostelefon',
    description: 'Hordozható eszköz, amivel internetezhetünk, telefonálhatunk és alkalmazásokat használhatunk.',
    property: 'eszköz',
    type: 'object',
    color: 'green'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Közösségi oldal',
    description: 'Olyan weboldal, ahol profilt készíthetünk és kapcsolatot tarthatunk barátainkkal.',
    property: 'eszköz',
    type: 'object',
    color: 'green'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Böngésző',
    description: 'Program, amivel megtekinthetjük a weboldalakat az interneten.',
    property: 'eszköz',
    type: 'object',
    color: 'green'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Kétlépcsős hitelesítés',
    description: 'Biztonsági módszer, ahol a jelszavunk mellett egy második ellenőrzést is használunk.',
    property: 'eszköz',
    type: 'object',
    color: 'green'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Vírusirtó',
    description: 'Program, ami megvédi a számítógépedet a káros szoftverektől.',
    property: 'eszköz',
    type: 'object',
    color: 'green'
  });
  
  // 4. Biztonsági eszközök (Sárga kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Erős jelszó',
    description: 'Olyan jelszó, ami betűket, számokat és különleges karaktereket is tartalmaz, nehéz kitalálni.',
    property: 'biztonság',
    type: 'device',
    color: 'yellow'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Adatvédelmi beállítások',
    description: 'Olyan opciók, amelyekkel szabályozhatjuk, ki láthatja az adatainkat a közösségi oldalakon.',
    property: 'biztonság',
    type: 'device',
    color: 'yellow'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Privát böngészés',
    description: 'A böngésző olyan módja, ami nem tárolja a meglátogatott oldalak listáját a számítógépen.',
    property: 'biztonság',
    type: 'device',
    color: 'yellow'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Szülői felügyelet',
    description: 'Olyan eszközök és beállítások, amelyekkel a szülők figyelemmel kísérhetik és korlátozhatják gyermekük internethasználatát.',
    property: 'biztonság',
    type: 'device',
    color: 'yellow'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Biztonsági mentés',
    description: 'A fontos adatok másolatának elkészítése, hogy ne vesszenek el, ha valami probléma történik.',
    property: 'biztonság',
    type: 'device',
    color: 'yellow'
  });
  
  // 5. Online kommunikáció (Lila kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'E-mail',
    description: 'Elektronikus levél, amit az interneten keresztül küldünk másoknak.',
    property: 'kommunikáció',
    type: 'application',
    color: 'purple'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Csevegés',
    description: 'Szöveges üzenetek küldése és fogadása valós időben az interneten keresztül.',
    property: 'kommunikáció',
    type: 'application',
    color: 'purple'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Poszt',
    description: 'Olyan tartalom, amit közzéteszünk egy közösségi oldalon, hogy mások lássák.',
    property: 'kommunikáció',
    type: 'application',
    color: 'purple'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Komment',
    description: 'Megjegyzés, amit mások posztjaihoz fűzünk a véleményünk kifejezésére.',
    property: 'kommunikáció',
    type: 'application',
    color: 'purple'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Emoji',
    description: 'Kis képek, amiket üzenetekben használunk, hogy kifejezzük érzelmeinket.',
    property: 'kommunikáció',
    type: 'application',
    color: 'purple'
  });
  
  // 6. Példák (Narancs kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Gyanús e-mail',
    description: 'Ha egy e-mail nyereményt ígér vagy sürgeti a jelszavad megadását, az valószínűleg csalás.',
    property: 'példa',
    type: 'example',
    color: 'orange'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Online játék',
    description: 'Internetkapcsolattal játszható játék, ahol gyakran más játékosokkal is találkozhatunk.',
    property: 'példa',
    type: 'example',
    color: 'orange'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Hamis hír',
    description: 'Olyan információ az interneten, ami nem igaz, de igaznak tűnhet, ha nem ellenőrizzük.',
    property: 'példa',
    type: 'example',
    color: 'orange'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Videómegosztó',
    description: 'Olyan oldal, ahol videókat nézhetünk és oszthatunk meg másokkal.',
    property: 'példa',
    type: 'example',
    color: 'orange'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Online tanulás',
    description: 'Az internet használata új ismeretek megszerzésére, házi feladatok megoldására.',
    property: 'példa',
    type: 'example',
    color: 'orange'
  });
  
  // 7. Joker kártyák (Fekete kártyák)
  cards.push({
    id: (cardId++).toString(),
    text: 'Digitális szünet',
    description: 'Időszak, amikor szándékosan nem használjuk az internetet vagy az eszközeinket, hogy pihenjünk.',
    property: 'joker',
    type: 'joker',
    color: 'black'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Internetbiztonság',
    description: 'Az a gyakorlat, hogy biztonságosan használjuk az internetet és megvédjük magunkat a veszélyektől.',
    property: 'joker',
    type: 'joker',
    color: 'black'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'FOMO',
    description: 'A kimaradástól való félelem, ami miatt folyton ellenőrizzük a közösségi médiát.',
    property: 'joker',
    type: 'joker',
    color: 'black'
  });
  
  return cards;
}