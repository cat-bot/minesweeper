/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/coreapp/googleauthhandler.js":
/*!*********************************************!*\
  !*** ./src/js/coreapp/googleauthhandler.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GoogleAuthHandler": () => (/* binding */ GoogleAuthHandler)
/* harmony export */ });
class GoogleAuthHandler {
  constructor(onSignIn, onSignOut) {
    this.onSignIn = onSignIn;
    this.onSignOut = onSignOut;

    // Initialize Firebase, config defined elsewhere
    firebase.initializeApp(AppFirebaseConfig);
    
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

/***/ "./src/js/coreapp/util.js":
/*!********************************!*\
  !*** ./src/js/coreapp/util.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppUtil": () => (/* binding */ AppUtil)
/* harmony export */ });
class AppUtil {
    constructor() {
        // defined elsewhere
        this._log = AppEnv === "dev";
    }
    
    Log(entry) {
        if (this._log && entry)
            console.log(entry);
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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _coreapp_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../coreapp/util.js */ "./src/js/coreapp/util.js");
/* harmony import */ var _minesweeperconstants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./minesweeperconstants.js */ "./src/js/minesweeper/minesweeperconstants.js");
/* harmony import */ var _minesweepergamestate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./minesweepergamestate.js */ "./src/js/minesweeper/minesweepergamestate.js");
/* harmony import */ var _minesweepergrid_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./minesweepergrid.js */ "./src/js/minesweeper/minesweepergrid.js");





let Minesweeper = (function($) {
    "use strict";

    function InitControls() {
        // populate game options
        let $select = $('#game-options');

        for(let key in _minesweeperconstants_js__WEBPACK_IMPORTED_MODULE_1__.MINESWEEPER_GRID_SIZES)
        {
            $select.append($('<option>', { 
                    value: key,
                    text : `${key} (${_minesweeperconstants_js__WEBPACK_IMPORTED_MODULE_1__.MINESWEEPER_GRID_SIZES[key].width}x${_minesweeperconstants_js__WEBPACK_IMPORTED_MODULE_1__.MINESWEEPER_GRID_SIZES[key].height}, ${_minesweeperconstants_js__WEBPACK_IMPORTED_MODULE_1__.MINESWEEPER_GRID_SIZES[key].mines} mines)` 
                }));
        }

        // bind game generation handlers
        $("#generate-game").on('click', function(e) {       
           GenerateNewGame();
        });
    }

    function GenerateNewGame() {
        let util = new _coreapp_util_js__WEBPACK_IMPORTED_MODULE_0__.AppUtil();
        let $select = $('#game-options');
        let selected = $select.find("option:selected").val();
        let size = _minesweeperconstants_js__WEBPACK_IMPORTED_MODULE_1__.MINESWEEPER_GRID_SIZES[selected];
        
        util.Log(`generate new ${size.width}x${size.height} game`);  

        // create new game state
        let gameState = new _minesweepergamestate_js__WEBPACK_IMPORTED_MODULE_2__.MinesweeperGameState(size, util);

        $("#win-game").off('click').on('click', function(e) {       
            gameState.TriggerAutoWin();
        });

        $("#lose-game").off('click').on('click', function(e) {       
            gameState.TriggerAutoLose();
        });

        // create new ui
        let game = new _minesweepergrid_js__WEBPACK_IMPORTED_MODULE_3__.MinesweeperGameGrid($('#grid'), gameState, util);
        game.Start();
    }

    (function() {
        InitControls(); 
    })();

})(jQuery);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Minesweeper);

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
/*!**************************************!*\
  !*** ./src/js/coreapp/navigation.js ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _googleauthhandler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./googleauthhandler.js */ "./src/js/coreapp/googleauthhandler.js");
/* harmony import */ var _minesweeper_minesweeperapp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../minesweeper/minesweeperapp.js */ "./src/js/minesweeper/minesweeperapp.js");



