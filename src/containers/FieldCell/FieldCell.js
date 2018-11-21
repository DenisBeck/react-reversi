import React, {Component} from 'react';

import classes from './FieldCell.css';
import * as states from './states';

class FieldCell extends Component {
    state = {
        occupied: states.NOT_OCCUPIED 
    }
    
    componentWillMount() {
        if((this.props.row === 4 && this.props.column === 4) ||
            (this.props.row === 5 && this.props.column === 5)) {
            this.setState({
                ...this.state,
                occupied: states.OCCUPIED_BLACK
            });
        }
        if((this.props.row === 5 && this.props.column === 4) ||
            (this.props.row === 4 && this.props.column === 5)) {
            this.setState({
                ...this.state,
                occupied: states.OCCUPIED_WHITE
            });
        }
    }

    ClickCellHandler = () => {
        if(this.state.occupied === states.NOT_OCCUPIED) {
            if(this.props.chipColor === 'Черный') {
                this.setState({
                    ...this.state,
                    occupied: states.OCCUPIED_BLACK
                });
            } else {
                this.setState({
                    ...this.state,
                    occupied: states.OCCUPIED_WHITE
                });
            }
        }
    }

    render() {
        let chip = null;
        switch(this.state.occupied) {
            case states.OCCUPIED_WHITE:
                chip =  <div className={classes.ChipContainer}>
                            <div className={classes.Flipper}>
                                <div className={classes.Front}
                                    style={{backgroundColor: 'white'}}></div>
                                <div className={classes.Back}
                                    style={{backgroundColor: 'black'}}></div>
                            </div>
                        </div>;
                break;
            case states.OCCUPIED_BLACK:
                chip =  <div className={classes.ChipContainer}>
                            <div className={classes.Flipper}>
                                <div className={classes.Front}
                                    style={{backgroundColor: 'black'}}></div>
                                <div className={classes.Back}
                                    style={{backgroundColor: 'white'}}></div>
                            </div>
                        </div>;
                break;
            default:
                chip = null;
        }

        return (
            <div className={classes.FieldCell}
                onClick={this.ClickCellHandler}>
                {chip}
            </div>
        );
    }
}

export default FieldCell;