import React, { Component } from 'react';
import './MemoCrud.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as controller from './Controller';

class Editor extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = { 
            editorHtml: '' ,
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
        //@ts-ignore
        let quill = this.quillRef;
        if (prevState.editorHtml.length !== this.state.editorHtml.length) {
            this.props.getMemo(this.state.editorHtml,quill.getText())
          }else if(prevProps.memo.mno !== this.props.memo.mno){
            this.setState({
                editorHtml: this.props.memo.mcon,
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

class MemoCrud extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            mcon:'',
            rawcon:'',
        }
        this.getMemo = this.getMemo.bind(this);
        this.wirteClick = this.wirteClick.bind(this);
        this.seperateTag = this.seperateTag.bind(this);
        this.exit = this.exit.bind(this);
        this.cancleClick = this.cancleClick.bind(this);
    }
    set = {
        oneMemo: ''
    }
    exit() {
        // eslint-disable-next-line no-restricted-globals
        if(confirm("작성중인 글이 저장되지 않습니다. 정말 닫으시겠습니까?")){
            //@ts-ignore
            document.getElementById("memoCrudAll").style.display = "none";
            this.props.setMemo({mno:'',mcon:''});
        }else {
            return ;
        }
    }
    cancleClick() {
        // eslint-disable-next-line no-restricted-globals
        if(confirm("작성중인 글이 저장되지 않습니다. 정말 닫으시겠습니까?")){
            //@ts-ignore
            document.getElementById("memoCrudAll").style.display = "none";
            this.props.setMemo({mno:'',mcon:''});
        }else {
            return ;
        }
        
    }
    wirteClick() {
        // eslint-disable-next-line no-restricted-globals
        if(confirm("작성을 완료하시겠습니까?")){
            const tag = this.seperateTag(this.state.rawcon);
            controller.createMemo(this.state.mcon,tag).catch((e:any) => {
                console.log("오류");
                console.log(e);
                alert("메모작성 오류!");
              })
            console.log(this.state.mcon);
            console.log("tag");
            console.log(tag);
        }
    }
    getMemo(memo:any,rawcon:any){
        this.setState({
            mcon: memo,
            rawcon: rawcon,
        })
    }
    seperateTag(rawcon:string){
        const reg = /(^#| #)[0-9a-zA-Z가-힣_]{1,20}/gm; //20자 제한 \s
        let rs, temp;
        temp = rawcon.match(reg);
        rs = temp?.map((temp,i)=> (
            rs = temp.trim()
        ));
        return rs;
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
                    <Editor getMemo={this.getMemo} memo={this.props.memo}/>
                </div>
            </div>
        );
    }
}

export default MemoCrud;