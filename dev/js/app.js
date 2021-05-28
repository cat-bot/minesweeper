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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9hcHByb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9hcHByb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvcmVhcHAvYXBwdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9jb25maWcvY29uZmlnLWRldi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9lcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9nb29nbGVhdXRoaGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9sb2Rhc2hwb2x5ZmlsbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9uYXZpZ2F0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9taW5lc3dlZXBlci9taW5lc3dlZXBlcmFwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbWluZXN3ZWVwZXIvbWluZXN3ZWVwZXJjb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21pbmVzd2VlcGVyL21pbmVzd2VlcGVyZ2FtZWNlbGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21pbmVzd2VlcGVyL21pbmVzd2VlcGVyZ2FtZXN0YXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9taW5lc3dlZXBlci9taW5lc3dlZXBlcmdyaWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N0YXRzL2FwcHN0YXRzLmpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazov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Q0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7Ozs7QUNySWdEOztBQUV6QztBQUNQO0FBQ0E7QUFDQSx3QkFBd0Isd0RBQU87O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7O1VDbENBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNONkM7QUFDa0I7QUFDNUI7QUFDRztBQUNFO0FBQ1U7O0FBRWxEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLCtDQUFRLGtCQUFrQixZQUFZLHVFQUFXLHlCQUF5QixFQUFFO0FBQzVGLGdCQUFnQiwrQ0FBUSx1QkFBdUIsWUFBWSx3REFBUSx5QkFBeUIsRUFBRTtBQUM5RixnQkFBZ0IsK0NBQVEsdUJBQXVCLFlBQVksNENBQUsseUJBQXlCLEVBQUU7QUFDM0Y7QUFDQTs7QUFFQTtBQUNBLFlBQVksaURBQVM7QUFDckIsWUFBWSxzREFBVTtBQUN0QjtBQUNBOztBQUVBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEFwcFJvdXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKHBhdGgsIGNvbXBvbmVudEZuKSB7XHJcbiAgICAgICAgdGhpcy5fcGF0aCA9IHBhdGg7XHJcbiAgICAgICAgdGhpcy5fY29tcG9uZW50Rm4gPSBjb21wb25lbnRGbjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcGF0aCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGF0aDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY29tcG9uZW50KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wb25lbnRGbigpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEFwcFV0aWwgfSBmcm9tICcuL2FwcHV0aWwuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFwcFJvdXRlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihyb3V0ZXMpIHtcclxuICAgICAgICB0aGlzLmFwcFV0aWwgPSBuZXcgQXBwVXRpbCgpO1xyXG4gICAgICAgIHRoaXMucm91dGVzID0gcm91dGVzO1xyXG5cclxuICAgICAgICBjb25zdCByb3VudGVyZnVuY3Rpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFJvdXRlKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCByb3VudGVyZnVuY3Rpb24pO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgcm91bnRlcmZ1bmN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkUm91dGUoKSB7XHJcbiAgICAgICAgbGV0IHBhdGggPSB0aGlzLnBhcnNlTG9jYXRpb24oKTtcclxuICAgICAgICB0aGlzLmFwcFV0aWwuTG9nKGBsb2FkaW5nIHJvdXRlICR7cGF0aH1gKTtcclxuXHJcbiAgICAgICAgbGV0IHJvdXRlID0gdGhpcy5maW5kQ29tcG9uZW50KHBhdGgpO1xyXG5cclxuICAgICAgICBsZXQgY29tcG9uZW50O1xyXG5cclxuICAgICAgICBpZiAocm91dGUpXHJcbiAgICAgICAgICAgIGNvbXBvbmVudCA9IHJvdXRlLmNvbXBvbmVudDtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29tcG9uZW50ID0gdGhpcy5maW5kQ29tcG9uZW50KCcvZXJyb3InKS5jb21wb25lbnQ7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudC5FcnJvckNvZGUgPSAnNDA0JztcclxuICAgICAgICAgICAgY29tcG9uZW50LlVzZXJFcnJvck1lc3NhZ2UgPSAnd2UgaGF2ZSBjcnlwdG8gbG9ja2VyZWQgeW91ciBzdHVmZic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLk1vdW50Q29tcG9uZW50KGNvbXBvbmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcGFyc2VMb2NhdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gbG9jYXRpb24uaGFzaC5zbGljZSgxKS50b0xvd2VyQ2FzZSgpIHx8ICcvJztcclxuICAgIH1cclxuXHJcbiAgICBmaW5kQ29tcG9uZW50KHJvdXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucm91dGVzLmZpbmQociA9PiByLnBhdGgubWF0Y2gobmV3IFJlZ0V4cChgXlxcXFwke3JvdXRlfSRgLCAnZ20nKSkpIHx8IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBVbm1vdW50Q3VycmVudENvbXBvbmVudCgpIHtcclxuICAgICAgICBpZiAodGhpcy5tb3VudGVkQ29tcG9uZW50KVxyXG4gICAgICAgICAgICB0aGlzLm1vdW50ZWRDb21wb25lbnQuVW5Nb3VudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIE1vdW50Q29tcG9uZW50KGNvbXBvbmVudCkge1xyXG4gICAgICAgIHRoaXMuVW5tb3VudEN1cnJlbnRDb21wb25lbnQoKTtcclxuICAgICAgICB0aGlzLm1vdW50ZWRDb21wb25lbnQgPSBjb21wb25lbnQ7XHJcbiAgICAgICAgdGhpcy5tb3VudGVkQ29tcG9uZW50Lk1vdW50KCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRW52Q29uZmlnIH0gZnJvbSAnLi9jb25maWcvY29uZmlnLUFQUFRBUkdFVC5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQXBwVXRpbCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9sb2cgPSBFbnZDb25maWcuZW52ID09PSBcImRldlwiO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBMb2coZW50cnkpIHtcclxuICAgICAgICBpZiAodGhpcy5fbG9nICYmIGVudHJ5KVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlbnRyeSk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY29uc3QgQXBwRmlyZWJhc2VDb25maWcgPSB7XHJcbiAgICBhcGlLZXk6IFwiQUl6YVN5Qml0a0RyM284aEpCaC1sbTV0Wm50d21LaFRXaVNQRXBrXCIsXHJcbiAgICBhdXRoRG9tYWluOiBcIm1laW4tc3dlZXBlci1kNTk5NS5maXJlYmFzZWFwcC5jb21cIixcclxuICAgIHByb2plY3RJZDogXCJtZWluLXN3ZWVwZXItZDU5OTVcIixcclxuICAgIHN0b3JhZ2VCdWNrZXQ6IFwibWVpbi1zd2VlcGVyLWQ1OTk1LmFwcHNwb3QuY29tXCIsXHJcbiAgICBtZXNzYWdpbmdTZW5kZXJJZDogXCI3MDM5MzM3MjU2ODVcIixcclxuICAgIGFwcElkOiBcIjE6NzAzOTMzNzI1Njg1OndlYjoyZWViY2U1YjFkN2ExNmVmYmE3ZWJjXCJcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBFbnZDb25maWcgPSB7XHJcbiAgICBlbnY6IFwiZGV2XCJcclxufTsiLCJleHBvcnQgY2xhc3MgRXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3Iocm9vdENvbnRhaW5lclNlbGVjdG9yKSB7XHJcbiAgICAgICAgdGhpcy5yb290Q29udGFpbmVyU2VsZWN0b3IgPSByb290Q29udGFpbmVyU2VsZWN0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IEVycm9yQ29kZShodHRwRXJyb3JDb2RlKSB7XHJcbiAgICAgICAgdGhpcy5odHRwRXJyb3JDb2RlID0gaHR0cEVycm9yQ29kZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgRXJyb3JDb2RlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBFcnJvckNvZGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IFVzZXJFcnJvck1lc3NhZ2UobXNnKSB7XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbXNnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBVc2VyRXJyb3JNZXNzYWdlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgTW91bnQoKSB7XHJcbiAgICAgICAgJCh0aGlzLnJvb3RDb250YWluZXJTZWxlY3RvcikuaHRtbChgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9J2Vycm9yLWNvbnRhaW5lciBjb250YWluZXItc20gbXQtNCc+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdyb3cgcHktNCc+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nY29sLTEyIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWNvbnRlbnQtbWlkZGxlJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nZm9udC1tb25vc3BhY2UgZnMtMSc+JHt0aGlzLkVycm9yQ29kZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdjb2wtMTIgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24tY29udGVudC1taWRkbGUgcGItMyBweC0zIHRleHQtY2VudGVyJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nZnMtMyc+JHt0aGlzLlVzZXJFcnJvck1lc3NhZ2V9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYCk7XHJcbiAgICB9XHJcblxyXG4gICAgVW5Nb3VudCgpIHtcclxuICAgICAgICAkKHRoaXMucm9vdENvbnRhaW5lclNlbGVjdG9yKS5odG1sKCcnKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEFwcEZpcmViYXNlQ29uZmlnIH0gZnJvbSAnLi9jb25maWcvY29uZmlnLUFQUFRBUkdFVC5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgR29vZ2xlQXV0aEhhbmRsZXIge1xyXG4gIGNvbnN0cnVjdG9yKG9uU2lnbkluLCBvblNpZ25PdXQpIHtcclxuICAgIHRoaXMub25TaWduSW4gPSBvblNpZ25JbjtcclxuICAgIHRoaXMub25TaWduT3V0ID0gb25TaWduT3V0O1xyXG5cclxuICAgIC8vIEluaXRpYWxpemUgRmlyZWJhc2UsIGNvbmZpZyBkZWZpbmVkIGVsc2V3aGVyZVxyXG4gICAgZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChBcHBGaXJlYmFzZUNvbmZpZyk7XHJcbiAgICBcclxuICAgIC8vIHVzZSBvbmx5IGdvb2dcclxuICAgIHRoaXMuZ19wcm92aWRlciA9IG5ldyBmaXJlYmFzZS5hdXRoLkdvb2dsZUF1dGhQcm92aWRlcigpO1xyXG4gICAgdGhpcy5nX3Byb3ZpZGVyLmFkZFNjb3BlKCdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3VzZXJpbmZvLnByb2ZpbGUnKTtcclxuICAgIHRoaXMuZ19wcm92aWRlci5zZXRDdXN0b21QYXJhbWV0ZXJzKHtcclxuICAgICAgJ2xvZ2luX2hpbnQnOiAndXNlckBleGFtcGxlLmNvbSdcclxuICAgIH0pOyBcclxuXHJcbiAgICAvLyBzZXQgYSBoYW5kbGVyIGZvciB3aGVuIHRva2VucyBhcmUgcmVjaWV2ZWRcclxuICAgIGZpcmViYXNlLmF1dGgoKS5vbkF1dGhTdGF0ZUNoYW5nZWQodXNlcj0+e1xyXG4gICAgICAgIGlmICh1c2VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuRmlyZU9uU2lnbkluSGFuZGxlcih1c2VyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gdGhpcyBjYW4gZmlyZSB3aGVuIHRoZXJlIGlzIG5vIGxvZ2dlZCBpbiB1c2VyIG9uIGxvYWRcclxuICAgICAgICAgICAgdGhpcy5GaXJlT25TaWduT3V0SGFuZGxlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gbWV0aG9kc1xyXG4gIEZpcmVPblNpZ25JbkhhbmRsZXIob0F1dGhVc2VyKSB7XHJcbiAgICBpZiAodGhpcy5vblNpZ25Jbikge1xyXG4gICAgICB0aGlzLm9uU2lnbkluKG9BdXRoVXNlcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBGaXJlT25TaWduT3V0SGFuZGxlcigpIHtcclxuICAgIGlmICh0aGlzLm9uU2lnbk91dCkge1xyXG4gICAgICB0aGlzLm9uU2lnbk91dCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgU2lnbkluUG9wdXAoKSB7XHJcbiAgICBmaXJlYmFzZS5hdXRoKCkuc2lnbkluV2l0aFBvcHVwKHRoaXMuZ19wcm92aWRlcik7XHJcbiAgfVxyXG5cclxuICBTaWduSW5SZWRpcmVjdCgpIHtcclxuICAgIGZpcmViYXNlLmF1dGgoKS5zaWduSW5XaXRoUmVkaXJlY3QodGhpcy5nX3Byb3ZpZGVyKTtcclxuICB9XHJcblxyXG4gIFNpZ25PdXQoKSB7XHJcbiAgICBmaXJlYmFzZS5hdXRoKCkuc2lnbk91dCgpO1xyXG4gIH1cclxufVxyXG5cclxuIiwibGV0IF8gPSAoZnVuY3Rpb24oKSB7XHJcbiBcclxuICAgIGZ1bmN0aW9uIGJhc2VSYW5kb20obG93ZXIsIHVwcGVyKSB7XHJcbiAgICAgICAgcmV0dXJuIGxvd2VyICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHVwcGVyIC0gbG93ZXIgKyAxKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2h1ZmZsZVNlbGYoYXJyYXksIHNpemUpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSAtMSxcclxuICAgICAgICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxyXG4gICAgICAgICAgICBsYXN0SW5kZXggPSBsZW5ndGggLSAxO1xyXG5cclxuICAgICAgICBzaXplID0gc2l6ZSA9PT0gdW5kZWZpbmVkID8gbGVuZ3RoIDogc2l6ZTtcclxuICAgICAgICB3aGlsZSAoKytpbmRleCA8IHNpemUpIHtcclxuICAgICAgICAgICAgdmFyIHJhbmQgPSBiYXNlUmFuZG9tKGluZGV4LCBsYXN0SW5kZXgpLFxyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBhcnJheVtyYW5kXTtcclxuXHJcbiAgICAgICAgICAgIGFycmF5W3JhbmRdID0gYXJyYXlbaW5kZXhdO1xyXG4gICAgICAgICAgICBhcnJheVtpbmRleF0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXJyYXkubGVuZ3RoID0gc2l6ZTtcclxuICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY29weUFycmF5KHNvdXJjZSwgYXJyYXkpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSAtMSxcclxuICAgICAgICAgICAgbGVuZ3RoID0gc291cmNlLmxlbmd0aDtcclxuICBcclxuICAgICAgICBhcnJheSB8fCAoYXJyYXkgPSBBcnJheShsZW5ndGgpKTtcclxuICAgICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xyXG4gICAgICAgICAgYXJyYXlbaW5kZXhdID0gc291cmNlW2luZGV4XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGJhc2VDbGFtcChudW1iZXIsIGxvd2VyLCB1cHBlcikge1xyXG4gICAgICAgIGlmIChudW1iZXIgPT09IG51bWJlcikge1xyXG4gICAgICAgICAgaWYgKHVwcGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbnVtYmVyID0gbnVtYmVyIDw9IHVwcGVyID8gbnVtYmVyIDogdXBwZXI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAobG93ZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBudW1iZXIgPSBudW1iZXIgPj0gbG93ZXIgPyBudW1iZXIgOiBsb3dlcjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bWJlcjtcclxuICAgIH1cclxuICBcclxuICAgIGZ1bmN0aW9uIGFycmF5U2FtcGxlU2l6ZShhcnJheSwgbikge1xyXG4gICAgICAgIHJldHVybiBzaHVmZmxlU2VsZihjb3B5QXJyYXkoYXJyYXkpLCBiYXNlQ2xhbXAobiwgMCwgYXJyYXkubGVuZ3RoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2FtcGxlU2l6ZShjb2xsZWN0aW9uLCBuKSB7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5U2FtcGxlU2l6ZShjb2xsZWN0aW9uLCBuKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByYW5nZShzdGFydCwgZW5kKSB7XHJcbiAgICAgICAgbGV0IHMgPSBzdGFydCB8fCAwO1xyXG4gICAgICAgIGxldCBudW1zID0gW107XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcclxuICAgICAgICAgICAgbnVtcy5wdXNoKGkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGxldCBwdWIgPSB7fTtcclxuXHJcbiAgICBwdWIucmFuZ2UgPSByYW5nZTtcclxuICAgIHB1Yi5zYW1wbGVTaXplID0gc2FtcGxlU2l6ZTtcclxuXHJcbiAgICByZXR1cm4gcHViO1xyXG5cclxufS5jYWxsKHRoaXMpKTtcclxuICBcclxuZXhwb3J0IGRlZmF1bHQgXzsiLCJpbXBvcnQgeyBHb29nbGVBdXRoSGFuZGxlciB9IGZyb20gJy4vZ29vZ2xlYXV0aGhhbmRsZXIuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb24ge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5sb2dpblVJID0gJChcIiNsb2dpbi11aS1jb250YWluZXJcIik7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyBiaW5kIGxvZyBpblxyXG4gICAgICAgICQoXCIjbG9naW4tcHJvbXB0XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHsgICAgIFxyXG4gICAgICAgICAgICB0aGF0LmF1dGguU2lnbkluUmVkaXJlY3QoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcIiNsb2dpbi1wcm9maWxlXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHsgICAgIFxyXG4gICAgICAgICAgICB0aGF0LmF1dGguU2lnbk91dCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLl9vblNpZ25JbiA9IGZ1bmN0aW9uKG9BdXRoVXNlcikge1xyXG4gICAgICAgICAgICB0aGF0LmxvZ2luVUlcclxuICAgICAgICAgICAgICAgIC5maW5kKFwiI2xvZ2luLXByb21wdFwiKVxyXG4gICAgICAgICAgICAgICAgLnRvZ2dsZUNsYXNzKCdkLW5vbmUnKVxyXG4gICAgICAgICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAgICAgICAuZmluZChcIiNsb2dpbi1wcm9maWxlXCIpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnaW1nJylcclxuICAgICAgICAgICAgICAgIC5wcm9wKCdzcmMnLCBvQXV0aFVzZXIucGhvdG9VUkwpXHJcbiAgICAgICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgICAgIC50b2dnbGVDbGFzcygnZC1ub25lJylcclxuICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2RhdGEtc2lnbmVkLWluJywgJ3RydWUnKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLl9vblNpZ25PdXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKHRoYXQubG9naW5VSS5hdHRyKCdkYXRhLXNpZ25lZC1pbicpID09ICdmYWxzZScpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICBcclxuICAgICAgICAgICAgdGhhdC5sb2dpblVJXHJcbiAgICAgICAgICAgICAgICAuZmluZChcIiNsb2dpbi1wcm9maWxlXCIpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnaW1nJylcclxuICAgICAgICAgICAgICAgIC5wcm9wKCdzcmMnLCAnJylcclxuICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgLnRvZ2dsZUNsYXNzKCdkLW5vbmUnKVxyXG4gICAgICAgICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAgICAgICAuZmluZChcIiNsb2dpbi1wcm9tcHRcIilcclxuICAgICAgICAgICAgICAgIC50b2dnbGVDbGFzcygnZC1ub25lJylcclxuICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2RhdGEtc2lnbmVkLWluJywgJ2ZhbHNlJyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5hdXRoID0gbmV3IEdvb2dsZUF1dGhIYW5kbGVyKHRoaXMuX29uU2lnbkluLCB0aGlzLl9vblNpZ25PdXQpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgQXBwVXRpbCB9IGZyb20gJy4uL2NvcmVhcHAvYXBwdXRpbC5qcyc7XHJcbmltcG9ydCB7IE1JTkVTV0VFUEVSX0dSSURfU0laRVMgfSBmcm9tICcuL21pbmVzd2VlcGVyY29uc3RhbnRzLmpzJztcclxuaW1wb3J0IHsgTWluZXN3ZWVwZXJHYW1lU3RhdGUgfSBmcm9tICcuL21pbmVzd2VlcGVyZ2FtZXN0YXRlLmpzJztcclxuaW1wb3J0IHsgTWluZXN3ZWVwZXJHYW1lR3JpZCB9IGZyb20gJy4vbWluZXN3ZWVwZXJncmlkLmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBNaW5lc3dlZXBlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihyb290Q29udGFpbmVyU2VsZWN0b3IpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnNTZWxlY3RvciA9ICcjZ2FtZS1vcHRpb25zJztcclxuICAgICAgICB0aGlzLm5ld0dhbWVTZWxlY3RvciA9ICcjZ2VuZXJhdGUtZ2FtZSc7XHJcbiAgICAgICAgdGhpcy53aW5TZWxlY3RvciA9ICcjd2luLWdhbWUnO1xyXG4gICAgICAgIHRoaXMubG9zZVNlbGVjdG9yID0gJyNsb3NlLWdhbWUnO1xyXG4gICAgICAgIHRoaXMuZ3JpZFNlbGVjdG9yID0gJyNncmlkJztcclxuICAgICAgICB0aGlzLnJvb3RDb250YWluZXJTZWxlY3RvciA9IHJvb3RDb250YWluZXJTZWxlY3RvcjtcclxuICAgICAgICB0aGlzLnV0aWwgPSBuZXcgQXBwVXRpbCgpO1xyXG5cclxuICAgICAgICB0aGlzLnRlbXBsYXRlID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPSdhcHAtY29udGFpbmVyIGNvbnRhaW5lci1zbSc+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdjb250cm9sLWNvbnRhaW5lciByb3cnPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2NvbC0xMiBjb2wtc20tNCBwLTEgcC1zbS0zIGctc20tMic+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgaWQ9J2dhbWUtb3B0aW9ucycgY2xhc3M9J2Zvcm0tc2VsZWN0Jz48L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdjb2wtMTIgY29sLXNtLTggcC0xIHAtc20tMyBnLXNtLTInPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGlkPSdnZW5lcmF0ZS1nYW1lJyB2YWx1ZT0nbmV3IGdhbWUnIGNsYXNzPSdidG4gYnRuLW91dGxpbmUtcHJpbWFyeSc+PC9pbnB1dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nYnRuLWdyb3VwJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgaWQ9J3dpbi1nYW1lJyB2YWx1ZT0nYXV0byB3aW4nIGNsYXNzPSdidG4gYnRuLW91dGxpbmUtc2Vjb25kYXJ5Jz48L2lucHV0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiBpZD0nbG9zZS1nYW1lJyB2YWx1ZT0nYXV0byBsb3NlJyBjbGFzcz0nYnRuIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSc+PC9pbnB1dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2dyaWQtY29udGFpbmVyIHJvdyc+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD0nZ3JpZCcgY2xhc3M9J2dyaWQgY29sLTEyIHVzZXItc2VsZWN0LW5vbmUgcHktNCBweC0wJz48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgLy8gbWV0aG9kc1xyXG4gICAgTW91bnRDb250cm9scygpIHtcclxuICAgICAgICAkKHRoaXMucm9vdENvbnRhaW5lclNlbGVjdG9yKS5odG1sKHRoaXMudGVtcGxhdGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCAkc2VsZWN0ID0gJCh0aGlzLm9wdGlvbnNTZWxlY3Rvcik7XHJcblxyXG4gICAgICAgIGZvcihsZXQga2V5IGluIE1JTkVTV0VFUEVSX0dSSURfU0laRVMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAkc2VsZWN0LmFwcGVuZCgkKCc8b3B0aW9uPicsIHsgXHJcbiAgICAgICAgICAgICAgICB2YWx1ZToga2V5LFxyXG4gICAgICAgICAgICAgICAgdGV4dCA6IGAke2tleX0gKCR7TUlORVNXRUVQRVJfR1JJRF9TSVpFU1trZXldLndpZHRofXgke01JTkVTV0VFUEVSX0dSSURfU0laRVNba2V5XS5oZWlnaHR9LCAke01JTkVTV0VFUEVSX0dSSURfU0laRVNba2V5XS5taW5lc30gbWluZXMpYCBcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gYmluZCBnYW1lIGdlbmVyYXRpb24gaGFuZGxlcnNcclxuICAgICAgICB0aGlzLkJpbmRHZW5lcmF0ZU5ld0dhbWVIYW5kbGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgVW5Nb3VudENvbnRyb2xzKCkge1xyXG4gICAgICAgIHRoaXMuVW5CaW5kR2VuZXJhdGVOZXdHYW1lSGFuZGxlcigpO1xyXG4gICAgICAgICQodGhpcy5yb290Q29udGFpbmVyU2VsZWN0b3IpLmh0bWwoJycpO1xyXG4gICAgfVxyXG5cclxuICAgIEdlbmVyYXRlTmV3R2FtZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5taW5lc3dlZXBlclVpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWluZXN3ZWVwZXJVaS5Vbk1vdW50KCk7ICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgJHNlbGVjdCA9ICQodGhpcy5vcHRpb25zU2VsZWN0b3IpO1xyXG4gICAgICAgIGxldCBzZWxlY3RlZCA9ICRzZWxlY3QuZmluZChcIm9wdGlvbjpzZWxlY3RlZFwiKS52YWwoKTtcclxuICAgICAgICBsZXQgc2l6ZSA9IE1JTkVTV0VFUEVSX0dSSURfU0laRVNbc2VsZWN0ZWRdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudXRpbC5Mb2coYGdlbmVyYXRlIG5ldyAke3NpemUud2lkdGh9eCR7c2l6ZS5oZWlnaHR9IGdhbWVgKTsgIFxyXG5cclxuICAgICAgICAvLyBjcmVhdGUgbmV3IGdhbWUgc3RhdGVcclxuICAgICAgICBsZXQgZ2FtZVN0YXRlID0gbmV3IE1pbmVzd2VlcGVyR2FtZVN0YXRlKHNpemUsIHRoaXMudXRpbCk7XHJcblxyXG4gICAgICAgIC8vIHVuYmluZCBvbGQgaGFuZGxlciwgYmluZCBuZXdcclxuICAgICAgICB0aGlzLlVuQmluZEdhbWVTdGF0ZUhhbmRsZXJzKCk7XHJcbiAgICAgICAgdGhpcy5CaW5kR2FtZVN0YXRlSGFuZGxlcnMoZ2FtZVN0YXRlKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIG5ldyB1aVxyXG4gICAgICAgIHRoaXMubWluZXN3ZWVwZXJVaSA9IG5ldyBNaW5lc3dlZXBlckdhbWVHcmlkKCQodGhpcy5ncmlkU2VsZWN0b3IpLCBnYW1lU3RhdGUsIHRoaXMudXRpbCk7XHJcbiAgICAgICAgdGhpcy5taW5lc3dlZXBlclVpLk1vdW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgQmluZEdlbmVyYXRlTmV3R2FtZUhhbmRsZXIoKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICQodGhpcy5uZXdHYW1lU2VsZWN0b3IpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHsgdGhhdC5HZW5lcmF0ZU5ld0dhbWUoKTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgVW5CaW5kR2VuZXJhdGVOZXdHYW1lSGFuZGxlcigpIHtcclxuICAgICAgICAkKHRoaXMubmV3R2FtZVNlbGVjdG9yKS5vZmYoJ2NsaWNrJyk7XHJcbiAgICB9XHJcblxyXG4gICAgQmluZEdhbWVTdGF0ZUhhbmRsZXJzKGdhbWVTdGF0ZSkge1xyXG4gICAgICAgICQodGhpcy53aW5TZWxlY3Rvcikub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHsgZ2FtZVN0YXRlLlRyaWdnZXJBdXRvV2luKCk7IH0pO1xyXG4gICAgICAgICQodGhpcy5sb3NlU2VsZWN0b3IpLm9mZignY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7IGdhbWVTdGF0ZS5UcmlnZ2VyQXV0b0xvc2UoKTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgVW5CaW5kR2FtZVN0YXRlSGFuZGxlcnMoKSB7XHJcbiAgICAgICAgJCh0aGlzLndpblNlbGVjdG9yKS5vZmYoJ2NsaWNrJyk7XHJcbiAgICAgICAgJCh0aGlzLmxvc2VTZWxlY3Rvcikub2ZmKCdjbGljaycpO1xyXG4gICAgfVxyXG5cclxuICAgIE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMudXRpbC5Mb2coXCJtb3VudCBtaW5lc3dlZXBlcmFwcFwiKTtcclxuICAgICAgICB0aGlzLk1vdW50Q29udHJvbHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBVbk1vdW50KCkge1xyXG4gICAgICAgIHRoaXMudXRpbC5Mb2coXCJ1bm1vdW50IG1pbmVzd2VlcGVyYXBwXCIpO1xyXG5cclxuICAgICAgICAvLyB1bm1vdW50IGdhbWVcclxuICAgICAgICB0aGlzLlVuQmluZEdhbWVTdGF0ZUhhbmRsZXJzKCk7XHJcblxyXG4gICAgICAgIC8vIG1pZ2h0IHVubW91bnQgYmVmb3JlIGEgZ2FtZSBoYXMgYmVlbiBjcmVhdGVkXHJcbiAgICAgICAgaWYgKHRoaXMubWluZXN3ZWVwZXJVaSkge1xyXG4gICAgICAgICAgICB0aGlzLm1pbmVzd2VlcGVyVWkuVW5Nb3VudCgpOyAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdW5tb3VudCBjb250cm9sc1xyXG4gICAgICAgIHRoaXMuVW5Nb3VudENvbnRyb2xzKCk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY29uc3QgTUlORVNXRUVQRVJfR1JJRF9TSVpFUyA9IHtcclxuICAgIGJlZ2lubmVyIDogeyB3aWR0aDogOSwgaGVpZ2h0OiA5LCBtaW5lczogMTAsIGxhYmVsOiBcImJlZ2lubmVyXCJ9LFxyXG4gICAgaW50ZXJtZWRpYXRlOiB7IHdpZHRoOiAxNiwgaGVpZ2h0OiAxNiwgbWluZXM6IDQwLCBsYWJlbDogXCJpbnRlcm1lZGlhdGVcIn0sXHJcbiAgICBleHBlcnQ6IHsgd2lkdGg6IDE2LCBoZWlnaHQ6IDI2LCBtaW5lczogODYsIGxhYmVsOiBcImV4cGVydFwifSxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBNSU5FU1dFRVBFUl9HQU1FX0NPTVBMRVRJT05fU1RBVEVTID0ge1xyXG4gICAgc3RhcnRlZDogMCxcclxuICAgIGNvbXBsZXRlZDogMSxcclxuICAgIGZhaWxlZDogMlxyXG59O1xyXG4iLCJleHBvcnQgY2xhc3MgTWluZXN3ZWVwZXJHYW1lQ2VsbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihpLCBqLCBnYW1lKSB7XHJcbiAgICAgICAgdGhpcy5faWQgPSBgJHtpICsgXCJfXCIgKyBqfWA7XHJcbiAgICAgICAgdGhpcy5fYWRqYWNlbnRNaW5lQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2lzTWluZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2lzTG9zaW5nTWluZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2lzUmV2ZWFsZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9pc01hcmtlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2dhbWUgPSBnYW1lO1xyXG4gICAgICAgIHRoaXMuaSA9IGk7XHJcbiAgICAgICAgdGhpcy5qID0gajtcclxuICAgIH1cclxuXHJcbiAgICAvLyBnZXR0ZXJzXHJcbiAgICBnZXQgSWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfVxyXG4gICAgZ2V0IEFkamFjZW50TWluZUNvdW50KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hZGphY2VudE1pbmVDb3VudDtcclxuICAgIH1cclxuICAgIGdldCBJc01pbmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzTWluZTtcclxuICAgIH1cclxuICAgIGdldCBJc0xvc2luZ01pbmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzTG9zaW5nTWluZTtcclxuICAgIH1cclxuICAgIGdldCBJc1JldmVhbGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc1JldmVhbGVkO1xyXG4gICAgfSBcclxuICAgIGdldCBJc01hcmtlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNNYXJrZWQ7XHJcbiAgICB9IFxyXG4gICAgZ2V0IHJvd0luZGV4KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmk7XHJcbiAgICB9XHJcbiAgICBnZXQgY29sSW5kZXgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuajtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gbWV0aG9kc1xyXG4gICAgSW5jcmVtZW50QWRqYWNlbnRNaW5lQ291bnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2dhbWUuR2FtZUlzUGxheWFibGUpXHJcbiAgICAgICAgICAgIHRoaXMuX2FkamFjZW50TWluZUNvdW50Kys7XHJcbiAgICB9XHJcbiAgICBTZXRJc01pbmUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2dhbWUuR2FtZUlzUGxheWFibGUpXHJcbiAgICAgICAgICAgIHRoaXMuX2lzTWluZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBTZXRJc0xvc2luZ01pbmUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2dhbWUuR2FtZUlzUGxheWFibGUpXHJcbiAgICAgICAgICAgIHRoaXMuX2lzTG9zaW5nTWluZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBTZXRJc1JldmVhbGVkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9nYW1lLkdhbWVJc1BsYXlhYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzUmV2ZWFsZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgLy8gbm8gbmVlZCBmb3IgaXQgdG8gYmUgbWFya2VkIGFueSBtb3JlXHJcbiAgICAgICAgICAgIHRoaXMuX2lzTWFya2VkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSAgXHJcbiAgICBTZXRJc01hcmtlZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fZ2FtZS5HYW1lSXNQbGF5YWJsZSkgXHJcbiAgICAgICAgICAgIHRoaXMuX2lzTWFya2VkID0gdHJ1ZTtcclxuICAgIH0gXHJcbn0iLCJpbXBvcnQgeyBNaW5lc3dlZXBlckdhbWVDZWxsIH0gZnJvbSBcIi4vbWluZXN3ZWVwZXJnYW1lY2VsbC5qc1wiO1xyXG5pbXBvcnQgeyBNSU5FU1dFRVBFUl9HQU1FX0NPTVBMRVRJT05fU1RBVEVTIH0gZnJvbSBcIi4vbWluZXN3ZWVwZXJjb25zdGFudHMuanNcIjtcclxuaW1wb3J0IHsgZGVmYXVsdCBhcyBfIH0gZnJvbSAnLi4vY29yZWFwcC9sb2Rhc2hwb2x5ZmlsbC5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgTWluZXN3ZWVwZXJHYW1lU3RhdGUge1xyXG4gICAgY29uc3RydWN0b3Ioc2l6ZSwgbG9ndXRpbCkge1xyXG4gICAgICAgIC8vIHN0YXRlXHJcbiAgICAgICAgdGhpcy5fbG9va3VwID0ge307XHJcbiAgICAgICAgdGhpcy5faWQgPSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKTtcclxuICAgICAgICB0aGlzLl9jZWxscyA9IFtdOyBcclxuICAgICAgICB0aGlzLl9taW5lQ2VsbHMgPSBbXTtcclxuICAgICAgICB0aGlzLl9zaXplID0gc2l6ZTsgXHJcbiAgICAgICAgdGhpcy5fZ2FtZUNvbXBsZXRpb25TdGF0ZSA9IE1JTkVTV0VFUEVSX0dBTUVfQ09NUExFVElPTl9TVEFURVMuc3RhcnRlZDtcclxuICAgICAgICB0aGlzLl91dGlsID0gbG9ndXRpbDtcclxuXHJcbiAgICAgICAgLy8gdHJhY2sgY2xlYXJlZCBjZWxscyB2cyB0b3RhbCBjZWxscyBuZWVkZWQgdG8gd2luXHJcbiAgICAgICAgdGhpcy5fdG90YWxDZWxsQ291bnRUb1dpbiA9IHNpemUud2lkdGgqc2l6ZS5oZWlnaHQgLSBzaXplLm1pbmVzO1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRDZWxsQ291bnQgPSAwO1xyXG5cclxuICAgICAgICAvLyBmb3IgZGlhYmxpbmcgdGhlIGdhbWVcclxuICAgICAgICB0aGlzLl9nYW1lRGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3NcclxuICAgICAgICB0aGlzLl9vbkNlbGxTdGF0ZUNoYW5nZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLl9vbkdhbWVDb21wbGV0aW9uU3RhdGVDaGFuZ2UgPSB1bmRlZmluZWQ7XHJcbiBcclxuICAgICAgICAvLyBpbml0LCBzdGFydGluZyB3aXRoIGNlbGxzIHdpdGggZ2VuZXJpYyB2YWx1ZXNcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fc2l6ZS5oZWlnaHQ7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcm93ID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5fc2l6ZS53aWR0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3Q2VsbCA9IG5ldyBNaW5lc3dlZXBlckdhbWVDZWxsKGksIGosIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld0NlbGxJZCA9IG5ld0NlbGwuSWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb29rdXBbbmV3Q2VsbElkXSA9IG5ld0NlbGw7XHJcbiAgICAgICAgICAgICAgICByb3cucHVzaChuZXdDZWxsKTsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fY2VsbHMucHVzaChyb3cpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gc3ByaW5rbGUgbWluZXNcclxuICAgICAgICBsZXQgbWluZXMgPSBfLnNhbXBsZVNpemUoXy5yYW5nZSgwLCB0aGlzLl9zaXplLndpZHRoKnRoaXMuX3NpemUuaGVpZ2h0IC0gMSksIHRoaXMuX3NpemUubWluZXMpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IG1pbmVzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIGxldCByb3dJbmRleCA9IE1hdGguZmxvb3IobWluZXNba10vdGhpcy5fc2l6ZS53aWR0aCk7XHJcbiAgICAgICAgICAgIGxldCBjb2xJbmRleCA9IG1pbmVzW2tdICUgdGhpcy5fc2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgbGV0IG1pbmVDZWxsID0gdGhpcy5fbG9va3VwW2Ake3Jvd0luZGV4ICsgXCJfXCIgKyBjb2xJbmRleH1gXTtcclxuXHJcbiAgICAgICAgICAgIG1pbmVDZWxsLlNldElzTWluZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9taW5lQ2VsbHMucHVzaChtaW5lQ2VsbCk7ICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB1cGRhdGUgYWRqYWNlbnQgbWluZSBjb3VudCBieSBpdGVyYXRpbmcgYWxsIG1pbmVzXHJcbiAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBtaW5lcy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICBsZXQgcm93SW5kZXggPSBNYXRoLmZsb29yKG1pbmVzW2tdL3RoaXMuX3NpemUud2lkdGgpO1xyXG4gICAgICAgICAgICBsZXQgY29sSW5kZXggPSBtaW5lc1trXSAlIHRoaXMuX3NpemUud2lkdGg7XHJcblxyXG4gICAgICAgICAgICBsZXQgb3RoZXJDb29yZHMgPSB0aGlzLkdlbmVyYXRlQWRqYWNlbnRDZWxscyhyb3dJbmRleCwgY29sSW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgLy8gZm9yZWFjaCBhZGphY2VudCwgaWYgaXQgaXNudCBhbHNvIGEgbWluZSwgaW5jcmVtZW50IGl0cyBhZGphY2VudCBtaW5lIGNvdW50XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgb3RoZXJDb29yZHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBhZGphY2VudENlbGwgPSB0aGlzLl9sb29rdXBbYCR7b3RoZXJDb29yZHNbal0ueSArIFwiX1wiICsgb3RoZXJDb29yZHNbal0ueH1gXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWFkamFjZW50Q2VsbC5Jc01pbmUpXHJcbiAgICAgICAgICAgICAgICAgICAgYWRqYWNlbnRDZWxsLkluY3JlbWVudEFkamFjZW50TWluZUNvdW50KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3V0aWwuTG9nKGBuZXcgZ2FtZSBnZW5lcmF0ZWRgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBnZXR0ZXJzXHJcbiAgICBnZXQgR2FtZUlzUGxheWFibGUoKSB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLl9nYW1lRGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IEdhbWVJc1dvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2FtZUNvbXBsZXRpb25TdGF0ZSA9PSBNSU5FU1dFRVBFUl9HQU1FX0NPTVBMRVRJT05fU1RBVEVTLmNvbXBsZXRlZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgU2l6ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgSWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBHYW1lQ29tcGxldGlvblN0YXRlKGdhbWVDb21wbGV0aW9uU3RhdGUpIHtcclxuICAgICAgICB0aGlzLl9nYW1lQ29tcGxldGlvblN0YXRlID0gZ2FtZUNvbXBsZXRpb25TdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgT25DZWxsU3RhdGVDaGFuZ2UoZm4pIHtcclxuICAgICAgICB0aGlzLl9vbkNlbGxTdGF0ZUNoYW5nZSA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBHYW1lRGlzYWJsZWQoZGlzYWJsZWQpIHtcclxuICAgICAgICB0aGlzLl9nYW1lRGlzYWJsZWQgPSBkaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgT25HYW1lQ29tcGxldGlvblN0YXRlQ2hhbmdlKGZuKSB7XHJcbiAgICAgICAgdGhpcy5fb25HYW1lQ29tcGxldGlvblN0YXRlQ2hhbmdlID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgR2VuZXJhdGVBZGphY2VudENlbGxzKHJvd0luZGV4LCBjb2xJbmRleCkge1xyXG4gICAgICAgIC8vIGdlbmVyYXRlIDggYWRqYWNlbnQgY28tb3JkcywgY2xhbXBlZCB0byBpbi1ib3VuZHNcclxuICAgICAgICBsZXQgb3RoZXJDb29yZHMgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKHJvd0luZGV4IC0gMSA+PSAwKSB7XHJcbiAgICAgICAgICAgIGlmIChjb2xJbmRleCAtIDEgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgb3RoZXJDb29yZHMucHVzaCh7eDogY29sSW5kZXgtMSwgeTpyb3dJbmRleC0xfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG90aGVyQ29vcmRzLnB1c2goe3g6IGNvbEluZGV4LCB5OnJvd0luZGV4LTF9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb2xJbmRleCArIDEgPCB0aGlzLl9zaXplLndpZHRoKVxyXG4gICAgICAgICAgICAgICAgb3RoZXJDb29yZHMucHVzaCh7eDogY29sSW5kZXgrMSwgeTpyb3dJbmRleC0xfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChjb2xJbmRleCAtIDEgPj0gMCkgXHJcbiAgICAgICAgICAgIG90aGVyQ29vcmRzLnB1c2goe3g6IGNvbEluZGV4LTEsIHk6cm93SW5kZXh9KTtcclxuXHJcbiAgICAgICAgaWYgKGNvbEluZGV4ICsgMSA8IHRoaXMuX3NpemUud2lkdGgpXHJcbiAgICAgICAgICAgIG90aGVyQ29vcmRzLnB1c2goe3g6IGNvbEluZGV4KzEsIHk6cm93SW5kZXh9KTtcclxuXHJcbiAgICAgICAgaWYgKHJvd0luZGV4ICsgMSA8IHRoaXMuX3NpemUuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIGlmIChjb2xJbmRleCAtIDEgPj0gMCkgXHJcbiAgICAgICAgICAgICAgICBvdGhlckNvb3Jkcy5wdXNoKHt4OiBjb2xJbmRleC0xLCB5OnJvd0luZGV4KzF9KTtcclxuXHJcbiAgICAgICAgICAgIG90aGVyQ29vcmRzLnB1c2goe3g6IGNvbEluZGV4LCB5OnJvd0luZGV4KzF9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb2xJbmRleCArIDEgPCB0aGlzLl9zaXplLndpZHRoKVxyXG4gICAgICAgICAgICAgICAgb3RoZXJDb29yZHMucHVzaCh7eDogY29sSW5kZXgrMSwgeTpyb3dJbmRleCsxfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3RoZXJDb29yZHM7XHJcbiAgICB9XHJcblxyXG4gICAgQ2VsbEJ5SWQoY2VsbElkKSB7XHJcbiAgICAgICAgbGV0IGNlbGwgPSB0aGlzLl9sb29rdXBbY2VsbElkXTtcclxuXHJcbiAgICAgICAgaWYgKGNlbGwgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgdGhyb3cgYGNlbGwgd2l0aCBpZCAke2NlbGxJZH0gY291bGQgbm90IGJlIGZvdW5kYDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNlbGw7XHJcbiAgICB9XHJcblxyXG4gICAgUmV2ZWFsQWxsTWluZXMgKCkge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fbWluZUNlbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fbWluZUNlbGxzW2ldLklzUmV2ZWFsZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9taW5lQ2VsbHNbaV0uU2V0SXNSZXZlYWxlZCgpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5GaXJlQ2VsbFN0YXRlQ2hhbmdlKHRoaXMuX21pbmVDZWxsc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEF0dGVtcHRBdXRvRmlsbChjZWxsKSB7XHJcbiAgICAgICAgbGV0IGF1dG9GaWxscyA9IHRoaXMuR2V0QWRqYWNlbnROb25NaW5lTm9uUmV2ZWFsZWRDZWxscyhjZWxsKTtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhdXRvRmlsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhhdC5TZWxlY3RDZWxsKGF1dG9GaWxsc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEdldEFkamFjZW50Tm9uTWluZU5vblJldmVhbGVkQ2VsbHMoY2VsbCkge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICBsZXQgYWRqQ2VsbEluZGljZXMgPSB0aGlzLkdlbmVyYXRlQWRqYWNlbnRDZWxscyhjZWxsLnJvd0luZGV4LCBjZWxsLmNvbEluZGV4KTtcclxuICAgICAgICBsZXQgYWRqQ2VsbHMgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGFkakNlbGxJbmRpY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjID0gYWRqQ2VsbEluZGljZXNbaV07XHJcbiAgICAgICAgICAgIGxldCBhZGphY2VudENlbGwgPSB0aGF0LkNlbGxCeUlkKGAke2MueSArIFwiX1wiICsgYy54fWApO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFhZGphY2VudENlbGwuSXNNaW5lICYmICFhZGphY2VudENlbGwuSXNSZXZlYWxlZClcclxuICAgICAgICAgICAgICAgIGFkakNlbGxzLnB1c2goYWRqYWNlbnRDZWxsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhZGpDZWxscztcclxuICAgIH1cclxuXHJcbiAgICBGaXJlQ2VsbFN0YXRlQ2hhbmdlIChjaGFuZ2VkQ2VsbCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9vbkNlbGxTdGF0ZUNoYW5nZSlcclxuICAgICAgICAgICAgdGhpcy5fb25DZWxsU3RhdGVDaGFuZ2UoY2hhbmdlZENlbGwpO1xyXG4gICAgfVxyXG5cclxuICAgIEZpcmVHYW1lQ29tcGxldGlvblN0YXRlQ2hhbmdlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9vbkdhbWVDb21wbGV0aW9uU3RhdGVDaGFuZ2UpXHJcbiAgICAgICAgICAgIHRoaXMuX29uR2FtZUNvbXBsZXRpb25TdGF0ZUNoYW5nZSh0aGlzLl9nYW1lQ29tcGxldGlvblN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBNYXJrQ2VsbChjZWxsKSB7XHJcbiAgICAgICAgdGhpcy5fdXRpbC5Mb2coYG1hcmsgY2VsbCBpZCAke2NlbGwuSWR9YCk7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5HYW1lSXNQbGF5YWJsZSkge1xyXG4gICAgICAgICAgICAvLyBkb24ndCBkbyBhbnl0aGluZ1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWNlbGwuSXNSZXZlYWxlZCkge1xyXG5cclxuICAgICAgICAgICAgY2VsbC5TZXRJc01hcmtlZCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gdHJpZ2dlciBpdCB0byByZS1yZW5kZXJcclxuICAgICAgICAgICAgdGhpcy5GaXJlQ2VsbFN0YXRlQ2hhbmdlKGNlbGwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBNYXJrQ2VsbGJ5SWQoY2VsbElkKSB7XHJcbiAgICAgICAgbGV0IGNlbGwgPSB0aGlzLkNlbGxCeUlkKGNlbGxJZCk7ICAgICAgIFxyXG5cclxuICAgICAgICB0aGlzLk1hcmtDZWxsKGNlbGwpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBTZWxlY3RDZWxsKGNlbGwpIHtcclxuICAgICAgICB0aGlzLl91dGlsLkxvZyhgc2VsZWN0IGNlbGwgaWQgJHtjZWxsLklkfWApO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuR2FtZUlzUGxheWFibGUpIHtcclxuICAgICAgICAgICAgLy8gZG9uJ3QgZG8gYW55dGhpbmdcclxuICAgICAgICAgICAgdGhpcy5fdXRpbC5Mb2coYGdhbWUgaGFzIGFscmVhZHkgYmVlbiAke3RoaXMuX2dhbWVDb21wbGV0aW9uU3RhdGUgPT0gTUlORVNXRUVQRVJfR0FNRV9DT01QTEVUSU9OX1NUQVRFUy5jb21wbGV0ZWQgPyBcIndvbiFcIiA6IFwibG9zdCFcIn1gKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFjZWxsLklzUmV2ZWFsZWQpIHtcclxuICAgICAgICAgICAgLy8gcmV2ZWFsIHRoaXMgY2VsbFxyXG4gICAgICAgICAgICBjZWxsLlNldElzUmV2ZWFsZWQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRyaWdnZXIgaXQgdG8gcmUtcmVuZGVyXHJcbiAgICAgICAgICAgIHRoaXMuRmlyZUNlbGxTdGF0ZUNoYW5nZShjZWxsKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjZWxsLklzTWluZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gb2ggb2hoLCBsb3N0XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gbWFyayB0aGlzIG1pbmUgYXMgdGhlIG9uZSBoaXRcclxuICAgICAgICAgICAgICAgIGNlbGwuU2V0SXNMb3NpbmdNaW5lKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkdhbWVDb21wbGV0aW9uU3RhdGUgPSBNSU5FU1dFRVBFUl9HQU1FX0NPTVBMRVRJT05fU1RBVEVTLmZhaWxlZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmV2ZWFsQWxsTWluZXMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZURpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3V0aWwuTG9nKGBwbGF5ZXIgaGFzIGxvc3QhYCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkZpcmVHYW1lQ29tcGxldGlvblN0YXRlQ2hhbmdlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9ICAgXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8geWF5LCB5b3UgY2xlYXJlZCBvbmVcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRDZWxsQ291bnQrKztcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBwbGF5ZXIgaGFzIHdvblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRDZWxsQ291bnQgPT0gdGhpcy5fdG90YWxDZWxsQ291bnRUb1dpbikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHlheVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuR2FtZUNvbXBsZXRpb25TdGF0ZSA9IE1JTkVTV0VFUEVSX0dBTUVfQ09NUExFVElPTl9TVEFURVMuY29tcGxldGVkO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUmV2ZWFsQWxsTWluZXMoKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5HYW1lRGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3V0aWwuTG9nKGBwbGF5ZXIgaGFzIHdvbiFgKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkZpcmVHYW1lQ29tcGxldGlvblN0YXRlQ2hhbmdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gb3RoZXJ3aXNlLCBjZWxsIGlzIG5vdCBhIG1pbmUsIHBsYXllciBoYXMgbm90IHlldCB3b24sIHNvIGF0dGVtcHQgdG8gYXV0b2ZpbGwgaWYgdGhlIGNlbGwgaXMgYmxhbmtcclxuICAgICAgICAgICAgaWYgKGNlbGwuQWRqYWNlbnRNaW5lQ291bnQgPT0gMCkgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgdGhpcy5BdHRlbXB0QXV0b0ZpbGwoY2VsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgU2VsZWN0Q2VsbEJ5SWQoY2VsbElkKSB7XHJcbiAgICAgICAgbGV0IGNlbGwgPSB0aGlzLkNlbGxCeUlkKGNlbGxJZCk7ICAgICAgIFxyXG5cclxuICAgICAgICB0aGlzLlNlbGVjdENlbGwoY2VsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgVHJpZ2dlckF1dG9XaW4oKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLkdhbWVJc1BsYXlhYmxlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9jZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgIGxldCBpbm5lckFycmF5ID0gdGhpcy5fY2VsbHNbaV07XHJcblxyXG4gICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBpbm5lckFycmF5Lmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlubmVyQXJyYXlbal0uSXNNaW5lKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU2VsZWN0Q2VsbChpbm5lckFycmF5W2pdKTtcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFRyaWdnZXJBdXRvTG9zZSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuR2FtZUlzUGxheWFibGUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy5TZWxlY3RDZWxsKHRoaXMuX21pbmVDZWxsc1swXSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTUlORVNXRUVQRVJfR0FNRV9DT01QTEVUSU9OX1NUQVRFUyB9IGZyb20gXCIuL21pbmVzd2VlcGVyY29uc3RhbnRzLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTWluZXN3ZWVwZXJHYW1lR3JpZCB7XHJcbiAgICBjb25zdHJ1Y3Rvcigkcm9vdEVsZW1lbnQsIGdhbWVTdGF0ZSwgbG9nVXRpbCkge1xyXG4gICAgICAgIHRoaXMuJHJvb3RFbGVtZW50ID0gJHJvb3RFbGVtZW50O1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gZ2FtZVN0YXRlOyAgXHJcbiAgICAgICAgdGhpcy5sb2dVdGlsID0gbG9nVXRpbDtcclxuICAgIH0gXHJcblxyXG4gICAgLy8gbWV0aG9kc1xyXG5cclxuICAgIEdldENlbGxDbGFzcyhjZWxsKSB7XHJcbiAgICAgICAgaWYgKCFjZWxsLklzUmV2ZWFsZWQpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGNlbGwuSXNNYXJrZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJoaWRkZW4gbWFya2VkXCI7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gXCJoaWRkZW5cIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjZWxsLklzTWluZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gY2VsbC5Jc0xvc2luZ01pbmUgPyBcIm1pbmUgdHJpZ2dlcmVkXCIgOiBcIm1pbmUgXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChjZWxsLkFkamFjZW50TWluZUNvdW50ID4gMCkgXHJcbiAgICAgICAgICAgIHJldHVybiBgb3Blbi0ke2NlbGwuQWRqYWNlbnRNaW5lQ291bnR9YDtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gXCJjbGVhclwiO1xyXG4gICAgfVxyXG5cclxuICAgIEdldENlbGxDb250ZW50KGNlbGwpIHtcclxuICAgICAgICBsZXQgY2VsbEdseXBoID0gY2VsbC5Jc1JldmVhbGVkID8gXHJcbiAgICAgICAgKGNlbGwuSXNNaW5lID8gXHJcbiAgICAgICAgICAgIFwi8J+So1wiIDogXHJcbiAgICAgICAgICAgICAgICAoY2VsbC5BZGphY2VudE1pbmVDb3VudCA+IDAgPyBjZWxsLkFkamFjZW50TWluZUNvdW50IDogXCJcIilcclxuICAgICAgICApIFxyXG4gICAgICAgIDogXCJcIjtcclxuXHJcbiAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPSdjZWxsLWlubmVyJz4ke2NlbGxHbHlwaH08L2Rpdj5gO1xyXG4gICAgfVxyXG5cclxuICAgIEdldEluaXRpYWxDZWxsSHRtbChjZWxsSWQpIHtcclxuICAgICAgICBsZXQgY2VsbCA9IHRoaXMuZ2FtZVN0YXRlLkNlbGxCeUlkKGNlbGxJZCk7XHJcblxyXG4gICAgICAgIGxldCBjZWxsQ2xhc3MgPSB0aGlzLkdldENlbGxDbGFzcyhjZWxsKTtcclxuICAgICAgICBsZXQgY2VsbENvbnRlbnQgPSB0aGlzLkdldENlbGxDb250ZW50KGNlbGwpO1xyXG5cclxuICAgICAgICByZXR1cm4gYDx0ZCBjbGFzcz0nY2VsbCAke2NlbGxDbGFzc30nIGlkPScke2NlbGxJZH0nPiR7Y2VsbENvbnRlbnR9PC90ZD5gO1xyXG4gICAgfVxyXG5cclxuICAgIFJlbW92ZUhhbmRsZXJzKCkge1xyXG4gICAgICAgIHRoaXMuJHJvb3RFbGVtZW50LmZpbmQoJ3RhYmxlJylcclxuICAgICAgICAgICAgLm9mZignY29udGV4dG1lbnUnKVxyXG4gICAgICAgICAgICAub2ZmKCdjbGljaycpO1xyXG4gICAgfVxyXG5cclxuICAgIEFkZEhhbmRsZXJzKCkge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy8gYWRkIHN1cHByZXNzIGNvbnRleHQgbWVudVxyXG4gICAgICAgIHRoaXMuJHJvb3RFbGVtZW50LmZpbmQoJ3RhYmxlJykub24oJ2NvbnRleHRtZW51JywgJ3RkLmNlbGwnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoZS53aGljaCA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAvLyByaWdodCBtb3VzZVxyXG4gICAgICAgICAgICAgICAgdGhhdC5nYW1lU3RhdGUuTWFya0NlbGxieUlkKGUuY3VycmVudFRhcmdldC5pZCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gYWRkIHNlbGVjdCBoYW5kbGxlclxyXG4gICAgICAgIHRoaXMuJHJvb3RFbGVtZW50LmZpbmQoJ3RhYmxlJykub24oJ2NsaWNrJywgJ3RkLmNlbGwnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGlmKGUud2hpY2ggPT0gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gbGVmdC1tb3VzZVxyXG4gICAgICAgICAgICAgICAgdGhhdC5nYW1lU3RhdGUuU2VsZWN0Q2VsbEJ5SWQoZS5jdXJyZW50VGFyZ2V0LmlkKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMubG9nVXRpbC5Mb2coXCJtb3VudCBtaW5lc3dlZXBlcmdyaWRcIik7XHJcblxyXG4gICAgICAgIC8vIHJlbW92ZSBhbnkgZXhpc3RpbmcgaGFuZGxlcnNcclxuICAgICAgICB0aGlzLlJlbW92ZUhhbmRsZXJzKCk7XHJcblxyXG4gICAgICAgIGxldCBzdGFjayA9IFtdO1xyXG5cclxuICAgICAgICAvLyB0ZW1wbGF0ZSBodG1sIGNlbGwgY29udGVudFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmdhbWVTdGF0ZS5TaXplLmhlaWdodDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCByb3dIdG1sID0gXCI8dHI+XCI7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCB0aGlzLmdhbWVTdGF0ZS5TaXplLndpZHRoOyBqKyspIHsgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByb3dIdG1sICs9IHRoaXMuR2V0SW5pdGlhbENlbGxIdG1sKCBpICsgXCJfXCIgKyBqKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByb3dIdG1sICs9IFwiPC90cj5cIjtcclxuICAgICAgICAgICAgc3RhY2sucHVzaChyb3dIdG1sKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHJlbmRlclxyXG4gICAgICAgIHRoaXMuJHJvb3RFbGVtZW50Lmh0bWwoYDx0YWJsZSBjbGFzcz0nJHt0aGlzLmdhbWVTdGF0ZS5TaXplLmxhYmVsfSc+PHRib2R5PiR7c3RhY2suam9pbihcIlwiKX08L3Rib2R5PjwvdGFibGU+YCk7IFxyXG5cclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgLy8gYWRkIGNlbGwgc3RhdGUgY2hhbmdlIGNhbGxiYWNrIGZvciByZW5kZXJpbmcgaW5kaXZpZHVhbCBjZWxsc1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlLk9uQ2VsbFN0YXRlQ2hhbmdlID0gZnVuY3Rpb24oY2VsbCkge1xyXG4gICAgICAgICAgICAvLyByZS1yZW5kZXIgdGhlIGNlbGxcclxuICAgICAgICAgICAgdGhhdC5sb2dVdGlsLkxvZyhgcmVuZGVyIGNlbGwgJHtjZWxsLklkfSBpbiBnYW1lIHdpdGggaWQgJHt0aGF0LmdhbWVTdGF0ZS5JZH1gKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBjZWxsQ2xhc3MgPSB0aGF0LkdldENlbGxDbGFzcyhjZWxsKTtcclxuICAgICAgICAgICAgbGV0IGNlbGxDb250ZW50ID0gdGhhdC5HZXRDZWxsQ29udGVudChjZWxsKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICQoYCMke2NlbGwuSWR9YClcclxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygpXHJcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoYGNlbGwgJHtjZWxsQ2xhc3N9YCkgXHJcbiAgICAgICAgICAgICAgICAuaHRtbChjZWxsQ29udGVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gZ2FtZSBjb21wbGV0aW9uIHN0YXRlIGhhbmRsZXJcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZS5PbkdhbWVDb21wbGV0aW9uU3RhdGVDaGFuZ2UgPSBmdW5jdGlvbihnYW1lQ29tcGxldGlvblN0YXRlKSB7XHJcbiAgICAgICAgICAgIGlmIChnYW1lQ29tcGxldGlvblN0YXRlID09IE1JTkVTV0VFUEVSX0dBTUVfQ09NUExFVElPTl9TVEFURVMuY29tcGxldGVkKVxyXG4gICAgICAgICAgICAgICAgdGhhdC4kcm9vdEVsZW1lbnQuYXBwZW5kKFwiPGRpdiBjbGFzcz0nZW5kLXN0YXRlJz48aW1nIHNyYz0nLi9pbWcvd2luLmdpZic+PC9pbWc+PC9kaXY+XCIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGdhbWVDb21wbGV0aW9uU3RhdGUgPT0gTUlORVNXRUVQRVJfR0FNRV9DT01QTEVUSU9OX1NUQVRFUy5mYWlsZWQpXHJcbiAgICAgICAgICAgICAgICB0aGF0LiRyb290RWxlbWVudC5hcHBlbmQoXCI8ZGl2IGNsYXNzPSdlbmQtc3RhdGUnPjxpbWcgc3JjPScuL2ltZy9sb3NlLmdpZic+PC9pbWc+PC9kaXY+XCIpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIGJpbmQgaGFuZGxlcnNcclxuICAgICAgICB0aGlzLkFkZEhhbmRsZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgVW5Nb3VudCgpIHtcclxuICAgICAgICB0aGlzLmxvZ1V0aWwuTG9nKFwidW5tb3VudCBtaW5lc3dlZXBlcmdyaWRcIik7XHJcbiAgICAgICAgdGhpcy5SZW1vdmVIYW5kbGVycygpO1xyXG4gICAgICAgIHRoaXMuJHJvb3RFbGVtZW50Lmh0bWwoJycpOyBcclxuICAgIH1cclxufSIsImltcG9ydCB7IEFwcFV0aWwgfSBmcm9tICcuLi9jb3JlYXBwL2FwcHV0aWwuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFwcFN0YXRzIHtcclxuICAgIGNvbnN0cnVjdG9yKHJvb3RDb250YWluZXJTZWxlY3Rvcikge1xyXG4gICAgICAgIHRoaXMucm9vdENvbnRhaW5lclNlbGVjdG9yID0gcm9vdENvbnRhaW5lclNlbGVjdG9yO1xyXG4gICAgICAgIHRoaXMudXRpbCA9IG5ldyBBcHBVdGlsKCk7XHJcblxyXG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9J2FwcC1jb250YWluZXIgY29udGFpbmVyLXNtJz5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2dyaWQtY29udGFpbmVyIHJvdyc+XHJcbiAgICAgICAgICAgICAgICAgICAgdG9kb1xyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGA7XHJcbiAgICB9XHJcbiAgICAgICAgXHJcbiAgICAvLyBtZXRob2RzXHJcbiAgICBNb3VudENvbnRyb2xzKCkge1xyXG4gICAgICAgICQodGhpcy5yb290Q29udGFpbmVyU2VsZWN0b3IpLmh0bWwodGhpcy50ZW1wbGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgVW5Nb3VudENvbnRyb2xzKCkge1xyXG4gICAgICAgICQodGhpcy5yb290Q29udGFpbmVyU2VsZWN0b3IpLmh0bWwoJycpO1xyXG4gICAgfVxyXG5cclxuICAgIE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMudXRpbC5Mb2coXCJtb3VudCBhcHBzdGF0c1wiKTtcclxuICAgICAgICB0aGlzLk1vdW50Q29udHJvbHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBVbk1vdW50KCkge1xyXG4gICAgICAgIHRoaXMudXRpbC5Mb2coXCJ1bm1vdW50IGFwcHN0YXRzXCIpO1xyXG4gICAgICAgIHRoaXMuVW5Nb3VudENvbnRyb2xzKCk7XHJcbiAgICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IE5hdmlnYXRpb24gfSBmcm9tICcuL25hdmlnYXRpb24uanMnO1xyXG5pbXBvcnQgeyBNaW5lc3dlZXBlciB9IGZyb20gJy4uL21pbmVzd2VlcGVyL21pbmVzd2VlcGVyYXBwLmpzJztcclxuaW1wb3J0IHsgRXJyb3IgfSBmcm9tICcuL2Vycm9yLmpzJztcclxuaW1wb3J0IHsgQXBwUm91dGUgfSBmcm9tICcuL2FwcHJvdXRlJztcclxuaW1wb3J0IHsgQXBwUm91dGVyIH0gZnJvbSAnLi9hcHByb3V0ZXInO1xyXG5pbXBvcnQgeyBBcHBTdGF0cyB9IGZyb20gJy4vLi4vc3RhdHMvYXBwc3RhdHMuanMnO1xyXG5cclxuY2xhc3MgQXBwIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuJHJvb3RBcHBDb250YWluZXIgPSAnI2FwcC1tYWluJztcclxuICAgICAgICB0aGlzLnJvdXRlcyA9IFtcclxuICAgICAgICAgICAgbmV3IEFwcFJvdXRlKFwiL1wiLCBmdW5jdGlvbigpIHsgcmV0dXJuIG5ldyBNaW5lc3dlZXBlcih0aGlzLiRyb290QXBwQ29udGFpbmVyKTsgfS5iaW5kKHRoaXMpKSxcclxuICAgICAgICAgICAgbmV3IEFwcFJvdXRlKFwiL3N0YXRzXCIsIGZ1bmN0aW9uKCkgeyByZXR1cm4gbmV3IEFwcFN0YXRzKHRoaXMuJHJvb3RBcHBDb250YWluZXIpOyB9LmJpbmQodGhpcykpLFxyXG4gICAgICAgICAgICBuZXcgQXBwUm91dGUoXCIvZXJyb3JcIiwgZnVuY3Rpb24oKSB7IHJldHVybiBuZXcgRXJyb3IodGhpcy4kcm9vdEFwcENvbnRhaW5lcik7IH0uYmluZCh0aGlzKSlcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIE1vdW50KCkge1xyXG4gICAgICAgIG5ldyBBcHBSb3V0ZXIodGhpcy5yb3V0ZXMpO1xyXG4gICAgICAgIG5ldyBOYXZpZ2F0aW9uKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIHN0YXJ0XHJcbm5ldyBBcHAoKS5Nb3VudCgpO1xyXG5cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=