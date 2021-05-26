(function($) {
    "use strict";

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
    };

    function GenerateNewGame() {
        let util = new AppUtil();
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

    (function() {
        InitControls(); 
    })();

})(jQuery);