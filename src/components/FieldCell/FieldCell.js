import React from 'react';

import classes from './FieldCell.css';
import * as states from './states';

const fieldCell = (props) => {
    let chip = null;
    switch(props.occupied) {
        case states.OCCUPIED_WHITE:
            chip =  <div className={[classes.ChipContainer, props.reversed ? classes.Reverse : ''].join(' ')}>
                        <div className={classes.Flipper}>
                            <div className={classes.Front}
                                style={{backgroundColor: props.reversed ? 'black' : 'white'}}></div>
                            <div className={classes.Back}
                                style={{backgroundColor: props.reversed ? 'white' : 'black'}}></div>
                        </div>
                    </div>;
            break;
        case states.OCCUPIED_BLACK:
            chip =  <div className={[classes.ChipContainer, props.reversed ? classes.Reverse : ''].join(' ')}>
                        <div className={classes.Flipper}>
                            <div className={classes.Front}
                                style={{backgroundColor: props.reversed ? 'white' : 'black'}}></div>
                            <div className={classes.Back}
                                style={{backgroundColor: props.reversed ? 'black' : 'white'}}></div>
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