import React from 'react';

import classes from './GameControl.css'

const GameControl = (props) => (
    <div className={classes.GameControl}>
        {props.children}
    </div>
);

export default GameControl;