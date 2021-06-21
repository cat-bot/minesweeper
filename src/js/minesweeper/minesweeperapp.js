import { AppUtil } from '../coreapp/apputil.js';
import { MINESWEEPER_GRID_SIZES } from './minesweeperconstants.js';
import { MinesweeperGameState } from './minesweepergamestate.js';
import { MinesweeperGameGrid } from './minesweepergrid.js';

export class Minesweeper {
    constructor(rootContainerSelector) {
        this.optionsSelector = '#game-options';
        this.newGameSelector = '#generate-game';
        this.winSelector = '#win-game';
        this.loseSelector = '#lose-game';
        this.gridSelector = '#grid';
        this.rootContainerSelector = rootContainerSelector;
        this.util = new AppUtil();

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

        for(let key in MINESWEEPER_GRID_SIZES)
        {
            $select.append($('<option>', { 
                value: key,
                text : `${key} (${MINESWEEPER_GRID_SIZES[key].width}x${MINESWEEPER_GRID_SIZES[key].height}, ${MINESWEEPER_GRID_SIZES[key].mines} mines)` 
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
        let size = MINESWEEPER_GRID_SIZES[selected];
        
        this.util.Log(`generate new ${size.width}x${size.height} game`);  

        // create new game state
        let gameState = new MinesweeperGameState(size, this.util);

        // unbind old handler, bind new
        this.UnBindGameStateHandlers();
        this.BindGameStateHandlers(gameState);

        // create new ui
        this.minesweeperUi = new MinesweeperGameGrid($(this.gridSelector), gameState, this.util);
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