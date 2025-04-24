/**
 * Optikai Kártyajáték - Fizika 8. osztályosoknak
 * Főbb funkcionalitások:
 * - Webes alkalmazás, amely Google Apps Script segítségével fut
 * - Akár 10 játékos egyidejű játéka
 * - Játékszobák létrehozása és csatlakozás
 * - Magyar nyelvű oktatási tartalom az optika alapjairól
 */

// Globális változók
const SPREADSHEET_ID = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID') || '';

/**
 * Webes alkalmazás indítása
 */
function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Optikai Kártyajáték')
    .setFaviconUrl('https://www.gstatic.com/images/branding/product/1x/apps_script_48dp.png')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * HTML tartalom betöltése
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Játékszoba létrehozása
 */
function createGameRoom(playerName) {
  const gameId = generateGameId();
  const playerId = generatePlayerId();
  
  try {
    initializeGameRoom(gameId, playerName, playerId);
    return {
      success: true,
      gameId: gameId,
      playerId: playerId,
      playerName: playerName,
      isCreator: true
    };
  } catch (e) {
    console.error('Hiba a játékszoba létrehozásakor:', e);
    return {
      success: false,
      error: 'Hiba a játékszoba létrehozásakor: ' + e.toString()
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
    
    return {
      success: true,
      gameState: gameState,
      players: players,
      currentPlayerId: currentPlayerId,
      playerCards: playerCards,
      tableCard: tableCard,
      isMyTurn: currentPlayerId === playerId
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
      
      return {
        success: true,
        gameEnded: true,
        winner: playerId
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
