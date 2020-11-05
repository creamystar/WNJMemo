import { combineReducers } from 'redux';
import main from './main';
import hashtag from './hashtag';

const rootReducer = combineReducers({
    main,
    hashtag
})

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>