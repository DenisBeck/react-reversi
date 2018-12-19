import React from 'react';

import classes from './StatusInfo.css'

const statusInfo = (props) => (
    <div className={classes.StatusInfo}>
        <div style={{color: props.withError ? 'red' : 'black'}}>{props.statusText}</div>
    </div>
);

export default statusInfo;