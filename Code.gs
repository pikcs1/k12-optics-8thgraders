/**
 * Optikai Kártyajáték - Fizika 8. osztályosoknak
 * Főbb funkcionalitások:
 * - Webes alkalmazás, amely Google Apps Script segítségével fut
 * - Akár 10 játékos egyidejű játéka
 * - Játékszobák létrehozása és csatlakozás
 * - Magyar nyelvű oktatási tartalom az optika alapjairól
 * 
 * Version: 1.1.0
 * Last Updated: 2025-04-24
 */

// Globális változók - Csak egyszer futnak le, amikor a szkriptet betöltik
let SPREADSHEET_ID;

// Inicializáljuk a globális változókat
function initGlobals() {
  try {
    SPREADSHEET_ID = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID') || '';
    Logger.log('SPREADSHEET_ID értéke: ' + SPREADSHEET_ID);
    return true;
  } catch (e) {
    Logger.log('Hiba a globális változók inicializálásakor: ' + e.toString());
    return false;
  }
}

// Inicializáljuk a globális változókat
initGlobals();

/**
 * Webes alkalmazás indítása
 */
function doGet() {
  try {
    // Ellenőrizzük, hogy a globális változók inicializálva vannak-e
    if (!SPREADSHEET_ID) {
      initGlobals();
    }
    
    // Ellenőrizzük, hogy az adatbázis inicializálva van-e
    try {
      initializeDatabase();  // Csak ellenőrzés céljából futtatjuk
      Logger.log('Adatbázis inicializálás sikeres');
    } catch (dbError) {
      Logger.log('Adatbázis inicializálási hiba a doGet-ben: ' + dbError.toString());
      // Folytatjuk, mert ez nem akadályozza meg a felhasználói felület betöltését
    }
    
    return HtmlService.createTemplateFromFile('index')
      .evaluate()
      .setTitle('Optikai Kártyajáték')
      .setFaviconUrl('https://www.gstatic.com/images/branding/product/1x/apps_script_48dp.png')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } catch (e) {
    Logger.log('Hiba a doGet függvényben: ' + e.toString());
    
    // Hiba esetén is megjelenítünk egy minimális felületet
    return HtmlService.createHtmlOutput(
      '<html><body>' +
      '<h1>Hiba történt az alkalmazás betöltésekor</h1>' +
      '<p>Kérjük, próbálja újra később, vagy vegye fel a kapcsolatot a rendszergazdával.</p>' +
      '<p>Hibakód: ' + e.toString() + '</p>' +
      '</body></html>'
    )
    .setTitle('Optikai Kártyajáték - Hiba')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  }
}

/**
 * HTML tartalom betöltése
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Játékszoba létrehozása
 * @param {string} playerName - A játékos neve
 * @param {Array} selectedCardSets - A kiválasztott kártyakészletek azonosítói
 * @returns {Object} A létrehozott játékszoba adatai
 */
function createGameRoom(playerName, selectedCardSets) {
  try {
    // Ellenőrizzük, hogy a globális változók inicializálva vannak-e
    if (!SPREADSHEET_ID) {
      initGlobals();
    }
    
    // Ellenőrizzük a bemenő adatokat
    if (!playerName || playerName.trim() === '') {
      return {
        success: false,
        error: 'A játékosnév megadása kötelező!'
      };
    }
    
    // Ha nincs megadva kártyakészlet, használjuk az alapértelmezett optikai készletet
    if (!selectedCardSets || !Array.isArray(selectedCardSets) || selectedCardSets.length === 0) {
      selectedCardSets = ['optics'];
    }
    
    // Generáljuk az ID-kat
    const gameId = generateGameId();
    const playerId = generatePlayerId();
    
    // Próbáljuk meg létrehozni a játékszobát
    try {
      const result = initializeGameRoom(gameId, playerName, playerId);
      Logger.log('Játékszoba sikeresen létrehozva: ' + gameId);
      
      return {
        success: true,
        gameId: gameId,
        playerId: playerId,
        playerName: playerName,
        isCreator: true
      };
    } catch (e) {
      Logger.log('Hiba a játékszoba létrehozásakor: ' + e.toString());
      
      // Próbáljuk meg újra létrehozni az adatbázist, ha hibát kapunk
      try {
        // Inicializáljuk újra az adatbázist
        const ss = initializeDatabase();
        
        // Még egyszer próbáljuk meg létrehozni a játékszobát
        initializeGameRoom(gameId, playerName, playerId);
        
        Logger.log('Játékszoba sikeresen létrehozva a második próbálkozásra: ' + gameId);
        return {
          success: true,
          gameId: gameId,
          playerId: playerId,
          playerName: playerName,
          isCreator: true
        };
      } catch (retryError) {
        Logger.log('Hiba a játékszoba létrehozásakor a második próbálkozásra: ' + retryError.toString());
        return {
          success: false,
          error: 'Nem sikerült létrehozni a játékszobát. Kérjük, próbálja újra később! Hiba: ' + retryError.toString()
        };
      }
    }
  } catch (e) {
    Logger.log('Kritikus hiba a játékszoba létrehozásakor: ' + e.toString());
    return {
      success: false,
      error: 'Kritikus hiba a játékszoba létrehozásakor: ' + e.toString()
    };
  }
}

