/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/coreapp/apputil.js":
/*!***********************************!*\
  !*** ./src/js/coreapp/apputil.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppUtil": () => (/* binding */ AppUtil)
/* harmony export */ });
/* harmony import */ var _config_config_APPTARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config/config-APPTARGET.js */ "./src/js/coreapp/config/config-dev.js");


class AppUtil {
    constructor() {
        this._log = _config_config_APPTARGET_js__WEBPACK_IMPORTED_MODULE_0__.EnvConfig.env === "dev";
    }
    
    Log(entry) {
        if (this._log && entry)
            console.log(entry);
    }
}

/***/ }),

/***/ "./src/js/coreapp/config/config-dev.js":
/*!*********************************************!*\
  !*** ./src/js/coreapp/config/config-dev.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppFirebaseConfig": () => (/* binding */ AppFirebaseConfig),
/* harmony export */   "EnvConfig": () => (/* binding */ EnvConfig)
/* harmony export */ });
const AppFirebaseConfig = {
    apiKey: "AIzaSyBitkDr3o8hJBh-lm5tZntwmKhTWiSPEpk",
    authDomain: "mein-sweeper-d5995.firebaseapp.com",
    projectId: "mein-sweeper-d5995",
    storageBucket: "mein-sweeper-d5995.appspot.com",
    messagingSenderId: "703933725685",
    appId: "1:703933725685:web:2eebce5b1d7a16efba7ebc"
};

const EnvConfig = {
    env: "dev"
};

/***/ }),

/***/ "./src/js/coreapp/googleauthhandler.js":
/*!*********************************************!*\
  !*** ./src/js/coreapp/googleauthhandler.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GoogleAuthHandler": () => (/* binding */ GoogleAuthHandler)
/* harmony export */ });
/* harmony import */ var _config_config_APPTARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config/config-APPTARGET.js */ "./src/js/coreapp/config/config-dev.js");


class GoogleAuthHandler {
  constructor(onSignIn, onSignOut) {
    this.onSignIn = onSignIn;
    this.onSignOut = onSignOut;

    // Initialize Firebase, config defined elsewhere
    firebase.initializeApp(_config_config_APPTARGET_js__WEBPACK_IMPORTED_MODULE_0__.AppFirebaseConfig);
    
    // use only goog
    this.g_provider = new firebase.auth.GoogleAuthProvider();
    this.g_provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    this.g_provider.setCustomParameters({
      'login_hint': 'user@example.com'
    }); 

    // set a handler for when tokens are recieved
    firebase.auth().onAuthStateChanged(user=>{
        if (user) {
            this.FireOnSignInHandler(user);
        } else {
          // this can fire when there is no logged in user on load
            this.FireOnSignOutHandler();
        }
    });
  }

  // methods
  FireOnSignInHandler(oAuthUser) {
    if (this.onSignIn) {
      this.onSignIn(oAuthUser);
    }
  }

  FireOnSignOutHandler() {
    if (this.onSignOut) {
      this.onSignOut();
    }
  }

  SignInPopup() {
    firebase.auth().signInWithPopup(this.g_provider);
  }

  SignInRedirect() {
    firebase.auth().signInWithRedirect(this.g_provider);
  }

  SignOut() {
    firebase.auth().signOut();
  }
}



/***/ }),

/***/ "./src/js/coreapp/navigation.js":
/*!**************************************!*\
  !*** ./src/js/coreapp/navigation.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Navigation": () => (/* binding */ Navigation)
/* harmony export */ });
/* harmony import */ var _googleauthhandler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./googleauthhandler.js */ "./src/js/coreapp/googleauthhandler.js");


class Navigation {
    constructor($) {
        this.loginUI = $("#login-ui-container");
        let that = this;

        // bind log in
        $("#login-prompt").on('click', function(e) {     
            that.auth.SignInRedirect();
        });

        $("#login-profile").on('click', function(e) {     
            that.auth.SignOut();
        });

        this._onSignIn = function(oAuthUser) {
            that.loginUI
                .find("#login-prompt")
                .toggleClass('d-none')
                .end()
                .find("#login-profile")
                .find('img')
                .prop('src', oAuthUser.photoURL)
                .prop('alt', 'logged in as ' + oAuthUser.displayName)
                .end()
                .toggleClass('d-none')
                .end()
                .attr('data-signed-in', 'true');
        };

        this._onSignOut = function() {
            if (that.loginUI.attr('data-signed-in') == 'false')
                return;
    
            that.loginUI
                .find("#login-profile")
                .find('img')
                .prop('src', '')
                .prop('alt', '')
                .end()
                .toggleClass('d-none')
                .end()
                .find("#login-prompt")
                .toggleClass('d-none')
                .end()
                .attr('data-signed-in', 'false');
        };

        this.auth = new _googleauthhandler_js__WEBPACK_IMPORTED_MODULE_0__.GoogleAuthHandler(this._onSignIn, this._onSignOut);
    }
}

/***/ }),

/***/ "./src/js/minesweeper/minesweeperapp.js":
/*!**********************************************!*\
  !*** ./src/js/minesweeper/minesweeperapp.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Minesweeper": () => (/* binding */ Minesweeper)
/* harmony export */ });
/* harmony import */ var _coreapp_apputil_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../coreapp/apputil.js */ "./src/js/coreapp/apputil.js");
/* harmony import */ var _minesweeperconstants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./minesweeperconstants.js */ "./src/js/minesweeper/minesweeperconstants.js");
/* harmony import */ var _minesweepergamestate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./minesweepergamestate.js */ "./src/js/minesweeper/minesweepergamestate.js");
/* harmony import */ var _minesweepergrid_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./minesweepergrid.js */ "./src/js/minesweeper/minesweepergrid.js");





class Minesweeper {
    constructor($, rootContainerSelector) {
        this.optionsSelector = '#game-options';
        this.newGameSelector = '#generate-game';
        this.winSelector = '#win-game';
        this.loseSelector = '#lose-game';
        this.gridSelector = '#grid';
        this.rootContainerSelector = rootContainerSelector;

        this.template = `
            <div class='app-container container-sm'>
                <div class='control-container row'>
                <div class='col-12 col-sm-4 p-1 p-sm-3 g-sm-2'>
                    <select id='game-options' class='form-select'></select>
                </div>
                <div class='col-12 col-sm-8 p-1 p-sm-3 g-sm-2'>
                    <input type="button" id='generate-game' value='new game' class='btn btn-outline-primary'></input>
                    <div class='btn-group'>
                        <input type="button" id='win-game' value='auto win' class='btn btn-outline-secondary'></input>
                        <input type="button" id='lose-game' value='auto lose' class='btn btn-outline-secondary'></input>
                    </div>
                </div>
            </div>
            <div class='grid-container row'>
                <div id='grid' class='grid col-12 user-select-none py-4 px-0'></div>
            </div>
        `;
    }
        
    // methods
    InitControls() {
        $(this.rootContainerSelector).html(this.template);
        
        let $select = $(this.optionsSelector);

        for(let key in _minesweeperconstants_js__WEBPACK_IMPORTED_MODULE_1__.MINESWEEPER_GRID_SIZES)
        {
            $select.append($('<option>', { 
                value: key,
                text : `${key} (${_minesweeperconstants_js__WEBPACK_IMPORTED_MODULE_1__.MINESWEEPER_GRID_SIZES[key].width}x${_minesweeperconstants_js__WEBPACK_IMPORTED_MODULE_1__.MINESWEEPER_GRID_SIZES[key].height}, ${_minesweeperconstants_js__WEBPACK_IMPORTED_MODULE_1__.MINESWEEPER_GRID_SIZES[key].mines} mines)` 
            }));
        }

        // bind game generation handlers
        let that = this;
        $(this.newGameSelector).on('click', function(e) {       
            that.GenerateNewGame();
        });
    }

    GenerateNewGame() {
        let util = new _coreapp_apputil_js__WEBPACK_IMPORTED_MODULE_0__.AppUtil();
        let $select = $(this.optionsSelector);
        let selected = $select.find("option:selected").val();
        let size = _minesweeperconstants_js__WEBPACK_IMPORTED_MODULE_1__.MINESWEEPER_GRID_SIZES[selected];
        
        util.Log(`generate new ${size.width}x${size.height} game`);  

        // create new game state
        let gameState = new _minesweepergamestate_js__WEBPACK_IMPORTED_MODULE_2__.MinesweeperGameState(size, util);

        $(this.winSelector).off('click').on('click', function(e) {       
            gameState.TriggerAutoWin();
        });

        $(this.loseSelector).off('click').on('click', function(e) {       
            gameState.TriggerAutoLose();
        });

        // create new ui
        new _minesweepergrid_js__WEBPACK_IMPORTED_MODULE_3__.MinesweeperGameGrid($(this.gridSelector), gameState, util).Start();
    }

    Start() {
        this.InitControls();
    }
}

/***/ }),

/***/ "./src/js/minesweeper/minesweeperconstants.js":
/*!****************************************************!*\
  !*** ./src/js/minesweeper/minesweeperconstants.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MINESWEEPER_GRID_SIZES": () => (/* binding */ MINESWEEPER_GRID_SIZES),
/* harmony export */   "MINESWEEPER_GAME_COMPLETION_STATES": () => (/* binding */ MINESWEEPER_GAME_COMPLETION_STATES)
/* harmony export */ });
const MINESWEEPER_GRID_SIZES = {
    beginner : { width: 9, height: 9, mines: 10, label: "beginner"},
    intermediate: { width: 16, height: 16, mines: 40, label: "intermediate"},
    expert: { width: 16, height: 26, mines: 86, label: "expert"},
};

