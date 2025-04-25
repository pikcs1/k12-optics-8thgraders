/**
 * Adatbázis műveletek
 * A Google Táblázatok API segítségével kezelünk minden játékkal kapcsolatos adatot
 */

/**
 * Adatbázis (Google Táblázat) inicializálása
 */
function initializeDatabase() {
  try {
    // Globális változó ellenőrzése
    let spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
    
    if (!spreadsheetId || spreadsheetId === '') {
      // Ha még nincs táblázat létrehozva, létrehozunk egy újat
      Logger.log('Nincs táblázat azonosító, új táblázat létrehozása...');
      const ss = SpreadsheetApp.create('Optikai Kártyajáték Adatbázis');
      spreadsheetId = ss.getId();
      
      // Tároljuk az azonosítót a szkript tulajdonságokban
      PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', spreadsheetId);
      
      // Létrehozzuk a szükséges munkalapokat
      createSheets(ss);
      
      Logger.log('Új táblázat létrehozva: ' + spreadsheetId);
      return ss;
    } else {
      // Használjuk a meglévő táblázatot
      try {
        Logger.log('Meglévő táblázat megnyitása: ' + spreadsheetId);
        const ss = SpreadsheetApp.openById(spreadsheetId);
        
        // Ellenőrizzük, hogy megvannak-e a szükséges munkalapok
        let needsSheets = false;
        const sheetNames = ['játékok', 'játékosok', 'kártyák'];
        
        for (const name of sheetNames) {
          if (!ss.getSheetByName(name)) {
            needsSheets = true;
            Logger.log('Hiányzó munkalap: ' + name);
            break;
          }
        }
        
        // Ha hiányoznak a munkalapok, létrehozzuk őket
        if (needsSheets) {
          Logger.log('Hiányzó munkalapok létrehozása...');
          createSheets(ss);
        }
        
        return ss;
      } catch (e) {
        // Ha a táblázat már nem létezik, létrehozunk egy újat
        Logger.log('Táblázat nem található, új táblázat létrehozása...');
        const ss = SpreadsheetApp.create('Optikai Kártyajáték Adatbázis');
        const newSpreadsheetId = ss.getId();
        
        PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', newSpreadsheetId);
        
        createSheets(ss);
        
        Logger.log('Új táblázat létrehozva: ' + newSpreadsheetId);
        return ss;
      }
    }
  } catch (e) {
    Logger.log('Hiba az adatbázis inicializálása során: ' + e.toString());
    throw new Error('Adatbázis inicializálási hiba: ' + e.toString());
  }
}

/**
 * Munkalapok létrehozása
 */
function createSheets(ss) {
  try {
    // Létrehozzuk a szükséges munkalapokat és a változókat egyből tároljuk
    let gamesSheet = ss.insertSheet('játékok');
    let playersSheet = ss.insertSheet('játékosok');
    let cardsSheet = ss.insertSheet('kártyák');
    
    // Az alapértelmezett munkalapot átnevezzük biztonsági mentésnek
    const sheets = ss.getSheets();
    for (let i = 0; i < sheets.length; i++) {
      if (sheets[i].getName() === "Sheet1" || sheets[i].getName() === "Munkalap1") {
        sheets[i].setName("tartalék");
        break;
      }
    }
    
    // Biztonsági ellenőrzés: ha valamelyik lap null lenne, keressük meg újra
    if (!gamesSheet) gamesSheet = ss.getSheetByName('játékok');
    if (!playersSheet) playersSheet = ss.getSheetByName('játékosok');
    if (!cardsSheet) cardsSheet = ss.getSheetByName('kártyák');
    
    // Beállítjuk a fejléceket - extra ellenőrzéssel
    if (gamesSheet) {
      gamesSheet.appendRow(['játékId', 'állapot', 'aktuálisJátékos', 'nyertes', 'asztalLap', 'létrehozva']);
    } else {
      Logger.log('Nem sikerült létrehozni a játékok munkalapot');
    }
    
    if (playersSheet) {
      playersSheet.appendRow(['játékId', 'játékosId', 'játékosNév', 'készítő', 'kártyák']);
    } else {
      Logger.log('Nem sikerült létrehozni a játékosok munkalapot');
    }
    
    if (cardsSheet) {
      cardsSheet.appendRow(['játékId', 'pakli']);
    } else {
      Logger.log('Nem sikerült létrehozni a kártyák munkalapot');
    }
  } catch (e) {
    Logger.log('Hiba a munkalapok létrehozása során: ' + e.toString());
    throw e;
  }
}

