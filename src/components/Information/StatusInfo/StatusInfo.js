import React from 'react';

import classes from './StatusInfo.css'

const statusInfo = (props) => (
    <div className={classes.StatusInfo}>
        <div>{props.statusText}</div>
    </div>
);

export default statusInfo;