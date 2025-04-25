/**
 * Kártyák adatai és kezelése
 * Az optikai kártyajáték kártyáinak definíciói és a hozzájuk kapcsolódó funkciók
 */

/**
 * Elérhető kártyapaklik
 */
const CARD_DECKS = {
  optics: {
    id: 'optics',
    name: 'Optika',
    description: '8. osztályos optika alapfogalmak',
    createFunction: createOpticsDeck
  },
  electricity: {
    id: 'electricity',
    name: 'Elektromosság',
    description: '8. osztályos elektromosság alapfogalmak',
    createFunction: letrehozElektromossagPakli
  },
  motion: {
    id: 'motion',
    name: 'Mozgás és mechanika',
    description: '7. osztályos mozgás és mechanika alapfogalmak',
    createFunction: letrehozMozgasPakli
  },
  thermal: {
    id: 'thermal',
    name: 'Hőtan és anyagszerkezet',
    description: '7. osztályos hőtan és anyagszerkezet alapfogalmak',
    createFunction: letrehozHotanPakli
  },
  internet: {
    id: 'internet',
    name: 'Internet és közösségi média',
    description: '5-8. osztályos internet biztonság és közösségi média alapok',
    createFunction: letrehozInternetPakli
  },
  math: {
    id: 'math',
    name: 'Matematika',
    description: '5-8. osztályos matematikai fogalmak és műveletek',
    createFunction: letrehozMatematikaPakli
  }
};

/**
 * Kártyapaklik kombinálása a kiválasztott opciók alapján
 * @param {Array} selectedDeckIds A kiválasztott paklik azonosítói
 * @returns {Array} A kombinált kártyapakli
 */
function createCombinedDeck(selectedDeckIds) {
  let combinedCards = [];
  
  // Ha nincs kiválasztott pakli, akkor az alapértelmezett optikai paklit használjuk
  if (!selectedDeckIds || selectedDeckIds.length === 0) {
    selectedDeckIds = ['optics'];
  }
  
  // Ellenőrizzük, hogy vannak-e érvényes paklik a kiválasztottak között
  let hasValidDeck = false;
  
  // Paklik kombinálása
  for (const deckId of selectedDeckIds) {
    if (CARD_DECKS[deckId] && typeof CARD_DECKS[deckId].createFunction === 'function') {
      const deckCards = CARD_DECKS[deckId].createFunction();
      combinedCards = combinedCards.concat(deckCards);
      hasValidDeck = true;
    }
  }
  
  // Ha egyetlen érvényes pakli sincs, használjuk az alapértelmezett optikai paklit
  if (!hasValidDeck) {
    // Alapértelmezett pakli használata
    const defaultDeckCards = CARD_DECKS['optics'].createFunction();
    combinedCards = combinedCards.concat(defaultDeckCards);
    console.log('Nem találtunk érvényes paklit, az alapértelmezett optikai paklit használjuk.');
  }
  
  // Kártyapakli megkeverése
  combinedCards = shuffleArray(combinedCards);
  
  return combinedCards;
}

/**
 * Optikai kártyapakli létrehozása
 * @returns {Array} Az optikai kártyapakli
 */
