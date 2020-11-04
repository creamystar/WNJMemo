import MemoCrud from '../component/MemoCrud';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../redux/modules/main';
import { RootState } from '../redux/modules';
import { startCase } from 'lodash';

export default connect(
    (state: RootState) => ({
        modal: state.main.modal,
        memo: state.main.memo,
        newWrightCheck: state.main.newWrightCheck 
    }),
    (dispatch) => bindActionCreators(actions, dispatch)
)(MemoCrud);


