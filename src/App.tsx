import React, { Component } from 'react';
import './App.css';
import './component/SearchRes.css';
import './component/HashTags.css';
import './component/React-grid.css';
import MemoCrud from './containers/MemocrudContainer';
import BasicLayout from './containers/React-gridContainer';
import SearchRes from './component/SearchRes';
import HashTags from './component/HashTags';
import * as controller from './component/Controller';
import Routes from "./component/Routes";

class App extends Component<any,any> {
  constructor(props: any) {
    super(props);
    this.state ={
      leftTitle: '#여행',
      rightIconNumber: 1,
      selectedValue: '최신순',
      items: [],
      seqInfo: [],
      seqNo: [],
      width: props.width,
      searchModal: false,
    };
    this.setLeftTxt = this.setLeftTxt.bind(this);
    this.writeBtnClick = this.writeBtnClick.bind(this);
    this.saveItems = this.saveItems.bind(this);
    this.seqSaveBtnClick = this.seqSaveBtnClick.bind(this);
    this.rightIconClick = this.rightIconClick.bind(this);
  }
  componentDidUpdate(prevProps:any, prevState:any) {
    if(prevProps.searchModal !== this.props.searchModal){
        this.setState({
          searchModal: this.props.searchModal,
          })
          // console.log("this state 확인" + this.state.searchModal);
    }
  }
  componentDidMount(){
    //메모리스트 가져오기
    controller.getMemoList().then(res => {
      const memoList = res.data.map(function(i:any, key:any, list:any) {
        let chcon='';
        if(i.mhList.length!==0){
          i.mhList.map(function(tag:any, key:any){
            if(key===0) chcon=i.mcon;
            chcon = chcon.replace(tag.hname,'<strong style="color: rgb(102, 163, 224);">'+tag.hname+'</strong>');
          })
        }else{
          chcon = i.mcon;
        }
        let cordList = i.mcord.split(",");
          // console.log("cordList");
          // console.log(cordList)
          // console.log(cordList.slice(0,1))

        if(false){
          return {
            i: key.toString(),
            //메모 한줄 갯수 바꿀시 수정 필요
            x: cordList.slice(0,1),
            y: cordList.slice(1,2),
            w: cordList.slice(2,3),
            h: cordList.slice(3,4),
            mno: i.mno,
            chcon: chcon,
            mdate: i.mdate,
            hashtag: i.mhList,
            mcon: i.mcon,
          };
        }else {
          return {
            i: key.toString(),
            //메모 한줄 갯수 바꿀시 수정 필요
            x: (key * 2)%10,
            y: 0,
            w: 2,
            h: 2,
            mno: i.mno,
            chcon: chcon,
            mdate: i.mdate,
            hashtag: i.mhList,
            mcon: i.mcon,
          };
        }
      })
      this.props.setMemoList(memoList);
    }).catch((e:any) => {
      console.log(e);
      alert("서버와의 통신이 원활하지 않습니다.");
    })
  }
  writeBtnClick(){//메모 작성창
    this.props.setModalVal(true);
  }
  setLeftTxt = (e: any) => {
    this.setState({
      leftTitle: e,
      searchWordUpdate: e      
    });
    alert(e);
  }
  //반응형 아이콘 클릭 
  rightIconClick() {
    if(this.state.searchModal === false){
      this.props.setSearchModalVal(true)
    } else {
      this.props.setSearchModalVal(false)
    }
  }
  selectChange(e: any) {

    this.setState({
      selectedValue: e.target.value
    })

    if(e.target.value === "최신순"){
      alert("이건 최신순");
      //@ts-ignore
      document.getElementById("writeBtn").style.display = "inline-block";


    } else if(e.target.value === "사용자저장순") {
      alert("이건 사용자저장순");
      //@ts-ignore
      document.getElementById("writeBtn").style.display = "none";

      //flag를 넘기고 
      this.setState({
        mode: 2 
      })
    }
  }

   seqSaveBtnClick(getItems:any){
    alert("기존 배치저장이 사라지고 현재 배치가 새로이 저장됩니다. \n계속하시겠습니까?");
    console.log("app.tsx의 items 확인");
    console.log(this.state.items);
    
    const info = this.state.items.map((item:any) => {
      let seq = item.x + "," + item.y + "," + item.w + "," + item.h;
      let mno = item.mno 
      console.log(seq);
      return {
        mcord: seq,
        mno: mno 
      }
    })


    console.log("info")
    console.log(info)

    controller.saveSeq(info).then((e:any) => {
      alert("배치에 성공하였습니다.");
      console.log("성공");
      //배치저장으로 셀렉박스 바꾸기 
      this.setState({
        selectedValue: "사용자저장순"
      })

    }).catch((e:any) => {
      console.log("오류");
      console.log(e);
      // alert("배치저장 오류!");
    })
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
        <MemoCrud/>
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
              <select id="selects" value={this.state.selectedValue} onChange={this.selectChange.bind(this)}>
                <option value="최신순">최신순</option>
                <option value="사용자저장순">사용자저장순</option>
              </select>
            </div>
            <div className="con">
              <BasicLayout/>
            </div>
            <div className="rightIcon" id="rightIcon" onClick={() => this.rightIconClick()} 
            style={{left: this.state.searchModal?"calc(100% - 340px)":""}}></div>
            <div className="smallWindowRightWrap" id="smallWindowRightWrap" onClick={() => this.rightIconClick()} 
            style={{display: this.state.searchModal?"block":""}}></div>
            <div className="right" id="right" style={{display: this.state.searchModal?"inline-block":""}}>
            <SearchRes setLeftTxt={this.setLeftTxt}/>
            <div className="hashtagTitle"># 해시태그 </div>
            <HashTags setLeftTxt={this.setLeftTxt} />
          </div>
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
