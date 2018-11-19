import React, {Component} from 'react';

import Field from '../../components/Field/Field';
import GameControl from '../../components/Field/GameControl/GameControl';
import Aux from '../../hoc/Auxx/Auxx';

class GamePlay extends Component {
    state = {
        cells: null
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

    render() {
        return (
            <Aux>
                <Field cells={this.state.cells} />
                <GameControl />
            </Aux>
        );
    }
}

export default GamePlay;