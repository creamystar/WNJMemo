import React, { Component } from 'react';
import './MemoCrud.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class Editor extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = { 
            editorHtml: '' ,
            tagOn: '',
            tagFlag: false,
            tag:[],
            lastIdx:'',
        }
        //@ts-ignore
        this.quillRef = null;      // Quill instance
        //@ts-ignore
        this.reactQuillRef = null;
        this.handleChange = this.handleChange.bind(this)
        this.chkHashtag = this.chkHashtag.bind(this)
        this.trackKey = this.trackKey.bind(this)
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
    handleChange (html:string) {
        console.log(html);
        console.log(this.state);
        this.setState({ editorHtml: html }); //이게 없으면 날아감*
    }
     // 해시태그 변환 수정중... 김누리1021
     chkHashtag(event:any) {
        //@ts-ignore
        let quill = this.quillRef;
        console.log(quill.getContents());
        const index = quill.getSelection().index
        // console.log("키1: "+event.key);
        // console.log("인덱스1: "+ index);
        // console.log("길이1: "+ quill.getLength());
        //태그 시작
        if(event.key==="#"){
            const lastKey = quill.getText().charCodeAt(index-1); //#앞의 글자
            if(index===0||lastKey===32||lastKey===10){// 앞의 글자가 enter,space, 없을 경우
                this.setState({//tag 모드ON, 인덱스 저장
                    tagFlag:true,
                    tagOn: index-1<0?0:index,
                })
            }
        }
    }
    trackKey(event:any) {
        //@ts-ignore
        let quill = this.quillRef;
        const index = quill.getSelection().index
        // console.log("키2: "+event.key);
        // console.log("인덱스2: "+ index);
        // console.log("길이2: "+ quill.getLength());
        if(this.state.tagOn===index&&event.key==="Backspace"){//tag모드 중 #삭제의 경우
            this.setState({//tag모드 초기화
                tagFlag: false,
                tagOn:'',
            })
        }
        //태그 만들기
        if((event.key===" "||event.key==="Enter")&&this.state.tagFlag===true){
            // const lastIdx = event.key===" "?index:index-1;//enter end시 index-1
            const tag = quill.getText().substring(this.state.tagOn,index-1);
            quill.formatText(this.state.tagOn, tag.length, {
                'bold': true,
                'color': 'rgb(0, 0, 255)'
            });
            this.setState({//tag모드 초기화
                tagFlag: false,
                tagOn: '',
                //중복 추가방지
                tag: this.state.tag.includes(tag)?this.state.tag:this.state.tag.concat(tag),
                lastIdx: index,
            })
            quill.removeFormat(index+1);
            // quill.setSelection(index,1);
        }
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
              onKeyDown={this.chkHashtag}
              onKeyUp={this.trackKey}
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