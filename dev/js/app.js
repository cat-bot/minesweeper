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
                
                let userUtil = new _coreapp_userutil_js__WEBPACK_IMPORTED_MODULE_3__.UserUtil();
                if (userUtil.IsLoggedIn) {
                    let score = new _minesweeperscore_js__WEBPACK_IMPORTED_MODULE_2__.MinesweeperScore(
                        that.gameState.Size.label, 
                        userUtil.User.displayName, 
                        userUtil.User.uid, 
                        that.gameState.ElapsedTime).PersistableData;
                    that.statDb.AddScore(score);
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
            <div class='app-container container-sm'>
                <div class='row'>
                    <div class='col-12 p-1 p-sm-3 py-sm-2 g-sm-2'>
                        <table class="table table-striped table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">user</th>
                                    <th scope="col">difficulty</th>
                                    <th scope="col">time</th>
                                </tr>
                            </thead>
                            <tbody id='${this.scoreGridId}'></tbody>
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
        $(`#${this.scoreGridId}`).html(stack.join(''));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9hcHByb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9hcHByb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvcmVhcHAvYXBwdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9jb25maWcvY29uZmlnLWRldi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9lcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9nb29nbGVhdXRoaGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9sb2Rhc2hwb2x5ZmlsbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9uYXZpZ2F0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb3JlYXBwL3N0YXRkYi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC91c2VydXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbWluZXN3ZWVwZXIvbWluZXN3ZWVwZXJhcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21pbmVzd2VlcGVyL21pbmVzd2VlcGVyY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9taW5lc3dlZXBlci9taW5lc3dlZXBlcmdhbWVjZWxsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9taW5lc3dlZXBlci9taW5lc3dlZXBlcmdhbWVzdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbWluZXN3ZWVwZXIvbWluZXN3ZWVwZXJncmlkLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9taW5lc3dlZXBlci9taW5lc3dlZXBlcnNjb3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zdGF0cy9hcHBzdGF0cy5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29yZWFwcC9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2J1Qzs7QUFFaEM7QUFDUDtBQUNBLDJCQUEyQixnREFBTztBQUNsQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQ0FBMEMsS0FBSzs7QUFFL0M7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtRUFBbUUsTUFBTTtBQUN6RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwRHlEOztBQUVsRDtBQUNQO0FBQ0Esb0JBQW9CLHNFQUFhO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7O0FDWE87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7Ozs7OztBQ1pPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTJELGVBQWU7QUFDMUU7QUFDQTtBQUNBLDRDQUE0QyxzQkFBc0I7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7Ozs7QUN2Q2lFOztBQUUxRDtBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQiwwRUFBaUI7O0FBRTVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLEU7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwREE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCLFNBQVM7QUFDbkM7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQyxNQUFNLFNBQUk7O0FBRVgsaUVBQWUsQ0FBQyxFOzs7Ozs7Ozs7Ozs7Ozs7QUMxRTJDOztBQUVwRDtBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9EO0FBQ0E7QUFDQSxTQUFTOztBQUVULHFEO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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LHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7Ozs7OztBQ042QztBQUNrQjtBQUM1QjtBQUNHO0FBQ0U7QUFDVTs7QUFFbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsK0NBQVEsa0JBQWtCLFlBQVksdUVBQVcseUJBQXlCLEVBQUU7QUFDNUYsZ0JBQWdCLCtDQUFRLHVCQUF1QixZQUFZLHdEQUFRLHlCQUF5QixFQUFFO0FBQzlGLGdCQUFnQiwrQ0FBUSx1QkFBdUIsWUFBWSw0Q0FBSyx5QkFBeUIsRUFBRTtBQUMzRjtBQUNBOztBQUVBO0FBQ0EsWUFBWSxpREFBUztBQUNyQixZQUFZLHNEQUFVLEc7QUFDdEI7QUFDQTs7QUFFQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBBcHBSb3V0ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihwYXRoLCBjb21wb25lbnRGbikge1xyXG4gICAgICAgIHRoaXMuX3BhdGggPSBwYXRoO1xyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudEZuID0gY29tcG9uZW50Rm47XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBhdGgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhdGg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNvbXBvbmVudCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tcG9uZW50Rm4oKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBBcHBVdGlsIH0gZnJvbSAnLi9hcHB1dGlsLmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBSb3V0ZXIge1xyXG4gICAgY29uc3RydWN0b3Iocm91dGVzKSB7XHJcbiAgICAgICAgdGhpcy5hcHBVdGlsID0gbmV3IEFwcFV0aWwoKTtcclxuICAgICAgICB0aGlzLnJvdXRlcyA9IHJvdXRlcztcclxuXHJcbiAgICAgICAgY29uc3Qgcm91bnRlcmZ1bmN0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRSb3V0ZSgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgcm91bnRlcmZ1bmN0aW9uKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHJvdW50ZXJmdW5jdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZFJvdXRlKCkge1xyXG4gICAgICAgIGxldCBwYXRoID0gdGhpcy5wYXJzZUxvY2F0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5hcHBVdGlsLkxvZyhgbG9hZGluZyByb3V0ZSAke3BhdGh9YCk7XHJcblxyXG4gICAgICAgIGxldCByb3V0ZSA9IHRoaXMuZmluZENvbXBvbmVudChwYXRoKTtcclxuXHJcbiAgICAgICAgbGV0IGNvbXBvbmVudDtcclxuXHJcbiAgICAgICAgaWYgKHJvdXRlKVxyXG4gICAgICAgICAgICBjb21wb25lbnQgPSByb3V0ZS5jb21wb25lbnQ7XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudCA9IHRoaXMuZmluZENvbXBvbmVudCgnL2Vycm9yJykuY29tcG9uZW50O1xyXG4gICAgICAgICAgICBjb21wb25lbnQuRXJyb3JDb2RlID0gJzQwNCc7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudC5Vc2VyRXJyb3JNZXNzYWdlID0gJ3dlIGhhdmUgY3J5cHRvIGxvY2tlcmVkIHlvdXIgc3R1ZmYnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5Nb3VudENvbXBvbmVudChjb21wb25lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHBhcnNlTG9jYXRpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGxvY2F0aW9uLmhhc2guc2xpY2UoMSkudG9Mb3dlckNhc2UoKSB8fCAnLyc7XHJcbiAgICB9XHJcblxyXG4gICAgZmluZENvbXBvbmVudChyb3V0ZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJvdXRlcy5maW5kKHIgPT4gci5wYXRoLm1hdGNoKG5ldyBSZWdFeHAoYF5cXFxcJHtyb3V0ZX0kYCwgJ2dtJykpKSB8fCB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgVW5tb3VudEN1cnJlbnRDb21wb25lbnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubW91bnRlZENvbXBvbmVudClcclxuICAgICAgICAgICAgdGhpcy5tb3VudGVkQ29tcG9uZW50LlVuTW91bnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBNb3VudENvbXBvbmVudChjb21wb25lbnQpIHtcclxuICAgICAgICB0aGlzLlVubW91bnRDdXJyZW50Q29tcG9uZW50KCk7XHJcbiAgICAgICAgdGhpcy5tb3VudGVkQ29tcG9uZW50ID0gY29tcG9uZW50O1xyXG4gICAgICAgIHRoaXMubW91bnRlZENvbXBvbmVudC5Nb3VudCgpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEVudkNvbmZpZyB9IGZyb20gJy4vY29uZmlnL2NvbmZpZy1BUFBUQVJHRVQuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFwcFV0aWwge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fbG9nID0gRW52Q29uZmlnLmVudiA9PT0gXCJkZXZcIjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgTG9nKGVudHJ5KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xvZyAmJiBlbnRyeSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZW50cnkpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNvbnN0IEFwcEZpcmViYXNlQ29uZmlnID0ge1xyXG4gICAgYXBpS2V5OiBcIkFJemFTeUJpdGtEcjNvOGhKQmgtbG01dFpudHdtS2hUV2lTUEVwa1wiLFxyXG4gICAgYXV0aERvbWFpbjogXCJtZWluLXN3ZWVwZXItZDU5OTUuZmlyZWJhc2VhcHAuY29tXCIsXHJcbiAgICBwcm9qZWN0SWQ6IFwibWVpbi1zd2VlcGVyLWQ1OTk1XCIsXHJcbiAgICBzdG9yYWdlQnVja2V0OiBcIm1laW4tc3dlZXBlci1kNTk5NS5hcHBzcG90LmNvbVwiLFxyXG4gICAgbWVzc2FnaW5nU2VuZGVySWQ6IFwiNzAzOTMzNzI1Njg1XCIsXHJcbiAgICBhcHBJZDogXCIxOjcwMzkzMzcyNTY4NTp3ZWI6MmVlYmNlNWIxZDdhMTZlZmJhN2ViY1wiXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgRW52Q29uZmlnID0ge1xyXG4gICAgZW52OiBcImRldlwiLFxyXG4gICAgc2NvcmVzX2NvbGxlY3Rpb246IFwic2NvcmVzXCJcclxufTsiLCJleHBvcnQgY2xhc3MgRXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3Iocm9vdENvbnRhaW5lclNlbGVjdG9yKSB7XHJcbiAgICAgICAgdGhpcy5yb290Q29udGFpbmVyU2VsZWN0b3IgPSByb290Q29udGFpbmVyU2VsZWN0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IEVycm9yQ29kZShodHRwRXJyb3JDb2RlKSB7XHJcbiAgICAgICAgdGhpcy5odHRwRXJyb3JDb2RlID0gaHR0cEVycm9yQ29kZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgRXJyb3JDb2RlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBFcnJvckNvZGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IFVzZXJFcnJvck1lc3NhZ2UobXNnKSB7XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbXNnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBVc2VyRXJyb3JNZXNzYWdlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgTW91bnQoKSB7XHJcbiAgICAgICAgJCh0aGlzLnJvb3RDb250YWluZXJTZWxlY3RvcikuaHRtbChgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9J2Vycm9yLWNvbnRhaW5lciBjb250YWluZXItc20gbXQtNCc+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdyb3cgcHktNCc+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nY29sLTEyIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWNvbnRlbnQtbWlkZGxlJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nZm9udC1tb25vc3BhY2UgZnMtMSc+JHt0aGlzLkVycm9yQ29kZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdjb2wtMTIgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24tY29udGVudC1taWRkbGUgcGItMyBweC0zIHRleHQtY2VudGVyJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nZnMtMyc+JHt0aGlzLlVzZXJFcnJvck1lc3NhZ2V9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYCk7XHJcbiAgICB9XHJcblxyXG4gICAgVW5Nb3VudCgpIHtcclxuICAgICAgICAkKHRoaXMucm9vdENvbnRhaW5lclNlbGVjdG9yKS5odG1sKCcnKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEFwcEZpcmViYXNlQ29uZmlnIH0gZnJvbSAnLi9jb25maWcvY29uZmlnLUFQUFRBUkdFVC5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgR29vZ2xlQXV0aEhhbmRsZXIge1xyXG4gIGNvbnN0cnVjdG9yKG9uU2lnbkluLCBvblNpZ25PdXQpIHtcclxuICAgIHRoaXMub25TaWduSW4gPSBvblNpZ25JbjtcclxuICAgIHRoaXMub25TaWduT3V0ID0gb25TaWduT3V0O1xyXG5cclxuICAgIC8vIEluaXRpYWxpemUgRmlyZWJhc2UsIGNvbmZpZyBkZWZpbmVkIGVsc2V3aGVyZVxyXG4gICAgZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChBcHBGaXJlYmFzZUNvbmZpZyk7XHJcbiAgICBcclxuICAgIC8vIHVzZSBvbmx5IGdvb2dcclxuICAgIHRoaXMuZ19wcm92aWRlciA9IG5ldyBmaXJlYmFzZS5hdXRoLkdvb2dsZUF1dGhQcm92aWRlcigpO1xyXG4gICAgdGhpcy5nX3Byb3ZpZGVyLmFkZFNjb3BlKCdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3VzZXJpbmZvLnByb2ZpbGUnKTtcclxuICAgIHRoaXMuZ19wcm92aWRlci5zZXRDdXN0b21QYXJhbWV0ZXJzKHtcclxuICAgICAgJ2xvZ2luX2hpbnQnOiAndXNlckBleGFtcGxlLmNvbSdcclxuICAgIH0pOyBcclxuXHJcbiAgICAvLyBzZXQgYSBoYW5kbGVyIGZvciB3aGVuIHRva2VucyBhcmUgcmVjaWV2ZWRcclxuICAgIGZpcmViYXNlLmF1dGgoKS5vbkF1dGhTdGF0ZUNoYW5nZWQodXNlcj0+e1xyXG4gICAgICAgIGlmICh1c2VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuRmlyZU9uU2lnbkluSGFuZGxlcih1c2VyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gdGhpcyBjYW4gZmlyZSB3aGVuIHRoZXJlIGlzIG5vIGxvZ2dlZCBpbiB1c2VyIG9uIGxvYWRcclxuICAgICAgICAgICAgdGhpcy5GaXJlT25TaWduT3V0SGFuZGxlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gbWV0aG9kc1xyXG4gIEZpcmVPblNpZ25JbkhhbmRsZXIob0F1dGhVc2VyKSB7XHJcbiAgICBpZiAodGhpcy5vblNpZ25Jbikge1xyXG4gICAgICB0aGlzLm9uU2lnbkluKG9BdXRoVXNlcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBGaXJlT25TaWduT3V0SGFuZGxlcigpIHtcclxuICAgIGlmICh0aGlzLm9uU2lnbk91dCkge1xyXG4gICAgICB0aGlzLm9uU2lnbk91dCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgU2lnbkluUG9wdXAoKSB7XHJcbiAgICBmaXJlYmFzZS5hdXRoKCkuc2lnbkluV2l0aFBvcHVwKHRoaXMuZ19wcm92aWRlcik7XHJcbiAgfVxyXG5cclxuICBTaWduSW5SZWRpcmVjdCgpIHtcclxuICAgIGZpcmViYXNlLmF1dGgoKS5zaWduSW5XaXRoUmVkaXJlY3QodGhpcy5nX3Byb3ZpZGVyKTtcclxuICB9XHJcblxyXG4gIFNpZ25PdXQoKSB7XHJcbiAgICBmaXJlYmFzZS5hdXRoKCkuc2lnbk91dCgpO1xyXG4gIH1cclxufVxyXG5cclxuIiwibGV0IF8gPSAoZnVuY3Rpb24oKSB7XHJcbiBcclxuICAgIGZ1bmN0aW9uIGJhc2VSYW5kb20obG93ZXIsIHVwcGVyKSB7XHJcbiAgICAgICAgcmV0dXJuIGxvd2VyICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHVwcGVyIC0gbG93ZXIgKyAxKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2h1ZmZsZVNlbGYoYXJyYXksIHNpemUpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSAtMSxcclxuICAgICAgICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxyXG4gICAgICAgICAgICBsYXN0SW5kZXggPSBsZW5ndGggLSAxO1xyXG5cclxuICAgICAgICBzaXplID0gc2l6ZSA9PT0gdW5kZWZpbmVkID8gbGVuZ3RoIDogc2l6ZTtcclxuICAgICAgICB3aGlsZSAoKytpbmRleCA8IHNpemUpIHtcclxuICAgICAgICAgICAgdmFyIHJhbmQgPSBiYXNlUmFuZG9tKGluZGV4LCBsYXN0SW5kZXgpLFxyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBhcnJheVtyYW5kXTtcclxuXHJcbiAgICAgICAgICAgIGFycmF5W3JhbmRdID0gYXJyYXlbaW5kZXhdO1xyXG4gICAgICAgICAgICBhcnJheVtpbmRleF0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXJyYXkubGVuZ3RoID0gc2l6ZTtcclxuICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY29weUFycmF5KHNvdXJjZSwgYXJyYXkpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSAtMSxcclxuICAgICAgICAgICAgbGVuZ3RoID0gc291cmNlLmxlbmd0aDtcclxuICBcclxuICAgICAgICBhcnJheSB8fCAoYXJyYXkgPSBBcnJheShsZW5ndGgpKTtcclxuICAgICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xyXG4gICAgICAgICAgYXJyYXlbaW5kZXhdID0gc291cmNlW2luZGV4XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGJhc2VDbGFtcChudW1iZXIsIGxvd2VyLCB1cHBlcikge1xyXG4gICAgICAgIGlmIChudW1iZXIgPT09IG51bWJlcikge1xyXG4gICAgICAgICAgaWYgKHVwcGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbnVtYmVyID0gbnVtYmVyIDw9IHVwcGVyID8gbnVtYmVyIDogdXBwZXI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAobG93ZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBudW1iZXIgPSBudW1iZXIgPj0gbG93ZXIgPyBudW1iZXIgOiBsb3dlcjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bWJlcjtcclxuICAgIH1cclxuICBcclxuICAgIGZ1bmN0aW9uIGFycmF5U2FtcGxlU2l6ZShhcnJheSwgbikge1xyXG4gICAgICAgIHJldHVybiBzaHVmZmxlU2VsZihjb3B5QXJyYXkoYXJyYXkpLCBiYXNlQ2xhbXAobiwgMCwgYXJyYXkubGVuZ3RoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2FtcGxlU2l6ZShjb2xsZWN0aW9uLCBuKSB7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5U2FtcGxlU2l6ZShjb2xsZWN0aW9uLCBuKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByYW5nZShzdGFydCwgZW5kKSB7XHJcbiAgICAgICAgbGV0IHMgPSBzdGFydCB8fCAwO1xyXG4gICAgICAgIGxldCBudW1zID0gW107XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcclxuICAgICAgICAgICAgbnVtcy5wdXNoKGkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGxldCBwdWIgPSB7fTtcclxuXHJcbiAgICBwdWIucmFuZ2UgPSByYW5nZTtcclxuICAgIHB1Yi5zYW1wbGVTaXplID0gc2FtcGxlU2l6ZTtcclxuXHJcbiAgICByZXR1cm4gcHViO1xyXG5cclxufS5jYWxsKHRoaXMpKTtcclxuICBcclxuZXhwb3J0IGRlZmF1bHQgXzsiLCJpbXBvcnQgeyBHb29nbGVBdXRoSGFuZGxlciB9IGZyb20gJy4vZ29vZ2xlYXV0aGhhbmRsZXIuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb24ge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5sb2dpblVJID0gJChcIiNsb2dpbi11aS1jb250YWluZXJcIik7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyBiaW5kIGxvZyBpblxyXG4gICAgICAgICQoXCIjbG9naW4tcHJvbXB0XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHsgICAgIFxyXG4gICAgICAgICAgICB0aGF0LmF1dGguU2lnbkluUmVkaXJlY3QoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcIiNsb2dpbi1wcm9maWxlXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHsgICAgIFxyXG4gICAgICAgICAgICB0aGF0LmF1dGguU2lnbk91dCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLl9vblNpZ25JbiA9IGZ1bmN0aW9uKG9BdXRoVXNlcikge1xyXG4gICAgICAgICAgICB0aGF0LmxvZ2luVUlcclxuICAgICAgICAgICAgICAgIC5maW5kKFwiI2xvZ2luLXByb21wdFwiKVxyXG4gICAgICAgICAgICAgICAgLnRvZ2dsZUNsYXNzKCdkLW5vbmUnKVxyXG4gICAgICAgICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAgICAgICAuZmluZChcIiNsb2dpbi1wcm9maWxlXCIpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnaW1nJylcclxuICAgICAgICAgICAgICAgIC50b2dnbGVDbGFzcygnZmFkZUluJylcclxuICAgICAgICAgICAgICAgIC5wcm9wKCdzcmMnLCBvQXV0aFVzZXIucGhvdG9VUkwpXHJcbiAgICAgICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgICAgIC50b2dnbGVDbGFzcygnZC1ub25lJylcclxuICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2RhdGEtc2lnbmVkLWluJywgJ3RydWUnKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLl9vblNpZ25PdXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKHRoYXQubG9naW5VSS5hdHRyKCdkYXRhLXNpZ25lZC1pbicpID09ICdmYWxzZScpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICBcclxuICAgICAgICAgICAgdGhhdC5sb2dpblVJXHJcbiAgICAgICAgICAgICAgICAuZmluZChcIiNsb2dpbi1wcm9maWxlXCIpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnaW1nJylcclxuICAgICAgICAgICAgICAgIC5wcm9wKCdzcmMnLCAnJylcclxuICAgICAgICAgICAgICAgIC50b2dnbGVDbGFzcygnZmFkZUluJylcclxuICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgLnRvZ2dsZUNsYXNzKCdkLW5vbmUnKVxyXG4gICAgICAgICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAgICAgICAuZmluZChcIiNsb2dpbi1wcm9tcHRcIilcclxuICAgICAgICAgICAgICAgIC50b2dnbGVDbGFzcygnZC1ub25lJylcclxuICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2RhdGEtc2lnbmVkLWluJywgJ2ZhbHNlJyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5hdXRoID0gbmV3IEdvb2dsZUF1dGhIYW5kbGVyKHRoaXMuX29uU2lnbkluLCB0aGlzLl9vblNpZ25PdXQpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRW52Q29uZmlnIH0gZnJvbSAnLi9jb25maWcvY29uZmlnLUFQUFRBUkdFVC5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgU3RhdERiIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRTY29yZXMoc3RhcnRBdCwgbiwgb25TdWNjZXNzLCBvbkVycm9yKSB7XHJcbiAgICAgICAgLy8gZmV0Y2ggMSBtb3JlIHRoYW4gbiwgdG8gdGVzdCBmb3IgcGFnaW5nXHJcbiAgICAgICAgbGV0IGsgPSBuICsgMTtcclxuICAgICAgICB0aGlzLmRiLmNvbGxlY3Rpb24oRW52Q29uZmlnLnNjb3Jlc19jb2xsZWN0aW9uKS5vcmRlckJ5KFwidGltZVwiKS5zdGFydEF0KHN0YXJ0QXQpLmxpbWl0KGspLmdldCgpLnRoZW4oXHJcbiAgICAgICAgICAgIChxdWVyeVNuYXBzaG90KSA9PiB7IFxyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdHMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICBxdWVyeVNuYXBzaG90LmZvckVhY2goKGRvYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHN0YXJ0QXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBkb2MuZGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuZG9jaWQgPSBkb2MuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaGFzUHJldiA9IHN0YXJ0QXQgIT0gMDtcclxuICAgICAgICAgICAgICAgIGxldCBoYXNOZXh0ID0gcmVzdWx0cy5sZW5ndGggPiBuO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBsZW5ndGgsIGV4Y2VlZHMgd2hhdCB3ZSB3YW50ZWQgdG8gcXVlcnksIHRoZXJlJ3MgYSBuZXh0IHBhZ2UsIHNvIHBvcCB0aGUgb25lIGV4dHJhIGVudHJ5XHJcbiAgICAgICAgICAgICAgICBpZiAoaGFzTmV4dClcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnBvcCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IHBhZ2UgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogcmVzdWx0cyxcclxuICAgICAgICAgICAgICAgICAgICBzdGFydEF0OiBzdGFydEF0LFxyXG4gICAgICAgICAgICAgICAgICAgIGhhc1ByZXY6IGhhc1ByZXYsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJldlN0YXJ0QXQ6IGhhc1ByZXYgPyBzdGFydEF0IC0gbiA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICBoYXNOZXh0OiBoYXNOZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRTdGFydEF0OiBoYXNOZXh0ID8gc3RhcnRBdCArIG4gOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgb25TdWNjZXNzKHBhZ2UpOyBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKGVycm9yKSA9PiB7IG9uRXJyb3IoZXJyb3IpOyB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBBZGRTY29yZShzY29yZU9iamVjdCkge1xyXG4gICAgICAgIHRoaXMuZGIuY29sbGVjdGlvbihFbnZDb25maWcuc2NvcmVzX2NvbGxlY3Rpb24pLmFkZChzY29yZU9iamVjdCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRG9jdW1lbnQgc3VjY2Vzc2Z1bGx5IHdyaXR0ZW4hXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFVzZXJVdGlsIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICB0aGlzLnVzZXIgPSBmaXJlYmFzZS5hdXRoKCkuY3VycmVudFVzZXI7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBnZXQgSXNMb2dnZWRJbigpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudXNlciAhPSBudWxsO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgZ2V0IFVzZXIoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnVzZXI7XHJcbiAgICB9XHJcbiAgfSIsImltcG9ydCB7IEFwcFV0aWwgfSBmcm9tICcuLi9jb3JlYXBwL2FwcHV0aWwuanMnO1xyXG5pbXBvcnQgeyBNSU5FU1dFRVBFUl9HUklEX1NJWkVTIH0gZnJvbSAnLi9taW5lc3dlZXBlcmNvbnN0YW50cy5qcyc7XHJcbmltcG9ydCB7IE1pbmVzd2VlcGVyR2FtZVN0YXRlIH0gZnJvbSAnLi9taW5lc3dlZXBlcmdhbWVzdGF0ZS5qcyc7XHJcbmltcG9ydCB7IE1pbmVzd2VlcGVyR2FtZUdyaWQgfSBmcm9tICcuL21pbmVzd2VlcGVyZ3JpZC5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgTWluZXN3ZWVwZXIge1xyXG4gICAgY29uc3RydWN0b3Iocm9vdENvbnRhaW5lclNlbGVjdG9yKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zU2VsZWN0b3IgPSAnI2dhbWUtb3B0aW9ucyc7XHJcbiAgICAgICAgdGhpcy5uZXdHYW1lU2VsZWN0b3IgPSAnI2dlbmVyYXRlLWdhbWUnO1xyXG4gICAgICAgIHRoaXMud2luU2VsZWN0b3IgPSAnI3dpbi1nYW1lJztcclxuICAgICAgICB0aGlzLmxvc2VTZWxlY3RvciA9ICcjbG9zZS1nYW1lJztcclxuICAgICAgICB0aGlzLmdyaWRTZWxlY3RvciA9ICcjZ3JpZCc7XHJcbiAgICAgICAgdGhpcy5yb290Q29udGFpbmVyU2VsZWN0b3IgPSByb290Q29udGFpbmVyU2VsZWN0b3I7XHJcbiAgICAgICAgdGhpcy51dGlsID0gbmV3IEFwcFV0aWwoKTtcclxuXHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz0nYXBwLWNvbnRhaW5lciBjb250YWluZXItc20nPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nY29udHJvbC1jb250YWluZXIgcm93Jz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdjb2wtMTIgY29sLXNtLTQgcC0xIHAtc20tMyBnLXNtLTInPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGlkPSdnYW1lLW9wdGlvbnMnIGNsYXNzPSdmb3JtLXNlbGVjdCc+PC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nY29sLTEyIGNvbC1zbS04IHAtMSBwLXNtLTMgZy1zbS0yJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiBpZD0nZ2VuZXJhdGUtZ2FtZScgdmFsdWU9J25ldyBnYW1lJyBjbGFzcz0nYnRuIGJ0bi1vdXRsaW5lLXByaW1hcnknPjwvaW5wdXQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2J0bi1ncm91cCc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGlkPSd3aW4tZ2FtZScgdmFsdWU9J2F1dG8gd2luJyBjbGFzcz0nYnRuIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSc+PC9pbnB1dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgaWQ9J2xvc2UtZ2FtZScgdmFsdWU9J2F1dG8gbG9zZScgY2xhc3M9J2J0biBidG4tb3V0bGluZS1zZWNvbmRhcnknPjwvaW5wdXQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdncmlkLWNvbnRhaW5lciByb3cnPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9J2dyaWQnIGNsYXNzPSdncmlkIGNvbC0xMiB1c2VyLXNlbGVjdC1ub25lIHB5LTQgcHgtMCc+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYDtcclxuICAgIH1cclxuICAgICAgICBcclxuICAgIC8vIG1ldGhvZHNcclxuICAgIE1vdW50Q29udHJvbHMoKSB7XHJcbiAgICAgICAgJCh0aGlzLnJvb3RDb250YWluZXJTZWxlY3RvcikuaHRtbCh0aGlzLnRlbXBsYXRlKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgJHNlbGVjdCA9ICQodGhpcy5vcHRpb25zU2VsZWN0b3IpO1xyXG5cclxuICAgICAgICBmb3IobGV0IGtleSBpbiBNSU5FU1dFRVBFUl9HUklEX1NJWkVTKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgJHNlbGVjdC5hcHBlbmQoJCgnPG9wdGlvbj4nLCB7IFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGtleSxcclxuICAgICAgICAgICAgICAgIHRleHQgOiBgJHtrZXl9ICgke01JTkVTV0VFUEVSX0dSSURfU0laRVNba2V5XS53aWR0aH14JHtNSU5FU1dFRVBFUl9HUklEX1NJWkVTW2tleV0uaGVpZ2h0fSwgJHtNSU5FU1dFRVBFUl9HUklEX1NJWkVTW2tleV0ubWluZXN9IG1pbmVzKWAgXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGJpbmQgZ2FtZSBnZW5lcmF0aW9uIGhhbmRsZXJzXHJcbiAgICAgICAgdGhpcy5CaW5kR2VuZXJhdGVOZXdHYW1lSGFuZGxlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIFVuTW91bnRDb250cm9scygpIHtcclxuICAgICAgICB0aGlzLlVuQmluZEdlbmVyYXRlTmV3R2FtZUhhbmRsZXIoKTtcclxuICAgICAgICAkKHRoaXMucm9vdENvbnRhaW5lclNlbGVjdG9yKS5odG1sKCcnKTtcclxuICAgIH1cclxuXHJcbiAgICBHZW5lcmF0ZU5ld0dhbWUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubWluZXN3ZWVwZXJVaSkge1xyXG4gICAgICAgICAgICB0aGlzLm1pbmVzd2VlcGVyVWkuVW5Nb3VudCgpOyAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0ICRzZWxlY3QgPSAkKHRoaXMub3B0aW9uc1NlbGVjdG9yKTtcclxuICAgICAgICBsZXQgc2VsZWN0ZWQgPSAkc2VsZWN0LmZpbmQoXCJvcHRpb246c2VsZWN0ZWRcIikudmFsKCk7XHJcbiAgICAgICAgbGV0IHNpemUgPSBNSU5FU1dFRVBFUl9HUklEX1NJWkVTW3NlbGVjdGVkXTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnV0aWwuTG9nKGBnZW5lcmF0ZSBuZXcgJHtzaXplLndpZHRofXgke3NpemUuaGVpZ2h0fSBnYW1lYCk7ICBcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIG5ldyBnYW1lIHN0YXRlXHJcbiAgICAgICAgbGV0IGdhbWVTdGF0ZSA9IG5ldyBNaW5lc3dlZXBlckdhbWVTdGF0ZShzaXplLCB0aGlzLnV0aWwpO1xyXG5cclxuICAgICAgICAvLyB1bmJpbmQgb2xkIGhhbmRsZXIsIGJpbmQgbmV3XHJcbiAgICAgICAgdGhpcy5VbkJpbmRHYW1lU3RhdGVIYW5kbGVycygpO1xyXG4gICAgICAgIHRoaXMuQmluZEdhbWVTdGF0ZUhhbmRsZXJzKGdhbWVTdGF0ZSk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBuZXcgdWlcclxuICAgICAgICB0aGlzLm1pbmVzd2VlcGVyVWkgPSBuZXcgTWluZXN3ZWVwZXJHYW1lR3JpZCgkKHRoaXMuZ3JpZFNlbGVjdG9yKSwgZ2FtZVN0YXRlLCB0aGlzLnV0aWwpO1xyXG4gICAgICAgIHRoaXMubWluZXN3ZWVwZXJVaS5Nb3VudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIEJpbmRHZW5lcmF0ZU5ld0dhbWVIYW5kbGVyKCkge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAkKHRoaXMubmV3R2FtZVNlbGVjdG9yKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7IHRoYXQuR2VuZXJhdGVOZXdHYW1lKCk7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIFVuQmluZEdlbmVyYXRlTmV3R2FtZUhhbmRsZXIoKSB7XHJcbiAgICAgICAgJCh0aGlzLm5ld0dhbWVTZWxlY3Rvcikub2ZmKCdjbGljaycpO1xyXG4gICAgfVxyXG5cclxuICAgIEJpbmRHYW1lU3RhdGVIYW5kbGVycyhnYW1lU3RhdGUpIHtcclxuICAgICAgICAkKHRoaXMud2luU2VsZWN0b3IpLm9mZignY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7IGdhbWVTdGF0ZS5UcmlnZ2VyQXV0b1dpbigpOyB9KTtcclxuICAgICAgICAkKHRoaXMubG9zZVNlbGVjdG9yKS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkgeyBnYW1lU3RhdGUuVHJpZ2dlckF1dG9Mb3NlKCk7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIFVuQmluZEdhbWVTdGF0ZUhhbmRsZXJzKCkge1xyXG4gICAgICAgICQodGhpcy53aW5TZWxlY3Rvcikub2ZmKCdjbGljaycpO1xyXG4gICAgICAgICQodGhpcy5sb3NlU2VsZWN0b3IpLm9mZignY2xpY2snKTtcclxuICAgIH1cclxuXHJcbiAgICBNb3VudCgpIHtcclxuICAgICAgICB0aGlzLnV0aWwuTG9nKFwibW91bnQgbWluZXN3ZWVwZXJhcHBcIik7XHJcbiAgICAgICAgdGhpcy5Nb3VudENvbnRyb2xzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgVW5Nb3VudCgpIHtcclxuICAgICAgICB0aGlzLnV0aWwuTG9nKFwidW5tb3VudCBtaW5lc3dlZXBlcmFwcFwiKTtcclxuXHJcbiAgICAgICAgLy8gdW5tb3VudCBnYW1lXHJcbiAgICAgICAgdGhpcy5VbkJpbmRHYW1lU3RhdGVIYW5kbGVycygpO1xyXG5cclxuICAgICAgICAvLyBtaWdodCB1bm1vdW50IGJlZm9yZSBhIGdhbWUgaGFzIGJlZW4gY3JlYXRlZFxyXG4gICAgICAgIGlmICh0aGlzLm1pbmVzd2VlcGVyVWkpIHtcclxuICAgICAgICAgICAgdGhpcy5taW5lc3dlZXBlclVpLlVuTW91bnQoKTsgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHVubW91bnQgY29udHJvbHNcclxuICAgICAgICB0aGlzLlVuTW91bnRDb250cm9scygpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNvbnN0IE1JTkVTV0VFUEVSX0dSSURfU0laRVMgPSB7XHJcbiAgICBiZWdpbm5lciA6IHsgd2lkdGg6IDksIGhlaWdodDogOSwgbWluZXM6IDEwLCBsYWJlbDogXCJiZWdpbm5lclwifSxcclxuICAgIGludGVybWVkaWF0ZTogeyB3aWR0aDogMTYsIGhlaWdodDogMTYsIG1pbmVzOiA0MCwgbGFiZWw6IFwiaW50ZXJtZWRpYXRlXCJ9LFxyXG4gICAgZXhwZXJ0OiB7IHdpZHRoOiAxNiwgaGVpZ2h0OiAyNiwgbWluZXM6IDg2LCBsYWJlbDogXCJleHBlcnRcIn0sXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgTUlORVNXRUVQRVJfR0FNRV9DT01QTEVUSU9OX1NUQVRFUyA9IHtcclxuICAgIHN0YXJ0ZWQ6IDAsXHJcbiAgICBjb21wbGV0ZWQ6IDEsXHJcbiAgICBmYWlsZWQ6IDJcclxufTtcclxuIiwiZXhwb3J0IGNsYXNzIE1pbmVzd2VlcGVyR2FtZUNlbGwge1xyXG4gICAgY29uc3RydWN0b3IoaSwgaiwgZ2FtZSkge1xyXG4gICAgICAgIHRoaXMuX2lkID0gYCR7aSArIFwiX1wiICsgan1gO1xyXG4gICAgICAgIHRoaXMuX2FkamFjZW50TWluZUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9pc01pbmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9pc0xvc2luZ01pbmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9pc1JldmVhbGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5faXNNYXJrZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9nYW1lID0gZ2FtZTtcclxuICAgICAgICB0aGlzLmkgPSBpO1xyXG4gICAgICAgIHRoaXMuaiA9IGo7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZ2V0dGVyc1xyXG4gICAgZ2V0IElkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcclxuICAgIH1cclxuICAgIGdldCBBZGphY2VudE1pbmVDb3VudCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYWRqYWNlbnRNaW5lQ291bnQ7XHJcbiAgICB9XHJcbiAgICBnZXQgSXNNaW5lKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc01pbmU7XHJcbiAgICB9XHJcbiAgICBnZXQgSXNMb3NpbmdNaW5lKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc0xvc2luZ01pbmU7XHJcbiAgICB9XHJcbiAgICBnZXQgSXNSZXZlYWxlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNSZXZlYWxlZDtcclxuICAgIH0gXHJcbiAgICBnZXQgSXNNYXJrZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzTWFya2VkO1xyXG4gICAgfSBcclxuICAgIGdldCByb3dJbmRleCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pO1xyXG4gICAgfVxyXG4gICAgZ2V0IGNvbEluZGV4KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmo7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIG1ldGhvZHNcclxuICAgIEluY3JlbWVudEFkamFjZW50TWluZUNvdW50KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9nYW1lLkdhbWVJc1BsYXlhYmxlKVxyXG4gICAgICAgICAgICB0aGlzLl9hZGphY2VudE1pbmVDb3VudCsrO1xyXG4gICAgfVxyXG4gICAgU2V0SXNNaW5lKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9nYW1lLkdhbWVJc1BsYXlhYmxlKVxyXG4gICAgICAgICAgICB0aGlzLl9pc01pbmUgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgU2V0SXNMb3NpbmdNaW5lKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9nYW1lLkdhbWVJc1BsYXlhYmxlKVxyXG4gICAgICAgICAgICB0aGlzLl9pc0xvc2luZ01pbmUgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgU2V0SXNSZXZlYWxlZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fZ2FtZS5HYW1lSXNQbGF5YWJsZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pc1JldmVhbGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIG5vIG5lZWQgZm9yIGl0IHRvIGJlIG1hcmtlZCBhbnkgbW9yZVxyXG4gICAgICAgICAgICB0aGlzLl9pc01hcmtlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0gIFxyXG4gICAgU2V0SXNNYXJrZWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2dhbWUuR2FtZUlzUGxheWFibGUpIFxyXG4gICAgICAgICAgICB0aGlzLl9pc01hcmtlZCA9IHRydWU7XHJcbiAgICB9IFxyXG59IiwiaW1wb3J0IHsgTWluZXN3ZWVwZXJHYW1lQ2VsbCB9IGZyb20gXCIuL21pbmVzd2VlcGVyZ2FtZWNlbGwuanNcIjtcclxuaW1wb3J0IHsgTUlORVNXRUVQRVJfR0FNRV9DT01QTEVUSU9OX1NUQVRFUyB9IGZyb20gXCIuL21pbmVzd2VlcGVyY29uc3RhbnRzLmpzXCI7XHJcbmltcG9ydCB7IGRlZmF1bHQgYXMgXyB9IGZyb20gJy4uL2NvcmVhcHAvbG9kYXNocG9seWZpbGwuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1pbmVzd2VlcGVyR2FtZVN0YXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKHNpemUsIGxvZ3V0aWwpIHtcclxuICAgICAgICAvLyBzdGF0ZVxyXG4gICAgICAgIHRoaXMuX2xvb2t1cCA9IHt9O1xyXG4gICAgICAgIHRoaXMuX2lkID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCk7XHJcbiAgICAgICAgdGhpcy5fY2VsbHMgPSBbXTsgXHJcbiAgICAgICAgdGhpcy5fbWluZUNlbGxzID0gW107XHJcbiAgICAgICAgdGhpcy5fc2l6ZSA9IHNpemU7IFxyXG4gICAgICAgIHRoaXMuX2dhbWVDb21wbGV0aW9uU3RhdGUgPSBNSU5FU1dFRVBFUl9HQU1FX0NPTVBMRVRJT05fU1RBVEVTLnN0YXJ0ZWQ7XHJcbiAgICAgICAgdGhpcy5fdXRpbCA9IGxvZ3V0aWw7XHJcblxyXG4gICAgICAgIC8vIHRyYWNrIGNsZWFyZWQgY2VsbHMgdnMgdG90YWwgY2VsbHMgbmVlZGVkIHRvIHdpblxyXG4gICAgICAgIHRoaXMuX3RvdGFsQ2VsbENvdW50VG9XaW4gPSBzaXplLndpZHRoKnNpemUuaGVpZ2h0IC0gc2l6ZS5taW5lcztcclxuICAgICAgICB0aGlzLl9jdXJyZW50Q2VsbENvdW50ID0gMDtcclxuXHJcbiAgICAgICAgLy8gdHJhY2tpbmcgc3RhcnQgdGltZVxyXG4gICAgICAgIHRoaXMuc3RhcnR0aW1lID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuc3RvcHRpbWUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5lbGFwc2VkVGltZSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgLy8gZm9yIGRpYWJsaW5nIHRoZSBnYW1lXHJcbiAgICAgICAgdGhpcy5fZ2FtZURpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmNzXHJcbiAgICAgICAgdGhpcy5fb25DZWxsU3RhdGVDaGFuZ2UgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5fb25HYW1lQ29tcGxldGlvblN0YXRlQ2hhbmdlID0gdW5kZWZpbmVkO1xyXG4gXHJcbiAgICAgICAgLy8gaW5pdCwgc3RhcnRpbmcgd2l0aCBjZWxscyB3aXRoIGdlbmVyaWMgdmFsdWVzXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX3NpemUuaGVpZ2h0OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHJvdyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHRoaXMuX3NpemUud2lkdGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld0NlbGwgPSBuZXcgTWluZXN3ZWVwZXJHYW1lQ2VsbChpLCBqLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdDZWxsSWQgPSBuZXdDZWxsLklkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9va3VwW25ld0NlbGxJZF0gPSBuZXdDZWxsO1xyXG4gICAgICAgICAgICAgICAgcm93LnB1c2gobmV3Q2VsbCk7ICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2NlbGxzLnB1c2gocm93KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHNwcmlua2xlIG1pbmVzXHJcbiAgICAgICAgbGV0IG1pbmVzID0gXy5zYW1wbGVTaXplKF8ucmFuZ2UoMCwgdGhpcy5fc2l6ZS53aWR0aCp0aGlzLl9zaXplLmhlaWdodCAtIDEpLCB0aGlzLl9zaXplLm1pbmVzKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBtaW5lcy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICBsZXQgcm93SW5kZXggPSBNYXRoLmZsb29yKG1pbmVzW2tdL3RoaXMuX3NpemUud2lkdGgpO1xyXG4gICAgICAgICAgICBsZXQgY29sSW5kZXggPSBtaW5lc1trXSAlIHRoaXMuX3NpemUud2lkdGg7XHJcbiAgICAgICAgICAgIGxldCBtaW5lQ2VsbCA9IHRoaXMuX2xvb2t1cFtgJHtyb3dJbmRleCArIFwiX1wiICsgY29sSW5kZXh9YF07XHJcblxyXG4gICAgICAgICAgICBtaW5lQ2VsbC5TZXRJc01pbmUoKTtcclxuICAgICAgICAgICAgdGhpcy5fbWluZUNlbGxzLnB1c2gobWluZUNlbGwpOyAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIGFkamFjZW50IG1pbmUgY291bnQgYnkgaXRlcmF0aW5nIGFsbCBtaW5lc1xyXG4gICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgbWluZXMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgbGV0IHJvd0luZGV4ID0gTWF0aC5mbG9vcihtaW5lc1trXS90aGlzLl9zaXplLndpZHRoKTtcclxuICAgICAgICAgICAgbGV0IGNvbEluZGV4ID0gbWluZXNba10gJSB0aGlzLl9zaXplLndpZHRoO1xyXG5cclxuICAgICAgICAgICAgbGV0IG90aGVyQ29vcmRzID0gdGhpcy5HZW5lcmF0ZUFkamFjZW50Q2VsbHMocm93SW5kZXgsIGNvbEluZGV4KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGZvcmVhY2ggYWRqYWNlbnQsIGlmIGl0IGlzbnQgYWxzbyBhIG1pbmUsIGluY3JlbWVudCBpdHMgYWRqYWNlbnQgbWluZSBjb3VudFxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG90aGVyQ29vcmRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWRqYWNlbnRDZWxsID0gdGhpcy5fbG9va3VwW2Ake290aGVyQ29vcmRzW2pdLnkgKyBcIl9cIiArIG90aGVyQ29vcmRzW2pdLnh9YF07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFhZGphY2VudENlbGwuSXNNaW5lKVxyXG4gICAgICAgICAgICAgICAgICAgIGFkamFjZW50Q2VsbC5JbmNyZW1lbnRBZGphY2VudE1pbmVDb3VudCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl91dGlsLkxvZyhgbmV3IGdhbWUgZ2VuZXJhdGVkYCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZ2V0dGVyc1xyXG4gICAgZ2V0IEdhbWVJc1BsYXlhYmxlKCkge1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5fZ2FtZURpc2FibGVkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBHYW1lSXNXb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dhbWVDb21wbGV0aW9uU3RhdGUgPT0gTUlORVNXRUVQRVJfR0FNRV9DT01QTEVUSU9OX1NUQVRFUy5jb21wbGV0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFNpemUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpemU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IElkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgRWxhcHNlZFRpbWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxhcHNlZFRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IEdhbWVDb21wbGV0aW9uU3RhdGUoZ2FtZUNvbXBsZXRpb25TdGF0ZSkge1xyXG4gICAgICAgIHRoaXMuX2dhbWVDb21wbGV0aW9uU3RhdGUgPSBnYW1lQ29tcGxldGlvblN0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBPbkNlbGxTdGF0ZUNoYW5nZShmbikge1xyXG4gICAgICAgIHRoaXMuX29uQ2VsbFN0YXRlQ2hhbmdlID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IEdhbWVEaXNhYmxlZChkaXNhYmxlZCkge1xyXG4gICAgICAgIHRoaXMuX2dhbWVEaXNhYmxlZCA9IGRpc2FibGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBPbkdhbWVDb21wbGV0aW9uU3RhdGVDaGFuZ2UoZm4pIHtcclxuICAgICAgICB0aGlzLl9vbkdhbWVDb21wbGV0aW9uU3RhdGVDaGFuZ2UgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICBHZW5lcmF0ZUFkamFjZW50Q2VsbHMocm93SW5kZXgsIGNvbEluZGV4KSB7XHJcbiAgICAgICAgLy8gZ2VuZXJhdGUgOCBhZGphY2VudCBjby1vcmRzLCBjbGFtcGVkIHRvIGluLWJvdW5kc1xyXG4gICAgICAgIGxldCBvdGhlckNvb3JkcyA9IFtdO1xyXG5cclxuICAgICAgICBpZiAocm93SW5kZXggLSAxID49IDApIHtcclxuICAgICAgICAgICAgaWYgKGNvbEluZGV4IC0gMSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBvdGhlckNvb3Jkcy5wdXNoKHt4OiBjb2xJbmRleC0xLCB5OnJvd0luZGV4LTF9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb3RoZXJDb29yZHMucHVzaCh7eDogY29sSW5kZXgsIHk6cm93SW5kZXgtMX0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbEluZGV4ICsgMSA8IHRoaXMuX3NpemUud2lkdGgpXHJcbiAgICAgICAgICAgICAgICBvdGhlckNvb3Jkcy5wdXNoKHt4OiBjb2xJbmRleCsxLCB5OnJvd0luZGV4LTF9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGNvbEluZGV4IC0gMSA+PSAwKSBcclxuICAgICAgICAgICAgb3RoZXJDb29yZHMucHVzaCh7eDogY29sSW5kZXgtMSwgeTpyb3dJbmRleH0pO1xyXG5cclxuICAgICAgICBpZiAoY29sSW5kZXggKyAxIDwgdGhpcy5fc2l6ZS53aWR0aClcclxuICAgICAgICAgICAgb3RoZXJDb29yZHMucHVzaCh7eDogY29sSW5kZXgrMSwgeTpyb3dJbmRleH0pO1xyXG5cclxuICAgICAgICBpZiAocm93SW5kZXggKyAxIDwgdGhpcy5fc2l6ZS5oZWlnaHQpIHtcclxuICAgICAgICAgICAgaWYgKGNvbEluZGV4IC0gMSA+PSAwKSBcclxuICAgICAgICAgICAgICAgIG90aGVyQ29vcmRzLnB1c2goe3g6IGNvbEluZGV4LTEsIHk6cm93SW5kZXgrMX0pO1xyXG5cclxuICAgICAgICAgICAgb3RoZXJDb29yZHMucHVzaCh7eDogY29sSW5kZXgsIHk6cm93SW5kZXgrMX0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbEluZGV4ICsgMSA8IHRoaXMuX3NpemUud2lkdGgpXHJcbiAgICAgICAgICAgICAgICBvdGhlckNvb3Jkcy5wdXNoKHt4OiBjb2xJbmRleCsxLCB5OnJvd0luZGV4KzF9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvdGhlckNvb3JkcztcclxuICAgIH1cclxuXHJcbiAgICBDZWxsQnlJZChjZWxsSWQpIHtcclxuICAgICAgICBsZXQgY2VsbCA9IHRoaXMuX2xvb2t1cFtjZWxsSWRdO1xyXG5cclxuICAgICAgICBpZiAoY2VsbCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB0aHJvdyBgY2VsbCB3aXRoIGlkICR7Y2VsbElkfSBjb3VsZCBub3QgYmUgZm91bmRgO1xyXG5cclxuICAgICAgICByZXR1cm4gY2VsbDtcclxuICAgIH1cclxuXHJcbiAgICBSZXZlYWxBbGxNaW5lcyAoKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9taW5lQ2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9taW5lQ2VsbHNbaV0uSXNSZXZlYWxlZClcclxuICAgICAgICAgICAgICAgIHRoaXMuX21pbmVDZWxsc1tpXS5TZXRJc1JldmVhbGVkKCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LkZpcmVDZWxsU3RhdGVDaGFuZ2UodGhpcy5fbWluZUNlbGxzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQXR0ZW1wdEF1dG9GaWxsKGNlbGwpIHtcclxuICAgICAgICBsZXQgYXV0b0ZpbGxzID0gdGhpcy5HZXRBZGphY2VudE5vbk1pbmVOb25SZXZlYWxlZENlbGxzKGNlbGwpO1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGF1dG9GaWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGF0LlNlbGVjdENlbGwoYXV0b0ZpbGxzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgR2V0QWRqYWNlbnROb25NaW5lTm9uUmV2ZWFsZWRDZWxscyhjZWxsKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGxldCBhZGpDZWxsSW5kaWNlcyA9IHRoaXMuR2VuZXJhdGVBZGphY2VudENlbGxzKGNlbGwucm93SW5kZXgsIGNlbGwuY29sSW5kZXgpO1xyXG4gICAgICAgIGxldCBhZGpDZWxscyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYWRqQ2VsbEluZGljZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGMgPSBhZGpDZWxsSW5kaWNlc1tpXTtcclxuICAgICAgICAgICAgbGV0IGFkamFjZW50Q2VsbCA9IHRoYXQuQ2VsbEJ5SWQoYCR7Yy55ICsgXCJfXCIgKyBjLnh9YCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWFkamFjZW50Q2VsbC5Jc01pbmUgJiYgIWFkamFjZW50Q2VsbC5Jc1JldmVhbGVkKVxyXG4gICAgICAgICAgICAgICAgYWRqQ2VsbHMucHVzaChhZGphY2VudENlbGwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFkakNlbGxzO1xyXG4gICAgfVxyXG5cclxuICAgIEZpcmVDZWxsU3RhdGVDaGFuZ2UgKGNoYW5nZWRDZWxsKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX29uQ2VsbFN0YXRlQ2hhbmdlKVxyXG4gICAgICAgICAgICB0aGlzLl9vbkNlbGxTdGF0ZUNoYW5nZShjaGFuZ2VkQ2VsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgRmlyZUdhbWVDb21wbGV0aW9uU3RhdGVDaGFuZ2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX29uR2FtZUNvbXBsZXRpb25TdGF0ZUNoYW5nZSlcclxuICAgICAgICAgICAgdGhpcy5fb25HYW1lQ29tcGxldGlvblN0YXRlQ2hhbmdlKHRoaXMuX2dhbWVDb21wbGV0aW9uU3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIE1hcmtDZWxsKGNlbGwpIHtcclxuICAgICAgICB0aGlzLl91dGlsLkxvZyhgbWFyayBjZWxsIGlkICR7Y2VsbC5JZH1gKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLkdhbWVJc1BsYXlhYmxlKSB7XHJcbiAgICAgICAgICAgIC8vIGRvbid0IGRvIGFueXRoaW5nXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghY2VsbC5Jc1JldmVhbGVkKSB7XHJcblxyXG4gICAgICAgICAgICBjZWxsLlNldElzTWFya2VkKCk7XHJcblxyXG4gICAgICAgICAgICAvLyB0cmlnZ2VyIGl0IHRvIHJlLXJlbmRlclxyXG4gICAgICAgICAgICB0aGlzLkZpcmVDZWxsU3RhdGVDaGFuZ2UoY2VsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIE1hcmtDZWxsYnlJZChjZWxsSWQpIHtcclxuICAgICAgICBsZXQgY2VsbCA9IHRoaXMuQ2VsbEJ5SWQoY2VsbElkKTsgICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMuTWFya0NlbGwoY2VsbCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFNlbGVjdENlbGwoY2VsbCkge1xyXG4gICAgICAgIHRoaXMuX3V0aWwuTG9nKGBzZWxlY3QgY2VsbCBpZCAke2NlbGwuSWR9YCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0dGltZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIC8vIHJlY29yZCBtaWxsaXMgc3RhcnQgdGltZVxyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0dGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuR2FtZUlzUGxheWFibGUpIHtcclxuICAgICAgICAgICAgLy8gZG9uJ3QgZG8gYW55dGhpbmdcclxuICAgICAgICAgICAgdGhpcy5fdXRpbC5Mb2coYGdhbWUgaGFzIGFscmVhZHkgYmVlbiAke3RoaXMuX2dhbWVDb21wbGV0aW9uU3RhdGUgPT0gTUlORVNXRUVQRVJfR0FNRV9DT01QTEVUSU9OX1NUQVRFUy5jb21wbGV0ZWQgPyBcIndvbiFcIiA6IFwibG9zdCFcIn1gKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFjZWxsLklzUmV2ZWFsZWQpIHtcclxuICAgICAgICAgICAgLy8gcmV2ZWFsIHRoaXMgY2VsbFxyXG4gICAgICAgICAgICBjZWxsLlNldElzUmV2ZWFsZWQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRyaWdnZXIgaXQgdG8gcmUtcmVuZGVyXHJcbiAgICAgICAgICAgIHRoaXMuRmlyZUNlbGxTdGF0ZUNoYW5nZShjZWxsKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjZWxsLklzTWluZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gb2ggb2hoLCBsb3N0LCBzbyBzdG9wIHRoZSBjbG9ja1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wdGltZSA9IERhdGUubm93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gbWFyayB0aGlzIG1pbmUgYXMgdGhlIG9uZSBoaXRcclxuICAgICAgICAgICAgICAgIGNlbGwuU2V0SXNMb3NpbmdNaW5lKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkdhbWVDb21wbGV0aW9uU3RhdGUgPSBNSU5FU1dFRVBFUl9HQU1FX0NPTVBMRVRJT05fU1RBVEVTLmZhaWxlZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmV2ZWFsQWxsTWluZXMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZURpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxhcHNlZFRpbWUgPSB0aGlzLnN0b3B0aW1lIC0gdGhpcy5zdGFydHRpbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91dGlsLkxvZyhgcGxheWVyIGhhcyBsb3N0IGluICR7dGhpcy5lbGFwc2VkVGltZX1gKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuRmlyZUdhbWVDb21wbGV0aW9uU3RhdGVDaGFuZ2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gICBcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyB5YXksIHlvdSBjbGVhcmVkIG9uZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudENlbGxDb3VudCsrO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIHBsYXllciBoYXMgd29uXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY3VycmVudENlbGxDb3VudCA9PSB0aGlzLl90b3RhbENlbGxDb3VudFRvV2luKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8geWF5XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wdGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5HYW1lQ29tcGxldGlvblN0YXRlID0gTUlORVNXRUVQRVJfR0FNRV9DT01QTEVUSU9OX1NUQVRFUy5jb21wbGV0ZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5SZXZlYWxBbGxNaW5lcygpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkdhbWVEaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGFwc2VkVGltZSA9IHRoaXMuc3RvcHRpbWUgLSB0aGlzLnN0YXJ0dGltZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl91dGlsLkxvZyhgcGxheWVyIGhhcyB3b24gaW4gJHt0aGlzLmVsYXBzZWRUaW1lfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuRmlyZUdhbWVDb21wbGV0aW9uU3RhdGVDaGFuZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBvdGhlcndpc2UsIGNlbGwgaXMgbm90IGEgbWluZSwgcGxheWVyIGhhcyBub3QgeWV0IHdvbiwgc28gYXR0ZW1wdCB0byBhdXRvZmlsbCBpZiB0aGUgY2VsbCBpcyBibGFua1xyXG4gICAgICAgICAgICBpZiAoY2VsbC5BZGphY2VudE1pbmVDb3VudCA9PSAwKSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICB0aGlzLkF0dGVtcHRBdXRvRmlsbChjZWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBTZWxlY3RDZWxsQnlJZChjZWxsSWQpIHtcclxuICAgICAgICBsZXQgY2VsbCA9IHRoaXMuQ2VsbEJ5SWQoY2VsbElkKTsgICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMuU2VsZWN0Q2VsbChjZWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBUcmlnZ2VyQXV0b1dpbigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuR2FtZUlzUGxheWFibGUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX2NlbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgbGV0IGlubmVyQXJyYXkgPSB0aGlzLl9jZWxsc1tpXTtcclxuXHJcbiAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IGlubmVyQXJyYXkubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICghaW5uZXJBcnJheVtqXS5Jc01pbmUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TZWxlY3RDZWxsKGlubmVyQXJyYXlbal0pO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgVHJpZ2dlckF1dG9Mb3NlKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5HYW1lSXNQbGF5YWJsZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB0aGlzLlNlbGVjdENlbGwodGhpcy5fbWluZUNlbGxzWzBdKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBTdGF0RGIgfSBmcm9tIFwiLi4vY29yZWFwcC9zdGF0ZGIuanNcIjtcclxuaW1wb3J0IHsgTUlORVNXRUVQRVJfR0FNRV9DT01QTEVUSU9OX1NUQVRFUyB9IGZyb20gXCIuL21pbmVzd2VlcGVyY29uc3RhbnRzLmpzXCI7XHJcbmltcG9ydCB7IE1pbmVzd2VlcGVyU2NvcmUgfSBmcm9tIFwiLi9taW5lc3dlZXBlcnNjb3JlLmpzXCI7XHJcbmltcG9ydCB7IFVzZXJVdGlsIH0gZnJvbSBcIi4uL2NvcmVhcHAvdXNlcnV0aWwuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNaW5lc3dlZXBlckdhbWVHcmlkIHtcclxuICAgIGNvbnN0cnVjdG9yKCRyb290RWxlbWVudCwgZ2FtZVN0YXRlLCBsb2dVdGlsKSB7XHJcbiAgICAgICAgdGhpcy4kcm9vdEVsZW1lbnQgPSAkcm9vdEVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSBnYW1lU3RhdGU7ICBcclxuICAgICAgICB0aGlzLmxvZ1V0aWwgPSBsb2dVdGlsO1xyXG4gICAgICAgIHRoaXMuc3RhdERiID0gbmV3IFN0YXREYigpO1xyXG4gICAgfSBcclxuXHJcbiAgICAvLyBtZXRob2RzXHJcblxyXG4gICAgR2V0Q2VsbENsYXNzKGNlbGwpIHtcclxuICAgICAgICBpZiAoIWNlbGwuSXNSZXZlYWxlZCkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY2VsbC5Jc01hcmtlZClcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImhpZGRlbiBtYXJrZWRcIjtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBcImhpZGRlblwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNlbGwuSXNNaW5lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjZWxsLklzTG9zaW5nTWluZSA/IFwibWluZSB0cmlnZ2VyZWRcIiA6IFwibWluZSBcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGNlbGwuQWRqYWNlbnRNaW5lQ291bnQgPiAwKSBcclxuICAgICAgICAgICAgcmV0dXJuIGBvcGVuLSR7Y2VsbC5BZGphY2VudE1pbmVDb3VudH1gO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBcImNsZWFyXCI7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0Q2VsbENvbnRlbnQoY2VsbCkge1xyXG4gICAgICAgIGxldCBjZWxsR2x5cGggPSBjZWxsLklzUmV2ZWFsZWQgPyBcclxuICAgICAgICAoY2VsbC5Jc01pbmUgPyBcclxuICAgICAgICAgICAgXCLwn5KjXCIgOiBcclxuICAgICAgICAgICAgICAgIChjZWxsLkFkamFjZW50TWluZUNvdW50ID4gMCA/IGNlbGwuQWRqYWNlbnRNaW5lQ291bnQgOiBcIlwiKVxyXG4gICAgICAgICkgXHJcbiAgICAgICAgOiBcIlwiO1xyXG5cclxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9J2NlbGwtaW5uZXInPiR7Y2VsbEdseXBofTwvZGl2PmA7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0SW5pdGlhbENlbGxIdG1sKGNlbGxJZCkge1xyXG4gICAgICAgIGxldCBjZWxsID0gdGhpcy5nYW1lU3RhdGUuQ2VsbEJ5SWQoY2VsbElkKTtcclxuXHJcbiAgICAgICAgbGV0IGNlbGxDbGFzcyA9IHRoaXMuR2V0Q2VsbENsYXNzKGNlbGwpO1xyXG4gICAgICAgIGxldCBjZWxsQ29udGVudCA9IHRoaXMuR2V0Q2VsbENvbnRlbnQoY2VsbCk7XHJcblxyXG4gICAgICAgIHJldHVybiBgPHRkIGNsYXNzPSdjZWxsICR7Y2VsbENsYXNzfScgaWQ9JyR7Y2VsbElkfSc+JHtjZWxsQ29udGVudH08L3RkPmA7XHJcbiAgICB9XHJcblxyXG4gICAgUmVtb3ZlSGFuZGxlcnMoKSB7XHJcbiAgICAgICAgdGhpcy4kcm9vdEVsZW1lbnQuZmluZCgndGFibGUnKVxyXG4gICAgICAgICAgICAub2ZmKCdjb250ZXh0bWVudScpXHJcbiAgICAgICAgICAgIC5vZmYoJ2NsaWNrJyk7XHJcbiAgICB9XHJcblxyXG4gICAgQWRkSGFuZGxlcnMoKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyBhZGQgc3VwcHJlc3MgY29udGV4dCBtZW51XHJcbiAgICAgICAgdGhpcy4kcm9vdEVsZW1lbnQuZmluZCgndGFibGUnKS5vbignY29udGV4dG1lbnUnLCAndGQuY2VsbCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLndoaWNoID09IDMpIHtcclxuICAgICAgICAgICAgICAgIC8vIHJpZ2h0IG1vdXNlXHJcbiAgICAgICAgICAgICAgICB0aGF0LmdhbWVTdGF0ZS5NYXJrQ2VsbGJ5SWQoZS5jdXJyZW50VGFyZ2V0LmlkKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBhZGQgc2VsZWN0IGhhbmRsbGVyXHJcbiAgICAgICAgdGhpcy4kcm9vdEVsZW1lbnQuZmluZCgndGFibGUnKS5vbignY2xpY2snLCAndGQuY2VsbCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgaWYoZS53aGljaCA9PSAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBsZWZ0LW1vdXNlXHJcbiAgICAgICAgICAgICAgICB0aGF0LmdhbWVTdGF0ZS5TZWxlY3RDZWxsQnlJZChlLmN1cnJlbnRUYXJnZXQuaWQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5sb2dVdGlsLkxvZyhcIm1vdW50IG1pbmVzd2VlcGVyZ3JpZFwiKTtcclxuXHJcbiAgICAgICAgLy8gcmVtb3ZlIGFueSBleGlzdGluZyBoYW5kbGVyc1xyXG4gICAgICAgIHRoaXMuUmVtb3ZlSGFuZGxlcnMoKTtcclxuXHJcbiAgICAgICAgbGV0IHN0YWNrID0gW107XHJcblxyXG4gICAgICAgIC8vIHRlbXBsYXRlIGh0bWwgY2VsbCBjb250ZW50XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZ2FtZVN0YXRlLlNpemUuaGVpZ2h0OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHJvd0h0bWwgPSBcIjx0cj5cIjtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHRoaXMuZ2FtZVN0YXRlLlNpemUud2lkdGg7IGorKykgeyAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJvd0h0bWwgKz0gdGhpcy5HZXRJbml0aWFsQ2VsbEh0bWwoIGkgKyBcIl9cIiArIGopO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJvd0h0bWwgKz0gXCI8L3RyPlwiO1xyXG4gICAgICAgICAgICBzdGFjay5wdXNoKHJvd0h0bWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gcmVuZGVyXHJcbiAgICAgICAgdGhpcy4kcm9vdEVsZW1lbnQuaHRtbChgPHRhYmxlIGNsYXNzPScke3RoaXMuZ2FtZVN0YXRlLlNpemUubGFiZWx9Jz48dGJvZHk+JHtzdGFjay5qb2luKFwiXCIpfTwvdGJvZHk+PC90YWJsZT5gKTsgXHJcblxyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAvLyBhZGQgY2VsbCBzdGF0ZSBjaGFuZ2UgY2FsbGJhY2sgZm9yIHJlbmRlcmluZyBpbmRpdmlkdWFsIGNlbGxzXHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUuT25DZWxsU3RhdGVDaGFuZ2UgPSBmdW5jdGlvbihjZWxsKSB7XHJcbiAgICAgICAgICAgIC8vIHJlLXJlbmRlciB0aGUgY2VsbFxyXG4gICAgICAgICAgICB0aGF0LmxvZ1V0aWwuTG9nKGByZW5kZXIgY2VsbCAke2NlbGwuSWR9IGluIGdhbWUgd2l0aCBpZCAke3RoYXQuZ2FtZVN0YXRlLklkfWApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGNlbGxDbGFzcyA9IHRoYXQuR2V0Q2VsbENsYXNzKGNlbGwpO1xyXG4gICAgICAgICAgICBsZXQgY2VsbENvbnRlbnQgPSB0aGF0LkdldENlbGxDb250ZW50KGNlbGwpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJChgIyR7Y2VsbC5JZH1gKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKClcclxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhgY2VsbCAke2NlbGxDbGFzc31gKSBcclxuICAgICAgICAgICAgICAgIC5odG1sKGNlbGxDb250ZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBnYW1lIGNvbXBsZXRpb24gc3RhdGUgaGFuZGxlclxyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlLk9uR2FtZUNvbXBsZXRpb25TdGF0ZUNoYW5nZSA9IGZ1bmN0aW9uKGdhbWVDb21wbGV0aW9uU3RhdGUpIHtcclxuICAgICAgICAgICAgaWYgKGdhbWVDb21wbGV0aW9uU3RhdGUgPT0gTUlORVNXRUVQRVJfR0FNRV9DT01QTEVUSU9OX1NUQVRFUy5jb21wbGV0ZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuJHJvb3RFbGVtZW50LmFwcGVuZChcIjxkaXYgY2xhc3M9J2VuZC1zdGF0ZSc+PGltZyBzcmM9Jy4vaW1nL3dpbi5naWYnPjwvaW1nPjwvZGl2PlwiKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IHVzZXJVdGlsID0gbmV3IFVzZXJVdGlsKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodXNlclV0aWwuSXNMb2dnZWRJbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzY29yZSA9IG5ldyBNaW5lc3dlZXBlclNjb3JlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdhbWVTdGF0ZS5TaXplLmxhYmVsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlclV0aWwuVXNlci5kaXNwbGF5TmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJVdGlsLlVzZXIudWlkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5nYW1lU3RhdGUuRWxhcHNlZFRpbWUpLlBlcnNpc3RhYmxlRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnN0YXREYi5BZGRTY29yZShzY29yZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChnYW1lQ29tcGxldGlvblN0YXRlID09IE1JTkVTV0VFUEVSX0dBTUVfQ09NUExFVElPTl9TVEFURVMuZmFpbGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LiRyb290RWxlbWVudC5hcHBlbmQoXCI8ZGl2IGNsYXNzPSdlbmQtc3RhdGUnPjxpbWcgc3JjPScuL2ltZy9sb3NlLmdpZic+PC9pbWc+PC9kaXY+XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gYmluZCBoYW5kbGVyc1xyXG4gICAgICAgIHRoaXMuQWRkSGFuZGxlcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBVbk1vdW50KCkge1xyXG4gICAgICAgIHRoaXMubG9nVXRpbC5Mb2coXCJ1bm1vdW50IG1pbmVzd2VlcGVyZ3JpZFwiKTtcclxuICAgICAgICB0aGlzLlJlbW92ZUhhbmRsZXJzKCk7XHJcbiAgICAgICAgdGhpcy4kcm9vdEVsZW1lbnQuaHRtbCgnJyk7IFxyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIE1pbmVzd2VlcGVyU2NvcmUge1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZXR5cGUsIG5hbWUsIHVpZCwgdGltZSkge1xyXG4gICAgICAgIHRoaXMuUGVyc2lzdGFibGUgPSB7XHJcbiAgICAgICAgICAgIGdhbWU6IFwibWluZXN3ZWVwZXJcIixcclxuICAgICAgICAgICAgZ2FtZWFsaWFzOiBcIiYjNjI1O1wiLFxyXG4gICAgICAgICAgICBnYW1ldHlwZTogZ2FtZXR5cGUsXHJcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgIHVpZDogdWlkLFxyXG4gICAgICAgICAgICB0aW1lOiB0aW1lXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgUGVyc2lzdGFibGVEYXRhKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlBlcnNpc3RhYmxlO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgQXBwVXRpbCB9IGZyb20gJy4uL2NvcmVhcHAvYXBwdXRpbC5qcyc7XHJcbmltcG9ydCB7IFN0YXREYiB9IGZyb20gJy4uL2NvcmVhcHAvc3RhdGRiLmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBTdGF0cyB7XHJcbiAgICBjb25zdHJ1Y3Rvcihyb290Q29udGFpbmVyU2VsZWN0b3IpIHtcclxuICAgICAgICB0aGlzLnJvb3RDb250YWluZXJTZWxlY3RvciA9IHJvb3RDb250YWluZXJTZWxlY3RvcjtcclxuICAgICAgICB0aGlzLnNjb3JlR3JpZElkID0gJ3Njb3Jlcy1ncmlkJztcclxuICAgICAgICB0aGlzLnV0aWwgPSBuZXcgQXBwVXRpbCgpO1xyXG4gICAgICAgIHRoaXMuc3RhdHNkYiA9IG5ldyBTdGF0RGIoKTtcclxuICAgICAgICB0aGlzLnBhZ2VTdGFydCA9IDA7XHJcbiAgICAgICAgdGhpcy5wYWdlU2l6ZSA9IDEwO1xyXG5cclxuICAgICAgICB0aGlzLnRlbXBsYXRlID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPSdhcHAtY29udGFpbmVyIGNvbnRhaW5lci1zbSc+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdyb3cnPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2NvbC0xMiBwLTEgcC1zbS0zIHB5LXNtLTIgZy1zbS0yJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtc3RyaXBlZCB0YWJsZS1ib3JkZXJsZXNzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc2NvcGU9XCJjb2xcIj4jPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHNjb3BlPVwiY29sXCI+dXNlcjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzY29wZT1cImNvbFwiPmRpZmZpY3VsdHk8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc2NvcGU9XCJjb2xcIj50aW1lPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keSBpZD0nJHt0aGlzLnNjb3JlR3JpZElkfSc+PC90Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdjb2wtMTIgcC0xIHAtc20tMyBweS1zbS0yIGctc20tMiBkLW5vbmUgY29udGVudC1qdXN0aWZ5LWNlbnRlcicgaWQ9J3BhZ2luZyc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxuYXYgYXJpYS1sYWJlbD1cIi4uLlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwicGFnaW5hdGlvbiBwYWdpbmF0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGlkPVwicGctcHJldlwiIGNsYXNzPVwiZGlzYWJsZWQgcGFnZS1pdGVtXCIgdGl0bGU9XCJzaG93IG1lIHRoZSBwcmV2aW91cyBzY29yZXNcIj48YSBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWY9XCIjL3N0YXRzXCI+Jmx0OyBwcmV2PC9hPjwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGlkPSdwZy1uZXh0JyBjbGFzcz1cImRpc2FibGVkIHBhZ2UtaXRlbVwiIHRpdGxlPVwic2hvdyBtZSB0aGUgbmV4dCBzY29yZXNcIj48YSBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWY9XCIjL3N0YXRzXCI+bmV4dCAmZ3Q7PC9hPjwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L25hdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgLy8gbWV0aG9kc1xyXG4gICAgTW91bnRTdGF0cyhyZXN1bHRzKSB7XHJcbiAgICAgICAgLy8gcmVjb3JkIHdoZXJlIHdlIGFyZSBhdCBmb3IgbmV4dCBwYWdpbmdcclxuICAgICAgICB0aGlzLnBhZ2VTdGFydCA9ICByZXN1bHRzLnN0YXJ0QXQ7XHJcblxyXG4gICAgICAgIC8vIGNvc21ldGljIGluZGV4IGZvciBkaXNwbGF5XHJcbiAgICAgICAgbGV0IHN0YXJ0SW5kZXggPSByZXN1bHRzLnN0YXJ0QXQ7XHJcbiAgICAgICAgbGV0IHN0YWNrID0gcmVzdWx0cy5kYXRhLm1hcCgoZCkgPT4ge1xyXG4gICAgICAgICAgICBzdGFydEluZGV4Kys7XHJcbiAgICAgICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgICAgICA8dHIgaWQ9JyR7ZC5kb2NpZH0nPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZD4ke3N0YXJ0SW5kZXh9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGQ+JHtkLm5hbWV9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGQ+JHtkLmdhbWV0eXBlfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkPiR7KGQudGltZSAvIDEwMDApLnRvRml4ZWQoMSl9PC90ZD5cclxuICAgICAgICAgICAgICAgIDwvdHI+YDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gc2hvdyB0aGUgc2NvcmVzXHJcbiAgICAgICAgJChgIyR7dGhpcy5zY29yZUdyaWRJZH1gKS5odG1sKHN0YWNrLmpvaW4oJycpKTtcclxuXHJcbiAgICAgICAgLy8gc2hvdyB0aGUgcGFnaW5nLCByZWJpbmQgaGFuZGxlcnNcclxuICAgICAgICBpZiAocmVzdWx0cy5oYXNOZXh0IHx8IHJlc3VsdHMuaGFzUHJldikge1xyXG4gICAgICAgICAgICAkKCcjcGFnaW5nJylcclxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnZC1ub25lJylcclxuICAgICAgICAgICAgICAgIC5maW5kKCcjcGctcHJldicpXHJcbiAgICAgICAgICAgICAgICAub2ZmKCdjbGljaycpXHJcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2Rpc2FibGVkJylcclxuICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJyNwZy1uZXh0JylcclxuICAgICAgICAgICAgICAgIC5vZmYoJ2NsaWNrJylcclxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHRzLmhhc1ByZXYpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwcmV2ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5RdWVyeURhdGEodGhpcy5wYWdlU3RhcnQgLSB0aGlzLnBhZ2VTaXplLCB0aGlzLnBhZ2VTaXplKTtcclxuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcjcGctcHJldicpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdjbGljaycsIHByZXYpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0cy5oYXNOZXh0KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV4dCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUXVlcnlEYXRhKHRoaXMucGFnZVN0YXJ0ICsgdGhpcy5wYWdlU2l6ZSwgdGhpcy5wYWdlU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnI3BnLW5leHQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBuZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBRdWVyeURhdGEocGFnZVN0YXJ0LCBwYWdlU2l6ZSkge1xyXG4gICAgICAgIHRoaXMuc3RhdHNkYi5HZXRTY29yZXMocGFnZVN0YXJ0LCBwYWdlU2l6ZSwgdGhpcy5Nb3VudFN0YXRzLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIFVuTW91bnRDb250cm9scygpIHtcclxuICAgICAgICAkKHRoaXMucm9vdENvbnRhaW5lclNlbGVjdG9yKS5odG1sKCcnKTtcclxuICAgIH1cclxuXHJcbiAgICBNb3VudCgpIHtcclxuICAgICAgICB0aGlzLnV0aWwuTG9nKFwibW91bnQgYXBwc3RhdHNcIik7XHJcbiAgICAgICAgJCh0aGlzLnJvb3RDb250YWluZXJTZWxlY3RvcikuaHRtbCh0aGlzLnRlbXBsYXRlKTtcclxuXHJcbiAgICAgICAgLy8gcXVlcnkgaW5pdGFsIGRhdGFcclxuICAgICAgICB0aGlzLlF1ZXJ5RGF0YSh0aGlzLnBhZ2VTdGFydCwgdGhpcy5wYWdlU2l6ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgVW5Nb3VudCgpIHtcclxuICAgICAgICB0aGlzLnV0aWwuTG9nKFwidW5tb3VudCBhcHBzdGF0c1wiKTtcclxuICAgICAgICB0aGlzLlVuTW91bnRDb250cm9scygpO1xyXG4gICAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBOYXZpZ2F0aW9uIH0gZnJvbSAnLi9uYXZpZ2F0aW9uLmpzJztcclxuaW1wb3J0IHsgTWluZXN3ZWVwZXIgfSBmcm9tICcuLi9taW5lc3dlZXBlci9taW5lc3dlZXBlcmFwcC5qcyc7XHJcbmltcG9ydCB7IEVycm9yIH0gZnJvbSAnLi9lcnJvci5qcyc7XHJcbmltcG9ydCB7IEFwcFJvdXRlIH0gZnJvbSAnLi9hcHByb3V0ZSc7XHJcbmltcG9ydCB7IEFwcFJvdXRlciB9IGZyb20gJy4vYXBwcm91dGVyJztcclxuaW1wb3J0IHsgQXBwU3RhdHMgfSBmcm9tICcuLy4uL3N0YXRzL2FwcHN0YXRzLmpzJztcclxuXHJcbmNsYXNzIEFwcCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLiRyb290QXBwQ29udGFpbmVyID0gJyNhcHAtbWFpbic7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXMgPSBbXHJcbiAgICAgICAgICAgIG5ldyBBcHBSb3V0ZShcIi9cIiwgZnVuY3Rpb24oKSB7IHJldHVybiBuZXcgTWluZXN3ZWVwZXIodGhpcy4kcm9vdEFwcENvbnRhaW5lcik7IH0uYmluZCh0aGlzKSksXHJcbiAgICAgICAgICAgIG5ldyBBcHBSb3V0ZShcIi9zdGF0c1wiLCBmdW5jdGlvbigpIHsgcmV0dXJuIG5ldyBBcHBTdGF0cyh0aGlzLiRyb290QXBwQ29udGFpbmVyKTsgfS5iaW5kKHRoaXMpKSxcclxuICAgICAgICAgICAgbmV3IEFwcFJvdXRlKFwiL2Vycm9yXCIsIGZ1bmN0aW9uKCkgeyByZXR1cm4gbmV3IEVycm9yKHRoaXMuJHJvb3RBcHBDb250YWluZXIpOyB9LmJpbmQodGhpcykpXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICBNb3VudCgpIHtcclxuICAgICAgICBuZXcgQXBwUm91dGVyKHRoaXMucm91dGVzKTtcclxuICAgICAgICBuZXcgTmF2aWdhdGlvbigpOyAgICAgICBcclxuICAgIH1cclxufVxyXG5cclxuLy8gc3RhcnRcclxubmV3IEFwcCgpLk1vdW50KCk7XHJcblxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==