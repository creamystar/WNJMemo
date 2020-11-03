import { bindActionCreators } from 'redux';
import * as mainActions from './modules/main';

import store from './index';

const { dispatch } = store;

export const MainActions = bindActionCreators(mainActions, dispatch);