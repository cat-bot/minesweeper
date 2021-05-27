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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9hcHB1dGlsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb3JlYXBwL2NvbmZpZy9jb25maWctZGV2LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb3JlYXBwL2dvb2dsZWF1dGhoYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb3JlYXBwL25hdmlnYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21pbmVzd2VlcGVyL21pbmVzd2VlcGVyYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9taW5lc3dlZXBlci9taW5lc3dlZXBlcmNvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbWluZXN3ZWVwZXIvbWluZXN3ZWVwZXJnYW1lY2VsbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbWluZXN3ZWVwZXIvbWluZXN3ZWVwZXJnYW1lc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21pbmVzd2VlcGVyL21pbmVzd2VlcGVyZ3JpZC5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXlEOztBQUVsRDtBQUNQO0FBQ0Esb0JBQW9CLHNFQUFhO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7O0FDWE87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0EsRTs7Ozs7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0Esc0JBQXNCLGdDQUFnQztBQUN0RDtBQUNBLDBCQUEwQiwrQkFBK0IsTztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0RBQWdELDBCQUEwQixXQUFXLGVBQWUsbUI7O0FBRXBHO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLFFBQVEsbUJBQW1CLGtCQUFrQjs7QUFFekY7QUFDQTs7QUFFQSxrQkFBa0IsUUFBUTtBQUMxQjtBQUNBLGtDQUFrQyxVQUFVO0FBQzVDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVDQUF1QyxrR0FBNEM7QUFDbkY7O0FBRUEsdUNBQXVDLCtGQUF5QztBQUNoRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7OztVQzdIQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7QUNONkM7QUFDa0I7O0FBRS9EOztBQUVBLElBQUksc0RBQVU7O0FBRWQ7QUFDQSxJQUFJLHVFQUFXLCtCIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudkNvbmZpZyB9IGZyb20gJy4vY29uZmlnL2NvbmZpZy1BUFBUQVJHRVQuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFwcFV0aWwge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fbG9nID0gRW52Q29uZmlnLmVudiA9PT0gXCJkZXZcIjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgTG9nKGVudHJ5KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xvZyAmJiBlbnRyeSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZW50cnkpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNvbnN0IEFwcEZpcmViYXNlQ29uZmlnID0ge1xyXG4gICAgYXBpS2V5OiBcIkFJemFTeUJpdGtEcjNvOGhKQmgtbG01dFpudHdtS2hUV2lTUEVwa1wiLFxyXG4gICAgYXV0aERvbWFpbjogXCJtZWluLXN3ZWVwZXItZDU5OTUuZmlyZWJhc2VhcHAuY29tXCIsXHJcbiAgICBwcm9qZWN0SWQ6IFwibWVpbi1zd2VlcGVyLWQ1OTk1XCIsXHJcbiAgICBzdG9yYWdlQnVja2V0OiBcIm1laW4tc3dlZXBlci1kNTk5NS5hcHBzcG90LmNvbVwiLFxyXG4gICAgbWVzc2FnaW5nU2VuZGVySWQ6IFwiNzAzOTMzNzI1Njg1XCIsXHJcbiAgICBhcHBJZDogXCIxOjcwMzkzMzcyNTY4NTp3ZWI6MmVlYmNlNWIxZDdhMTZlZmJhN2ViY1wiXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgRW52Q29uZmlnID0ge1xyXG4gICAgZW52OiBcImRldlwiXHJcbn07IiwiaW1wb3J0IHsgQXBwRmlyZWJhc2VDb25maWcgfSBmcm9tICcuL2NvbmZpZy9jb25maWctQVBQVEFSR0VULmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBHb29nbGVBdXRoSGFuZGxlciB7XHJcbiAgY29uc3RydWN0b3Iob25TaWduSW4sIG9uU2lnbk91dCkge1xyXG4gICAgdGhpcy5vblNpZ25JbiA9IG9uU2lnbkluO1xyXG4gICAgdGhpcy5vblNpZ25PdXQgPSBvblNpZ25PdXQ7XHJcblxyXG4gICAgLy8gSW5pdGlhbGl6ZSBGaXJlYmFzZSwgY29uZmlnIGRlZmluZWQgZWxzZXdoZXJlXHJcbiAgICBmaXJlYmFzZS5pbml0aWFsaXplQXBwKEFwcEZpcmViYXNlQ29uZmlnKTtcclxuICAgIFxyXG4gICAgLy8gdXNlIG9ubHkgZ29vZ1xyXG4gICAgdGhpcy5nX3Byb3ZpZGVyID0gbmV3IGZpcmViYXNlLmF1dGguR29vZ2xlQXV0aFByb3ZpZGVyKCk7XHJcbiAgICB0aGlzLmdfcHJvdmlkZXIuYWRkU2NvcGUoJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvdXNlcmluZm8ucHJvZmlsZScpO1xyXG4gICAgdGhpcy5nX3Byb3ZpZGVyLnNldEN1c3RvbVBhcmFtZXRlcnMoe1xyXG4gICAgICAnbG9naW5faGludCc6ICd1c2VyQGV4YW1wbGUuY29tJ1xyXG4gICAgfSk7IFxyXG5cclxuICAgIC8vIHNldCBhIGhhbmRsZXIgZm9yIHdoZW4gdG9rZW5zIGFyZSByZWNpZXZlZFxyXG4gICAgZmlyZWJhc2UuYXV0aCgpLm9uQXV0aFN0YXRlQ2hhbmdlZCh1c2VyPT57XHJcbiAgICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5GaXJlT25TaWduSW5IYW5kbGVyKHVzZXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyB0aGlzIGNhbiBmaXJlIHdoZW4gdGhlcmUgaXMgbm8gbG9nZ2VkIGluIHVzZXIgb24gbG9hZFxyXG4gICAgICAgICAgICB0aGlzLkZpcmVPblNpZ25PdXRIYW5kbGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBtZXRob2RzXHJcbiAgRmlyZU9uU2lnbkluSGFuZGxlcihvQXV0aFVzZXIpIHtcclxuICAgIGlmICh0aGlzLm9uU2lnbkluKSB7XHJcbiAgICAgIHRoaXMub25TaWduSW4ob0F1dGhVc2VyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEZpcmVPblNpZ25PdXRIYW5kbGVyKCkge1xyXG4gICAgaWYgKHRoaXMub25TaWduT3V0KSB7XHJcbiAgICAgIHRoaXMub25TaWduT3V0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBTaWduSW5Qb3B1cCgpIHtcclxuICAgIGZpcmViYXNlLmF1dGgoKS5zaWduSW5XaXRoUG9wdXAodGhpcy5nX3Byb3ZpZGVyKTtcclxuICB9XHJcblxyXG4gIFNpZ25JblJlZGlyZWN0KCkge1xyXG4gICAgZmlyZWJhc2UuYXV0aCgpLnNpZ25JbldpdGhSZWRpcmVjdCh0aGlzLmdfcHJvdmlkZXIpO1xyXG4gIH1cclxuXHJcbiAgU2lnbk91dCgpIHtcclxuICAgIGZpcmViYXNlLmF1dGgoKS5zaWduT3V0KCk7XHJcbiAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBHb29nbGVBdXRoSGFuZGxlciB9IGZyb20gJy4vZ29vZ2xlYXV0aGhhbmRsZXIuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb24ge1xyXG4gICAgY29uc3RydWN0b3IoJCkge1xyXG4gICAgICAgIHRoaXMubG9naW5VSSA9ICQoXCIjbG9naW4tdWktY29udGFpbmVyXCIpO1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy8gYmluZCBsb2cgaW5cclxuICAgICAgICAkKFwiI2xvZ2luLXByb21wdFwiKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7ICAgICBcclxuICAgICAgICAgICAgdGhhdC5hdXRoLlNpZ25JblJlZGlyZWN0KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIjbG9naW4tcHJvZmlsZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7ICAgICBcclxuICAgICAgICAgICAgdGhhdC5hdXRoLlNpZ25PdXQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fb25TaWduSW4gPSBmdW5jdGlvbihvQXV0aFVzZXIpIHtcclxuICAgICAgICAgICAgdGhhdC5sb2dpblVJXHJcbiAgICAgICAgICAgICAgICAuZmluZChcIiNsb2dpbi1wcm9tcHRcIilcclxuICAgICAgICAgICAgICAgIC50b2dnbGVDbGFzcygnZC1ub25lJylcclxuICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoXCIjbG9naW4tcHJvZmlsZVwiKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJ2ltZycpXHJcbiAgICAgICAgICAgICAgICAucHJvcCgnc3JjJywgb0F1dGhVc2VyLnBob3RvVVJMKVxyXG4gICAgICAgICAgICAgICAgLnByb3AoJ2FsdCcsICdsb2dnZWQgaW4gYXMgJyArIG9BdXRoVXNlci5kaXNwbGF5TmFtZSlcclxuICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgLnRvZ2dsZUNsYXNzKCdkLW5vbmUnKVxyXG4gICAgICAgICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignZGF0YS1zaWduZWQtaW4nLCAndHJ1ZScpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuX29uU2lnbk91dCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAodGhhdC5sb2dpblVJLmF0dHIoJ2RhdGEtc2lnbmVkLWluJykgPT0gJ2ZhbHNlJylcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgIFxyXG4gICAgICAgICAgICB0aGF0LmxvZ2luVUlcclxuICAgICAgICAgICAgICAgIC5maW5kKFwiI2xvZ2luLXByb2ZpbGVcIilcclxuICAgICAgICAgICAgICAgIC5maW5kKCdpbWcnKVxyXG4gICAgICAgICAgICAgICAgLnByb3AoJ3NyYycsICcnKVxyXG4gICAgICAgICAgICAgICAgLnByb3AoJ2FsdCcsICcnKVxyXG4gICAgICAgICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAgICAgICAudG9nZ2xlQ2xhc3MoJ2Qtbm9uZScpXHJcbiAgICAgICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgICAgIC5maW5kKFwiI2xvZ2luLXByb21wdFwiKVxyXG4gICAgICAgICAgICAgICAgLnRvZ2dsZUNsYXNzKCdkLW5vbmUnKVxyXG4gICAgICAgICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignZGF0YS1zaWduZWQtaW4nLCAnZmFsc2UnKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmF1dGggPSBuZXcgR29vZ2xlQXV0aEhhbmRsZXIodGhpcy5fb25TaWduSW4sIHRoaXMuX29uU2lnbk91dCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBBcHBVdGlsIH0gZnJvbSAnLi4vY29yZWFwcC9hcHB1dGlsLmpzJztcclxuaW1wb3J0IHsgTUlORVNXRUVQRVJfR1JJRF9TSVpFUyB9IGZyb20gJy4vbWluZXN3ZWVwZXJjb25zdGFudHMuanMnO1xyXG5pbXBvcnQgeyBNaW5lc3dlZXBlckdhbWVTdGF0ZSB9IGZyb20gJy4vbWluZXN3ZWVwZXJnYW1lc3RhdGUuanMnO1xyXG5pbXBvcnQgeyBNaW5lc3dlZXBlckdhbWVHcmlkIH0gZnJvbSAnLi9taW5lc3dlZXBlcmdyaWQuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1pbmVzd2VlcGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCQsIHJvb3RDb250YWluZXJTZWxlY3Rvcikge1xyXG4gICAgICAgIHRoaXMub3B0aW9uc1NlbGVjdG9yID0gJyNnYW1lLW9wdGlvbnMnO1xyXG4gICAgICAgIHRoaXMubmV3R2FtZVNlbGVjdG9yID0gJyNnZW5lcmF0ZS1nYW1lJztcclxuICAgICAgICB0aGlzLndpblNlbGVjdG9yID0gJyN3aW4tZ2FtZSc7XHJcbiAgICAgICAgdGhpcy5sb3NlU2VsZWN0b3IgPSAnI2xvc2UtZ2FtZSc7XHJcbiAgICAgICAgdGhpcy5ncmlkU2VsZWN0b3IgPSAnI2dyaWQnO1xyXG4gICAgICAgIHRoaXMucm9vdENvbnRhaW5lclNlbGVjdG9yID0gcm9vdENvbnRhaW5lclNlbGVjdG9yO1xyXG5cclxuICAgICAgICB0aGlzLnRlbXBsYXRlID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPSdhcHAtY29udGFpbmVyIGNvbnRhaW5lci1zbSc+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdjb250cm9sLWNvbnRhaW5lciByb3cnPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nY29sLTEyIGNvbC1zbS00IHAtMSBwLXNtLTMgZy1zbS0yJz5cclxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGlkPSdnYW1lLW9wdGlvbnMnIGNsYXNzPSdmb3JtLXNlbGVjdCc+PC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2NvbC0xMiBjb2wtc20tOCBwLTEgcC1zbS0zIGctc20tMic+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiBpZD0nZ2VuZXJhdGUtZ2FtZScgdmFsdWU9J25ldyBnYW1lJyBjbGFzcz0nYnRuIGJ0bi1vdXRsaW5lLXByaW1hcnknPjwvaW5wdXQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nYnRuLWdyb3VwJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiBpZD0nd2luLWdhbWUnIHZhbHVlPSdhdXRvIHdpbicgY2xhc3M9J2J0biBidG4tb3V0bGluZS1zZWNvbmRhcnknPjwvaW5wdXQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgaWQ9J2xvc2UtZ2FtZScgdmFsdWU9J2F1dG8gbG9zZScgY2xhc3M9J2J0biBidG4tb3V0bGluZS1zZWNvbmRhcnknPjwvaW5wdXQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9J2dyaWQtY29udGFpbmVyIHJvdyc+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPSdncmlkJyBjbGFzcz0nZ3JpZCBjb2wtMTIgdXNlci1zZWxlY3Qtbm9uZSBweS00IHB4LTAnPjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgLy8gbWV0aG9kc1xyXG4gICAgSW5pdENvbnRyb2xzKCkge1xyXG4gICAgICAgICQodGhpcy5yb290Q29udGFpbmVyU2VsZWN0b3IpLmh0bWwodGhpcy50ZW1wbGF0ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0ICRzZWxlY3QgPSAkKHRoaXMub3B0aW9uc1NlbGVjdG9yKTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gTUlORVNXRUVQRVJfR1JJRF9TSVpFUylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgICRzZWxlY3QuYXBwZW5kKCQoJzxvcHRpb24+JywgeyBcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBrZXksXHJcbiAgICAgICAgICAgICAgICB0ZXh0IDogYCR7a2V5fSAoJHtNSU5FU1dFRVBFUl9HUklEX1NJWkVTW2tleV0ud2lkdGh9eCR7TUlORVNXRUVQRVJfR1JJRF9TSVpFU1trZXldLmhlaWdodH0sICR7TUlORVNXRUVQRVJfR1JJRF9TSVpFU1trZXldLm1pbmVzfSBtaW5lcylgIFxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBiaW5kIGdhbWUgZ2VuZXJhdGlvbiBoYW5kbGVyc1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAkKHRoaXMubmV3R2FtZVNlbGVjdG9yKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7ICAgICAgIFxyXG4gICAgICAgICAgICB0aGF0LkdlbmVyYXRlTmV3R2FtZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIEdlbmVyYXRlTmV3R2FtZSgpIHtcclxuICAgICAgICBsZXQgdXRpbCA9IG5ldyBBcHBVdGlsKCk7XHJcbiAgICAgICAgbGV0ICRzZWxlY3QgPSAkKHRoaXMub3B0aW9uc1NlbGVjdG9yKTtcclxuICAgICAgICBsZXQgc2VsZWN0ZWQgPSAkc2VsZWN0LmZpbmQoXCJvcHRpb246c2VsZWN0ZWRcIikudmFsKCk7XHJcbiAgICAgICAgbGV0IHNpemUgPSBNSU5FU1dFRVBFUl9HUklEX1NJWkVTW3NlbGVjdGVkXTtcclxuICAgICAgICBcclxuICAgICAgICB1dGlsLkxvZyhgZ2VuZXJhdGUgbmV3ICR7c2l6ZS53aWR0aH14JHtzaXplLmhlaWdodH0gZ2FtZWApOyAgXHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBuZXcgZ2FtZSBzdGF0ZVxyXG4gICAgICAgIGxldCBnYW1lU3RhdGUgPSBuZXcgTWluZXN3ZWVwZXJHYW1lU3RhdGUoc2l6ZSwgdXRpbCk7XHJcblxyXG4gICAgICAgICQodGhpcy53aW5TZWxlY3Rvcikub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHsgICAgICAgXHJcbiAgICAgICAgICAgIGdhbWVTdGF0ZS5UcmlnZ2VyQXV0b1dpbigpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKHRoaXMubG9zZVNlbGVjdG9yKS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkgeyAgICAgICBcclxuICAgICAgICAgICAgZ2FtZVN0YXRlLlRyaWdnZXJBdXRvTG9zZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgbmV3IHVpXHJcbiAgICAgICAgbmV3IE1pbmVzd2VlcGVyR2FtZUdyaWQoJCh0aGlzLmdyaWRTZWxlY3RvciksIGdhbWVTdGF0ZSwgdXRpbCkuU3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBTdGFydCgpIHtcclxuICAgICAgICB0aGlzLkluaXRDb250cm9scygpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNvbnN0IE1JTkVTV0VFUEVSX0dSSURfU0laRVMgPSB7XHJcbiAgICBiZWdpbm5lciA6IHsgd2lkdGg6IDksIGhlaWdodDogOSwgbWluZXM6IDEwLCBsYWJlbDogXCJiZWdpbm5lclwifSxcclxuICAgIGludGVybWVkaWF0ZTogeyB3aWR0aDogMTYsIGhlaWdodDogMTYsIG1pbmVzOiA0MCwgbGFiZWw6IFwiaW50ZXJtZWRpYXRlXCJ9LFxyXG4gICAgZXhwZXJ0OiB7IHdpZHRoOiAxNiwgaGVpZ2h0OiAyNiwgbWluZXM6IDg2LCBsYWJlbDogXCJleHBlcnRcIn0sXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgTUlORVNXRUVQRVJfR0FNRV9DT01QTEVUSU9OX1NUQVRFUyA9IHtcclxuICAgIHN0YXJ0ZWQ6IDAsXHJcbiAgICBjb21wbGV0ZWQ6IDEsXHJcbiAgICBmYWlsZWQ6IDJcclxufTtcclxuIiwiZXhwb3J0IGNsYXNzIE1pbmVzd2VlcGVyR2FtZUNlbGwge1xyXG4gICAgY29uc3RydWN0b3IoaSwgaiwgZ2FtZSkge1xyXG4gICAgICAgIHRoaXMuX2lkID0gYCR7aSArIFwiX1wiICsgan1gO1xyXG4gICAgICAgIHRoaXMuX2FkamFjZW50TWluZUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9pc01pbmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9pc0xvc2luZ01pbmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9pc1JldmVhbGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5faXNNYXJrZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9nYW1lID0gZ2FtZTtcclxuICAgICAgICB0aGlzLmkgPSBpO1xyXG4gICAgICAgIHRoaXMuaiA9IGo7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZ2V0dGVyc1xyXG4gICAgZ2V0IElkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcclxuICAgIH1cclxuICAgIGdldCBBZGphY2VudE1pbmVDb3VudCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYWRqYWNlbnRNaW5lQ291bnQ7XHJcbiAgICB9XHJcbiAgICBnZXQgSXNNaW5lKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc01pbmU7XHJcbiAgICB9XHJcbiAgICBnZXQgSXNMb3NpbmdNaW5lKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc0xvc2luZ01pbmU7XHJcbiAgICB9XHJcbiAgICBnZXQgSXNSZXZlYWxlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNSZXZlYWxlZDtcclxuICAgIH0gXHJcbiAgICBnZXQgSXNNYXJrZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzTWFya2VkO1xyXG4gICAgfSBcclxuICAgIGdldCByb3dJbmRleCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pO1xyXG4gICAgfVxyXG4gICAgZ2V0IGNvbEluZGV4KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmo7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIG1ldGhvZHNcclxuICAgIEluY3JlbWVudEFkamFjZW50TWluZUNvdW50KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9nYW1lLkdhbWVJc1BsYXlhYmxlKVxyXG4gICAgICAgICAgICB0aGlzLl9hZGphY2VudE1pbmVDb3VudCsrO1xyXG4gICAgfVxyXG4gICAgU2V0SXNNaW5lKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9nYW1lLkdhbWVJc1BsYXlhYmxlKVxyXG4gICAgICAgICAgICB0aGlzLl9pc01pbmUgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgU2V0SXNMb3NpbmdNaW5lKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9nYW1lLkdhbWVJc1BsYXlhYmxlKVxyXG4gICAgICAgICAgICB0aGlzLl9pc0xvc2luZ01pbmUgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgU2V0SXNSZXZlYWxlZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fZ2FtZS5HYW1lSXNQbGF5YWJsZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pc1JldmVhbGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIG5vIG5lZWQgZm9yIGl0IHRvIGJlIG1hcmtlZCBhbnkgbW9yZVxyXG4gICAgICAgICAgICB0aGlzLl9pc01hcmtlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0gIFxyXG4gICAgU2V0SXNNYXJrZWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2dhbWUuR2FtZUlzUGxheWFibGUpIFxyXG4gICAgICAgICAgICB0aGlzLl9pc01hcmtlZCA9IHRydWU7XHJcbiAgICB9IFxyXG59IiwiaW1wb3J0IHsgTWluZXN3ZWVwZXJHYW1lQ2VsbCB9IGZyb20gXCIuL21pbmVzd2VlcGVyZ2FtZWNlbGwuanNcIjtcclxuaW1wb3J0IHsgTUlORVNXRUVQRVJfR0FNRV9DT01QTEVUSU9OX1NUQVRFUyB9IGZyb20gXCIuL21pbmVzd2VlcGVyY29uc3RhbnRzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTWluZXN3ZWVwZXJHYW1lU3RhdGUge1xyXG4gICAgY29uc3RydWN0b3Ioc2l6ZSwgbG9ndXRpbCkge1xyXG4gICAgICAgIC8vIHN0YXRlXHJcbiAgICAgICAgdGhpcy5fbG9va3VwID0ge307XHJcbiAgICAgICAgdGhpcy5faWQgPSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKTtcclxuICAgICAgICB0aGlzLl9jZWxscyA9IFtdOyBcclxuICAgICAgICB0aGlzLl9taW5lQ2VsbHMgPSBbXTtcclxuICAgICAgICB0aGlzLl9zaXplID0gc2l6ZTsgXHJcbiAgICAgICAgdGhpcy5fZ2FtZUNvbXBsZXRpb25TdGF0ZSA9IE1JTkVTV0VFUEVSX0dBTUVfQ09NUExFVElPTl9TVEFURVMuc3RhcnRlZDtcclxuICAgICAgICB0aGlzLl91dGlsID0gbG9ndXRpbDtcclxuXHJcbiAgICAgICAgLy8gdHJhY2sgY2xlYXJlZCBjZWxscyB2cyB0b3RhbCBjZWxscyBuZWVkZWQgdG8gd2luXHJcbiAgICAgICAgdGhpcy5fdG90YWxDZWxsQ291bnRUb1dpbiA9IHNpemUud2lkdGgqc2l6ZS5oZWlnaHQgLSBzaXplLm1pbmVzO1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRDZWxsQ291bnQgPSAwO1xyXG5cclxuICAgICAgICAvLyBmb3IgZGlhYmxpbmcgdGhlIGdhbWVcclxuICAgICAgICB0aGlzLl9nYW1lRGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3NcclxuICAgICAgICB0aGlzLl9vbkNlbGxTdGF0ZUNoYW5nZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLl9vbkdhbWVDb21wbGV0aW9uU3RhdGVDaGFuZ2UgPSB1bmRlZmluZWQ7XHJcbiBcclxuICAgICAgICAvLyBpbml0LCBzdGFydGluZyB3aXRoIGNlbGxzIHdpdGggZ2VuZXJpYyB2YWx1ZXNcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fc2l6ZS5oZWlnaHQ7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcm93ID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5fc2l6ZS53aWR0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3Q2VsbCA9IG5ldyBNaW5lc3dlZXBlckdhbWVDZWxsKGksIGosIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld0NlbGxJZCA9IG5ld0NlbGwuSWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb29rdXBbbmV3Q2VsbElkXSA9IG5ld0NlbGw7XHJcbiAgICAgICAgICAgICAgICByb3cucHVzaChuZXdDZWxsKTsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fY2VsbHMucHVzaChyb3cpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gc3ByaW5rbGUgbWluZXNcclxuICAgICAgICBsZXQgbWluZXMgPSBfLnNhbXBsZVNpemUoXy5yYW5nZSgwLCB0aGlzLl9zaXplLndpZHRoKnRoaXMuX3NpemUuaGVpZ2h0IC0gMSksIHRoaXMuX3NpemUubWluZXMpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IG1pbmVzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIGxldCByb3dJbmRleCA9IF8uZmxvb3IobWluZXNba10vdGhpcy5fc2l6ZS53aWR0aCk7XHJcbiAgICAgICAgICAgIGxldCBjb2xJbmRleCA9IG1pbmVzW2tdICUgdGhpcy5fc2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgbGV0IG1pbmVDZWxsID0gdGhpcy5fbG9va3VwW2Ake3Jvd0luZGV4ICsgXCJfXCIgKyBjb2xJbmRleH1gXTtcclxuXHJcbiAgICAgICAgICAgIG1pbmVDZWxsLlNldElzTWluZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9taW5lQ2VsbHMucHVzaChtaW5lQ2VsbCk7ICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB1cGRhdGUgYWRqYWNlbnQgbWluZSBjb3VudCBieSBpdGVyYXRpbmcgYWxsIG1pbmVzXHJcbiAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBtaW5lcy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICBsZXQgcm93SW5kZXggPSBfLmZsb29yKG1pbmVzW2tdL3RoaXMuX3NpemUud2lkdGgpO1xyXG4gICAgICAgICAgICBsZXQgY29sSW5kZXggPSBtaW5lc1trXSAlIHRoaXMuX3NpemUud2lkdGg7XHJcblxyXG4gICAgICAgICAgICBsZXQgb3RoZXJDb29yZHMgPSB0aGlzLkdlbmVyYXRlQWRqYWNlbnRDZWxscyhyb3dJbmRleCwgY29sSW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgLy8gZm9yZWFjaCBhZGphY2VudCwgaWYgaXQgaXNudCBhbHNvIGEgbWluZSwgaW5jcmVtZW50IGl0cyBhZGphY2VudCBtaW5lIGNvdW50XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgb3RoZXJDb29yZHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBhZGphY2VudENlbGwgPSB0aGlzLl9sb29rdXBbYCR7b3RoZXJDb29yZHNbal0ueSArIFwiX1wiICsgb3RoZXJDb29yZHNbal0ueH1gXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWFkamFjZW50Q2VsbC5Jc01pbmUpXHJcbiAgICAgICAgICAgICAgICAgICAgYWRqYWNlbnRDZWxsLkluY3JlbWVudEFkamFjZW50TWluZUNvdW50KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3V0aWwuTG9nKGBuZXcgZ2FtZSBnZW5lcmF0ZWRgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBnZXR0ZXJzXHJcbiAgICBnZXQgR2FtZUlzUGxheWFibGUoKSB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLl9nYW1lRGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IEdhbWVJc1dvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2FtZUNvbXBsZXRpb25TdGF0ZSA9PSBNSU5FU1dFRVBFUl9HQU1FX0NPTVBMRVRJT05fU1RBVEVTLmNvbXBsZXRlZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgU2l6ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgSWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBHYW1lQ29tcGxldGlvblN0YXRlKGdhbWVDb21wbGV0aW9uU3RhdGUpIHtcclxuICAgICAgICB0aGlzLl9nYW1lQ29tcGxldGlvblN0YXRlID0gZ2FtZUNvbXBsZXRpb25TdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgT25DZWxsU3RhdGVDaGFuZ2UoZm4pIHtcclxuICAgICAgICB0aGlzLl9vbkNlbGxTdGF0ZUNoYW5nZSA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBHYW1lRGlzYWJsZWQoZGlzYWJsZWQpIHtcclxuICAgICAgICB0aGlzLl9nYW1lRGlzYWJsZWQgPSBkaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgT25HYW1lQ29tcGxldGlvblN0YXRlQ2hhbmdlKGZuKSB7XHJcbiAgICAgICAgdGhpcy5fb25HYW1lQ29tcGxldGlvblN0YXRlQ2hhbmdlID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgR2VuZXJhdGVBZGphY2VudENlbGxzKHJvd0luZGV4LCBjb2xJbmRleCkge1xyXG4gICAgICAgIC8vIGdlbmVyYXRlIDggYWRqYWNlbnQgY28tb3JkcywgY2xhbXBlZCB0byBpbi1ib3VuZHNcclxuICAgICAgICBsZXQgb3RoZXJDb29yZHMgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKHJvd0luZGV4IC0gMSA+PSAwKSB7XHJcbiAgICAgICAgICAgIGlmIChjb2xJbmRleCAtIDEgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgb3RoZXJDb29yZHMucHVzaCh7eDogY29sSW5kZXgtMSwgeTpyb3dJbmRleC0xfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG90aGVyQ29vcmRzLnB1c2goe3g6IGNvbEluZGV4LCB5OnJvd0luZGV4LTF9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb2xJbmRleCArIDEgPCB0aGlzLl9zaXplLndpZHRoKVxyXG4gICAgICAgICAgICAgICAgb3RoZXJDb29yZHMucHVzaCh7eDogY29sSW5kZXgrMSwgeTpyb3dJbmRleC0xfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChjb2xJbmRleCAtIDEgPj0gMCkgXHJcbiAgICAgICAgICAgIG90aGVyQ29vcmRzLnB1c2goe3g6IGNvbEluZGV4LTEsIHk6cm93SW5kZXh9KTtcclxuXHJcbiAgICAgICAgaWYgKGNvbEluZGV4ICsgMSA8IHRoaXMuX3NpemUud2lkdGgpXHJcbiAgICAgICAgICAgIG90aGVyQ29vcmRzLnB1c2goe3g6IGNvbEluZGV4KzEsIHk6cm93SW5kZXh9KTtcclxuXHJcbiAgICAgICAgaWYgKHJvd0luZGV4ICsgMSA8IHRoaXMuX3NpemUuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIGlmIChjb2xJbmRleCAtIDEgPj0gMCkgXHJcbiAgICAgICAgICAgICAgICBvdGhlckNvb3Jkcy5wdXNoKHt4OiBjb2xJbmRleC0xLCB5OnJvd0luZGV4KzF9KTtcclxuXHJcbiAgICAgICAgICAgIG90aGVyQ29vcmRzLnB1c2goe3g6IGNvbEluZGV4LCB5OnJvd0luZGV4KzF9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb2xJbmRleCArIDEgPCB0aGlzLl9zaXplLndpZHRoKVxyXG4gICAgICAgICAgICAgICAgb3RoZXJDb29yZHMucHVzaCh7eDogY29sSW5kZXgrMSwgeTpyb3dJbmRleCsxfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3RoZXJDb29yZHM7XHJcbiAgICB9XHJcblxyXG4gICAgQ2VsbEJ5SWQoY2VsbElkKSB7XHJcbiAgICAgICAgbGV0IGNlbGwgPSB0aGlzLl9sb29rdXBbY2VsbElkXTtcclxuXHJcbiAgICAgICAgaWYgKGNlbGwgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgdGhyb3cgYGNlbGwgd2l0aCBpZCAke2NlbGxJZH0gY291bGQgbm90IGJlIGZvdW5kYDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNlbGw7XHJcbiAgICB9XHJcblxyXG4gICAgUmV2ZWFsQWxsTWluZXMgKCkge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICBfLmZvckVhY2godGhpcy5fbWluZUNlbGxzLCBmdW5jdGlvbihjZWxsKSB7XHJcbiAgICAgICAgICAgIGlmICghY2VsbC5Jc1JldmVhbGVkKVxyXG4gICAgICAgICAgICAgICAgY2VsbC5TZXRJc1JldmVhbGVkKCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LkZpcmVDZWxsU3RhdGVDaGFuZ2UoY2VsbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgQXR0ZW1wdEF1dG9GaWxsKGNlbGwpIHtcclxuICAgICAgICBsZXQgYXV0b0ZpbGxzID0gdGhpcy5HZXRBZGphY2VudE5vbk1pbmVOb25SZXZlYWxlZENlbGxzKGNlbGwpO1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgXy5mb3JFYWNoKGF1dG9GaWxscywgZnVuY3Rpb24oYykge1xyXG4gICAgICAgICAgICB0aGF0LlNlbGVjdENlbGwoYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0QWRqYWNlbnROb25NaW5lTm9uUmV2ZWFsZWRDZWxscyhjZWxsKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGxldCBhZGpDZWxsSW5kaWNlcyA9IHRoaXMuR2VuZXJhdGVBZGphY2VudENlbGxzKGNlbGwucm93SW5kZXgsIGNlbGwuY29sSW5kZXgpO1xyXG4gICAgICAgIGxldCBhZGpDZWxscyA9IFtdO1xyXG4gICAgICAgIF8uZm9yRWFjaChhZGpDZWxsSW5kaWNlcywgZnVuY3Rpb24oYykge1xyXG4gICAgICAgICAgICBsZXQgYWRqYWNlbnRDZWxsID0gdGhhdC5DZWxsQnlJZChgJHtjLnkgKyBcIl9cIiArIGMueH1gKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghYWRqYWNlbnRDZWxsLklzTWluZSAmJiAhYWRqYWNlbnRDZWxsLklzUmV2ZWFsZWQpXHJcbiAgICAgICAgICAgICAgICBhZGpDZWxscy5wdXNoKGFkamFjZW50Q2VsbCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBhZGpDZWxscztcclxuICAgIH1cclxuXHJcbiAgICBGaXJlQ2VsbFN0YXRlQ2hhbmdlIChjaGFuZ2VkQ2VsbCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9vbkNlbGxTdGF0ZUNoYW5nZSlcclxuICAgICAgICAgICAgdGhpcy5fb25DZWxsU3RhdGVDaGFuZ2UoY2hhbmdlZENlbGwpO1xyXG4gICAgfVxyXG5cclxuICAgIEZpcmVHYW1lQ29tcGxldGlvblN0YXRlQ2hhbmdlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9vbkdhbWVDb21wbGV0aW9uU3RhdGVDaGFuZ2UpXHJcbiAgICAgICAgICAgIHRoaXMuX29uR2FtZUNvbXBsZXRpb25TdGF0ZUNoYW5nZSh0aGlzLl9nYW1lQ29tcGxldGlvblN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBNYXJrQ2VsbChjZWxsKSB7XHJcbiAgICAgICAgdGhpcy5fdXRpbC5Mb2coYG1hcmsgY2VsbCBpZCAke2NlbGwuSWR9YCk7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5HYW1lSXNQbGF5YWJsZSkge1xyXG4gICAgICAgICAgICAvLyBkb24ndCBkbyBhbnl0aGluZ1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWNlbGwuSXNSZXZlYWxlZCkge1xyXG5cclxuICAgICAgICAgICAgY2VsbC5TZXRJc01hcmtlZCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gdHJpZ2dlciBpdCB0byByZS1yZW5kZXJcclxuICAgICAgICAgICAgdGhpcy5GaXJlQ2VsbFN0YXRlQ2hhbmdlKGNlbGwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBNYXJrQ2VsbGJ5SWQoY2VsbElkKSB7XHJcbiAgICAgICAgbGV0IGNlbGwgPSB0aGlzLkNlbGxCeUlkKGNlbGxJZCk7ICAgICAgIFxyXG5cclxuICAgICAgICB0aGlzLk1hcmtDZWxsKGNlbGwpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBTZWxlY3RDZWxsKGNlbGwpIHtcclxuICAgICAgICB0aGlzLl91dGlsLkxvZyhgc2VsZWN0IGNlbGwgaWQgJHtjZWxsLklkfWApO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuR2FtZUlzUGxheWFibGUpIHtcclxuICAgICAgICAgICAgLy8gZG9uJ3QgZG8gYW55dGhpbmdcclxuICAgICAgICAgICAgdGhpcy5fdXRpbC5Mb2coYGdhbWUgaGFzIGFscmVhZHkgYmVlbiAke3RoaXMuX2dhbWVDb21wbGV0aW9uU3RhdGUgPT0gTUlORVNXRUVQRVJfR0FNRV9DT01QTEVUSU9OX1NUQVRFUy5jb21wbGV0ZWQgPyBcIndvbiFcIiA6IFwibG9zdCFcIn1gKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFjZWxsLklzUmV2ZWFsZWQpIHtcclxuICAgICAgICAgICAgLy8gcmV2ZWFsIHRoaXMgY2VsbFxyXG4gICAgICAgICAgICBjZWxsLlNldElzUmV2ZWFsZWQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRyaWdnZXIgaXQgdG8gcmUtcmVuZGVyXHJcbiAgICAgICAgICAgIHRoaXMuRmlyZUNlbGxTdGF0ZUNoYW5nZShjZWxsKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjZWxsLklzTWluZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gb2ggb2hoLCBsb3N0XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gbWFyayB0aGlzIG1pbmUgYXMgdGhlIG9uZSBoaXRcclxuICAgICAgICAgICAgICAgIGNlbGwuU2V0SXNMb3NpbmdNaW5lKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkdhbWVDb21wbGV0aW9uU3RhdGUgPSBNSU5FU1dFRVBFUl9HQU1FX0NPTVBMRVRJT05fU1RBVEVTLmZhaWxlZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmV2ZWFsQWxsTWluZXMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZURpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3V0aWwuTG9nKGBwbGF5ZXIgaGFzIGxvc3QhYCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkZpcmVHYW1lQ29tcGxldGlvblN0YXRlQ2hhbmdlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9ICAgXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8geWF5LCB5b3UgY2xlYXJlZCBvbmVcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRDZWxsQ291bnQrKztcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBwbGF5ZXIgaGFzIHdvblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRDZWxsQ291bnQgPT0gdGhpcy5fdG90YWxDZWxsQ291bnRUb1dpbikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHlheVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuR2FtZUNvbXBsZXRpb25TdGF0ZSA9IE1JTkVTV0VFUEVSX0dBTUVfQ09NUExFVElPTl9TVEFURVMuY29tcGxldGVkO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUmV2ZWFsQWxsTWluZXMoKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5HYW1lRGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3V0aWwuTG9nKGBwbGF5ZXIgaGFzIHdvbiFgKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkZpcmVHYW1lQ29tcGxldGlvblN0YXRlQ2hhbmdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gb3RoZXJ3aXNlLCBjZWxsIGlzIG5vdCBhIG1pbmUsIHBsYXllciBoYXMgbm90IHlldCB3b24sIHNvIGF0dGVtcHQgdG8gYXV0b2ZpbGwgaWYgdGhlIGNlbGwgaXMgYmxhbmtcclxuICAgICAgICAgICAgaWYgKGNlbGwuQWRqYWNlbnRNaW5lQ291bnQgPT0gMCkgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgdGhpcy5BdHRlbXB0QXV0b0ZpbGwoY2VsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgU2VsZWN0Q2VsbEJ5SWQoY2VsbElkKSB7XHJcbiAgICAgICAgbGV0IGNlbGwgPSB0aGlzLkNlbGxCeUlkKGNlbGxJZCk7ICAgICAgIFxyXG5cclxuICAgICAgICB0aGlzLlNlbGVjdENlbGwoY2VsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgVHJpZ2dlckF1dG9XaW4oKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLkdhbWVJc1BsYXlhYmxlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBhbGxDZWxscyA9IF8uZmxhdHRlbih0aGlzLl9jZWxscyk7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIF8uZm9yRWFjaChhbGxDZWxscywgZnVuY3Rpb24oYykge1xyXG4gICAgICAgICAgICBpZiAoIWMuSXNNaW5lKVxyXG4gICAgICAgICAgICAgICAgdGhhdC5TZWxlY3RDZWxsKGMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIFRyaWdnZXJBdXRvTG9zZSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuR2FtZUlzUGxheWFibGUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy5TZWxlY3RDZWxsKHRoaXMuX21pbmVDZWxsc1swXSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTUlORVNXRUVQRVJfR0FNRV9DT01QTEVUSU9OX1NUQVRFUyB9IGZyb20gXCIuL21pbmVzd2VlcGVyY29uc3RhbnRzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTWluZXN3ZWVwZXJHYW1lR3JpZCB7XHJcbiAgICBjb25zdHJ1Y3Rvcigkcm9vdEVsZW1lbnQsIGdhbWVTdGF0ZSwgbG9nVXRpbCkge1xyXG4gICAgICAgIHRoaXMuJHJvb3RFbGVtZW50ID0gJHJvb3RFbGVtZW50O1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gZ2FtZVN0YXRlOyAgXHJcbiAgICAgICAgdGhpcy5sb2dVdGlsID0gbG9nVXRpbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBtZXRob2RzXHJcblxyXG4gICAgR2V0Q2VsbENsYXNzKGNlbGwpIHtcclxuICAgICAgICBpZiAoIWNlbGwuSXNSZXZlYWxlZCkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY2VsbC5Jc01hcmtlZClcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImhpZGRlbiBtYXJrZWRcIjtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBcImhpZGRlblwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNlbGwuSXNNaW5lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjZWxsLklzTG9zaW5nTWluZSA/IFwibWluZSB0cmlnZ2VyZWRcIiA6IFwibWluZSBcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGNlbGwuQWRqYWNlbnRNaW5lQ291bnQgPiAwKSBcclxuICAgICAgICAgICAgcmV0dXJuIGBvcGVuLSR7Y2VsbC5BZGphY2VudE1pbmVDb3VudH1gO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBcImNsZWFyXCI7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0Q2VsbENvbnRlbnQoY2VsbCkge1xyXG4gICAgICAgIGxldCBjZWxsR2x5cGggPSBjZWxsLklzUmV2ZWFsZWQgPyBcclxuICAgICAgICAoY2VsbC5Jc01pbmUgPyBcclxuICAgICAgICAgICAgXCLwn5KjXCIgOiBcclxuICAgICAgICAgICAgICAgIChjZWxsLkFkamFjZW50TWluZUNvdW50ID4gMCA/IGNlbGwuQWRqYWNlbnRNaW5lQ291bnQgOiBcIlwiKVxyXG4gICAgICAgICkgXHJcbiAgICAgICAgOiBcIlwiO1xyXG5cclxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9J2NlbGwtaW5uZXInPiR7Y2VsbEdseXBofTwvZGl2PmA7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0SW5pdGlhbENlbGxIdG1sKGNlbGxJZCkge1xyXG4gICAgICAgIGxldCBjZWxsID0gdGhpcy5nYW1lU3RhdGUuQ2VsbEJ5SWQoY2VsbElkKTtcclxuXHJcbiAgICAgICAgbGV0IGNlbGxDbGFzcyA9IHRoaXMuR2V0Q2VsbENsYXNzKGNlbGwpO1xyXG4gICAgICAgIGxldCBjZWxsQ29udGVudCA9IHRoaXMuR2V0Q2VsbENvbnRlbnQoY2VsbCk7XHJcblxyXG4gICAgICAgIHJldHVybiBgPHRkIGNsYXNzPSdjZWxsICR7Y2VsbENsYXNzfScgaWQ9JyR7Y2VsbElkfSc+JHtjZWxsQ29udGVudH08L3RkPmA7XHJcbiAgICB9XHJcblxyXG4gICAgUmVtb3ZlSGFuZGxlcnMoKSB7XHJcbiAgICAgICAgdGhpcy4kcm9vdEVsZW1lbnQuZmluZCgndGFibGUnKVxyXG4gICAgICAgICAgICAub2ZmKCdjb250ZXh0bWVudScpXHJcbiAgICAgICAgICAgIC5vZmYoJ2NsaWNrJyk7XHJcbiAgICB9XHJcblxyXG4gICAgQWRkSGFuZGxlcnMoKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyBhZGQgc3VwcHJlc3MgY29udGV4dCBtZW51XHJcbiAgICAgICAgdGhpcy4kcm9vdEVsZW1lbnQuZmluZCgndGFibGUnKS5vbignY29udGV4dG1lbnUnLCAndGQuY2VsbCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLndoaWNoID09IDMpIHtcclxuICAgICAgICAgICAgICAgIC8vIHJpZ2h0IG1vdXNlXHJcbiAgICAgICAgICAgICAgICB0aGF0LmdhbWVTdGF0ZS5NYXJrQ2VsbGJ5SWQoZS5jdXJyZW50VGFyZ2V0LmlkKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBhZGQgc2VsZWN0IGhhbmRsbGVyXHJcbiAgICAgICAgdGhpcy4kcm9vdEVsZW1lbnQuZmluZCgndGFibGUnKS5vbignY2xpY2snLCAndGQuY2VsbCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgaWYoZS53aGljaCA9PSAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBsZWZ0LW1vdXNlXHJcbiAgICAgICAgICAgICAgICB0aGF0LmdhbWVTdGF0ZS5TZWxlY3RDZWxsQnlJZChlLmN1cnJlbnRUYXJnZXQuaWQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgU3RhcnQoKSB7XHJcbiAgICAgICAgLy8gcmVtb3ZlIGFueSBleGlzdGluZyBoYW5kbGVyc1xyXG4gICAgICAgIHRoaXMuUmVtb3ZlSGFuZGxlcnMoKTtcclxuXHJcbiAgICAgICAgbGV0IHN0YWNrID0gW107XHJcblxyXG4gICAgICAgIC8vIHRlbXBsYXRlIGh0bWwgY2VsbCBjb250ZW50XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZ2FtZVN0YXRlLlNpemUuaGVpZ2h0OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHJvd0h0bWwgPSBcIjx0cj5cIjtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHRoaXMuZ2FtZVN0YXRlLlNpemUud2lkdGg7IGorKykgeyAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJvd0h0bWwgKz0gdGhpcy5HZXRJbml0aWFsQ2VsbEh0bWwoIGkgKyBcIl9cIiArIGopO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJvd0h0bWwgKz0gXCI8L3RyPlwiO1xyXG4gICAgICAgICAgICBzdGFjay5wdXNoKHJvd0h0bWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gcmVuZGVyXHJcbiAgICAgICAgdGhpcy4kcm9vdEVsZW1lbnQuaHRtbChgPHRhYmxlIGNsYXNzPScke3RoaXMuZ2FtZVN0YXRlLlNpemUubGFiZWx9Jz48dGJvZHk+JHtzdGFjay5qb2luKFwiXCIpfTwvdGJvZHk+PC90YWJsZT5gKTsgXHJcblxyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAvLyBhZGQgY2VsbCBzdGF0ZSBjaGFuZ2UgY2FsbGJhY2sgZm9yIHJlbmRlcmluZyBpbmRpdmlkdWFsIGNlbGxzXHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUuT25DZWxsU3RhdGVDaGFuZ2UgPSBmdW5jdGlvbihjZWxsKSB7XHJcbiAgICAgICAgICAgIC8vIHJlLXJlbmRlciB0aGUgY2VsbFxyXG4gICAgICAgICAgICB0aGF0LmxvZ1V0aWwuTG9nKGByZW5kZXIgY2VsbCAke2NlbGwuSWR9IGluIGdhbWUgd2l0aCBpZCAke3RoYXQuZ2FtZVN0YXRlLklkfWApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGNlbGxDbGFzcyA9IHRoYXQuR2V0Q2VsbENsYXNzKGNlbGwpO1xyXG4gICAgICAgICAgICBsZXQgY2VsbENvbnRlbnQgPSB0aGF0LkdldENlbGxDb250ZW50KGNlbGwpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJChgIyR7Y2VsbC5JZH1gKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKClcclxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhgY2VsbCAke2NlbGxDbGFzc31gKSBcclxuICAgICAgICAgICAgICAgIC5odG1sKGNlbGxDb250ZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBnYW1lIGNvbXBsZXRpb24gc3RhdGUgaGFuZGxlclxyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlLk9uR2FtZUNvbXBsZXRpb25TdGF0ZUNoYW5nZSA9IGZ1bmN0aW9uKGdhbWVDb21wbGV0aW9uU3RhdGUpIHtcclxuICAgICAgICAgICAgaWYgKGdhbWVDb21wbGV0aW9uU3RhdGUgPT0gTUlORVNXRUVQRVJfR0FNRV9DT01QTEVUSU9OX1NUQVRFUy5jb21wbGV0ZWQpXHJcbiAgICAgICAgICAgICAgICB0aGF0LiRyb290RWxlbWVudC5hcHBlbmQoXCI8ZGl2IGNsYXNzPSdlbmQtc3RhdGUnPjxpbWcgc3JjPScuL2ltZy93aW4uZ2lmJz48L2ltZz48L2Rpdj5cIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoZ2FtZUNvbXBsZXRpb25TdGF0ZSA9PSBNSU5FU1dFRVBFUl9HQU1FX0NPTVBMRVRJT05fU1RBVEVTLmZhaWxlZClcclxuICAgICAgICAgICAgICAgIHRoYXQuJHJvb3RFbGVtZW50LmFwcGVuZChcIjxkaXYgY2xhc3M9J2VuZC1zdGF0ZSc+PGltZyBzcmM9Jy4vaW1nL2xvc2UuZ2lmJz48L2ltZz48L2Rpdj5cIik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gYmluZCBoYW5kbGVyc1xyXG4gICAgICAgIHRoaXMuQWRkSGFuZGxlcnMoKTtcclxuICAgIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgTmF2aWdhdGlvbiB9IGZyb20gJy4vbmF2aWdhdGlvbi5qcyc7XHJcbmltcG9ydCB7IE1pbmVzd2VlcGVyIH0gZnJvbSAnLi4vbWluZXN3ZWVwZXIvbWluZXN3ZWVwZXJhcHAuanMnO1xyXG5cclxubGV0ICRyb290QXBwQ29udGFpbmVyID0gJyNhcHAtbWFpbic7XHJcblxyXG5uZXcgTmF2aWdhdGlvbigkKTtcclxuXHJcbi8vIHN0YXJ0IG1pbmVzd2VlcHJcclxubmV3IE1pbmVzd2VlcGVyKCQsICRyb290QXBwQ29udGFpbmVyKS5TdGFydCgpOyJdLCJzb3VyY2VSb290IjoiIn0=