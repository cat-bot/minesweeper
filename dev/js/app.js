/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/coreapp/approute.js":
/*!************************************!*\
  !*** ./src/js/coreapp/approute.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoute": () => (/* binding */ AppRoute)
/* harmony export */ });
class AppRoute {
    constructor(path, componentFn) {
        this._path = path;
        this._componentFn = componentFn;
    }

    get path() {
        return this._path;
    }

    get component() {
        return this._componentFn();
    }
}


/***/ }),

/***/ "./src/js/coreapp/approuter.js":
/*!*************************************!*\
  !*** ./src/js/coreapp/approuter.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRouter": () => (/* binding */ AppRouter)
/* harmony export */ });
/* harmony import */ var _apputil_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apputil.js */ "./src/js/coreapp/apputil.js");


class AppRouter {
    constructor(routes) {
        this.appUtil = new _apputil_js__WEBPACK_IMPORTED_MODULE_0__.AppUtil();
        this.routes = routes;

        const rounterfunction = () => {
            this.loadRoute();
        };

        window.addEventListener('hashchange', rounterfunction);
        window.addEventListener('load', rounterfunction);
    }

    loadRoute() {
        let path = this.parseLocation();
        this.appUtil.Log(`loading route ${path}`);

        let route = this.findComponent(path);

        let component;

        if (route)
            component = route.component;
        else {
            component = this.findComponent('/error').component;
            component.ErrorCode = '404';
            component.UserErrorMessage = 'we have crypto lockered your stuff';
        }

        this.MountComponent(component);
    }

    parseLocation() {
        return location.hash.slice(1).toLowerCase() || '/';
    }

    findComponent(route) {
        return this.routes.find(r => r.path.match(new RegExp(`^\\${route}$`, 'gm'))) || undefined;
    }

    UnmountCurrentComponent() {
        if (this.mountedComponent)
            this.mountedComponent.UnMount();
    }

    MountComponent(component) {
        this.UnmountCurrentComponent();
        this.mountedComponent = component;
        this.mountedComponent.Mount();
    }
}


/***/ }),

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

/***/ "./src/js/coreapp/error.js":
/*!*********************************!*\
  !*** ./src/js/coreapp/error.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Error": () => (/* binding */ Error)
/* harmony export */ });
class Error {
    constructor(rootContainerSelector) {
        this.rootContainerSelector = rootContainerSelector;
    }

    set ErrorCode(httpErrorCode) {
        this.httpErrorCode = httpErrorCode;
    }

    get ErrorCode() {
        return this.httpErrorCode;
    }

    set UserErrorMessage(msg) {
        this.message = msg;
    }

    get UserErrorMessage() {
        return this.message;
    }

    Mount() {
        $(this.rootContainerSelector).html(`
            <div class='error-container container-sm mt-4'>
                <div class='row py-4'>
                    <div class='col-12 d-flex justify-content-center align-content-middle'>
                        <div class='font-monospace fs-1'>${this.ErrorCode}</div>
                    </div>
                    <div class='col-12 d-flex justify-content-center align-content-middle pb-3 px-3 text-center'>
                        <div class='fs-3'>${this.UserErrorMessage}</div>
                    </div>
                </div>
            </div>
        `);
    }

    UnMount() {
        $(this.rootContainerSelector).html('');
    }
}

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

/***/ "./src/js/coreapp/lodashpolyfill.js":
/*!******************************************!*\
  !*** ./src/js/coreapp/lodashpolyfill.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
let _ = (function() {
 
    function baseRandom(lower, upper) {
        return lower + Math.floor(Math.random() * (upper - lower + 1));
    }

    function shuffleSelf(array, size) {
        var index = -1,
            length = array.length,
            lastIndex = length - 1;

        size = size === undefined ? length : size;
        while (++index < size) {
            var rand = baseRandom(index, lastIndex),
                value = array[rand];

            array[rand] = array[index];
            array[index] = value;
        }
        array.length = size;
        return array;
    }

    function copyArray(source, array) {
        var index = -1,
            length = source.length;
  
        array || (array = Array(length));
        while (++index < length) {
          array[index] = source[index];
        }
        return array;
    }

    function baseClamp(number, lower, upper) {
        if (number === number) {
          if (upper !== undefined) {
            number = number <= upper ? number : upper;
          }
          if (lower !== undefined) {
            number = number >= lower ? number : lower;
          }
        }
        return number;
    }
  
    function arraySampleSize(array, n) {
        return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
    }

    function sampleSize(collection, n) {
        return arraySampleSize(collection, n);
    }

    function range(start, end) {
        let s = start || 0;
        let nums = [];

        for(let i = start; i < end; i++) {
            nums.push(i);
        }

        return nums;
    }
    
    let pub = {};

    pub.range = range;
    pub.sampleSize = sampleSize;

    return pub;

}.call(undefined));
  
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_);

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
    constructor() {
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
    constructor(rootContainerSelector) {
        this.optionsSelector = '#game-options';
        this.newGameSelector = '#generate-game';
        this.winSelector = '#win-game';
        this.loseSelector = '#lose-game';
        this.gridSelector = '#grid';
        this.rootContainerSelector = rootContainerSelector;
        this.util = new _coreapp_apputil_js__WEBPACK_IMPORTED_MODULE_0__.AppUtil();

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
            </div>
        `;
    }
        
    // methods
    MountControls() {
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
        this.BindGenerateNewGameHandler();
    }

    UnMountControls() {
        this.UnBindGenerateNewGameHandler();
        $(this.rootContainerSelector).html('');
    }

    GenerateNewGame() {
        if (this.minesweeperUi) {
            this.minesweeperUi.UnMount();   
        }

        let $select = $(this.optionsSelector);
        let selected = $select.find("option:selected").val();
        let size = _minesweeperconstants_js__WEBPACK_IMPORTED_MODULE_1__.MINESWEEPER_GRID_SIZES[selected];
        
        this.util.Log(`generate new ${size.width}x${size.height} game`);  

        // create new game state
        let gameState = new _minesweepergamestate_js__WEBPACK_IMPORTED_MODULE_2__.MinesweeperGameState(size, this.util);

        // unbind old handler, bind new
        this.UnBindGameStateHandlers();
        this.BindGameStateHandlers(gameState);

        // create new ui
        this.minesweeperUi = new _minesweepergrid_js__WEBPACK_IMPORTED_MODULE_3__.MinesweeperGameGrid($(this.gridSelector), gameState, this.util);
        this.minesweeperUi.Mount();
    }

    BindGenerateNewGameHandler() {
        let that = this;
        $(this.newGameSelector).on('click', function(e) { that.GenerateNewGame(); });
    }

    UnBindGenerateNewGameHandler() {
        $(this.newGameSelector).off('click');
    }

    BindGameStateHandlers(gameState) {
        $(this.winSelector).off('click').on('click', function(e) { gameState.TriggerAutoWin(); });
        $(this.loseSelector).off('click').on('click', function(e) { gameState.TriggerAutoLose(); });
    }

    UnBindGameStateHandlers() {
        $(this.winSelector).off('click');
        $(this.loseSelector).off('click');
    }

    Mount() {
        this.util.Log("mount minesweeperapp");
        this.MountControls();
    }

    UnMount() {
        this.util.Log("unmount minesweeperapp");

        // unmount game
        this.UnBindGameStateHandlers();

        // might unmount before a game has been created
        if (this.minesweeperUi) {
            this.minesweeperUi.UnMount();   
        }

        // unmount controls
        this.UnMountControls();
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
/* harmony import */ var _coreapp_lodashpolyfill_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../coreapp/lodashpolyfill.js */ "./src/js/coreapp/lodashpolyfill.js");




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

        // tracking start time
        this.starttime = undefined;
        this.stoptime = undefined;

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
        let mines = _coreapp_lodashpolyfill_js__WEBPACK_IMPORTED_MODULE_2__.default.sampleSize(_coreapp_lodashpolyfill_js__WEBPACK_IMPORTED_MODULE_2__.default.range(0, this._size.width*this._size.height - 1), this._size.mines);

        for (let k = 0; k < mines.length; k++) {
            let rowIndex = Math.floor(mines[k]/this._size.width);
            let colIndex = mines[k] % this._size.width;
            let mineCell = this._lookup[`${rowIndex + "_" + colIndex}`];

            mineCell.SetIsMine();
            this._mineCells.push(mineCell);               
        }

        // update adjacent mine count by iterating all mines
        for (let k = 0; k < mines.length; k++) {
            let rowIndex = Math.floor(mines[k]/this._size.width);
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
        for(let i = 0; i < this._mineCells.length; i++) {
            if (!this._mineCells[i].IsRevealed)
                this._mineCells[i].SetIsRevealed();
                that.FireCellStateChange(this._mineCells[i]);
        }
    }

    AttemptAutoFill(cell) {
        let autoFills = this.GetAdjacentNonMineNonRevealedCells(cell);
        let that = this;

        for(let i = 0; i < autoFills.length; i++) {
            that.SelectCell(autoFills[i]);
        }
    }

    GetAdjacentNonMineNonRevealedCells(cell) {
        let that = this;
        let adjCellIndices = this.GenerateAdjacentCells(cell.rowIndex, cell.colIndex);
        let adjCells = [];

        for(let i = 0; i < adjCellIndices.length; i++) {
            let c = adjCellIndices[i];
            let adjacentCell = that.CellById(`${c.y + "_" + c.x}`);

            if (!adjacentCell.IsMine && !adjacentCell.IsRevealed)
                adjCells.push(adjacentCell);
        }

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

        if (this.starttime === undefined) {
            // record millis start time
            this.starttime = Date.now();
        }

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
                // oh ohh, lost, so stop the clock
                this.stoptime = Date.now();

                // mark this mine as the one hit
                cell.SetIsLosingMine();
                this.GameCompletionState = _minesweeperconstants_js__WEBPACK_IMPORTED_MODULE_1__.MINESWEEPER_GAME_COMPLETION_STATES.failed;
                this.RevealAllMines();
                this.GameDisabled = true;
                this._util.Log(`player has lost in ${this.stoptime - this.starttime}`);
                this.FireGameCompletionStateChange();

                return;
            }   
            else {
                // yay, you cleared one
                this._currentCellCount++;

                // check if player has won
                if (this._currentCellCount == this._totalCellCountToWin) {
                    // yay
                    this.stoptime = Date.now();
                    this.GameCompletionState = _minesweeperconstants_js__WEBPACK_IMPORTED_MODULE_1__.MINESWEEPER_GAME_COMPLETION_STATES.completed;
                    this.RevealAllMines();                
                    this.GameDisabled = true;
                    this._util.Log(`player has won in ${this.stoptime - this.starttime}`);
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

        for(let i = 0; i < this._cells.length; i++) {
           let innerArray = this._cells[i];

           for(let j = 0; j < innerArray.length; j++) {
                if (!innerArray[j].IsMine)
                    this.SelectCell(innerArray[j]);
           }
        }
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

    Mount() {
        this.logUtil.Log("mount minesweepergrid");

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

    UnMount() {
        this.logUtil.Log("unmount minesweepergrid");
        this.RemoveHandlers();
        this.$rootElement.html(''); 
    }
}

/***/ }),

