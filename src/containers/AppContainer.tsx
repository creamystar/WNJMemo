import App from '../App';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../redux/modules/main';
import { RootState } from '../redux/modules';

export default connect(
    (state: RootState) => ({
        searchModal: state.main.searchModal,
    }),
    (dispatch) => bindActionCreators(actions, dispatch)
)(App);

