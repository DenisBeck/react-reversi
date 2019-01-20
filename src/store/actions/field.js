import * as actionTypes from './actionTypes';
import * as states from '../../components/FieldCell/states';



export const initFieldCells = () => {
    const cells = [];    
    const addNeighbors = (upgratedCells) => {
        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                
                upgratedCells[i][j].neighbors = {
                    up: (i > 0) ? cells[i - 1][j] : null,
                    upRight: (i > 0 && j < 7) ? cells[i - 1][j + 1] : null,
                    right: (j < 7) ? cells[i][j + 1] : null,
                    downRight: (i < 7 && j < 7) ? cells[i + 1][j + 1] : null,
                    down: (i < 7) ? cells[i + 1][j] : null,
                    downLeft: (i < 7 && j > 0) ? cells[i + 1][j - 1] : null,
                    left: (j > 0) ? cells[i][j - 1] : null,
                    upLeft: (i > 0 && j > 0) ? cells[i - 1][j - 1] : null
                }
            }
        }
    };
    for(let i = 0; i < 8; i++) {
        const innerCells = [];
        for(let j = 0; j < 8; j++) {
            if((i === 3 && j === 3) || (i === 4 && j === 4)) {
                innerCells[j] = {
                    row: i + 1,
                    column: j + 1,
                    id: 'row' + i + 'column' + j,
                    occupied: states.OCCUPIED_BLACK,
                    neighbors: null,
                    error: false
                }
            } else if((i === 4 && j === 3) || (i === 3 && j === 4)) {
                innerCells[j] = {
                    row: i + 1,
                    column: j + 1,
                    id: 'row' + i + 'column' + j,
                    occupied: states.OCCUPIED_WHITE,
                    neighbors: null,
                    error: false
                }
            } else {
                innerCells[j] = {
                    row: i + 1,
                    column: j + 1,
                    id: 'row' + i + 'column' + j,
                    occupied: states.NOT_OCCUPIED,
                    neighbors: null,
                    error: false
                }
            };
        }
        cells[i] = innerCells;
    }

    const upgratedCells = cells;
    
    for(let i = 0; i < 8; i++) {
        addNeighbors(upgratedCells);
    }

    return {
        type: actionTypes.INIT_FIELD_CELLS,
        fieldCells: cells
    }
}

export const stepChip = (cells, cell, color) => {
    const upgratedCells = cells;
    upgratedCells[cell.row - 1][cell.column - 1].occupied = color;
    upgratedCells[cell.row - 1][cell.column - 1].error = true;
    
    return {
        type: actionTypes.STEP_CHIP,
        fieldCells: upgratedCells
    }
}

export const reverseChips = (cells, neighbors, color) => {
    const upgratedCells = cells;
    for(let i = 0; i < neighbors.length; i++) {
        let tmpCell = neighbors[i].cell;
        while(tmpCell.occupied !== color) {
            upgratedCells[tmpCell.row - 1][tmpCell.column - 1].occupied = color;
            tmpCell = tmpCell.neighbors[neighbors[i].direction];
        }
    }
    return {
        type: actionTypes.REVERSE_CHIPS,
        fieldCells: upgratedCells
    }
}
