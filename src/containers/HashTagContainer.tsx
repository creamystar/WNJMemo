import HashTags from '../component/HashTags';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Mainactions from '../redux/modules/main';
import * as Tagactions from '../redux/modules/hashtag';
import { RootState } from '../redux/modules';

export default connect(
    (state: RootState) => ({
        modeVal: state.hashtag.modeVal
    }),
    (dispatch) => ({
        ta: bindActionCreators(Tagactions, dispatch),
        ma: bindActionCreators(Mainactions, dispatch),
    })
)(HashTags);

