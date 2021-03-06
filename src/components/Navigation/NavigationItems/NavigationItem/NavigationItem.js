import React from 'react';
//import {NavLink} from 'react-router-dom';

import classes from './NavigationItem.css';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <a href={props.link}>{props.children}</a>
        {/* <NavLink 
            activeClassName={classes.active}
            exact
            to={props.link}>{props.children}
        </NavLink> */}
    </li>
);

export default navigationItem;