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
    env: "dev",
    scores_collection: "scores"
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

/***/ "./src/js/coreapp/statdb.js":
/*!**********************************!*\
  !*** ./src/js/coreapp/statdb.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StatDb": () => (/* binding */ StatDb)
/* harmony export */ });
/* harmony import */ var _config_config_APPTARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config/config-APPTARGET.js */ "./src/js/coreapp/config/config-dev.js");


class StatDb {
    constructor() {
        this.db = firebase.firestore();
    }

    GetScores(onSuccess, onError) {
        this.db.collection(_config_config_APPTARGET_js__WEBPACK_IMPORTED_MODULE_0__.EnvConfig.scores_collection).orderBy("time").get().then(
            (querySnapshot) => { 
                onSuccess(querySnapshot); 
            },
            (error) => { onError(error); }
        );
    }

    AddScore(scoreObject) {
        this.db.collection(_config_config_APPTARGET_js__WEBPACK_IMPORTED_MODULE_0__.EnvConfig.scores_collection).add(scoreObject).then(() => {
            console.log("Document successfully written!");
        });
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
        this.elapsedTime = undefined;

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

    get ElapsedTime() {
        return this.elapsedTime;
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
                this.elapsedTime = this.stoptime - this.starttime;
                this._util.Log(`player has lost in ${this.elapsedTime}`);
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
                    this.elapsedTime = this.stoptime - this.starttime;
                    this._util.Log(`player has won in ${this.elapsedTime}`);
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
/* harmony import */ var _coreapp_statdb_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../coreapp/statdb.js */ "./src/js/coreapp/statdb.js");
/* harmony import */ var _minesweeperconstants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./minesweeperconstants.js */ "./src/js/minesweeper/minesweeperconstants.js");
/* harmony import */ var _minesweeperscore_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./minesweeperscore.js */ "./src/js/minesweeper/minesweeperscore.js");




class MinesweeperGameGrid {
    constructor($rootElement, gameState, logUtil) {
        this.$rootElement = $rootElement;
        this.gameState = gameState;  
        this.logUtil = logUtil;
        this.statDb = new _coreapp_statdb_js__WEBPACK_IMPORTED_MODULE_0__.StatDb();
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
            if (gameCompletionState == _minesweeperconstants_js__WEBPACK_IMPORTED_MODULE_1__.MINESWEEPER_GAME_COMPLETION_STATES.completed) {
                that.$rootElement.append("<div class='end-state'><img src='./img/win.gif'></img></div>");
                
                let score = new _minesweeperscore_js__WEBPACK_IMPORTED_MODULE_2__.MinesweeperScore(that.gameState.Size.label, 'timmy', 'uid 123', that.gameState.ElapsedTime).PersistableData;
                that.statDb.AddScore(score);
            }
            
            if (gameCompletionState == _minesweeperconstants_js__WEBPACK_IMPORTED_MODULE_1__.MINESWEEPER_GAME_COMPLETION_STATES.failed) {
                that.$rootElement.append("<div class='end-state'><img src='./img/lose.gif'></img></div>");
            }
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

/***/ "./src/js/minesweeper/minesweeperscore.js":
/*!************************************************!*\
  !*** ./src/js/minesweeper/minesweeperscore.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MinesweeperScore": () => (/* binding */ MinesweeperScore)
/* harmony export */ });
class MinesweeperScore {
    constructor(gametype, name, uid, time) {
        this.game = "minesweeper";
        this.gamealias = "&#625;";
        this.gametype = gametype;
        this.name = name;
        this.uid = uid;
        this.time = time;
    }

    get PersistableData() {
        return {
            game: this.game,
            gamealias: this.gamealias,
            gametype: this.gametype,
            name: this.name,
            uid: this.uid,
            time: this.time
        };
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
/* harmony import */ var _coreapp_statdb_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../coreapp/statdb.js */ "./src/js/coreapp/statdb.js");



class AppStats {
    constructor(rootContainerSelector) {
        this.rootContainerSelector = rootContainerSelector;
        this.scoreGridId = 'scores-grid';
        this.util = new _coreapp_apputil_js__WEBPACK_IMPORTED_MODULE_0__.AppUtil();
        this.statsdb = new _coreapp_statdb_js__WEBPACK_IMPORTED_MODULE_1__.StatDb();

        this.template = `
            <div class='app-container container-sm'>
                <div class='row'>
                    <div class='col-12 p-1 p-sm-3 py-sm-2 g-sm-2'>
                        <table class="table table-striped table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col">user</th>
                                    <th scope="col">game</th>
                                    <th scope="col">difficulty</th>
                                    <th scope="col">time</th>
                                </tr>
                            </thead>
                            <tbody id='${this.scoreGridId}'></tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }
        
    // methods
    MountControls(results) {
        let stack = [];

        results.forEach((doc) => {
            var data = doc.data();
            stack.push(`
                <tr>
                    <td>${data.name}</td>
                    <td>
                        <span class='d-inline-block'>${data.gamealias}</span>
                        <span class='d-none d-sm-inline'>${data.game}</span>
                    </td>
                    <td>${data.gametype}</td>
                    <td>${(data.time / 1000).toFixed(1)}</td>
                </tr>`
            );
        });

        $(`#${this.scoreGridId}`).html(stack.join(''));
    }

    UnMountControls() {
        $(this.rootContainerSelector).html('');
    }

