import React, { Component } from 'react';
import './App.css';
import './component/SearchRes.css';
import './component/HashTags.css';
import './component/React-grid.css';
import MemoCrud from './containers/MemocrudContainer';
import BasicLayout from './containers/React-gridContainer';
import SearchRes from './containers/SearchResContainer';
import HashTags from './component/HashTags';
import * as controller from './component/Controller';
import Routes from "./component/Routes";

class App extends Component<any,any> {
  constructor(props: any) {
    super(props);
    this.state ={
      leftTitle: '#여행',
      rightIconNumber: 1,
      selectVal: this.props.selectVal,
      modeVal:this.props.modeVal,
      items: [],
      seqInfo: [],
      seqNo: [],
      width: props.width,
      searchModal: false,
      newWrightCheck: false,
      memoListTemp: [],
      mountFlag: true,
    };
    this.setLeftTxt = this.setLeftTxt.bind(this);
    this.writeBtnClick = this.writeBtnClick.bind(this);
    this.seqSaveBtnClick = this.seqSaveBtnClick.bind(this);
    this.rightIconClick = this.rightIconClick.bind(this);
    this.getMemoList = this.getMemoList.bind(this);
  }
  componentDidUpdate(prevProps:any, prevState:any) {
    if(prevProps.memoListTemp !== this.props.memoListTemp){
      this.setState({
        memoListTemp: this.props.memoListTemp,
      })
    }
    if(prevProps.searchModal !== this.props.searchModal){
        this.setState({
          searchModal: this.props.searchModal,
      })
    }
    if(prevState.selectedValue !== this.state.selectedValue){
      this.setState({
        selectedValue: this.state.selectedValue,
        })
    }
    if(prevProps.selectVal !== this.props.selectVal){
      this.setState({
        selectVal: this.props.selectVal,
      })
    }
    if(prevProps.modeVal !== this.props.modeVal){
      this.setState({
        modeVal: this.props.modeVal,
      })
    }
  }

  getMemoList(){
    //메모리스트 최신순으로 가져오기
    controller.getMemoList().then(res => {
      const memoList = res.data.map((i:any, key:any, list:any) => {
        let chcon='';
        if(i.mhList.length!==0){
          i.mhList.map((tag:any, key:any) => {
            if(key===0) chcon=i.mcon;
            chcon = chcon.replace(tag.hname,'<strong style="color: rgb(102, 163, 224);">'+tag.hname+'</strong>');
          })
        }else{
          chcon = i.mcon;
        }
        if(this.state.selectVal===false){
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
        }else{
          let cordList = i.mcord.split(",");
          return {
            
            i: key.toString(),
            //메모 한줄 갯수 바꿀시 수정 필요
            x: cordList.slice(0,1)*1,
            y: cordList.slice(1,2)*1,
            w: cordList.slice(2,3)*1,
            h: cordList.slice(3,4)*1,
            mno: i.mno,
            chcon: chcon,
            mdate: i.mdate,
            hashtag: i.mhList,
            mcon: i.mcon,
          };
        }
         
      })
      this.props.ma.setMemoList(memoList);

    }).catch((e:any) => {
      console.log(e);
      alert("서버와의 통신이 원활하지 않습니다.");
    })
  }
  componentDidMount(){
    this.getMemoList()
  }
  writeBtnClick(){//메모 작성창
    this.props.ma.setModalVal(true);
    this.props.ma.setNewWrightCheck(true);
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
      this.props.ma.setSearchModalVal(true)
    } else {
      this.props.ma.setSearchModalVal(false)
    }
  }
  
  selectChange(e: any) {
    if(e.target.value === "최신순"){
      this.props.ma.setSelectVal(false);
    } else if(e.target.value === "사용자저장순") {
      this.props.ma.setSelectVal(true);
    }
    this.props.ta.setSearchMode(false);
    this.getMemoList();
  }
   seqSaveBtnClick(getItems:any){
    if(window.confirm("기존 배치저장이 사라지고 현재 배치가 새로이 저장됩니다. \n계속하시겠습니까?")){
        const info = this.state.memoListTemp.map((item:any) => {
          let seq = item.x + "," + item.y + "," + item.w + "," + item.h;
          let mno = item.mno 
          console.log(seq + ": " + mno);
          return {
            mcord: seq,
            mno: mno 
          }
      })
      controller.saveSeq(info).then((e:any) => {
        alert("배치에 성공하였습니다." + info[0].mno + ": " + info[0].mcord) ;
        //배치 성공하면 이시점에 temp를 list로 넘기면 되나?
        this.props.ma.setMemoList(this.state.memoListTemp);

        //배치저장으로 셀렉박스 바꾸기 
        this.props.ma.setSelectVal(true);
        this.getMemoList();

      }).catch((e:any) => {
        alert("오류");
        console.log(e);
      })
    }
  }
  render() {
    return (
      <div className="body">
        <Routes />
        <MemoCrud/>
        <div className="top">
          <div className="left" id="left">
            <div className="header">
              {this.props.tagVal}
            </div>
            <div className="buttons">
              {this.state.selectVal === true ? 
              (<></>):(<><input type="button" id="writeBtn" onClick={this.writeBtnClick} value="메모추가" /></>)}
              {this.state.modeVal === true ? 
              (<></>):(<><input type="button" id="listSeqSaveBtn" onClick={this.seqSaveBtnClick} value="배치저장" /></>)}
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
