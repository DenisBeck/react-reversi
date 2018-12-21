import React, {Component} from 'react';

import classes from './Field.css';
import FieldCell from '../../components/FieldCell/FieldCell';
import * as states from '../../components/FieldCell/states';

class Field extends Component {
    state = {
        fieldCells: this.props.cells
    }

    updateCells = () => {
        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                const upgratedCells = this.state.fieldCells;
                
                upgratedCells[i][j] = {
                    ...this.state.fieldCells[i][j],
                    neighbors: {
                        up: (i > 0) ? this.state.fieldCells[i - 1][j] : null,
                        upRight: (i > 0 && j < 7) ? this.state.fieldCells[i - 1][j + 1] : null,
                        right: (j < 7) ? this.state.fieldCells[i][j + 1] : null,
                        downRight: (i < 7 && j < 7) ? this.state.fieldCells[i + 1][j + 1] : null,
                        down: (i < 7) ? this.state.fieldCells[i + 1][j] : null,
                        downLeft: (i < 7 && j > 0) ? this.state.fieldCells[i + 1][j - 1] : null,
                        left: (j > 0) ? this.state.fieldCells[i][j - 1] : null,
                        upLeft: (i > 0 && j > 0) ? this.state.fieldCells[i - 1][j - 1] : null
                    }
                }
                this.setState(() => ({
                    fieldCells: upgratedCells
                }))
            }
        }
    }
    
    componentWillMount() {
        const occupiedCells = this.state.fieldCells;
        occupiedCells[3][3] = {
            ...this.state.fieldCells[3][3],
            occupied: states.OCCUPIED_BLACK,
            error: true
        };
        occupiedCells[4][4] = {
            ...this.state.fieldCells[4][4],
            occupied: states.OCCUPIED_BLACK,
            error: true
        };
        occupiedCells[3][4] = {
            ...this.state.fieldCells[3][4],
            occupied: states.OCCUPIED_WHITE,
            error: true
        };
        occupiedCells[4][3] = {
            ...this.state.fieldCells[4][3],
            occupied: states.OCCUPIED_WHITE,
            error: true
        };
        this.setState({fieldCells: occupiedCells});

        this.updateCells();
        this.updateCells();
        this.updateCells();
        this.updateCells();
        this.updateCells();
        this.updateCells();
        this.updateCells();
        this.updateCells();
    }

    

    clickCellHandler = (currentCell) => {
        console.log(this.state);
        console.log(currentCell);
        if(currentCell.occupied === states.NOT_OCCUPIED) {
            if(this.props.chipColor === 'Черный') {
                this.stepChip(states.OCCUPIED_BLACK, currentCell);
            } else {
                this.stepChip(states.OCCUPIED_WHITE, currentCell);
            }
        } else {
            this.props.submitStatusTextHandler(1);
        }
        this.updateCells();
    }

    checkNeighbors(neighbors) {
        for(let i = 0; i < neighbors.length; i++) {
            let tmpCell = {
                ...neighbors[i].cell
            };
            let tmpCellNext = {
                ...neighbors[i].cell.neighbors[neighbors[i].direction]
            };
            while(tmpCell.occupied === tmpCellNext.occupied) {
                tmpCell = tmpCellNext;
                tmpCellNext = tmpCellNext.neighbors[neighbors[i].direction];
            }
            console.log(tmpCell);
            if(tmpCellNext === null || tmpCellNext.occupied === states.NOT_OCCUPIED) {
                continue;
            } else {
                return true;
            }
        }
        return false;
    }

    reverseChips = () => {

    }

    stepChip = (color, cell) => {
        const neighbors =[];
        for(let key in cell.neighbors) {
            if(cell.neighbors[key] && (cell.neighbors[key].occupied !== states.NOT_OCCUPIED)) {
            neighbors.push({cell: cell.neighbors[key], direction: key})
            }
        }
        if(neighbors.length === 0) {
            this.props.submitStatusTextHandler(3);
        } else {
            const reverseNeighbors = [];
            for(let i = 0; i < neighbors.length; i++) {
                if(neighbors[i].cell.occupied !== color) {
                    reverseNeighbors.push(neighbors[i]);
                }
            }
            if(reverseNeighbors.length === 0) {
                this.props.submitStatusTextHandler(4);
            } else {
                if(this.checkNeighbors(reverseNeighbors)) {
                    const upgratedCells = this.state.fieldCells;
                    upgratedCells[cell.row - 1][cell.column - 1] = {
                        ...this.state.fieldCells[cell.row - 1][cell.column - 1],
                        occupied: color,
                        error: true
                    }
                    this.setState({
                        fieldCells: upgratedCells
                    });
                    this.reverseChips();
                    this.props.submitStatusTextHandler(2);
                } else {
                    this.props.submitStatusTextHandler(5);
                }
            }
        }
    }

    render() {
        const cells = this.props.cells.map((row, rowIndex) => (
            row.map((cell, columnIndex) => (
                <FieldCell 
                    key={cell.id} 
                    clickCellHandler={this.clickCellHandler}
                    error={cell.error}
                    currentCell={this.state.fieldCells[rowIndex][columnIndex]}
                    occupied={cell.occupied}
                    chipColor={this.props.chipColor}
                    submitStatusTextHandler={this.props.submitStatusTextHandler} />
            ))
        ))

        return (
            <div className={classes.Wrapper}>
                <div className={classes.Field}>
                    {cells}
                </div>
            </div>
        );
    }
}

export default Field;