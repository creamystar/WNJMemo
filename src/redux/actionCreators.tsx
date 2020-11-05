import { bindActionCreators } from 'redux';
import * as mainActions from './modules/main';
import * as tagActions from './modules/hashtag';
import store from './index';

const { dispatch } = store;

export const MainActions = bindActionCreators(mainActions, dispatch);
export const TagActions = bindActionCreators(tagActions, dispatch);