function createOpticsDeck() {
  const cards = [];
  let cardId = 1;
  
  // Fogalom kártyák (kék)
  cards.push({
    id: (cardId++).toString(),
    text: 'Fény',
    description: 'Elektromágneses sugárzás, amely látható a szem számára.',
    property: 'alapfogalom',
    type: 'concept',
    color: 'blue'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Fényforrás',
    description: 'Olyan tárgy, amely fényt bocsát ki.',
    property: 'alapfogalom',
    type: 'concept',
    color: 'blue'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Fénysebesség',
    description: 'A fény sebessége vákuumban kb. 300 000 km/s.',
    property: 'alapfogalom',
    type: 'concept',
    color: 'blue'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Átlátszó közeg',
    description: 'Olyan anyag, amelyen a fény áthalad és látható képet ad.',
    property: 'alapfogalom',
    type: 'concept',
    color: 'blue'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Átlátszatlan közeg',
    description: 'Olyan anyag, amely nem engedi át a fényt.',
    property: 'alapfogalom',
    type: 'concept',
    color: 'blue'
  });
  
  // Törvény kártyák (piros)
  cards.push({
    id: (cardId++).toString(),
    text: 'Fényvisszaverődés törvénye',
    description: 'A beesési szög egyenlő a visszaverődési szöggel.',
    property: 'törvény',
    type: 'law',
    color: 'red'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Fénytörés törvénye',
    description: 'A beesési szög szinuszának és a törési szög szinuszának aránya állandó.',
    property: 'törvény',
    type: 'law',
    color: 'red'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Teljes visszaverődés',
    description: 'A fény nem lép ki az optikailag sűrűbb közegből, ha a beesési szög nagyobb a határszögnél.',
    property: 'törvény',
    type: 'law',
    color: 'red'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Színfelbontás',
    description: 'A fehér fény felbontása összetevőire, a szivárvány színeire.',
    property: 'törvény',
    type: 'law',
    color: 'red'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Fényelnyelés',
    description: 'Az anyagok a fény bizonyos összetevőit elnyelik, másokat visszaverik.',
    property: 'törvény',
    type: 'law',
    color: 'red'
  });
  
  // Tárgy kártyák (zöld)
  cards.push({
    id: (cardId++).toString(),
    text: 'Síktükör',
    description: 'Sík felületű tükör, amely ugyanakkora, de fordított állású látszólagos képet hoz létre.',
    property: 'tükör',
    type: 'object',
    color: 'green'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Homorú tükör',
    description: 'Befelé görbülő tükör, amely nagyított képet adhat.',
    property: 'tükör',
    type: 'object',
    color: 'green'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Domború tükör',
    description: 'Kifelé görbülő tükör, amely kicsinyített képet ad és nagyobb látószöget biztosít.',
    property: 'tükör',
    type: 'object',
    color: 'green'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Gyűjtőlencse',
    description: 'Középen vastagabb lencse, amely a párhuzamos fénysugarakat egy pontban gyűjti össze.',
    property: 'lencse',
    type: 'object',
    color: 'green'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Szórólencse',
    description: 'Szélein vastagabb lencse, amely a párhuzamos fénysugarakat szétszórja.',
    property: 'lencse',
    type: 'object',
    color: 'green'
  });
  
  // Eszköz kártyák (sárga)
  cards.push({
    id: (cardId++).toString(),
    text: 'Mikroszkóp',
    description: 'Kis tárgyak nagyított képének megfigyelésére szolgáló optikai eszköz.',
    property: 'eszköz',
    type: 'device',
    color: 'yellow'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Távcső',
    description: 'Távoli tárgyak megfigyelésére szolgáló optikai eszköz.',
    property: 'eszköz',
    type: 'device',
    color: 'yellow'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Szemüveg',
    description: 'Látáshibák korrigálására szolgáló optikai eszköz.',
    property: 'eszköz',
    type: 'device',
    color: 'yellow'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Fényképezőgép',
    description: 'A valóság képeinek rögzítésére szolgáló optikai eszköz.',
    property: 'eszköz',
    type: 'device',
    color: 'yellow'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Vetítő',
    description: 'Kis méretű képek kinagyítására és kivetítésére szolgáló optikai eszköz.',
    property: 'eszköz',
    type: 'device',
    color: 'yellow'
  });
  
  // Alkalmazás kártyák (lila)
  cards.push({
    id: (cardId++).toString(),
    text: 'Emberi szem',
    description: 'A látás szerve, amely a fényt érzékeli és képet alkot a környezetről.',
    property: 'alkalmazás',
    type: 'application',
    color: 'purple'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Látáshibák',
    description: 'A szem fókuszálási problémái, mint a rövidlátás, távollátás és asztigmatizmus.',
    property: 'alkalmazás',
    type: 'application',
    color: 'purple'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Lézer',
    description: 'Koherens, egyszínű fénysugarat kibocsátó eszköz.',
    property: 'alkalmazás',
    type: 'application',
    color: 'purple'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Optikai kábel',
    description: 'A teljes visszaverődés elvén működő, adattovábbításra használt eszköz.',
    property: 'alkalmazás',
    type: 'application',
    color: 'purple'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Hologram',
    description: 'Háromdimenziós kép létrehozására szolgáló fényképészeti technika.',
    property: 'alkalmazás',
    type: 'application',
    color: 'purple'
  });
  
  // Példa kártyák (narancs)
  cards.push({
    id: (cardId++).toString(),
    text: 'Szivárvány',
    description: 'Természetes jelenség, amikor az esőcseppek felbontják a napfényt színeire.',
    property: 'példa',
    type: 'example',
    color: 'orange'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Délibáb',
    description: 'Optikai jelenség, amikor a levegő fénytörése virtuális képet hoz létre.',
    property: 'példa',
    type: 'example',
    color: 'orange'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Tükröződés vízen',
    description: 'A vízfelszín visszaveri a fényt, és a tárgyak tükörképét mutatja.',
    property: 'példa',
    type: 'example',
    color: 'orange'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Napfelkelte/naplemente',
    description: 'A légkör fénytörése miatt a Nap látszólag a valódi helyzete fölött van.',
    property: 'példa',
    type: 'example',
    color: 'orange'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Színkeverés',
    description: 'Különböző színű fények keverése új színárnyalatokat eredményez.',
    property: 'példa',
    type: 'example',
    color: 'orange'
  });
  
  // Joker kártyák (fekete)
  cards.push({
    id: (cardId++).toString(),
    text: 'Newton',
    description: 'Isaac Newton fedezte fel, hogy a fehér fény színekre bontható.',
    property: 'joker',
    type: 'joker',
    color: 'black'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Einstein',
    description: 'Albert Einstein megmagyarázta a fény kettős természetét (hullám és részecske).',
    property: 'joker',
    type: 'joker',
    color: 'black'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Prizma',
    description: 'Háromoldalú optikai eszköz, amely felbontja a fehér fényt a szivárvány színeire.',
    property: 'joker',
    type: 'joker',
    color: 'black'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Fényév',
    description: 'Az a távolság, amelyet a fény egy év alatt tesz meg (kb. 9,46 billió km).',
    property: 'joker',
    type: 'joker',
    color: 'black'
  });
  
  cards.push({
    id: (cardId++).toString(),
    text: 'Spektroszkóp',
    description: 'A fény spektrális összetételének vizsgálatára szolgáló eszköz.',
    property: 'joker',
    type: 'joker',
    color: 'black'
  });
  
  return cards;
}

