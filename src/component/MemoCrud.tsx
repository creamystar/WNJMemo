import React, {Component} from 'react';
import './MemoCrud.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class Editor extends React.Component {
    constructor (props:any) {
        super(props)
        this.state = { editorHtml: '' 
        }
        this.handleChange = this.handleChange.bind(this)
    }
      
    handleChange (html:string) {
        console.log(html);
        this.setState({ editorHtml: html });
    }
    render () {
        return (
          <div>
            <ReactQuill 
              theme="snow"
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
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}

class MemoCrud extends Component<any,any> {
    constructor(props:any) {
        super(props);
        this.state = {
        }
      }
    set = {
        oneMemo: ''
    }
    exit(){
        //@ts-ignore
        document.getElementById("memoCrudAll").style.display="none";
    }
    cancleClick(){
        //@ts-ignore
        document.getElementById("memoCrudAll").style.display="none";
    }
    wirteClick(){
        alert("");
        //alert(CKEditor.getDate());
        
    }
    
    render() {
        return (
            <div id="memoCrudAll">
                <div className="wrap" id="wrap" onClick={this.exit}></div>
                <div className="editorSpace" id="editorSpace">
                    <h2 id="memoCreate">Memo Editor</h2>
                    <div id="memoBtn">
                        <input type="button" id="writeEditorBtn" value="완료" onClick={this.wirteClick}/>
                        <input type="button" id="cancleEditorBtn" value="취소" onClick={this.cancleClick}/>
                    </div>
                    <Editor/>
                </div>
            </div>
        );
    }
}

export default MemoCrud;