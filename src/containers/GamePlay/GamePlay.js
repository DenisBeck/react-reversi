import React, {Component} from 'react';

import Field from '../../components/Field/Field';
import GameControl from '../../components/Field/GameControl/GameControl';
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
                value: '',
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
                value: '',
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
                value: '',
                elementTitle: 'Уровень'
            }
        },
        statusText: 'Игра не началась',
        currentResult: {
            playerScore: 0,
            opponentScore: 0
        },
        showStartModal: true
    }

    modalClosedHandler = () => {
        this.setState({showStartModal: false});
    }

    componentWillMount() {
        const cells = [];
        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                cells[8 * i + j] = {row: i + 1, column: j + 1};
            }
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
        console.log(updatedPlayers);
        this.modalClosedHandler();
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
                    chipColor={this.state.players[0].chipColor} />
                <GameControl>
                    <PlayerInfo 
                        name={this.state.players[0].name}
                        winsCount={this.state.players[0].win}
                        losesCount={this.state.players[0].lose}
                        level={this.state.players[0].level}
                        chipColor={this.state.players[0].chipColor} />
                    <StatusInfo 
                        statusText={this.state.statusText} />
                    <ResultInfo
                        playerScore={this.state.currentResult.playerScore}
                        opponentScore={this.state.currentResult.opponentScore} />
                </GameControl>
            </Aux>
        );
    }
}

export default GamePlay;