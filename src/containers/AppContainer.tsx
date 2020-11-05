import App from '../App';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Mainactions from '../redux/modules/main';
import * as Tagactions from '../redux/modules/hashtag';
import { RootState } from '../redux/modules';

export default connect(
    (state: RootState) => ({
        searchModal: state.main.searchModal,
        newWrightCheck: state.main.newWrightCheck,
        memoListTemp: state.main.memoListTemp,
        memoList: state.main.memoList,
        selectVal: state.main.selectVal,
        modeVal: state.hashtag.modeVal,
        tagVal: state.hashtag.tagVal,
    }),
    (dispatch) => ({
        ta: bindActionCreators(Tagactions, dispatch),
        ma: bindActionCreators(Mainactions, dispatch),
    })
)(App);

