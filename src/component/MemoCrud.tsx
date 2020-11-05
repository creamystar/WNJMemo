import React, { Component } from 'react';
import * as controller from './Controller';
import Editor from '../containers/Quill-EditorContainer';
import './MemoCrud.css';
import 'react-quill/dist/quill.snow.css';

const a = '';

class MemoCrud extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            mcon:'',
            rawcon:'',
            modal: false,
            newWrightCheck: false,
        }
        this.getMemo = this.getMemo.bind(this);
        this.wirteClick = this.wirteClick.bind(this);
        this.seperateTag = this.seperateTag.bind(this);
        this.exit = this.exit.bind(this);
        this.deleteMemo = this.deleteMemo.bind(this);
    }
    componentDidUpdate(prevProps:any, prevState:any) {
        if(prevProps.modal !== this.props.modal){
            this.setState({
                modal: this.props.modal,
              })
        }
        if(prevProps.newWrightCheck !== this.props.newWrightCheck){
            this.setState({
                newWrightCheck: this.props.newWrightCheck,
              })
        }
      }
    exit() {
        // eslint-disable-next-line no-restricted-globals
        if(confirm("작성중인 글이 저장되지 않습니다. 정말 닫으시겠습니까?")){
            this.props.setModalVal(false);
            this.props.setMemo('');
            this.props.setNewWrightCheck(false);
        }else {
            return ;
        }

    }
    wirteClick() {
        // eslint-disable-next-line no-restricted-globals
        if(confirm("작성을 완료하시겠습니까?")){
            const tag = this.seperateTag(this.state.rawcon);
            console.log(tag);
            console.log("this.props.memo를 왜 못잡지?ㅠㅠ ")
            console.log(this.props.memo)
            const axiosHead = this.props.memo!==''?
            controller.updateMemo(this.props.memo.mno,this.state.mcon,tag):
            controller.createMemo(this.state.mcon,tag);
            axiosHead.then((res:any)=>{
                        alert("메모작성 완료!");
                        // this.props.setModalVal(false);
                        // this.props.setMemo('');
                        window.location.href = document.referrer;//새로고침 
                    })
                    .catch((e:any) => {
                        alert("메모작성 오류!");
                    })
            this.props.setNewWrightCheck(false);//완료 후엔 무조건 false로. (켜질때 다시 true 구분)
        }
    }
    getMemo(memo:any,rawcon:any){
        this.setState({
            mcon: memo,
            rawcon: rawcon,
        })
    }
    //태그 분리
    seperateTag(rawcon:string){
        const reg = /(^#| #)[0-9a-zA-Z가-힣_]{1,20}/gm; //20자 제한
        let rs, temp;
        temp = rawcon.match(reg);
        rs = temp?.map((temp,i)=> (
            rs = temp.trim()
        ));
        return rs;
    }
    //메모삭제
    deleteMemo(){
        if(window.confirm("정말 삭제하시겠습니까?")){
            //해당 mno 넘겨주기 (백에서 삭제)
            //try catch 삭제되었습니다. 삭제 오류.
            console.log("this.props.memo를 왜 못잡지?ㅠㅠ ")
            console.log(this.props.memo)
            controller.deleteMemo(this.props.memo.mno).then((res:any)=>{
                        alert("메모가 삭제되었습니다.");
                        window.location.href = document.referrer;//새로고침 
                    })
                    .catch((e:any) => {
                        alert("삭제 오류가 발생했습니다.");
                    })
        } else {
            return;
        }
    }
    render() {
        return (
            <div id="memoCrudAll" style={{display:this.state.modal?"block":"none"}}>
                <div className="wrap" style={{display:this.state.modal?"block":"none"}} id="wrap" onClick={this.exit}></div>
                <div className="editorSpace" style={{display:this.state.modal?"block":"none"}} id="editorSpace">
                    <h2 id="memoCreate">Memo Editor</h2>
                    <div id="memoBtn">
                        <input type="button" id="writeEditorBtn" value="완료" onClick={this.wirteClick} />
                        <input type="button" id="cancleEditorBtn" value="취소" onClick={this.exit}/>
                        {this.state.newWrightCheck?(<></>):(<><input type="button" id="deleteMemoBtn" value="메모삭제" onClick={this.deleteMemo} /></>)}
                    </div>
                    <Editor getMemo={this.getMemo} /* memo={this.state.memo} *//>
                </div>
            </div>
        );
    }
}

export default MemoCrud;