const MINESWEEPER_GAME_COMPLETION_STATES = {
    started: 0,
    completed: 1,
    failed: 2
};


/***/ }),

/***/ "./src/js/minesweeper/minesweepergamecell.js":
/*!***************************************************!*\
  !*** ./src/js/minesweeper/minesweepergamecell.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MinesweeperGameCell": () => (/* binding */ MinesweeperGameCell)
/* harmony export */ });
class MinesweeperGameCell {
    constructor(i, j, game) {
        this._id = `${i + "_" + j}`;
        this._adjacentMineCount = 0;
        this._isMine = false;
        this._isLosingMine = false;
        this._isRevealed = false;
        this._isMarked = false;
        this._game = game;
        this.i = i;
        this.j = j;
    }

    // getters
    get Id() {
        return this._id;
    }
    get AdjacentMineCount() {
        return this._adjacentMineCount;
    }
    get IsMine() {
        return this._isMine;
    }
    get IsLosingMine() {
        return this._isLosingMine;
    }
    get IsRevealed() {
        return this._isRevealed;
    } 
    get IsMarked() {
        return this._isMarked;
    } 
    get rowIndex() {
        return this.i;
    }
    get colIndex() {
        return this.j;
    }
    
    // methods
    IncrementAdjacentMineCount() {
        if (this._game.GameIsPlayable)
            this._adjacentMineCount++;
    }
    SetIsMine() {
        if (this._game.GameIsPlayable)
            this._isMine = true;
    }
    SetIsLosingMine() {
        if (this._game.GameIsPlayable)
            this._isLosingMine = true;
    }
    SetIsRevealed() {
        if (this._game.GameIsPlayable) {
            this._isRevealed = true;

            // no need for it to be marked any more
            this._isMarked = false;
        }
    }  
    SetIsMarked() {
        if (this._game.GameIsPlayable) 
            this._isMarked = true;
    } 
}

/***/ }),

/***/ "./src/js/minesweeper/minesweepergamestate.js":
/*!****************************************************!*\
  !*** ./src/js/minesweeper/minesweepergamestate.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MinesweeperGameState": () => (/* binding */ MinesweeperGameState)
/* harmony export */ });
/* harmony import */ var _minesweepergamecell_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./minesweepergamecell.js */ "./src/js/minesweeper/minesweepergamecell.js");
/* harmony import */ var _minesweeperconstants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./minesweeperconstants.js */ "./src/js/minesweeper/minesweeperconstants.js");



class MinesweeperGameState {
    constructor(size, logutil) {
        // state
        this._lookup = {};
        this._id = Math.floor(Date.now() / 1000);
        this._cells = []; 
        this._mineCells = [];
        this._size = size; 
        this._gameCompletionState = _minesweeperconstants_js__WEBPACK_IMPORTED_MODULE_1__.MINESWEEPER_GAME_COMPLETION_STATES.started;
        this._util = logutil;

        // track cleared cells vs total cells needed to win
        this._totalCellCountToWin = size.width*size.height - size.mines;
        this._currentCellCount = 0;

        // for diabling the game
        this._gameDisabled = false;

        // callback funcs
        this._onCellStateChange = undefined;
        this._onGameCompletionStateChange = undefined;
 
        // init, starting with cells with generic values
        for(let i = 0; i < this._size.height; i++) {
            let row = [];

            for(let j = 0; j < this._size.width; j++) {
                let newCell = new _minesweepergamecell_js__WEBPACK_IMPORTED_MODULE_0__.MinesweeperGameCell(i, j, this);
                let newCellId = newCell.Id;
                this._lookup[newCellId] = newCell;
                row.push(newCell);               
            }

            this._cells.push(row);
        }

        // sprinkle mines
        let mines = _.sampleSize(_.range(0, this._size.width*this._size.height - 1), this._size.mines);

        for (let k = 0; k < mines.length; k++) {
            let rowIndex = _.floor(mines[k]/this._size.width);
            let colIndex = mines[k] % this._size.width;
            let mineCell = this._lookup[`${rowIndex + "_" + colIndex}`];

            mineCell.SetIsMine();
            this._mineCells.push(mineCell);               
        }

        // update adjacent mine count by iterating all mines
        for (let k = 0; k < mines.length; k++) {
            let rowIndex = _.floor(mines[k]/this._size.width);
            let colIndex = mines[k] % this._size.width;

            let otherCoords = this.GenerateAdjacentCells(rowIndex, colIndex);

            // foreach adjacent, if it isnt also a mine, increment its adjacent mine count
            for (let j = 0; j < otherCoords.length; j++) {
                let adjacentCell = this._lookup[`${otherCoords[j].y + "_" + otherCoords[j].x}`];

                if (!adjacentCell.IsMine)
                    adjacentCell.IncrementAdjacentMineCount();
            }
        }

        this._util.Log(`new game generated`);
    }

    // getters
    get GameIsPlayable() {
        return !this._gameDisabled;
    }

    get GameIsWon() {
        return this._gameCompletionState == _minesweeperconstants_js__WEBPACK_IMPORTED_MODULE_1__.MINESWEEPER_GAME_COMPLETION_STATES.completed;
    }

    get Size() {
        return this._size;
    }

    get Id() {
        return this._id;
    }

    set GameCompletionState(gameCompletionState) {
        this._gameCompletionState = gameCompletionState;
    }

    set OnCellStateChange(fn) {
        this._onCellStateChange = fn;
    }

    set GameDisabled(disabled) {
        this._gameDisabled = disabled;
    }

    set OnGameCompletionStateChange(fn) {
        this._onGameCompletionStateChange = fn;
    }

    GenerateAdjacentCells(rowIndex, colIndex) {
        // generate 8 adjacent co-ords, clamped to in-bounds
        let otherCoords = [];

        if (rowIndex - 1 >= 0) {
            if (colIndex - 1 >= 0) {
                otherCoords.push({x: colIndex-1, y:rowIndex-1});
            }

            otherCoords.push({x: colIndex, y:rowIndex-1});

            if (colIndex + 1 < this._size.width)
                otherCoords.push({x: colIndex+1, y:rowIndex-1});
        }
        
        if (colIndex - 1 >= 0) 
            otherCoords.push({x: colIndex-1, y:rowIndex});

        if (colIndex + 1 < this._size.width)
            otherCoords.push({x: colIndex+1, y:rowIndex});

        if (rowIndex + 1 < this._size.height) {
            if (colIndex - 1 >= 0) 
                otherCoords.push({x: colIndex-1, y:rowIndex+1});

            otherCoords.push({x: colIndex, y:rowIndex+1});

            if (colIndex + 1 < this._size.width)
                otherCoords.push({x: colIndex+1, y:rowIndex+1});
        }

        return otherCoords;
    }

    CellById(cellId) {
        let cell = this._lookup[cellId];

        if (cell === undefined)
            throw `cell with id ${cellId} could not be found`;

        return cell;
    }

    RevealAllMines () {
        let that = this;
        _.forEach(this._mineCells, function(cell) {
            if (!cell.IsRevealed)
                cell.SetIsRevealed();
                that.FireCellStateChange(cell);
        });
    }

    AttemptAutoFill(cell) {
        let autoFills = this.GetAdjacentNonMineNonRevealedCells(cell);
        let that = this;

        _.forEach(autoFills, function(c) {
            that.SelectCell(c);
        });
    }

    GetAdjacentNonMineNonRevealedCells(cell) {
        let that = this;
        let adjCellIndices = this.GenerateAdjacentCells(cell.rowIndex, cell.colIndex);
        let adjCells = [];
        _.forEach(adjCellIndices, function(c) {
            let adjacentCell = that.CellById(`${c.y + "_" + c.x}`);

            if (!adjacentCell.IsMine && !adjacentCell.IsRevealed)
                adjCells.push(adjacentCell);
        });

        return adjCells;
    }

    FireCellStateChange (changedCell) {
        if (this._onCellStateChange)
            this._onCellStateChange(changedCell);
    }

    FireGameCompletionStateChange() {
        if (this._onGameCompletionStateChange)
            this._onGameCompletionStateChange(this._gameCompletionState);
    }

    MarkCell(cell) {
        this._util.Log(`mark cell id ${cell.Id}`);

        if (!this.GameIsPlayable) {
            // don't do anything
            return;
        }

        if (!cell.IsRevealed) {

            cell.SetIsMarked();

            // trigger it to re-render
            this.FireCellStateChange(cell);
        }
    }

    MarkCellbyId(cellId) {
        let cell = this.CellById(cellId);       

        this.MarkCell(cell);
    }
    
    SelectCell(cell) {
        this._util.Log(`select cell id ${cell.Id}`);

        if (!this.GameIsPlayable) {
            // don't do anything
            this._util.Log(`game has already been ${this._gameCompletionState == _minesweeperconstants_js__WEBPACK_IMPORTED_MODULE_1__.MINESWEEPER_GAME_COMPLETION_STATES.completed ? "won!" : "lost!"}`);
            return;
        }

        if (!cell.IsRevealed) {
            // reveal this cell
            cell.SetIsRevealed();

            // trigger it to re-render
            this.FireCellStateChange(cell);

            if (cell.IsMine) {
                // oh ohh, lost

                // mark this mine as the one hit
                cell.SetIsLosingMine();
                this.GameCompletionState = _minesweeperconstants_js__WEBPACK_IMPORTED_MODULE_1__.MINESWEEPER_GAME_COMPLETION_STATES.failed;
                this.RevealAllMines();
                this.GameDisabled = true;
                this._util.Log(`player has lost!`);
                this.FireGameCompletionStateChange();

                return;
            }   
            else {
                // yay, you cleared one
                this._currentCellCount++;

                // check if player has won
                if (this._currentCellCount == this._totalCellCountToWin) {
                    // yay
                    this.GameCompletionState = _minesweeperconstants_js__WEBPACK_IMPORTED_MODULE_1__.MINESWEEPER_GAME_COMPLETION_STATES.completed;
                    this.RevealAllMines();                
                    this.GameDisabled = true;
                    this._util.Log(`player has won!`);
                    this.FireGameCompletionStateChange();
                    return;
                }
            } 
            
            // otherwise, cell is not a mine, player has not yet won, so attempt to autofill if the cell is blank
            if (cell.AdjacentMineCount == 0) 
            {
               this.AttemptAutoFill(cell);
            }
        }
    }

