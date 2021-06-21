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
                .toggleClass('fadeIn')
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
                .toggleClass('fadeIn')
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

    GetScores(startAt, n, onSuccess, onError) {
        // fetch 1 more than n, to test for paging
        let k = n + 1;
        this.db.collection(_config_config_APPTARGET_js__WEBPACK_IMPORTED_MODULE_0__.EnvConfig.scores_collection).orderBy("time").startAt(startAt).limit(k).get().then(
            (querySnapshot) => { 
                let results = [];

                querySnapshot.forEach((doc) => {
                    let index = startAt;
                    var data = doc.data();
                    data.docid = doc.id;
                    index++;
                    
                    results.push(data);
                });

                let hasPrev = startAt != 0;
                let hasNext = results.length > n;

                // if the length, exceeds what we wanted to query, there's a next page, so pop the one extra entry
                if (hasNext)
                    results.pop();
        
                let page = {
                    data: results,
                    startAt: startAt,
                    hasPrev: hasPrev,
                    prevStartAt: hasPrev ? startAt - n : undefined,
                    hasNext: hasNext,
                    nextStartAt: hasNext ? startAt + n : undefined
                };

                onSuccess(page); 
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

/***/ "./src/js/coreapp/userutil.js":
/*!************************************!*\
  !*** ./src/js/coreapp/userutil.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserUtil": () => (/* binding */ UserUtil)
/* harmony export */ });
class UserUtil {
    constructor() {
      this.user = firebase.auth().currentUser;
    }
  
    get IsLoggedIn() {
      return this.user != null;
    }
  
