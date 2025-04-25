/**
 * Játék logika
 * Az optikai kártyajáték alapvető logikája
 */

/**
 * Ellenőrzi, hogy az adott kártya kijátszható-e az asztalon lévő kártyára
 */
function canPlayCard(card, tableCard) {
  // Ha nincs asztalon kártya, bármit le lehet tenni
  if (!tableCard) return true;
  
  // Ha az asztalon Joker van, bármilyen kártyát le lehet tenni
  if (tableCard.type === 'joker') return true;
  
  // Ugyanolyan típusú kártyát mindig le lehet tenni
  if (card.type === tableCard.type) return true;
  
  // Ugyanolyan színű kártyát mindig le lehet tenni
  if (card.color === tableCard.color) return true;
  
  // Egyező tulajdonságú kártyákat is le lehet tenni
  if (card.property && tableCard.property && card.property === tableCard.property) return true;
  
  // Joker kártyát mindig le lehet tenni
  if (card.type === 'joker') return true;
  
  return false;
}

/**
 * A játék paklijának létrehozása és megkeverése a kiválasztott kártyakészletek alapján
 * @param {Array} selectedCardSets - A kiválasztott kártyakészletek azonosítói
 * @returns {Array} A megkevert pakli
 */
function createShuffledDeck(selectedCardSets) {
  // Ha nincs kiválasztott kártyakészlet, akkor az alapértelmezett optikai készletet használjuk
  if (!selectedCardSets || !Array.isArray(selectedCardSets) || selectedCardSets.length === 0) {
    selectedCardSets = ['optics'];
  }
  
  // Kombinált pakli létrehozása a cards.gs fájlban definiált funkcióval
  const cards = createCombinedDeck(selectedCardSets);
  return shuffleDeck(cards);
}

/**
 * Kártyapakli megkeverése
 */
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

/**
 * Optikai kártyapakli létrehozása
 */