/**
 * Játékszoba inicializálása
 * @param {string} gameId - A játékszoba azonosítója
 * @param {string} creatorName - A játékszoba készítőjének neve
 * @param {string} creatorId - A készítő játékos azonosítója
 * @param {Array} selectedCardSets - A kiválasztott kártyakészletek azonosítói
 * @returns {boolean} Sikeres inicializálás esetén true
 */
function initializeGameRoom(gameId, creatorName, creatorId, selectedCardSets) {
  try {
    const ss = initializeDatabase();
    
    // Játék létrehozása
    const gamesSheet = ss.getSheetByName('játékok');
    if (!gamesSheet) {
      throw new Error('A játékok munkalap nem található. Kérjük, ellenőrizze, hogy létezik-e.');
    }
    
    // A kiválasztott kártyakészletek mentése is JSON formátumban
    gamesSheet.appendRow([
      gameId,
      'waiting',  // állapot: várakozás, playing, ended
      '',         // aktuálisJátékos
      '',         // nyertes
      '',         // asztalLap
      new Date(), // létrehozva
      JSON.stringify(selectedCardSets || ['optics']) // kártyakészletek
    ]);
    
    // Játékos hozzáadása
    const playersSheet = ss.getSheetByName('játékosok');
    if (!playersSheet) {
      throw new Error('A játékosok munkalap nem található. Kérjük, ellenőrizze, hogy létezik-e.');
    }
    
    playersSheet.appendRow([
      gameId,
      creatorId,
      creatorName,
      true,       // készítő: true/false
      JSON.stringify([])  // kezdetben üres kártyahalmaz
    ]);
    
    // Pakli inicializálása
    const cardsSheet = ss.getSheetByName('kártyák');
    if (!cardsSheet) {
      throw new Error('A kártyák munkalap nem található. Kérjük, ellenőrizze, hogy létezik-e.');
    }
    
    // A kiválasztott kártyakészletek alapján hozzuk létre a paklit
    const deck = createShuffledDeck(selectedCardSets);
    cardsSheet.appendRow([
      gameId,
      JSON.stringify(deck)
    ]);
    
    return true;
  } catch (e) {
    Logger.log('Hiba a játékszoba inicializálása során: ' + e.toString());
    throw e;
  }
}

/**
 * Ellenőrzi, hogy létezik-e a játékszoba
 */
function roomExists(gameId) {
  const ss = initializeDatabase();
  const gamesSheet = ss.getSheetByName('játékok');
  const data = gamesSheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === gameId) {
      return true;
    }
  }
  
  return false;
}

/**
 * Játékosok számának lekérdezése
 */
function getPlayersCount(gameId) {
  const ss = initializeDatabase();
  const playersSheet = ss.getSheetByName('játékosok');
  const data = playersSheet.getDataRange().getValues();
  
  let count = 0;
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === gameId) {
      count++;
    }
  }
  
  return count;
}

/**
 * Játékos hozzáadása a szobához
 */
function addPlayerToRoom(gameId, playerName, playerId) {
  const ss = initializeDatabase();
  const playersSheet = ss.getSheetByName('játékosok');
  
  playersSheet.appendRow([
    gameId,
    playerId,
    playerName,
    false,      // nem a szoba készítője
    JSON.stringify([])  // kezdetben üres kártyahalmaz
  ]);
}

