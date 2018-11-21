import React from 'react';

import reversiLogo from '../../assets/images/reversi.jpg';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height, marginBottom: props.marginBottom}}>
        <img src={reversiLogo} alt="simpleReversi" />
    </div>
);

export default logo;