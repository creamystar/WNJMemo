import MemoCrud from '../component/MemoCrud';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../redux/modules/main';
import { RootState } from '../redux/modules';

export default connect(
    (state: RootState) => ({
        modal: state.main.modal,
        memo: state.main.memo
    }),
    (dispatch) => bindActionCreators(actions, dispatch)
)(MemoCrud);