/**
 * Ellenőrzi, hogy a játékos a szoba készítője-e
 */
function isRoomCreator(gameId, playerId) {
  const ss = initializeDatabase();
  const playersSheet = ss.getSheetByName('játékosok');
  const data = playersSheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === gameId && data[i][1] === playerId) {
      return data[i][3] === true;
    }
  }
  
  return false;
}

/**
 * Az első játékos ID-jának lekérése
 */
function getFirstPlayerId(gameId) {
  const ss = initializeDatabase();
  const playersSheet = ss.getSheetByName('játékosok');
  const data = playersSheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === gameId) {
      return data[i][1];
    }
  }
  
  return null;
}

/**
 * Játék állapotának beállítása
 */
function setGameState(gameId, state) {
  const ss = initializeDatabase();
  const gamesSheet = ss.getSheetByName('játékok');
  const data = gamesSheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === gameId) {
      gamesSheet.getRange(i + 1, 2).setValue(state);
      break;
    }
  }
}

/**
 * Aktuális játékos beállítása
 */
function setCurrentPlayer(gameId, playerId) {
  const ss = initializeDatabase();
  const gamesSheet = ss.getSheetByName('játékok');
  const data = gamesSheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === gameId) {
      gamesSheet.getRange(i + 1, 3).setValue(playerId);
      break;
    }
  }
}

/**
 * Kártyák kiosztása a játékosoknak
 */
function dealCardsToPlayers(gameId) {
  const ss = initializeDatabase();
  const playersSheet = ss.getSheetByName('játékosok');
  const cardsSheet = ss.getSheetByName('kártyák');
  
  // Játékosok lekérése
  const playersData = playersSheet.getDataRange().getValues();
  const players = [];
  
  for (let i = 1; i < playersData.length; i++) {
    if (playersData[i][0] === gameId) {
      players.push({
        rowIndex: i + 1,
        playerId: playersData[i][1]
      });
    }
  }
  
  // Pakli lekérése
  const cardsData = cardsSheet.getDataRange().getValues();
  let deckRowIndex = -1;
  let deck = [];
  
  for (let i = 1; i < cardsData.length; i++) {
    if (cardsData[i][0] === gameId) {
      deckRowIndex = i + 1;
      deck = JSON.parse(cardsData[i][1]);
      break;
    }
  }
  
  if (deckRowIndex === -1 || players.length === 0) {
    throw new Error('Játék vagy játékosok nem találhatók');
  }
  
  // Minden játékosnak 5 kártyát osztunk
  const cardsPerPlayer = 5;
  
  players.forEach(player => {
    const playerCards = [];
    
    for (let i = 0; i < cardsPerPlayer; i++) {
      if (deck.length > 0) {
        playerCards.push(deck.pop());
      }
    }
    
    playersSheet.getRange(player.rowIndex, 5).setValue(JSON.stringify(playerCards));
  });
  
  // Egy kártyát az asztalra helyezünk
  let tableCard = null;
  if (deck.length > 0) {
    tableCard = deck.pop();
  }
  
  // Frissítjük a paklit és az asztal lapot
  cardsSheet.getRange(deckRowIndex, 2).setValue(JSON.stringify(deck));
  
  // Az asztal lap frissítése
  const gamesData = ss.getSheetByName('játékok').getDataRange().getValues();
  for (let i = 1; i < gamesData.length; i++) {
    if (gamesData[i][0] === gameId) {
      ss.getSheetByName('játékok').getRange(i + 1, 5).setValue(JSON.stringify(tableCard));
      break;
    }
  }
}

/**
 * Játékos kártyáinak lekérése
 */
function getPlayerCards(gameId, playerId) {
  const ss = initializeDatabase();
  const playersSheet = ss.getSheetByName('játékosok');
  const data = playersSheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === gameId && data[i][1] === playerId) {
      return JSON.parse(data[i][4]);
    }
  }
  
  return [];
}

