import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/new-game">Новая игра</NavigationItem>
        <NavigationItem link="/continue">Продолжить игру</NavigationItem>
        <NavigationItem link="/rules">Правила</NavigationItem>
        <NavigationItem link="/authorize">Авторизация</NavigationItem>
    </ul>
);

export default navigationItems;