(function($) {
    "use strict";

    // wire up navigation & login
    let $loginUI = $("#login-ui-container");

    function onSignIn(oAuthUser) {
        $loginUI
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
    }

    function onSignOut() {
        if ($loginUI.attr('data-signed-in') == 'false')
            return;

        $loginUI
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
    }
  
    let g_auth = new _googleauthhandler_js__WEBPACK_IMPORTED_MODULE_0__.GoogleAuthHandler(onSignIn, onSignOut);

    // bind log in
    $("#login-prompt").on('click', function(e) {     
        //g_auth.SignInPopup();
        g_auth.SignInRedirect();
    });

    $("#login-profile").on('click', function(e) {     
        g_auth.SignOut();
    });

})(jQuery);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9nb29nbGVhdXRoaGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC91dGlsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9taW5lc3dlZXBlci9taW5lc3dlZXBlcmFwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbWluZXN3ZWVwZXIvbWluZXN3ZWVwZXJjb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21pbmVzd2VlcGVyL21pbmVzd2VlcGVyZ2FtZWNlbGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21pbmVzd2VlcGVyL21pbmVzd2VlcGVyZ2FtZXN0YXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9taW5lc3dlZXBlci9taW5lc3dlZXBlcmdyaWQuanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvcmVhcHAvbmF2aWdhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7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QUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7O0FDTjJEO0FBQ0k7O0FBRS9EO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsb0VBQWlCOztBQUV0QztBQUNBLGdEO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUwsaUQ7QUFDQTtBQUNBLEtBQUs7O0FBRUwsQ0FBQyxVIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBHb29nbGVBdXRoSGFuZGxlciB7XHJcbiAgY29uc3RydWN0b3Iob25TaWduSW4sIG9uU2lnbk91dCkge1xyXG4gICAgdGhpcy5vblNpZ25JbiA9IG9uU2lnbkluO1xyXG4gICAgdGhpcy5vblNpZ25PdXQgPSBvblNpZ25PdXQ7XHJcblxyXG4gICAgLy8gSW5pdGlhbGl6ZSBGaXJlYmFzZSwgY29uZmlnIGRlZmluZWQgZWxzZXdoZXJlXHJcbiAgICBmaXJlYmFzZS5pbml0aWFsaXplQXBwKEFwcEZpcmViYXNlQ29uZmlnKTtcclxuICAgIFxyXG4gICAgLy8gdXNlIG9ubHkgZ29vZ1xyXG4gICAgdGhpcy5nX3Byb3ZpZGVyID0gbmV3IGZpcmViYXNlLmF1dGguR29vZ2xlQXV0aFByb3ZpZGVyKCk7XHJcbiAgICB0aGlzLmdfcHJvdmlkZXIuYWRkU2NvcGUoJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvdXNlcmluZm8ucHJvZmlsZScpO1xyXG4gICAgdGhpcy5nX3Byb3ZpZGVyLnNldEN1c3RvbVBhcmFtZXRlcnMoe1xyXG4gICAgICAnbG9naW5faGludCc6ICd1c2VyQGV4YW1wbGUuY29tJ1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gc2V0IGEgaGFuZGxlciBmb3Igd2hlbiB0b2tlbnMgYXJlIHJlY2lldmVkXHJcbiAgICBmaXJlYmFzZS5hdXRoKCkub25BdXRoU3RhdGVDaGFuZ2VkKHVzZXI9PntcclxuICAgICAgICBpZiAodXNlcikge1xyXG4gICAgICAgICAgICB0aGlzLkZpcmVPblNpZ25JbkhhbmRsZXIodXNlcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIHRoaXMgY2FuIGZpcmUgd2hlbiB0aGVyZSBpcyBubyBsb2dnZWQgaW4gdXNlciBvbiBsb2FkXHJcbiAgICAgICAgICAgIHRoaXMuRmlyZU9uU2lnbk91dEhhbmRsZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIG1ldGhvZHNcclxuICBGaXJlT25TaWduSW5IYW5kbGVyKG9BdXRoVXNlcikge1xyXG4gICAgaWYgKHRoaXMub25TaWduSW4pIHtcclxuICAgICAgdGhpcy5vblNpZ25JbihvQXV0aFVzZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgRmlyZU9uU2lnbk91dEhhbmRsZXIoKSB7XHJcbiAgICBpZiAodGhpcy5vblNpZ25PdXQpIHtcclxuICAgICAgdGhpcy5vblNpZ25PdXQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIFNpZ25JblBvcHVwKCkge1xyXG4gICAgZmlyZWJhc2UuYXV0aCgpLnNpZ25JbldpdGhQb3B1cCh0aGlzLmdfcHJvdmlkZXIpO1xyXG4gIH1cclxuXHJcbiAgU2lnbkluUmVkaXJlY3QoKSB7XHJcbiAgICBmaXJlYmFzZS5hdXRoKCkuc2lnbkluV2l0aFJlZGlyZWN0KHRoaXMuZ19wcm92aWRlcik7XHJcbiAgfVxyXG5cclxuICBTaWduT3V0KCkge1xyXG4gICAgZmlyZWJhc2UuYXV0aCgpLnNpZ25PdXQoKTtcclxuICB9XHJcbn1cclxuXHJcbiIsImV4cG9ydCBjbGFzcyBBcHBVdGlsIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIC8vIGRlZmluZWQgZWxzZXdoZXJlXHJcbiAgICAgICAgdGhpcy5fbG9nID0gQXBwRW52ID09PSBcImRldlwiO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBMb2coZW50cnkpIHtcclxuICAgICAgICBpZiAodGhpcy5fbG9nICYmIGVudHJ5KVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlbnRyeSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7IEFwcFV0aWwgfSBmcm9tICcuLi9jb3JlYXBwL3V0aWwuanMnO1xyXG5pbXBvcnQgeyBNSU5FU1dFRVBFUl9HUklEX1NJWkVTIH0gZnJvbSAnLi9taW5lc3dlZXBlcmNvbnN0YW50cy5qcyc7XHJcbmltcG9ydCB7IE1pbmVzd2VlcGVyR2FtZVN0YXRlIH0gZnJvbSAnLi9taW5lc3dlZXBlcmdhbWVzdGF0ZS5qcyc7XHJcbmltcG9ydCB7IE1pbmVzd2VlcGVyR2FtZUdyaWQgfSBmcm9tICcuL21pbmVzd2VlcGVyZ3JpZC5qcyc7XHJcblxyXG5sZXQgTWluZXN3ZWVwZXIgPSAoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgZnVuY3Rpb24gSW5pdENvbnRyb2xzKCkge1xyXG4gICAgICAgIC8vIHBvcHVsYXRlIGdhbWUgb3B0aW9uc1xyXG4gICAgICAgIGxldCAkc2VsZWN0ID0gJCgnI2dhbWUtb3B0aW9ucycpO1xyXG5cclxuICAgICAgICBmb3IobGV0IGtleSBpbiBNSU5FU1dFRVBFUl9HUklEX1NJWkVTKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgJHNlbGVjdC5hcHBlbmQoJCgnPG9wdGlvbj4nLCB7IFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBrZXksXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA6IGAke2tleX0gKCR7TUlORVNXRUVQRVJfR1JJRF9TSVpFU1trZXldLndpZHRofXgke01JTkVTV0VFUEVSX0dSSURfU0laRVNba2V5XS5oZWlnaHR9LCAke01JTkVTV0VFUEVSX0dSSURfU0laRVNba2V5XS5taW5lc30gbWluZXMpYCBcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGJpbmQgZ2FtZSBnZW5lcmF0aW9uIGhhbmRsZXJzXHJcbiAgICAgICAgJChcIiNnZW5lcmF0ZS1nYW1lXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHsgICAgICAgXHJcbiAgICAgICAgICAgR2VuZXJhdGVOZXdHYW1lKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gR2VuZXJhdGVOZXdHYW1lKCkge1xyXG4gICAgICAgIGxldCB1dGlsID0gbmV3IEFwcFV0aWwoKTtcclxuICAgICAgICBsZXQgJHNlbGVjdCA9ICQoJyNnYW1lLW9wdGlvbnMnKTtcclxuICAgICAgICBsZXQgc2VsZWN0ZWQgPSAkc2VsZWN0LmZpbmQoXCJvcHRpb246c2VsZWN0ZWRcIikudmFsKCk7XHJcbiAgICAgICAgbGV0IHNpemUgPSBNSU5FU1dFRVBFUl9HUklEX1NJWkVTW3NlbGVjdGVkXTtcclxuICAgICAgICBcclxuICAgICAgICB1dGlsLkxvZyhgZ2VuZXJhdGUgbmV3ICR7c2l6ZS53aWR0aH14JHtzaXplLmhlaWdodH0gZ2FtZWApOyAgXHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBuZXcgZ2FtZSBzdGF0ZVxyXG4gICAgICAgIGxldCBnYW1lU3RhdGUgPSBuZXcgTWluZXN3ZWVwZXJHYW1lU3RhdGUoc2l6ZSwgdXRpbCk7XHJcblxyXG4gICAgICAgICQoXCIjd2luLWdhbWVcIikub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHsgICAgICAgXHJcbiAgICAgICAgICAgIGdhbWVTdGF0ZS5UcmlnZ2VyQXV0b1dpbigpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiI2xvc2UtZ2FtZVwiKS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkgeyAgICAgICBcclxuICAgICAgICAgICAgZ2FtZVN0YXRlLlRyaWdnZXJBdXRvTG9zZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgbmV3IHVpXHJcbiAgICAgICAgbGV0IGdhbWUgPSBuZXcgTWluZXN3ZWVwZXJHYW1lR3JpZCgkKCcjZ3JpZCcpLCBnYW1lU3RhdGUsIHV0aWwpO1xyXG4gICAgICAgIGdhbWUuU3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgSW5pdENvbnRyb2xzKCk7IFxyXG4gICAgfSkoKTtcclxuXHJcbn0pKGpRdWVyeSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNaW5lc3dlZXBlcjsiLCJleHBvcnQgY29uc3QgTUlORVNXRUVQRVJfR1JJRF9TSVpFUyA9IHtcclxuICAgIGJlZ2lubmVyIDogeyB3aWR0aDogOSwgaGVpZ2h0OiA5LCBtaW5lczogMTAsIGxhYmVsOiBcImJlZ2lubmVyXCJ9LFxyXG4gICAgaW50ZXJtZWRpYXRlOiB7IHdpZHRoOiAxNiwgaGVpZ2h0OiAxNiwgbWluZXM6IDQwLCBsYWJlbDogXCJpbnRlcm1lZGlhdGVcIn0sXHJcbiAgICBleHBlcnQ6IHsgd2lkdGg6IDE2LCBoZWlnaHQ6IDI2LCBtaW5lczogODYsIGxhYmVsOiBcImV4cGVydFwifSxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBNSU5FU1dFRVBFUl9HQU1FX0NPTVBMRVRJT05fU1RBVEVTID0ge1xyXG4gICAgc3RhcnRlZDogMCxcclxuICAgIGNvbXBsZXRlZDogMSxcclxuICAgIGZhaWxlZDogMlxyXG59O1xyXG4iLCJleHBvcnQgY2xhc3MgTWluZXN3ZWVwZXJHYW1lQ2VsbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihpLCBqLCBnYW1lKSB7XHJcbiAgICAgICAgdGhpcy5faWQgPSBgJHtpICsgXCJfXCIgKyBqfWA7XHJcbiAgICAgICAgdGhpcy5fYWRqYWNlbnRNaW5lQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2lzTWluZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2lzTG9zaW5nTWluZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2lzUmV2ZWFsZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9pc01hcmtlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2dhbWUgPSBnYW1lO1xyXG4gICAgICAgIHRoaXMuaSA9IGk7XHJcbiAgICAgICAgdGhpcy5qID0gajtcclxuICAgIH1cclxuXHJcbiAgICAvLyBnZXR0ZXJzXHJcbiAgICBnZXQgSWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfVxyXG4gICAgZ2V0IEFkamFjZW50TWluZUNvdW50KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hZGphY2VudE1pbmVDb3VudDtcclxuICAgIH1cclxuICAgIGdldCBJc01pbmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzTWluZTtcclxuICAgIH1cclxuICAgIGdldCBJc0xvc2luZ01pbmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzTG9zaW5nTWluZTtcclxuICAgIH1cclxuICAgIGdldCBJc1JldmVhbGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc1JldmVhbGVkO1xyXG4gICAgfSBcclxuICAgIGdldCBJc01hcmtlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNNYXJrZWQ7XHJcbiAgICB9IFxyXG4gICAgZ2V0IHJvd0luZGV4KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmk7XHJcbiAgICB9XHJcbiAgICBnZXQgY29sSW5kZXgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuajtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gbWV0aG9kc1xyXG4gICAgSW5jcmVtZW50QWRqYWNlbnRNaW5lQ291bnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2dhbWUuR2FtZUlzUGxheWFibGUpXHJcbiAgICAgICAgICAgIHRoaXMuX2FkamFjZW50TWluZUNvdW50Kys7XHJcbiAgICB9XHJcbiAgICBTZXRJc01pbmUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2dhbWUuR2FtZUlzUGxheWFibGUpXHJcbiAgICAgICAgICAgIHRoaXMuX2lzTWluZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBTZXRJc0xvc2luZ01pbmUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2dhbWUuR2FtZUlzUGxheWFibGUpXHJcbiAgICAgICAgICAgIHRoaXMuX2lzTG9zaW5nTWluZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBTZXRJc1JldmVhbGVkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9nYW1lLkdhbWVJc1BsYXlhYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzUmV2ZWFsZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgLy8gbm8gbmVlZCBmb3IgaXQgdG8gYmUgbWFya2VkIGFueSBtb3JlXHJcbiAgICAgICAgICAgIHRoaXMuX2lzTWFya2VkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSAgXHJcbiAgICBTZXRJc01hcmtlZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fZ2FtZS5HYW1lSXNQbGF5YWJsZSkgXHJcbiAgICAgICAgICAgIHRoaXMuX2lzTWFya2VkID0gdHJ1ZTtcclxuICAgIH0gXHJcbn0iLCJpbXBvcnQgeyBNaW5lc3dlZXBlckdhbWVDZWxsIH0gZnJvbSBcIi4vbWluZXN3ZWVwZXJnYW1lY2VsbC5qc1wiO1xyXG5pbXBvcnQgeyBNSU5FU1dFRVBFUl9HQU1FX0NPTVBMRVRJT05fU1RBVEVTIH0gZnJvbSBcIi4vbWluZXN3ZWVwZXJjb25zdGFudHMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNaW5lc3dlZXBlckdhbWVTdGF0ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihzaXplLCBsb2d1dGlsKSB7XHJcbiAgICAgICAgLy8gc3RhdGVcclxuICAgICAgICB0aGlzLl9sb29rdXAgPSB7fTtcclxuICAgICAgICB0aGlzLl9pZCA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApO1xyXG4gICAgICAgIHRoaXMuX2NlbGxzID0gW107IFxyXG4gICAgICAgIHRoaXMuX21pbmVDZWxscyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3NpemUgPSBzaXplOyBcclxuICAgICAgICB0aGlzLl9nYW1lQ29tcGxldGlvblN0YXRlID0gTUlORVNXRUVQRVJfR0FNRV9DT01QTEVUSU9OX1NUQVRFUy5zdGFydGVkO1xyXG4gICAgICAgIHRoaXMuX3V0aWwgPSBsb2d1dGlsO1xyXG5cclxuICAgICAgICAvLyB0cmFjayBjbGVhcmVkIGNlbGxzIHZzIHRvdGFsIGNlbGxzIG5lZWRlZCB0byB3aW5cclxuICAgICAgICB0aGlzLl90b3RhbENlbGxDb3VudFRvV2luID0gc2l6ZS53aWR0aCpzaXplLmhlaWdodCAtIHNpemUubWluZXM7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudENlbGxDb3VudCA9IDA7XHJcblxyXG4gICAgICAgIC8vIGZvciBkaWFibGluZyB0aGUgZ2FtZVxyXG4gICAgICAgIHRoaXMuX2dhbWVEaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBjYWxsYmFjayBmdW5jc1xyXG4gICAgICAgIHRoaXMuX29uQ2VsbFN0YXRlQ2hhbmdlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuX29uR2FtZUNvbXBsZXRpb25TdGF0ZUNoYW5nZSA9IHVuZGVmaW5lZDtcclxuIFxyXG4gICAgICAgIC8vIGluaXQsIHN0YXJ0aW5nIHdpdGggY2VsbHMgd2l0aCBnZW5lcmljIHZhbHVlc1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9zaXplLmhlaWdodDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCByb3cgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCB0aGlzLl9zaXplLndpZHRoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdDZWxsID0gbmV3IE1pbmVzd2VlcGVyR2FtZUNlbGwoaSwgaiwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3Q2VsbElkID0gbmV3Q2VsbC5JZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvb2t1cFtuZXdDZWxsSWRdID0gbmV3Q2VsbDtcclxuICAgICAgICAgICAgICAgIHJvdy5wdXNoKG5ld0NlbGwpOyAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9jZWxscy5wdXNoKHJvdyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBzcHJpbmtsZSBtaW5lc1xyXG4gICAgICAgIGxldCBtaW5lcyA9IF8uc2FtcGxlU2l6ZShfLnJhbmdlKDAsIHRoaXMuX3NpemUud2lkdGgqdGhpcy5fc2l6ZS5oZWlnaHQgLSAxKSwgdGhpcy5fc2l6ZS5taW5lcyk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgbWluZXMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgbGV0IHJvd0luZGV4ID0gXy5mbG9vcihtaW5lc1trXS90aGlzLl9zaXplLndpZHRoKTtcclxuICAgICAgICAgICAgbGV0IGNvbEluZGV4ID0gbWluZXNba10gJSB0aGlzLl9zaXplLndpZHRoO1xyXG4gICAgICAgICAgICBsZXQgbWluZUNlbGwgPSB0aGlzLl9sb29rdXBbYCR7cm93SW5kZXggKyBcIl9cIiArIGNvbEluZGV4fWBdO1xyXG5cclxuICAgICAgICAgICAgbWluZUNlbGwuU2V0SXNNaW5lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX21pbmVDZWxscy5wdXNoKG1pbmVDZWxsKTsgICAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSBhZGphY2VudCBtaW5lIGNvdW50IGJ5IGl0ZXJhdGluZyBhbGwgbWluZXNcclxuICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IG1pbmVzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIGxldCByb3dJbmRleCA9IF8uZmxvb3IobWluZXNba10vdGhpcy5fc2l6ZS53aWR0aCk7XHJcbiAgICAgICAgICAgIGxldCBjb2xJbmRleCA9IG1pbmVzW2tdICUgdGhpcy5fc2l6ZS53aWR0aDtcclxuXHJcbiAgICAgICAgICAgIGxldCBvdGhlckNvb3JkcyA9IHRoaXMuR2VuZXJhdGVBZGphY2VudENlbGxzKHJvd0luZGV4LCBjb2xJbmRleCk7XHJcblxyXG4gICAgICAgICAgICAvLyBmb3JlYWNoIGFkamFjZW50LCBpZiBpdCBpc250IGFsc28gYSBtaW5lLCBpbmNyZW1lbnQgaXRzIGFkamFjZW50IG1pbmUgY291bnRcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBvdGhlckNvb3Jkcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFkamFjZW50Q2VsbCA9IHRoaXMuX2xvb2t1cFtgJHtvdGhlckNvb3Jkc1tqXS55ICsgXCJfXCIgKyBvdGhlckNvb3Jkc1tqXS54fWBdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghYWRqYWNlbnRDZWxsLklzTWluZSlcclxuICAgICAgICAgICAgICAgICAgICBhZGphY2VudENlbGwuSW5jcmVtZW50QWRqYWNlbnRNaW5lQ291bnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdXRpbC5Mb2coYG5ldyBnYW1lIGdlbmVyYXRlZGApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGdldHRlcnNcclxuICAgIGdldCBHYW1lSXNQbGF5YWJsZSgpIHtcclxuICAgICAgICByZXR1cm4gIXRoaXMuX2dhbWVEaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgR2FtZUlzV29uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9nYW1lQ29tcGxldGlvblN0YXRlID09IE1JTkVTV0VFUEVSX0dBTUVfQ09NUExFVElPTl9TVEFURVMuY29tcGxldGVkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBTaXplKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBJZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IEdhbWVDb21wbGV0aW9uU3RhdGUoZ2FtZUNvbXBsZXRpb25TdGF0ZSkge1xyXG4gICAgICAgIHRoaXMuX2dhbWVDb21wbGV0aW9uU3RhdGUgPSBnYW1lQ29tcGxldGlvblN0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBPbkNlbGxTdGF0ZUNoYW5nZShmbikge1xyXG4gICAgICAgIHRoaXMuX29uQ2VsbFN0YXRlQ2hhbmdlID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IEdhbWVEaXNhYmxlZChkaXNhYmxlZCkge1xyXG4gICAgICAgIHRoaXMuX2dhbWVEaXNhYmxlZCA9IGRpc2FibGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBPbkdhbWVDb21wbGV0aW9uU3RhdGVDaGFuZ2UoZm4pIHtcclxuICAgICAgICB0aGlzLl9vbkdhbWVDb21wbGV0aW9uU3RhdGVDaGFuZ2UgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICBHZW5lcmF0ZUFkamFjZW50Q2VsbHMocm93SW5kZXgsIGNvbEluZGV4KSB7XHJcbiAgICAgICAgLy8gZ2VuZXJhdGUgOCBhZGphY2VudCBjby1vcmRzLCBjbGFtcGVkIHRvIGluLWJvdW5kc1xyXG4gICAgICAgIGxldCBvdGhlckNvb3JkcyA9IFtdO1xyXG5cclxuICAgICAgICBpZiAocm93SW5kZXggLSAxID49IDApIHtcclxuICAgICAgICAgICAgaWYgKGNvbEluZGV4IC0gMSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBvdGhlckNvb3Jkcy5wdXNoKHt4OiBjb2xJbmRleC0xLCB5OnJvd0luZGV4LTF9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb3RoZXJDb29yZHMucHVzaCh7eDogY29sSW5kZXgsIHk6cm93SW5kZXgtMX0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbEluZGV4ICsgMSA8IHRoaXMuX3NpemUud2lkdGgpXHJcbiAgICAgICAgICAgICAgICBvdGhlckNvb3Jkcy5wdXNoKHt4OiBjb2xJbmRleCsxLCB5OnJvd0luZGV4LTF9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGNvbEluZGV4IC0gMSA+PSAwKSBcclxuICAgICAgICAgICAgb3RoZXJDb29yZHMucHVzaCh7eDogY29sSW5kZXgtMSwgeTpyb3dJbmRleH0pO1xyXG5cclxuICAgICAgICBpZiAoY29sSW5kZXggKyAxIDwgdGhpcy5fc2l6ZS53aWR0aClcclxuICAgICAgICAgICAgb3RoZXJDb29yZHMucHVzaCh7eDogY29sSW5kZXgrMSwgeTpyb3dJbmRleH0pO1xyXG5cclxuICAgICAgICBpZiAocm93SW5kZXggKyAxIDwgdGhpcy5fc2l6ZS5oZWlnaHQpIHtcclxuICAgICAgICAgICAgaWYgKGNvbEluZGV4IC0gMSA+PSAwKSBcclxuICAgICAgICAgICAgICAgIG90aGVyQ29vcmRzLnB1c2goe3g6IGNvbEluZGV4LTEsIHk6cm93SW5kZXgrMX0pO1xyXG5cclxuICAgICAgICAgICAgb3RoZXJDb29yZHMucHVzaCh7eDogY29sSW5kZXgsIHk6cm93SW5kZXgrMX0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbEluZGV4ICsgMSA8IHRoaXMuX3NpemUud2lkdGgpXHJcbiAgICAgICAgICAgICAgICBvdGhlckNvb3Jkcy5wdXNoKHt4OiBjb2xJbmRleCsxLCB5OnJvd0luZGV4KzF9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvdGhlckNvb3JkcztcclxuICAgIH1cclxuXHJcbiAgICBDZWxsQnlJZChjZWxsSWQpIHtcclxuICAgICAgICBsZXQgY2VsbCA9IHRoaXMuX2xvb2t1cFtjZWxsSWRdO1xyXG5cclxuICAgICAgICBpZiAoY2VsbCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB0aHJvdyBgY2VsbCB3aXRoIGlkICR7Y2VsbElkfSBjb3VsZCBub3QgYmUgZm91bmRgO1xyXG5cclxuICAgICAgICByZXR1cm4gY2VsbDtcclxuICAgIH1cclxuXHJcbiAgICBSZXZlYWxBbGxNaW5lcyAoKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIF8uZm9yRWFjaCh0aGlzLl9taW5lQ2VsbHMsIGZ1bmN0aW9uKGNlbGwpIHtcclxuICAgICAgICAgICAgaWYgKCFjZWxsLklzUmV2ZWFsZWQpXHJcbiAgICAgICAgICAgICAgICBjZWxsLlNldElzUmV2ZWFsZWQoKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuRmlyZUNlbGxTdGF0ZUNoYW5nZShjZWxsKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBBdHRlbXB0QXV0b0ZpbGwoY2VsbCkge1xyXG4gICAgICAgIGxldCBhdXRvRmlsbHMgPSB0aGlzLkdldEFkamFjZW50Tm9uTWluZU5vblJldmVhbGVkQ2VsbHMoY2VsbCk7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICBfLmZvckVhY2goYXV0b0ZpbGxzLCBmdW5jdGlvbihjKSB7XHJcbiAgICAgICAgICAgIHRoYXQuU2VsZWN0Q2VsbChjKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRBZGphY2VudE5vbk1pbmVOb25SZXZlYWxlZENlbGxzKGNlbGwpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGFkakNlbGxJbmRpY2VzID0gdGhpcy5HZW5lcmF0ZUFkamFjZW50Q2VsbHMoY2VsbC5yb3dJbmRleCwgY2VsbC5jb2xJbmRleCk7XHJcbiAgICAgICAgbGV0IGFkakNlbGxzID0gW107XHJcbiAgICAgICAgXy5mb3JFYWNoKGFkakNlbGxJbmRpY2VzLCBmdW5jdGlvbihjKSB7XHJcbiAgICAgICAgICAgIGxldCBhZGphY2VudENlbGwgPSB0aGF0LkNlbGxCeUlkKGAke2MueSArIFwiX1wiICsgYy54fWApO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFhZGphY2VudENlbGwuSXNNaW5lICYmICFhZGphY2VudENlbGwuSXNSZXZlYWxlZClcclxuICAgICAgICAgICAgICAgIGFkakNlbGxzLnB1c2goYWRqYWNlbnRDZWxsKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGFkakNlbGxzO1xyXG4gICAgfVxyXG5cclxuICAgIEZpcmVDZWxsU3RhdGVDaGFuZ2UgKGNoYW5nZWRDZWxsKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX29uQ2VsbFN0YXRlQ2hhbmdlKVxyXG4gICAgICAgICAgICB0aGlzLl9vbkNlbGxTdGF0ZUNoYW5nZShjaGFuZ2VkQ2VsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgRmlyZUdhbWVDb21wbGV0aW9uU3RhdGVDaGFuZ2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX29uR2FtZUNvbXBsZXRpb25TdGF0ZUNoYW5nZSlcclxuICAgICAgICAgICAgdGhpcy5fb25HYW1lQ29tcGxldGlvblN0YXRlQ2hhbmdlKHRoaXMuX2dhbWVDb21wbGV0aW9uU3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIE1hcmtDZWxsKGNlbGwpIHtcclxuICAgICAgICB0aGlzLl91dGlsLkxvZyhgbWFyayBjZWxsIGlkICR7Y2VsbC5JZH1gKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLkdhbWVJc1BsYXlhYmxlKSB7XHJcbiAgICAgICAgICAgIC8vIGRvbid0IGRvIGFueXRoaW5nXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghY2VsbC5Jc1JldmVhbGVkKSB7XHJcblxyXG4gICAgICAgICAgICBjZWxsLlNldElzTWFya2VkKCk7XHJcblxyXG4gICAgICAgICAgICAvLyB0cmlnZ2VyIGl0IHRvIHJlLXJlbmRlclxyXG4gICAgICAgICAgICB0aGlzLkZpcmVDZWxsU3RhdGVDaGFuZ2UoY2VsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIE1hcmtDZWxsYnlJZChjZWxsSWQpIHtcclxuICAgICAgICBsZXQgY2VsbCA9IHRoaXMuQ2VsbEJ5SWQoY2VsbElkKTsgICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMuTWFya0NlbGwoY2VsbCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFNlbGVjdENlbGwoY2VsbCkge1xyXG4gICAgICAgIHRoaXMuX3V0aWwuTG9nKGBzZWxlY3QgY2VsbCBpZCAke2NlbGwuSWR9YCk7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5HYW1lSXNQbGF5YWJsZSkge1xyXG4gICAgICAgICAgICAvLyBkb24ndCBkbyBhbnl0aGluZ1xyXG4gICAgICAgICAgICB0aGlzLl91dGlsLkxvZyhgZ2FtZSBoYXMgYWxyZWFkeSBiZWVuICR7dGhpcy5fZ2FtZUNvbXBsZXRpb25TdGF0ZSA9PSBNSU5FU1dFRVBFUl9HQU1FX0NPTVBMRVRJT05fU1RBVEVTLmNvbXBsZXRlZCA/IFwid29uIVwiIDogXCJsb3N0IVwifWApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWNlbGwuSXNSZXZlYWxlZCkge1xyXG4gICAgICAgICAgICAvLyByZXZlYWwgdGhpcyBjZWxsXHJcbiAgICAgICAgICAgIGNlbGwuU2V0SXNSZXZlYWxlZCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gdHJpZ2dlciBpdCB0byByZS1yZW5kZXJcclxuICAgICAgICAgICAgdGhpcy5GaXJlQ2VsbFN0YXRlQ2hhbmdlKGNlbGwpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNlbGwuSXNNaW5lKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBvaCBvaGgsIGxvc3RcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBtYXJrIHRoaXMgbWluZSBhcyB0aGUgb25lIGhpdFxyXG4gICAgICAgICAgICAgICAgY2VsbC5TZXRJc0xvc2luZ01pbmUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZUNvbXBsZXRpb25TdGF0ZSA9IE1JTkVTV0VFUEVSX0dBTUVfQ09NUExFVElPTl9TVEFURVMuZmFpbGVkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SZXZlYWxBbGxNaW5lcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5HYW1lRGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXRpbC5Mb2coYHBsYXllciBoYXMgbG9zdCFgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuRmlyZUdhbWVDb21wbGV0aW9uU3RhdGVDaGFuZ2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gICBcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyB5YXksIHlvdSBjbGVhcmVkIG9uZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudENlbGxDb3VudCsrO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIHBsYXllciBoYXMgd29uXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY3VycmVudENlbGxDb3VudCA9PSB0aGlzLl90b3RhbENlbGxDb3VudFRvV2luKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8geWF5XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5HYW1lQ29tcGxldGlvblN0YXRlID0gTUlORVNXRUVQRVJfR0FNRV9DT01QTEVUSU9OX1NUQVRFUy5jb21wbGV0ZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5SZXZlYWxBbGxNaW5lcygpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkdhbWVEaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXRpbC5Mb2coYHBsYXllciBoYXMgd29uIWApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuRmlyZUdhbWVDb21wbGV0aW9uU3RhdGVDaGFuZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBvdGhlcndpc2UsIGNlbGwgaXMgbm90IGEgbWluZSwgcGxheWVyIGhhcyBub3QgeWV0IHdvbiwgc28gYXR0ZW1wdCB0byBhdXRvZmlsbCBpZiB0aGUgY2VsbCBpcyBibGFua1xyXG4gICAgICAgICAgICBpZiAoY2VsbC5BZGphY2VudE1pbmVDb3VudCA9PSAwKSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICB0aGlzLkF0dGVtcHRBdXRvRmlsbChjZWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBTZWxlY3RDZWxsQnlJZChjZWxsSWQpIHtcclxuICAgICAgICBsZXQgY2VsbCA9IHRoaXMuQ2VsbEJ5SWQoY2VsbElkKTsgICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMuU2VsZWN0Q2VsbChjZWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBUcmlnZ2VyQXV0b1dpbigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuR2FtZUlzUGxheWFibGUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IGFsbENlbGxzID0gXy5mbGF0dGVuKHRoaXMuX2NlbGxzKTtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgXy5mb3JFYWNoKGFsbENlbGxzLCBmdW5jdGlvbihjKSB7XHJcbiAgICAgICAgICAgIGlmICghYy5Jc01pbmUpXHJcbiAgICAgICAgICAgICAgICB0aGF0LlNlbGVjdENlbGwoYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgVHJpZ2dlckF1dG9Mb3NlKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5HYW1lSXNQbGF5YWJsZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB0aGlzLlNlbGVjdENlbGwodGhpcy5fbWluZUNlbGxzWzBdKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBNSU5FU1dFRVBFUl9HQU1FX0NPTVBMRVRJT05fU1RBVEVTIH0gZnJvbSBcIi4vbWluZXN3ZWVwZXJjb25zdGFudHMuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNaW5lc3dlZXBlckdhbWVHcmlkIHtcclxuICAgIGNvbnN0cnVjdG9yKCRyb290RWxlbWVudCwgZ2FtZVN0YXRlLCBsb2dVdGlsKSB7XHJcbiAgICAgICAgdGhpcy4kcm9vdEVsZW1lbnQgPSAkcm9vdEVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSBnYW1lU3RhdGU7ICBcclxuICAgICAgICB0aGlzLmxvZ1V0aWwgPSBsb2dVdGlsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG1ldGhvZHNcclxuXHJcbiAgICBHZXRDZWxsQ2xhc3MoY2VsbCkge1xyXG4gICAgICAgIGlmICghY2VsbC5Jc1JldmVhbGVkKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjZWxsLklzTWFya2VkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiaGlkZGVuIG1hcmtlZFwiO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFwiaGlkZGVuXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY2VsbC5Jc01pbmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNlbGwuSXNMb3NpbmdNaW5lID8gXCJtaW5lIHRyaWdnZXJlZFwiIDogXCJtaW5lIFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAoY2VsbC5BZGphY2VudE1pbmVDb3VudCA+IDApIFxyXG4gICAgICAgICAgICByZXR1cm4gYG9wZW4tJHtjZWxsLkFkamFjZW50TWluZUNvdW50fWA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIFwiY2xlYXJcIjtcclxuICAgIH1cclxuXHJcbiAgICBHZXRDZWxsQ29udGVudChjZWxsKSB7XHJcbiAgICAgICAgbGV0IGNlbGxHbHlwaCA9IGNlbGwuSXNSZXZlYWxlZCA/IFxyXG4gICAgICAgIChjZWxsLklzTWluZSA/IFxyXG4gICAgICAgICAgICBcIvCfkqNcIiA6IFxyXG4gICAgICAgICAgICAgICAgKGNlbGwuQWRqYWNlbnRNaW5lQ291bnQgPiAwID8gY2VsbC5BZGphY2VudE1pbmVDb3VudCA6IFwiXCIpXHJcbiAgICAgICAgKSBcclxuICAgICAgICA6IFwiXCI7XHJcblxyXG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz0nY2VsbC1pbm5lcic+JHtjZWxsR2x5cGh9PC9kaXY+YDtcclxuICAgIH1cclxuXHJcbiAgICBHZXRJbml0aWFsQ2VsbEh0bWwoY2VsbElkKSB7XHJcbiAgICAgICAgbGV0IGNlbGwgPSB0aGlzLmdhbWVTdGF0ZS5DZWxsQnlJZChjZWxsSWQpO1xyXG5cclxuICAgICAgICBsZXQgY2VsbENsYXNzID0gdGhpcy5HZXRDZWxsQ2xhc3MoY2VsbCk7XHJcbiAgICAgICAgbGV0IGNlbGxDb250ZW50ID0gdGhpcy5HZXRDZWxsQ29udGVudChjZWxsKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGA8dGQgY2xhc3M9J2NlbGwgJHtjZWxsQ2xhc3N9JyBpZD0nJHtjZWxsSWR9Jz4ke2NlbGxDb250ZW50fTwvdGQ+YDtcclxuICAgIH1cclxuXHJcbiAgICBSZW1vdmVIYW5kbGVycygpIHtcclxuICAgICAgICB0aGlzLiRyb290RWxlbWVudC5maW5kKCd0YWJsZScpXHJcbiAgICAgICAgICAgIC5vZmYoJ2NvbnRleHRtZW51JylcclxuICAgICAgICAgICAgLm9mZignY2xpY2snKTtcclxuICAgIH1cclxuXHJcbiAgICBBZGRIYW5kbGVycygpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vIGFkZCBzdXBwcmVzcyBjb250ZXh0IG1lbnVcclxuICAgICAgICB0aGlzLiRyb290RWxlbWVudC5maW5kKCd0YWJsZScpLm9uKCdjb250ZXh0bWVudScsICd0ZC5jZWxsJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUud2hpY2ggPT0gMykge1xyXG4gICAgICAgICAgICAgICAgLy8gcmlnaHQgbW91c2VcclxuICAgICAgICAgICAgICAgIHRoYXQuZ2FtZVN0YXRlLk1hcmtDZWxsYnlJZChlLmN1cnJlbnRUYXJnZXQuaWQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIGFkZCBzZWxlY3QgaGFuZGxsZXJcclxuICAgICAgICB0aGlzLiRyb290RWxlbWVudC5maW5kKCd0YWJsZScpLm9uKCdjbGljaycsICd0ZC5jZWxsJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZihlLndoaWNoID09IDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIGxlZnQtbW91c2VcclxuICAgICAgICAgICAgICAgIHRoYXQuZ2FtZVN0YXRlLlNlbGVjdENlbGxCeUlkKGUuY3VycmVudFRhcmdldC5pZCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBTdGFydCgpIHtcclxuICAgICAgICAvLyByZW1vdmUgYW55IGV4aXN0aW5nIGhhbmRsZXJzXHJcbiAgICAgICAgdGhpcy5SZW1vdmVIYW5kbGVycygpO1xyXG5cclxuICAgICAgICBsZXQgc3RhY2sgPSBbXTtcclxuXHJcbiAgICAgICAgLy8gdGVtcGxhdGUgaHRtbCBjZWxsIGNvbnRlbnRcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5nYW1lU3RhdGUuU2l6ZS5oZWlnaHQ7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcm93SHRtbCA9IFwiPHRyPlwiO1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5nYW1lU3RhdGUuU2l6ZS53aWR0aDsgaisrKSB7ICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcm93SHRtbCArPSB0aGlzLkdldEluaXRpYWxDZWxsSHRtbCggaSArIFwiX1wiICsgaik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcm93SHRtbCArPSBcIjwvdHI+XCI7XHJcbiAgICAgICAgICAgIHN0YWNrLnB1c2gocm93SHRtbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyByZW5kZXJcclxuICAgICAgICB0aGlzLiRyb290RWxlbWVudC5odG1sKGA8dGFibGUgY2xhc3M9JyR7dGhpcy5nYW1lU3RhdGUuU2l6ZS5sYWJlbH0nPjx0Ym9keT4ke3N0YWNrLmpvaW4oXCJcIil9PC90Ym9keT48L3RhYmxlPmApOyBcclxuXHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIC8vIGFkZCBjZWxsIHN0YXRlIGNoYW5nZSBjYWxsYmFjayBmb3IgcmVuZGVyaW5nIGluZGl2aWR1YWwgY2VsbHNcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZS5PbkNlbGxTdGF0ZUNoYW5nZSA9IGZ1bmN0aW9uKGNlbGwpIHtcclxuICAgICAgICAgICAgLy8gcmUtcmVuZGVyIHRoZSBjZWxsXHJcbiAgICAgICAgICAgIHRoYXQubG9nVXRpbC5Mb2coYHJlbmRlciBjZWxsICR7Y2VsbC5JZH0gaW4gZ2FtZSB3aXRoIGlkICR7dGhhdC5nYW1lU3RhdGUuSWR9YCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgY2VsbENsYXNzID0gdGhhdC5HZXRDZWxsQ2xhc3MoY2VsbCk7XHJcbiAgICAgICAgICAgIGxldCBjZWxsQ29udGVudCA9IHRoYXQuR2V0Q2VsbENvbnRlbnQoY2VsbCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkKGAjJHtjZWxsLklkfWApXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoKVxyXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKGBjZWxsICR7Y2VsbENsYXNzfWApIFxyXG4gICAgICAgICAgICAgICAgLmh0bWwoY2VsbENvbnRlbnQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIGdhbWUgY29tcGxldGlvbiBzdGF0ZSBoYW5kbGVyXHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUuT25HYW1lQ29tcGxldGlvblN0YXRlQ2hhbmdlID0gZnVuY3Rpb24oZ2FtZUNvbXBsZXRpb25TdGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAoZ2FtZUNvbXBsZXRpb25TdGF0ZSA9PSBNSU5FU1dFRVBFUl9HQU1FX0NPTVBMRVRJT05fU1RBVEVTLmNvbXBsZXRlZClcclxuICAgICAgICAgICAgICAgIHRoYXQuJHJvb3RFbGVtZW50LmFwcGVuZChcIjxkaXYgY2xhc3M9J2VuZC1zdGF0ZSc+PGltZyBzcmM9Jy4vaW1nL3dpbi5naWYnPjwvaW1nPjwvZGl2PlwiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChnYW1lQ29tcGxldGlvblN0YXRlID09IE1JTkVTV0VFUEVSX0dBTUVfQ09NUExFVElPTl9TVEFURVMuZmFpbGVkKVxyXG4gICAgICAgICAgICAgICAgdGhhdC4kcm9vdEVsZW1lbnQuYXBwZW5kKFwiPGRpdiBjbGFzcz0nZW5kLXN0YXRlJz48aW1nIHNyYz0nLi9pbWcvbG9zZS5naWYnPjwvaW1nPjwvZGl2PlwiKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBiaW5kIGhhbmRsZXJzXHJcbiAgICAgICAgdGhpcy5BZGRIYW5kbGVycygpO1xyXG4gICAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBHb29nbGVBdXRoSGFuZGxlciB9IGZyb20gJy4vZ29vZ2xlYXV0aGhhbmRsZXIuanMnO1xyXG5pbXBvcnQgeyBNaW5lc3dlZXBlciB9IGZyb20gJy4uL21pbmVzd2VlcGVyL21pbmVzd2VlcGVyYXBwLmpzJztcclxuXHJcbihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvLyB3aXJlIHVwIG5hdmlnYXRpb24gJiBsb2dpblxyXG4gICAgbGV0ICRsb2dpblVJID0gJChcIiNsb2dpbi11aS1jb250YWluZXJcIik7XHJcblxyXG4gICAgZnVuY3Rpb24gb25TaWduSW4ob0F1dGhVc2VyKSB7XHJcbiAgICAgICAgJGxvZ2luVUlcclxuICAgICAgICAgICAgLmZpbmQoXCIjbG9naW4tcHJvbXB0XCIpXHJcbiAgICAgICAgICAgIC50b2dnbGVDbGFzcygnZC1ub25lJylcclxuICAgICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAgIC5maW5kKFwiI2xvZ2luLXByb2ZpbGVcIilcclxuICAgICAgICAgICAgLmZpbmQoJ2ltZycpXHJcbiAgICAgICAgICAgIC5wcm9wKCdzcmMnLCBvQXV0aFVzZXIucGhvdG9VUkwpXHJcbiAgICAgICAgICAgIC5wcm9wKCdhbHQnLCAnbG9nZ2VkIGluIGFzICcgKyBvQXV0aFVzZXIuZGlzcGxheU5hbWUpXHJcbiAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAudG9nZ2xlQ2xhc3MoJ2Qtbm9uZScpXHJcbiAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAuYXR0cignZGF0YS1zaWduZWQtaW4nLCAndHJ1ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9uU2lnbk91dCgpIHtcclxuICAgICAgICBpZiAoJGxvZ2luVUkuYXR0cignZGF0YS1zaWduZWQtaW4nKSA9PSAnZmFsc2UnKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICRsb2dpblVJXHJcbiAgICAgICAgICAgIC5maW5kKFwiI2xvZ2luLXByb2ZpbGVcIilcclxuICAgICAgICAgICAgLmZpbmQoJ2ltZycpXHJcbiAgICAgICAgICAgIC5wcm9wKCdzcmMnLCAnJylcclxuICAgICAgICAgICAgLnByb3AoJ2FsdCcsICcnKVxyXG4gICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgLnRvZ2dsZUNsYXNzKCdkLW5vbmUnKVxyXG4gICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgLmZpbmQoXCIjbG9naW4tcHJvbXB0XCIpXHJcbiAgICAgICAgICAgIC50b2dnbGVDbGFzcygnZC1ub25lJylcclxuICAgICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAgIC5hdHRyKCdkYXRhLXNpZ25lZC1pbicsICdmYWxzZScpO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgbGV0IGdfYXV0aCA9IG5ldyBHb29nbGVBdXRoSGFuZGxlcihvblNpZ25Jbiwgb25TaWduT3V0KTtcclxuXHJcbiAgICAvLyBiaW5kIGxvZyBpblxyXG4gICAgJChcIiNsb2dpbi1wcm9tcHRcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkgeyAgICAgXHJcbiAgICAgICAgLy9nX2F1dGguU2lnbkluUG9wdXAoKTtcclxuICAgICAgICBnX2F1dGguU2lnbkluUmVkaXJlY3QoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjbG9naW4tcHJvZmlsZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7ICAgICBcclxuICAgICAgICBnX2F1dGguU2lnbk91dCgpO1xyXG4gICAgfSk7XHJcblxyXG59KShqUXVlcnkpOyJdLCJzb3VyY2VSb290IjoiIn0=