/**
 * Tömb elemeinek véletlenszerű keverése (Fisher-Yates algoritmus)
 * @param {Array} array A keverendő tömb
 * @returns {Array} A megkevert tömb
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Kártyatípusok meghatározása
 */
const CARD_TYPES = {
  concept: {
    name: 'Fogalom',
    description: 'Optikai alapfogalmakat tartalmazó kártyák'
  },
  law: {
    name: 'Törvény',
    description: 'Optikai törvények és szabályok'
  },
  object: {
    name: 'Tárgy',
    description: 'Optikai tárgyak és eszközök'
  },
  device: {
    name: 'Eszköz',
    description: 'Komplex optikai eszközök'
  },
  application: {
    name: 'Alkalmazás',
    description: 'Fénytani alkalmazások'
  },
  example: {
    name: 'Példa',
    description: 'Konkrét példák optikai jelenségekre'
  },
  value: {
    name: 'Érték',
    description: 'Fontos optikai értékek és mértékek'
  },
  joker: {
    name: 'Joker',
    description: 'Speciális kártyák, amelyek bármikor kijátszhatók'
  }
};

/**
 * Kártyaszínek meghatározása
 */
const CARD_COLORS = {
  blue: {
    name: 'Kék',
    description: 'Fénytani alapfogalmak'
  },
  red: {
    name: 'Piros',
    description: 'Fényvisszaverődés'
  },
  green: {
    name: 'Zöld',
    description: 'Fénytörés'
  },
  yellow: {
    name: 'Sárga',
    description: 'Optikai eszközök'
  },
  purple: {
    name: 'Lila',
    description: 'Fénytani alkalmazások'
  },
  orange: {
    name: 'Narancs',
    description: 'Példák'
  },
  black: {
    name: 'Fekete',
    description: 'Speciális kártyák'
  }
};