/***/ "./src/js/stats/appstats.js":
/*!**********************************!*\
  !*** ./src/js/stats/appstats.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppStats": () => (/* binding */ AppStats)
/* harmony export */ });
/* harmony import */ var _coreapp_apputil_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../coreapp/apputil.js */ "./src/js/coreapp/apputil.js");


class AppStats {
    constructor(rootContainerSelector) {
        this.rootContainerSelector = rootContainerSelector;
        this.util = new _coreapp_apputil_js__WEBPACK_IMPORTED_MODULE_0__.AppUtil();

        this.template = `
            <div class='app-container container-sm'>
                <div class='grid-container row'>
                    todo
                </div>
            </div>
        `;
    }
        
    // methods
    MountControls() {
        $(this.rootContainerSelector).html(this.template);
    }

    UnMountControls() {
        $(this.rootContainerSelector).html('');
    }

    Mount() {
        this.util.Log("mount appstats");
        this.MountControls();
    }

    UnMount() {
        this.util.Log("unmount appstats");
        this.UnMountControls();
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
/* harmony import */ var _error_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./error.js */ "./src/js/coreapp/error.js");
/* harmony import */ var _approute__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./approute */ "./src/js/coreapp/approute.js");
/* harmony import */ var _approuter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./approuter */ "./src/js/coreapp/approuter.js");
/* harmony import */ var _stats_appstats_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../stats/appstats.js */ "./src/js/stats/appstats.js");







class App {
    constructor() {
        this.$rootAppContainer = '#app-main';
        this.routes = [
            new _approute__WEBPACK_IMPORTED_MODULE_3__.AppRoute("/", function() { return new _minesweeper_minesweeperapp_js__WEBPACK_IMPORTED_MODULE_1__.Minesweeper(this.$rootAppContainer); }.bind(this)),
            new _approute__WEBPACK_IMPORTED_MODULE_3__.AppRoute("/stats", function() { return new _stats_appstats_js__WEBPACK_IMPORTED_MODULE_5__.AppStats(this.$rootAppContainer); }.bind(this)),
            new _approute__WEBPACK_IMPORTED_MODULE_3__.AppRoute("/error", function() { return new _error_js__WEBPACK_IMPORTED_MODULE_2__.Error(this.$rootAppContainer); }.bind(this))
        ];
    }

    Mount() {
        new _approuter__WEBPACK_IMPORTED_MODULE_4__.AppRouter(this.routes);
        new _navigation_js__WEBPACK_IMPORTED_MODULE_0__.Navigation();
    }
}