/**
 * Csatlakozás játékszobához
 */
function joinGameRoom(gameId, playerName) {
  try {
    if (!roomExists(gameId)) {
      return {
        success: false,
        error: 'A megadott játékszoba nem létezik!'
      };
    }
    
    const playersCount = getPlayersCount(gameId);
    if (playersCount >= 10) {
      return {
        success: false,
        error: 'A játékszoba megtelt (maximum 10 játékos)!'
      };
    }
    
    const playerId = generatePlayerId();
    addPlayerToRoom(gameId, playerName, playerId);
    
    return {
      success: true,
      gameId: gameId,
      playerId: playerId,
      playerName: playerName,
      isCreator: false
    };
  } catch (e) {
    console.error('Hiba a játékszobához csatlakozáskor:', e);
    return {
      success: false,
      error: 'Hiba a játékszobához csatlakozáskor: ' + e.toString()
    };
  }
}

/**
 * Játék indítása
 */
function startGame(gameId, playerId) {
  try {
    if (!isRoomCreator(gameId, playerId)) {
      return {
        success: false,
        error: 'Csak a szoba készítője indíthatja el a játékot!'
      };
    }
    
    const playersCount = getPlayersCount(gameId);
    if (playersCount < 2) {
      return {
        success: false,
        error: 'A játék indításához legalább 2 játékos szükséges!'
      };
    }
    
    dealCardsToPlayers(gameId);
    setGameState(gameId, 'playing');
    setCurrentPlayer(gameId, getFirstPlayerId(gameId));
    
    return {
      success: true
    };
  } catch (e) {
    console.error('Hiba a játék indításakor:', e);
    return {
      success: false,
      error: 'Hiba a játék indításakor: ' + e.toString()
    };
  }
}

/**
 * Játék állapotának lekérdezése
 */
function getGameState(gameId, playerId) {
  try {
    if (!playerExists(gameId, playerId)) {
      return {
        success: false,
        error: 'Érvénytelen játékos!'
      };
    }
    
    const gameData = fetchGameData(gameId);
    if (!gameData) {
      return {
        success: false,
        error: 'A játék nem található!'
      };
    }
    
    const playerCards = getPlayerCards(gameId, playerId);
    const players = getPlayers(gameId);
    const currentPlayerId = getCurrentPlayer(gameId);
    const gameState = getGameStatus(gameId);
    const tableCard = getTableCard(gameId);
    
    // Ha a játék véget ért, akkor a nyertes nevét is elküldjük
    let winnerName = null;
    if (gameState === 'ended') {
      const winner = gameData.winner;
      
      // Próbáljuk megtalálni a nyertes nevét
      try {
        // Először keressük a játékosok között
        const winnerPlayer = players.find(p => p.id === winner);
        if (winnerPlayer) {
          winnerName = winnerPlayer.name;
        } 
        // Ha nem találjuk meg a jelenlegi játékosok között, próbáljuk más módon
        else {
          // Lehet, hogy a nyertes már kilépett, ezért külön is ellenőrizzük
          const ss = initializeDatabase();
          if (ss) {
            const playersSheet = ss.getSheetByName('játékosok');
            if (playersSheet) {
              const data = playersSheet.getDataRange().getValues();
              for (let i = 1; i < data.length; i++) {
                // Ha megtaláljuk a nyertes játékost (lehet, hogy más játékban van már)
                if (data[i][1] === winner) {
                  winnerName = data[i][2]; // játékos neve
                  break;
                }
              }
            }
          }
        }
      } catch (nameError) {
        Logger.log('Hiba a nyertes nevének lekérésekor: ' + nameError.toString());
      }
    }
    
    return {
      success: true,
      gameState: gameState,
      players: players,
      currentPlayerId: currentPlayerId,
      playerCards: playerCards,
      tableCard: tableCard,
      isMyTurn: currentPlayerId === playerId,
      winner: gameData.winner,
      winnerName: winnerName
    };
  } catch (e) {
    console.error('Hiba a játék állapotának lekérdezésekor:', e);
    return {
      success: false,
      error: 'Hiba a játék állapotának lekérdezésekor: ' + e.toString()
    };
  }
}

