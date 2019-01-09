import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './Field.css';
import FieldCell from '../../components/FieldCell/FieldCell';
import * as states from '../../components/FieldCell/states';
import * as actions from '../../store/actions';

class Field extends Component {
    state = {
        playerStep: false
    }

    componentDidUpdate = () => {
        // if(this.props.fieldCells !== null) {
        //     this.props.onSetStartChips(this.props.fieldCells);
        //     for(let i = 0; i < 8; i++) {
        //         this.props.onAddNeighbors(this.props.fieldCells);
        //     }
            
        // }
    }
    
    componentDidMount() {
        this.props.onInitFieldCells();
    }

    clickCellHandler = (currentCell) => {
        if(currentCell.occupied === states.NOT_OCCUPIED) {
            if(this.props.chipColor === 'Черный') {
                this.stepChip(states.OCCUPIED_BLACK, currentCell);
                this.opponentStep(states.OCCUPIED_WHITE)
            } else {
                this.stepChip(states.OCCUPIED_WHITE, currentCell);
                this.opponentStep(states.OCCUPIED_BLACK)
            }
        } else {
            this.props.submitStatusTextHandler(1);
        }
    }

    getTrueNeighbors(neighbors) {
        const trueNeighbors = [];
        for(let i = 0; i < neighbors.length; i++) {
            let tmpCell = {
                ...neighbors[i].cell
            };
            let tmpCellNext = {
                ...neighbors[i].cell.neighbors[neighbors[i].direction]
            };
            console.log(tmpCell, tmpCellNext)
            while(tmpCell.occupied === tmpCellNext.occupied) {
                tmpCell = tmpCellNext;
                tmpCellNext = tmpCellNext.neighbors[neighbors[i].direction];
            }
            if(tmpCellNext === null || tmpCellNext.occupied === states.NOT_OCCUPIED) {
                continue;
            } else {
                trueNeighbors.push(neighbors[i]);
            }
        }
        return trueNeighbors;
    }

    opponentStep = (color, cell) => {}

    getRandomCell = () => {}

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
                const trueNeighbors = this.getTrueNeighbors(reverseNeighbors)
                if(trueNeighbors.length !== 0) {
                    this.setState({playerStep: true});
                    this.props.onStepChip(this.props.fieldCells, cell, color);
                    this.props.onReverseChips(this.props.fieldCells, trueNeighbors, color);
                    this.props.submitStatusTextHandler(2);
                } else {
                    this.props.submitStatusTextHandler(5);
                }
            }
        }
    }

    render() {
        let cells = null;
        if(this.props.fieldCells !== null) {
            cells = this.props.fieldCells.map((row, rowIndex) => (
                row.map((cell, columnIndex) => (
                    <FieldCell 
                        key={cell.id} 
                        clickCellHandler={this.clickCellHandler}
                        error={cell.error}
                        currentCell={this.props.fieldCells[rowIndex][columnIndex]}
                        occupied={cell.occupied}
                        chipColor={this.props.chipColor}
                        submitStatusTextHandler={this.props.submitStatusTextHandler} />
                ))
            ));
        }
        

        return (
            <div className={classes.Wrapper}>
                <div className={classes.Field}>
                    {cells}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        fieldCells: state.field.cells
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInitFieldCells: (cells) => dispatch(actions.initFieldCells(cells)),
        onStepChip: (cells, cell, color) => dispatch(actions.stepChip(cells, cell, color)),
        onReverseChips: (cells, neighbors, color) => dispatch(actions.reverseChips(cells, neighbors, color))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Field);