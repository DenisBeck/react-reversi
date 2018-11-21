import React from 'react';

import classes from './Input.css';
import Aux from '../../../hoc/Auxx/Auxx';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch(props.elementType) {
        case('input'): 
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed}/>;
            break;
        case('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed}/>;
            break;
        case('select'):
            inputElement = (
                <select 
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed} >
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        case('input-radio'):
            inputClasses.push(classes.Radio);
            inputElement = (
                props.elementConfig.options.map(option => (
                    <Aux key={option.value}>
                        <input 
                            className={inputClasses.join(' ')}
                            type={props.elementConfig.type}
                            name={props.elementConfig.name}
                            id={option.value}
                            value={option.displayValue}
                            onChange={props.changed} />
                        <label htmlFor={option.value}>{option.displayValue}</label>
                    </Aux>
                )));
            break;
        default:
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value} />;
    }

    return (
        <div className={classes.Input}>
            <strong>{props.elementTitle}</strong> : {inputElement}
        </div>
    );
    
};

export default input;