/**
 * Kártya kijátszása
 */
function playCard(gameId, playerId, cardId) {
  try {
    if (!playerExists(gameId, playerId)) {
      return {
        success: false,
        error: 'Érvénytelen játékos!'
      };
    }
    
    const currentPlayerId = getCurrentPlayer(gameId);
    if (currentPlayerId !== playerId) {
      return {
        success: false,
        error: 'Nem a te köröd van!'
      };
    }
    
    // Ellenőrizzük, hogy a játékos rendelkezik-e a kártyával
    const playerCards = getPlayerCards(gameId, playerId);
    if (!playerCards.some(card => card.id === cardId)) {
      return {
        success: false,
        error: 'Nincs ilyen kártyád!'
      };
    }
    
    // Ellenőrizzük, hogy a kártya kijátszható-e
    const tableCard = getTableCard(gameId);
    const playedCard = playerCards.find(card => card.id === cardId);
    
    if (tableCard && !canPlayCard(playedCard, tableCard)) {
      return {
        success: false,
        error: 'Ezt a kártyát nem játszhatod ki! Válassz másikat, vagy húzz!'
      };
    }
    
    // Kártya kijátszása
    removeCardFromPlayer(gameId, playerId, cardId);
    setTableCard(gameId, playedCard);
    
    // Ellenőrizzük, hogy a játékos nyert-e
    const remainingCards = getPlayerCards(gameId, playerId);
    if (remainingCards.length === 0) {
      setGameWinner(gameId, playerId);
      setGameState(gameId, 'ended');
      
      // A nyertes nevének lekérése
      let winnerName = playerName;
      
      try {
        const players = getPlayers(gameId);
        const winnerPlayer = players.find(player => player.id === playerId);
        if (winnerPlayer) {
          winnerName = winnerPlayer.name;
        }
      } catch (nameError) {
        Logger.log('Hiba a nyertes nevének lekérésekor: ' + nameError.toString());
      }
      
      return {
        success: true,
        gameEnded: true,
        winner: playerId,
        winnerName: winnerName
      };
    }
    
    // Következő játékos beállítása
    setNextPlayer(gameId);
    
    return {
      success: true,
      playedCard: playedCard
    };
  } catch (e) {
    console.error('Hiba a kártya kijátszásakor:', e);
    return {
      success: false,
      error: 'Hiba a kártya kijátszásakor: ' + e.toString()
    };
  }
}

/**
 * Kártya húzása
 */
function drawCard(gameId, playerId) {
  try {
    if (!playerExists(gameId, playerId)) {
      return {
        success: false,
        error: 'Érvénytelen játékos!'
      };
    }
    
    const currentPlayerId = getCurrentPlayer(gameId);
    if (currentPlayerId !== playerId) {
      return {
        success: false,
        error: 'Nem a te köröd van!'
      };
    }
    
    const card = drawCardFromDeck(gameId);
    if (!card) {
      return {
        success: false,
        error: 'A pakli elfogyott!'
      };
    }
    
    addCardToPlayer(gameId, playerId, card);
    setNextPlayer(gameId);
    
    return {
      success: true,
      drawnCard: card
    };
  } catch (e) {
    console.error('Hiba a kártya húzásakor:', e);
    return {
      success: false,
      error: 'Hiba a kártya húzásakor: ' + e.toString()
    };
  }
}

/**
 * Játék elhagyása
 */
function leaveGame(gameId, playerId) {
  try {
    if (!playerExists(gameId, playerId)) {
      return {
        success: false,
        error: 'Érvénytelen játékos!'
      };
    }
    
    removePlayerFromRoom(gameId, playerId);
    
    // Ha már nincs játékos, töröljük a szobát
    const playersCount = getPlayersCount(gameId);
    if (playersCount === 0) {
      deleteGameRoom(gameId);
    } else if (isRoomCreator(gameId, playerId)) {
      // Ha a szoba készítője távozott, új készítőt választunk
      assignNewRoomCreator(gameId);
    }
    
    return {
      success: true
    };
  } catch (e) {
    console.error('Hiba a játék elhagyásakor:', e);
    return {
      success: false,
      error: 'Hiba a játék elhagyásakor: ' + e.toString()
    };
  }
}

/**
 * Véletlenszerű játékazonosító generálása
 */
function generateGameId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * Véletlenszerű játékosazonosító generálása
 */
function generatePlayerId() {
  return Utilities.getUuid();
}

/**
 * Ellenőrzi, hogy a játékos létezik-e a játékszobában
 */
