import React from 'react';

import classes from './FieldCell.css';
import * as states from './states';

const fieldCell = (props) => {
    let chip = null;
    switch(props.occupied) {
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
        <div className={[classes.FieldCell, props.error ? classes.Error : ''].join(' ')}
            onClick={() => props.clickCellHandler(props.currentCell)}>
            {chip}
        </div>
    );
}

export default fieldCell;