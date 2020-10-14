import React, { Component } from 'react';
import './App.css';

class App extends Component {

  render() {
    return(
        <div className="body">
                <div className="rightIcon"></div>
                    <div className="top">
                    <div className="left">
                        <div className="header">
                          # Memo 
                        </div>
                        <div className="buttons">
                          <input type="button" id="writeBtn" onClick={this.writeBtnClick} value="메모추가" />
                          <input type="button" id="listSeqSaveBtn" onClick={this.listSeqSaveBtnClick} value="순서저장" />
                        </div>
                        <div className="con"></div>
                    </div>
                    
                    <div className="right">
                        <div className="searchs">
                            <div>
                                <input type="text" id="searchTxt" />
                                <input type="button" id="searchBtn" onClick={this.searchBtnClick}/>
                            </div>
                            <div className="searchRes"></div>
                        </div>
                        <div className="hashtagTitle"># 해시태그 </div>
                        <div className="hashtags">
                          <div>논태그</div><div>리액트</div><div>맛집</div><div>개발</div>
                          <div>인터넷쇼핑</div><div>요리</div><div>교육</div><div>텀블러</div>
                          <div>패션</div><div>기타코드</div><div>건강</div><div>전세대출</div>
                          <div>청약</div><div>기도문</div><div>여행</div><div>발리여행</div>
                          <div>커피</div><div>드립커피</div><div>초코파이</div><div>과자</div>
                          <div>빨간색</div><div>매머드</div><div>스마트폰</div><div>아이폰</div>
                          <div>방꾸미기</div>
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
