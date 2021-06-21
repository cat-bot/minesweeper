import { StatDb } from "../coreapp/statdb.js";
import { MINESWEEPER_GAME_COMPLETION_STATES } from "./minesweeperconstants.js";
import { MinesweeperScore } from "./minesweeperscore.js";
import { UserUtil } from "../coreapp/userutil.js";

export class MinesweeperGameGrid {
    constructor($rootElement, gameState, logUtil) {
        this.$rootElement = $rootElement;
        this.gameState = gameState;  
        this.logUtil = logUtil;
        this.statDb = new StatDb();
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
            if (gameCompletionState == MINESWEEPER_GAME_COMPLETION_STATES.completed) {
                that.$rootElement.append("<div class='end-state'><img src='./img/win.gif'></img></div>");
                
                if (that.gameState.WonByAutoWin) {
                    // no score for you
                    that.logUtil.Log("no score submitted");
                    return;
                }

                let userUtil = new UserUtil();
                if (userUtil.IsLoggedIn) {
                    that.logUtil.Log("submit score");
                    let score = new MinesweeperScore(
                        that.gameState.Size.label, 
                        userUtil.User.displayName, 
                        userUtil.User.uid, 
                        that.gameState.ElapsedTime).PersistableData;
                    that.statDb.AddScore(score);
                    that.logUtil.Log("score submitted");
                }
            }
            
            if (gameCompletionState == MINESWEEPER_GAME_COMPLETION_STATES.failed) {
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