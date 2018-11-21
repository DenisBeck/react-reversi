import React from 'react';

import classes from './QuickStartDialog.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

const quickStartDialog = (props) => {

    return <div className={classes.QuickStartDialog}>
        <h3>Быстрый старт</h3>
        <form onSubmit={props.submit}>
            <Input
                elementType={props.controls.name.elementType}
                elementConfig={props.controls.name.elementConfig}
                value={props.controls.name.value}
                elementTitle={props.controls.name.elementTitle}
                changed={(event) => props.changeHandler(event, 'name')} />
            <Input
                elementType={props.controls.chipColor.elementType}
                elementConfig={props.controls.chipColor.elementConfig}
                value={props.controls.chipColor.value}
                elementTitle={props.controls.chipColor.elementTitle}
                changed={(event) => props.changeHandler(event, 'chipColor')} />
            <Input 
                elementType={props.controls.level.elementType}
                elementConfig={props.controls.level.elementConfig}
                value={props.controls.level.value}
                elementTitle={props.controls.level.elementTitle}
                changed={(event) => props.changeHandler(event, 'level')}/>
            <Button>Начать игру</Button>
        </form>
        <hr />
        <p>Пройти авторизацию <Button>Авторизация</Button></p>
    </div>
};

export default quickStartDialog;