// start
new App().Mount();



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9hcHByb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9hcHByb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvcmVhcHAvYXBwdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9jb25maWcvY29uZmlnLWRldi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9lcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9nb29nbGVhdXRoaGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9sb2Rhc2hwb2x5ZmlsbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9uYXZpZ2F0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9taW5lc3dlZXBlci9taW5lc3dlZXBlcmFwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbWluZXN3ZWVwZXIvbWluZXN3ZWVwZXJjb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21pbmVzd2VlcGVyL21pbmVzd2VlcGVyZ2FtZWNlbGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21pbmVzd2VlcGVyL21pbmVzd2VlcGVyZ2FtZXN0YXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9taW5lc3dlZXBlci9taW5lc3dlZXBlcmdyaWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N0YXRzL2FwcHN0YXRzLmpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazov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Y2xhc3MgQXBwUm91dGUge1xyXG4gICAgY29uc3RydWN0b3IocGF0aCwgY29tcG9uZW50Rm4pIHtcclxuICAgICAgICB0aGlzLl9wYXRoID0gcGF0aDtcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRGbiA9IGNvbXBvbmVudEZuO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwYXRoKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXRoO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjb21wb25lbnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvbmVudEZuKCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQXBwVXRpbCB9IGZyb20gJy4vYXBwdXRpbC5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQXBwUm91dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHJvdXRlcykge1xyXG4gICAgICAgIHRoaXMuYXBwVXRpbCA9IG5ldyBBcHBVdGlsKCk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXMgPSByb3V0ZXM7XHJcblxyXG4gICAgICAgIGNvbnN0IHJvdW50ZXJmdW5jdGlvbiA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkUm91dGUoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIHJvdW50ZXJmdW5jdGlvbik7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCByb3VudGVyZnVuY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRSb3V0ZSgpIHtcclxuICAgICAgICBsZXQgcGF0aCA9IHRoaXMucGFyc2VMb2NhdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYXBwVXRpbC5Mb2coYGxvYWRpbmcgcm91dGUgJHtwYXRofWApO1xyXG5cclxuICAgICAgICBsZXQgcm91dGUgPSB0aGlzLmZpbmRDb21wb25lbnQocGF0aCk7XHJcblxyXG4gICAgICAgIGxldCBjb21wb25lbnQ7XHJcblxyXG4gICAgICAgIGlmIChyb3V0ZSlcclxuICAgICAgICAgICAgY29tcG9uZW50ID0gcm91dGUuY29tcG9uZW50O1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb21wb25lbnQgPSB0aGlzLmZpbmRDb21wb25lbnQoJy9lcnJvcicpLmNvbXBvbmVudDtcclxuICAgICAgICAgICAgY29tcG9uZW50LkVycm9yQ29kZSA9ICc0MDQnO1xyXG4gICAgICAgICAgICBjb21wb25lbnQuVXNlckVycm9yTWVzc2FnZSA9ICd3ZSBoYXZlIGNyeXB0byBsb2NrZXJlZCB5b3VyIHN0dWZmJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuTW91bnRDb21wb25lbnQoY29tcG9uZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwYXJzZUxvY2F0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBsb2NhdGlvbi5oYXNoLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCkgfHwgJy8nO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmRDb21wb25lbnQocm91dGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yb3V0ZXMuZmluZChyID0+IHIucGF0aC5tYXRjaChuZXcgUmVnRXhwKGBeXFxcXCR7cm91dGV9JGAsICdnbScpKSkgfHwgdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIFVubW91bnRDdXJyZW50Q29tcG9uZW50KCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1vdW50ZWRDb21wb25lbnQpXHJcbiAgICAgICAgICAgIHRoaXMubW91bnRlZENvbXBvbmVudC5Vbk1vdW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgTW91bnRDb21wb25lbnQoY29tcG9uZW50KSB7XHJcbiAgICAgICAgdGhpcy5Vbm1vdW50Q3VycmVudENvbXBvbmVudCgpO1xyXG4gICAgICAgIHRoaXMubW91bnRlZENvbXBvbmVudCA9IGNvbXBvbmVudDtcclxuICAgICAgICB0aGlzLm1vdW50ZWRDb21wb25lbnQuTW91bnQoKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBFbnZDb25maWcgfSBmcm9tICcuL2NvbmZpZy9jb25maWctQVBQVEFSR0VULmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBVdGlsIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX2xvZyA9IEVudkNvbmZpZy5lbnYgPT09IFwiZGV2XCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIExvZyhlbnRyeSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9sb2cgJiYgZW50cnkpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVudHJ5KTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjb25zdCBBcHBGaXJlYmFzZUNvbmZpZyA9IHtcclxuICAgIGFwaUtleTogXCJBSXphU3lCaXRrRHIzbzhoSkJoLWxtNXRabnR3bUtoVFdpU1BFcGtcIixcclxuICAgIGF1dGhEb21haW46IFwibWVpbi1zd2VlcGVyLWQ1OTk1LmZpcmViYXNlYXBwLmNvbVwiLFxyXG4gICAgcHJvamVjdElkOiBcIm1laW4tc3dlZXBlci1kNTk5NVwiLFxyXG4gICAgc3RvcmFnZUJ1Y2tldDogXCJtZWluLXN3ZWVwZXItZDU5OTUuYXBwc3BvdC5jb21cIixcclxuICAgIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjcwMzkzMzcyNTY4NVwiLFxyXG4gICAgYXBwSWQ6IFwiMTo3MDM5MzM3MjU2ODU6d2ViOjJlZWJjZTViMWQ3YTE2ZWZiYTdlYmNcIlxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IEVudkNvbmZpZyA9IHtcclxuICAgIGVudjogXCJkZXZcIlxyXG59OyIsImV4cG9ydCBjbGFzcyBFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihyb290Q29udGFpbmVyU2VsZWN0b3IpIHtcclxuICAgICAgICB0aGlzLnJvb3RDb250YWluZXJTZWxlY3RvciA9IHJvb3RDb250YWluZXJTZWxlY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgRXJyb3JDb2RlKGh0dHBFcnJvckNvZGUpIHtcclxuICAgICAgICB0aGlzLmh0dHBFcnJvckNvZGUgPSBodHRwRXJyb3JDb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBFcnJvckNvZGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEVycm9yQ29kZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgVXNlckVycm9yTWVzc2FnZShtc2cpIHtcclxuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtc2c7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFVzZXJFcnJvck1lc3NhZ2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZTtcclxuICAgIH1cclxuXHJcbiAgICBNb3VudCgpIHtcclxuICAgICAgICAkKHRoaXMucm9vdENvbnRhaW5lclNlbGVjdG9yKS5odG1sKGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz0nZXJyb3ItY29udGFpbmVyIGNvbnRhaW5lci1zbSBtdC00Jz5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J3JvdyBweS00Jz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdjb2wtMTIgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24tY29udGVudC1taWRkbGUnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdmb250LW1vbm9zcGFjZSBmcy0xJz4ke3RoaXMuRXJyb3JDb2RlfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2NvbC0xMiBkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlciBhbGlnbi1jb250ZW50LW1pZGRsZSBwYi0zIHB4LTMgdGV4dC1jZW50ZXInPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdmcy0zJz4ke3RoaXMuVXNlckVycm9yTWVzc2FnZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgKTtcclxuICAgIH1cclxuXHJcbiAgICBVbk1vdW50KCkge1xyXG4gICAgICAgICQodGhpcy5yb290Q29udGFpbmVyU2VsZWN0b3IpLmh0bWwoJycpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgQXBwRmlyZWJhc2VDb25maWcgfSBmcm9tICcuL2NvbmZpZy9jb25maWctQVBQVEFSR0VULmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBHb29nbGVBdXRoSGFuZGxlciB7XHJcbiAgY29uc3RydWN0b3Iob25TaWduSW4sIG9uU2lnbk91dCkge1xyXG4gICAgdGhpcy5vblNpZ25JbiA9IG9uU2lnbkluO1xyXG4gICAgdGhpcy5vblNpZ25PdXQgPSBvblNpZ25PdXQ7XHJcblxyXG4gICAgLy8gSW5pdGlhbGl6ZSBGaXJlYmFzZSwgY29uZmlnIGRlZmluZWQgZWxzZXdoZXJlXHJcbiAgICBmaXJlYmFzZS5pbml0aWFsaXplQXBwKEFwcEZpcmViYXNlQ29uZmlnKTtcclxuICAgIFxyXG4gICAgLy8gdXNlIG9ubHkgZ29vZ1xyXG4gICAgdGhpcy5nX3Byb3ZpZGVyID0gbmV3IGZpcmViYXNlLmF1dGguR29vZ2xlQXV0aFByb3ZpZGVyKCk7XHJcbiAgICB0aGlzLmdfcHJvdmlkZXIuYWRkU2NvcGUoJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvdXNlcmluZm8ucHJvZmlsZScpO1xyXG4gICAgdGhpcy5nX3Byb3ZpZGVyLnNldEN1c3RvbVBhcmFtZXRlcnMoe1xyXG4gICAgICAnbG9naW5faGludCc6ICd1c2VyQGV4YW1wbGUuY29tJ1xyXG4gICAgfSk7IFxyXG5cclxuICAgIC8vIHNldCBhIGhhbmRsZXIgZm9yIHdoZW4gdG9rZW5zIGFyZSByZWNpZXZlZFxyXG4gICAgZmlyZWJhc2UuYXV0aCgpLm9uQXV0aFN0YXRlQ2hhbmdlZCh1c2VyPT57XHJcbiAgICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5GaXJlT25TaWduSW5IYW5kbGVyKHVzZXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyB0aGlzIGNhbiBmaXJlIHdoZW4gdGhlcmUgaXMgbm8gbG9nZ2VkIGluIHVzZXIgb24gbG9hZFxyXG4gICAgICAgICAgICB0aGlzLkZpcmVPblNpZ25PdXRIYW5kbGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBtZXRob2RzXHJcbiAgRmlyZU9uU2lnbkluSGFuZGxlcihvQXV0aFVzZXIpIHtcclxuICAgIGlmICh0aGlzLm9uU2lnbkluKSB7XHJcbiAgICAgIHRoaXMub25TaWduSW4ob0F1dGhVc2VyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEZpcmVPblNpZ25PdXRIYW5kbGVyKCkge1xyXG4gICAgaWYgKHRoaXMub25TaWduT3V0KSB7XHJcbiAgICAgIHRoaXMub25TaWduT3V0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBTaWduSW5Qb3B1cCgpIHtcclxuICAgIGZpcmViYXNlLmF1dGgoKS5zaWduSW5XaXRoUG9wdXAodGhpcy5nX3Byb3ZpZGVyKTtcclxuICB9XHJcblxyXG4gIFNpZ25JblJlZGlyZWN0KCkge1xyXG4gICAgZmlyZWJhc2UuYXV0aCgpLnNpZ25JbldpdGhSZWRpcmVjdCh0aGlzLmdfcHJvdmlkZXIpO1xyXG4gIH1cclxuXHJcbiAgU2lnbk91dCgpIHtcclxuICAgIGZpcmViYXNlLmF1dGgoKS5zaWduT3V0KCk7XHJcbiAgfVxyXG59XHJcblxyXG4iLCJsZXQgXyA9IChmdW5jdGlvbigpIHtcclxuIFxyXG4gICAgZnVuY3Rpb24gYmFzZVJhbmRvbShsb3dlciwgdXBwZXIpIHtcclxuICAgICAgICByZXR1cm4gbG93ZXIgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAodXBwZXIgLSBsb3dlciArIDEpKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzaHVmZmxlU2VsZihhcnJheSwgc2l6ZSkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IC0xLFxyXG4gICAgICAgICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGgsXHJcbiAgICAgICAgICAgIGxhc3RJbmRleCA9IGxlbmd0aCAtIDE7XHJcblxyXG4gICAgICAgIHNpemUgPSBzaXplID09PSB1bmRlZmluZWQgPyBsZW5ndGggOiBzaXplO1xyXG4gICAgICAgIHdoaWxlICgrK2luZGV4IDwgc2l6ZSkge1xyXG4gICAgICAgICAgICB2YXIgcmFuZCA9IGJhc2VSYW5kb20oaW5kZXgsIGxhc3RJbmRleCksXHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGFycmF5W3JhbmRdO1xyXG5cclxuICAgICAgICAgICAgYXJyYXlbcmFuZF0gPSBhcnJheVtpbmRleF07XHJcbiAgICAgICAgICAgIGFycmF5W2luZGV4XSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhcnJheS5sZW5ndGggPSBzaXplO1xyXG4gICAgICAgIHJldHVybiBhcnJheTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjb3B5QXJyYXkoc291cmNlLCBhcnJheSkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IC0xLFxyXG4gICAgICAgICAgICBsZW5ndGggPSBzb3VyY2UubGVuZ3RoO1xyXG4gIFxyXG4gICAgICAgIGFycmF5IHx8IChhcnJheSA9IEFycmF5KGxlbmd0aCkpO1xyXG4gICAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XHJcbiAgICAgICAgICBhcnJheVtpbmRleF0gPSBzb3VyY2VbaW5kZXhdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYmFzZUNsYW1wKG51bWJlciwgbG93ZXIsIHVwcGVyKSB7XHJcbiAgICAgICAgaWYgKG51bWJlciA9PT0gbnVtYmVyKSB7XHJcbiAgICAgICAgICBpZiAodXBwZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBudW1iZXIgPSBudW1iZXIgPD0gdXBwZXIgPyBudW1iZXIgOiB1cHBlcjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChsb3dlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIG51bWJlciA9IG51bWJlciA+PSBsb3dlciA/IG51bWJlciA6IGxvd2VyO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVtYmVyO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgZnVuY3Rpb24gYXJyYXlTYW1wbGVTaXplKGFycmF5LCBuKSB7XHJcbiAgICAgICAgcmV0dXJuIHNodWZmbGVTZWxmKGNvcHlBcnJheShhcnJheSksIGJhc2VDbGFtcChuLCAwLCBhcnJheS5sZW5ndGgpKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzYW1wbGVTaXplKGNvbGxlY3Rpb24sIG4pIHtcclxuICAgICAgICByZXR1cm4gYXJyYXlTYW1wbGVTaXplKGNvbGxlY3Rpb24sIG4pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJhbmdlKHN0YXJ0LCBlbmQpIHtcclxuICAgICAgICBsZXQgcyA9IHN0YXJ0IHx8IDA7XHJcbiAgICAgICAgbGV0IG51bXMgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xyXG4gICAgICAgICAgICBudW1zLnB1c2goaSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVtcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgbGV0IHB1YiA9IHt9O1xyXG5cclxuICAgIHB1Yi5yYW5nZSA9IHJhbmdlO1xyXG4gICAgcHViLnNhbXBsZVNpemUgPSBzYW1wbGVTaXplO1xyXG5cclxuICAgIHJldHVybiBwdWI7XHJcblxyXG59LmNhbGwodGhpcykpO1xyXG4gIFxyXG5leHBvcnQgZGVmYXVsdCBfOyIsImltcG9ydCB7IEdvb2dsZUF1dGhIYW5kbGVyIH0gZnJvbSAnLi9nb29nbGVhdXRoaGFuZGxlci5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvbiB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmxvZ2luVUkgPSAkKFwiI2xvZ2luLXVpLWNvbnRhaW5lclwiKTtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vIGJpbmQgbG9nIGluXHJcbiAgICAgICAgJChcIiNsb2dpbi1wcm9tcHRcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkgeyAgICAgXHJcbiAgICAgICAgICAgIHRoYXQuYXV0aC5TaWduSW5SZWRpcmVjdCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiI2xvZ2luLXByb2ZpbGVcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkgeyAgICAgXHJcbiAgICAgICAgICAgIHRoYXQuYXV0aC5TaWduT3V0KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX29uU2lnbkluID0gZnVuY3Rpb24ob0F1dGhVc2VyKSB7XHJcbiAgICAgICAgICAgIHRoYXQubG9naW5VSVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoXCIjbG9naW4tcHJvbXB0XCIpXHJcbiAgICAgICAgICAgICAgICAudG9nZ2xlQ2xhc3MoJ2Qtbm9uZScpXHJcbiAgICAgICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgICAgIC5maW5kKFwiI2xvZ2luLXByb2ZpbGVcIilcclxuICAgICAgICAgICAgICAgIC5maW5kKCdpbWcnKVxyXG4gICAgICAgICAgICAgICAgLnByb3AoJ3NyYycsIG9BdXRoVXNlci5waG90b1VSTClcclxuICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgLnRvZ2dsZUNsYXNzKCdkLW5vbmUnKVxyXG4gICAgICAgICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignZGF0YS1zaWduZWQtaW4nLCAndHJ1ZScpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuX29uU2lnbk91dCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAodGhhdC5sb2dpblVJLmF0dHIoJ2RhdGEtc2lnbmVkLWluJykgPT0gJ2ZhbHNlJylcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgIFxyXG4gICAgICAgICAgICB0aGF0LmxvZ2luVUlcclxuICAgICAgICAgICAgICAgIC5maW5kKFwiI2xvZ2luLXByb2ZpbGVcIilcclxuICAgICAgICAgICAgICAgIC5maW5kKCdpbWcnKVxyXG4gICAgICAgICAgICAgICAgLnByb3AoJ3NyYycsICcnKVxyXG4gICAgICAgICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAgICAgICAudG9nZ2xlQ2xhc3MoJ2Qtbm9uZScpXHJcbiAgICAgICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgICAgIC5maW5kKFwiI2xvZ2luLXByb21wdFwiKVxyXG4gICAgICAgICAgICAgICAgLnRvZ2dsZUNsYXNzKCdkLW5vbmUnKVxyXG4gICAgICAgICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignZGF0YS1zaWduZWQtaW4nLCAnZmFsc2UnKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmF1dGggPSBuZXcgR29vZ2xlQXV0aEhhbmRsZXIodGhpcy5fb25TaWduSW4sIHRoaXMuX29uU2lnbk91dCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBBcHBVdGlsIH0gZnJvbSAnLi4vY29yZWFwcC9hcHB1dGlsLmpzJztcclxuaW1wb3J0IHsgTUlORVNXRUVQRVJfR1JJRF9TSVpFUyB9IGZyb20gJy4vbWluZXN3ZWVwZXJjb25zdGFudHMuanMnO1xyXG5pbXBvcnQgeyBNaW5lc3dlZXBlckdhbWVTdGF0ZSB9IGZyb20gJy4vbWluZXN3ZWVwZXJnYW1lc3RhdGUuanMnO1xyXG5pbXBvcnQgeyBNaW5lc3dlZXBlckdhbWVHcmlkIH0gZnJvbSAnLi9taW5lc3dlZXBlcmdyaWQuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1pbmVzd2VlcGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHJvb3RDb250YWluZXJTZWxlY3Rvcikge1xyXG4gICAgICAgIHRoaXMub3B0aW9uc1NlbGVjdG9yID0gJyNnYW1lLW9wdGlvbnMnO1xyXG4gICAgICAgIHRoaXMubmV3R2FtZVNlbGVjdG9yID0gJyNnZW5lcmF0ZS1nYW1lJztcclxuICAgICAgICB0aGlzLndpblNlbGVjdG9yID0gJyN3aW4tZ2FtZSc7XHJcbiAgICAgICAgdGhpcy5sb3NlU2VsZWN0b3IgPSAnI2xvc2UtZ2FtZSc7XHJcbiAgICAgICAgdGhpcy5ncmlkU2VsZWN0b3IgPSAnI2dyaWQnO1xyXG4gICAgICAgIHRoaXMucm9vdENvbnRhaW5lclNlbGVjdG9yID0gcm9vdENvbnRhaW5lclNlbGVjdG9yO1xyXG4gICAgICAgIHRoaXMudXRpbCA9IG5ldyBBcHBVdGlsKCk7XHJcblxyXG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9J2FwcC1jb250YWluZXIgY29udGFpbmVyLXNtJz5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2NvbnRyb2wtY29udGFpbmVyIHJvdyc+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nY29sLTEyIGNvbC1zbS00IHAtMSBwLXNtLTMgZy1zbS0yJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBpZD0nZ2FtZS1vcHRpb25zJyBjbGFzcz0nZm9ybS1zZWxlY3QnPjwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2NvbC0xMiBjb2wtc20tOCBwLTEgcC1zbS0zIGctc20tMic+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgaWQ9J2dlbmVyYXRlLWdhbWUnIHZhbHVlPSduZXcgZ2FtZScgY2xhc3M9J2J0biBidG4tb3V0bGluZS1wcmltYXJ5Jz48L2lucHV0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdidG4tZ3JvdXAnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiBpZD0nd2luLWdhbWUnIHZhbHVlPSdhdXRvIHdpbicgY2xhc3M9J2J0biBidG4tb3V0bGluZS1zZWNvbmRhcnknPjwvaW5wdXQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGlkPSdsb3NlLWdhbWUnIHZhbHVlPSdhdXRvIGxvc2UnIGNsYXNzPSdidG4gYnRuLW91dGxpbmUtc2Vjb25kYXJ5Jz48L2lucHV0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nZ3JpZC1jb250YWluZXIgcm93Jz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPSdncmlkJyBjbGFzcz0nZ3JpZCBjb2wtMTIgdXNlci1zZWxlY3Qtbm9uZSBweS00IHB4LTAnPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGA7XHJcbiAgICB9XHJcbiAgICAgICAgXHJcbiAgICAvLyBtZXRob2RzXHJcbiAgICBNb3VudENvbnRyb2xzKCkge1xyXG4gICAgICAgICQodGhpcy5yb290Q29udGFpbmVyU2VsZWN0b3IpLmh0bWwodGhpcy50ZW1wbGF0ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0ICRzZWxlY3QgPSAkKHRoaXMub3B0aW9uc1NlbGVjdG9yKTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gTUlORVNXRUVQRVJfR1JJRF9TSVpFUylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgICRzZWxlY3QuYXBwZW5kKCQoJzxvcHRpb24+JywgeyBcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBrZXksXHJcbiAgICAgICAgICAgICAgICB0ZXh0IDogYCR7a2V5fSAoJHtNSU5FU1dFRVBFUl9HUklEX1NJWkVTW2tleV0ud2lkdGh9eCR7TUlORVNXRUVQRVJfR1JJRF9TSVpFU1trZXldLmhlaWdodH0sICR7TUlORVNXRUVQRVJfR1JJRF9TSVpFU1trZXldLm1pbmVzfSBtaW5lcylgIFxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBiaW5kIGdhbWUgZ2VuZXJhdGlvbiBoYW5kbGVyc1xyXG4gICAgICAgIHRoaXMuQmluZEdlbmVyYXRlTmV3R2FtZUhhbmRsZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBVbk1vdW50Q29udHJvbHMoKSB7XHJcbiAgICAgICAgdGhpcy5VbkJpbmRHZW5lcmF0ZU5ld0dhbWVIYW5kbGVyKCk7XHJcbiAgICAgICAgJCh0aGlzLnJvb3RDb250YWluZXJTZWxlY3RvcikuaHRtbCgnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgR2VuZXJhdGVOZXdHYW1lKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1pbmVzd2VlcGVyVWkpIHtcclxuICAgICAgICAgICAgdGhpcy5taW5lc3dlZXBlclVpLlVuTW91bnQoKTsgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCAkc2VsZWN0ID0gJCh0aGlzLm9wdGlvbnNTZWxlY3Rvcik7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gJHNlbGVjdC5maW5kKFwib3B0aW9uOnNlbGVjdGVkXCIpLnZhbCgpO1xyXG4gICAgICAgIGxldCBzaXplID0gTUlORVNXRUVQRVJfR1JJRF9TSVpFU1tzZWxlY3RlZF07XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy51dGlsLkxvZyhgZ2VuZXJhdGUgbmV3ICR7c2l6ZS53aWR0aH14JHtzaXplLmhlaWdodH0gZ2FtZWApOyAgXHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBuZXcgZ2FtZSBzdGF0ZVxyXG4gICAgICAgIGxldCBnYW1lU3RhdGUgPSBuZXcgTWluZXN3ZWVwZXJHYW1lU3RhdGUoc2l6ZSwgdGhpcy51dGlsKTtcclxuXHJcbiAgICAgICAgLy8gdW5iaW5kIG9sZCBoYW5kbGVyLCBiaW5kIG5ld1xyXG4gICAgICAgIHRoaXMuVW5CaW5kR2FtZVN0YXRlSGFuZGxlcnMoKTtcclxuICAgICAgICB0aGlzLkJpbmRHYW1lU3RhdGVIYW5kbGVycyhnYW1lU3RhdGUpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgbmV3IHVpXHJcbiAgICAgICAgdGhpcy5taW5lc3dlZXBlclVpID0gbmV3IE1pbmVzd2VlcGVyR2FtZUdyaWQoJCh0aGlzLmdyaWRTZWxlY3RvciksIGdhbWVTdGF0ZSwgdGhpcy51dGlsKTtcclxuICAgICAgICB0aGlzLm1pbmVzd2VlcGVyVWkuTW91bnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBCaW5kR2VuZXJhdGVOZXdHYW1lSGFuZGxlcigpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgJCh0aGlzLm5ld0dhbWVTZWxlY3Rvcikub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkgeyB0aGF0LkdlbmVyYXRlTmV3R2FtZSgpOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBVbkJpbmRHZW5lcmF0ZU5ld0dhbWVIYW5kbGVyKCkge1xyXG4gICAgICAgICQodGhpcy5uZXdHYW1lU2VsZWN0b3IpLm9mZignY2xpY2snKTtcclxuICAgIH1cclxuXHJcbiAgICBCaW5kR2FtZVN0YXRlSGFuZGxlcnMoZ2FtZVN0YXRlKSB7XHJcbiAgICAgICAgJCh0aGlzLndpblNlbGVjdG9yKS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkgeyBnYW1lU3RhdGUuVHJpZ2dlckF1dG9XaW4oKTsgfSk7XHJcbiAgICAgICAgJCh0aGlzLmxvc2VTZWxlY3Rvcikub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHsgZ2FtZVN0YXRlLlRyaWdnZXJBdXRvTG9zZSgpOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBVbkJpbmRHYW1lU3RhdGVIYW5kbGVycygpIHtcclxuICAgICAgICAkKHRoaXMud2luU2VsZWN0b3IpLm9mZignY2xpY2snKTtcclxuICAgICAgICAkKHRoaXMubG9zZVNlbGVjdG9yKS5vZmYoJ2NsaWNrJyk7XHJcbiAgICB9XHJcblxyXG4gICAgTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy51dGlsLkxvZyhcIm1vdW50IG1pbmVzd2VlcGVyYXBwXCIpO1xyXG4gICAgICAgIHRoaXMuTW91bnRDb250cm9scygpO1xyXG4gICAgfVxyXG5cclxuICAgIFVuTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy51dGlsLkxvZyhcInVubW91bnQgbWluZXN3ZWVwZXJhcHBcIik7XHJcblxyXG4gICAgICAgIC8vIHVubW91bnQgZ2FtZVxyXG4gICAgICAgIHRoaXMuVW5CaW5kR2FtZVN0YXRlSGFuZGxlcnMoKTtcclxuXHJcbiAgICAgICAgLy8gbWlnaHQgdW5tb3VudCBiZWZvcmUgYSBnYW1lIGhhcyBiZWVuIGNyZWF0ZWRcclxuICAgICAgICBpZiAodGhpcy5taW5lc3dlZXBlclVpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWluZXN3ZWVwZXJVaS5Vbk1vdW50KCk7ICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB1bm1vdW50IGNvbnRyb2xzXHJcbiAgICAgICAgdGhpcy5Vbk1vdW50Q29udHJvbHMoKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjb25zdCBNSU5FU1dFRVBFUl9HUklEX1NJWkVTID0ge1xyXG4gICAgYmVnaW5uZXIgOiB7IHdpZHRoOiA5LCBoZWlnaHQ6IDksIG1pbmVzOiAxMCwgbGFiZWw6IFwiYmVnaW5uZXJcIn0sXHJcbiAgICBpbnRlcm1lZGlhdGU6IHsgd2lkdGg6IDE2LCBoZWlnaHQ6IDE2LCBtaW5lczogNDAsIGxhYmVsOiBcImludGVybWVkaWF0ZVwifSxcclxuICAgIGV4cGVydDogeyB3aWR0aDogMTYsIGhlaWdodDogMjYsIG1pbmVzOiA4NiwgbGFiZWw6IFwiZXhwZXJ0XCJ9LFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IE1JTkVTV0VFUEVSX0dBTUVfQ09NUExFVElPTl9TVEFURVMgPSB7XHJcbiAgICBzdGFydGVkOiAwLFxyXG4gICAgY29tcGxldGVkOiAxLFxyXG4gICAgZmFpbGVkOiAyXHJcbn07XHJcbiIsImV4cG9ydCBjbGFzcyBNaW5lc3dlZXBlckdhbWVDZWxsIHtcclxuICAgIGNvbnN0cnVjdG9yKGksIGosIGdhbWUpIHtcclxuICAgICAgICB0aGlzLl9pZCA9IGAke2kgKyBcIl9cIiArIGp9YDtcclxuICAgICAgICB0aGlzLl9hZGphY2VudE1pbmVDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5faXNNaW5lID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5faXNMb3NpbmdNaW5lID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5faXNSZXZlYWxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2lzTWFya2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZ2FtZSA9IGdhbWU7XHJcbiAgICAgICAgdGhpcy5pID0gaTtcclxuICAgICAgICB0aGlzLmogPSBqO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGdldHRlcnNcclxuICAgIGdldCBJZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9XHJcbiAgICBnZXQgQWRqYWNlbnRNaW5lQ291bnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkamFjZW50TWluZUNvdW50O1xyXG4gICAgfVxyXG4gICAgZ2V0IElzTWluZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNNaW5lO1xyXG4gICAgfVxyXG4gICAgZ2V0IElzTG9zaW5nTWluZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNMb3NpbmdNaW5lO1xyXG4gICAgfVxyXG4gICAgZ2V0IElzUmV2ZWFsZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzUmV2ZWFsZWQ7XHJcbiAgICB9IFxyXG4gICAgZ2V0IElzTWFya2VkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc01hcmtlZDtcclxuICAgIH0gXHJcbiAgICBnZXQgcm93SW5kZXgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaTtcclxuICAgIH1cclxuICAgIGdldCBjb2xJbmRleCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5qO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBtZXRob2RzXHJcbiAgICBJbmNyZW1lbnRBZGphY2VudE1pbmVDb3VudCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fZ2FtZS5HYW1lSXNQbGF5YWJsZSlcclxuICAgICAgICAgICAgdGhpcy5fYWRqYWNlbnRNaW5lQ291bnQrKztcclxuICAgIH1cclxuICAgIFNldElzTWluZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fZ2FtZS5HYW1lSXNQbGF5YWJsZSlcclxuICAgICAgICAgICAgdGhpcy5faXNNaW5lID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIFNldElzTG9zaW5nTWluZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fZ2FtZS5HYW1lSXNQbGF5YWJsZSlcclxuICAgICAgICAgICAgdGhpcy5faXNMb3NpbmdNaW5lID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIFNldElzUmV2ZWFsZWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2dhbWUuR2FtZUlzUGxheWFibGUpIHtcclxuICAgICAgICAgICAgdGhpcy5faXNSZXZlYWxlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAvLyBubyBuZWVkIGZvciBpdCB0byBiZSBtYXJrZWQgYW55IG1vcmVcclxuICAgICAgICAgICAgdGhpcy5faXNNYXJrZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9ICBcclxuICAgIFNldElzTWFya2VkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9nYW1lLkdhbWVJc1BsYXlhYmxlKSBcclxuICAgICAgICAgICAgdGhpcy5faXNNYXJrZWQgPSB0cnVlO1xyXG4gICAgfSBcclxufSIsImltcG9ydCB7IE1pbmVzd2VlcGVyR2FtZUNlbGwgfSBmcm9tIFwiLi9taW5lc3dlZXBlcmdhbWVjZWxsLmpzXCI7XHJcbmltcG9ydCB7IE1JTkVTV0VFUEVSX0dBTUVfQ09NUExFVElPTl9TVEFURVMgfSBmcm9tIFwiLi9taW5lc3dlZXBlcmNvbnN0YW50cy5qc1wiO1xyXG5pbXBvcnQgeyBkZWZhdWx0IGFzIF8gfSBmcm9tICcuLi9jb3JlYXBwL2xvZGFzaHBvbHlmaWxsLmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBNaW5lc3dlZXBlckdhbWVTdGF0ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihzaXplLCBsb2d1dGlsKSB7XHJcbiAgICAgICAgLy8gc3RhdGVcclxuICAgICAgICB0aGlzLl9sb29rdXAgPSB7fTtcclxuICAgICAgICB0aGlzLl9pZCA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApO1xyXG4gICAgICAgIHRoaXMuX2NlbGxzID0gW107IFxyXG4gICAgICAgIHRoaXMuX21pbmVDZWxscyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3NpemUgPSBzaXplOyBcclxuICAgICAgICB0aGlzLl9nYW1lQ29tcGxldGlvblN0YXRlID0gTUlORVNXRUVQRVJfR0FNRV9DT01QTEVUSU9OX1NUQVRFUy5zdGFydGVkO1xyXG4gICAgICAgIHRoaXMuX3V0aWwgPSBsb2d1dGlsO1xyXG5cclxuICAgICAgICAvLyB0cmFjayBjbGVhcmVkIGNlbGxzIHZzIHRvdGFsIGNlbGxzIG5lZWRlZCB0byB3aW5cclxuICAgICAgICB0aGlzLl90b3RhbENlbGxDb3VudFRvV2luID0gc2l6ZS53aWR0aCpzaXplLmhlaWdodCAtIHNpemUubWluZXM7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudENlbGxDb3VudCA9IDA7XHJcblxyXG4gICAgICAgIC8vIHRyYWNraW5nIHN0YXJ0IHRpbWVcclxuICAgICAgICB0aGlzLnN0YXJ0dGltZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLnN0b3B0aW1lID0gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAvLyBmb3IgZGlhYmxpbmcgdGhlIGdhbWVcclxuICAgICAgICB0aGlzLl9nYW1lRGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3NcclxuICAgICAgICB0aGlzLl9vbkNlbGxTdGF0ZUNoYW5nZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLl9vbkdhbWVDb21wbGV0aW9uU3RhdGVDaGFuZ2UgPSB1bmRlZmluZWQ7XHJcbiBcclxuICAgICAgICAvLyBpbml0LCBzdGFydGluZyB3aXRoIGNlbGxzIHdpdGggZ2VuZXJpYyB2YWx1ZXNcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fc2l6ZS5oZWlnaHQ7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcm93ID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5fc2l6ZS53aWR0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3Q2VsbCA9IG5ldyBNaW5lc3dlZXBlckdhbWVDZWxsKGksIGosIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld0NlbGxJZCA9IG5ld0NlbGwuSWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb29rdXBbbmV3Q2VsbElkXSA9IG5ld0NlbGw7XHJcbiAgICAgICAgICAgICAgICByb3cucHVzaChuZXdDZWxsKTsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fY2VsbHMucHVzaChyb3cpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gc3ByaW5rbGUgbWluZXNcclxuICAgICAgICBsZXQgbWluZXMgPSBfLnNhbXBsZVNpemUoXy5yYW5nZSgwLCB0aGlzLl9zaXplLndpZHRoKnRoaXMuX3NpemUuaGVpZ2h0IC0gMSksIHRoaXMuX3NpemUubWluZXMpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IG1pbmVzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIGxldCByb3dJbmRleCA9IE1hdGguZmxvb3IobWluZXNba10vdGhpcy5fc2l6ZS53aWR0aCk7XHJcbiAgICAgICAgICAgIGxldCBjb2xJbmRleCA9IG1pbmVzW2tdICUgdGhpcy5fc2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgbGV0IG1pbmVDZWxsID0gdGhpcy5fbG9va3VwW2Ake3Jvd0luZGV4ICsgXCJfXCIgKyBjb2xJbmRleH1gXTtcclxuXHJcbiAgICAgICAgICAgIG1pbmVDZWxsLlNldElzTWluZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9taW5lQ2VsbHMucHVzaChtaW5lQ2VsbCk7ICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB1cGRhdGUgYWRqYWNlbnQgbWluZSBjb3VudCBieSBpdGVyYXRpbmcgYWxsIG1pbmVzXHJcbiAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBtaW5lcy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICBsZXQgcm93SW5kZXggPSBNYXRoLmZsb29yKG1pbmVzW2tdL3RoaXMuX3NpemUud2lkdGgpO1xyXG4gICAgICAgICAgICBsZXQgY29sSW5kZXggPSBtaW5lc1trXSAlIHRoaXMuX3NpemUud2lkdGg7XHJcblxyXG4gICAgICAgICAgICBsZXQgb3RoZXJDb29yZHMgPSB0aGlzLkdlbmVyYXRlQWRqYWNlbnRDZWxscyhyb3dJbmRleCwgY29sSW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgLy8gZm9yZWFjaCBhZGphY2VudCwgaWYgaXQgaXNudCBhbHNvIGEgbWluZSwgaW5jcmVtZW50IGl0cyBhZGphY2VudCBtaW5lIGNvdW50XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgb3RoZXJDb29yZHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBhZGphY2VudENlbGwgPSB0aGlzLl9sb29rdXBbYCR7b3RoZXJDb29yZHNbal0ueSArIFwiX1wiICsgb3RoZXJDb29yZHNbal0ueH1gXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWFkamFjZW50Q2VsbC5Jc01pbmUpXHJcbiAgICAgICAgICAgICAgICAgICAgYWRqYWNlbnRDZWxsLkluY3JlbWVudEFkamFjZW50TWluZUNvdW50KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3V0aWwuTG9nKGBuZXcgZ2FtZSBnZW5lcmF0ZWRgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBnZXR0ZXJzXHJcbiAgICBnZXQgR2FtZUlzUGxheWFibGUoKSB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLl9nYW1lRGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IEdhbWVJc1dvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2FtZUNvbXBsZXRpb25TdGF0ZSA9PSBNSU5FU1dFRVBFUl9HQU1FX0NPTVBMRVRJT05fU1RBVEVTLmNvbXBsZXRlZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgU2l6ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgSWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBHYW1lQ29tcGxldGlvblN0YXRlKGdhbWVDb21wbGV0aW9uU3RhdGUpIHtcclxuICAgICAgICB0aGlzLl9nYW1lQ29tcGxldGlvblN0YXRlID0gZ2FtZUNvbXBsZXRpb25TdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgT25DZWxsU3RhdGVDaGFuZ2UoZm4pIHtcclxuICAgICAgICB0aGlzLl9vbkNlbGxTdGF0ZUNoYW5nZSA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBHYW1lRGlzYWJsZWQoZGlzYWJsZWQpIHtcclxuICAgICAgICB0aGlzLl9nYW1lRGlzYWJsZWQgPSBkaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgT25HYW1lQ29tcGxldGlvblN0YXRlQ2hhbmdlKGZuKSB7XHJcbiAgICAgICAgdGhpcy5fb25HYW1lQ29tcGxldGlvblN0YXRlQ2hhbmdlID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgR2VuZXJhdGVBZGphY2VudENlbGxzKHJvd0luZGV4LCBjb2xJbmRleCkge1xyXG4gICAgICAgIC8vIGdlbmVyYXRlIDggYWRqYWNlbnQgY28tb3JkcywgY2xhbXBlZCB0byBpbi1ib3VuZHNcclxuICAgICAgICBsZXQgb3RoZXJDb29yZHMgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKHJvd0luZGV4IC0gMSA+PSAwKSB7XHJcbiAgICAgICAgICAgIGlmIChjb2xJbmRleCAtIDEgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgb3RoZXJDb29yZHMucHVzaCh7eDogY29sSW5kZXgtMSwgeTpyb3dJbmRleC0xfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG90aGVyQ29vcmRzLnB1c2goe3g6IGNvbEluZGV4LCB5OnJvd0luZGV4LTF9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb2xJbmRleCArIDEgPCB0aGlzLl9zaXplLndpZHRoKVxyXG4gICAgICAgICAgICAgICAgb3RoZXJDb29yZHMucHVzaCh7eDogY29sSW5kZXgrMSwgeTpyb3dJbmRleC0xfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChjb2xJbmRleCAtIDEgPj0gMCkgXHJcbiAgICAgICAgICAgIG90aGVyQ29vcmRzLnB1c2goe3g6IGNvbEluZGV4LTEsIHk6cm93SW5kZXh9KTtcclxuXHJcbiAgICAgICAgaWYgKGNvbEluZGV4ICsgMSA8IHRoaXMuX3NpemUud2lkdGgpXHJcbiAgICAgICAgICAgIG90aGVyQ29vcmRzLnB1c2goe3g6IGNvbEluZGV4KzEsIHk6cm93SW5kZXh9KTtcclxuXHJcbiAgICAgICAgaWYgKHJvd0luZGV4ICsgMSA8IHRoaXMuX3NpemUuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIGlmIChjb2xJbmRleCAtIDEgPj0gMCkgXHJcbiAgICAgICAgICAgICAgICBvdGhlckNvb3Jkcy5wdXNoKHt4OiBjb2xJbmRleC0xLCB5OnJvd0luZGV4KzF9KTtcclxuXHJcbiAgICAgICAgICAgIG90aGVyQ29vcmRzLnB1c2goe3g6IGNvbEluZGV4LCB5OnJvd0luZGV4KzF9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb2xJbmRleCArIDEgPCB0aGlzLl9zaXplLndpZHRoKVxyXG4gICAgICAgICAgICAgICAgb3RoZXJDb29yZHMucHVzaCh7eDogY29sSW5kZXgrMSwgeTpyb3dJbmRleCsxfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3RoZXJDb29yZHM7XHJcbiAgICB9XHJcblxyXG4gICAgQ2VsbEJ5SWQoY2VsbElkKSB7XHJcbiAgICAgICAgbGV0IGNlbGwgPSB0aGlzLl9sb29rdXBbY2VsbElkXTtcclxuXHJcbiAgICAgICAgaWYgKGNlbGwgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgdGhyb3cgYGNlbGwgd2l0aCBpZCAke2NlbGxJZH0gY291bGQgbm90IGJlIGZvdW5kYDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNlbGw7XHJcbiAgICB9XHJcblxyXG4gICAgUmV2ZWFsQWxsTWluZXMgKCkge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fbWluZUNlbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fbWluZUNlbGxzW2ldLklzUmV2ZWFsZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9taW5lQ2VsbHNbaV0uU2V0SXNSZXZlYWxlZCgpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5GaXJlQ2VsbFN0YXRlQ2hhbmdlKHRoaXMuX21pbmVDZWxsc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEF0dGVtcHRBdXRvRmlsbChjZWxsKSB7XHJcbiAgICAgICAgbGV0IGF1dG9GaWxscyA9IHRoaXMuR2V0QWRqYWNlbnROb25NaW5lTm9uUmV2ZWFsZWRDZWxscyhjZWxsKTtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhdXRvRmlsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhhdC5TZWxlY3RDZWxsKGF1dG9GaWxsc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEdldEFkamFjZW50Tm9uTWluZU5vblJldmVhbGVkQ2VsbHMoY2VsbCkge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICBsZXQgYWRqQ2VsbEluZGljZXMgPSB0aGlzLkdlbmVyYXRlQWRqYWNlbnRDZWxscyhjZWxsLnJvd0luZGV4LCBjZWxsLmNvbEluZGV4KTtcclxuICAgICAgICBsZXQgYWRqQ2VsbHMgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGFkakNlbGxJbmRpY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjID0gYWRqQ2VsbEluZGljZXNbaV07XHJcbiAgICAgICAgICAgIGxldCBhZGphY2VudENlbGwgPSB0aGF0LkNlbGxCeUlkKGAke2MueSArIFwiX1wiICsgYy54fWApO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFhZGphY2VudENlbGwuSXNNaW5lICYmICFhZGphY2VudENlbGwuSXNSZXZlYWxlZClcclxuICAgICAgICAgICAgICAgIGFkakNlbGxzLnB1c2goYWRqYWNlbnRDZWxsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhZGpDZWxscztcclxuICAgIH1cclxuXHJcbiAgICBGaXJlQ2VsbFN0YXRlQ2hhbmdlIChjaGFuZ2VkQ2VsbCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9vbkNlbGxTdGF0ZUNoYW5nZSlcclxuICAgICAgICAgICAgdGhpcy5fb25DZWxsU3RhdGVDaGFuZ2UoY2hhbmdlZENlbGwpO1xyXG4gICAgfVxyXG5cclxuICAgIEZpcmVHYW1lQ29tcGxldGlvblN0YXRlQ2hhbmdlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9vbkdhbWVDb21wbGV0aW9uU3RhdGVDaGFuZ2UpXHJcbiAgICAgICAgICAgIHRoaXMuX29uR2FtZUNvbXBsZXRpb25TdGF0ZUNoYW5nZSh0aGlzLl9nYW1lQ29tcGxldGlvblN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBNYXJrQ2VsbChjZWxsKSB7XHJcbiAgICAgICAgdGhpcy5fdXRpbC5Mb2coYG1hcmsgY2VsbCBpZCAke2NlbGwuSWR9YCk7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5HYW1lSXNQbGF5YWJsZSkge1xyXG4gICAgICAgICAgICAvLyBkb24ndCBkbyBhbnl0aGluZ1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWNlbGwuSXNSZXZlYWxlZCkge1xyXG5cclxuICAgICAgICAgICAgY2VsbC5TZXRJc01hcmtlZCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gdHJpZ2dlciBpdCB0byByZS1yZW5kZXJcclxuICAgICAgICAgICAgdGhpcy5GaXJlQ2VsbFN0YXRlQ2hhbmdlKGNlbGwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBNYXJrQ2VsbGJ5SWQoY2VsbElkKSB7XHJcbiAgICAgICAgbGV0IGNlbGwgPSB0aGlzLkNlbGxCeUlkKGNlbGxJZCk7ICAgICAgIFxyXG5cclxuICAgICAgICB0aGlzLk1hcmtDZWxsKGNlbGwpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBTZWxlY3RDZWxsKGNlbGwpIHtcclxuICAgICAgICB0aGlzLl91dGlsLkxvZyhgc2VsZWN0IGNlbGwgaWQgJHtjZWxsLklkfWApO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zdGFydHRpbWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAvLyByZWNvcmQgbWlsbGlzIHN0YXJ0IHRpbWVcclxuICAgICAgICAgICAgdGhpcy5zdGFydHRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLkdhbWVJc1BsYXlhYmxlKSB7XHJcbiAgICAgICAgICAgIC8vIGRvbid0IGRvIGFueXRoaW5nXHJcbiAgICAgICAgICAgIHRoaXMuX3V0aWwuTG9nKGBnYW1lIGhhcyBhbHJlYWR5IGJlZW4gJHt0aGlzLl9nYW1lQ29tcGxldGlvblN0YXRlID09IE1JTkVTV0VFUEVSX0dBTUVfQ09NUExFVElPTl9TVEFURVMuY29tcGxldGVkID8gXCJ3b24hXCIgOiBcImxvc3QhXCJ9YCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghY2VsbC5Jc1JldmVhbGVkKSB7XHJcbiAgICAgICAgICAgIC8vIHJldmVhbCB0aGlzIGNlbGxcclxuICAgICAgICAgICAgY2VsbC5TZXRJc1JldmVhbGVkKCk7XHJcblxyXG4gICAgICAgICAgICAvLyB0cmlnZ2VyIGl0IHRvIHJlLXJlbmRlclxyXG4gICAgICAgICAgICB0aGlzLkZpcmVDZWxsU3RhdGVDaGFuZ2UoY2VsbCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2VsbC5Jc01pbmUpIHtcclxuICAgICAgICAgICAgICAgIC8vIG9oIG9oaCwgbG9zdCwgc28gc3RvcCB0aGUgY2xvY2tcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcHRpbWUgPSBEYXRlLm5vdygpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIG1hcmsgdGhpcyBtaW5lIGFzIHRoZSBvbmUgaGl0XHJcbiAgICAgICAgICAgICAgICBjZWxsLlNldElzTG9zaW5nTWluZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5HYW1lQ29tcGxldGlvblN0YXRlID0gTUlORVNXRUVQRVJfR0FNRV9DT01QTEVUSU9OX1NUQVRFUy5mYWlsZWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJldmVhbEFsbE1pbmVzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkdhbWVEaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91dGlsLkxvZyhgcGxheWVyIGhhcyBsb3N0IGluICR7dGhpcy5zdG9wdGltZSAtIHRoaXMuc3RhcnR0aW1lfWApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5GaXJlR2FtZUNvbXBsZXRpb25TdGF0ZUNoYW5nZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSAgIFxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIHlheSwgeW91IGNsZWFyZWQgb25lXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50Q2VsbENvdW50Kys7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgcGxheWVyIGhhcyB3b25cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXJyZW50Q2VsbENvdW50ID09IHRoaXMuX3RvdGFsQ2VsbENvdW50VG9XaW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB5YXlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3B0aW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkdhbWVDb21wbGV0aW9uU3RhdGUgPSBNSU5FU1dFRVBFUl9HQU1FX0NPTVBMRVRJT05fU1RBVEVTLmNvbXBsZXRlZDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlJldmVhbEFsbE1pbmVzKCk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuR2FtZURpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl91dGlsLkxvZyhgcGxheWVyIGhhcyB3b24gaW4gJHt0aGlzLnN0b3B0aW1lIC0gdGhpcy5zdGFydHRpbWV9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5GaXJlR2FtZUNvbXBsZXRpb25TdGF0ZUNoYW5nZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIG90aGVyd2lzZSwgY2VsbCBpcyBub3QgYSBtaW5lLCBwbGF5ZXIgaGFzIG5vdCB5ZXQgd29uLCBzbyBhdHRlbXB0IHRvIGF1dG9maWxsIGlmIHRoZSBjZWxsIGlzIGJsYW5rXHJcbiAgICAgICAgICAgIGlmIChjZWxsLkFkamFjZW50TWluZUNvdW50ID09IDApIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIHRoaXMuQXR0ZW1wdEF1dG9GaWxsKGNlbGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFNlbGVjdENlbGxCeUlkKGNlbGxJZCkge1xyXG4gICAgICAgIGxldCBjZWxsID0gdGhpcy5DZWxsQnlJZChjZWxsSWQpOyAgICAgICBcclxuXHJcbiAgICAgICAgdGhpcy5TZWxlY3RDZWxsKGNlbGwpO1xyXG4gICAgfVxyXG5cclxuICAgIFRyaWdnZXJBdXRvV2luKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5HYW1lSXNQbGF5YWJsZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fY2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICBsZXQgaW5uZXJBcnJheSA9IHRoaXMuX2NlbGxzW2ldO1xyXG5cclxuICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgaW5uZXJBcnJheS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpbm5lckFycmF5W2pdLklzTWluZSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlNlbGVjdENlbGwoaW5uZXJBcnJheVtqXSk7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBUcmlnZ2VyQXV0b0xvc2UoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLkdhbWVJc1BsYXlhYmxlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIHRoaXMuU2VsZWN0Q2VsbCh0aGlzLl9taW5lQ2VsbHNbMF0pO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IE1JTkVTV0VFUEVSX0dBTUVfQ09NUExFVElPTl9TVEFURVMgfSBmcm9tIFwiLi9taW5lc3dlZXBlcmNvbnN0YW50cy5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1pbmVzd2VlcGVyR2FtZUdyaWQge1xyXG4gICAgY29uc3RydWN0b3IoJHJvb3RFbGVtZW50LCBnYW1lU3RhdGUsIGxvZ1V0aWwpIHtcclxuICAgICAgICB0aGlzLiRyb290RWxlbWVudCA9ICRyb290RWxlbWVudDtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IGdhbWVTdGF0ZTsgIFxyXG4gICAgICAgIHRoaXMubG9nVXRpbCA9IGxvZ1V0aWw7XHJcbiAgICB9IFxyXG5cclxuICAgIC8vIG1ldGhvZHNcclxuXHJcbiAgICBHZXRDZWxsQ2xhc3MoY2VsbCkge1xyXG4gICAgICAgIGlmICghY2VsbC5Jc1JldmVhbGVkKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjZWxsLklzTWFya2VkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiaGlkZGVuIG1hcmtlZFwiO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFwiaGlkZGVuXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY2VsbC5Jc01pbmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNlbGwuSXNMb3NpbmdNaW5lID8gXCJtaW5lIHRyaWdnZXJlZFwiIDogXCJtaW5lIFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAoY2VsbC5BZGphY2VudE1pbmVDb3VudCA+IDApIFxyXG4gICAgICAgICAgICByZXR1cm4gYG9wZW4tJHtjZWxsLkFkamFjZW50TWluZUNvdW50fWA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIFwiY2xlYXJcIjtcclxuICAgIH1cclxuXHJcbiAgICBHZXRDZWxsQ29udGVudChjZWxsKSB7XHJcbiAgICAgICAgbGV0IGNlbGxHbHlwaCA9IGNlbGwuSXNSZXZlYWxlZCA/IFxyXG4gICAgICAgIChjZWxsLklzTWluZSA/IFxyXG4gICAgICAgICAgICBcIvCfkqNcIiA6IFxyXG4gICAgICAgICAgICAgICAgKGNlbGwuQWRqYWNlbnRNaW5lQ291bnQgPiAwID8gY2VsbC5BZGphY2VudE1pbmVDb3VudCA6IFwiXCIpXHJcbiAgICAgICAgKSBcclxuICAgICAgICA6IFwiXCI7XHJcblxyXG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz0nY2VsbC1pbm5lcic+JHtjZWxsR2x5cGh9PC9kaXY+YDtcclxuICAgIH1cclxuXHJcbiAgICBHZXRJbml0aWFsQ2VsbEh0bWwoY2VsbElkKSB7XHJcbiAgICAgICAgbGV0IGNlbGwgPSB0aGlzLmdhbWVTdGF0ZS5DZWxsQnlJZChjZWxsSWQpO1xyXG5cclxuICAgICAgICBsZXQgY2VsbENsYXNzID0gdGhpcy5HZXRDZWxsQ2xhc3MoY2VsbCk7XHJcbiAgICAgICAgbGV0IGNlbGxDb250ZW50ID0gdGhpcy5HZXRDZWxsQ29udGVudChjZWxsKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGA8dGQgY2xhc3M9J2NlbGwgJHtjZWxsQ2xhc3N9JyBpZD0nJHtjZWxsSWR9Jz4ke2NlbGxDb250ZW50fTwvdGQ+YDtcclxuICAgIH1cclxuXHJcbiAgICBSZW1vdmVIYW5kbGVycygpIHtcclxuICAgICAgICB0aGlzLiRyb290RWxlbWVudC5maW5kKCd0YWJsZScpXHJcbiAgICAgICAgICAgIC5vZmYoJ2NvbnRleHRtZW51JylcclxuICAgICAgICAgICAgLm9mZignY2xpY2snKTtcclxuICAgIH1cclxuXHJcbiAgICBBZGRIYW5kbGVycygpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vIGFkZCBzdXBwcmVzcyBjb250ZXh0IG1lbnVcclxuICAgICAgICB0aGlzLiRyb290RWxlbWVudC5maW5kKCd0YWJsZScpLm9uKCdjb250ZXh0bWVudScsICd0ZC5jZWxsJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUud2hpY2ggPT0gMykge1xyXG4gICAgICAgICAgICAgICAgLy8gcmlnaHQgbW91c2VcclxuICAgICAgICAgICAgICAgIHRoYXQuZ2FtZVN0YXRlLk1hcmtDZWxsYnlJZChlLmN1cnJlbnRUYXJnZXQuaWQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIGFkZCBzZWxlY3QgaGFuZGxsZXJcclxuICAgICAgICB0aGlzLiRyb290RWxlbWVudC5maW5kKCd0YWJsZScpLm9uKCdjbGljaycsICd0ZC5jZWxsJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZihlLndoaWNoID09IDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIGxlZnQtbW91c2VcclxuICAgICAgICAgICAgICAgIHRoYXQuZ2FtZVN0YXRlLlNlbGVjdENlbGxCeUlkKGUuY3VycmVudFRhcmdldC5pZCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBNb3VudCgpIHtcclxuICAgICAgICB0aGlzLmxvZ1V0aWwuTG9nKFwibW91bnQgbWluZXN3ZWVwZXJncmlkXCIpO1xyXG5cclxuICAgICAgICAvLyByZW1vdmUgYW55IGV4aXN0aW5nIGhhbmRsZXJzXHJcbiAgICAgICAgdGhpcy5SZW1vdmVIYW5kbGVycygpO1xyXG5cclxuICAgICAgICBsZXQgc3RhY2sgPSBbXTtcclxuXHJcbiAgICAgICAgLy8gdGVtcGxhdGUgaHRtbCBjZWxsIGNvbnRlbnRcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5nYW1lU3RhdGUuU2l6ZS5oZWlnaHQ7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcm93SHRtbCA9IFwiPHRyPlwiO1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5nYW1lU3RhdGUuU2l6ZS53aWR0aDsgaisrKSB7ICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcm93SHRtbCArPSB0aGlzLkdldEluaXRpYWxDZWxsSHRtbCggaSArIFwiX1wiICsgaik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcm93SHRtbCArPSBcIjwvdHI+XCI7XHJcbiAgICAgICAgICAgIHN0YWNrLnB1c2gocm93SHRtbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyByZW5kZXJcclxuICAgICAgICB0aGlzLiRyb290RWxlbWVudC5odG1sKGA8dGFibGUgY2xhc3M9JyR7dGhpcy5nYW1lU3RhdGUuU2l6ZS5sYWJlbH0nPjx0Ym9keT4ke3N0YWNrLmpvaW4oXCJcIil9PC90Ym9keT48L3RhYmxlPmApOyBcclxuXHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIC8vIGFkZCBjZWxsIHN0YXRlIGNoYW5nZSBjYWxsYmFjayBmb3IgcmVuZGVyaW5nIGluZGl2aWR1YWwgY2VsbHNcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZS5PbkNlbGxTdGF0ZUNoYW5nZSA9IGZ1bmN0aW9uKGNlbGwpIHtcclxuICAgICAgICAgICAgLy8gcmUtcmVuZGVyIHRoZSBjZWxsXHJcbiAgICAgICAgICAgIHRoYXQubG9nVXRpbC5Mb2coYHJlbmRlciBjZWxsICR7Y2VsbC5JZH0gaW4gZ2FtZSB3aXRoIGlkICR7dGhhdC5nYW1lU3RhdGUuSWR9YCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgY2VsbENsYXNzID0gdGhhdC5HZXRDZWxsQ2xhc3MoY2VsbCk7XHJcbiAgICAgICAgICAgIGxldCBjZWxsQ29udGVudCA9IHRoYXQuR2V0Q2VsbENvbnRlbnQoY2VsbCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkKGAjJHtjZWxsLklkfWApXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoKVxyXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKGBjZWxsICR7Y2VsbENsYXNzfWApIFxyXG4gICAgICAgICAgICAgICAgLmh0bWwoY2VsbENvbnRlbnQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIGdhbWUgY29tcGxldGlvbiBzdGF0ZSBoYW5kbGVyXHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUuT25HYW1lQ29tcGxldGlvblN0YXRlQ2hhbmdlID0gZnVuY3Rpb24oZ2FtZUNvbXBsZXRpb25TdGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAoZ2FtZUNvbXBsZXRpb25TdGF0ZSA9PSBNSU5FU1dFRVBFUl9HQU1FX0NPTVBMRVRJT05fU1RBVEVTLmNvbXBsZXRlZClcclxuICAgICAgICAgICAgICAgIHRoYXQuJHJvb3RFbGVtZW50LmFwcGVuZChcIjxkaXYgY2xhc3M9J2VuZC1zdGF0ZSc+PGltZyBzcmM9Jy4vaW1nL3dpbi5naWYnPjwvaW1nPjwvZGl2PlwiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChnYW1lQ29tcGxldGlvblN0YXRlID09IE1JTkVTV0VFUEVSX0dBTUVfQ09NUExFVElPTl9TVEFURVMuZmFpbGVkKVxyXG4gICAgICAgICAgICAgICAgdGhhdC4kcm9vdEVsZW1lbnQuYXBwZW5kKFwiPGRpdiBjbGFzcz0nZW5kLXN0YXRlJz48aW1nIHNyYz0nLi9pbWcvbG9zZS5naWYnPjwvaW1nPjwvZGl2PlwiKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBiaW5kIGhhbmRsZXJzXHJcbiAgICAgICAgdGhpcy5BZGRIYW5kbGVycygpO1xyXG4gICAgfVxyXG5cclxuICAgIFVuTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5sb2dVdGlsLkxvZyhcInVubW91bnQgbWluZXN3ZWVwZXJncmlkXCIpO1xyXG4gICAgICAgIHRoaXMuUmVtb3ZlSGFuZGxlcnMoKTtcclxuICAgICAgICB0aGlzLiRyb290RWxlbWVudC5odG1sKCcnKTsgXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBBcHBVdGlsIH0gZnJvbSAnLi4vY29yZWFwcC9hcHB1dGlsLmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBTdGF0cyB7XHJcbiAgICBjb25zdHJ1Y3Rvcihyb290Q29udGFpbmVyU2VsZWN0b3IpIHtcclxuICAgICAgICB0aGlzLnJvb3RDb250YWluZXJTZWxlY3RvciA9IHJvb3RDb250YWluZXJTZWxlY3RvcjtcclxuICAgICAgICB0aGlzLnV0aWwgPSBuZXcgQXBwVXRpbCgpO1xyXG5cclxuICAgICAgICB0aGlzLnRlbXBsYXRlID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPSdhcHAtY29udGFpbmVyIGNvbnRhaW5lci1zbSc+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdncmlkLWNvbnRhaW5lciByb3cnPlxyXG4gICAgICAgICAgICAgICAgICAgIHRvZG9cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgLy8gbWV0aG9kc1xyXG4gICAgTW91bnRDb250cm9scygpIHtcclxuICAgICAgICAkKHRoaXMucm9vdENvbnRhaW5lclNlbGVjdG9yKS5odG1sKHRoaXMudGVtcGxhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIFVuTW91bnRDb250cm9scygpIHtcclxuICAgICAgICAkKHRoaXMucm9vdENvbnRhaW5lclNlbGVjdG9yKS5odG1sKCcnKTtcclxuICAgIH1cclxuXHJcbiAgICBNb3VudCgpIHtcclxuICAgICAgICB0aGlzLnV0aWwuTG9nKFwibW91bnQgYXBwc3RhdHNcIik7XHJcbiAgICAgICAgdGhpcy5Nb3VudENvbnRyb2xzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgVW5Nb3VudCgpIHtcclxuICAgICAgICB0aGlzLnV0aWwuTG9nKFwidW5tb3VudCBhcHBzdGF0c1wiKTtcclxuICAgICAgICB0aGlzLlVuTW91bnRDb250cm9scygpO1xyXG4gICAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBOYXZpZ2F0aW9uIH0gZnJvbSAnLi9uYXZpZ2F0aW9uLmpzJztcclxuaW1wb3J0IHsgTWluZXN3ZWVwZXIgfSBmcm9tICcuLi9taW5lc3dlZXBlci9taW5lc3dlZXBlcmFwcC5qcyc7XHJcbmltcG9ydCB7IEVycm9yIH0gZnJvbSAnLi9lcnJvci5qcyc7XHJcbmltcG9ydCB7IEFwcFJvdXRlIH0gZnJvbSAnLi9hcHByb3V0ZSc7XHJcbmltcG9ydCB7IEFwcFJvdXRlciB9IGZyb20gJy4vYXBwcm91dGVyJztcclxuaW1wb3J0IHsgQXBwU3RhdHMgfSBmcm9tICcuLy4uL3N0YXRzL2FwcHN0YXRzLmpzJztcclxuXHJcbmNsYXNzIEFwcCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLiRyb290QXBwQ29udGFpbmVyID0gJyNhcHAtbWFpbic7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXMgPSBbXHJcbiAgICAgICAgICAgIG5ldyBBcHBSb3V0ZShcIi9cIiwgZnVuY3Rpb24oKSB7IHJldHVybiBuZXcgTWluZXN3ZWVwZXIodGhpcy4kcm9vdEFwcENvbnRhaW5lcik7IH0uYmluZCh0aGlzKSksXHJcbiAgICAgICAgICAgIG5ldyBBcHBSb3V0ZShcIi9zdGF0c1wiLCBmdW5jdGlvbigpIHsgcmV0dXJuIG5ldyBBcHBTdGF0cyh0aGlzLiRyb290QXBwQ29udGFpbmVyKTsgfS5iaW5kKHRoaXMpKSxcclxuICAgICAgICAgICAgbmV3IEFwcFJvdXRlKFwiL2Vycm9yXCIsIGZ1bmN0aW9uKCkgeyByZXR1cm4gbmV3IEVycm9yKHRoaXMuJHJvb3RBcHBDb250YWluZXIpOyB9LmJpbmQodGhpcykpXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICBNb3VudCgpIHtcclxuICAgICAgICBuZXcgQXBwUm91dGVyKHRoaXMucm91dGVzKTtcclxuICAgICAgICBuZXcgTmF2aWdhdGlvbigpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBzdGFydFxyXG5uZXcgQXBwKCkuTW91bnQoKTtcclxuXHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9