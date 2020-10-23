import React, { Component } from 'react';
import './App.css';
import './component/SearchRes.css';
import './component/HashTags.css';
import './component/gridStyle.css';
import MemoCrud from './component/MemoCrud';
import BasicLayout from './component/React-grid';
import SearchRes from './component/SearchRes';
import SearchRes2 from './component/SearchRes2';
import HashTags from './component/HashTags';

class App extends Component<any,any> {
  constructor(props: any) {
    super(props);
    this.state ={
      leftTitle: '#여행',
      rightIconNumber: 1,
      memo:'',
    }
    this.updateMemo = this.updateMemo.bind(this);
    this.setLeftTxt = this.setLeftTxt.bind(this);
    this.writeBtnClick = this.writeBtnClick.bind(this);
  }
  updateMemo(memoInfo:any){
    console.log(memoInfo);
    this.setState({
      memo: memoInfo,
    })
    this.writeBtnClick()
  }

  writeBtnClick(){
    //메모 에디터 show 
    //@ts-ignore
    document.getElementById("memoCrudAll").style.display = "block";
    //@ts-ignore
    document.getElementById("wrap").style.display = "block";
    //@ts-ignore
    document.getElementById("editorSpace").style.display = "block";
  }

  listSeqSaveBtnClick() {
    alert('배치저장');
    //React-grid.tsx 에서 배치 함수값 가져오기 

  }

  setLeftTxt = (e: any) => {
    this.setState({
      leftTitle: e,
      searchWordUpdate: e
    });
    alert(e);
  }

  //반응형 아이콘 클릭 

  rightIconClick(e: any) {

    if (e === 1) {
      //@ts-ignore      
      document.getElementById("smallWindowRightWrap").style = "display: block; position:absolute; left: 0; top: 0;";
      //@ts-ignore      
      document.getElementById("smallWindowRight").style = "display: block; position:absolute; left: calc(100% - 300px); top: 0;";
      //@ts-ignore
      document.getElementById("rightIcon").style = "left: calc(100% - 340px);"
      this.setState({
        rightIconNumber: 2 
      })
    } else {
      //@ts-ignore
      document.getElementById("smallWindowRightWrap").style.display = "none";
      //@ts-ignore
      document.getElementById("smallWindowRight").style.display = "none";
      //@ts-ignore
      document.getElementById("rightIcon").style = "left: calc(100% - 50px);"
      this.setState({
        rightIconNumber: 1
      })
    }
  }


  selectChange(e: any) {
    if(e.target.value === "최신순"){
      alert("이건 최신순");
      //@ts-ignore
      document.getElementById("writeBtn").style.display = "inline-block";
    } else if(e.target.value === "사용자저장순") {
      alert("이건 사용자저장순");
      //@ts-ignore
      document.getElementById("writeBtn").style.display = "none";
    }
  }


  render() {
    return (
      <div className="body">
        <MemoCrud memo={this.state.memo}/>
        <div className="rightIcon" id="rightIcon" onClick={() => this.rightIconClick(this.state.rightIconNumber)}></div>
        <div className="smallWindowRightWrap" id="smallWindowRightWrap" onClick={() => this.rightIconClick(this.state.rightIconNumber)}></div>
        <div className="smallWindowRight" id="smallWindowRight">
          <SearchRes2 setLeftTxt={this.setLeftTxt} />
          <div className="hashtagTitle"># 해시태그 </div>
          <HashTags setLeftTxt={this.setLeftTxt} />
        </div>
        {/* {(this.state.block)? () : ()} */}

        <div className="top">
          <div className="left" id="left">
            <div className="header">
              {this.state.leftTitle}
            </div>
            <div className="buttons">
              <input type="button" id="writeBtn" onClick={this.writeBtnClick} value="메모추가" />
              <input type="button" id="listSeqSaveBtn" onClick={this.listSeqSaveBtnClick} value="배치저장" />
            </div>
            <div className="rightselects">
              <select id="selects" onChange={this.selectChange}>
                <option value="최신순">최신순</option>
                <option value="사용자저장순">사용자저장순</option>
              </select>
            </div>
            <div className="con">
              <BasicLayout updateTarget={this.updateMemo}/>
            </div>
          </div>
          <div className="right" id="right">
            <SearchRes setLeftTxt={this.setLeftTxt}/>
            <div className="hashtagTitle"># 해시태그 </div>
            <HashTags setLeftTxt={this.setLeftTxt} />
          </div>
        </div>
        <div className="footer">
          <div>
            © wizcore wi.lab Nuri Jai
              </div>
        </div>
      </div>
    );
  }
}

export default App;
