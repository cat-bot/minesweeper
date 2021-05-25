(function($) {
    "use strict";

    let util = new MineSweeperUtil();
    let g_auth = new GoogleAuthHandler();

    function InitControls() {
        // populate game options
        let $select = $('#game-options');

        for(let key in GRID_SIZES)
        {
            $select.append($('<option>', { 
                    value: key,
                    text : `${key} (${GRID_SIZES[key].width}x${GRID_SIZES[key].height}, ${GRID_SIZES[key].mines} mines)` 
                }));
        }

        // bind game generation handlers
        $("#generate-game").on('click', function(e) {       
           GenerateNewGame();
        });

        g_auth.OnSignIn = function(googleUser) {
            let $loginUI = $("#login-ui-container");

            $loginUI
                .find("#login-prompt")
                .toggleClass('d-none')
                .end()
                .find("#login-profile")
                .prop('src', googleUser.User.photoURL)
                .prop('alt', 'logged in as ' + googleUser.User.displayName)
                .toggleClass('d-none');
        } 

        // bind log in
        $("#login-prompt").on('click', function(e) {     
            g_auth.GoogleSignInPopup();
        });
    };

    function GenerateNewGame() {
        let $select = $('#game-options');
        let selected = $select.find("option:selected").val();
        let size = GRID_SIZES[selected];
        
        util.Log(`generate new ${size.width}x${size.height} game`);  

        // create new game state
        let gameState = new GameState(size, util);

        $("#win-game").off('click').on('click', function(e) {       
            gameState.TriggerAutoWin();
        });

        $("#lose-game").off('click').on('click', function(e) {       
            gameState.TriggerAutoLose();
        });

        // create new ui
        let game = new GameGrid($('#grid'), gameState, util);
        game.Start();
    };

    (function StartMineSweeper() {
        InitControls(); 
    })();

})(jQuery);