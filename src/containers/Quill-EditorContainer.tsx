import Editor from '../component/Quill-Editor';
import { connect } from 'react-redux';
import { RootState } from '../redux/modules';

export default connect(
    (state: RootState) => ({
        memo: state.main.memo
    }),
)(Editor);

