import App from '../App';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../redux/modules/main';

export default connect(
    null,
    (dispatch) => bindActionCreators(actions, dispatch)
)(App);

