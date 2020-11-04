import App from '../App';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../redux/modules/main';
import { RootState } from '../redux/modules';

export default connect(
    (state: RootState) => ({
        searchModal: state.main.searchModal,
        newWrightCheck: state.main.newWrightCheck,
        items: state.main.items,
        memoList: state.main.memoList,
    }),
    (dispatch) => bindActionCreators(actions, dispatch)
)(App);

