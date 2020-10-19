import React, { Component } from 'react';
import './App.css';
import './component/SearchRes.css';
import './component/HashTags.css';
import MemoCrud from './component/MemoCrud';
import BasicLayout from './component/React-grid';
import './component/gridStyle.css';

class App extends Component {
  
  state = {
    message: '#여행',
    leftTitle: '#여행',
    temp: '재희',
    temp2: '재희2'
  }
  constructor(props:any) {
    super(props);
    this.state = {
      message: '#여행',
      leftTitle: '#여행',
      temp: '재희',
      temp2: '재희2' 
    }
    this.handleChange = this.handleChange.bind(this);
    this.searchBtnClick = this.searchBtnClick.bind(this);
    this.hashtagsClick = this.hashtagsClick.bind(this);

  }
  writeBtnClick() {
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
  handleChange = (e:any) => {
    this.setState({
      message: e.target.value
    });
  }
  searchBtnClick() {
    alert(this.state.message);
    if(this.state.message.indexOf("#")){
      this.setState({
        leftTitle : this.state.message
      });
    //  this.state.leftTitle = this.state.message 
    } else {

    }
    this.setState({
      message: '#여행'
    });
  }
  hashtagsClick(e:any){
    alert(e.target.id);
    this.setState({
      leftTitle: "#" + e.target.id
    });
  } 

  rightIconClick(e:any){
    if(e.target.value === "1"){
      //@ts-ignore
      document.getElementById("right").style = "display: block; position:absolute; left: calc(100% - 300px); top: 0; z-index: 9;"; 
      //@ts-ignore
      document.getElementById("rightIcon").style= "left: calc(100% - 340px);"
      //@ts-ignore
      document.getElementById("rightIcon").value="2";
    } else {
      //@ts-ignore
      document.getElementById("right").style.display="none";
      //@ts-ignore
      document.getElementById("rightIcon").style= "left: calc(100% - 50px);"
      //@ts-ignore
      document.getElementById("rightIcon").value="1";
    }
  }
  selectChange(e:any){
    alert(e.target.value);
  }

  render() {
    return(
        <div className="body">
          
          <MemoCrud/>
          <div className="rightIcon" id="rightIcon" onClick={this.rightIconClick} key={"1"}></div>
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
                    <BasicLayout/>
                  </div>
              </div>
              
              <div className="right" id="right">
                  <div className="searchs">
                      <div>
                          <input type="text" id="searchTxt" value={this.state.message} onChange={this.handleChange}/>
                          <input type="button" id="searchBtn" onClick={this.searchBtnClick}/>
                      </div>
                    <div className="searchRes">
                      <div onClick={this.hashtagsClick} id="여행">여행</div>
                      <div onClick={this.hashtagsClick} id="발리">발리</div>
                      <div onClick={this.hashtagsClick} id="호주">호주</div>
                      <div onClick={this.hashtagsClick} id="벨기에">벨기에</div>
                      <div onClick={this.hashtagsClick} id="이탈리아">이탈리아</div>
                      <div onClick={this.hashtagsClick} id="하이난">하이난</div>
                      <div onClick={this.hashtagsClick} id="네덜란드">네덜란드</div>
                      <div onClick={this.hashtagsClick} id="스위스">스위스</div>
                      <div onClick={this.hashtagsClick} id="오키나와">오키나와</div>
                      <div onClick={this.hashtagsClick} id="말레이시아">말레이시아</div>
                      <div onClick={this.hashtagsClick} id="싱가폴">싱가폴</div>
                      <div onClick={this.hashtagsClick} id="캘리포니아">캘리포니아</div>
                      <div onClick={this.hashtagsClick} id="하와이">하와이</div>
                  </div>
                  </div>
                  <div className="hashtagTitle"># 해시태그 </div>
                    <div className="hashtags">
                      <div onClick={this.hashtagsClick} id="논태그">논태그</div>
                      <div onClick={this.hashtagsClick} id="리액트">리액트</div>
                      <div onClick={this.hashtagsClick} id="맛집">맛집</div>
                      <div onClick={this.hashtagsClick} id="개발">개발</div>
                      <div onClick={this.hashtagsClick} id="인터넷쇼핑">인터넷쇼핑</div>
                      <div onClick={this.hashtagsClick} id="요리">요리</div>
                      <div onClick={this.hashtagsClick} id="교육">교육</div>
                      <div onClick={this.hashtagsClick} id="텀블러">텀블러</div>
                      <div onClick={this.hashtagsClick} id="패션">패션</div>
                      <div onClick={this.hashtagsClick} id="건강">건강</div>
                      <div onClick={this.hashtagsClick} id="청약">청약</div>
                      <div onClick={this.hashtagsClick} id="여행">여행</div>
                      <div onClick={this.hashtagsClick} id="발리여행">발리여행</div>
                      <div onClick={this.hashtagsClick} id="커피">커피</div>
                      <div onClick={this.hashtagsClick} id="스마트폰">스마트폰</div>
                      <div onClick={this.hashtagsClick} id="아이폰">아이폰</div>
                      <div onClick={this.hashtagsClick} id="방꾸미기">방꾸미기</div>
                      <div onClick={this.hashtagsClick} id="기타코드">기타코드</div>
                      <div onClick={this.hashtagsClick} id="기타코드">기타코드</div>
                      <div onClick={this.hashtagsClick} id="기타코드">기타코드</div>
                      <div onClick={this.hashtagsClick} id="기타코드">기타코드</div>
                      <div onClick={this.hashtagsClick} id="기타코드">기타코드</div>
                      <div onClick={this.hashtagsClick} id="기타">기타</div>
                      <div onClick={this.hashtagsClick} id="기타">기타</div>
                      <div onClick={this.hashtagsClick} id="기타">기타</div>
                      <div onClick={this.hashtagsClick} id="기타코드">기타코드</div>
                      <div onClick={this.hashtagsClick} id="기타코드">기타코드</div>
                      <div onClick={this.hashtagsClick} id="기타코드">기타코드</div>
                      <div onClick={this.hashtagsClick} id="기타코드">기타코드</div>
                      <div onClick={this.hashtagsClick} id="기타코드">기타코드</div>
                      <div onClick={this.hashtagsClick} id="기타코드">기타코드</div>
                      <div onClick={this.hashtagsClick} id="기타코드">기타코드</div>
                      <div onClick={this.hashtagsClick} id="기타코드">기타코드</div>
                      <div onClick={this.hashtagsClick} id="기타코드">기타코드</div>
                      <div onClick={this.hashtagsClick} id="기타">기타</div>
                      <div onClick={this.hashtagsClick} id="기타">기타</div>
                      <div onClick={this.hashtagsClick} id="기타">기타</div>
                      <div onClick={this.hashtagsClick} id="기타">기타</div>
                      <div onClick={this.hashtagsClick} id="기타">기타</div>
                      <div onClick={this.hashtagsClick} id="기타">기타</div>
                      <div onClick={this.hashtagsClick} id="기타">기타</div>
                      <div onClick={this.hashtagsClick} id="기타">기타</div>
                      <div onClick={this.hashtagsClick} id="기타">기타</div>
                      <div onClick={this.hashtagsClick} id="기타">기타</div>
                      <div onClick={this.hashtagsClick} id="기타">기타</div>
                      <div onClick={this.hashtagsClick} id="기타">기타</div>
                      <div onClick={this.hashtagsClick} id="기타">기타</div>
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