function createDeck() {
  const deck = [];
  let id = 1;
  
  // Alapvető optikai fogalmak és példák - specifikus tananyag a 8. osztályosoknak
  
  // Fénytani alapfogalmak - kék kártyák
  deck.push({ id: id++, type: 'concept', color: 'blue', text: 'Fényforrás', description: 'Olyan test, amely fényt bocsát ki', property: 'light_source' });
  deck.push({ id: id++, type: 'concept', color: 'blue', text: 'Fényjelenség', description: 'A fény terjedésével kapcsolatos jelenség', property: 'light_phenomenon' });
  deck.push({ id: id++, type: 'concept', color: 'blue', text: 'Átlátszó közeg', description: 'A fény áthatol rajta, tisztán látunk át rajta', property: 'transparent' });
  deck.push({ id: id++, type: 'concept', color: 'blue', text: 'Átlátszatlan közeg', description: 'A fény nem hatol át rajta', property: 'opaque' });
  deck.push({ id: id++, type: 'concept', color: 'blue', text: 'Áttetsző közeg', description: 'A fény részben áthatol rajta, de nem látunk tisztán át rajta', property: 'translucent' });

  // Fényvisszaverődés - piros kártyák
  deck.push({ id: id++, type: 'law', color: 'red', text: 'Visszaverődési törvény', description: 'A beesési szög egyenlő a visszaverődési szöggel', property: 'reflection' });
  deck.push({ id: id++, type: 'law', color: 'red', text: 'Diffúz visszaverődés', description: 'Érdes felületről a fény minden irányba visszaverődik', property: 'reflection' });
  deck.push({ id: id++, type: 'law', color: 'red', text: 'Tükrös visszaverődés', description: 'Sima felületről a fény egy irányba verődik vissza', property: 'reflection' });
  deck.push({ id: id++, type: 'object', color: 'red', text: 'Síktükör', description: 'Sík felületű tükör, amely ugyanakkora és állított látszólagos képet hoz létre', property: 'mirror' });
  deck.push({ id: id++, type: 'object', color: 'red', text: 'Domború tükör', description: 'Kívülről fényes gömbfelület, amely kicsinyített állított képet hoz létre', property: 'mirror' });
  deck.push({ id: id++, type: 'object', color: 'red', text: 'Homorú tükör', description: 'Belülről fényes gömbfelület, gyújtópontja van', property: 'mirror' });

  // Fénytörés - zöld kártyák
  deck.push({ id: id++, type: 'law', color: 'green', text: 'Fénytörés törvénye', description: 'A fény sebessége megváltozik, amikor más közegbe lép', property: 'refraction' });
  deck.push({ id: id++, type: 'law', color: 'green', text: 'Teljes visszaverődés', description: 'Ha a beesési szög nagyobb a határszögnél, a fény visszaverődik', property: 'refraction' });
  deck.push({ id: id++, type: 'value', color: 'green', text: 'Törésmutatók', description: 'A közegek optikai sűrűségét jellemző szám', property: 'refraction' });
  deck.push({ id: id++, type: 'object', color: 'green', text: 'Gyűjtőlencse', description: 'Középen vastagabb lencse, összegyűjti a fénysugarakat', property: 'lens' });
  deck.push({ id: id++, type: 'object', color: 'green', text: 'Szórólencse', description: 'Szélén vastagabb lencse, szétszórja a fénysugarakat', property: 'lens' });
  
  // Optikai eszközök - sárga kártyák
  deck.push({ id: id++, type: 'device', color: 'yellow', text: 'Periszkóp', description: 'Két párhuzamos síktükörrel a takarás mögé láthatunk', property: 'optical_device' });
  deck.push({ id: id++, type: 'device', color: 'yellow', text: 'Távcső', description: 'Lencsék vagy tükrök rendszere távoli tárgyak megfigyelésére', property: 'optical_device' });
  deck.push({ id: id++, type: 'device', color: 'yellow', text: 'Mikroszkóp', description: 'Nagyon kicsi tárgyak felnagyítására szolgáló eszköz', property: 'optical_device' });
  deck.push({ id: id++, type: 'device', color: 'yellow', text: 'Fényképezőgép', description: 'A valóság megörökítésére szolgáló optikai eszköz', property: 'optical_device' });
  deck.push({ id: id++, type: 'device', color: 'yellow', text: 'Emberi szem', description: 'Természetes optikai rendszer, amely a retinán hoz létre képet', property: 'optical_device' });
  
  // Fénytani alkalmazások - lila kártyák
  deck.push({ id: id++, type: 'application', color: 'purple', text: 'Prizma', description: 'A fehér fényt színekre bontja', property: 'prism' });
  deck.push({ id: id++, type: 'application', color: 'purple', text: 'Szivárvány', description: 'Természetes spektrum, amely esőcseppeken megtörő fény révén jön létre', property: 'spectrum' });
  deck.push({ id: id++, type: 'application', color: 'purple', text: 'Délibáb', description: 'Fénytörési jelenség, amely a levegő hőmérséklet-különbsége miatt jön létre', property: 'mirage' });
  deck.push({ id: id++, type: 'application', color: 'purple', text: 'Száloptika', description: 'Fényvezetésre szolgáló vékony üvegszálak rendszere', property: 'fiber_optics' });
  deck.push({ id: id++, type: 'application', color: 'purple', text: 'Lézer', description: 'Koherens fénysugárzást előállító eszköz', property: 'laser' });
  
  // Példák - narancs kártyák
  deck.push({ id: id++, type: 'example', color: 'orange', text: 'Nap', description: 'Természetes fényforrás', property: 'light_source' });
  deck.push({ id: id++, type: 'example', color: 'orange', text: 'Izzólámpa', description: 'Mesterséges fényforrás', property: 'light_source' });
  deck.push({ id: id++, type: 'example', color: 'orange', text: 'Üveg', description: 'Átlátszó anyag, törésmutatója kb. 1,5', property: 'transparent' });
  deck.push({ id: id++, type: 'example', color: 'orange', text: 'Víz', description: 'Átlátszó folyadék, törésmutatója kb. 1,33', property: 'transparent' });
  deck.push({ id: id++, type: 'example', color: 'orange', text: 'Mattüveg', description: 'Áttetsző anyag', property: 'translucent' });
  
  // Speciális kártyák - fekete kártyák
  deck.push({ id: id++, type: 'joker', color: 'black', text: 'Fénysebesség', description: 'c = 300 000 km/s', property: 'special' });
  deck.push({ id: id++, type: 'joker', color: 'black', text: 'Einstein', description: 'A fénysebesség állandó minden vonatkoztatási rendszerben', property: 'special' });
  deck.push({ id: id++, type: 'joker', color: 'black', text: 'Newton', description: 'A fehér fény különböző színű összetevőkből áll', property: 'special' });
  deck.push({ id: id++, type: 'joker', color: 'black', text: 'Huygens', description: 'A fény hullámtermészetű', property: 'special' });
  deck.push({ id: id++, type: 'joker', color: 'black', text: 'Planck', description: 'A fény részecske természetű is', property: 'special' });
  
  return deck;
}
