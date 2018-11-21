import React from 'react';

import classes from './ResultInfo.css'

const resultInfo = (props) => {
    let result = <p>Ничья</p>;
    if(props.playerScore > props.opponentScore) {
        result = <p style={{color: 'green'}}>Вы выигрываете!</p>
    } else if(props.playerScore < props.opponentScore) {
        result = <p style={{color: 'red'}}>Вы проигрываете!</p>
    }
    return <div className={classes.ResultInfo}>
        <p>Результат игрока: <strong>{props.playerScore}</strong></p>
        <p>Результат противника: <strong>{props.opponentScore}</strong></p>
        <div className={classes.CurrentResult}>{result}</div>
    </div>
};

export default resultInfo;