    SelectCellById(cellId) {
        let cell = this.CellById(cellId);       

        this.SelectCell(cell);
    }

    TriggerAutoWin() {
        if (!this.GameIsPlayable)
            return;

        let allCells = _.flatten(this._cells);
        let that = this;
        _.forEach(allCells, function(c) {
            if (!c.IsMine)
                that.SelectCell(c);
        });
    }

    TriggerAutoLose() {
        if (!this.GameIsPlayable)
            return;
            
        this.SelectCell(this._mineCells[0]);
    }
}


/***/ }),

/***/ "./src/js/minesweeper/minesweepergrid.js":
/*!***********************************************!*\
  !*** ./src/js/minesweeper/minesweepergrid.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MinesweeperGameGrid": () => (/* binding */ MinesweeperGameGrid)
/* harmony export */ });
/* harmony import */ var _minesweeperconstants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./minesweeperconstants.js */ "./src/js/minesweeper/minesweeperconstants.js");


class MinesweeperGameGrid {
    constructor($rootElement, gameState, logUtil) {
        this.$rootElement = $rootElement;
        this.gameState = gameState;  
        this.logUtil = logUtil;
    } 

    // methods

    GetCellClass(cell) {
        if (!cell.IsRevealed) 
        {
            if (cell.IsMarked)
                return "hidden marked";

            return "hidden";
        }

        if (cell.IsMine) {
            return cell.IsLosingMine ? "mine triggered" : "mine ";
        }
        
        if (cell.AdjacentMineCount > 0) 
            return `open-${cell.AdjacentMineCount}`;
        
        return "clear";
    }

    GetCellContent(cell) {
        let cellGlyph = cell.IsRevealed ? 
        (cell.IsMine ? 
            "💣" : 
                (cell.AdjacentMineCount > 0 ? cell.AdjacentMineCount : "")
        ) 
        : "";

        return `<div class='cell-inner'>${cellGlyph}</div>`;
    }

    GetInitialCellHtml(cellId) {
        let cell = this.gameState.CellById(cellId);

        let cellClass = this.GetCellClass(cell);
        let cellContent = this.GetCellContent(cell);

        return `<td class='cell ${cellClass}' id='${cellId}'>${cellContent}</td>`;
    }

    RemoveHandlers() {
        this.$rootElement.find('table')
            .off('contextmenu')
            .off('click');
    }

    AddHandlers() {
        let that = this;

        // add suppress context menu
        this.$rootElement.find('table').on('contextmenu', 'td.cell', function (e) {
            if (e.which == 3) {
                // right mouse
                that.gameState.MarkCellbyId(e.currentTarget.id);
                return false;
            }
        });

        // add select handller
        this.$rootElement.find('table').on('click', 'td.cell', function(e) {
            if(e.which == 1)
            {
                // left-mouse
                that.gameState.SelectCellById(e.currentTarget.id);
                return;
            }
        });
    }

    Start() {
        // remove any existing handlers
        this.RemoveHandlers();

        let stack = [];

        // template html cell content
        for(let i = 0; i < this.gameState.Size.height; i++) {
            let rowHtml = "<tr>";
            for(let j = 0; j < this.gameState.Size.width; j++) {             
                rowHtml += this.GetInitialCellHtml( i + "_" + j);
            }
            rowHtml += "</tr>";
            stack.push(rowHtml);
        }

        // render
        this.$rootElement.html(`<table class='${this.gameState.Size.label}'><tbody>${stack.join("")}</tbody></table>`); 

        let that = this;
        // add cell state change callback for rendering individual cells
        this.gameState.OnCellStateChange = function(cell) {
            // re-render the cell
            that.logUtil.Log(`render cell ${cell.Id} in game with id ${that.gameState.Id}`);
            
            let cellClass = that.GetCellClass(cell);
            let cellContent = that.GetCellContent(cell);
            
            $(`#${cell.Id}`)
                .removeClass()
                .addClass(`cell ${cellClass}`) 
                .html(cellContent);
        };

        // game completion state handler
        this.gameState.OnGameCompletionStateChange = function(gameCompletionState) {
            if (gameCompletionState == _minesweeperconstants_js__WEBPACK_IMPORTED_MODULE_0__.MINESWEEPER_GAME_COMPLETION_STATES.completed)
                that.$rootElement.append("<div class='end-state'><img src='./img/win.gif'></img></div>");
            
            if (gameCompletionState == _minesweeperconstants_js__WEBPACK_IMPORTED_MODULE_0__.MINESWEEPER_GAME_COMPLETION_STATES.failed)
                that.$rootElement.append("<div class='end-state'><img src='./img/lose.gif'></img></div>");
        };

        // bind handlers
        this.AddHandlers();
    }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./src/js/coreapp/app.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _navigation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./navigation.js */ "./src/js/coreapp/navigation.js");
/* harmony import */ var _minesweeper_minesweeperapp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../minesweeper/minesweeperapp.js */ "./src/js/minesweeper/minesweeperapp.js");



let $rootAppContainer = '#app-main';

new _navigation_js__WEBPACK_IMPORTED_MODULE_0__.Navigation($);

