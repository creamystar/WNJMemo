import React, { Component } from 'react';
import './App.css';
import './component/SearchRes.css';
import './component/HashTags.css';
import MemoCrud from './component/MemoCrud';
import BasicLayout from './component/React-grid';
import './component/gridStyle.css';
<<<<<<< HEAD
import SearchRes from './component/SearchRes';
import HashTags from './component/HashTags';
import { template } from 'lodash';

class App extends Component<any,any> {
=======
>>>>>>> 0c029b0258c6aa2f8f62befc71454c19382f63a6

  state = {
    temp: ['발리','리액트','회식','요거트','건강'],
    leftTitle: '#여행',
<<<<<<< HEAD
  }    
  

  constructor(props:any) {
    super(props);   

    this.setLeftTxt = this.setLeftTxt.bind(this)
  }


  writeBtnClick(){
=======
  }
  constructor(props:any) {
    super(props);
    this.state = {
      message: '#여행',
      leftTitle: '#여행',
    }
    this.handleChange = this.handleChange.bind(this);
    this.searchBtnClick = this.searchBtnClick.bind(this);
    this.hashtagsClick = this.hashtagsClick.bind(this);
  }
 
  writeBtnClick() {
>>>>>>> 0c029b0258c6aa2f8f62befc71454c19382f63a6
    //메모 에디터 show 
    //@ts-ignore
    document.getElementById("memoCrudAll").style.display="block";
    //@ts-ignore
    document.getElementById("wrap").style.display="block";
    //@ts-ignore
    document.getElementById("editorSpace").style.display="block";
  }

  listSeqSaveBtnClick(){
    alert('배치저장');
  }

  setLeftTxt = (e:any) => {
    alert(e);
    this.setState({
      leftTitle: "#" + e
    });
  } 

  //반응형 아이콘 클릭 
  rightIconClick(e:any){
    if(e.target.key === "1"){
      //@ts-ignore      
      document.getElementById("right").style = "display: block; position:absolute; left: calc(100% - 300px); top: 0; z-index: 9;"; 
      //@ts-ignore
      document.getElementById("rightIcon").style= "left: calc(100% - 340px);"
      //@ts-ignore
      document.getElementById("rightIcon").key="2";
    } else {
      //@ts-ignore
      document.getElementById("right").style.display="none";
      //@ts-ignore
      document.getElementById("rightIcon").style= "left: calc(100% - 50px);"
      //@ts-ignore
      document.getElementById("rightIcon").key="1";
    }
  }


  selectChange(e:any){
    alert(e.target.value);
  }

  render() {
    return(
        <div className="body">
          <MemoCrud/>
          <div className="rightIcon" id="rightIcon" onClick={this.rightIconClick} key="1"></div>
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
                        <option value="최신순">최신순순</option>
                        <option value="사용자저장순">사용자저장순</option>
                      </select>
                    </div>
                    <div className="con">
                      <BasicLayout/>
                    </div>
                </div>              
              <div className="right" id="right">
                      <SearchRes setLeftTxt={this.setLeftTxt}/>
                  <div className="hashtagTitle"># 해시태그 </div>
                      <HashTags setLeftTxt={this.setLeftTxt}/>
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
