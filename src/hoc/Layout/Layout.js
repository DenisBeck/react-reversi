import React, {Component} from 'react';

import Aux from '../Auxx/Auxx';

class Layout extends Component {
    render() {
        return (
            <Aux>
                <div>Toolbar</div>
                <div>SideDrawer</div>
                <main>
                    <h1>Основная страница</h1>
                </main>
            </Aux>
        );
    }
}

export default Layout;