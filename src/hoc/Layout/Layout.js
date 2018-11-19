import React, {Component} from 'react';

import Aux from '../Auxx/Auxx';
import GamePlay from '../../containers/GamePlay/GamePlay';

import classes from './Layout.css';

class Layout extends Component {
    render() {
        return (
            <Aux>
                <div>Toolbar</div>
                <div>SideDrawer</div>
                <main className={classes.Content}>
                    <GamePlay />
                </main>
            </Aux>
        );
    }
}

export default Layout;