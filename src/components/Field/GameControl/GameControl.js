import React from 'react';

import classes from './GameControl.css'

const GameControl = (props) => (
    <div className={classes.GameControl}>
        <p>Здесь отобразится имя игрока</p>
        <p>Здесь появятся сообщения о статусе игрового процесса</p>
        <p>Здесь отобразится информация о счете</p>
    </div>
);

export default GameControl;