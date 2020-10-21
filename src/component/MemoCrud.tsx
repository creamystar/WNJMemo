import React, { Component } from 'react';
import './MemoCrud.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class Editor extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            editorHtml: '',
            tagOn: 0,
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
    componentDidUpdate() {
        this.attachQuillRefs()
    }
    attachQuillRefs = () => {
        //@ts-ignore
        if (typeof this.reactQuillRef.getEditor !== 'function') return;
        //@ts-ignore
        this.quillRef = this.reactQuillRef.getEditor();
    }
    // 해시태그 변환 수정중... 김누리1021
    //해시태그 변환 함께해요... 이재희1021
    handleChange(html: string) {
        console.log(html);
        //>#모든문자 띄어쓰기 
        //>#모든문자<
        //띄어쓰기 #모든문자 띄어쓰기 
        //띄어쓰기 #모든문자<
        //  ">#"+/([^\s]+)/+" "
        var pattern = '>#' + /.$/ + ' ';
        const regexp1 = / /;
        if(html.match(pattern)){
            alert(pattern);
            //<span name="tag" style="color: rgb(102, 163, 224);"><u>#태그</u></span>
            
        }
        // //@ts-ignore
        // let quill = this.quillRef;
        // quill.onKeyDown()


        // if (quill.getText().match(' #') || quill.getText().match('#')) {
        //     console.log(quill.getSelection());
        //     // quill.on('text-change', function (delta:any, old:any, source:any) {
        //     // if (quill.getLength() > limit) {
        //     // quill.deleteText(limit, quill.getLength());
        //     // console.log("limit");
        //     // }
        //     // });
        // }
        // console.log(html);

        // this.setState({ editorHtml: html });
    }
    render() {
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

//clean에 다른 함수 주기 ? 
var toolbarOptions = {
    handlers: {
        'clean': function(value:any){
            alert(value);
        }
    }
}

class MemoCrud extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
        }
    }
    set = {
        oneMemo: ''
    }
    exit() {
        //@ts-ignore
        document.getElementById("memoCrudAll").style.display = "none";
    }
    cancleClick() {
        //@ts-ignore
        document.getElementById("memoCrudAll").style.display = "none";
    }
    wirteClick() {
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
                        <input type="button" id="writeEditorBtn" value="완료" onClick={this.wirteClick} />
                        <input type="button" id="cancleEditorBtn" value="취소" onClick={this.cancleClick} />
                    </div>
                    <Editor />
                </div>
            </div>
        );
    }
}

export default MemoCrud;