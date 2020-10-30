import { CHANGE_ITEMS, CHANGE_MEMO, CHANGE_MODAL} from './action-types';

const initialState = {
    items : "",
    memo : "",
    modal : false,
};

const rootReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case CHANGE_ITEMS :
            return {...state, items : action.payload}
        case CHANGE_MEMO :
            return {...state, memo : action.payload}
        case CHANGE_MODAL : 
            return {...state, modal : action.payload}
        default:
            return state;
    }
}

export default rootReducer;