    Mount() {
        this.util.Log("mount appstats");
        $(this.rootContainerSelector).html(this.template);

        this.statsdb.GetScores(this.MountControls.bind(this));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9hcHByb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9hcHByb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvcmVhcHAvYXBwdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9jb25maWcvY29uZmlnLWRldi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9lcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9nb29nbGVhdXRoaGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9sb2Rhc2hwb2x5ZmlsbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9uYXZpZ2F0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb3JlYXBwL3N0YXRkYi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbWluZXN3ZWVwZXIvbWluZXN3ZWVwZXJhcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21pbmVzd2VlcGVyL21pbmVzd2VlcGVyY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9taW5lc3dlZXBlci9taW5lc3dlZXBlcmdhbWVjZWxsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9taW5lc3dlZXBlci9taW5lc3dlZXBlcmdhbWVzdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbWluZXN3ZWVwZXIvbWluZXN3ZWVwZXJncmlkLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9taW5lc3dlZXBlci9taW5lc3dlZXBlcnNjb3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zdGF0cy9hcHBzdGF0cy5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2J1Qzs7QUFFaEM7QUFDUDtBQUNBLDJCQUEyQixnREFBTztBQUNsQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQ0FBMEMsS0FBSzs7QUFFL0M7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtRUFBbUUsTUFBTTtBQUN6RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwRHlEOztBQUVsRDtBQUNQO0FBQ0Esb0JBQW9CLHNFQUFhO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7O0FDWE87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7Ozs7OztBQ1pPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTJELGVBQWU7QUFDMUU7QUFDQTtBQUNBLDRDQUE0QyxzQkFBc0I7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7Ozs7QUN2Q2lFOztB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QSx1REFBdUQsZUFBZTtBQUN0RSwyREFBMkQsVUFBVTtBQUNyRTtBQUNBLDBCQUEwQixjQUFjO0FBQ3hDLDBCQUEwQiw4QkFBOEI7QUFDeEQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQsY0FBYyxpQkFBaUI7QUFDL0I7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7O1VDcEVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNONkM7QUFDa0I7QUFDNUI7QUFDRztBQUNFO0FBQ1U7O0FBRWxEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLCtDQUFRLGtCQUFrQixZQUFZLHVFQUFXLHlCQUF5QixFQUFFO0FBQzVGLGdCQUFnQiwrQ0FBUSx1QkFBdUIsWUFBWSx3REFBUSx5QkFBeUIsRUFBRTtBQUM5RixnQkFBZ0IsK0NBQVEsdUJBQXVCLFlBQVksNENBQUsseUJBQXlCLEVBQUU7QUFDM0Y7QUFDQTs7QUFFQTtBQUNBLFlBQVksaURBQVM7QUFDckIsWUFBWSxzREFBVSxHO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQXBwUm91dGUge1xyXG4gICAgY29uc3RydWN0b3IocGF0aCwgY29tcG9uZW50Rm4pIHtcclxuICAgICAgICB0aGlzLl9wYXRoID0gcGF0aDtcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRGbiA9IGNvbXBvbmVudEZuO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwYXRoKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXRoO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjb21wb25lbnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvbmVudEZuKCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQXBwVXRpbCB9IGZyb20gJy4vYXBwdXRpbC5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQXBwUm91dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHJvdXRlcykge1xyXG4gICAgICAgIHRoaXMuYXBwVXRpbCA9IG5ldyBBcHBVdGlsKCk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXMgPSByb3V0ZXM7XHJcblxyXG4gICAgICAgIGNvbnN0IHJvdW50ZXJmdW5jdGlvbiA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkUm91dGUoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIHJvdW50ZXJmdW5jdGlvbik7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCByb3VudGVyZnVuY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRSb3V0ZSgpIHtcclxuICAgICAgICBsZXQgcGF0aCA9IHRoaXMucGFyc2VMb2NhdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYXBwVXRpbC5Mb2coYGxvYWRpbmcgcm91dGUgJHtwYXRofWApO1xyXG5cclxuICAgICAgICBsZXQgcm91dGUgPSB0aGlzLmZpbmRDb21wb25lbnQocGF0aCk7XHJcblxyXG4gICAgICAgIGxldCBjb21wb25lbnQ7XHJcblxyXG4gICAgICAgIGlmIChyb3V0ZSlcclxuICAgICAgICAgICAgY29tcG9uZW50ID0gcm91dGUuY29tcG9uZW50O1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb21wb25lbnQgPSB0aGlzLmZpbmRDb21wb25lbnQoJy9lcnJvcicpLmNvbXBvbmVudDtcclxuICAgICAgICAgICAgY29tcG9uZW50LkVycm9yQ29kZSA9ICc0MDQnO1xyXG4gICAgICAgICAgICBjb21wb25lbnQuVXNlckVycm9yTWVzc2FnZSA9ICd3ZSBoYXZlIGNyeXB0byBsb2NrZXJlZCB5b3VyIHN0dWZmJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuTW91bnRDb21wb25lbnQoY29tcG9uZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwYXJzZUxvY2F0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBsb2NhdGlvbi5oYXNoLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCkgfHwgJy8nO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmRDb21wb25lbnQocm91dGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yb3V0ZXMuZmluZChyID0+IHIucGF0aC5tYXRjaChuZXcgUmVnRXhwKGBeXFxcXCR7cm91dGV9JGAsICdnbScpKSkgfHwgdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIFVubW91bnRDdXJyZW50Q29tcG9uZW50KCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1vdW50ZWRDb21wb25lbnQpXHJcbiAgICAgICAgICAgIHRoaXMubW91bnRlZENvbXBvbmVudC5Vbk1vdW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgTW91bnRDb21wb25lbnQoY29tcG9uZW50KSB7XHJcbiAgICAgICAgdGhpcy5Vbm1vdW50Q3VycmVudENvbXBvbmVudCgpO1xyXG4gICAgICAgIHRoaXMubW91bnRlZENvbXBvbmVudCA9IGNvbXBvbmVudDtcclxuICAgICAgICB0aGlzLm1vdW50ZWRDb21wb25lbnQuTW91bnQoKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBFbnZDb25maWcgfSBmcm9tICcuL2NvbmZpZy9jb25maWctQVBQVEFSR0VULmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBVdGlsIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX2xvZyA9IEVudkNvbmZpZy5lbnYgPT09IFwiZGV2XCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIExvZyhlbnRyeSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9sb2cgJiYgZW50cnkpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVudHJ5KTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjb25zdCBBcHBGaXJlYmFzZUNvbmZpZyA9IHtcclxuICAgIGFwaUtleTogXCJBSXphU3lCaXRrRHIzbzhoSkJoLWxtNXRabnR3bUtoVFdpU1BFcGtcIixcclxuICAgIGF1dGhEb21haW46IFwibWVpbi1zd2VlcGVyLWQ1OTk1LmZpcmViYXNlYXBwLmNvbVwiLFxyXG4gICAgcHJvamVjdElkOiBcIm1laW4tc3dlZXBlci1kNTk5NVwiLFxyXG4gICAgc3RvcmFnZUJ1Y2tldDogXCJtZWluLXN3ZWVwZXItZDU5OTUuYXBwc3BvdC5jb21cIixcclxuICAgIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjcwMzkzMzcyNTY4NVwiLFxyXG4gICAgYXBwSWQ6IFwiMTo3MDM5MzM3MjU2ODU6d2ViOjJlZWJjZTViMWQ3YTE2ZWZiYTdlYmNcIlxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IEVudkNvbmZpZyA9IHtcclxuICAgIGVudjogXCJkZXZcIixcclxuICAgIHNjb3Jlc19jb2xsZWN0aW9uOiBcInNjb3Jlc1wiXHJcbn07IiwiZXhwb3J0IGNsYXNzIEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKHJvb3RDb250YWluZXJTZWxlY3Rvcikge1xyXG4gICAgICAgIHRoaXMucm9vdENvbnRhaW5lclNlbGVjdG9yID0gcm9vdENvbnRhaW5lclNlbGVjdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBFcnJvckNvZGUoaHR0cEVycm9yQ29kZSkge1xyXG4gICAgICAgIHRoaXMuaHR0cEVycm9yQ29kZSA9IGh0dHBFcnJvckNvZGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IEVycm9yQ29kZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwRXJyb3JDb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBVc2VyRXJyb3JNZXNzYWdlKG1zZykge1xyXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1zZztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgVXNlckVycm9yTWVzc2FnZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIE1vdW50KCkge1xyXG4gICAgICAgICQodGhpcy5yb290Q29udGFpbmVyU2VsZWN0b3IpLmh0bWwoYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPSdlcnJvci1jb250YWluZXIgY29udGFpbmVyLXNtIG10LTQnPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0ncm93IHB5LTQnPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2NvbC0xMiBkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlciBhbGlnbi1jb250ZW50LW1pZGRsZSc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2ZvbnQtbW9ub3NwYWNlIGZzLTEnPiR7dGhpcy5FcnJvckNvZGV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nY29sLTEyIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWNvbnRlbnQtbWlkZGxlIHBiLTMgcHgtMyB0ZXh0LWNlbnRlcic+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2ZzLTMnPiR7dGhpcy5Vc2VyRXJyb3JNZXNzYWdlfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGApO1xyXG4gICAgfVxyXG5cclxuICAgIFVuTW91bnQoKSB7XHJcbiAgICAgICAgJCh0aGlzLnJvb3RDb250YWluZXJTZWxlY3RvcikuaHRtbCgnJyk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBBcHBGaXJlYmFzZUNvbmZpZyB9IGZyb20gJy4vY29uZmlnL2NvbmZpZy1BUFBUQVJHRVQuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdvb2dsZUF1dGhIYW5kbGVyIHtcclxuICBjb25zdHJ1Y3RvcihvblNpZ25Jbiwgb25TaWduT3V0KSB7XHJcbiAgICB0aGlzLm9uU2lnbkluID0gb25TaWduSW47XHJcbiAgICB0aGlzLm9uU2lnbk91dCA9IG9uU2lnbk91dDtcclxuXHJcbiAgICAvLyBJbml0aWFsaXplIEZpcmViYXNlLCBjb25maWcgZGVmaW5lZCBlbHNld2hlcmVcclxuICAgIGZpcmViYXNlLmluaXRpYWxpemVBcHAoQXBwRmlyZWJhc2VDb25maWcpO1xyXG4gICAgXHJcbiAgICAvLyB1c2Ugb25seSBnb29nXHJcbiAgICB0aGlzLmdfcHJvdmlkZXIgPSBuZXcgZmlyZWJhc2UuYXV0aC5Hb29nbGVBdXRoUHJvdmlkZXIoKTtcclxuICAgIHRoaXMuZ19wcm92aWRlci5hZGRTY29wZSgnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC91c2VyaW5mby5wcm9maWxlJyk7XHJcbiAgICB0aGlzLmdfcHJvdmlkZXIuc2V0Q3VzdG9tUGFyYW1ldGVycyh7XHJcbiAgICAgICdsb2dpbl9oaW50JzogJ3VzZXJAZXhhbXBsZS5jb20nXHJcbiAgICB9KTsgXHJcblxyXG4gICAgLy8gc2V0IGEgaGFuZGxlciBmb3Igd2hlbiB0b2tlbnMgYXJlIHJlY2lldmVkXHJcbiAgICBmaXJlYmFzZS5hdXRoKCkub25BdXRoU3RhdGVDaGFuZ2VkKHVzZXI9PntcclxuICAgICAgICBpZiAodXNlcikge1xyXG4gICAgICAgICAgICB0aGlzLkZpcmVPblNpZ25JbkhhbmRsZXIodXNlcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIHRoaXMgY2FuIGZpcmUgd2hlbiB0aGVyZSBpcyBubyBsb2dnZWQgaW4gdXNlciBvbiBsb2FkXHJcbiAgICAgICAgICAgIHRoaXMuRmlyZU9uU2lnbk91dEhhbmRsZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIG1ldGhvZHNcclxuICBGaXJlT25TaWduSW5IYW5kbGVyKG9BdXRoVXNlcikge1xyXG4gICAgaWYgKHRoaXMub25TaWduSW4pIHtcclxuICAgICAgdGhpcy5vblNpZ25JbihvQXV0aFVzZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgRmlyZU9uU2lnbk91dEhhbmRsZXIoKSB7XHJcbiAgICBpZiAodGhpcy5vblNpZ25PdXQpIHtcclxuICAgICAgdGhpcy5vblNpZ25PdXQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIFNpZ25JblBvcHVwKCkge1xyXG4gICAgZmlyZWJhc2UuYXV0aCgpLnNpZ25JbldpdGhQb3B1cCh0aGlzLmdfcHJvdmlkZXIpO1xyXG4gIH1cclxuXHJcbiAgU2lnbkluUmVkaXJlY3QoKSB7XHJcbiAgICBmaXJlYmFzZS5hdXRoKCkuc2lnbkluV2l0aFJlZGlyZWN0KHRoaXMuZ19wcm92aWRlcik7XHJcbiAgfVxyXG5cclxuICBTaWduT3V0KCkge1xyXG4gICAgZmlyZWJhc2UuYXV0aCgpLnNpZ25PdXQoKTtcclxuICB9XHJcbn1cclxuXHJcbiIsImxldCBfID0gKGZ1bmN0aW9uKCkge1xyXG4gXHJcbiAgICBmdW5jdGlvbiBiYXNlUmFuZG9tKGxvd2VyLCB1cHBlcikge1xyXG4gICAgICAgIHJldHVybiBsb3dlciArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh1cHBlciAtIGxvd2VyICsgMSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNodWZmbGVTZWxmKGFycmF5LCBzaXplKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gLTEsXHJcbiAgICAgICAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcclxuICAgICAgICAgICAgbGFzdEluZGV4ID0gbGVuZ3RoIC0gMTtcclxuXHJcbiAgICAgICAgc2l6ZSA9IHNpemUgPT09IHVuZGVmaW5lZCA/IGxlbmd0aCA6IHNpemU7XHJcbiAgICAgICAgd2hpbGUgKCsraW5kZXggPCBzaXplKSB7XHJcbiAgICAgICAgICAgIHZhciByYW5kID0gYmFzZVJhbmRvbShpbmRleCwgbGFzdEluZGV4KSxcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gYXJyYXlbcmFuZF07XHJcblxyXG4gICAgICAgICAgICBhcnJheVtyYW5kXSA9IGFycmF5W2luZGV4XTtcclxuICAgICAgICAgICAgYXJyYXlbaW5kZXhdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFycmF5Lmxlbmd0aCA9IHNpemU7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNvcHlBcnJheShzb3VyY2UsIGFycmF5KSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gLTEsXHJcbiAgICAgICAgICAgIGxlbmd0aCA9IHNvdXJjZS5sZW5ndGg7XHJcbiAgXHJcbiAgICAgICAgYXJyYXkgfHwgKGFycmF5ID0gQXJyYXkobGVuZ3RoKSk7XHJcbiAgICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcclxuICAgICAgICAgIGFycmF5W2luZGV4XSA9IHNvdXJjZVtpbmRleF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnJheTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBiYXNlQ2xhbXAobnVtYmVyLCBsb3dlciwgdXBwZXIpIHtcclxuICAgICAgICBpZiAobnVtYmVyID09PSBudW1iZXIpIHtcclxuICAgICAgICAgIGlmICh1cHBlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIG51bWJlciA9IG51bWJlciA8PSB1cHBlciA/IG51bWJlciA6IHVwcGVyO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGxvd2VyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbnVtYmVyID0gbnVtYmVyID49IGxvd2VyID8gbnVtYmVyIDogbG93ZXI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudW1iZXI7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBmdW5jdGlvbiBhcnJheVNhbXBsZVNpemUoYXJyYXksIG4pIHtcclxuICAgICAgICByZXR1cm4gc2h1ZmZsZVNlbGYoY29weUFycmF5KGFycmF5KSwgYmFzZUNsYW1wKG4sIDAsIGFycmF5Lmxlbmd0aCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNhbXBsZVNpemUoY29sbGVjdGlvbiwgbikge1xyXG4gICAgICAgIHJldHVybiBhcnJheVNhbXBsZVNpemUoY29sbGVjdGlvbiwgbik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmFuZ2Uoc3RhcnQsIGVuZCkge1xyXG4gICAgICAgIGxldCBzID0gc3RhcnQgfHwgMDtcclxuICAgICAgICBsZXQgbnVtcyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG51bXMucHVzaChpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudW1zO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBsZXQgcHViID0ge307XHJcblxyXG4gICAgcHViLnJhbmdlID0gcmFuZ2U7XHJcbiAgICBwdWIuc2FtcGxlU2l6ZSA9IHNhbXBsZVNpemU7XHJcblxyXG4gICAgcmV0dXJuIHB1YjtcclxuXHJcbn0uY2FsbCh0aGlzKSk7XHJcbiAgXHJcbmV4cG9ydCBkZWZhdWx0IF87IiwiaW1wb3J0IHsgR29vZ2xlQXV0aEhhbmRsZXIgfSBmcm9tICcuL2dvb2dsZWF1dGhoYW5kbGVyLmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubG9naW5VSSA9ICQoXCIjbG9naW4tdWktY29udGFpbmVyXCIpO1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy8gYmluZCBsb2cgaW5cclxuICAgICAgICAkKFwiI2xvZ2luLXByb21wdFwiKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7ICAgICBcclxuICAgICAgICAgICAgdGhhdC5hdXRoLlNpZ25JblJlZGlyZWN0KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIjbG9naW4tcHJvZmlsZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7ICAgICBcclxuICAgICAgICAgICAgdGhhdC5hdXRoLlNpZ25PdXQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fb25TaWduSW4gPSBmdW5jdGlvbihvQXV0aFVzZXIpIHtcclxuICAgICAgICAgICAgdGhhdC5sb2dpblVJXHJcbiAgICAgICAgICAgICAgICAuZmluZChcIiNsb2dpbi1wcm9tcHRcIilcclxuICAgICAgICAgICAgICAgIC50b2dnbGVDbGFzcygnZC1ub25lJylcclxuICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoXCIjbG9naW4tcHJvZmlsZVwiKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJ2ltZycpXHJcbiAgICAgICAgICAgICAgICAucHJvcCgnc3JjJywgb0F1dGhVc2VyLnBob3RvVVJMKVxyXG4gICAgICAgICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAgICAgICAudG9nZ2xlQ2xhc3MoJ2Qtbm9uZScpXHJcbiAgICAgICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdkYXRhLXNpZ25lZC1pbicsICd0cnVlJyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5fb25TaWduT3V0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LmxvZ2luVUkuYXR0cignZGF0YS1zaWduZWQtaW4nKSA9PSAnZmFsc2UnKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHRoYXQubG9naW5VSVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoXCIjbG9naW4tcHJvZmlsZVwiKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJ2ltZycpXHJcbiAgICAgICAgICAgICAgICAucHJvcCgnc3JjJywgJycpXHJcbiAgICAgICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgICAgIC50b2dnbGVDbGFzcygnZC1ub25lJylcclxuICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoXCIjbG9naW4tcHJvbXB0XCIpXHJcbiAgICAgICAgICAgICAgICAudG9nZ2xlQ2xhc3MoJ2Qtbm9uZScpXHJcbiAgICAgICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdkYXRhLXNpZ25lZC1pbicsICdmYWxzZScpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuYXV0aCA9IG5ldyBHb29nbGVBdXRoSGFuZGxlcih0aGlzLl9vblNpZ25JbiwgdGhpcy5fb25TaWduT3V0KTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEVudkNvbmZpZyB9IGZyb20gJy4vY29uZmlnL2NvbmZpZy1BUFBUQVJHRVQuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0YXREYiB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0U2NvcmVzKG9uU3VjY2Vzcywgb25FcnJvcikge1xyXG4gICAgICAgIHRoaXMuZGIuY29sbGVjdGlvbihFbnZDb25maWcuc2NvcmVzX2NvbGxlY3Rpb24pLm9yZGVyQnkoXCJ0aW1lXCIpLmdldCgpLnRoZW4oXHJcbiAgICAgICAgICAgIChxdWVyeVNuYXBzaG90KSA9PiB7IFxyXG4gICAgICAgICAgICAgICAgb25TdWNjZXNzKHF1ZXJ5U25hcHNob3QpOyBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKGVycm9yKSA9PiB7IG9uRXJyb3IoZXJyb3IpOyB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBBZGRTY29yZShzY29yZU9iamVjdCkge1xyXG4gICAgICAgIHRoaXMuZGIuY29sbGVjdGlvbihFbnZDb25maWcuc2NvcmVzX2NvbGxlY3Rpb24pLmFkZChzY29yZU9iamVjdCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRG9jdW1lbnQgc3VjY2Vzc2Z1bGx5IHdyaXR0ZW4hXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgQXBwVXRpbCB9IGZyb20gJy4uL2NvcmVhcHAvYXBwdXRpbC5qcyc7XHJcbmltcG9ydCB7IE1JTkVTV0VFUEVSX0dSSURfU0laRVMgfSBmcm9tICcuL21pbmVzd2VlcGVyY29uc3RhbnRzLmpzJztcclxuaW1wb3J0IHsgTWluZXN3ZWVwZXJHYW1lU3RhdGUgfSBmcm9tICcuL21pbmVzd2VlcGVyZ2FtZXN0YXRlLmpzJztcclxuaW1wb3J0IHsgTWluZXN3ZWVwZXJHYW1lR3JpZCB9IGZyb20gJy4vbWluZXN3ZWVwZXJncmlkLmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBNaW5lc3dlZXBlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihyb290Q29udGFpbmVyU2VsZWN0b3IpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnNTZWxlY3RvciA9ICcjZ2FtZS1vcHRpb25zJztcclxuICAgICAgICB0aGlzLm5ld0dhbWVTZWxlY3RvciA9ICcjZ2VuZXJhdGUtZ2FtZSc7XHJcbiAgICAgICAgdGhpcy53aW5TZWxlY3RvciA9ICcjd2luLWdhbWUnO1xyXG4gICAgICAgIHRoaXMubG9zZVNlbGVjdG9yID0gJyNsb3NlLWdhbWUnO1xyXG4gICAgICAgIHRoaXMuZ3JpZFNlbGVjdG9yID0gJyNncmlkJztcclxuICAgICAgICB0aGlzLnJvb3RDb250YWluZXJTZWxlY3RvciA9IHJvb3RDb250YWluZXJTZWxlY3RvcjtcclxuICAgICAgICB0aGlzLnV0aWwgPSBuZXcgQXBwVXRpbCgpO1xyXG5cclxuICAgICAgICB0aGlzLnRlbXBsYXRlID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPSdhcHAtY29udGFpbmVyIGNvbnRhaW5lci1zbSc+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdjb250cm9sLWNvbnRhaW5lciByb3cnPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2NvbC0xMiBjb2wtc20tNCBwLTEgcC1zbS0zIGctc20tMic+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgaWQ9J2dhbWUtb3B0aW9ucycgY2xhc3M9J2Zvcm0tc2VsZWN0Jz48L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdjb2wtMTIgY29sLXNtLTggcC0xIHAtc20tMyBnLXNtLTInPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGlkPSdnZW5lcmF0ZS1nYW1lJyB2YWx1ZT0nbmV3IGdhbWUnIGNsYXNzPSdidG4gYnRuLW91dGxpbmUtcHJpbWFyeSc+PC9pbnB1dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nYnRuLWdyb3VwJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgaWQ9J3dpbi1nYW1lJyB2YWx1ZT0nYXV0byB3aW4nIGNsYXNzPSdidG4gYnRuLW91dGxpbmUtc2Vjb25kYXJ5Jz48L2lucHV0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiBpZD0nbG9zZS1nYW1lJyB2YWx1ZT0nYXV0byBsb3NlJyBjbGFzcz0nYnRuIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSc+PC9pbnB1dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2dyaWQtY29udGFpbmVyIHJvdyc+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD0nZ3JpZCcgY2xhc3M9J2dyaWQgY29sLTEyIHVzZXItc2VsZWN0LW5vbmUgcHktNCBweC0wJz48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgLy8gbWV0aG9kc1xyXG4gICAgTW91bnRDb250cm9scygpIHtcclxuICAgICAgICAkKHRoaXMucm9vdENvbnRhaW5lclNlbGVjdG9yKS5odG1sKHRoaXMudGVtcGxhdGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCAkc2VsZWN0ID0gJCh0aGlzLm9wdGlvbnNTZWxlY3Rvcik7XHJcblxyXG4gICAgICAgIGZvcihsZXQga2V5IGluIE1JTkVTV0VFUEVSX0dSSURfU0laRVMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAkc2VsZWN0LmFwcGVuZCgkKCc8b3B0aW9uPicsIHsgXHJcbiAgICAgICAgICAgICAgICB2YWx1ZToga2V5LFxyXG4gICAgICAgICAgICAgICAgdGV4dCA6IGAke2tleX0gKCR7TUlORVNXRUVQRVJfR1JJRF9TSVpFU1trZXldLndpZHRofXgke01JTkVTV0VFUEVSX0dSSURfU0laRVNba2V5XS5oZWlnaHR9LCAke01JTkVTV0VFUEVSX0dSSURfU0laRVNba2V5XS5taW5lc30gbWluZXMpYCBcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gYmluZCBnYW1lIGdlbmVyYXRpb24gaGFuZGxlcnNcclxuICAgICAgICB0aGlzLkJpbmRHZW5lcmF0ZU5ld0dhbWVIYW5kbGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgVW5Nb3VudENvbnRyb2xzKCkge1xyXG4gICAgICAgIHRoaXMuVW5CaW5kR2VuZXJhdGVOZXdHYW1lSGFuZGxlcigpO1xyXG4gICAgICAgICQodGhpcy5yb290Q29udGFpbmVyU2VsZWN0b3IpLmh0bWwoJycpO1xyXG4gICAgfVxyXG5cclxuICAgIEdlbmVyYXRlTmV3R2FtZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5taW5lc3dlZXBlclVpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWluZXN3ZWVwZXJVaS5Vbk1vdW50KCk7ICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgJHNlbGVjdCA9ICQodGhpcy5vcHRpb25zU2VsZWN0b3IpO1xyXG4gICAgICAgIGxldCBzZWxlY3RlZCA9ICRzZWxlY3QuZmluZChcIm9wdGlvbjpzZWxlY3RlZFwiKS52YWwoKTtcclxuICAgICAgICBsZXQgc2l6ZSA9IE1JTkVTV0VFUEVSX0dSSURfU0laRVNbc2VsZWN0ZWRdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudXRpbC5Mb2coYGdlbmVyYXRlIG5ldyAke3NpemUud2lkdGh9eCR7c2l6ZS5oZWlnaHR9IGdhbWVgKTsgIFxyXG5cclxuICAgICAgICAvLyBjcmVhdGUgbmV3IGdhbWUgc3RhdGVcclxuICAgICAgICBsZXQgZ2FtZVN0YXRlID0gbmV3IE1pbmVzd2VlcGVyR2FtZVN0YXRlKHNpemUsIHRoaXMudXRpbCk7XHJcblxyXG4gICAgICAgIC8vIHVuYmluZCBvbGQgaGFuZGxlciwgYmluZCBuZXdcclxuICAgICAgICB0aGlzLlVuQmluZEdhbWVTdGF0ZUhhbmRsZXJzKCk7XHJcbiAgICAgICAgdGhpcy5CaW5kR2FtZVN0YXRlSGFuZGxlcnMoZ2FtZVN0YXRlKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIG5ldyB1aVxyXG4gICAgICAgIHRoaXMubWluZXN3ZWVwZXJVaSA9IG5ldyBNaW5lc3dlZXBlckdhbWVHcmlkKCQodGhpcy5ncmlkU2VsZWN0b3IpLCBnYW1lU3RhdGUsIHRoaXMudXRpbCk7XHJcbiAgICAgICAgdGhpcy5taW5lc3dlZXBlclVpLk1vdW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgQmluZEdlbmVyYXRlTmV3R2FtZUhhbmRsZXIoKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICQodGhpcy5uZXdHYW1lU2VsZWN0b3IpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHsgdGhhdC5HZW5lcmF0ZU5ld0dhbWUoKTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgVW5CaW5kR2VuZXJhdGVOZXdHYW1lSGFuZGxlcigpIHtcclxuICAgICAgICAkKHRoaXMubmV3R2FtZVNlbGVjdG9yKS5vZmYoJ2NsaWNrJyk7XHJcbiAgICB9XHJcblxyXG4gICAgQmluZEdhbWVTdGF0ZUhhbmRsZXJzKGdhbWVTdGF0ZSkge1xyXG4gICAgICAgICQodGhpcy53aW5TZWxlY3Rvcikub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHsgZ2FtZVN0YXRlLlRyaWdnZXJBdXRvV2luKCk7IH0pO1xyXG4gICAgICAgICQodGhpcy5sb3NlU2VsZWN0b3IpLm9mZignY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7IGdhbWVTdGF0ZS5UcmlnZ2VyQXV0b0xvc2UoKTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgVW5CaW5kR2FtZVN0YXRlSGFuZGxlcnMoKSB7XHJcbiAgICAgICAgJCh0aGlzLndpblNlbGVjdG9yKS5vZmYoJ2NsaWNrJyk7XHJcbiAgICAgICAgJCh0aGlzLmxvc2VTZWxlY3Rvcikub2ZmKCdjbGljaycpO1xyXG4gICAgfVxyXG5cclxuICAgIE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMudXRpbC5Mb2coXCJtb3VudCBtaW5lc3dlZXBlcmFwcFwiKTtcclxuICAgICAgICB0aGlzLk1vdW50Q29udHJvbHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBVbk1vdW50KCkge1xyXG4gICAgICAgIHRoaXMudXRpbC5Mb2coXCJ1bm1vdW50IG1pbmVzd2VlcGVyYXBwXCIpO1xyXG5cclxuICAgICAgICAvLyB1bm1vdW50IGdhbWVcclxuICAgICAgICB0aGlzLlVuQmluZEdhbWVTdGF0ZUhhbmRsZXJzKCk7XHJcblxyXG4gICAgICAgIC8vIG1pZ2h0IHVubW91bnQgYmVmb3JlIGEgZ2FtZSBoYXMgYmVlbiBjcmVhdGVkXHJcbiAgICAgICAgaWYgKHRoaXMubWluZXN3ZWVwZXJVaSkge1xyXG4gICAgICAgICAgICB0aGlzLm1pbmVzd2VlcGVyVWkuVW5Nb3VudCgpOyAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdW5tb3VudCBjb250cm9sc1xyXG4gICAgICAgIHRoaXMuVW5Nb3VudENvbnRyb2xzKCk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY29uc3QgTUlORVNXRUVQRVJfR1JJRF9TSVpFUyA9IHtcclxuICAgIGJlZ2lubmVyIDogeyB3aWR0aDogOSwgaGVpZ2h0OiA5LCBtaW5lczogMTAsIGxhYmVsOiBcImJlZ2lubmVyXCJ9LFxyXG4gICAgaW50ZXJtZWRpYXRlOiB7IHdpZHRoOiAxNiwgaGVpZ2h0OiAxNiwgbWluZXM6IDQwLCBsYWJlbDogXCJpbnRlcm1lZGlhdGVcIn0sXHJcbiAgICBleHBlcnQ6IHsgd2lkdGg6IDE2LCBoZWlnaHQ6IDI2LCBtaW5lczogODYsIGxhYmVsOiBcImV4cGVydFwifSxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBNSU5FU1dFRVBFUl9HQU1FX0NPTVBMRVRJT05fU1RBVEVTID0ge1xyXG4gICAgc3RhcnRlZDogMCxcclxuICAgIGNvbXBsZXRlZDogMSxcclxuICAgIGZhaWxlZDogMlxyXG59O1xyXG4iLCJleHBvcnQgY2xhc3MgTWluZXN3ZWVwZXJHYW1lQ2VsbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihpLCBqLCBnYW1lKSB7XHJcbiAgICAgICAgdGhpcy5faWQgPSBgJHtpICsgXCJfXCIgKyBqfWA7XHJcbiAgICAgICAgdGhpcy5fYWRqYWNlbnRNaW5lQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2lzTWluZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2lzTG9zaW5nTWluZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2lzUmV2ZWFsZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9pc01hcmtlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2dhbWUgPSBnYW1lO1xyXG4gICAgICAgIHRoaXMuaSA9IGk7XHJcbiAgICAgICAgdGhpcy5qID0gajtcclxuICAgIH1cclxuXHJcbiAgICAvLyBnZXR0ZXJzXHJcbiAgICBnZXQgSWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfVxyXG4gICAgZ2V0IEFkamFjZW50TWluZUNvdW50KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hZGphY2VudE1pbmVDb3VudDtcclxuICAgIH1cclxuICAgIGdldCBJc01pbmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzTWluZTtcclxuICAgIH1cclxuICAgIGdldCBJc0xvc2luZ01pbmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzTG9zaW5nTWluZTtcclxuICAgIH1cclxuICAgIGdldCBJc1JldmVhbGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc1JldmVhbGVkO1xyXG4gICAgfSBcclxuICAgIGdldCBJc01hcmtlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNNYXJrZWQ7XHJcbiAgICB9IFxyXG4gICAgZ2V0IHJvd0luZGV4KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmk7XHJcbiAgICB9XHJcbiAgICBnZXQgY29sSW5kZXgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuajtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gbWV0aG9kc1xyXG4gICAgSW5jcmVtZW50QWRqYWNlbnRNaW5lQ291bnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2dhbWUuR2FtZUlzUGxheWFibGUpXHJcbiAgICAgICAgICAgIHRoaXMuX2FkamFjZW50TWluZUNvdW50Kys7XHJcbiAgICB9XHJcbiAgICBTZXRJc01pbmUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2dhbWUuR2FtZUlzUGxheWFibGUpXHJcbiAgICAgICAgICAgIHRoaXMuX2lzTWluZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBTZXRJc0xvc2luZ01pbmUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2dhbWUuR2FtZUlzUGxheWFibGUpXHJcbiAgICAgICAgICAgIHRoaXMuX2lzTG9zaW5nTWluZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBTZXRJc1JldmVhbGVkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9nYW1lLkdhbWVJc1BsYXlhYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzUmV2ZWFsZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgLy8gbm8gbmVlZCBmb3IgaXQgdG8gYmUgbWFya2VkIGFueSBtb3JlXHJcbiAgICAgICAgICAgIHRoaXMuX2lzTWFya2VkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSAgXHJcbiAgICBTZXRJc01hcmtlZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fZ2FtZS5HYW1lSXNQbGF5YWJsZSkgXHJcbiAgICAgICAgICAgIHRoaXMuX2lzTWFya2VkID0gdHJ1ZTtcclxuICAgIH0gXHJcbn0iLCJpbXBvcnQgeyBNaW5lc3dlZXBlckdhbWVDZWxsIH0gZnJvbSBcIi4vbWluZXN3ZWVwZXJnYW1lY2VsbC5qc1wiO1xyXG5pbXBvcnQgeyBNSU5FU1dFRVBFUl9HQU1FX0NPTVBMRVRJT05fU1RBVEVTIH0gZnJvbSBcIi4vbWluZXN3ZWVwZXJjb25zdGFudHMuanNcIjtcclxuaW1wb3J0IHsgZGVmYXVsdCBhcyBfIH0gZnJvbSAnLi4vY29yZWFwcC9sb2Rhc2hwb2x5ZmlsbC5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgTWluZXN3ZWVwZXJHYW1lU3RhdGUge1xyXG4gICAgY29uc3RydWN0b3Ioc2l6ZSwgbG9ndXRpbCkge1xyXG4gICAgICAgIC8vIHN0YXRlXHJcbiAgICAgICAgdGhpcy5fbG9va3VwID0ge307XHJcbiAgICAgICAgdGhpcy5faWQgPSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKTtcclxuICAgICAgICB0aGlzLl9jZWxscyA9IFtdOyBcclxuICAgICAgICB0aGlzLl9taW5lQ2VsbHMgPSBbXTtcclxuICAgICAgICB0aGlzLl9zaXplID0gc2l6ZTsgXHJcbiAgICAgICAgdGhpcy5fZ2FtZUNvbXBsZXRpb25TdGF0ZSA9IE1JTkVTV0VFUEVSX0dBTUVfQ09NUExFVElPTl9TVEFURVMuc3RhcnRlZDtcclxuICAgICAgICB0aGlzLl91dGlsID0gbG9ndXRpbDtcclxuXHJcbiAgICAgICAgLy8gdHJhY2sgY2xlYXJlZCBjZWxscyB2cyB0b3RhbCBjZWxscyBuZWVkZWQgdG8gd2luXHJcbiAgICAgICAgdGhpcy5fdG90YWxDZWxsQ291bnRUb1dpbiA9IHNpemUud2lkdGgqc2l6ZS5oZWlnaHQgLSBzaXplLm1pbmVzO1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRDZWxsQ291bnQgPSAwO1xyXG5cclxuICAgICAgICAvLyB0cmFja2luZyBzdGFydCB0aW1lXHJcbiAgICAgICAgdGhpcy5zdGFydHRpbWUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5zdG9wdGltZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmVsYXBzZWRUaW1lID0gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAvLyBmb3IgZGlhYmxpbmcgdGhlIGdhbWVcclxuICAgICAgICB0aGlzLl9nYW1lRGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3NcclxuICAgICAgICB0aGlzLl9vbkNlbGxTdGF0ZUNoYW5nZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLl9vbkdhbWVDb21wbGV0aW9uU3RhdGVDaGFuZ2UgPSB1bmRlZmluZWQ7XHJcbiBcclxuICAgICAgICAvLyBpbml0LCBzdGFydGluZyB3aXRoIGNlbGxzIHdpdGggZ2VuZXJpYyB2YWx1ZXNcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fc2l6ZS5oZWlnaHQ7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcm93ID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5fc2l6ZS53aWR0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3Q2VsbCA9IG5ldyBNaW5lc3dlZXBlckdhbWVDZWxsKGksIGosIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld0NlbGxJZCA9IG5ld0NlbGwuSWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb29rdXBbbmV3Q2VsbElkXSA9IG5ld0NlbGw7XHJcbiAgICAgICAgICAgICAgICByb3cucHVzaChuZXdDZWxsKTsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fY2VsbHMucHVzaChyb3cpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gc3ByaW5rbGUgbWluZXNcclxuICAgICAgICBsZXQgbWluZXMgPSBfLnNhbXBsZVNpemUoXy5yYW5nZSgwLCB0aGlzLl9zaXplLndpZHRoKnRoaXMuX3NpemUuaGVpZ2h0IC0gMSksIHRoaXMuX3NpemUubWluZXMpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IG1pbmVzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIGxldCByb3dJbmRleCA9IE1hdGguZmxvb3IobWluZXNba10vdGhpcy5fc2l6ZS53aWR0aCk7XHJcbiAgICAgICAgICAgIGxldCBjb2xJbmRleCA9IG1pbmVzW2tdICUgdGhpcy5fc2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgbGV0IG1pbmVDZWxsID0gdGhpcy5fbG9va3VwW2Ake3Jvd0luZGV4ICsgXCJfXCIgKyBjb2xJbmRleH1gXTtcclxuXHJcbiAgICAgICAgICAgIG1pbmVDZWxsLlNldElzTWluZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9taW5lQ2VsbHMucHVzaChtaW5lQ2VsbCk7ICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB1cGRhdGUgYWRqYWNlbnQgbWluZSBjb3VudCBieSBpdGVyYXRpbmcgYWxsIG1pbmVzXHJcbiAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBtaW5lcy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICBsZXQgcm93SW5kZXggPSBNYXRoLmZsb29yKG1pbmVzW2tdL3RoaXMuX3NpemUud2lkdGgpO1xyXG4gICAgICAgICAgICBsZXQgY29sSW5kZXggPSBtaW5lc1trXSAlIHRoaXMuX3NpemUud2lkdGg7XHJcblxyXG4gICAgICAgICAgICBsZXQgb3RoZXJDb29yZHMgPSB0aGlzLkdlbmVyYXRlQWRqYWNlbnRDZWxscyhyb3dJbmRleCwgY29sSW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgLy8gZm9yZWFjaCBhZGphY2VudCwgaWYgaXQgaXNudCBhbHNvIGEgbWluZSwgaW5jcmVtZW50IGl0cyBhZGphY2VudCBtaW5lIGNvdW50XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgb3RoZXJDb29yZHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBhZGphY2VudENlbGwgPSB0aGlzLl9sb29rdXBbYCR7b3RoZXJDb29yZHNbal0ueSArIFwiX1wiICsgb3RoZXJDb29yZHNbal0ueH1gXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWFkamFjZW50Q2VsbC5Jc01pbmUpXHJcbiAgICAgICAgICAgICAgICAgICAgYWRqYWNlbnRDZWxsLkluY3JlbWVudEFkamFjZW50TWluZUNvdW50KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3V0aWwuTG9nKGBuZXcgZ2FtZSBnZW5lcmF0ZWRgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBnZXR0ZXJzXHJcbiAgICBnZXQgR2FtZUlzUGxheWFibGUoKSB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLl9nYW1lRGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IEdhbWVJc1dvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2FtZUNvbXBsZXRpb25TdGF0ZSA9PSBNSU5FU1dFRVBFUl9HQU1FX0NPTVBMRVRJT05fU1RBVEVTLmNvbXBsZXRlZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgU2l6ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgSWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBFbGFwc2VkVGltZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbGFwc2VkVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgR2FtZUNvbXBsZXRpb25TdGF0ZShnYW1lQ29tcGxldGlvblN0YXRlKSB7XHJcbiAgICAgICAgdGhpcy5fZ2FtZUNvbXBsZXRpb25TdGF0ZSA9IGdhbWVDb21wbGV0aW9uU3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IE9uQ2VsbFN0YXRlQ2hhbmdlKGZuKSB7XHJcbiAgICAgICAgdGhpcy5fb25DZWxsU3RhdGVDaGFuZ2UgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgR2FtZURpc2FibGVkKGRpc2FibGVkKSB7XHJcbiAgICAgICAgdGhpcy5fZ2FtZURpc2FibGVkID0gZGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IE9uR2FtZUNvbXBsZXRpb25TdGF0ZUNoYW5nZShmbikge1xyXG4gICAgICAgIHRoaXMuX29uR2FtZUNvbXBsZXRpb25TdGF0ZUNoYW5nZSA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIEdlbmVyYXRlQWRqYWNlbnRDZWxscyhyb3dJbmRleCwgY29sSW5kZXgpIHtcclxuICAgICAgICAvLyBnZW5lcmF0ZSA4IGFkamFjZW50IGNvLW9yZHMsIGNsYW1wZWQgdG8gaW4tYm91bmRzXHJcbiAgICAgICAgbGV0IG90aGVyQ29vcmRzID0gW107XHJcblxyXG4gICAgICAgIGlmIChyb3dJbmRleCAtIDEgPj0gMCkge1xyXG4gICAgICAgICAgICBpZiAoY29sSW5kZXggLSAxID49IDApIHtcclxuICAgICAgICAgICAgICAgIG90aGVyQ29vcmRzLnB1c2goe3g6IGNvbEluZGV4LTEsIHk6cm93SW5kZXgtMX0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBvdGhlckNvb3Jkcy5wdXNoKHt4OiBjb2xJbmRleCwgeTpyb3dJbmRleC0xfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29sSW5kZXggKyAxIDwgdGhpcy5fc2l6ZS53aWR0aClcclxuICAgICAgICAgICAgICAgIG90aGVyQ29vcmRzLnB1c2goe3g6IGNvbEluZGV4KzEsIHk6cm93SW5kZXgtMX0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAoY29sSW5kZXggLSAxID49IDApIFxyXG4gICAgICAgICAgICBvdGhlckNvb3Jkcy5wdXNoKHt4OiBjb2xJbmRleC0xLCB5OnJvd0luZGV4fSk7XHJcblxyXG4gICAgICAgIGlmIChjb2xJbmRleCArIDEgPCB0aGlzLl9zaXplLndpZHRoKVxyXG4gICAgICAgICAgICBvdGhlckNvb3Jkcy5wdXNoKHt4OiBjb2xJbmRleCsxLCB5OnJvd0luZGV4fSk7XHJcblxyXG4gICAgICAgIGlmIChyb3dJbmRleCArIDEgPCB0aGlzLl9zaXplLmhlaWdodCkge1xyXG4gICAgICAgICAgICBpZiAoY29sSW5kZXggLSAxID49IDApIFxyXG4gICAgICAgICAgICAgICAgb3RoZXJDb29yZHMucHVzaCh7eDogY29sSW5kZXgtMSwgeTpyb3dJbmRleCsxfSk7XHJcblxyXG4gICAgICAgICAgICBvdGhlckNvb3Jkcy5wdXNoKHt4OiBjb2xJbmRleCwgeTpyb3dJbmRleCsxfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29sSW5kZXggKyAxIDwgdGhpcy5fc2l6ZS53aWR0aClcclxuICAgICAgICAgICAgICAgIG90aGVyQ29vcmRzLnB1c2goe3g6IGNvbEluZGV4KzEsIHk6cm93SW5kZXgrMX0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG90aGVyQ29vcmRzO1xyXG4gICAgfVxyXG5cclxuICAgIENlbGxCeUlkKGNlbGxJZCkge1xyXG4gICAgICAgIGxldCBjZWxsID0gdGhpcy5fbG9va3VwW2NlbGxJZF07XHJcblxyXG4gICAgICAgIGlmIChjZWxsID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHRocm93IGBjZWxsIHdpdGggaWQgJHtjZWxsSWR9IGNvdWxkIG5vdCBiZSBmb3VuZGA7XHJcblxyXG4gICAgICAgIHJldHVybiBjZWxsO1xyXG4gICAgfVxyXG5cclxuICAgIFJldmVhbEFsbE1pbmVzICgpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX21pbmVDZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX21pbmVDZWxsc1tpXS5Jc1JldmVhbGVkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWluZUNlbGxzW2ldLlNldElzUmV2ZWFsZWQoKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuRmlyZUNlbGxTdGF0ZUNoYW5nZSh0aGlzLl9taW5lQ2VsbHNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBBdHRlbXB0QXV0b0ZpbGwoY2VsbCkge1xyXG4gICAgICAgIGxldCBhdXRvRmlsbHMgPSB0aGlzLkdldEFkamFjZW50Tm9uTWluZU5vblJldmVhbGVkQ2VsbHMoY2VsbCk7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXV0b0ZpbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoYXQuU2VsZWN0Q2VsbChhdXRvRmlsbHNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBHZXRBZGphY2VudE5vbk1pbmVOb25SZXZlYWxlZENlbGxzKGNlbGwpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGFkakNlbGxJbmRpY2VzID0gdGhpcy5HZW5lcmF0ZUFkamFjZW50Q2VsbHMoY2VsbC5yb3dJbmRleCwgY2VsbC5jb2xJbmRleCk7XHJcbiAgICAgICAgbGV0IGFkakNlbGxzID0gW107XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhZGpDZWxsSW5kaWNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYyA9IGFkakNlbGxJbmRpY2VzW2ldO1xyXG4gICAgICAgICAgICBsZXQgYWRqYWNlbnRDZWxsID0gdGhhdC5DZWxsQnlJZChgJHtjLnkgKyBcIl9cIiArIGMueH1gKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghYWRqYWNlbnRDZWxsLklzTWluZSAmJiAhYWRqYWNlbnRDZWxsLklzUmV2ZWFsZWQpXHJcbiAgICAgICAgICAgICAgICBhZGpDZWxscy5wdXNoKGFkamFjZW50Q2VsbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYWRqQ2VsbHM7XHJcbiAgICB9XHJcblxyXG4gICAgRmlyZUNlbGxTdGF0ZUNoYW5nZSAoY2hhbmdlZENlbGwpIHtcclxuICAgICAgICBpZiAodGhpcy5fb25DZWxsU3RhdGVDaGFuZ2UpXHJcbiAgICAgICAgICAgIHRoaXMuX29uQ2VsbFN0YXRlQ2hhbmdlKGNoYW5nZWRDZWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBGaXJlR2FtZUNvbXBsZXRpb25TdGF0ZUNoYW5nZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fb25HYW1lQ29tcGxldGlvblN0YXRlQ2hhbmdlKVxyXG4gICAgICAgICAgICB0aGlzLl9vbkdhbWVDb21wbGV0aW9uU3RhdGVDaGFuZ2UodGhpcy5fZ2FtZUNvbXBsZXRpb25TdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgTWFya0NlbGwoY2VsbCkge1xyXG4gICAgICAgIHRoaXMuX3V0aWwuTG9nKGBtYXJrIGNlbGwgaWQgJHtjZWxsLklkfWApO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuR2FtZUlzUGxheWFibGUpIHtcclxuICAgICAgICAgICAgLy8gZG9uJ3QgZG8gYW55dGhpbmdcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFjZWxsLklzUmV2ZWFsZWQpIHtcclxuXHJcbiAgICAgICAgICAgIGNlbGwuU2V0SXNNYXJrZWQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRyaWdnZXIgaXQgdG8gcmUtcmVuZGVyXHJcbiAgICAgICAgICAgIHRoaXMuRmlyZUNlbGxTdGF0ZUNoYW5nZShjZWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgTWFya0NlbGxieUlkKGNlbGxJZCkge1xyXG4gICAgICAgIGxldCBjZWxsID0gdGhpcy5DZWxsQnlJZChjZWxsSWQpOyAgICAgICBcclxuXHJcbiAgICAgICAgdGhpcy5NYXJrQ2VsbChjZWxsKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgU2VsZWN0Q2VsbChjZWxsKSB7XHJcbiAgICAgICAgdGhpcy5fdXRpbC5Mb2coYHNlbGVjdCBjZWxsIGlkICR7Y2VsbC5JZH1gKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3RhcnR0aW1lID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgLy8gcmVjb3JkIG1pbGxpcyBzdGFydCB0aW1lXHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnR0aW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5HYW1lSXNQbGF5YWJsZSkge1xyXG4gICAgICAgICAgICAvLyBkb24ndCBkbyBhbnl0aGluZ1xyXG4gICAgICAgICAgICB0aGlzLl91dGlsLkxvZyhgZ2FtZSBoYXMgYWxyZWFkeSBiZWVuICR7dGhpcy5fZ2FtZUNvbXBsZXRpb25TdGF0ZSA9PSBNSU5FU1dFRVBFUl9HQU1FX0NPTVBMRVRJT05fU1RBVEVTLmNvbXBsZXRlZCA/IFwid29uIVwiIDogXCJsb3N0IVwifWApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWNlbGwuSXNSZXZlYWxlZCkge1xyXG4gICAgICAgICAgICAvLyByZXZlYWwgdGhpcyBjZWxsXHJcbiAgICAgICAgICAgIGNlbGwuU2V0SXNSZXZlYWxlZCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gdHJpZ2dlciBpdCB0byByZS1yZW5kZXJcclxuICAgICAgICAgICAgdGhpcy5GaXJlQ2VsbFN0YXRlQ2hhbmdlKGNlbGwpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNlbGwuSXNNaW5lKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBvaCBvaGgsIGxvc3QsIHNvIHN0b3AgdGhlIGNsb2NrXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3B0aW1lID0gRGF0ZS5ub3coKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBtYXJrIHRoaXMgbWluZSBhcyB0aGUgb25lIGhpdFxyXG4gICAgICAgICAgICAgICAgY2VsbC5TZXRJc0xvc2luZ01pbmUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZUNvbXBsZXRpb25TdGF0ZSA9IE1JTkVTV0VFUEVSX0dBTUVfQ09NUExFVElPTl9TVEFURVMuZmFpbGVkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SZXZlYWxBbGxNaW5lcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5HYW1lRGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGFwc2VkVGltZSA9IHRoaXMuc3RvcHRpbWUgLSB0aGlzLnN0YXJ0dGltZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3V0aWwuTG9nKGBwbGF5ZXIgaGFzIGxvc3QgaW4gJHt0aGlzLmVsYXBzZWRUaW1lfWApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5GaXJlR2FtZUNvbXBsZXRpb25TdGF0ZUNoYW5nZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSAgIFxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIHlheSwgeW91IGNsZWFyZWQgb25lXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50Q2VsbENvdW50Kys7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgcGxheWVyIGhhcyB3b25cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXJyZW50Q2VsbENvdW50ID09IHRoaXMuX3RvdGFsQ2VsbENvdW50VG9XaW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB5YXlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3B0aW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkdhbWVDb21wbGV0aW9uU3RhdGUgPSBNSU5FU1dFRVBFUl9HQU1FX0NPTVBMRVRJT05fU1RBVEVTLmNvbXBsZXRlZDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlJldmVhbEFsbE1pbmVzKCk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuR2FtZURpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsYXBzZWRUaW1lID0gdGhpcy5zdG9wdGltZSAtIHRoaXMuc3RhcnR0aW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3V0aWwuTG9nKGBwbGF5ZXIgaGFzIHdvbiBpbiAke3RoaXMuZWxhcHNlZFRpbWV9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5GaXJlR2FtZUNvbXBsZXRpb25TdGF0ZUNoYW5nZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIG90aGVyd2lzZSwgY2VsbCBpcyBub3QgYSBtaW5lLCBwbGF5ZXIgaGFzIG5vdCB5ZXQgd29uLCBzbyBhdHRlbXB0IHRvIGF1dG9maWxsIGlmIHRoZSBjZWxsIGlzIGJsYW5rXHJcbiAgICAgICAgICAgIGlmIChjZWxsLkFkamFjZW50TWluZUNvdW50ID09IDApIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIHRoaXMuQXR0ZW1wdEF1dG9GaWxsKGNlbGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFNlbGVjdENlbGxCeUlkKGNlbGxJZCkge1xyXG4gICAgICAgIGxldCBjZWxsID0gdGhpcy5DZWxsQnlJZChjZWxsSWQpOyAgICAgICBcclxuXHJcbiAgICAgICAgdGhpcy5TZWxlY3RDZWxsKGNlbGwpO1xyXG4gICAgfVxyXG5cclxuICAgIFRyaWdnZXJBdXRvV2luKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5HYW1lSXNQbGF5YWJsZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fY2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICBsZXQgaW5uZXJBcnJheSA9IHRoaXMuX2NlbGxzW2ldO1xyXG5cclxuICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgaW5uZXJBcnJheS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpbm5lckFycmF5W2pdLklzTWluZSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlNlbGVjdENlbGwoaW5uZXJBcnJheVtqXSk7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBUcmlnZ2VyQXV0b0xvc2UoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLkdhbWVJc1BsYXlhYmxlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIHRoaXMuU2VsZWN0Q2VsbCh0aGlzLl9taW5lQ2VsbHNbMF0pO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IFN0YXREYiB9IGZyb20gXCIuLi9jb3JlYXBwL3N0YXRkYi5qc1wiO1xyXG5pbXBvcnQgeyBNSU5FU1dFRVBFUl9HQU1FX0NPTVBMRVRJT05fU1RBVEVTIH0gZnJvbSBcIi4vbWluZXN3ZWVwZXJjb25zdGFudHMuanNcIjtcclxuaW1wb3J0IHsgTWluZXN3ZWVwZXJTY29yZSB9IGZyb20gXCIuL21pbmVzd2VlcGVyc2NvcmUuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNaW5lc3dlZXBlckdhbWVHcmlkIHtcclxuICAgIGNvbnN0cnVjdG9yKCRyb290RWxlbWVudCwgZ2FtZVN0YXRlLCBsb2dVdGlsKSB7XHJcbiAgICAgICAgdGhpcy4kcm9vdEVsZW1lbnQgPSAkcm9vdEVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSBnYW1lU3RhdGU7ICBcclxuICAgICAgICB0aGlzLmxvZ1V0aWwgPSBsb2dVdGlsO1xyXG4gICAgICAgIHRoaXMuc3RhdERiID0gbmV3IFN0YXREYigpO1xyXG4gICAgfSBcclxuXHJcbiAgICAvLyBtZXRob2RzXHJcblxyXG4gICAgR2V0Q2VsbENsYXNzKGNlbGwpIHtcclxuICAgICAgICBpZiAoIWNlbGwuSXNSZXZlYWxlZCkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY2VsbC5Jc01hcmtlZClcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImhpZGRlbiBtYXJrZWRcIjtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBcImhpZGRlblwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNlbGwuSXNNaW5lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjZWxsLklzTG9zaW5nTWluZSA/IFwibWluZSB0cmlnZ2VyZWRcIiA6IFwibWluZSBcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGNlbGwuQWRqYWNlbnRNaW5lQ291bnQgPiAwKSBcclxuICAgICAgICAgICAgcmV0dXJuIGBvcGVuLSR7Y2VsbC5BZGphY2VudE1pbmVDb3VudH1gO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBcImNsZWFyXCI7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0Q2VsbENvbnRlbnQoY2VsbCkge1xyXG4gICAgICAgIGxldCBjZWxsR2x5cGggPSBjZWxsLklzUmV2ZWFsZWQgPyBcclxuICAgICAgICAoY2VsbC5Jc01pbmUgPyBcclxuICAgICAgICAgICAgXCLwn5KjXCIgOiBcclxuICAgICAgICAgICAgICAgIChjZWxsLkFkamFjZW50TWluZUNvdW50ID4gMCA/IGNlbGwuQWRqYWNlbnRNaW5lQ291bnQgOiBcIlwiKVxyXG4gICAgICAgICkgXHJcbiAgICAgICAgOiBcIlwiO1xyXG5cclxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9J2NlbGwtaW5uZXInPiR7Y2VsbEdseXBofTwvZGl2PmA7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0SW5pdGlhbENlbGxIdG1sKGNlbGxJZCkge1xyXG4gICAgICAgIGxldCBjZWxsID0gdGhpcy5nYW1lU3RhdGUuQ2VsbEJ5SWQoY2VsbElkKTtcclxuXHJcbiAgICAgICAgbGV0IGNlbGxDbGFzcyA9IHRoaXMuR2V0Q2VsbENsYXNzKGNlbGwpO1xyXG4gICAgICAgIGxldCBjZWxsQ29udGVudCA9IHRoaXMuR2V0Q2VsbENvbnRlbnQoY2VsbCk7XHJcblxyXG4gICAgICAgIHJldHVybiBgPHRkIGNsYXNzPSdjZWxsICR7Y2VsbENsYXNzfScgaWQ9JyR7Y2VsbElkfSc+JHtjZWxsQ29udGVudH08L3RkPmA7XHJcbiAgICB9XHJcblxyXG4gICAgUmVtb3ZlSGFuZGxlcnMoKSB7XHJcbiAgICAgICAgdGhpcy4kcm9vdEVsZW1lbnQuZmluZCgndGFibGUnKVxyXG4gICAgICAgICAgICAub2ZmKCdjb250ZXh0bWVudScpXHJcbiAgICAgICAgICAgIC5vZmYoJ2NsaWNrJyk7XHJcbiAgICB9XHJcblxyXG4gICAgQWRkSGFuZGxlcnMoKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyBhZGQgc3VwcHJlc3MgY29udGV4dCBtZW51XHJcbiAgICAgICAgdGhpcy4kcm9vdEVsZW1lbnQuZmluZCgndGFibGUnKS5vbignY29udGV4dG1lbnUnLCAndGQuY2VsbCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLndoaWNoID09IDMpIHtcclxuICAgICAgICAgICAgICAgIC8vIHJpZ2h0IG1vdXNlXHJcbiAgICAgICAgICAgICAgICB0aGF0LmdhbWVTdGF0ZS5NYXJrQ2VsbGJ5SWQoZS5jdXJyZW50VGFyZ2V0LmlkKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBhZGQgc2VsZWN0IGhhbmRsbGVyXHJcbiAgICAgICAgdGhpcy4kcm9vdEVsZW1lbnQuZmluZCgndGFibGUnKS5vbignY2xpY2snLCAndGQuY2VsbCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgaWYoZS53aGljaCA9PSAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBsZWZ0LW1vdXNlXHJcbiAgICAgICAgICAgICAgICB0aGF0LmdhbWVTdGF0ZS5TZWxlY3RDZWxsQnlJZChlLmN1cnJlbnRUYXJnZXQuaWQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5sb2dVdGlsLkxvZyhcIm1vdW50IG1pbmVzd2VlcGVyZ3JpZFwiKTtcclxuXHJcbiAgICAgICAgLy8gcmVtb3ZlIGFueSBleGlzdGluZyBoYW5kbGVyc1xyXG4gICAgICAgIHRoaXMuUmVtb3ZlSGFuZGxlcnMoKTtcclxuXHJcbiAgICAgICAgbGV0IHN0YWNrID0gW107XHJcblxyXG4gICAgICAgIC8vIHRlbXBsYXRlIGh0bWwgY2VsbCBjb250ZW50XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZ2FtZVN0YXRlLlNpemUuaGVpZ2h0OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHJvd0h0bWwgPSBcIjx0cj5cIjtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHRoaXMuZ2FtZVN0YXRlLlNpemUud2lkdGg7IGorKykgeyAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJvd0h0bWwgKz0gdGhpcy5HZXRJbml0aWFsQ2VsbEh0bWwoIGkgKyBcIl9cIiArIGopO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJvd0h0bWwgKz0gXCI8L3RyPlwiO1xyXG4gICAgICAgICAgICBzdGFjay5wdXNoKHJvd0h0bWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gcmVuZGVyXHJcbiAgICAgICAgdGhpcy4kcm9vdEVsZW1lbnQuaHRtbChgPHRhYmxlIGNsYXNzPScke3RoaXMuZ2FtZVN0YXRlLlNpemUubGFiZWx9Jz48dGJvZHk+JHtzdGFjay5qb2luKFwiXCIpfTwvdGJvZHk+PC90YWJsZT5gKTsgXHJcblxyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAvLyBhZGQgY2VsbCBzdGF0ZSBjaGFuZ2UgY2FsbGJhY2sgZm9yIHJlbmRlcmluZyBpbmRpdmlkdWFsIGNlbGxzXHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUuT25DZWxsU3RhdGVDaGFuZ2UgPSBmdW5jdGlvbihjZWxsKSB7XHJcbiAgICAgICAgICAgIC8vIHJlLXJlbmRlciB0aGUgY2VsbFxyXG4gICAgICAgICAgICB0aGF0LmxvZ1V0aWwuTG9nKGByZW5kZXIgY2VsbCAke2NlbGwuSWR9IGluIGdhbWUgd2l0aCBpZCAke3RoYXQuZ2FtZVN0YXRlLklkfWApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGNlbGxDbGFzcyA9IHRoYXQuR2V0Q2VsbENsYXNzKGNlbGwpO1xyXG4gICAgICAgICAgICBsZXQgY2VsbENvbnRlbnQgPSB0aGF0LkdldENlbGxDb250ZW50KGNlbGwpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJChgIyR7Y2VsbC5JZH1gKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKClcclxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhgY2VsbCAke2NlbGxDbGFzc31gKSBcclxuICAgICAgICAgICAgICAgIC5odG1sKGNlbGxDb250ZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBnYW1lIGNvbXBsZXRpb24gc3RhdGUgaGFuZGxlclxyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlLk9uR2FtZUNvbXBsZXRpb25TdGF0ZUNoYW5nZSA9IGZ1bmN0aW9uKGdhbWVDb21wbGV0aW9uU3RhdGUpIHtcclxuICAgICAgICAgICAgaWYgKGdhbWVDb21wbGV0aW9uU3RhdGUgPT0gTUlORVNXRUVQRVJfR0FNRV9DT01QTEVUSU9OX1NUQVRFUy5jb21wbGV0ZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuJHJvb3RFbGVtZW50LmFwcGVuZChcIjxkaXYgY2xhc3M9J2VuZC1zdGF0ZSc+PGltZyBzcmM9Jy4vaW1nL3dpbi5naWYnPjwvaW1nPjwvZGl2PlwiKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IHNjb3JlID0gbmV3IE1pbmVzd2VlcGVyU2NvcmUodGhhdC5nYW1lU3RhdGUuU2l6ZS5sYWJlbCwgJ3RpbW15JywgJ3VpZCAxMjMnLCB0aGF0LmdhbWVTdGF0ZS5FbGFwc2VkVGltZSkuUGVyc2lzdGFibGVEYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zdGF0RGIuQWRkU2NvcmUoc2NvcmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoZ2FtZUNvbXBsZXRpb25TdGF0ZSA9PSBNSU5FU1dFRVBFUl9HQU1FX0NPTVBMRVRJT05fU1RBVEVTLmZhaWxlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC4kcm9vdEVsZW1lbnQuYXBwZW5kKFwiPGRpdiBjbGFzcz0nZW5kLXN0YXRlJz48aW1nIHNyYz0nLi9pbWcvbG9zZS5naWYnPjwvaW1nPjwvZGl2PlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIGJpbmQgaGFuZGxlcnNcclxuICAgICAgICB0aGlzLkFkZEhhbmRsZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgVW5Nb3VudCgpIHtcclxuICAgICAgICB0aGlzLmxvZ1V0aWwuTG9nKFwidW5tb3VudCBtaW5lc3dlZXBlcmdyaWRcIik7XHJcbiAgICAgICAgdGhpcy5SZW1vdmVIYW5kbGVycygpO1xyXG4gICAgICAgIHRoaXMuJHJvb3RFbGVtZW50Lmh0bWwoJycpOyBcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBNaW5lc3dlZXBlclNjb3JlIHtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWV0eXBlLCBuYW1lLCB1aWQsIHRpbWUpIHtcclxuICAgICAgICB0aGlzLmdhbWUgPSBcIm1pbmVzd2VlcGVyXCI7XHJcbiAgICAgICAgdGhpcy5nYW1lYWxpYXMgPSBcIiYjNjI1O1wiO1xyXG4gICAgICAgIHRoaXMuZ2FtZXR5cGUgPSBnYW1ldHlwZTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMudWlkID0gdWlkO1xyXG4gICAgICAgIHRoaXMudGltZSA9IHRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFBlcnNpc3RhYmxlRGF0YSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBnYW1lOiB0aGlzLmdhbWUsXHJcbiAgICAgICAgICAgIGdhbWVhbGlhczogdGhpcy5nYW1lYWxpYXMsXHJcbiAgICAgICAgICAgIGdhbWV0eXBlOiB0aGlzLmdhbWV0eXBlLFxyXG4gICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXHJcbiAgICAgICAgICAgIHVpZDogdGhpcy51aWQsXHJcbiAgICAgICAgICAgIHRpbWU6IHRoaXMudGltZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBBcHBVdGlsIH0gZnJvbSAnLi4vY29yZWFwcC9hcHB1dGlsLmpzJztcclxuaW1wb3J0IHsgU3RhdERiIH0gZnJvbSAnLi4vY29yZWFwcC9zdGF0ZGIuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFwcFN0YXRzIHtcclxuICAgIGNvbnN0cnVjdG9yKHJvb3RDb250YWluZXJTZWxlY3Rvcikge1xyXG4gICAgICAgIHRoaXMucm9vdENvbnRhaW5lclNlbGVjdG9yID0gcm9vdENvbnRhaW5lclNlbGVjdG9yO1xyXG4gICAgICAgIHRoaXMuc2NvcmVHcmlkSWQgPSAnc2NvcmVzLWdyaWQnO1xyXG4gICAgICAgIHRoaXMudXRpbCA9IG5ldyBBcHBVdGlsKCk7XHJcbiAgICAgICAgdGhpcy5zdGF0c2RiID0gbmV3IFN0YXREYigpO1xyXG5cclxuICAgICAgICB0aGlzLnRlbXBsYXRlID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPSdhcHAtY29udGFpbmVyIGNvbnRhaW5lci1zbSc+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdyb3cnPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2NvbC0xMiBwLTEgcC1zbS0zIHB5LXNtLTIgZy1zbS0yJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtc3RyaXBlZCB0YWJsZS1ib3JkZXJsZXNzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc2NvcGU9XCJjb2xcIj51c2VyPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHNjb3BlPVwiY29sXCI+Z2FtZTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzY29wZT1cImNvbFwiPmRpZmZpY3VsdHk8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc2NvcGU9XCJjb2xcIj50aW1lPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keSBpZD0nJHt0aGlzLnNjb3JlR3JpZElkfSc+PC90Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgLy8gbWV0aG9kc1xyXG4gICAgTW91bnRDb250cm9scyhyZXN1bHRzKSB7XHJcbiAgICAgICAgbGV0IHN0YWNrID0gW107XHJcblxyXG4gICAgICAgIHJlc3VsdHMuZm9yRWFjaCgoZG9jKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gZG9jLmRhdGEoKTtcclxuICAgICAgICAgICAgc3RhY2sucHVzaChgXHJcbiAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkPiR7ZGF0YS5uYW1lfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0nZC1pbmxpbmUtYmxvY2snPiR7ZGF0YS5nYW1lYWxpYXN9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0nZC1ub25lIGQtc20taW5saW5lJz4ke2RhdGEuZ2FtZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGQ+JHtkYXRhLmdhbWV0eXBlfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkPiR7KGRhdGEudGltZSAvIDEwMDApLnRvRml4ZWQoMSl9PC90ZD5cclxuICAgICAgICAgICAgICAgIDwvdHI+YFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKGAjJHt0aGlzLnNjb3JlR3JpZElkfWApLmh0bWwoc3RhY2suam9pbignJykpO1xyXG4gICAgfVxyXG5cclxuICAgIFVuTW91bnRDb250cm9scygpIHtcclxuICAgICAgICAkKHRoaXMucm9vdENvbnRhaW5lclNlbGVjdG9yKS5odG1sKCcnKTtcclxuICAgIH1cclxuXHJcbiAgICBNb3VudCgpIHtcclxuICAgICAgICB0aGlzLnV0aWwuTG9nKFwibW91bnQgYXBwc3RhdHNcIik7XHJcbiAgICAgICAgJCh0aGlzLnJvb3RDb250YWluZXJTZWxlY3RvcikuaHRtbCh0aGlzLnRlbXBsYXRlKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0c2RiLkdldFNjb3Jlcyh0aGlzLk1vdW50Q29udHJvbHMuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgVW5Nb3VudCgpIHtcclxuICAgICAgICB0aGlzLnV0aWwuTG9nKFwidW5tb3VudCBhcHBzdGF0c1wiKTtcclxuICAgICAgICB0aGlzLlVuTW91bnRDb250cm9scygpO1xyXG4gICAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBOYXZpZ2F0aW9uIH0gZnJvbSAnLi9uYXZpZ2F0aW9uLmpzJztcclxuaW1wb3J0IHsgTWluZXN3ZWVwZXIgfSBmcm9tICcuLi9taW5lc3dlZXBlci9taW5lc3dlZXBlcmFwcC5qcyc7XHJcbmltcG9ydCB7IEVycm9yIH0gZnJvbSAnLi9lcnJvci5qcyc7XHJcbmltcG9ydCB7IEFwcFJvdXRlIH0gZnJvbSAnLi9hcHByb3V0ZSc7XHJcbmltcG9ydCB7IEFwcFJvdXRlciB9IGZyb20gJy4vYXBwcm91dGVyJztcclxuaW1wb3J0IHsgQXBwU3RhdHMgfSBmcm9tICcuLy4uL3N0YXRzL2FwcHN0YXRzLmpzJztcclxuXHJcbmNsYXNzIEFwcCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLiRyb290QXBwQ29udGFpbmVyID0gJyNhcHAtbWFpbic7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXMgPSBbXHJcbiAgICAgICAgICAgIG5ldyBBcHBSb3V0ZShcIi9cIiwgZnVuY3Rpb24oKSB7IHJldHVybiBuZXcgTWluZXN3ZWVwZXIodGhpcy4kcm9vdEFwcENvbnRhaW5lcik7IH0uYmluZCh0aGlzKSksXHJcbiAgICAgICAgICAgIG5ldyBBcHBSb3V0ZShcIi9zdGF0c1wiLCBmdW5jdGlvbigpIHsgcmV0dXJuIG5ldyBBcHBTdGF0cyh0aGlzLiRyb290QXBwQ29udGFpbmVyKTsgfS5iaW5kKHRoaXMpKSxcclxuICAgICAgICAgICAgbmV3IEFwcFJvdXRlKFwiL2Vycm9yXCIsIGZ1bmN0aW9uKCkgeyByZXR1cm4gbmV3IEVycm9yKHRoaXMuJHJvb3RBcHBDb250YWluZXIpOyB9LmJpbmQodGhpcykpXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICBNb3VudCgpIHtcclxuICAgICAgICBuZXcgQXBwUm91dGVyKHRoaXMucm91dGVzKTtcclxuICAgICAgICBuZXcgTmF2aWdhdGlvbigpOyAgICAgICBcclxuICAgIH1cclxufVxyXG5cclxuLy8gc3RhcnRcclxubmV3IEFwcCgpLk1vdW50KCk7XHJcblxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==