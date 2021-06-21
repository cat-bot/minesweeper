export class MinesweeperGameCell {
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