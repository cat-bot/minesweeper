class GameGrid {
    constructor($rootElement, gameState, logUtil) {
        this.$rootElement = $rootElement;
        this.gameState = gameState;  
        this.logUtil = logUtil;
        this.stack = [];
    }

    // methods

    GetCellClass(cell) {
        if (!cell.IsRevealed)
            return "hidden";

        if (cell.IsMine)
            return "mine";
        
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

    RemoveClickHandlers() {
        this.$rootElement.off('click');
    }

    AddClickHandlers() {
        // add the main ui click handler
        let that = this;
        this.$rootElement.on('click', 'td.cell', function(e) {
            that.gameState.SelectCell(e.currentTarget.id);
        });
    }

    Start() {
        // remove any existing click handlers
        this.RemoveClickHandlers();

        // template html cell content
        for(let i = 0; i < this.gameState.Size.height; i++) {
            let rowHtml = "<tr>";
            for(let j = 0; j < this.gameState.Size.width; j++) {             
                rowHtml += this.GetInitialCellHtml( i + "_" + j);
            }
            rowHtml += "</tr>";
            this.stack.push(rowHtml);
        }

        // render
        this.$rootElement.html(`<table><tbody>${this.stack.join("")}</tbody></table>`); 

        // add cell state change callback for rendering individual cells
        let that = this;
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

        // bind handlers
        this.AddClickHandlers();
    }
}