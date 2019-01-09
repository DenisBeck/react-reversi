import {updateObject} from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    cells: null
};

const initFieldCells = (state, action) => {
    const updatedState = {
        cells: action.fieldCells
    }
    return updateObject(state, updatedState);
};

const reverseChips = (state, action) => {
    const updatedState = {
        cells: action.fieldCells
    }
    return updateObject(state, updatedState);
}

const stepChip = (state, action) => {
    const updatedState = {
        cells: action.fieldCells
    }
    return updateObject(state, updatedState);
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.INIT_FIELD_CELLS:
            return initFieldCells(state, action);
        case actionTypes.REVERSE_CHIPS:
            return reverseChips(state, action);
        case actionTypes.STEP_CHIP:
            return stepChip(state, action);
        default:
            return state;
    }
    
};

export default reducer;