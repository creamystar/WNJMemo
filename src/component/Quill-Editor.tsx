import React from 'react';
import ReactQuill from 'react-quill';
import './MemoCrud.css';
import 'react-quill/dist/quill.snow.css';

class Editor extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = { 
            editorHtml: '' ,
            memo: '',
        }
        //@ts-ignore
        this.quillRef = null;      // Quill instance
        //@ts-ignore
        this.reactQuillRef = null;
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        this.attachQuillRefs()
    }
    componentDidUpdate(prevProps:any, prevState:any) {
        console.log(this.props)
        //@ts-ignore
        let quill = this.quillRef;
        if (prevState.editorHtml.length !== this.state.editorHtml.length) {
            this.props.getMemo(this.state.editorHtml,quill.getText())
        }
        if(prevProps.memo !== this.props.memo){
            this.setState({
                editorHtml:this.props.memo===''?'':this.props.memo.mcon
            })
        }
        this.attachQuillRefs()
    }
    attachQuillRefs = () => {
        //@ts-ignore
        if (typeof this.reactQuillRef.getEditor !== 'function') return;
        //@ts-ignore
        this.quillRef = this.reactQuillRef.getEditor();
      }
    handleChange (html:string) {
        console.log(html);

        this.setState({ 
            editorHtml: html,
         }); //이게 없으면 날아감*
    }
    render () {
        return (
          <div>
            <ReactQuill 
              theme="snow"
              //@ts-ignore
              ref={(el) => { this.reactQuillRef = el }}
              onChange={this.handleChange}
              //@ts-ignore
              value={this.state.editorHtml}
              //@ts-ignore
              modules={Editor.modules}
            //   placeholder={this.props.placeholder}
             />
           </div>
        )
    }
}
//@ts-ignore
Editor.modules = {
    toolbar: [
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}

export default Editor;