// start minesweepr
new _minesweeper_minesweeperapp_js__WEBPACK_IMPORTED_MODULE_1__.Minesweeper($, $rootAppContainer).Start();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9hcHB1dGlsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb3JlYXBwL2NvbmZpZy9jb25maWctZGV2LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb3JlYXBwL2dvb2dsZWF1dGhoYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb3JlYXBwL25hdmlnYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21pbmVzd2VlcGVyL21pbmVzd2VlcGVyYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9taW5lc3dlZXBlci9taW5lc3dlZXBlcmNvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbWluZXN3ZWVwZXIvbWluZXN3ZWVwZXJnYW1lY2VsbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbWluZXN3ZWVwZXIvbWluZXN3ZWVwZXJnYW1lc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21pbmVzd2VlcGVyL21pbmVzd2VlcGVyZ3JpZC5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXlEOztBQUVsRDtBQUNQO0FBQ0Esb0JBQW9CLHNFQUFhO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7O0FDWE87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0EsRTs7Ozs7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxzQkFBc0IsZ0NBQWdDO0FBQ3REO0FBQ0EsMEJBQTBCLCtCQUErQixPO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnREFBZ0QsMEJBQTBCLFdBQVcsZUFBZSxtQjs7QUFFcEc7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsUUFBUSxtQkFBbUIsa0JBQWtCOztBQUV6RjtBQUNBOztBQUVBLGtCQUFrQixRQUFRO0FBQzFCO0FBQ0Esa0NBQWtDLFVBQVU7QUFDNUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUNBQXVDLGtHQUE0QztBQUNuRjs7QUFFQSx1Q0FBdUMsK0ZBQXlDO0FBQ2hGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7O1VDN0hBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7OztBQ042QztBQUNrQjs7QUFFL0Q7O0FBRUEsSUFBSSxzREFBVTs7QUFFZDtBQUNBLElBQUksdUVBQVcsK0IiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW52Q29uZmlnIH0gZnJvbSAnLi9jb25maWcvY29uZmlnLUFQUFRBUkdFVC5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQXBwVXRpbCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9sb2cgPSBFbnZDb25maWcuZW52ID09PSBcImRldlwiO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBMb2coZW50cnkpIHtcclxuICAgICAgICBpZiAodGhpcy5fbG9nICYmIGVudHJ5KVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlbnRyeSk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY29uc3QgQXBwRmlyZWJhc2VDb25maWcgPSB7XHJcbiAgICBhcGlLZXk6IFwiQUl6YVN5Qml0a0RyM284aEpCaC1sbTV0Wm50d21LaFRXaVNQRXBrXCIsXHJcbiAgICBhdXRoRG9tYWluOiBcIm1laW4tc3dlZXBlci1kNTk5NS5maXJlYmFzZWFwcC5jb21cIixcclxuICAgIHByb2plY3RJZDogXCJtZWluLXN3ZWVwZXItZDU5OTVcIixcclxuICAgIHN0b3JhZ2VCdWNrZXQ6IFwibWVpbi1zd2VlcGVyLWQ1OTk1LmFwcHNwb3QuY29tXCIsXHJcbiAgICBtZXNzYWdpbmdTZW5kZXJJZDogXCI3MDM5MzM3MjU2ODVcIixcclxuICAgIGFwcElkOiBcIjE6NzAzOTMzNzI1Njg1OndlYjoyZWViY2U1YjFkN2ExNmVmYmE3ZWJjXCJcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBFbnZDb25maWcgPSB7XHJcbiAgICBlbnY6IFwiZGV2XCJcclxufTsiLCJpbXBvcnQgeyBBcHBGaXJlYmFzZUNvbmZpZyB9IGZyb20gJy4vY29uZmlnL2NvbmZpZy1BUFBUQVJHRVQuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdvb2dsZUF1dGhIYW5kbGVyIHtcclxuICBjb25zdHJ1Y3RvcihvblNpZ25Jbiwgb25TaWduT3V0KSB7XHJcbiAgICB0aGlzLm9uU2lnbkluID0gb25TaWduSW47XHJcbiAgICB0aGlzLm9uU2lnbk91dCA9IG9uU2lnbk91dDtcclxuXHJcbiAgICAvLyBJbml0aWFsaXplIEZpcmViYXNlLCBjb25maWcgZGVmaW5lZCBlbHNld2hlcmVcclxuICAgIGZpcmViYXNlLmluaXRpYWxpemVBcHAoQXBwRmlyZWJhc2VDb25maWcpO1xyXG4gICAgXHJcbiAgICAvLyB1c2Ugb25seSBnb29nXHJcbiAgICB0aGlzLmdfcHJvdmlkZXIgPSBuZXcgZmlyZWJhc2UuYXV0aC5Hb29nbGVBdXRoUHJvdmlkZXIoKTtcclxuICAgIHRoaXMuZ19wcm92aWRlci5hZGRTY29wZSgnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC91c2VyaW5mby5wcm9maWxlJyk7XHJcbiAgICB0aGlzLmdfcHJvdmlkZXIuc2V0Q3VzdG9tUGFyYW1ldGVycyh7XHJcbiAgICAgICdsb2dpbl9oaW50JzogJ3VzZXJAZXhhbXBsZS5jb20nXHJcbiAgICB9KTsgXHJcblxyXG4gICAgLy8gc2V0IGEgaGFuZGxlciBmb3Igd2hlbiB0b2tlbnMgYXJlIHJlY2lldmVkXHJcbiAgICBmaXJlYmFzZS5hdXRoKCkub25BdXRoU3RhdGVDaGFuZ2VkKHVzZXI9PntcclxuICAgICAgICBpZiAodXNlcikge1xyXG4gICAgICAgICAgICB0aGlzLkZpcmVPblNpZ25JbkhhbmRsZXIodXNlcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIHRoaXMgY2FuIGZpcmUgd2hlbiB0aGVyZSBpcyBubyBsb2dnZWQgaW4gdXNlciBvbiBsb2FkXHJcbiAgICAgICAgICAgIHRoaXMuRmlyZU9uU2lnbk91dEhhbmRsZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIG1ldGhvZHNcclxuICBGaXJlT25TaWduSW5IYW5kbGVyKG9BdXRoVXNlcikge1xyXG4gICAgaWYgKHRoaXMub25TaWduSW4pIHtcclxuICAgICAgdGhpcy5vblNpZ25JbihvQXV0aFVzZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgRmlyZU9uU2lnbk91dEhhbmRsZXIoKSB7XHJcbiAgICBpZiAodGhpcy5vblNpZ25PdXQpIHtcclxuICAgICAgdGhpcy5vblNpZ25PdXQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIFNpZ25JblBvcHVwKCkge1xyXG4gICAgZmlyZWJhc2UuYXV0aCgpLnNpZ25JbldpdGhQb3B1cCh0aGlzLmdfcHJvdmlkZXIpO1xyXG4gIH1cclxuXHJcbiAgU2lnbkluUmVkaXJlY3QoKSB7XHJcbiAgICBmaXJlYmFzZS5hdXRoKCkuc2lnbkluV2l0aFJlZGlyZWN0KHRoaXMuZ19wcm92aWRlcik7XHJcbiAgfVxyXG5cclxuICBTaWduT3V0KCkge1xyXG4gICAgZmlyZWJhc2UuYXV0aCgpLnNpZ25PdXQoKTtcclxuICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7IEdvb2dsZUF1dGhIYW5kbGVyIH0gZnJvbSAnLi9nb29nbGVhdXRoaGFuZGxlci5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvbiB7XHJcbiAgICBjb25zdHJ1Y3RvcigkKSB7XHJcbiAgICAgICAgdGhpcy5sb2dpblVJID0gJChcIiNsb2dpbi11aS1jb250YWluZXJcIik7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyBiaW5kIGxvZyBpblxyXG4gICAgICAgICQoXCIjbG9naW4tcHJvbXB0XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHsgICAgIFxyXG4gICAgICAgICAgICB0aGF0LmF1dGguU2lnbkluUmVkaXJlY3QoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcIiNsb2dpbi1wcm9maWxlXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHsgICAgIFxyXG4gICAgICAgICAgICB0aGF0LmF1dGguU2lnbk91dCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLl9vblNpZ25JbiA9IGZ1bmN0aW9uKG9BdXRoVXNlcikge1xyXG4gICAgICAgICAgICB0aGF0LmxvZ2luVUlcclxuICAgICAgICAgICAgICAgIC5maW5kKFwiI2xvZ2luLXByb21wdFwiKVxyXG4gICAgICAgICAgICAgICAgLnRvZ2dsZUNsYXNzKCdkLW5vbmUnKVxyXG4gICAgICAgICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAgICAgICAuZmluZChcIiNsb2dpbi1wcm9maWxlXCIpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnaW1nJylcclxuICAgICAgICAgICAgICAgIC5wcm9wKCdzcmMnLCBvQXV0aFVzZXIucGhvdG9VUkwpXHJcbiAgICAgICAgICAgICAgICAucHJvcCgnYWx0JywgJ2xvZ2dlZCBpbiBhcyAnICsgb0F1dGhVc2VyLmRpc3BsYXlOYW1lKVxyXG4gICAgICAgICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAgICAgICAudG9nZ2xlQ2xhc3MoJ2Qtbm9uZScpXHJcbiAgICAgICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdkYXRhLXNpZ25lZC1pbicsICd0cnVlJyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5fb25TaWduT3V0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LmxvZ2luVUkuYXR0cignZGF0YS1zaWduZWQtaW4nKSA9PSAnZmFsc2UnKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHRoYXQubG9naW5VSVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoXCIjbG9naW4tcHJvZmlsZVwiKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJ2ltZycpXHJcbiAgICAgICAgICAgICAgICAucHJvcCgnc3JjJywgJycpXHJcbiAgICAgICAgICAgICAgICAucHJvcCgnYWx0JywgJycpXHJcbiAgICAgICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgICAgIC50b2dnbGVDbGFzcygnZC1ub25lJylcclxuICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoXCIjbG9naW4tcHJvbXB0XCIpXHJcbiAgICAgICAgICAgICAgICAudG9nZ2xlQ2xhc3MoJ2Qtbm9uZScpXHJcbiAgICAgICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdkYXRhLXNpZ25lZC1pbicsICdmYWxzZScpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuYXV0aCA9IG5ldyBHb29nbGVBdXRoSGFuZGxlcih0aGlzLl9vblNpZ25JbiwgdGhpcy5fb25TaWduT3V0KTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEFwcFV0aWwgfSBmcm9tICcuLi9jb3JlYXBwL2FwcHV0aWwuanMnO1xyXG5pbXBvcnQgeyBNSU5FU1dFRVBFUl9HUklEX1NJWkVTIH0gZnJvbSAnLi9taW5lc3dlZXBlcmNvbnN0YW50cy5qcyc7XHJcbmltcG9ydCB7IE1pbmVzd2VlcGVyR2FtZVN0YXRlIH0gZnJvbSAnLi9taW5lc3dlZXBlcmdhbWVzdGF0ZS5qcyc7XHJcbmltcG9ydCB7IE1pbmVzd2VlcGVyR2FtZUdyaWQgfSBmcm9tICcuL21pbmVzd2VlcGVyZ3JpZC5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgTWluZXN3ZWVwZXIge1xyXG4gICAgY29uc3RydWN0b3IoJCwgcm9vdENvbnRhaW5lclNlbGVjdG9yKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zU2VsZWN0b3IgPSAnI2dhbWUtb3B0aW9ucyc7XHJcbiAgICAgICAgdGhpcy5uZXdHYW1lU2VsZWN0b3IgPSAnI2dlbmVyYXRlLWdhbWUnO1xyXG4gICAgICAgIHRoaXMud2luU2VsZWN0b3IgPSAnI3dpbi1nYW1lJztcclxuICAgICAgICB0aGlzLmxvc2VTZWxlY3RvciA9ICcjbG9zZS1nYW1lJztcclxuICAgICAgICB0aGlzLmdyaWRTZWxlY3RvciA9ICcjZ3JpZCc7XHJcbiAgICAgICAgdGhpcy5yb290Q29udGFpbmVyU2VsZWN0b3IgPSByb290Q29udGFpbmVyU2VsZWN0b3I7XHJcblxyXG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9J2FwcC1jb250YWluZXIgY29udGFpbmVyLXNtJz5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2NvbnRyb2wtY29udGFpbmVyIHJvdyc+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdjb2wtMTIgY29sLXNtLTQgcC0xIHAtc20tMyBnLXNtLTInPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgaWQ9J2dhbWUtb3B0aW9ucycgY2xhc3M9J2Zvcm0tc2VsZWN0Jz48L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nY29sLTEyIGNvbC1zbS04IHAtMSBwLXNtLTMgZy1zbS0yJz5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGlkPSdnZW5lcmF0ZS1nYW1lJyB2YWx1ZT0nbmV3IGdhbWUnIGNsYXNzPSdidG4gYnRuLW91dGxpbmUtcHJpbWFyeSc+PC9pbnB1dD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdidG4tZ3JvdXAnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGlkPSd3aW4tZ2FtZScgdmFsdWU9J2F1dG8gd2luJyBjbGFzcz0nYnRuIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSc+PC9pbnB1dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiBpZD0nbG9zZS1nYW1lJyB2YWx1ZT0nYXV0byBsb3NlJyBjbGFzcz0nYnRuIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSc+PC9pbnB1dD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz0nZ3JpZC1jb250YWluZXIgcm93Jz5cclxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9J2dyaWQnIGNsYXNzPSdncmlkIGNvbC0xMiB1c2VyLXNlbGVjdC1ub25lIHB5LTQgcHgtMCc+PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGA7XHJcbiAgICB9XHJcbiAgICAgICAgXHJcbiAgICAvLyBtZXRob2RzXHJcbiAgICBJbml0Q29udHJvbHMoKSB7XHJcbiAgICAgICAgJCh0aGlzLnJvb3RDb250YWluZXJTZWxlY3RvcikuaHRtbCh0aGlzLnRlbXBsYXRlKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgJHNlbGVjdCA9ICQodGhpcy5vcHRpb25zU2VsZWN0b3IpO1xyXG5cclxuICAgICAgICBmb3IobGV0IGtleSBpbiBNSU5FU1dFRVBFUl9HUklEX1NJWkVTKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgJHNlbGVjdC5hcHBlbmQoJCgnPG9wdGlvbj4nLCB7IFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGtleSxcclxuICAgICAgICAgICAgICAgIHRleHQgOiBgJHtrZXl9ICgke01JTkVTV0VFUEVSX0dSSURfU0laRVNba2V5XS53aWR0aH14JHtNSU5FU1dFRVBFUl9HUklEX1NJWkVTW2tleV0uaGVpZ2h0fSwgJHtNSU5FU1dFRVBFUl9HUklEX1NJWkVTW2tleV0ubWluZXN9IG1pbmVzKWAgXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGJpbmQgZ2FtZSBnZW5lcmF0aW9uIGhhbmRsZXJzXHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICQodGhpcy5uZXdHYW1lU2VsZWN0b3IpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHsgICAgICAgXHJcbiAgICAgICAgICAgIHRoYXQuR2VuZXJhdGVOZXdHYW1lKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgR2VuZXJhdGVOZXdHYW1lKCkge1xyXG4gICAgICAgIGxldCB1dGlsID0gbmV3IEFwcFV0aWwoKTtcclxuICAgICAgICBsZXQgJHNlbGVjdCA9ICQodGhpcy5vcHRpb25zU2VsZWN0b3IpO1xyXG4gICAgICAgIGxldCBzZWxlY3RlZCA9ICRzZWxlY3QuZmluZChcIm9wdGlvbjpzZWxlY3RlZFwiKS52YWwoKTtcclxuICAgICAgICBsZXQgc2l6ZSA9IE1JTkVTV0VFUEVSX0dSSURfU0laRVNbc2VsZWN0ZWRdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHV0aWwuTG9nKGBnZW5lcmF0ZSBuZXcgJHtzaXplLndpZHRofXgke3NpemUuaGVpZ2h0fSBnYW1lYCk7ICBcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIG5ldyBnYW1lIHN0YXRlXHJcbiAgICAgICAgbGV0IGdhbWVTdGF0ZSA9IG5ldyBNaW5lc3dlZXBlckdhbWVTdGF0ZShzaXplLCB1dGlsKTtcclxuXHJcbiAgICAgICAgJCh0aGlzLndpblNlbGVjdG9yKS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkgeyAgICAgICBcclxuICAgICAgICAgICAgZ2FtZVN0YXRlLlRyaWdnZXJBdXRvV2luKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQodGhpcy5sb3NlU2VsZWN0b3IpLm9mZignY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7ICAgICAgIFxyXG4gICAgICAgICAgICBnYW1lU3RhdGUuVHJpZ2dlckF1dG9Mb3NlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBuZXcgdWlcclxuICAgICAgICBuZXcgTWluZXN3ZWVwZXJHYW1lR3JpZCgkKHRoaXMuZ3JpZFNlbGVjdG9yKSwgZ2FtZVN0YXRlLCB1dGlsKS5TdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIFN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMuSW5pdENvbnRyb2xzKCk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY29uc3QgTUlORVNXRUVQRVJfR1JJRF9TSVpFUyA9IHtcclxuICAgIGJlZ2lubmVyIDogeyB3aWR0aDogOSwgaGVpZ2h0OiA5LCBtaW5lczogMTAsIGxhYmVsOiBcImJlZ2lubmVyXCJ9LFxyXG4gICAgaW50ZXJtZWRpYXRlOiB7IHdpZHRoOiAxNiwgaGVpZ2h0OiAxNiwgbWluZXM6IDQwLCBsYWJlbDogXCJpbnRlcm1lZGlhdGVcIn0sXHJcbiAgICBleHBlcnQ6IHsgd2lkdGg6IDE2LCBoZWlnaHQ6IDI2LCBtaW5lczogODYsIGxhYmVsOiBcImV4cGVydFwifSxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBNSU5FU1dFRVBFUl9HQU1FX0NPTVBMRVRJT05fU1RBVEVTID0ge1xyXG4gICAgc3RhcnRlZDogMCxcclxuICAgIGNvbXBsZXRlZDogMSxcclxuICAgIGZhaWxlZDogMlxyXG59O1xyXG4iLCJleHBvcnQgY2xhc3MgTWluZXN3ZWVwZXJHYW1lQ2VsbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihpLCBqLCBnYW1lKSB7XHJcbiAgICAgICAgdGhpcy5faWQgPSBgJHtpICsgXCJfXCIgKyBqfWA7XHJcbiAgICAgICAgdGhpcy5fYWRqYWNlbnRNaW5lQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2lzTWluZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2lzTG9zaW5nTWluZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2lzUmV2ZWFsZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9pc01hcmtlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2dhbWUgPSBnYW1lO1xyXG4gICAgICAgIHRoaXMuaSA9IGk7XHJcbiAgICAgICAgdGhpcy5qID0gajtcclxuICAgIH1cclxuXHJcbiAgICAvLyBnZXR0ZXJzXHJcbiAgICBnZXQgSWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfVxyXG4gICAgZ2V0IEFkamFjZW50TWluZUNvdW50KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hZGphY2VudE1pbmVDb3VudDtcclxuICAgIH1cclxuICAgIGdldCBJc01pbmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzTWluZTtcclxuICAgIH1cclxuICAgIGdldCBJc0xvc2luZ01pbmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzTG9zaW5nTWluZTtcclxuICAgIH1cclxuICAgIGdldCBJc1JldmVhbGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc1JldmVhbGVkO1xyXG4gICAgfSBcclxuICAgIGdldCBJc01hcmtlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNNYXJrZWQ7XHJcbiAgICB9IFxyXG4gICAgZ2V0IHJvd0luZGV4KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmk7XHJcbiAgICB9XHJcbiAgICBnZXQgY29sSW5kZXgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuajtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gbWV0aG9kc1xyXG4gICAgSW5jcmVtZW50QWRqYWNlbnRNaW5lQ291bnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2dhbWUuR2FtZUlzUGxheWFibGUpXHJcbiAgICAgICAgICAgIHRoaXMuX2FkamFjZW50TWluZUNvdW50Kys7XHJcbiAgICB9XHJcbiAgICBTZXRJc01pbmUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2dhbWUuR2FtZUlzUGxheWFibGUpXHJcbiAgICAgICAgICAgIHRoaXMuX2lzTWluZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBTZXRJc0xvc2luZ01pbmUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2dhbWUuR2FtZUlzUGxheWFibGUpXHJcbiAgICAgICAgICAgIHRoaXMuX2lzTG9zaW5nTWluZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBTZXRJc1JldmVhbGVkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9nYW1lLkdhbWVJc1BsYXlhYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzUmV2ZWFsZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgLy8gbm8gbmVlZCBmb3IgaXQgdG8gYmUgbWFya2VkIGFueSBtb3JlXHJcbiAgICAgICAgICAgIHRoaXMuX2lzTWFya2VkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSAgXHJcbiAgICBTZXRJc01hcmtlZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fZ2FtZS5HYW1lSXNQbGF5YWJsZSkgXHJcbiAgICAgICAgICAgIHRoaXMuX2lzTWFya2VkID0gdHJ1ZTtcclxuICAgIH0gXHJcbn0iLCJpbXBvcnQgeyBNaW5lc3dlZXBlckdhbWVDZWxsIH0gZnJvbSBcIi4vbWluZXN3ZWVwZXJnYW1lY2VsbC5qc1wiO1xyXG5pbXBvcnQgeyBNSU5FU1dFRVBFUl9HQU1FX0NPTVBMRVRJT05fU1RBVEVTIH0gZnJvbSBcIi4vbWluZXN3ZWVwZXJjb25zdGFudHMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNaW5lc3dlZXBlckdhbWVTdGF0ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihzaXplLCBsb2d1dGlsKSB7XHJcbiAgICAgICAgLy8gc3RhdGVcclxuICAgICAgICB0aGlzLl9sb29rdXAgPSB7fTtcclxuICAgICAgICB0aGlzLl9pZCA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApO1xyXG4gICAgICAgIHRoaXMuX2NlbGxzID0gW107IFxyXG4gICAgICAgIHRoaXMuX21pbmVDZWxscyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3NpemUgPSBzaXplOyBcclxuICAgICAgICB0aGlzLl9nYW1lQ29tcGxldGlvblN0YXRlID0gTUlORVNXRUVQRVJfR0FNRV9DT01QTEVUSU9OX1NUQVRFUy5zdGFydGVkO1xyXG4gICAgICAgIHRoaXMuX3V0aWwgPSBsb2d1dGlsO1xyXG5cclxuICAgICAgICAvLyB0cmFjayBjbGVhcmVkIGNlbGxzIHZzIHRvdGFsIGNlbGxzIG5lZWRlZCB0byB3aW5cclxuICAgICAgICB0aGlzLl90b3RhbENlbGxDb3VudFRvV2luID0gc2l6ZS53aWR0aCpzaXplLmhlaWdodCAtIHNpemUubWluZXM7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudENlbGxDb3VudCA9IDA7XHJcblxyXG4gICAgICAgIC8vIGZvciBkaWFibGluZyB0aGUgZ2FtZVxyXG4gICAgICAgIHRoaXMuX2dhbWVEaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBjYWxsYmFjayBmdW5jc1xyXG4gICAgICAgIHRoaXMuX29uQ2VsbFN0YXRlQ2hhbmdlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuX29uR2FtZUNvbXBsZXRpb25TdGF0ZUNoYW5nZSA9IHVuZGVmaW5lZDtcclxuIFxyXG4gICAgICAgIC8vIGluaXQsIHN0YXJ0aW5nIHdpdGggY2VsbHMgd2l0aCBnZW5lcmljIHZhbHVlc1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9zaXplLmhlaWdodDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCByb3cgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCB0aGlzLl9zaXplLndpZHRoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdDZWxsID0gbmV3IE1pbmVzd2VlcGVyR2FtZUNlbGwoaSwgaiwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3Q2VsbElkID0gbmV3Q2VsbC5JZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvb2t1cFtuZXdDZWxsSWRdID0gbmV3Q2VsbDtcclxuICAgICAgICAgICAgICAgIHJvdy5wdXNoKG5ld0NlbGwpOyAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9jZWxscy5wdXNoKHJvdyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBzcHJpbmtsZSBtaW5lc1xyXG4gICAgICAgIGxldCBtaW5lcyA9IF8uc2FtcGxlU2l6ZShfLnJhbmdlKDAsIHRoaXMuX3NpemUud2lkdGgqdGhpcy5fc2l6ZS5oZWlnaHQgLSAxKSwgdGhpcy5fc2l6ZS5taW5lcyk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgbWluZXMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgbGV0IHJvd0luZGV4ID0gXy5mbG9vcihtaW5lc1trXS90aGlzLl9zaXplLndpZHRoKTtcclxuICAgICAgICAgICAgbGV0IGNvbEluZGV4ID0gbWluZXNba10gJSB0aGlzLl9zaXplLndpZHRoO1xyXG4gICAgICAgICAgICBsZXQgbWluZUNlbGwgPSB0aGlzLl9sb29rdXBbYCR7cm93SW5kZXggKyBcIl9cIiArIGNvbEluZGV4fWBdO1xyXG5cclxuICAgICAgICAgICAgbWluZUNlbGwuU2V0SXNNaW5lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX21pbmVDZWxscy5wdXNoKG1pbmVDZWxsKTsgICAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSBhZGphY2VudCBtaW5lIGNvdW50IGJ5IGl0ZXJhdGluZyBhbGwgbWluZXNcclxuICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IG1pbmVzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIGxldCByb3dJbmRleCA9IF8uZmxvb3IobWluZXNba10vdGhpcy5fc2l6ZS53aWR0aCk7XHJcbiAgICAgICAgICAgIGxldCBjb2xJbmRleCA9IG1pbmVzW2tdICUgdGhpcy5fc2l6ZS53aWR0aDtcclxuXHJcbiAgICAgICAgICAgIGxldCBvdGhlckNvb3JkcyA9IHRoaXMuR2VuZXJhdGVBZGphY2VudENlbGxzKHJvd0luZGV4LCBjb2xJbmRleCk7XHJcblxyXG4gICAgICAgICAgICAvLyBmb3JlYWNoIGFkamFjZW50LCBpZiBpdCBpc250IGFsc28gYSBtaW5lLCBpbmNyZW1lbnQgaXRzIGFkamFjZW50IG1pbmUgY291bnRcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBvdGhlckNvb3Jkcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFkamFjZW50Q2VsbCA9IHRoaXMuX2xvb2t1cFtgJHtvdGhlckNvb3Jkc1tqXS55ICsgXCJfXCIgKyBvdGhlckNvb3Jkc1tqXS54fWBdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghYWRqYWNlbnRDZWxsLklzTWluZSlcclxuICAgICAgICAgICAgICAgICAgICBhZGphY2VudENlbGwuSW5jcmVtZW50QWRqYWNlbnRNaW5lQ291bnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdXRpbC5Mb2coYG5ldyBnYW1lIGdlbmVyYXRlZGApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGdldHRlcnNcclxuICAgIGdldCBHYW1lSXNQbGF5YWJsZSgpIHtcclxuICAgICAgICByZXR1cm4gIXRoaXMuX2dhbWVEaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgR2FtZUlzV29uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9nYW1lQ29tcGxldGlvblN0YXRlID09IE1JTkVTV0VFUEVSX0dBTUVfQ09NUExFVElPTl9TVEFURVMuY29tcGxldGVkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBTaXplKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBJZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IEdhbWVDb21wbGV0aW9uU3RhdGUoZ2FtZUNvbXBsZXRpb25TdGF0ZSkge1xyXG4gICAgICAgIHRoaXMuX2dhbWVDb21wbGV0aW9uU3RhdGUgPSBnYW1lQ29tcGxldGlvblN0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBPbkNlbGxTdGF0ZUNoYW5nZShmbikge1xyXG4gICAgICAgIHRoaXMuX29uQ2VsbFN0YXRlQ2hhbmdlID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IEdhbWVEaXNhYmxlZChkaXNhYmxlZCkge1xyXG4gICAgICAgIHRoaXMuX2dhbWVEaXNhYmxlZCA9IGRpc2FibGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBPbkdhbWVDb21wbGV0aW9uU3RhdGVDaGFuZ2UoZm4pIHtcclxuICAgICAgICB0aGlzLl9vbkdhbWVDb21wbGV0aW9uU3RhdGVDaGFuZ2UgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICBHZW5lcmF0ZUFkamFjZW50Q2VsbHMocm93SW5kZXgsIGNvbEluZGV4KSB7XHJcbiAgICAgICAgLy8gZ2VuZXJhdGUgOCBhZGphY2VudCBjby1vcmRzLCBjbGFtcGVkIHRvIGluLWJvdW5kc1xyXG4gICAgICAgIGxldCBvdGhlckNvb3JkcyA9IFtdO1xyXG5cclxuICAgICAgICBpZiAocm93SW5kZXggLSAxID49IDApIHtcclxuICAgICAgICAgICAgaWYgKGNvbEluZGV4IC0gMSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBvdGhlckNvb3Jkcy5wdXNoKHt4OiBjb2xJbmRleC0xLCB5OnJvd0luZGV4LTF9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb3RoZXJDb29yZHMucHVzaCh7eDogY29sSW5kZXgsIHk6cm93SW5kZXgtMX0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbEluZGV4ICsgMSA8IHRoaXMuX3NpemUud2lkdGgpXHJcbiAgICAgICAgICAgICAgICBvdGhlckNvb3Jkcy5wdXNoKHt4OiBjb2xJbmRleCsxLCB5OnJvd0luZGV4LTF9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGNvbEluZGV4IC0gMSA+PSAwKSBcclxuICAgICAgICAgICAgb3RoZXJDb29yZHMucHVzaCh7eDogY29sSW5kZXgtMSwgeTpyb3dJbmRleH0pO1xyXG5cclxuICAgICAgICBpZiAoY29sSW5kZXggKyAxIDwgdGhpcy5fc2l6ZS53aWR0aClcclxuICAgICAgICAgICAgb3RoZXJDb29yZHMucHVzaCh7eDogY29sSW5kZXgrMSwgeTpyb3dJbmRleH0pO1xyXG5cclxuICAgICAgICBpZiAocm93SW5kZXggKyAxIDwgdGhpcy5fc2l6ZS5oZWlnaHQpIHtcclxuICAgICAgICAgICAgaWYgKGNvbEluZGV4IC0gMSA+PSAwKSBcclxuICAgICAgICAgICAgICAgIG90aGVyQ29vcmRzLnB1c2goe3g6IGNvbEluZGV4LTEsIHk6cm93SW5kZXgrMX0pO1xyXG5cclxuICAgICAgICAgICAgb3RoZXJDb29yZHMucHVzaCh7eDogY29sSW5kZXgsIHk6cm93SW5kZXgrMX0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbEluZGV4ICsgMSA8IHRoaXMuX3NpemUud2lkdGgpXHJcbiAgICAgICAgICAgICAgICBvdGhlckNvb3Jkcy5wdXNoKHt4OiBjb2xJbmRleCsxLCB5OnJvd0luZGV4KzF9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvdGhlckNvb3JkcztcclxuICAgIH1cclxuXHJcbiAgICBDZWxsQnlJZChjZWxsSWQpIHtcclxuICAgICAgICBsZXQgY2VsbCA9IHRoaXMuX2xvb2t1cFtjZWxsSWRdO1xyXG5cclxuICAgICAgICBpZiAoY2VsbCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB0aHJvdyBgY2VsbCB3aXRoIGlkICR7Y2VsbElkfSBjb3VsZCBub3QgYmUgZm91bmRgO1xyXG5cclxuICAgICAgICByZXR1cm4gY2VsbDtcclxuICAgIH1cclxuXHJcbiAgICBSZXZlYWxBbGxNaW5lcyAoKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIF8uZm9yRWFjaCh0aGlzLl9taW5lQ2VsbHMsIGZ1bmN0aW9uKGNlbGwpIHtcclxuICAgICAgICAgICAgaWYgKCFjZWxsLklzUmV2ZWFsZWQpXHJcbiAgICAgICAgICAgICAgICBjZWxsLlNldElzUmV2ZWFsZWQoKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuRmlyZUNlbGxTdGF0ZUNoYW5nZShjZWxsKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBBdHRlbXB0QXV0b0ZpbGwoY2VsbCkge1xyXG4gICAgICAgIGxldCBhdXRvRmlsbHMgPSB0aGlzLkdldEFkamFjZW50Tm9uTWluZU5vblJldmVhbGVkQ2VsbHMoY2VsbCk7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICBfLmZvckVhY2goYXV0b0ZpbGxzLCBmdW5jdGlvbihjKSB7XHJcbiAgICAgICAgICAgIHRoYXQuU2VsZWN0Q2VsbChjKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRBZGphY2VudE5vbk1pbmVOb25SZXZlYWxlZENlbGxzKGNlbGwpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGFkakNlbGxJbmRpY2VzID0gdGhpcy5HZW5lcmF0ZUFkamFjZW50Q2VsbHMoY2VsbC5yb3dJbmRleCwgY2VsbC5jb2xJbmRleCk7XHJcbiAgICAgICAgbGV0IGFkakNlbGxzID0gW107XHJcbiAgICAgICAgXy5mb3JFYWNoKGFkakNlbGxJbmRpY2VzLCBmdW5jdGlvbihjKSB7XHJcbiAgICAgICAgICAgIGxldCBhZGphY2VudENlbGwgPSB0aGF0LkNlbGxCeUlkKGAke2MueSArIFwiX1wiICsgYy54fWApO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFhZGphY2VudENlbGwuSXNNaW5lICYmICFhZGphY2VudENlbGwuSXNSZXZlYWxlZClcclxuICAgICAgICAgICAgICAgIGFkakNlbGxzLnB1c2goYWRqYWNlbnRDZWxsKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGFkakNlbGxzO1xyXG4gICAgfVxyXG5cclxuICAgIEZpcmVDZWxsU3RhdGVDaGFuZ2UgKGNoYW5nZWRDZWxsKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX29uQ2VsbFN0YXRlQ2hhbmdlKVxyXG4gICAgICAgICAgICB0aGlzLl9vbkNlbGxTdGF0ZUNoYW5nZShjaGFuZ2VkQ2VsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgRmlyZUdhbWVDb21wbGV0aW9uU3RhdGVDaGFuZ2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX29uR2FtZUNvbXBsZXRpb25TdGF0ZUNoYW5nZSlcclxuICAgICAgICAgICAgdGhpcy5fb25HYW1lQ29tcGxldGlvblN0YXRlQ2hhbmdlKHRoaXMuX2dhbWVDb21wbGV0aW9uU3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIE1hcmtDZWxsKGNlbGwpIHtcclxuICAgICAgICB0aGlzLl91dGlsLkxvZyhgbWFyayBjZWxsIGlkICR7Y2VsbC5JZH1gKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLkdhbWVJc1BsYXlhYmxlKSB7XHJcbiAgICAgICAgICAgIC8vIGRvbid0IGRvIGFueXRoaW5nXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghY2VsbC5Jc1JldmVhbGVkKSB7XHJcblxyXG4gICAgICAgICAgICBjZWxsLlNldElzTWFya2VkKCk7XHJcblxyXG4gICAgICAgICAgICAvLyB0cmlnZ2VyIGl0IHRvIHJlLXJlbmRlclxyXG4gICAgICAgICAgICB0aGlzLkZpcmVDZWxsU3RhdGVDaGFuZ2UoY2VsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIE1hcmtDZWxsYnlJZChjZWxsSWQpIHtcclxuICAgICAgICBsZXQgY2VsbCA9IHRoaXMuQ2VsbEJ5SWQoY2VsbElkKTsgICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMuTWFya0NlbGwoY2VsbCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFNlbGVjdENlbGwoY2VsbCkge1xyXG4gICAgICAgIHRoaXMuX3V0aWwuTG9nKGBzZWxlY3QgY2VsbCBpZCAke2NlbGwuSWR9YCk7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5HYW1lSXNQbGF5YWJsZSkge1xyXG4gICAgICAgICAgICAvLyBkb24ndCBkbyBhbnl0aGluZ1xyXG4gICAgICAgICAgICB0aGlzLl91dGlsLkxvZyhgZ2FtZSBoYXMgYWxyZWFkeSBiZWVuICR7dGhpcy5fZ2FtZUNvbXBsZXRpb25TdGF0ZSA9PSBNSU5FU1dFRVBFUl9HQU1FX0NPTVBMRVRJT05fU1RBVEVTLmNvbXBsZXRlZCA/IFwid29uIVwiIDogXCJsb3N0IVwifWApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWNlbGwuSXNSZXZlYWxlZCkge1xyXG4gICAgICAgICAgICAvLyByZXZlYWwgdGhpcyBjZWxsXHJcbiAgICAgICAgICAgIGNlbGwuU2V0SXNSZXZlYWxlZCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gdHJpZ2dlciBpdCB0byByZS1yZW5kZXJcclxuICAgICAgICAgICAgdGhpcy5GaXJlQ2VsbFN0YXRlQ2hhbmdlKGNlbGwpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNlbGwuSXNNaW5lKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBvaCBvaGgsIGxvc3RcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBtYXJrIHRoaXMgbWluZSBhcyB0aGUgb25lIGhpdFxyXG4gICAgICAgICAgICAgICAgY2VsbC5TZXRJc0xvc2luZ01pbmUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZUNvbXBsZXRpb25TdGF0ZSA9IE1JTkVTV0VFUEVSX0dBTUVfQ09NUExFVElPTl9TVEFURVMuZmFpbGVkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SZXZlYWxBbGxNaW5lcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5HYW1lRGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXRpbC5Mb2coYHBsYXllciBoYXMgbG9zdCFgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuRmlyZUdhbWVDb21wbGV0aW9uU3RhdGVDaGFuZ2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gICBcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyB5YXksIHlvdSBjbGVhcmVkIG9uZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudENlbGxDb3VudCsrO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIHBsYXllciBoYXMgd29uXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY3VycmVudENlbGxDb3VudCA9PSB0aGlzLl90b3RhbENlbGxDb3VudFRvV2luKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8geWF5XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5HYW1lQ29tcGxldGlvblN0YXRlID0gTUlORVNXRUVQRVJfR0FNRV9DT01QTEVUSU9OX1NUQVRFUy5jb21wbGV0ZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5SZXZlYWxBbGxNaW5lcygpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkdhbWVEaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXRpbC5Mb2coYHBsYXllciBoYXMgd29uIWApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuRmlyZUdhbWVDb21wbGV0aW9uU3RhdGVDaGFuZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBvdGhlcndpc2UsIGNlbGwgaXMgbm90IGEgbWluZSwgcGxheWVyIGhhcyBub3QgeWV0IHdvbiwgc28gYXR0ZW1wdCB0byBhdXRvZmlsbCBpZiB0aGUgY2VsbCBpcyBibGFua1xyXG4gICAgICAgICAgICBpZiAoY2VsbC5BZGphY2VudE1pbmVDb3VudCA9PSAwKSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICB0aGlzLkF0dGVtcHRBdXRvRmlsbChjZWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBTZWxlY3RDZWxsQnlJZChjZWxsSWQpIHtcclxuICAgICAgICBsZXQgY2VsbCA9IHRoaXMuQ2VsbEJ5SWQoY2VsbElkKTsgICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMuU2VsZWN0Q2VsbChjZWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBUcmlnZ2VyQXV0b1dpbigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuR2FtZUlzUGxheWFibGUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IGFsbENlbGxzID0gXy5mbGF0dGVuKHRoaXMuX2NlbGxzKTtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgXy5mb3JFYWNoKGFsbENlbGxzLCBmdW5jdGlvbihjKSB7XHJcbiAgICAgICAgICAgIGlmICghYy5Jc01pbmUpXHJcbiAgICAgICAgICAgICAgICB0aGF0LlNlbGVjdENlbGwoYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgVHJpZ2dlckF1dG9Mb3NlKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5HYW1lSXNQbGF5YWJsZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB0aGlzLlNlbGVjdENlbGwodGhpcy5fbWluZUNlbGxzWzBdKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBNSU5FU1dFRVBFUl9HQU1FX0NPTVBMRVRJT05fU1RBVEVTIH0gZnJvbSBcIi4vbWluZXN3ZWVwZXJjb25zdGFudHMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNaW5lc3dlZXBlckdhbWVHcmlkIHtcclxuICAgIGNvbnN0cnVjdG9yKCRyb290RWxlbWVudCwgZ2FtZVN0YXRlLCBsb2dVdGlsKSB7XHJcbiAgICAgICAgdGhpcy4kcm9vdEVsZW1lbnQgPSAkcm9vdEVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSBnYW1lU3RhdGU7ICBcclxuICAgICAgICB0aGlzLmxvZ1V0aWwgPSBsb2dVdGlsO1xyXG4gICAgfSBcclxuXHJcbiAgICAvLyBtZXRob2RzXHJcblxyXG4gICAgR2V0Q2VsbENsYXNzKGNlbGwpIHtcclxuICAgICAgICBpZiAoIWNlbGwuSXNSZXZlYWxlZCkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY2VsbC5Jc01hcmtlZClcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImhpZGRlbiBtYXJrZWRcIjtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBcImhpZGRlblwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNlbGwuSXNNaW5lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjZWxsLklzTG9zaW5nTWluZSA/IFwibWluZSB0cmlnZ2VyZWRcIiA6IFwibWluZSBcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGNlbGwuQWRqYWNlbnRNaW5lQ291bnQgPiAwKSBcclxuICAgICAgICAgICAgcmV0dXJuIGBvcGVuLSR7Y2VsbC5BZGphY2VudE1pbmVDb3VudH1gO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBcImNsZWFyXCI7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0Q2VsbENvbnRlbnQoY2VsbCkge1xyXG4gICAgICAgIGxldCBjZWxsR2x5cGggPSBjZWxsLklzUmV2ZWFsZWQgPyBcclxuICAgICAgICAoY2VsbC5Jc01pbmUgPyBcclxuICAgICAgICAgICAgXCLwn5KjXCIgOiBcclxuICAgICAgICAgICAgICAgIChjZWxsLkFkamFjZW50TWluZUNvdW50ID4gMCA/IGNlbGwuQWRqYWNlbnRNaW5lQ291bnQgOiBcIlwiKVxyXG4gICAgICAgICkgXHJcbiAgICAgICAgOiBcIlwiO1xyXG5cclxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9J2NlbGwtaW5uZXInPiR7Y2VsbEdseXBofTwvZGl2PmA7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0SW5pdGlhbENlbGxIdG1sKGNlbGxJZCkge1xyXG4gICAgICAgIGxldCBjZWxsID0gdGhpcy5nYW1lU3RhdGUuQ2VsbEJ5SWQoY2VsbElkKTtcclxuXHJcbiAgICAgICAgbGV0IGNlbGxDbGFzcyA9IHRoaXMuR2V0Q2VsbENsYXNzKGNlbGwpO1xyXG4gICAgICAgIGxldCBjZWxsQ29udGVudCA9IHRoaXMuR2V0Q2VsbENvbnRlbnQoY2VsbCk7XHJcblxyXG4gICAgICAgIHJldHVybiBgPHRkIGNsYXNzPSdjZWxsICR7Y2VsbENsYXNzfScgaWQ9JyR7Y2VsbElkfSc+JHtjZWxsQ29udGVudH08L3RkPmA7XHJcbiAgICB9XHJcblxyXG4gICAgUmVtb3ZlSGFuZGxlcnMoKSB7XHJcbiAgICAgICAgdGhpcy4kcm9vdEVsZW1lbnQuZmluZCgndGFibGUnKVxyXG4gICAgICAgICAgICAub2ZmKCdjb250ZXh0bWVudScpXHJcbiAgICAgICAgICAgIC5vZmYoJ2NsaWNrJyk7XHJcbiAgICB9XHJcblxyXG4gICAgQWRkSGFuZGxlcnMoKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyBhZGQgc3VwcHJlc3MgY29udGV4dCBtZW51XHJcbiAgICAgICAgdGhpcy4kcm9vdEVsZW1lbnQuZmluZCgndGFibGUnKS5vbignY29udGV4dG1lbnUnLCAndGQuY2VsbCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLndoaWNoID09IDMpIHtcclxuICAgICAgICAgICAgICAgIC8vIHJpZ2h0IG1vdXNlXHJcbiAgICAgICAgICAgICAgICB0aGF0LmdhbWVTdGF0ZS5NYXJrQ2VsbGJ5SWQoZS5jdXJyZW50VGFyZ2V0LmlkKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBhZGQgc2VsZWN0IGhhbmRsbGVyXHJcbiAgICAgICAgdGhpcy4kcm9vdEVsZW1lbnQuZmluZCgndGFibGUnKS5vbignY2xpY2snLCAndGQuY2VsbCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgaWYoZS53aGljaCA9PSAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBsZWZ0LW1vdXNlXHJcbiAgICAgICAgICAgICAgICB0aGF0LmdhbWVTdGF0ZS5TZWxlY3RDZWxsQnlJZChlLmN1cnJlbnRUYXJnZXQuaWQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgU3RhcnQoKSB7XHJcbiAgICAgICAgLy8gcmVtb3ZlIGFueSBleGlzdGluZyBoYW5kbGVyc1xyXG4gICAgICAgIHRoaXMuUmVtb3ZlSGFuZGxlcnMoKTtcclxuXHJcbiAgICAgICAgbGV0IHN0YWNrID0gW107XHJcblxyXG4gICAgICAgIC8vIHRlbXBsYXRlIGh0bWwgY2VsbCBjb250ZW50XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZ2FtZVN0YXRlLlNpemUuaGVpZ2h0OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHJvd0h0bWwgPSBcIjx0cj5cIjtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHRoaXMuZ2FtZVN0YXRlLlNpemUud2lkdGg7IGorKykgeyAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJvd0h0bWwgKz0gdGhpcy5HZXRJbml0aWFsQ2VsbEh0bWwoIGkgKyBcIl9cIiArIGopO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJvd0h0bWwgKz0gXCI8L3RyPlwiO1xyXG4gICAgICAgICAgICBzdGFjay5wdXNoKHJvd0h0bWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gcmVuZGVyXHJcbiAgICAgICAgdGhpcy4kcm9vdEVsZW1lbnQuaHRtbChgPHRhYmxlIGNsYXNzPScke3RoaXMuZ2FtZVN0YXRlLlNpemUubGFiZWx9Jz48dGJvZHk+JHtzdGFjay5qb2luKFwiXCIpfTwvdGJvZHk+PC90YWJsZT5gKTsgXHJcblxyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAvLyBhZGQgY2VsbCBzdGF0ZSBjaGFuZ2UgY2FsbGJhY2sgZm9yIHJlbmRlcmluZyBpbmRpdmlkdWFsIGNlbGxzXHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUuT25DZWxsU3RhdGVDaGFuZ2UgPSBmdW5jdGlvbihjZWxsKSB7XHJcbiAgICAgICAgICAgIC8vIHJlLXJlbmRlciB0aGUgY2VsbFxyXG4gICAgICAgICAgICB0aGF0LmxvZ1V0aWwuTG9nKGByZW5kZXIgY2VsbCAke2NlbGwuSWR9IGluIGdhbWUgd2l0aCBpZCAke3RoYXQuZ2FtZVN0YXRlLklkfWApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGNlbGxDbGFzcyA9IHRoYXQuR2V0Q2VsbENsYXNzKGNlbGwpO1xyXG4gICAgICAgICAgICBsZXQgY2VsbENvbnRlbnQgPSB0aGF0LkdldENlbGxDb250ZW50KGNlbGwpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJChgIyR7Y2VsbC5JZH1gKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKClcclxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhgY2VsbCAke2NlbGxDbGFzc31gKSBcclxuICAgICAgICAgICAgICAgIC5odG1sKGNlbGxDb250ZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBnYW1lIGNvbXBsZXRpb24gc3RhdGUgaGFuZGxlclxyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlLk9uR2FtZUNvbXBsZXRpb25TdGF0ZUNoYW5nZSA9IGZ1bmN0aW9uKGdhbWVDb21wbGV0aW9uU3RhdGUpIHtcclxuICAgICAgICAgICAgaWYgKGdhbWVDb21wbGV0aW9uU3RhdGUgPT0gTUlORVNXRUVQRVJfR0FNRV9DT01QTEVUSU9OX1NUQVRFUy5jb21wbGV0ZWQpXHJcbiAgICAgICAgICAgICAgICB0aGF0LiRyb290RWxlbWVudC5hcHBlbmQoXCI8ZGl2IGNsYXNzPSdlbmQtc3RhdGUnPjxpbWcgc3JjPScuL2ltZy93aW4uZ2lmJz48L2ltZz48L2Rpdj5cIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoZ2FtZUNvbXBsZXRpb25TdGF0ZSA9PSBNSU5FU1dFRVBFUl9HQU1FX0NPTVBMRVRJT05fU1RBVEVTLmZhaWxlZClcclxuICAgICAgICAgICAgICAgIHRoYXQuJHJvb3RFbGVtZW50LmFwcGVuZChcIjxkaXYgY2xhc3M9J2VuZC1zdGF0ZSc+PGltZyBzcmM9Jy4vaW1nL2xvc2UuZ2lmJz48L2ltZz48L2Rpdj5cIik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gYmluZCBoYW5kbGVyc1xyXG4gICAgICAgIHRoaXMuQWRkSGFuZGxlcnMoKTtcclxuICAgIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgTmF2aWdhdGlvbiB9IGZyb20gJy4vbmF2aWdhdGlvbi5qcyc7XHJcbmltcG9ydCB7IE1pbmVzd2VlcGVyIH0gZnJvbSAnLi4vbWluZXN3ZWVwZXIvbWluZXN3ZWVwZXJhcHAuanMnO1xyXG5cclxubGV0ICRyb290QXBwQ29udGFpbmVyID0gJyNhcHAtbWFpbic7XHJcblxyXG5uZXcgTmF2aWdhdGlvbigkKTtcclxuXHJcbi8vIHN0YXJ0IG1pbmVzd2VlcHJcclxubmV3IE1pbmVzd2VlcGVyKCQsICRyb290QXBwQ29udGFpbmVyKS5TdGFydCgpOyJdLCJzb3VyY2VSb290IjoiIn0=