function playerExists(gameId, playerId) {
  try {
    const ss = initializeDatabase();
    const playersSheet = ss.getSheetByName('játékosok');
    
    if (!playersSheet) {
      Logger.log('A játékosok munkalap nem található');
      return false;
    }
    
    const data = playersSheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === gameId && data[i][1] === playerId) {
        return true;
      }
    }
    
    return false;
  } catch (e) {
    Logger.log('Hiba a játékos létezésének ellenőrzésekor: ' + e.toString());
    return false;
  }
}

/**
 * Játék adatainak lekérése
 */
function fetchGameData(gameId) {
  try {
    const ss = initializeDatabase();
    const gamesSheet = ss.getSheetByName('játékok');
    
    if (!gamesSheet) {
      Logger.log('A játékok munkalap nem található');
      return null;
    }
    
    const data = gamesSheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === gameId) {
        return {
          gameId: data[i][0],
          state: data[i][1],
          currentPlayer: data[i][2],
          winner: data[i][3],
          tableCard: data[i][4],
          createdAt: data[i][5]
        };
      }
    }
    
    return null;
  } catch (e) {
    Logger.log('Hiba a játék adatainak lekérésekor: ' + e.toString());
    return null;
  }
}

/**
 * Pakliból kártya húzása
 */
function drawCardFromDeck(gameId) {
  try {
    const ss = initializeDatabase();
    const cardsSheet = ss.getSheetByName('kártyák');
    
    if (!cardsSheet) {
      Logger.log('A kártyák munkalap nem található');
      return null;
    }
    
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
  } catch (e) {
    Logger.log('Hiba a pakliból húzáskor: ' + e.toString());
    return null;
  }
}

/**
 * Kártya hozzáadása a játékoshoz
 */
function addCardToPlayer(gameId, playerId, card) {
  try {
    const ss = initializeDatabase();
    const playersSheet = ss.getSheetByName('játékosok');
    
    if (!playersSheet) {
      Logger.log('A játékosok munkalap nem található');
      return false;
    }
    
    const data = playersSheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === gameId && data[i][1] === playerId) {
        const cards = JSON.parse(data[i][4]);
        cards.push(card);
        playersSheet.getRange(i + 1, 5).setValue(JSON.stringify(cards));
        return true;
      }
    }
    
    return false;
  } catch (e) {
    Logger.log('Hiba a kártya játékoshoz adásakor: ' + e.toString());
    return false;
  }
}

/**
 * Játékos eltávolítása a szobából
 */
function removePlayerFromRoom(gameId, playerId) {
  try {
    const ss = initializeDatabase();
    const playersSheet = ss.getSheetByName('játékosok');
    
    if (!playersSheet) {
      Logger.log('A játékosok munkalap nem található');
      return false;
    }
    
    const data = playersSheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === gameId && data[i][1] === playerId) {
        playersSheet.deleteRow(i + 1);
        return true;
      }
    }
    
    return false;
  } catch (e) {
    Logger.log('Hiba a játékos eltávolításakor: ' + e.toString());
    return false;
  }
}

/**
 * Új szobakészítő kijelölése
 */
function assignNewRoomCreator(gameId) {
  try {
    const ss = initializeDatabase();
    const playersSheet = ss.getSheetByName('játékosok');
    
    if (!playersSheet) {
      Logger.log('A játékosok munkalap nem található');
      return false;
    }
    
    const data = playersSheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === gameId) {
        playersSheet.getRange(i + 1, 4).setValue(true);
        return true;
      }
    }
    
    return false;
  } catch (e) {
    Logger.log('Hiba az új szobakészítő kijelölésekor: ' + e.toString());
    return false;
  }
}

/**
 * Játékszoba törlése
 */
function deleteGameRoom(gameId) {
  try {
    const ss = initializeDatabase();
    
    // Játék törlése
    const gamesSheet = ss.getSheetByName('játékok');
    if (gamesSheet) {
      const gamesData = gamesSheet.getDataRange().getValues();
      for (let i = 1; i < gamesData.length; i++) {
        if (gamesData[i][0] === gameId) {
          gamesSheet.deleteRow(i + 1);
          break;
        }
      }
    }
    
    // Kártyák törlése
    const cardsSheet = ss.getSheetByName('kártyák');
    if (cardsSheet) {
      const cardsData = cardsSheet.getDataRange().getValues();
      for (let i = 1; i < cardsData.length; i++) {
        if (cardsData[i][0] === gameId) {
          cardsSheet.deleteRow(i + 1);
          break;
        }
      }
    }
    
    return true;
  } catch (e) {
    Logger.log('Hiba a játékszoba törlésekor: ' + e.toString());
    return false;
  }
}
