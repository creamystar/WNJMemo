import React, { Component } from 'react';
import './App.css';
import './component/SearchRes.css';
import './component/HashTags.css';
import './component/React-grid.css';
import MemoCrud from './component/MemoCrud';
import BasicLayout from './component/React-grid';
import SearchRes from './component/SearchRes';
import SearchRes2 from './component/SearchRes2';
import HashTags from './component/HashTags';
import Routes from "./component/Routes";
import * as controller from './component/Controller';
import { ThemeConsumer } from 'styled-components';

class App extends Component<any,any> {
  constructor(props: any) {
    super(props);
    this.state ={
      leftTitle: '#여행',
      rightIconNumber: 1,
      memo:'',
      selectedValue: '최신순',
      items: []
    }
    this.updateMemo = this.updateMemo.bind(this);
    this.setLeftTxt = this.setLeftTxt.bind(this);
    this.writeBtnClick = this.writeBtnClick.bind(this);
    this.setMemo = this.setMemo.bind(this);
    this.saveItems = this.saveItems.bind(this);
    this.seqSaveBtnClick = this.seqSaveBtnClick.bind(this);
  }
  setMemo(memoInfo:any){
    this.setState({
      memo:memoInfo,
    })
    console.log(memoInfo);
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

  seqSaveBtnClick(getItems:any){
    
    alert("기존 배치저장이 사라지고 현재 배치가 새로이 저장됩니다. \n계속하시겠습니까?");
    // console.log("app.tsx의 items 확인");
    // console.log(this.state.items);
    this.state.items.map((item:any) => {
      const mcord = item.x + ", " + item.y + ", " + item.w + ", " + item.h 
      const mno = item.mno 
      console.log("mcord 제대로 들어갔는지 ")
      console.log(mcord)
      controller.saveSeq(mcord,mno).then((e:any) => {
        console.log("성공");
      }).catch((e:any) => {
        console.log("오류");
        console.log(e);
        // alert("배치저장 오류!");
      })
    })
    //배치저장으로 셀렉박스 바꾸기 

  }

  saveItems(getItems:any){
    this.setState({
      items: getItems
    })
    console.log("움직일때마다 app.tsx에도 자동저장 ");
    console.log(this.state.items);
  }


  render() {
    return (
      <div className="body">
        <Routes />
        <MemoCrud memo={this.state.memo} setMemo={this.setMemo}/>
        <div className="rightIcon" id="rightIcon" onClick={() => this.rightIconClick(this.state.rightIconNumber)}></div>
        <div className="smallWindowRightWrap" id="smallWindowRightWrap" onClick={() => this.rightIconClick(this.state.rightIconNumber)}></div>
        <div className="smallWindowRight" id="smallWindowRight">
          <SearchRes2 setLeftTxt={this.setLeftTxt} />
          <div className="hashtagTitle"># 해시태그 </div>
          {JSON.stringify(this.state.items)}
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
              <input type="button" id="listSeqSaveBtn" onClick={this.seqSaveBtnClick} value="배치저장" />
            </div>
            <div className="rightselects">
              <select id="selects" value={this.state.selectedValue} onChange={this.selectChange}>
                <option value="최신순">최신순</option>
                <option value="사용자저장순">사용자저장순</option>
              </select>
            </div>
            <div className="con">
              <BasicLayout updateTarget={this.updateMemo} saveItems={this.saveItems} />
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
