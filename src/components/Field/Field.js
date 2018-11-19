import React from 'react';

import classes from './Field.css';
import FieldCell from '../../containers/FieldCell/FieldCell';

const field = (props) => (
    <div className={classes.Wrapper}>
        <div className={classes.Field}>
            {props.cells.map((cell) => (
                <FieldCell 
                    key={"" + cell.row + cell.column} 
                    row={cell.row}
                    column={cell.column} />
            ))}
            
        </div>
        
    </div>
);

export default field;