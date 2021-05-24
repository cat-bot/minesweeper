// import * as Util from './modules/util.js';
// import { GAME_COMPLETION_STATES } from './constants.js';

class GameCell {
    constructor(i, j, game) {
        this._id = `${i + "_" + j}`;
        this._adjacentMineCount = 0;
        this._isMine = false;
        this._isRevealed = false;
        this._game = game;
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
    get IsRevealed() {
        return this._isRevealed;
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
    SetIsRevealed() {
        if (this._game.GameIsPlayable) 
            this._isRevealed = true;
    }   
}

class GameState {
    constructor(size) {

        // state
        this._lookup = {};
        this._id = Math.floor( Date.now() / 1000 );
        this._cells = []; 
        this._mineCells = [];
        this._size = size; 
        this._gameCompletionState = GAME_COMPLETION_STATES.started;
        this._onCellStateChange = undefined;
        this._util =  new MineSweeperUtil();
 
        // init, starting with cells with generic values
        for(let i = 0; i < this._size.height; i++) {
            let row = [];

            for(let j = 0; j < this._size.width; j++) {
                let newCell = new GameCell(i, j, this);
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

            // foreach adjacent, if it isnt also a mine, increment its adjacent mine count
            for (let j = 0; j < otherCoords.length; j++) {
                let adjacentCell = this._lookup[`${otherCoords[j].y + "_" + otherCoords[j].x}`];

                if (!adjacentCell.IsMine)
                    adjacentCell.IncrementAdjacentMineCount();
            }
        }

        this._util.Log(`new game generated with id ${this._id}`);
    }

    // getters
    get GameIsPlayable() {
        return this._gameCompletionState == GAME_COMPLETION_STATES.started;
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

    FireCellStateChange (changedCell) {
        if (this._onCellStateChange)
            this._onCellStateChange(changedCell);
    }

    SelectCell(cellId) {
        this._util.Log(`select cell id ${cellId} in game with id ${this._id}`);

        let cell = this.CellById(cellId);       

        if (!this.GameIsPlayable) {
            // don't do anything
            this._util.Log(`game with id ${this._id} is failed`);
            return;
        }

        if (!cell.IsRevealed) {
            // reveal this cell
            cell.SetIsRevealed();

            // trigger it to re-render
            this.FireCellStateChange(cell);

            if (cell.IsMine) {
                // oh ohh
                this._util.Log(`player failed in game with id ${this._id}. revealing all mines`);
                this.RevealAllMines();
                this.GameCompletionState = GAME_COMPLETION_STATES.failed;
            }                      
        }
    }
};
