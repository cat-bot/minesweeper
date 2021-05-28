import { MinesweeperGameCell } from "./minesweepergamecell.js";
import { MINESWEEPER_GAME_COMPLETION_STATES } from "./minesweeperconstants.js";
import { default as _ } from '../coreapp/lodashpolyfill.js';

export class MinesweeperGameState {
    constructor(size, logutil) {
        // state
        this._lookup = {};
        this._id = Math.floor(Date.now() / 1000);
        this._cells = []; 
        this._mineCells = [];
        this._size = size; 
        this._gameCompletionState = MINESWEEPER_GAME_COMPLETION_STATES.started;
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
                let newCell = new MinesweeperGameCell(i, j, this);
                let newCellId = newCell.Id;
                this._lookup[newCellId] = newCell;
                row.push(newCell);               
            }

            this._cells.push(row);
        }

        // sprinkle mines
        let mines = _.sampleSize(_.range(0, this._size.width*this._size.height - 1), this._size.mines);

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
        return this._gameCompletionState == MINESWEEPER_GAME_COMPLETION_STATES.completed;
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
            this._util.Log(`game has already been ${this._gameCompletionState == MINESWEEPER_GAME_COMPLETION_STATES.completed ? "won!" : "lost!"}`);
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
                this.GameCompletionState = MINESWEEPER_GAME_COMPLETION_STATES.failed;
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
                    this.GameCompletionState = MINESWEEPER_GAME_COMPLETION_STATES.completed;
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
