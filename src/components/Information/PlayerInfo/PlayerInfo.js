import React from 'react';

import classes from './PlayerInfo.css';

const playerInfo = (props) => (
    <div className={classes.PlayerInfo}>
        <div>Игрок <strong>{props.name}</strong></div>
        <div className={classes.SubInfo}>
            <div>Количество побед: <strong>{props.winsCount}</strong></div>
            <div>Количество поражений: <strong>{props.losesCount}</strong></div>
            <div>Уровень: <strong>{props.level}</strong></div>
            <div>Цвет фишек: <strong>{props.chipColor}</strong></div>
        </div>
    </div>
);

export default playerInfo;