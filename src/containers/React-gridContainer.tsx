import ReactGrid from '../component/React-grid';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../redux/modules/main';
import { RootState } from '../redux/modules';

export default connect(
    (state: RootState) => ({
        memoList: state.main.memoList,
        items: state.main.items,
    }),
    (dispatch) => bindActionCreators(actions, dispatch)
)(ReactGrid);

