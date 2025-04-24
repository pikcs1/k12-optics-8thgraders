/**
 * Kártyák adatai és kezelése
 * Az optikai kártyajáték kártyáinak definíciói és a hozzájuk kapcsolódó funkciók
 */

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