/**
 * Az aktuális játékos lekérése
 */
function getCurrentPlayer(gameId) {
  const ss = initializeDatabase();
  const gamesSheet = ss.getSheetByName('játékok');
  const data = gamesSheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === gameId) {
      return data[i][2];
    }
  }
  
  return null;
}

/**
 * Játék állapotának lekérése
 */
function getGameStatus(gameId) {
  const ss = initializeDatabase();
  const gamesSheet = ss.getSheetByName('játékok');
  const data = gamesSheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === gameId) {
      return data[i][1];
    }
  }
  
  return null;
}

/**
 * Az asztalon lévő kártya lekérése
 */
function getTableCard(gameId) {
  const ss = initializeDatabase();
  const gamesSheet = ss.getSheetByName('játékok');
  const data = gamesSheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === gameId) {
      const tableCardStr = data[i][4];
      if (tableCardStr && tableCardStr !== '') {
        return JSON.parse(tableCardStr);
      }
      return null;
    }
  }
  
  return null;
}

/**
 * Játékosok listájának lekérése
 */
function getPlayers(gameId) {
  const ss = initializeDatabase();
  const playersSheet = ss.getSheetByName('játékosok');
  const data = playersSheet.getDataRange().getValues();
  
  const players = [];
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === gameId) {
      players.push({
        id: data[i][1],
        name: data[i][2],
        isCreator: data[i][3],
        cardsCount: JSON.parse(data[i][4]).length
      });
    }
  }
  
  return players;
}

/**
 * Kártya kijátszása
 */
function removeCardFromPlayer(gameId, playerId, cardId) {
  const ss = initializeDatabase();
  const playersSheet = ss.getSheetByName('játékosok');
  const data = playersSheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === gameId && data[i][1] === playerId) {
      const cards = JSON.parse(data[i][4]);
      const updatedCards = cards.filter(card => card.id !== cardId);
      playersSheet.getRange(i + 1, 5).setValue(JSON.stringify(updatedCards));
      break;
    }
  }
}

/**
 * Kártya az asztalra helyezése
 */
function setTableCard(gameId, card) {
  const ss = initializeDatabase();
  const gamesSheet = ss.getSheetByName('játékok');
  const data = gamesSheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === gameId) {
      gamesSheet.getRange(i + 1, 5).setValue(JSON.stringify(card));
      break;
    }
  }
}

/**
 * Győztes beállítása
 */
function setGameWinner(gameId, playerId) {
  const ss = initializeDatabase();
  const gamesSheet = ss.getSheetByName('játékok');
  const data = gamesSheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === gameId) {
      gamesSheet.getRange(i + 1, 4).setValue(playerId);
      break;
    }
  }
}

/**
 * Következő játékos beállítása
 */
function setNextPlayer(gameId) {
  const ss = initializeDatabase();
  const gamesSheet = ss.getSheetByName('játékok');
  const playersSheet = ss.getSheetByName('játékosok');
  
  // Jelenlegi játékos lekérése
  const gamesData = gamesSheet.getDataRange().getValues();
  let currentPlayerId = null;
  let gameRowIndex = -1;
  
  for (let i = 1; i < gamesData.length; i++) {
    if (gamesData[i][0] === gameId) {
      currentPlayerId = gamesData[i][2];
      gameRowIndex = i + 1;
      break;
    }
  }
  
  if (gameRowIndex === -1) return;
  
  // Játékosok lekérése
  const playersData = playersSheet.getDataRange().getValues();
  const players = [];
  
  for (let i = 1; i < playersData.length; i++) {
    if (playersData[i][0] === gameId) {
      players.push({
        id: playersData[i][1],
        name: playersData[i][2]
      });
    }
  }
  
  if (players.length === 0) return;
  
  // Következő játékos kiválasztása
  let nextPlayerIndex = 0;
  for (let i = 0; i < players.length; i++) {
    if (players[i].id === currentPlayerId) {
      nextPlayerIndex = (i + 1) % players.length;
      break;
    }
  }
  
  // Következő játékos beállítása
  gamesSheet.getRange(gameRowIndex, 3).setValue(players[nextPlayerIndex].id);
}

