import ReactGrid from '../component/SearchRes';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../redux/modules/main';
import { RootState } from '../redux/modules';

export default connect(
    (state: RootState) => ({
        tagList: state.hashtag.tagList
    }),
    (dispatch) => bindActionCreators(actions, dispatch)
)(ReactGrid);

