/**
 * Google Apps Script API Mock
 * Ez a fájl a Google Apps Script API-t szimulálja a helyi fejlesztés és tesztelés céljából.
 * Valódi Google Apps Script környezetben ez a fájl nem szükséges.
 */

// Google Apps Script API Mock
window.google = window.google || {};
google.script = google.script || {};

// Run funkció mock implementáció
google.script.run = (function() {
  const handlers = {};
  
  // Alap objektum
  const runObject = {
    // Sikeres lefutás esetén hívódik meg
    withSuccessHandler: function(callback) {
      handlers.success = callback;
      return this;
    },
    
    // Hiba esetén hívódik meg
    withFailureHandler: function(callback) {
      handlers.failure = callback;
      return this;
    }
  };
  
  // Játékszoba létrehozása
  runObject.createGameRoom = function(playerName) {
    console.log('Mock: createGameRoom called with', playerName);
    
    // Sikeres válasz szimulálása késleltetéssel
    setTimeout(() => {
      if (handlers.success) {
        handlers.success({
          success: true,
          gameId: 'MOCK' + Math.floor(Math.random() * 1000),
          playerId: 'player_' + Math.floor(Math.random() * 1000),
          playerName: playerName,
          isCreator: true
        });
      }
    }, 500);
  };
  
  // Csatlakozás játékszobához
  runObject.joinGameRoom = function(gameId, playerName) {
    console.log('Mock: joinGameRoom called with', gameId, playerName);
    
    // Sikeres válasz szimulálása késleltetéssel
    setTimeout(() => {
      // Ha a játékszoba azonosító nem kezdődik MOCK-kal, akkor hibát szimulálunk
      if (gameId.startsWith('MOCK')) {
        if (handlers.success) {
          handlers.success({
            success: true,
            gameId: gameId,
            playerId: 'player_' + Math.floor(Math.random() * 1000),
            playerName: playerName,
            isCreator: false
          });
        }
      } else {
        if (handlers.failure) {
          handlers.failure('A megadott játékszoba nem létezik!');
        }
      }
    }, 500);
  };
  
  // Játék indítása
  runObject.startGame = function(gameId, playerId) {
    console.log('Mock: startGame called with', gameId, playerId);
    
    // Sikeres válasz szimulálása késleltetéssel
    setTimeout(() => {
      if (handlers.success) {
        handlers.success({
          success: true
        });
      }
    }, 500);
  };
  
  // Játék állapot lekérése
  runObject.getGameState = function(gameId, playerId) {
    console.log('Mock: getGameState called with', gameId, playerId);
    
    // Játék állapot szimulálása
    const mockPlayers = [
      {
        id: playerId,
        name: 'Te',
        isCreator: true,
        cardsCount: 5
      },
      {
        id: 'player_bot1',
        name: 'Játékos 1',
        isCreator: false,
        cardsCount: 5
      },
      {
        id: 'player_bot2',
        name: 'Játékos 2',
        isCreator: false,
        cardsCount: 5
      }
    ];
    
    // A játék állapotától függően más-más adatokat küldünk vissza
    setTimeout(() => {
      if (handlers.success) {
        handlers.success({
          success: true,
          gameState: 'playing',
          players: mockPlayers,
          currentPlayerId: playerId,
          playerCards: getMockCards(),
          tableCard: getMockTableCard(),
          isMyTurn: true
        });
      }
    }, 500);
  };
  
  // Kártya húzása
  runObject.drawCard = function(gameId, playerId) {
    console.log('Mock: drawCard called with', gameId, playerId);
    
    // Sikeres válasz szimulálása késleltetéssel
    setTimeout(() => {
      if (handlers.success) {
        handlers.success({
          success: true,
          drawnCard: getMockCard()
        });
      }
    }, 500);
  };
  
  // Kártya kijátszása
  runObject.playCard = function(gameId, playerId, cardId) {
    console.log('Mock: playCard called with', gameId, playerId, cardId);
    
    // Sikeres válasz szimulálása késleltetéssel
    setTimeout(() => {
      if (handlers.success) {
        handlers.success({
          success: true,
          playedCard: {
            id: cardId,
            text: 'Játszott kártya',
            description: 'Ez egy kijátszott kártya',
            type: 'concept',
            color: 'blue'
          }
        });
      }
    }, 500);
  };
  
  return runObject;
})();

// Segédfüggvények a mock adatok generálásához

// Mock kártyák generálása
function getMockCards() {
  const cards = [];
  
  cards.push({
    id: 1,
    text: 'Fényforrás',
    description: 'Olyan test, amely fényt bocsát ki',
    property: 'light_source',
    type: 'concept',
    color: 'blue'
  });
  
  cards.push({
    id: 2,
    text: 'Visszaverődési törvény',
    description: 'A beesési szög egyenlő a visszaverődési szöggel',
    property: 'reflection',
    type: 'law',
    color: 'red'
  });
  
  cards.push({
    id: 3,
    text: 'Gyűjtőlencse',
    description: 'Középen vastagabb lencse, összegyűjti a fénysugarakat',
    property: 'lens',
    type: 'object',
    color: 'green'
  });
  
  cards.push({
    id: 4,
    text: 'Mikroszkóp',
    description: 'Nagyon kicsi tárgyak felnagyítására szolgáló eszköz',
    property: 'optical_device',
    type: 'device',
    color: 'yellow'
  });
  
  cards.push({
    id: 5,
    text: 'Einstein',
    description: 'A fénysebesség állandó minden vonatkoztatási rendszerben',
    property: 'special',
    type: 'joker',
    color: 'black'
  });
  
  return cards;
}

// Mock asztal kártya generálása
function getMockTableCard() {
  return {
    id: 100,
    text: 'Prizma',
    description: 'A fehér fényt színekre bontja',
    property: 'prism',
    type: 'application',
    color: 'purple'
  };
}

// Mock kártya generálása
function getMockCard() {
  return {
    id: Math.floor(Math.random() * 1000),
    text: 'Izzólámpa',
    description: 'Mesterséges fényforrás',
    property: 'light_source',
    type: 'example',
    color: 'orange'
  };
}