/**
 * Kártya húzása a pakliból
 */
function drawCardFromDeck(gameId) {
  const ss = initializeDatabase();
  const cardsSheet = ss.getSheetByName('kártyák');
  const data = cardsSheet.getDataRange().getValues();
  
  let deckRowIndex = -1;
  let deck = [];
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === gameId) {
      deckRowIndex = i + 1;
      deck = JSON.parse(data[i][1]);
      break;
    }
  }
  
  if (deckRowIndex === -1 || deck.length === 0) {
    return null;
  }
  
  const card = deck.pop();
  cardsSheet.getRange(deckRowIndex, 2).setValue(JSON.stringify(deck));
  
  return card;
}

/**
 * Kártya hozzáadása a játékoshoz
 */
function addCardToPlayer(gameId, playerId, card) {
  const ss = initializeDatabase();
  const playersSheet = ss.getSheetByName('játékosok');
  const data = playersSheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === gameId && data[i][1] === playerId) {
      const cards = JSON.parse(data[i][4]);
      cards.push(card);
      playersSheet.getRange(i + 1, 5).setValue(JSON.stringify(cards));
      break;
    }
  }
}

/**
 * Ellenőrzi, hogy a játékos létezik-e
 */
function playerExists(gameId, playerId) {
  const ss = initializeDatabase();
  const playersSheet = ss.getSheetByName('játékosok');
  const data = playersSheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === gameId && data[i][1] === playerId) {
      return true;
    }
  }
  
  return false;
}

/**
 * Játékos eltávolítása a szobából
 */
function removePlayerFromRoom(gameId, playerId) {
  const ss = initializeDatabase();
  const playersSheet = ss.getSheetByName('játékosok');
  const data = playersSheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === gameId && data[i][1] === playerId) {
      playersSheet.deleteRow(i + 1);
      break;
    }
  }
}

/**
 * Játékszoba törlése
 */
function deleteGameRoom(gameId) {
  const ss = initializeDatabase();
  const gamesSheet = ss.getSheetByName('játékok');
  const cardsSheet = ss.getSheetByName('kártyák');
  
  // Játék törlése
  const gamesData = gamesSheet.getDataRange().getValues();
  for (let i = 1; i < gamesData.length; i++) {
    if (gamesData[i][0] === gameId) {
      gamesSheet.deleteRow(i + 1);
      break;
    }
  }
  
  // Pakli törlése
  const cardsData = cardsSheet.getDataRange().getValues();
  for (let i = 1; i < cardsData.length; i++) {
    if (cardsData[i][0] === gameId) {
      cardsSheet.deleteRow(i + 1);
      break;
    }
  }
}

/**
 * Új szobakészítő kijelölése
 */
function assignNewRoomCreator(gameId) {
  const ss = initializeDatabase();
  const playersSheet = ss.getSheetByName('játékosok');
  const data = playersSheet.getDataRange().getValues();
  
  let newCreatorRowIndex = -1;
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === gameId) {
      newCreatorRowIndex = i + 1;
      break;
    }
  }
  
  if (newCreatorRowIndex !== -1) {
    playersSheet.getRange(newCreatorRowIndex, 4).setValue(true);
  }
}

/**
 * Játék adatainak lekérése
 */
function fetchGameData(gameId) {
  const ss = initializeDatabase();
  const gamesSheet = ss.getSheetByName('játékok');
  const data = gamesSheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === gameId) {
      return {
        gameId: data[i][0],
        state: data[i][1],
        currentPlayer: data[i][2],
        winner: data[i][3],
        tableCard: data[i][4] ? JSON.parse(data[i][4]) : null,
        created: data[i][5]
      };
    }
  }
  
  return null;
}
