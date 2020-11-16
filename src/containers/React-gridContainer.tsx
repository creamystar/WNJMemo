import ReactGrid from '../Component/React-grid';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../redux/modules/main';
import { RootState } from '../redux/modules';

export default connect(
    (state: RootState) => ({
        memoList: state.main.memoList,
        memoListTemp: state.main.memoListTemp,
        selectVal: state.main.selectVal,
        modeVal: state.hashtag.modeVal,
    }),
    (dispatch) => bindActionCreators(actions, dispatch)
)(ReactGrid);

