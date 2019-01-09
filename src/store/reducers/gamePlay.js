import {updateObject} from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    players: [
        {
            name: 'Аноним',
            win: 0,
            lose: 0,
            level: 'Новичок',
            chipColor: 'Белый'
        }
    ],
    controls: {
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Аноним'
            },
            value: 'Аноним',
            elementTitle: 'Имя'
        },
        chipColor: {
            elementType: 'input-radio',
            elementConfig: {
                type: 'radio',
                name: 'chipcolor',
                options: [
                    {value: 'white', displayValue: 'Белый'},
                    {value: 'black', displayValue: 'Черный'}
                ]
            },
            value: 'Белый',
            elementTitle: 'Цвет фишки'
        },
        level: {
            elementType: 'input-radio',
            elementConfig: {
                type: 'radio',
                name: 'level',
                options: [
                    {value: 'new', displayValue: 'Новичок'},
                    {value: 'pro', displayValue: 'Специалист'}
                ]
            },
            value: 'Новичок',
            elementTitle: 'Уровень'
        }
    },
    statusText: {
        text: 'Игра не началась',
        withError: false
    },
    currentResult: {
        playerScore: 2,
        opponentScore: 2
    },
    showStartModal: true
};



// const inputChange = (state, action) => {
//     const updatedValue = {
//         ...this.state.controls,
//         [element]: {
//             ...this.state.controls[element],
//             value: event.target.value
//         }
//     }
//     const updatedState = {
//         controls: updatedValue
//     };
//     return updateObject(state, updatedState);
// }

const reducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state
    }
};

export default reducer;