import React, { Component } from 'react';
import './App.css';
import './component/SearchRes.css';
import './component/HashTags.css';
import MemoCrud from './component/MemoCrud';

import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import './component/gridStyle.css';

var resizeId = "";

window.addEventListener('resize', function(){
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 250);
});

function doneResizing(){
  if(window.innerWidth === "600px"){
    this.rightBarControl();
  }
    console.log('doneResizing Window Width: '+window.innerWidth);
    //반응형 레이아웃 처리
}

const ReactGridLayout = WidthProvider(RGL);

class BasicLayout extends React.PureComponent {

  static defaultProps = {
    className: "layout",
    items: 11,
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: 10
  };

  constructor(props) {
    super(props);

    const layout = this.generateLayout();
    this.state = { layout };
  }

  generateDOM() {
    return _.map(_.range(this.props.items), function(i) {
      return (
        <div key={i}>
          <span className="text">{i}</span>
        </div>
      );
    });
  }

  generateLayout() {
    const p = this.props;
    return _.map(new Array(p.items), function(item, i) {
      const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 2) % 12,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        i: i.toString()
      };
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  render() {
    return (
      <ReactGridLayout
        layout={this.state.layout}
        onLayoutChange={this.onLayoutChange}
        {...this.props}
      >
        {this.generateDOM()}
      </ReactGridLayout>
    );
  }
}


class App extends Component {
  
  state = {
    message: '여행',
    leftTitle: '여행'
  }
  constructor(props) {
    super(props);
    this.state = {
      message: '여행',
      leftTitle: '여행'
    }
    this.handleChange = this.handleChange.bind(this);
    this.searchBtnClick = this.searchBtnClick.bind(this);
    this.hashtagsClick = this.hashtagsClick.bind(this);
  }
  writeBtnClick() {
    //메모 에디터 show 
    document.getElementById("memoCrudAll").style.display="block";
  }
  listSeqSaveBtnClick(){
    alert('배치저장');
  }
  handleChange = (e) => {
    this.setState({
      message: e.target.value
    });
  }
  searchBtnClick() {
    alert(this.state.message);
    this.setState({
      message: '여행'
    });
  }
  hashtagsClick(e){
    alert(e.target.id);
    this.setState({
      leftTitle: e.target.id
    });
  } 

  rightIconClick(e){
    if(e.target.value === "1"){
      document.getElementById("right").style = "display: block; position:absolute; left: calc(100% - 300px); top: 0; z-index: 9;"; 
      document.getElementById("rightIcon").style= "left: calc(100% - 340px);"
      document.getElementById("rightIcon").value="2";
    } else {
      document.getElementById("right").style.display="none";
      document.getElementById("rightIcon").style= "left: calc(100% - 50px);"
      document.getElementById("rightIcon").value="1";
    }
  }
  rightBarControl(){
    document.getElementById("right").style = "display: inline-block; width: 300px; height: 100%; float: right;";
  }
  render() {
    return(
        <div className="body">
          <MemoCrud/>
          <div className="rightIcon" id="rightIcon" onClick={this.rightIconClick} value="1"></div>
              <div className="top">
              <div className="left" id="left">
                  <div className="header">
                    # {this.state.leftTitle}  
                  </div>
                  <div className="buttons">
                    <input type="button" id="writeBtn" onClick={this.writeBtnClick} value="메모추가" />
                    <input type="button" id="listSeqSaveBtn" onClick={this.listSeqSaveBtnClick} value="배치저장" />
                  </div>
                  <div className="rightselects">

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
