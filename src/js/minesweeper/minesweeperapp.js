import { AppUtil } from '../coreapp/util.js';
import { MINESWEEPER_GRID_SIZES } from './minesweeperconstants.js';
import { MinesweeperGameState } from './minesweepergamestate.js';
import { MinesweeperGameGrid } from './minesweepergrid.js';

let Minesweeper = (function($) {
    "use strict";

    function InitControls() {
        // populate game options
        let $select = $('#game-options');

        for(let key in MINESWEEPER_GRID_SIZES)
        {
            $select.append($('<option>', { 
                    value: key,
                    text : `${key} (${MINESWEEPER_GRID_SIZES[key].width}x${MINESWEEPER_GRID_SIZES[key].height}, ${MINESWEEPER_GRID_SIZES[key].mines} mines)` 
                }));
        }

        // bind game generation handlers
        $("#generate-game").on('click', function(e) {       
           GenerateNewGame();
        });
    }

    function GenerateNewGame() {
        let util = new AppUtil();
        let $select = $('#game-options');
        let selected = $select.find("option:selected").val();
        let size = MINESWEEPER_GRID_SIZES[selected];
        
        util.Log(`generate new ${size.width}x${size.height} game`);  

        // create new game state
        let gameState = new MinesweeperGameState(size, util);

        $("#win-game").off('click').on('click', function(e) {       
            gameState.TriggerAutoWin();
        });

        $("#lose-game").off('click').on('click', function(e) {       
            gameState.TriggerAutoLose();
        });

        // create new ui
        let game = new MinesweeperGameGrid($('#grid'), gameState, util);
        game.Start();
    }

    (function() {
        InitControls(); 
    })();

})(jQuery);

export default Minesweeper;