/**
 * Kártyafeltételek ellenőrzése
 */
function checkCardConditions(card1, card2) {
  const conditions = [];
  
  if (card1.type === card2.type) {
    conditions.push(`Mindkét kártya típusa: ${CARD_TYPES[card1.type].name}`);
  }
  
  if (card1.color === card2.color) {
    conditions.push(`Mindkét kártya színe: ${CARD_COLORS[card1.color].name}`);
  }
  
  if (card1.property && card2.property && card1.property === card2.property) {
    conditions.push(`Mindkét kártya tulajdonsága: ${card1.property}`);
  }
  
  if (card1.type === 'joker' || card2.type === 'joker') {
    conditions.push('Joker kártya játszható bármikor');
  }
  
  return conditions;
}

/**
 * Kártya részletes adatainak lekérése
 */
function getCardDetails(card) {
  if (!card) return null;
  
  const typeInfo = CARD_TYPES[card.type] || { name: 'Ismeretlen', description: '' };
  const colorInfo = CARD_COLORS[card.color] || { name: 'Ismeretlen', description: '' };
  
  return {
    id: card.id,
    text: card.text,
    description: card.description,
    property: card.property,
    type: card.type,
    typeName: typeInfo.name,
    typeDescription: typeInfo.description,
    color: card.color,
    colorName: colorInfo.name,
    colorDescription: colorInfo.description
  };
}

/**
 * Kártyatípus nevének lekérése
 */
function getCardTypeName(type) {
  return CARD_TYPES[type] ? CARD_TYPES[type].name : 'Ismeretlen';
}

/**
 * Kártyaszín nevének lekérése
 */
function getCardColorName(color) {
  return CARD_COLORS[color] ? CARD_COLORS[color].name : 'Ismeretlen';
}

/**
 * Kártya CSS stílusának meghatározása
 */
function getCardStyle(card) {
  if (!card) return {};
  
  const styles = {
    blue: { backgroundColor: '#E3F2FD', borderColor: '#2196F3', color: '#0D47A1' },
    red: { backgroundColor: '#FFEBEE', borderColor: '#F44336', color: '#B71C1C' },
    green: { backgroundColor: '#E8F5E9', borderColor: '#4CAF50', color: '#1B5E20' },
    yellow: { backgroundColor: '#FFFDE7', borderColor: '#FFEB3B', color: '#F57F17' },
    purple: { backgroundColor: '#F3E5F5', borderColor: '#9C27B0', color: '#4A148C' },
    orange: { backgroundColor: '#FFF3E0', borderColor: '#FF9800', color: '#E65100' },
    black: { backgroundColor: '#EEEEEE', borderColor: '#212121', color: '#212121' }
  };
  
  return styles[card.color] || { backgroundColor: '#FFFFFF', borderColor: '#000000', color: '#000000' };
}

/**
 * Kártya ikon meghatározása
 */
function getCardIcon(card) {
  if (!card) return '';
  
  const icons = {
    concept: '💭',
    law: '⚖️',
    object: '🔍',
    device: '📱',
    application: '💡',
    example: '✨',
    value: '📊',
    joker: '🃏'
  };
  
  return icons[card.type] || '❓';
}
