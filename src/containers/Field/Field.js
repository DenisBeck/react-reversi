import React, {Component} from 'react';

import classes from './Field.css';
import FieldCell from '../../components/FieldCell/FieldCell';
import * as states from '../../components/FieldCell/states';

class Field extends Component {
    state = {
        fieldCells: this.props.cells
    }
    
    componentWillMount() {
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
                this.setState({
                    fieldCells: upgratedCells
                })
            }
        }
        
        // this.setState({
        //     ...this.state,
        //     fieldCells: upgratedCells
        // })

        
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
    }

    clickCellHandler = () => {
        console.log(this.state);
        if(this.state.occupied === states.NOT_OCCUPIED) {
            if(this.props.chipColor === 'Черный') {
                this.stepChip(states.OCCUPIED_BLACK);
            } else {
                this.stepChip(states.OCCUPIED_WHITE);
            }
            this.props.submitStatusTextHandler(2);
        } else {
            this.props.submitStatusTextHandler(1);
        }
    }

    stepChip = (color) => {
        // const neighbors =[];
        // for(let key in this.state.neighbors) {
        //     if(this.state.neighbors[key] &&( this.state.neighbors[key].occupied !== states.NOT_OCCUPIED)) {
        //         neighbors.push({
        //             ...this.state.neighbors[key]
        //         })
        //     }
        // }
        // console.log(neighbors);
        // if(neighbors.length === 0) {
        //     this.props.submitStatusTextHandler(3);
        // } else {
        //     this.setState({
        //         ...this.state,
        //         occupied: color,
        //         error: true
        //     });
        // }
        

    }

    render() {
        const cells = this.props.cells.map((row) => (
            row.map((cell) => (
                <FieldCell 
                    key={cell.id} 
                    clickCellHandler={this.clickCellHandler}
                    error={cell.error}
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