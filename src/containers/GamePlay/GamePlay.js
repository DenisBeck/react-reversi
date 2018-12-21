import React, {Component} from 'react';

import * as states from '../../components/FieldCell/states';
import Field from '../Field/Field';
import GameControl from '../../components/GameControl/GameControl';
import Aux from '../../hoc/Auxx/Auxx';
import PlayerInfo from '../../components/Information/PlayerInfo/PlayerInfo';
import StatusInfo from '../../components/Information/StatusInfo/StatusInfo';
import ResultInfo from '../../components/Information/ResultInfo/ResultInfo';
import Modal from '../../components/UI/Modal/Modal';
import QuickStartDialog from '../../components/QuickStartDialog/QuickStartDialog';

class GamePlay extends Component {
    state = {
        cells: null,
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
    }

    modalClosedHandler = () => {
        this.setState({showStartModal: false});
    }

    componentWillMount() {
        const cells = [];
        for(let i = 0; i < 8; i++) {
            const innerCells = [];
            for(let j = 0; j < 8; j++) {
                innerCells.push({
                    row: i + 1,
                    column: j + 1,
                    id: 'row' + i + 'column' + j,
                    occupied: states.NOT_OCCUPIED,
                    neighbors: null,
                    error: false
                });
            }
            cells.push(innerCells);
        }
        this.setState({cells: cells});
    }

    inputChangedHandler = (event, element) => {
        const updatedValue = {
            ...this.state.controls,
            [element]: {
                ...this.state.controls[element],
                value: event.target.value
            }
        }
        this.setState({
            ...this.state,
            controls: updatedValue
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        const name = this.state.controls.name.value;
        const chipColor = this.state.controls.chipColor.value;
        const level = this.state.controls.level.value;
        const updatedPlayers = [
            {
                ...this.state.players[0],
                name: name,
                chipColor: chipColor,
                level: level
            }
        ]
        this.setState({
            ...this.state,
            players: updatedPlayers
        })
        this.modalClosedHandler();
    }

    submitStatusTextHandler = (statusCode) => {
        switch(statusCode) {
            case 1: 
                this.setState({
                    ...this.state,
                    statusText: {
                        ...this.state.statusText,
                        text: 'Недопустимый ход: поле уже занято!',
                        withError: true
                    }
                });
                break;
            case 2: 
                this.setState({
                    ...this.state,
                    statusText: {
                        ...this.state.statusText,
                        text: 'Ход сделан! Очередь противника...',
                        withError: false
                    }
                });
                break;
            case 3: 
                this.setState({
                    ...this.state,
                    statusText: {
                        ...this.state.statusText,
                        text: 'Недопустимый ход! Вокруг нет ни одной занятой ячейки',
                        withError: true
                    }
                });
                break;
            case 4: 
                this.setState({
                    ...this.state,
                    statusText: {
                        ...this.state.statusText,
                        text: 'Недопустимый ход! Вокруг нет занятой ячейки другого цвета',
                        withError: true
                    }
                });
                break;
            case 5: 
                this.setState({
                    ...this.state,
                    statusText: {
                        ...this.state.statusText,
                        text: 'Недопустимый ход! В направлениях ячеек с другим цветом нет замыкающих ячеек нашего цвета',
                        withError: true
                    }
                });
                break;
            default:
                return;
        }
    }

    render() {
        return (
            <Aux>
                <Modal
                    show={this.state.showStartModal}
                    modalClosed={this.modalClosedHandler}>
                    <QuickStartDialog
                        playerDefault={this.state.players[0]}
                        controls={this.state.controls}
                        changeHandler={(event, element) => this.inputChangedHandler(event, element)} 
                        submit={(event) => this.submitHandler(event)} />
                </Modal>
                <Field 
                    cells={this.state.cells}
                    chipColor={this.state.players[0].chipColor}
                    submitStatusTextHandler={this.submitStatusTextHandler} />
                <GameControl>
                    <PlayerInfo 
                        name={this.state.players[0].name}
                        winsCount={this.state.players[0].win}
                        losesCount={this.state.players[0].lose}
                        level={this.state.players[0].level}
                        chipColor={this.state.players[0].chipColor} />
                    <StatusInfo 
                        statusText={this.state.statusText.text}
                        withError={this.state.statusText.withError} />
                    <ResultInfo
                        playerScore={this.state.currentResult.playerScore}
                        opponentScore={this.state.currentResult.opponentScore} />
                </GameControl>
            </Aux>
        );
    }
}

export default GamePlay;