    get User() {
      return this.user;
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
        this._gameAutoWon = undefined;
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

    get WonByAutoWin() {
        return this._gameAutoWon === true;
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

    set WonByAutoWin(wonByAutoWin) {
        this._gameAutoWon = wonByAutoWin;
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

        this.WonByAutoWin = true;

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
/* harmony import */ var _coreapp_userutil_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../coreapp/userutil.js */ "./src/js/coreapp/userutil.js");





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
                
                if (that.gameState.WonByAutoWin) {
                    // no score for you
                    that.logUtil.Log("no score submitted");
                    return;
                }

                let userUtil = new _coreapp_userutil_js__WEBPACK_IMPORTED_MODULE_3__.UserUtil();
                if (userUtil.IsLoggedIn) {
                    that.logUtil.Log("submit score");
                    let score = new _minesweeperscore_js__WEBPACK_IMPORTED_MODULE_2__.MinesweeperScore(
                        that.gameState.Size.label, 
                        userUtil.User.displayName, 
                        userUtil.User.uid, 
                        that.gameState.ElapsedTime).PersistableData;
                    that.statDb.AddScore(score);
                    that.logUtil.Log("score submitted");
                }
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
        this.Persistable = {
            game: "minesweeper",
            gamealias: "&#625;",
            gametype: gametype,
            name: name,
            uid: uid,
            time: time
        };
    }

    get PersistableData() {
        return this.Persistable;
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
        this.pageStart = 0;
        this.pageSize = 10;

        this.template = `
            <div class='app-container container-sm stats-container'>
                <div class='row'>
                    <div class='col-12 p-1 p-sm-3 py-sm-2 g-sm-2'>
                        <table class="table table-striped table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">user</th>
                                    <th scope="col">difficulty</th>
                                    <th scope="col">time (s)</th>
                                </tr>
                            </thead>
                            <tbody id='${this.scoreGridId}' class='opacity-animation'></tbody>
                        </table>
                    </div>
                    <div class='col-12 p-1 p-sm-3 py-sm-2 g-sm-2 d-none content-justify-center' id='paging'>
                        <nav aria-label="...">
                            <ul class="pagination pagination">
                                <li id="pg-prev" class="disabled page-item" title="show me the previous scores"><a class="page-link" href="#/stats">&lt; prev</a></li>
                                <li id='pg-next' class="disabled page-item" title="show me the next scores"><a class="page-link" href="#/stats">next &gt;</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        `;
    }
        
    // methods
    MountStats(results) {
        // record where we are at for next paging
        this.pageStart =  results.startAt;

        // cosmetic index for display
        let startIndex = results.startAt;
        let stack = results.data.map((d) => {
            startIndex++;
            return `
                <tr id='${d.docid}'>
                    <td>${startIndex}</td>
                    <td>${d.name}</td>
                    <td>${d.gametype}</td>
                    <td>${(d.time / 1000).toFixed(1)}</td>
                </tr>`;
        });

        // show the scores
        $(`#${this.scoreGridId}`).html(stack.join('')).toggleClass('fadeIn');

        // show the paging, rebind handlers
        if (results.hasNext || results.hasPrev) {
            $('#paging')
                .removeClass('d-none')
                .find('#pg-prev')
                .off('click')
                .addClass('disabled')
                .end()
                .find('#pg-next')
                .off('click')
                .addClass('disabled');

            if (results.hasPrev) {
                let prev = function() {
                    this.QueryData(this.pageStart - this.pageSize, this.pageSize);
                }.bind(this);

                $('#pg-prev')
                    .removeClass('disabled')
                    .on('click', prev);
            }

            if (results.hasNext) {
                let next = function() {
                    this.QueryData(this.pageStart + this.pageSize, this.pageSize);
                }.bind(this);

                $('#pg-next')
                    .removeClass('disabled')
                    .on('click', next);
            }
        }
    }

    QueryData(pageStart, pageSize) {
        this.statsdb.GetScores(pageStart, pageSize, this.MountStats.bind(this));
    }

    UnMountControls() {
        $(this.rootContainerSelector).html('');
    }

    Mount() {
        this.util.Log("mount appstats");
        $(this.rootContainerSelector).html(this.template);

        // query inital data
        this.QueryData(this.pageStart, this.pageSize);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9hcHByb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9hcHByb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvcmVhcHAvYXBwdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9jb25maWcvY29uZmlnLWRldi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9lcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9nb29nbGVhdXRoaGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9sb2Rhc2hwb2x5ZmlsbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9uYXZpZ2F0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb3JlYXBwL3N0YXRkYi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC91c2VydXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbWluZXN3ZWVwZXIvbWluZXN3ZWVwZXJhcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21pbmVzd2VlcGVyL21pbmVzd2VlcGVyY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9taW5lc3dlZXBlci9taW5lc3dlZXBlcmdhbWVjZWxsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9taW5lc3dlZXBlci9taW5lc3dlZXBlcmdhbWVzdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbWluZXN3ZWVwZXIvbWluZXN3ZWVwZXJncmlkLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9taW5lc3dlZXBlci9taW5lc3dlZXBlcnNjb3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zdGF0cy9hcHBzdGF0cy5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2J1Qzs7QUFFaEM7QUFDUDtBQUNBLDJCQUEyQixnREFBTztBQUNsQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQ0FBMEMsS0FBSzs7QUFFL0M7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtRUFBbUUsTUFBTTtBQUN6RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwRHlEOztBQUVsRDtBQUNQO0FBQ0Esb0JBQW9CLHNFQUFhO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7O0FDWE87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7Ozs7OztBQ1pPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTJELGVBQWU7QUFDMUU7QUFDQTtBQUNBLDRDQUE0QyxzQkFBc0I7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7Ozs7QUN2Q2lFOztBQUUxRDtBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQiwwRUFBaUI7O0FBRTVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLEU7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwREE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCLFNBQVM7QUFDbkM7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQyxNQUFNLFNBQUk7O0FBRVgsaUVBQWUsQ0FBQyxFOzs7Ozs7Ozs7Ozs7Ozs7QUMxRTJDOztBQUVwRDtBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9EO0FBQ0E7QUFDQSxTQUFTOztBQUVULHFEO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNONkM7QUFDa0I7QUFDNUI7QUFDRztBQUNFO0FBQ1U7O0FBRWxEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLCtDQUFRLGtCQUFrQixZQUFZLHVFQUFXLHlCQUF5QixFQUFFO0FBQzVGLGdCQUFnQiwrQ0FBUSx1QkFBdUIsWUFBWSx3REFBUSx5QkFBeUIsRUFBRTtBQUM5RixnQkFBZ0IsK0NBQVEsdUJBQXVCLFlBQVksNENBQUsseUJBQXlCLEVBQUU7QUFDM0Y7QUFDQTs7QUFFQTtBQUNBLFlBQVksaURBQVM7QUFDckIsWUFBWSxzREFBVSxHO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQXBwUm91dGUge1xyXG4gICAgY29uc3RydWN0b3IocGF0aCwgY29tcG9uZW50Rm4pIHtcclxuICAgICAgICB0aGlzLl9wYXRoID0gcGF0aDtcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRGbiA9IGNvbXBvbmVudEZuO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwYXRoKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXRoO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjb21wb25lbnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvbmVudEZuKCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQXBwVXRpbCB9IGZyb20gJy4vYXBwdXRpbC5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQXBwUm91dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHJvdXRlcykge1xyXG4gICAgICAgIHRoaXMuYXBwVXRpbCA9IG5ldyBBcHBVdGlsKCk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXMgPSByb3V0ZXM7XHJcblxyXG4gICAgICAgIGNvbnN0IHJvdW50ZXJmdW5jdGlvbiA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkUm91dGUoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIHJvdW50ZXJmdW5jdGlvbik7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCByb3VudGVyZnVuY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRSb3V0ZSgpIHtcclxuICAgICAgICBsZXQgcGF0aCA9IHRoaXMucGFyc2VMb2NhdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYXBwVXRpbC5Mb2coYGxvYWRpbmcgcm91dGUgJHtwYXRofWApO1xyXG5cclxuICAgICAgICBsZXQgcm91dGUgPSB0aGlzLmZpbmRDb21wb25lbnQocGF0aCk7XHJcblxyXG4gICAgICAgIGxldCBjb21wb25lbnQ7XHJcblxyXG4gICAgICAgIGlmIChyb3V0ZSlcclxuICAgICAgICAgICAgY29tcG9uZW50ID0gcm91dGUuY29tcG9uZW50O1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb21wb25lbnQgPSB0aGlzLmZpbmRDb21wb25lbnQoJy9lcnJvcicpLmNvbXBvbmVudDtcclxuICAgICAgICAgICAgY29tcG9uZW50LkVycm9yQ29kZSA9ICc0MDQnO1xyXG4gICAgICAgICAgICBjb21wb25lbnQuVXNlckVycm9yTWVzc2FnZSA9ICd3ZSBoYXZlIGNyeXB0byBsb2NrZXJlZCB5b3VyIHN0dWZmJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuTW91bnRDb21wb25lbnQoY29tcG9uZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwYXJzZUxvY2F0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBsb2NhdGlvbi5oYXNoLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCkgfHwgJy8nO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmRDb21wb25lbnQocm91dGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yb3V0ZXMuZmluZChyID0+IHIucGF0aC5tYXRjaChuZXcgUmVnRXhwKGBeXFxcXCR7cm91dGV9JGAsICdnbScpKSkgfHwgdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIFVubW91bnRDdXJyZW50Q29tcG9uZW50KCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1vdW50ZWRDb21wb25lbnQpXHJcbiAgICAgICAgICAgIHRoaXMubW91bnRlZENvbXBvbmVudC5Vbk1vdW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgTW91bnRDb21wb25lbnQoY29tcG9uZW50KSB7XHJcbiAgICAgICAgdGhpcy5Vbm1vdW50Q3VycmVudENvbXBvbmVudCgpO1xyXG4gICAgICAgIHRoaXMubW91bnRlZENvbXBvbmVudCA9IGNvbXBvbmVudDtcclxuICAgICAgICB0aGlzLm1vdW50ZWRDb21wb25lbnQuTW91bnQoKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBFbnZDb25maWcgfSBmcm9tICcuL2NvbmZpZy9jb25maWctQVBQVEFSR0VULmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBVdGlsIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX2xvZyA9IEVudkNvbmZpZy5lbnYgPT09IFwiZGV2XCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIExvZyhlbnRyeSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9sb2cgJiYgZW50cnkpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVudHJ5KTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjb25zdCBBcHBGaXJlYmFzZUNvbmZpZyA9IHtcclxuICAgIGFwaUtleTogXCJBSXphU3lCaXRrRHIzbzhoSkJoLWxtNXRabnR3bUtoVFdpU1BFcGtcIixcclxuICAgIGF1dGhEb21haW46IFwibWVpbi1zd2VlcGVyLWQ1OTk1LmZpcmViYXNlYXBwLmNvbVwiLFxyXG4gICAgcHJvamVjdElkOiBcIm1laW4tc3dlZXBlci1kNTk5NVwiLFxyXG4gICAgc3RvcmFnZUJ1Y2tldDogXCJtZWluLXN3ZWVwZXItZDU5OTUuYXBwc3BvdC5jb21cIixcclxuICAgIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjcwMzkzMzcyNTY4NVwiLFxyXG4gICAgYXBwSWQ6IFwiMTo3MDM5MzM3MjU2ODU6d2ViOjJlZWJjZTViMWQ3YTE2ZWZiYTdlYmNcIlxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IEVudkNvbmZpZyA9IHtcclxuICAgIGVudjogXCJkZXZcIixcclxuICAgIHNjb3Jlc19jb2xsZWN0aW9uOiBcInNjb3Jlc1wiXHJcbn07IiwiZXhwb3J0IGNsYXNzIEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKHJvb3RDb250YWluZXJTZWxlY3Rvcikge1xyXG4gICAgICAgIHRoaXMucm9vdENvbnRhaW5lclNlbGVjdG9yID0gcm9vdENvbnRhaW5lclNlbGVjdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBFcnJvckNvZGUoaHR0cEVycm9yQ29kZSkge1xyXG4gICAgICAgIHRoaXMuaHR0cEVycm9yQ29kZSA9IGh0dHBFcnJvckNvZGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IEVycm9yQ29kZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwRXJyb3JDb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBVc2VyRXJyb3JNZXNzYWdlKG1zZykge1xyXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1zZztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgVXNlckVycm9yTWVzc2FnZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIE1vdW50KCkge1xyXG4gICAgICAgICQodGhpcy5yb290Q29udGFpbmVyU2VsZWN0b3IpLmh0bWwoYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPSdlcnJvci1jb250YWluZXIgY29udGFpbmVyLXNtIG10LTQnPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0ncm93IHB5LTQnPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2NvbC0xMiBkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlciBhbGlnbi1jb250ZW50LW1pZGRsZSc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2ZvbnQtbW9ub3NwYWNlIGZzLTEnPiR7dGhpcy5FcnJvckNvZGV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nY29sLTEyIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWNvbnRlbnQtbWlkZGxlIHBiLTMgcHgtMyB0ZXh0LWNlbnRlcic+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2ZzLTMnPiR7dGhpcy5Vc2VyRXJyb3JNZXNzYWdlfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGApO1xyXG4gICAgfVxyXG5cclxuICAgIFVuTW91bnQoKSB7XHJcbiAgICAgICAgJCh0aGlzLnJvb3RDb250YWluZXJTZWxlY3RvcikuaHRtbCgnJyk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBBcHBGaXJlYmFzZUNvbmZpZyB9IGZyb20gJy4vY29uZmlnL2NvbmZpZy1BUFBUQVJHRVQuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdvb2dsZUF1dGhIYW5kbGVyIHtcclxuICBjb25zdHJ1Y3RvcihvblNpZ25Jbiwgb25TaWduT3V0KSB7XHJcbiAgICB0aGlzLm9uU2lnbkluID0gb25TaWduSW47XHJcbiAgICB0aGlzLm9uU2lnbk91dCA9IG9uU2lnbk91dDtcclxuXHJcbiAgICAvLyBJbml0aWFsaXplIEZpcmViYXNlLCBjb25maWcgZGVmaW5lZCBlbHNld2hlcmVcclxuICAgIGZpcmViYXNlLmluaXRpYWxpemVBcHAoQXBwRmlyZWJhc2VDb25maWcpO1xyXG4gICAgXHJcbiAgICAvLyB1c2Ugb25seSBnb29nXHJcbiAgICB0aGlzLmdfcHJvdmlkZXIgPSBuZXcgZmlyZWJhc2UuYXV0aC5Hb29nbGVBdXRoUHJvdmlkZXIoKTtcclxuICAgIHRoaXMuZ19wcm92aWRlci5hZGRTY29wZSgnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC91c2VyaW5mby5wcm9maWxlJyk7XHJcbiAgICB0aGlzLmdfcHJvdmlkZXIuc2V0Q3VzdG9tUGFyYW1ldGVycyh7XHJcbiAgICAgICdsb2dpbl9oaW50JzogJ3VzZXJAZXhhbXBsZS5jb20nXHJcbiAgICB9KTsgXHJcblxyXG4gICAgLy8gc2V0IGEgaGFuZGxlciBmb3Igd2hlbiB0b2tlbnMgYXJlIHJlY2lldmVkXHJcbiAgICBmaXJlYmFzZS5hdXRoKCkub25BdXRoU3RhdGVDaGFuZ2VkKHVzZXI9PntcclxuICAgICAgICBpZiAodXNlcikge1xyXG4gICAgICAgICAgICB0aGlzLkZpcmVPblNpZ25JbkhhbmRsZXIodXNlcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIHRoaXMgY2FuIGZpcmUgd2hlbiB0aGVyZSBpcyBubyBsb2dnZWQgaW4gdXNlciBvbiBsb2FkXHJcbiAgICAgICAgICAgIHRoaXMuRmlyZU9uU2lnbk91dEhhbmRsZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIG1ldGhvZHNcclxuICBGaXJlT25TaWduSW5IYW5kbGVyKG9BdXRoVXNlcikge1xyXG4gICAgaWYgKHRoaXMub25TaWduSW4pIHtcclxuICAgICAgdGhpcy5vblNpZ25JbihvQXV0aFVzZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgRmlyZU9uU2lnbk91dEhhbmRsZXIoKSB7XHJcbiAgICBpZiAodGhpcy5vblNpZ25PdXQpIHtcclxuICAgICAgdGhpcy5vblNpZ25PdXQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIFNpZ25JblBvcHVwKCkge1xyXG4gICAgZmlyZWJhc2UuYXV0aCgpLnNpZ25JbldpdGhQb3B1cCh0aGlzLmdfcHJvdmlkZXIpO1xyXG4gIH1cclxuXHJcbiAgU2lnbkluUmVkaXJlY3QoKSB7XHJcbiAgICBmaXJlYmFzZS5hdXRoKCkuc2lnbkluV2l0aFJlZGlyZWN0KHRoaXMuZ19wcm92aWRlcik7XHJcbiAgfVxyXG5cclxuICBTaWduT3V0KCkge1xyXG4gICAgZmlyZWJhc2UuYXV0aCgpLnNpZ25PdXQoKTtcclxuICB9XHJcbn1cclxuXHJcbiIsImxldCBfID0gKGZ1bmN0aW9uKCkge1xyXG4gXHJcbiAgICBmdW5jdGlvbiBiYXNlUmFuZG9tKGxvd2VyLCB1cHBlcikge1xyXG4gICAgICAgIHJldHVybiBsb3dlciArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh1cHBlciAtIGxvd2VyICsgMSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNodWZmbGVTZWxmKGFycmF5LCBzaXplKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gLTEsXHJcbiAgICAgICAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcclxuICAgICAgICAgICAgbGFzdEluZGV4ID0gbGVuZ3RoIC0gMTtcclxuXHJcbiAgICAgICAgc2l6ZSA9IHNpemUgPT09IHVuZGVmaW5lZCA/IGxlbmd0aCA6IHNpemU7XHJcbiAgICAgICAgd2hpbGUgKCsraW5kZXggPCBzaXplKSB7XHJcbiAgICAgICAgICAgIHZhciByYW5kID0gYmFzZVJhbmRvbShpbmRleCwgbGFzdEluZGV4KSxcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gYXJyYXlbcmFuZF07XHJcblxyXG4gICAgICAgICAgICBhcnJheVtyYW5kXSA9IGFycmF5W2luZGV4XTtcclxuICAgICAgICAgICAgYXJyYXlbaW5kZXhdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFycmF5Lmxlbmd0aCA9IHNpemU7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNvcHlBcnJheShzb3VyY2UsIGFycmF5KSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gLTEsXHJcbiAgICAgICAgICAgIGxlbmd0aCA9IHNvdXJjZS5sZW5ndGg7XHJcbiAgXHJcbiAgICAgICAgYXJyYXkgfHwgKGFycmF5ID0gQXJyYXkobGVuZ3RoKSk7XHJcbiAgICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcclxuICAgICAgICAgIGFycmF5W2luZGV4XSA9IHNvdXJjZVtpbmRleF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnJheTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBiYXNlQ2xhbXAobnVtYmVyLCBsb3dlciwgdXBwZXIpIHtcclxuICAgICAgICBpZiAobnVtYmVyID09PSBudW1iZXIpIHtcclxuICAgICAgICAgIGlmICh1cHBlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIG51bWJlciA9IG51bWJlciA8PSB1cHBlciA/IG51bWJlciA6IHVwcGVyO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGxvd2VyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbnVtYmVyID0gbnVtYmVyID49IGxvd2VyID8gbnVtYmVyIDogbG93ZXI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudW1iZXI7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBmdW5jdGlvbiBhcnJheVNhbXBsZVNpemUoYXJyYXksIG4pIHtcclxuICAgICAgICByZXR1cm4gc2h1ZmZsZVNlbGYoY29weUFycmF5KGFycmF5KSwgYmFzZUNsYW1wKG4sIDAsIGFycmF5Lmxlbmd0aCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNhbXBsZVNpemUoY29sbGVjdGlvbiwgbikge1xyXG4gICAgICAgIHJldHVybiBhcnJheVNhbXBsZVNpemUoY29sbGVjdGlvbiwgbik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmFuZ2Uoc3RhcnQsIGVuZCkge1xyXG4gICAgICAgIGxldCBzID0gc3RhcnQgfHwgMDtcclxuICAgICAgICBsZXQgbnVtcyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG51bXMucHVzaChpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudW1zO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBsZXQgcHViID0ge307XHJcblxyXG4gICAgcHViLnJhbmdlID0gcmFuZ2U7XHJcbiAgICBwdWIuc2FtcGxlU2l6ZSA9IHNhbXBsZVNpemU7XHJcblxyXG4gICAgcmV0dXJuIHB1YjtcclxuXHJcbn0uY2FsbCh0aGlzKSk7XHJcbiAgXHJcbmV4cG9ydCBkZWZhdWx0IF87IiwiaW1wb3J0IHsgR29vZ2xlQXV0aEhhbmRsZXIgfSBmcm9tICcuL2dvb2dsZWF1dGhoYW5kbGVyLmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubG9naW5VSSA9ICQoXCIjbG9naW4tdWktY29udGFpbmVyXCIpO1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy8gYmluZCBsb2cgaW5cclxuICAgICAgICAkKFwiI2xvZ2luLXByb21wdFwiKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7ICAgICBcclxuICAgICAgICAgICAgdGhhdC5hdXRoLlNpZ25JblJlZGlyZWN0KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIjbG9naW4tcHJvZmlsZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7ICAgICBcclxuICAgICAgICAgICAgdGhhdC5hdXRoLlNpZ25PdXQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fb25TaWduSW4gPSBmdW5jdGlvbihvQXV0aFVzZXIpIHtcclxuICAgICAgICAgICAgdGhhdC5sb2dpblVJXHJcbiAgICAgICAgICAgICAgICAuZmluZChcIiNsb2dpbi1wcm9tcHRcIilcclxuICAgICAgICAgICAgICAgIC50b2dnbGVDbGFzcygnZC1ub25lJylcclxuICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoXCIjbG9naW4tcHJvZmlsZVwiKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJ2ltZycpXHJcbiAgICAgICAgICAgICAgICAudG9nZ2xlQ2xhc3MoJ2ZhZGVJbicpXHJcbiAgICAgICAgICAgICAgICAucHJvcCgnc3JjJywgb0F1dGhVc2VyLnBob3RvVVJMKVxyXG4gICAgICAgICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAgICAgICAudG9nZ2xlQ2xhc3MoJ2Qtbm9uZScpXHJcbiAgICAgICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdkYXRhLXNpZ25lZC1pbicsICd0cnVlJyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5fb25TaWduT3V0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LmxvZ2luVUkuYXR0cignZGF0YS1zaWduZWQtaW4nKSA9PSAnZmFsc2UnKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHRoYXQubG9naW5VSVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoXCIjbG9naW4tcHJvZmlsZVwiKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJ2ltZycpXHJcbiAgICAgICAgICAgICAgICAucHJvcCgnc3JjJywgJycpXHJcbiAgICAgICAgICAgICAgICAudG9nZ2xlQ2xhc3MoJ2ZhZGVJbicpXHJcbiAgICAgICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgICAgIC50b2dnbGVDbGFzcygnZC1ub25lJylcclxuICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoXCIjbG9naW4tcHJvbXB0XCIpXHJcbiAgICAgICAgICAgICAgICAudG9nZ2xlQ2xhc3MoJ2Qtbm9uZScpXHJcbiAgICAgICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdkYXRhLXNpZ25lZC1pbicsICdmYWxzZScpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuYXV0aCA9IG5ldyBHb29nbGVBdXRoSGFuZGxlcih0aGlzLl9vblNpZ25JbiwgdGhpcy5fb25TaWduT3V0KTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEVudkNvbmZpZyB9IGZyb20gJy4vY29uZmlnL2NvbmZpZy1BUFBUQVJHRVQuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0YXREYiB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0U2NvcmVzKHN0YXJ0QXQsIG4sIG9uU3VjY2Vzcywgb25FcnJvcikge1xyXG4gICAgICAgIC8vIGZldGNoIDEgbW9yZSB0aGFuIG4sIHRvIHRlc3QgZm9yIHBhZ2luZ1xyXG4gICAgICAgIGxldCBrID0gbiArIDE7XHJcbiAgICAgICAgdGhpcy5kYi5jb2xsZWN0aW9uKEVudkNvbmZpZy5zY29yZXNfY29sbGVjdGlvbikub3JkZXJCeShcInRpbWVcIikuc3RhcnRBdChzdGFydEF0KS5saW1pdChrKS5nZXQoKS50aGVuKFxyXG4gICAgICAgICAgICAocXVlcnlTbmFwc2hvdCkgPT4geyBcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHRzID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgcXVlcnlTbmFwc2hvdC5mb3JFYWNoKChkb2MpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBzdGFydEF0O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gZG9jLmRhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmRvY2lkID0gZG9jLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGhhc1ByZXYgPSBzdGFydEF0ICE9IDA7XHJcbiAgICAgICAgICAgICAgICBsZXQgaGFzTmV4dCA9IHJlc3VsdHMubGVuZ3RoID4gbjtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgbGVuZ3RoLCBleGNlZWRzIHdoYXQgd2Ugd2FudGVkIHRvIHF1ZXJ5LCB0aGVyZSdzIGEgbmV4dCBwYWdlLCBzbyBwb3AgdGhlIG9uZSBleHRyYSBlbnRyeVxyXG4gICAgICAgICAgICAgICAgaWYgKGhhc05leHQpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wb3AoKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBwYWdlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHJlc3VsdHMsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRBdDogc3RhcnRBdCxcclxuICAgICAgICAgICAgICAgICAgICBoYXNQcmV2OiBoYXNQcmV2LFxyXG4gICAgICAgICAgICAgICAgICAgIHByZXZTdGFydEF0OiBoYXNQcmV2ID8gc3RhcnRBdCAtIG4gOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgaGFzTmV4dDogaGFzTmV4dCxcclxuICAgICAgICAgICAgICAgICAgICBuZXh0U3RhcnRBdDogaGFzTmV4dCA/IHN0YXJ0QXQgKyBuIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIG9uU3VjY2VzcyhwYWdlKTsgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIChlcnJvcikgPT4geyBvbkVycm9yKGVycm9yKTsgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgQWRkU2NvcmUoc2NvcmVPYmplY3QpIHtcclxuICAgICAgICB0aGlzLmRiLmNvbGxlY3Rpb24oRW52Q29uZmlnLnNjb3Jlc19jb2xsZWN0aW9uKS5hZGQoc2NvcmVPYmplY3QpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRvY3VtZW50IHN1Y2Nlc3NmdWxseSB3cml0dGVuIVwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBVc2VyVXRpbCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgdGhpcy51c2VyID0gZmlyZWJhc2UuYXV0aCgpLmN1cnJlbnRVc2VyO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgZ2V0IElzTG9nZ2VkSW4oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnVzZXIgIT0gbnVsbDtcclxuICAgIH1cclxuICBcclxuICAgIGdldCBVc2VyKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy51c2VyO1xyXG4gICAgfVxyXG4gIH0iLCJpbXBvcnQgeyBBcHBVdGlsIH0gZnJvbSAnLi4vY29yZWFwcC9hcHB1dGlsLmpzJztcclxuaW1wb3J0IHsgTUlORVNXRUVQRVJfR1JJRF9TSVpFUyB9IGZyb20gJy4vbWluZXN3ZWVwZXJjb25zdGFudHMuanMnO1xyXG5pbXBvcnQgeyBNaW5lc3dlZXBlckdhbWVTdGF0ZSB9IGZyb20gJy4vbWluZXN3ZWVwZXJnYW1lc3RhdGUuanMnO1xyXG5pbXBvcnQgeyBNaW5lc3dlZXBlckdhbWVHcmlkIH0gZnJvbSAnLi9taW5lc3dlZXBlcmdyaWQuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1pbmVzd2VlcGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHJvb3RDb250YWluZXJTZWxlY3Rvcikge1xyXG4gICAgICAgIHRoaXMub3B0aW9uc1NlbGVjdG9yID0gJyNnYW1lLW9wdGlvbnMnO1xyXG4gICAgICAgIHRoaXMubmV3R2FtZVNlbGVjdG9yID0gJyNnZW5lcmF0ZS1nYW1lJztcclxuICAgICAgICB0aGlzLndpblNlbGVjdG9yID0gJyN3aW4tZ2FtZSc7XHJcbiAgICAgICAgdGhpcy5sb3NlU2VsZWN0b3IgPSAnI2xvc2UtZ2FtZSc7XHJcbiAgICAgICAgdGhpcy5ncmlkU2VsZWN0b3IgPSAnI2dyaWQnO1xyXG4gICAgICAgIHRoaXMucm9vdENvbnRhaW5lclNlbGVjdG9yID0gcm9vdENvbnRhaW5lclNlbGVjdG9yO1xyXG4gICAgICAgIHRoaXMudXRpbCA9IG5ldyBBcHBVdGlsKCk7XHJcblxyXG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9J2FwcC1jb250YWluZXIgY29udGFpbmVyLXNtJz5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2NvbnRyb2wtY29udGFpbmVyIHJvdyc+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nY29sLTEyIGNvbC1zbS00IHAtMSBwLXNtLTMgZy1zbS0yJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBpZD0nZ2FtZS1vcHRpb25zJyBjbGFzcz0nZm9ybS1zZWxlY3QnPjwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2NvbC0xMiBjb2wtc20tOCBwLTEgcC1zbS0zIGctc20tMic+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgaWQ9J2dlbmVyYXRlLWdhbWUnIHZhbHVlPSduZXcgZ2FtZScgY2xhc3M9J2J0biBidG4tb3V0bGluZS1wcmltYXJ5Jz48L2lucHV0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdidG4tZ3JvdXAnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiBpZD0nd2luLWdhbWUnIHZhbHVlPSdhdXRvIHdpbicgY2xhc3M9J2J0biBidG4tb3V0bGluZS1zZWNvbmRhcnknPjwvaW5wdXQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGlkPSdsb3NlLWdhbWUnIHZhbHVlPSdhdXRvIGxvc2UnIGNsYXNzPSdidG4gYnRuLW91dGxpbmUtc2Vjb25kYXJ5Jz48L2lucHV0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nZ3JpZC1jb250YWluZXIgcm93Jz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPSdncmlkJyBjbGFzcz0nZ3JpZCBjb2wtMTIgdXNlci1zZWxlY3Qtbm9uZSBweS00IHB4LTAnPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGA7XHJcbiAgICB9XHJcbiAgICAgICAgXHJcbiAgICAvLyBtZXRob2RzXHJcbiAgICBNb3VudENvbnRyb2xzKCkge1xyXG4gICAgICAgICQodGhpcy5yb290Q29udGFpbmVyU2VsZWN0b3IpLmh0bWwodGhpcy50ZW1wbGF0ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0ICRzZWxlY3QgPSAkKHRoaXMub3B0aW9uc1NlbGVjdG9yKTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gTUlORVNXRUVQRVJfR1JJRF9TSVpFUylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgICRzZWxlY3QuYXBwZW5kKCQoJzxvcHRpb24+JywgeyBcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBrZXksXHJcbiAgICAgICAgICAgICAgICB0ZXh0IDogYCR7a2V5fSAoJHtNSU5FU1dFRVBFUl9HUklEX1NJWkVTW2tleV0ud2lkdGh9eCR7TUlORVNXRUVQRVJfR1JJRF9TSVpFU1trZXldLmhlaWdodH0sICR7TUlORVNXRUVQRVJfR1JJRF9TSVpFU1trZXldLm1pbmVzfSBtaW5lcylgIFxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBiaW5kIGdhbWUgZ2VuZXJhdGlvbiBoYW5kbGVyc1xyXG4gICAgICAgIHRoaXMuQmluZEdlbmVyYXRlTmV3R2FtZUhhbmRsZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBVbk1vdW50Q29udHJvbHMoKSB7XHJcbiAgICAgICAgdGhpcy5VbkJpbmRHZW5lcmF0ZU5ld0dhbWVIYW5kbGVyKCk7XHJcbiAgICAgICAgJCh0aGlzLnJvb3RDb250YWluZXJTZWxlY3RvcikuaHRtbCgnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgR2VuZXJhdGVOZXdHYW1lKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1pbmVzd2VlcGVyVWkpIHtcclxuICAgICAgICAgICAgdGhpcy5taW5lc3dlZXBlclVpLlVuTW91bnQoKTsgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCAkc2VsZWN0ID0gJCh0aGlzLm9wdGlvbnNTZWxlY3Rvcik7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gJHNlbGVjdC5maW5kKFwib3B0aW9uOnNlbGVjdGVkXCIpLnZhbCgpO1xyXG4gICAgICAgIGxldCBzaXplID0gTUlORVNXRUVQRVJfR1JJRF9TSVpFU1tzZWxlY3RlZF07XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy51dGlsLkxvZyhgZ2VuZXJhdGUgbmV3ICR7c2l6ZS53aWR0aH14JHtzaXplLmhlaWdodH0gZ2FtZWApOyAgXHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBuZXcgZ2FtZSBzdGF0ZVxyXG4gICAgICAgIGxldCBnYW1lU3RhdGUgPSBuZXcgTWluZXN3ZWVwZXJHYW1lU3RhdGUoc2l6ZSwgdGhpcy51dGlsKTtcclxuXHJcbiAgICAgICAgLy8gdW5iaW5kIG9sZCBoYW5kbGVyLCBiaW5kIG5ld1xyXG4gICAgICAgIHRoaXMuVW5CaW5kR2FtZVN0YXRlSGFuZGxlcnMoKTtcclxuICAgICAgICB0aGlzLkJpbmRHYW1lU3RhdGVIYW5kbGVycyhnYW1lU3RhdGUpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgbmV3IHVpXHJcbiAgICAgICAgdGhpcy5taW5lc3dlZXBlclVpID0gbmV3IE1pbmVzd2VlcGVyR2FtZUdyaWQoJCh0aGlzLmdyaWRTZWxlY3RvciksIGdhbWVTdGF0ZSwgdGhpcy51dGlsKTtcclxuICAgICAgICB0aGlzLm1pbmVzd2VlcGVyVWkuTW91bnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBCaW5kR2VuZXJhdGVOZXdHYW1lSGFuZGxlcigpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgJCh0aGlzLm5ld0dhbWVTZWxlY3Rvcikub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkgeyB0aGF0LkdlbmVyYXRlTmV3R2FtZSgpOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBVbkJpbmRHZW5lcmF0ZU5ld0dhbWVIYW5kbGVyKCkge1xyXG4gICAgICAgICQodGhpcy5uZXdHYW1lU2VsZWN0b3IpLm9mZignY2xpY2snKTtcclxuICAgIH1cclxuXHJcbiAgICBCaW5kR2FtZVN0YXRlSGFuZGxlcnMoZ2FtZVN0YXRlKSB7XHJcbiAgICAgICAgJCh0aGlzLndpblNlbGVjdG9yKS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkgeyBnYW1lU3RhdGUuVHJpZ2dlckF1dG9XaW4oKTsgfSk7XHJcbiAgICAgICAgJCh0aGlzLmxvc2VTZWxlY3Rvcikub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHsgZ2FtZVN0YXRlLlRyaWdnZXJBdXRvTG9zZSgpOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBVbkJpbmRHYW1lU3RhdGVIYW5kbGVycygpIHtcclxuICAgICAgICAkKHRoaXMud2luU2VsZWN0b3IpLm9mZignY2xpY2snKTtcclxuICAgICAgICAkKHRoaXMubG9zZVNlbGVjdG9yKS5vZmYoJ2NsaWNrJyk7XHJcbiAgICB9XHJcblxyXG4gICAgTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy51dGlsLkxvZyhcIm1vdW50IG1pbmVzd2VlcGVyYXBwXCIpO1xyXG4gICAgICAgIHRoaXMuTW91bnRDb250cm9scygpO1xyXG4gICAgfVxyXG5cclxuICAgIFVuTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy51dGlsLkxvZyhcInVubW91bnQgbWluZXN3ZWVwZXJhcHBcIik7XHJcblxyXG4gICAgICAgIC8vIHVubW91bnQgZ2FtZVxyXG4gICAgICAgIHRoaXMuVW5CaW5kR2FtZVN0YXRlSGFuZGxlcnMoKTtcclxuXHJcbiAgICAgICAgLy8gbWlnaHQgdW5tb3VudCBiZWZvcmUgYSBnYW1lIGhhcyBiZWVuIGNyZWF0ZWRcclxuICAgICAgICBpZiAodGhpcy5taW5lc3dlZXBlclVpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWluZXN3ZWVwZXJVaS5Vbk1vdW50KCk7ICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB1bm1vdW50IGNvbnRyb2xzXHJcbiAgICAgICAgdGhpcy5Vbk1vdW50Q29udHJvbHMoKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjb25zdCBNSU5FU1dFRVBFUl9HUklEX1NJWkVTID0ge1xyXG4gICAgYmVnaW5uZXIgOiB7IHdpZHRoOiA5LCBoZWlnaHQ6IDksIG1pbmVzOiAxMCwgbGFiZWw6IFwiYmVnaW5uZXJcIn0sXHJcbiAgICBpbnRlcm1lZGlhdGU6IHsgd2lkdGg6IDE2LCBoZWlnaHQ6IDE2LCBtaW5lczogNDAsIGxhYmVsOiBcImludGVybWVkaWF0ZVwifSxcclxuICAgIGV4cGVydDogeyB3aWR0aDogMTYsIGhlaWdodDogMjYsIG1pbmVzOiA4NiwgbGFiZWw6IFwiZXhwZXJ0XCJ9LFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IE1JTkVTV0VFUEVSX0dBTUVfQ09NUExFVElPTl9TVEFURVMgPSB7XHJcbiAgICBzdGFydGVkOiAwLFxyXG4gICAgY29tcGxldGVkOiAxLFxyXG4gICAgZmFpbGVkOiAyXHJcbn07XHJcbiIsImV4cG9ydCBjbGFzcyBNaW5lc3dlZXBlckdhbWVDZWxsIHtcclxuICAgIGNvbnN0cnVjdG9yKGksIGosIGdhbWUpIHtcclxuICAgICAgICB0aGlzLl9pZCA9IGAke2kgKyBcIl9cIiArIGp9YDtcclxuICAgICAgICB0aGlzLl9hZGphY2VudE1pbmVDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5faXNNaW5lID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5faXNMb3NpbmdNaW5lID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5faXNSZXZlYWxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2lzTWFya2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZ2FtZSA9IGdhbWU7XHJcbiAgICAgICAgdGhpcy5pID0gaTtcclxuICAgICAgICB0aGlzLmogPSBqO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGdldHRlcnNcclxuICAgIGdldCBJZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9XHJcbiAgICBnZXQgQWRqYWNlbnRNaW5lQ291bnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkamFjZW50TWluZUNvdW50O1xyXG4gICAgfVxyXG4gICAgZ2V0IElzTWluZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNNaW5lO1xyXG4gICAgfVxyXG4gICAgZ2V0IElzTG9zaW5nTWluZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNMb3NpbmdNaW5lO1xyXG4gICAgfVxyXG4gICAgZ2V0IElzUmV2ZWFsZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzUmV2ZWFsZWQ7XHJcbiAgICB9IFxyXG4gICAgZ2V0IElzTWFya2VkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc01hcmtlZDtcclxuICAgIH0gXHJcbiAgICBnZXQgcm93SW5kZXgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaTtcclxuICAgIH1cclxuICAgIGdldCBjb2xJbmRleCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5qO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBtZXRob2RzXHJcbiAgICBJbmNyZW1lbnRBZGphY2VudE1pbmVDb3VudCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fZ2FtZS5HYW1lSXNQbGF5YWJsZSlcclxuICAgICAgICAgICAgdGhpcy5fYWRqYWNlbnRNaW5lQ291bnQrKztcclxuICAgIH1cclxuICAgIFNldElzTWluZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fZ2FtZS5HYW1lSXNQbGF5YWJsZSlcclxuICAgICAgICAgICAgdGhpcy5faXNNaW5lID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIFNldElzTG9zaW5nTWluZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fZ2FtZS5HYW1lSXNQbGF5YWJsZSlcclxuICAgICAgICAgICAgdGhpcy5faXNMb3NpbmdNaW5lID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIFNldElzUmV2ZWFsZWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2dhbWUuR2FtZUlzUGxheWFibGUpIHtcclxuICAgICAgICAgICAgdGhpcy5faXNSZXZlYWxlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAvLyBubyBuZWVkIGZvciBpdCB0byBiZSBtYXJrZWQgYW55IG1vcmVcclxuICAgICAgICAgICAgdGhpcy5faXNNYXJrZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9ICBcclxuICAgIFNldElzTWFya2VkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9nYW1lLkdhbWVJc1BsYXlhYmxlKSBcclxuICAgICAgICAgICAgdGhpcy5faXNNYXJrZWQgPSB0cnVlO1xyXG4gICAgfSBcclxufSIsImltcG9ydCB7IE1pbmVzd2VlcGVyR2FtZUNlbGwgfSBmcm9tIFwiLi9taW5lc3dlZXBlcmdhbWVjZWxsLmpzXCI7XHJcbmltcG9ydCB7IE1JTkVTV0VFUEVSX0dBTUVfQ09NUExFVElPTl9TVEFURVMgfSBmcm9tIFwiLi9taW5lc3dlZXBlcmNvbnN0YW50cy5qc1wiO1xyXG5pbXBvcnQgeyBkZWZhdWx0IGFzIF8gfSBmcm9tICcuLi9jb3JlYXBwL2xvZGFzaHBvbHlmaWxsLmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBNaW5lc3dlZXBlckdhbWVTdGF0ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihzaXplLCBsb2d1dGlsKSB7XHJcbiAgICAgICAgLy8gc3RhdGVcclxuICAgICAgICB0aGlzLl9sb29rdXAgPSB7fTtcclxuICAgICAgICB0aGlzLl9pZCA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApO1xyXG4gICAgICAgIHRoaXMuX2NlbGxzID0gW107IFxyXG4gICAgICAgIHRoaXMuX21pbmVDZWxscyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3NpemUgPSBzaXplOyBcclxuICAgICAgICB0aGlzLl9nYW1lQ29tcGxldGlvblN0YXRlID0gTUlORVNXRUVQRVJfR0FNRV9DT01QTEVUSU9OX1NUQVRFUy5zdGFydGVkO1xyXG4gICAgICAgIHRoaXMuX2dhbWVBdXRvV29uID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuX3V0aWwgPSBsb2d1dGlsO1xyXG5cclxuICAgICAgICAvLyB0cmFjayBjbGVhcmVkIGNlbGxzIHZzIHRvdGFsIGNlbGxzIG5lZWRlZCB0byB3aW5cclxuICAgICAgICB0aGlzLl90b3RhbENlbGxDb3VudFRvV2luID0gc2l6ZS53aWR0aCpzaXplLmhlaWdodCAtIHNpemUubWluZXM7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudENlbGxDb3VudCA9IDA7XHJcblxyXG4gICAgICAgIC8vIHRyYWNraW5nIHN0YXJ0IHRpbWVcclxuICAgICAgICB0aGlzLnN0YXJ0dGltZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLnN0b3B0aW1lID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuZWxhcHNlZFRpbWUgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIC8vIGZvciBkaWFibGluZyB0aGUgZ2FtZVxyXG4gICAgICAgIHRoaXMuX2dhbWVEaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBjYWxsYmFjayBmdW5jc1xyXG4gICAgICAgIHRoaXMuX29uQ2VsbFN0YXRlQ2hhbmdlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuX29uR2FtZUNvbXBsZXRpb25TdGF0ZUNoYW5nZSA9IHVuZGVmaW5lZDtcclxuIFxyXG4gICAgICAgIC8vIGluaXQsIHN0YXJ0aW5nIHdpdGggY2VsbHMgd2l0aCBnZW5lcmljIHZhbHVlc1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9zaXplLmhlaWdodDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCByb3cgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCB0aGlzLl9zaXplLndpZHRoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdDZWxsID0gbmV3IE1pbmVzd2VlcGVyR2FtZUNlbGwoaSwgaiwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3Q2VsbElkID0gbmV3Q2VsbC5JZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvb2t1cFtuZXdDZWxsSWRdID0gbmV3Q2VsbDtcclxuICAgICAgICAgICAgICAgIHJvdy5wdXNoKG5ld0NlbGwpOyAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9jZWxscy5wdXNoKHJvdyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBzcHJpbmtsZSBtaW5lc1xyXG4gICAgICAgIGxldCBtaW5lcyA9IF8uc2FtcGxlU2l6ZShfLnJhbmdlKDAsIHRoaXMuX3NpemUud2lkdGgqdGhpcy5fc2l6ZS5oZWlnaHQgLSAxKSwgdGhpcy5fc2l6ZS5taW5lcyk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgbWluZXMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgbGV0IHJvd0luZGV4ID0gTWF0aC5mbG9vcihtaW5lc1trXS90aGlzLl9zaXplLndpZHRoKTtcclxuICAgICAgICAgICAgbGV0IGNvbEluZGV4ID0gbWluZXNba10gJSB0aGlzLl9zaXplLndpZHRoO1xyXG4gICAgICAgICAgICBsZXQgbWluZUNlbGwgPSB0aGlzLl9sb29rdXBbYCR7cm93SW5kZXggKyBcIl9cIiArIGNvbEluZGV4fWBdO1xyXG5cclxuICAgICAgICAgICAgbWluZUNlbGwuU2V0SXNNaW5lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX21pbmVDZWxscy5wdXNoKG1pbmVDZWxsKTsgICAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSBhZGphY2VudCBtaW5lIGNvdW50IGJ5IGl0ZXJhdGluZyBhbGwgbWluZXNcclxuICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IG1pbmVzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIGxldCByb3dJbmRleCA9IE1hdGguZmxvb3IobWluZXNba10vdGhpcy5fc2l6ZS53aWR0aCk7XHJcbiAgICAgICAgICAgIGxldCBjb2xJbmRleCA9IG1pbmVzW2tdICUgdGhpcy5fc2l6ZS53aWR0aDtcclxuXHJcbiAgICAgICAgICAgIGxldCBvdGhlckNvb3JkcyA9IHRoaXMuR2VuZXJhdGVBZGphY2VudENlbGxzKHJvd0luZGV4LCBjb2xJbmRleCk7XHJcblxyXG4gICAgICAgICAgICAvLyBmb3JlYWNoIGFkamFjZW50LCBpZiBpdCBpc250IGFsc28gYSBtaW5lLCBpbmNyZW1lbnQgaXRzIGFkamFjZW50IG1pbmUgY291bnRcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBvdGhlckNvb3Jkcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFkamFjZW50Q2VsbCA9IHRoaXMuX2xvb2t1cFtgJHtvdGhlckNvb3Jkc1tqXS55ICsgXCJfXCIgKyBvdGhlckNvb3Jkc1tqXS54fWBdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghYWRqYWNlbnRDZWxsLklzTWluZSlcclxuICAgICAgICAgICAgICAgICAgICBhZGphY2VudENlbGwuSW5jcmVtZW50QWRqYWNlbnRNaW5lQ291bnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdXRpbC5Mb2coYG5ldyBnYW1lIGdlbmVyYXRlZGApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGdldHRlcnNcclxuICAgIGdldCBHYW1lSXNQbGF5YWJsZSgpIHtcclxuICAgICAgICByZXR1cm4gIXRoaXMuX2dhbWVEaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgR2FtZUlzV29uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9nYW1lQ29tcGxldGlvblN0YXRlID09IE1JTkVTV0VFUEVSX0dBTUVfQ09NUExFVElPTl9TVEFURVMuY29tcGxldGVkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBXb25CeUF1dG9XaW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dhbWVBdXRvV29uID09PSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBTaXplKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBJZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IEVsYXBzZWRUaW1lKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVsYXBzZWRUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBHYW1lQ29tcGxldGlvblN0YXRlKGdhbWVDb21wbGV0aW9uU3RhdGUpIHtcclxuICAgICAgICB0aGlzLl9nYW1lQ29tcGxldGlvblN0YXRlID0gZ2FtZUNvbXBsZXRpb25TdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgV29uQnlBdXRvV2luKHdvbkJ5QXV0b1dpbikge1xyXG4gICAgICAgIHRoaXMuX2dhbWVBdXRvV29uID0gd29uQnlBdXRvV2luO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBPbkNlbGxTdGF0ZUNoYW5nZShmbikge1xyXG4gICAgICAgIHRoaXMuX29uQ2VsbFN0YXRlQ2hhbmdlID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IEdhbWVEaXNhYmxlZChkaXNhYmxlZCkge1xyXG4gICAgICAgIHRoaXMuX2dhbWVEaXNhYmxlZCA9IGRpc2FibGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBPbkdhbWVDb21wbGV0aW9uU3RhdGVDaGFuZ2UoZm4pIHtcclxuICAgICAgICB0aGlzLl9vbkdhbWVDb21wbGV0aW9uU3RhdGVDaGFuZ2UgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICBHZW5lcmF0ZUFkamFjZW50Q2VsbHMocm93SW5kZXgsIGNvbEluZGV4KSB7XHJcbiAgICAgICAgLy8gZ2VuZXJhdGUgOCBhZGphY2VudCBjby1vcmRzLCBjbGFtcGVkIHRvIGluLWJvdW5kc1xyXG4gICAgICAgIGxldCBvdGhlckNvb3JkcyA9IFtdO1xyXG5cclxuICAgICAgICBpZiAocm93SW5kZXggLSAxID49IDApIHtcclxuICAgICAgICAgICAgaWYgKGNvbEluZGV4IC0gMSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBvdGhlckNvb3Jkcy5wdXNoKHt4OiBjb2xJbmRleC0xLCB5OnJvd0luZGV4LTF9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb3RoZXJDb29yZHMucHVzaCh7eDogY29sSW5kZXgsIHk6cm93SW5kZXgtMX0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbEluZGV4ICsgMSA8IHRoaXMuX3NpemUud2lkdGgpXHJcbiAgICAgICAgICAgICAgICBvdGhlckNvb3Jkcy5wdXNoKHt4OiBjb2xJbmRleCsxLCB5OnJvd0luZGV4LTF9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGNvbEluZGV4IC0gMSA+PSAwKSBcclxuICAgICAgICAgICAgb3RoZXJDb29yZHMucHVzaCh7eDogY29sSW5kZXgtMSwgeTpyb3dJbmRleH0pO1xyXG5cclxuICAgICAgICBpZiAoY29sSW5kZXggKyAxIDwgdGhpcy5fc2l6ZS53aWR0aClcclxuICAgICAgICAgICAgb3RoZXJDb29yZHMucHVzaCh7eDogY29sSW5kZXgrMSwgeTpyb3dJbmRleH0pO1xyXG5cclxuICAgICAgICBpZiAocm93SW5kZXggKyAxIDwgdGhpcy5fc2l6ZS5oZWlnaHQpIHtcclxuICAgICAgICAgICAgaWYgKGNvbEluZGV4IC0gMSA+PSAwKSBcclxuICAgICAgICAgICAgICAgIG90aGVyQ29vcmRzLnB1c2goe3g6IGNvbEluZGV4LTEsIHk6cm93SW5kZXgrMX0pO1xyXG5cclxuICAgICAgICAgICAgb3RoZXJDb29yZHMucHVzaCh7eDogY29sSW5kZXgsIHk6cm93SW5kZXgrMX0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbEluZGV4ICsgMSA8IHRoaXMuX3NpemUud2lkdGgpXHJcbiAgICAgICAgICAgICAgICBvdGhlckNvb3Jkcy5wdXNoKHt4OiBjb2xJbmRleCsxLCB5OnJvd0luZGV4KzF9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvdGhlckNvb3JkcztcclxuICAgIH1cclxuXHJcbiAgICBDZWxsQnlJZChjZWxsSWQpIHtcclxuICAgICAgICBsZXQgY2VsbCA9IHRoaXMuX2xvb2t1cFtjZWxsSWRdO1xyXG5cclxuICAgICAgICBpZiAoY2VsbCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB0aHJvdyBgY2VsbCB3aXRoIGlkICR7Y2VsbElkfSBjb3VsZCBub3QgYmUgZm91bmRgO1xyXG5cclxuICAgICAgICByZXR1cm4gY2VsbDtcclxuICAgIH1cclxuXHJcbiAgICBSZXZlYWxBbGxNaW5lcyAoKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9taW5lQ2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9taW5lQ2VsbHNbaV0uSXNSZXZlYWxlZClcclxuICAgICAgICAgICAgICAgIHRoaXMuX21pbmVDZWxsc1tpXS5TZXRJc1JldmVhbGVkKCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LkZpcmVDZWxsU3RhdGVDaGFuZ2UodGhpcy5fbWluZUNlbGxzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQXR0ZW1wdEF1dG9GaWxsKGNlbGwpIHtcclxuICAgICAgICBsZXQgYXV0b0ZpbGxzID0gdGhpcy5HZXRBZGphY2VudE5vbk1pbmVOb25SZXZlYWxlZENlbGxzKGNlbGwpO1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGF1dG9GaWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGF0LlNlbGVjdENlbGwoYXV0b0ZpbGxzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgR2V0QWRqYWNlbnROb25NaW5lTm9uUmV2ZWFsZWRDZWxscyhjZWxsKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGxldCBhZGpDZWxsSW5kaWNlcyA9IHRoaXMuR2VuZXJhdGVBZGphY2VudENlbGxzKGNlbGwucm93SW5kZXgsIGNlbGwuY29sSW5kZXgpO1xyXG4gICAgICAgIGxldCBhZGpDZWxscyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYWRqQ2VsbEluZGljZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGMgPSBhZGpDZWxsSW5kaWNlc1tpXTtcclxuICAgICAgICAgICAgbGV0IGFkamFjZW50Q2VsbCA9IHRoYXQuQ2VsbEJ5SWQoYCR7Yy55ICsgXCJfXCIgKyBjLnh9YCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWFkamFjZW50Q2VsbC5Jc01pbmUgJiYgIWFkamFjZW50Q2VsbC5Jc1JldmVhbGVkKVxyXG4gICAgICAgICAgICAgICAgYWRqQ2VsbHMucHVzaChhZGphY2VudENlbGwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFkakNlbGxzO1xyXG4gICAgfVxyXG5cclxuICAgIEZpcmVDZWxsU3RhdGVDaGFuZ2UgKGNoYW5nZWRDZWxsKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX29uQ2VsbFN0YXRlQ2hhbmdlKVxyXG4gICAgICAgICAgICB0aGlzLl9vbkNlbGxTdGF0ZUNoYW5nZShjaGFuZ2VkQ2VsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgRmlyZUdhbWVDb21wbGV0aW9uU3RhdGVDaGFuZ2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX29uR2FtZUNvbXBsZXRpb25TdGF0ZUNoYW5nZSlcclxuICAgICAgICAgICAgdGhpcy5fb25HYW1lQ29tcGxldGlvblN0YXRlQ2hhbmdlKHRoaXMuX2dhbWVDb21wbGV0aW9uU3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIE1hcmtDZWxsKGNlbGwpIHtcclxuICAgICAgICB0aGlzLl91dGlsLkxvZyhgbWFyayBjZWxsIGlkICR7Y2VsbC5JZH1gKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLkdhbWVJc1BsYXlhYmxlKSB7XHJcbiAgICAgICAgICAgIC8vIGRvbid0IGRvIGFueXRoaW5nXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghY2VsbC5Jc1JldmVhbGVkKSB7XHJcblxyXG4gICAgICAgICAgICBjZWxsLlNldElzTWFya2VkKCk7XHJcblxyXG4gICAgICAgICAgICAvLyB0cmlnZ2VyIGl0IHRvIHJlLXJlbmRlclxyXG4gICAgICAgICAgICB0aGlzLkZpcmVDZWxsU3RhdGVDaGFuZ2UoY2VsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIE1hcmtDZWxsYnlJZChjZWxsSWQpIHtcclxuICAgICAgICBsZXQgY2VsbCA9IHRoaXMuQ2VsbEJ5SWQoY2VsbElkKTsgICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMuTWFya0NlbGwoY2VsbCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFNlbGVjdENlbGwoY2VsbCkge1xyXG4gICAgICAgIHRoaXMuX3V0aWwuTG9nKGBzZWxlY3QgY2VsbCBpZCAke2NlbGwuSWR9YCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0dGltZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIC8vIHJlY29yZCBtaWxsaXMgc3RhcnQgdGltZVxyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0dGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuR2FtZUlzUGxheWFibGUpIHtcclxuICAgICAgICAgICAgLy8gZG9uJ3QgZG8gYW55dGhpbmdcclxuICAgICAgICAgICAgdGhpcy5fdXRpbC5Mb2coYGdhbWUgaGFzIGFscmVhZHkgYmVlbiAke3RoaXMuX2dhbWVDb21wbGV0aW9uU3RhdGUgPT0gTUlORVNXRUVQRVJfR0FNRV9DT01QTEVUSU9OX1NUQVRFUy5jb21wbGV0ZWQgPyBcIndvbiFcIiA6IFwibG9zdCFcIn1gKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFjZWxsLklzUmV2ZWFsZWQpIHtcclxuICAgICAgICAgICAgLy8gcmV2ZWFsIHRoaXMgY2VsbFxyXG4gICAgICAgICAgICBjZWxsLlNldElzUmV2ZWFsZWQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRyaWdnZXIgaXQgdG8gcmUtcmVuZGVyXHJcbiAgICAgICAgICAgIHRoaXMuRmlyZUNlbGxTdGF0ZUNoYW5nZShjZWxsKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjZWxsLklzTWluZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gb2ggb2hoLCBsb3N0LCBzbyBzdG9wIHRoZSBjbG9ja1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wdGltZSA9IERhdGUubm93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gbWFyayB0aGlzIG1pbmUgYXMgdGhlIG9uZSBoaXRcclxuICAgICAgICAgICAgICAgIGNlbGwuU2V0SXNMb3NpbmdNaW5lKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkdhbWVDb21wbGV0aW9uU3RhdGUgPSBNSU5FU1dFRVBFUl9HQU1FX0NPTVBMRVRJT05fU1RBVEVTLmZhaWxlZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmV2ZWFsQWxsTWluZXMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZURpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxhcHNlZFRpbWUgPSB0aGlzLnN0b3B0aW1lIC0gdGhpcy5zdGFydHRpbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91dGlsLkxvZyhgcGxheWVyIGhhcyBsb3N0IGluICR7dGhpcy5lbGFwc2VkVGltZX1gKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuRmlyZUdhbWVDb21wbGV0aW9uU3RhdGVDaGFuZ2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gICBcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyB5YXksIHlvdSBjbGVhcmVkIG9uZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudENlbGxDb3VudCsrO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIHBsYXllciBoYXMgd29uXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY3VycmVudENlbGxDb3VudCA9PSB0aGlzLl90b3RhbENlbGxDb3VudFRvV2luKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8geWF5XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wdGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5HYW1lQ29tcGxldGlvblN0YXRlID0gTUlORVNXRUVQRVJfR0FNRV9DT01QTEVUSU9OX1NUQVRFUy5jb21wbGV0ZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5SZXZlYWxBbGxNaW5lcygpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkdhbWVEaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGFwc2VkVGltZSA9IHRoaXMuc3RvcHRpbWUgLSB0aGlzLnN0YXJ0dGltZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl91dGlsLkxvZyhgcGxheWVyIGhhcyB3b24gaW4gJHt0aGlzLmVsYXBzZWRUaW1lfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuRmlyZUdhbWVDb21wbGV0aW9uU3RhdGVDaGFuZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBvdGhlcndpc2UsIGNlbGwgaXMgbm90IGEgbWluZSwgcGxheWVyIGhhcyBub3QgeWV0IHdvbiwgc28gYXR0ZW1wdCB0byBhdXRvZmlsbCBpZiB0aGUgY2VsbCBpcyBibGFua1xyXG4gICAgICAgICAgICBpZiAoY2VsbC5BZGphY2VudE1pbmVDb3VudCA9PSAwKSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICB0aGlzLkF0dGVtcHRBdXRvRmlsbChjZWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBTZWxlY3RDZWxsQnlJZChjZWxsSWQpIHtcclxuICAgICAgICBsZXQgY2VsbCA9IHRoaXMuQ2VsbEJ5SWQoY2VsbElkKTsgICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMuU2VsZWN0Q2VsbChjZWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBUcmlnZ2VyQXV0b1dpbigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuR2FtZUlzUGxheWFibGUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5Xb25CeUF1dG9XaW4gPSB0cnVlO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fY2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICBsZXQgaW5uZXJBcnJheSA9IHRoaXMuX2NlbGxzW2ldO1xyXG5cclxuICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgaW5uZXJBcnJheS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpbm5lckFycmF5W2pdLklzTWluZSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlNlbGVjdENlbGwoaW5uZXJBcnJheVtqXSk7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBUcmlnZ2VyQXV0b0xvc2UoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLkdhbWVJc1BsYXlhYmxlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIHRoaXMuU2VsZWN0Q2VsbCh0aGlzLl9taW5lQ2VsbHNbMF0pO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IFN0YXREYiB9IGZyb20gXCIuLi9jb3JlYXBwL3N0YXRkYi5qc1wiO1xyXG5pbXBvcnQgeyBNSU5FU1dFRVBFUl9HQU1FX0NPTVBMRVRJT05fU1RBVEVTIH0gZnJvbSBcIi4vbWluZXN3ZWVwZXJjb25zdGFudHMuanNcIjtcclxuaW1wb3J0IHsgTWluZXN3ZWVwZXJTY29yZSB9IGZyb20gXCIuL21pbmVzd2VlcGVyc2NvcmUuanNcIjtcclxuaW1wb3J0IHsgVXNlclV0aWwgfSBmcm9tIFwiLi4vY29yZWFwcC91c2VydXRpbC5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1pbmVzd2VlcGVyR2FtZUdyaWQge1xyXG4gICAgY29uc3RydWN0b3IoJHJvb3RFbGVtZW50LCBnYW1lU3RhdGUsIGxvZ1V0aWwpIHtcclxuICAgICAgICB0aGlzLiRyb290RWxlbWVudCA9ICRyb290RWxlbWVudDtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IGdhbWVTdGF0ZTsgIFxyXG4gICAgICAgIHRoaXMubG9nVXRpbCA9IGxvZ1V0aWw7XHJcbiAgICAgICAgdGhpcy5zdGF0RGIgPSBuZXcgU3RhdERiKCk7XHJcbiAgICB9IFxyXG5cclxuICAgIC8vIG1ldGhvZHNcclxuXHJcbiAgICBHZXRDZWxsQ2xhc3MoY2VsbCkge1xyXG4gICAgICAgIGlmICghY2VsbC5Jc1JldmVhbGVkKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjZWxsLklzTWFya2VkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiaGlkZGVuIG1hcmtlZFwiO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFwiaGlkZGVuXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY2VsbC5Jc01pbmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNlbGwuSXNMb3NpbmdNaW5lID8gXCJtaW5lIHRyaWdnZXJlZFwiIDogXCJtaW5lIFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAoY2VsbC5BZGphY2VudE1pbmVDb3VudCA+IDApIFxyXG4gICAgICAgICAgICByZXR1cm4gYG9wZW4tJHtjZWxsLkFkamFjZW50TWluZUNvdW50fWA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIFwiY2xlYXJcIjtcclxuICAgIH1cclxuXHJcbiAgICBHZXRDZWxsQ29udGVudChjZWxsKSB7XHJcbiAgICAgICAgbGV0IGNlbGxHbHlwaCA9IGNlbGwuSXNSZXZlYWxlZCA/IFxyXG4gICAgICAgIChjZWxsLklzTWluZSA/IFxyXG4gICAgICAgICAgICBcIvCfkqNcIiA6IFxyXG4gICAgICAgICAgICAgICAgKGNlbGwuQWRqYWNlbnRNaW5lQ291bnQgPiAwID8gY2VsbC5BZGphY2VudE1pbmVDb3VudCA6IFwiXCIpXHJcbiAgICAgICAgKSBcclxuICAgICAgICA6IFwiXCI7XHJcblxyXG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz0nY2VsbC1pbm5lcic+JHtjZWxsR2x5cGh9PC9kaXY+YDtcclxuICAgIH1cclxuXHJcbiAgICBHZXRJbml0aWFsQ2VsbEh0bWwoY2VsbElkKSB7XHJcbiAgICAgICAgbGV0IGNlbGwgPSB0aGlzLmdhbWVTdGF0ZS5DZWxsQnlJZChjZWxsSWQpO1xyXG5cclxuICAgICAgICBsZXQgY2VsbENsYXNzID0gdGhpcy5HZXRDZWxsQ2xhc3MoY2VsbCk7XHJcbiAgICAgICAgbGV0IGNlbGxDb250ZW50ID0gdGhpcy5HZXRDZWxsQ29udGVudChjZWxsKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGA8dGQgY2xhc3M9J2NlbGwgJHtjZWxsQ2xhc3N9JyBpZD0nJHtjZWxsSWR9Jz4ke2NlbGxDb250ZW50fTwvdGQ+YDtcclxuICAgIH1cclxuXHJcbiAgICBSZW1vdmVIYW5kbGVycygpIHtcclxuICAgICAgICB0aGlzLiRyb290RWxlbWVudC5maW5kKCd0YWJsZScpXHJcbiAgICAgICAgICAgIC5vZmYoJ2NvbnRleHRtZW51JylcclxuICAgICAgICAgICAgLm9mZignY2xpY2snKTtcclxuICAgIH1cclxuXHJcbiAgICBBZGRIYW5kbGVycygpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vIGFkZCBzdXBwcmVzcyBjb250ZXh0IG1lbnVcclxuICAgICAgICB0aGlzLiRyb290RWxlbWVudC5maW5kKCd0YWJsZScpLm9uKCdjb250ZXh0bWVudScsICd0ZC5jZWxsJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUud2hpY2ggPT0gMykge1xyXG4gICAgICAgICAgICAgICAgLy8gcmlnaHQgbW91c2VcclxuICAgICAgICAgICAgICAgIHRoYXQuZ2FtZVN0YXRlLk1hcmtDZWxsYnlJZChlLmN1cnJlbnRUYXJnZXQuaWQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIGFkZCBzZWxlY3QgaGFuZGxsZXJcclxuICAgICAgICB0aGlzLiRyb290RWxlbWVudC5maW5kKCd0YWJsZScpLm9uKCdjbGljaycsICd0ZC5jZWxsJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZihlLndoaWNoID09IDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIGxlZnQtbW91c2VcclxuICAgICAgICAgICAgICAgIHRoYXQuZ2FtZVN0YXRlLlNlbGVjdENlbGxCeUlkKGUuY3VycmVudFRhcmdldC5pZCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBNb3VudCgpIHtcclxuICAgICAgICB0aGlzLmxvZ1V0aWwuTG9nKFwibW91bnQgbWluZXN3ZWVwZXJncmlkXCIpO1xyXG5cclxuICAgICAgICAvLyByZW1vdmUgYW55IGV4aXN0aW5nIGhhbmRsZXJzXHJcbiAgICAgICAgdGhpcy5SZW1vdmVIYW5kbGVycygpO1xyXG5cclxuICAgICAgICBsZXQgc3RhY2sgPSBbXTtcclxuXHJcbiAgICAgICAgLy8gdGVtcGxhdGUgaHRtbCBjZWxsIGNvbnRlbnRcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5nYW1lU3RhdGUuU2l6ZS5oZWlnaHQ7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcm93SHRtbCA9IFwiPHRyPlwiO1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5nYW1lU3RhdGUuU2l6ZS53aWR0aDsgaisrKSB7ICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcm93SHRtbCArPSB0aGlzLkdldEluaXRpYWxDZWxsSHRtbCggaSArIFwiX1wiICsgaik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcm93SHRtbCArPSBcIjwvdHI+XCI7XHJcbiAgICAgICAgICAgIHN0YWNrLnB1c2gocm93SHRtbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyByZW5kZXJcclxuICAgICAgICB0aGlzLiRyb290RWxlbWVudC5odG1sKGA8dGFibGUgY2xhc3M9JyR7dGhpcy5nYW1lU3RhdGUuU2l6ZS5sYWJlbH0nPjx0Ym9keT4ke3N0YWNrLmpvaW4oXCJcIil9PC90Ym9keT48L3RhYmxlPmApOyBcclxuXHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIC8vIGFkZCBjZWxsIHN0YXRlIGNoYW5nZSBjYWxsYmFjayBmb3IgcmVuZGVyaW5nIGluZGl2aWR1YWwgY2VsbHNcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZS5PbkNlbGxTdGF0ZUNoYW5nZSA9IGZ1bmN0aW9uKGNlbGwpIHtcclxuICAgICAgICAgICAgLy8gcmUtcmVuZGVyIHRoZSBjZWxsXHJcbiAgICAgICAgICAgIHRoYXQubG9nVXRpbC5Mb2coYHJlbmRlciBjZWxsICR7Y2VsbC5JZH0gaW4gZ2FtZSB3aXRoIGlkICR7dGhhdC5nYW1lU3RhdGUuSWR9YCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgY2VsbENsYXNzID0gdGhhdC5HZXRDZWxsQ2xhc3MoY2VsbCk7XHJcbiAgICAgICAgICAgIGxldCBjZWxsQ29udGVudCA9IHRoYXQuR2V0Q2VsbENvbnRlbnQoY2VsbCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkKGAjJHtjZWxsLklkfWApXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoKVxyXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKGBjZWxsICR7Y2VsbENsYXNzfWApIFxyXG4gICAgICAgICAgICAgICAgLmh0bWwoY2VsbENvbnRlbnQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIGdhbWUgY29tcGxldGlvbiBzdGF0ZSBoYW5kbGVyXHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUuT25HYW1lQ29tcGxldGlvblN0YXRlQ2hhbmdlID0gZnVuY3Rpb24oZ2FtZUNvbXBsZXRpb25TdGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAoZ2FtZUNvbXBsZXRpb25TdGF0ZSA9PSBNSU5FU1dFRVBFUl9HQU1FX0NPTVBMRVRJT05fU1RBVEVTLmNvbXBsZXRlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC4kcm9vdEVsZW1lbnQuYXBwZW5kKFwiPGRpdiBjbGFzcz0nZW5kLXN0YXRlJz48aW1nIHNyYz0nLi9pbWcvd2luLmdpZic+PC9pbWc+PC9kaXY+XCIpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5nYW1lU3RhdGUuV29uQnlBdXRvV2luKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbm8gc2NvcmUgZm9yIHlvdVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubG9nVXRpbC5Mb2coXCJubyBzY29yZSBzdWJtaXR0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCB1c2VyVXRpbCA9IG5ldyBVc2VyVXRpbCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJVdGlsLklzTG9nZ2VkSW4pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmxvZ1V0aWwuTG9nKFwic3VibWl0IHNjb3JlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzY29yZSA9IG5ldyBNaW5lc3dlZXBlclNjb3JlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdhbWVTdGF0ZS5TaXplLmxhYmVsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlclV0aWwuVXNlci5kaXNwbGF5TmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJVdGlsLlVzZXIudWlkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5nYW1lU3RhdGUuRWxhcHNlZFRpbWUpLlBlcnNpc3RhYmxlRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnN0YXREYi5BZGRTY29yZShzY29yZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2dVdGlsLkxvZyhcInNjb3JlIHN1Ym1pdHRlZFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGdhbWVDb21wbGV0aW9uU3RhdGUgPT0gTUlORVNXRUVQRVJfR0FNRV9DT01QTEVUSU9OX1NUQVRFUy5mYWlsZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuJHJvb3RFbGVtZW50LmFwcGVuZChcIjxkaXYgY2xhc3M9J2VuZC1zdGF0ZSc+PGltZyBzcmM9Jy4vaW1nL2xvc2UuZ2lmJz48L2ltZz48L2Rpdj5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBiaW5kIGhhbmRsZXJzXHJcbiAgICAgICAgdGhpcy5BZGRIYW5kbGVycygpO1xyXG4gICAgfVxyXG5cclxuICAgIFVuTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5sb2dVdGlsLkxvZyhcInVubW91bnQgbWluZXN3ZWVwZXJncmlkXCIpO1xyXG4gICAgICAgIHRoaXMuUmVtb3ZlSGFuZGxlcnMoKTtcclxuICAgICAgICB0aGlzLiRyb290RWxlbWVudC5odG1sKCcnKTsgXHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgTWluZXN3ZWVwZXJTY29yZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1ldHlwZSwgbmFtZSwgdWlkLCB0aW1lKSB7XHJcbiAgICAgICAgdGhpcy5QZXJzaXN0YWJsZSA9IHtcclxuICAgICAgICAgICAgZ2FtZTogXCJtaW5lc3dlZXBlclwiLFxyXG4gICAgICAgICAgICBnYW1lYWxpYXM6IFwiJiM2MjU7XCIsXHJcbiAgICAgICAgICAgIGdhbWV0eXBlOiBnYW1ldHlwZSxcclxuICAgICAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICAgICAgdWlkOiB1aWQsXHJcbiAgICAgICAgICAgIHRpbWU6IHRpbWVcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBQZXJzaXN0YWJsZURhdGEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuUGVyc2lzdGFibGU7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBBcHBVdGlsIH0gZnJvbSAnLi4vY29yZWFwcC9hcHB1dGlsLmpzJztcclxuaW1wb3J0IHsgU3RhdERiIH0gZnJvbSAnLi4vY29yZWFwcC9zdGF0ZGIuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFwcFN0YXRzIHtcclxuICAgIGNvbnN0cnVjdG9yKHJvb3RDb250YWluZXJTZWxlY3Rvcikge1xyXG4gICAgICAgIHRoaXMucm9vdENvbnRhaW5lclNlbGVjdG9yID0gcm9vdENvbnRhaW5lclNlbGVjdG9yO1xyXG4gICAgICAgIHRoaXMuc2NvcmVHcmlkSWQgPSAnc2NvcmVzLWdyaWQnO1xyXG4gICAgICAgIHRoaXMudXRpbCA9IG5ldyBBcHBVdGlsKCk7XHJcbiAgICAgICAgdGhpcy5zdGF0c2RiID0gbmV3IFN0YXREYigpO1xyXG4gICAgICAgIHRoaXMucGFnZVN0YXJ0ID0gMDtcclxuICAgICAgICB0aGlzLnBhZ2VTaXplID0gMTA7XHJcblxyXG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9J2FwcC1jb250YWluZXIgY29udGFpbmVyLXNtIHN0YXRzLWNvbnRhaW5lcic+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdyb3cnPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2NvbC0xMiBwLTEgcC1zbS0zIHB5LXNtLTIgZy1zbS0yJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtc3RyaXBlZCB0YWJsZS1ib3JkZXJsZXNzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc2NvcGU9XCJjb2xcIj4jPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHNjb3BlPVwiY29sXCI+dXNlcjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzY29wZT1cImNvbFwiPmRpZmZpY3VsdHk8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc2NvcGU9XCJjb2xcIj50aW1lIChzKTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHkgaWQ9JyR7dGhpcy5zY29yZUdyaWRJZH0nIGNsYXNzPSdvcGFjaXR5LWFuaW1hdGlvbic+PC90Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdjb2wtMTIgcC0xIHAtc20tMyBweS1zbS0yIGctc20tMiBkLW5vbmUgY29udGVudC1qdXN0aWZ5LWNlbnRlcicgaWQ9J3BhZ2luZyc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxuYXYgYXJpYS1sYWJlbD1cIi4uLlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwicGFnaW5hdGlvbiBwYWdpbmF0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGlkPVwicGctcHJldlwiIGNsYXNzPVwiZGlzYWJsZWQgcGFnZS1pdGVtXCIgdGl0bGU9XCJzaG93IG1lIHRoZSBwcmV2aW91cyBzY29yZXNcIj48YSBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWY9XCIjL3N0YXRzXCI+Jmx0OyBwcmV2PC9hPjwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGlkPSdwZy1uZXh0JyBjbGFzcz1cImRpc2FibGVkIHBhZ2UtaXRlbVwiIHRpdGxlPVwic2hvdyBtZSB0aGUgbmV4dCBzY29yZXNcIj48YSBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWY9XCIjL3N0YXRzXCI+bmV4dCAmZ3Q7PC9hPjwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L25hdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgLy8gbWV0aG9kc1xyXG4gICAgTW91bnRTdGF0cyhyZXN1bHRzKSB7XHJcbiAgICAgICAgLy8gcmVjb3JkIHdoZXJlIHdlIGFyZSBhdCBmb3IgbmV4dCBwYWdpbmdcclxuICAgICAgICB0aGlzLnBhZ2VTdGFydCA9ICByZXN1bHRzLnN0YXJ0QXQ7XHJcblxyXG4gICAgICAgIC8vIGNvc21ldGljIGluZGV4IGZvciBkaXNwbGF5XHJcbiAgICAgICAgbGV0IHN0YXJ0SW5kZXggPSByZXN1bHRzLnN0YXJ0QXQ7XHJcbiAgICAgICAgbGV0IHN0YWNrID0gcmVzdWx0cy5kYXRhLm1hcCgoZCkgPT4ge1xyXG4gICAgICAgICAgICBzdGFydEluZGV4Kys7XHJcbiAgICAgICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgICAgICA8dHIgaWQ9JyR7ZC5kb2NpZH0nPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZD4ke3N0YXJ0SW5kZXh9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGQ+JHtkLm5hbWV9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGQ+JHtkLmdhbWV0eXBlfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkPiR7KGQudGltZSAvIDEwMDApLnRvRml4ZWQoMSl9PC90ZD5cclxuICAgICAgICAgICAgICAgIDwvdHI+YDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gc2hvdyB0aGUgc2NvcmVzXHJcbiAgICAgICAgJChgIyR7dGhpcy5zY29yZUdyaWRJZH1gKS5odG1sKHN0YWNrLmpvaW4oJycpKS50b2dnbGVDbGFzcygnZmFkZUluJyk7XHJcblxyXG4gICAgICAgIC8vIHNob3cgdGhlIHBhZ2luZywgcmViaW5kIGhhbmRsZXJzXHJcbiAgICAgICAgaWYgKHJlc3VsdHMuaGFzTmV4dCB8fCByZXN1bHRzLmhhc1ByZXYpIHtcclxuICAgICAgICAgICAgJCgnI3BhZ2luZycpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnI3BnLXByZXYnKVxyXG4gICAgICAgICAgICAgICAgLm9mZignY2xpY2snKVxyXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdkaXNhYmxlZCcpXHJcbiAgICAgICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgICAgIC5maW5kKCcjcGctbmV4dCcpXHJcbiAgICAgICAgICAgICAgICAub2ZmKCdjbGljaycpXHJcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0cy5oYXNQcmV2KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcHJldiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUXVlcnlEYXRhKHRoaXMucGFnZVN0YXJ0IC0gdGhpcy5wYWdlU2l6ZSwgdGhpcy5wYWdlU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnI3BnLXByZXYnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBwcmV2KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3VsdHMuaGFzTmV4dCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5leHQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlF1ZXJ5RGF0YSh0aGlzLnBhZ2VTdGFydCArIHRoaXMucGFnZVNpemUsIHRoaXMucGFnZVNpemUpO1xyXG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICQoJyNwZy1uZXh0JylcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJylcclxuICAgICAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgbmV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgUXVlcnlEYXRhKHBhZ2VTdGFydCwgcGFnZVNpemUpIHtcclxuICAgICAgICB0aGlzLnN0YXRzZGIuR2V0U2NvcmVzKHBhZ2VTdGFydCwgcGFnZVNpemUsIHRoaXMuTW91bnRTdGF0cy5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBVbk1vdW50Q29udHJvbHMoKSB7XHJcbiAgICAgICAgJCh0aGlzLnJvb3RDb250YWluZXJTZWxlY3RvcikuaHRtbCgnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy51dGlsLkxvZyhcIm1vdW50IGFwcHN0YXRzXCIpO1xyXG4gICAgICAgICQodGhpcy5yb290Q29udGFpbmVyU2VsZWN0b3IpLmh0bWwodGhpcy50ZW1wbGF0ZSk7XHJcblxyXG4gICAgICAgIC8vIHF1ZXJ5IGluaXRhbCBkYXRhXHJcbiAgICAgICAgdGhpcy5RdWVyeURhdGEodGhpcy5wYWdlU3RhcnQsIHRoaXMucGFnZVNpemUpO1xyXG4gICAgfVxyXG5cclxuICAgIFVuTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy51dGlsLkxvZyhcInVubW91bnQgYXBwc3RhdHNcIik7XHJcbiAgICAgICAgdGhpcy5Vbk1vdW50Q29udHJvbHMoKTtcclxuICAgIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgTmF2aWdhdGlvbiB9IGZyb20gJy4vbmF2aWdhdGlvbi5qcyc7XHJcbmltcG9ydCB7IE1pbmVzd2VlcGVyIH0gZnJvbSAnLi4vbWluZXN3ZWVwZXIvbWluZXN3ZWVwZXJhcHAuanMnO1xyXG5pbXBvcnQgeyBFcnJvciB9IGZyb20gJy4vZXJyb3IuanMnO1xyXG5pbXBvcnQgeyBBcHBSb3V0ZSB9IGZyb20gJy4vYXBwcm91dGUnO1xyXG5pbXBvcnQgeyBBcHBSb3V0ZXIgfSBmcm9tICcuL2FwcHJvdXRlcic7XHJcbmltcG9ydCB7IEFwcFN0YXRzIH0gZnJvbSAnLi8uLi9zdGF0cy9hcHBzdGF0cy5qcyc7XHJcblxyXG5jbGFzcyBBcHAge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy4kcm9vdEFwcENvbnRhaW5lciA9ICcjYXBwLW1haW4nO1xyXG4gICAgICAgIHRoaXMucm91dGVzID0gW1xyXG4gICAgICAgICAgICBuZXcgQXBwUm91dGUoXCIvXCIsIGZ1bmN0aW9uKCkgeyByZXR1cm4gbmV3IE1pbmVzd2VlcGVyKHRoaXMuJHJvb3RBcHBDb250YWluZXIpOyB9LmJpbmQodGhpcykpLFxyXG4gICAgICAgICAgICBuZXcgQXBwUm91dGUoXCIvc3RhdHNcIiwgZnVuY3Rpb24oKSB7IHJldHVybiBuZXcgQXBwU3RhdHModGhpcy4kcm9vdEFwcENvbnRhaW5lcik7IH0uYmluZCh0aGlzKSksXHJcbiAgICAgICAgICAgIG5ldyBBcHBSb3V0ZShcIi9lcnJvclwiLCBmdW5jdGlvbigpIHsgcmV0dXJuIG5ldyBFcnJvcih0aGlzLiRyb290QXBwQ29udGFpbmVyKTsgfS5iaW5kKHRoaXMpKVxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgTW91bnQoKSB7XHJcbiAgICAgICAgbmV3IEFwcFJvdXRlcih0aGlzLnJvdXRlcyk7XHJcbiAgICAgICAgbmV3IE5hdmlnYXRpb24oKTsgICAgICAgXHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIHN0YXJ0XHJcbm5ldyBBcHAoKS5Nb3VudCgpO1xyXG5cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=