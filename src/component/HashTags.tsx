import React, { Component } from 'react';

class HashTags extends Component<any,any> {

    hashtagsClick = (e:any) => {
        //@ts-ignore
        this.props.setLeftTxt(e)
    }

    render() {
        return (
            <div className="hashtags">
                <div onClick={() => this.hashtagsClick("논태그")}>논태그</div>
                <div onClick={() => this.hashtagsClick("리액트")}>리액트</div>
                <div onClick={() => this.hashtagsClick("개발")}>개발</div>
                <div onClick={() => this.hashtagsClick("인터넷쇼핑")}>인터넷쇼핑</div>
                <div onClick={() => this.hashtagsClick("요리")}>요리</div>
                <div onClick={() => this.hashtagsClick("교육")}>교육</div>
                <div onClick={() => this.hashtagsClick("텀블러")}>텀블러</div>
                <div onClick={() => this.hashtagsClick("패션")}>패션</div>
                <div onClick={() => this.hashtagsClick("건강")}>건강</div>
                <div onClick={() => this.hashtagsClick("기타코드")}>기타코드</div>
                <div onClick={() => this.hashtagsClick("기타코드")}>기타코드</div>
                <div onClick={() => this.hashtagsClick("기타코드")}>기타코드</div>
                <div onClick={() => this.hashtagsClick("기타코드")}>기타코드</div>
                <div onClick={() => this.hashtagsClick("기타코드")}>기타코드</div>
                <div onClick={() => this.hashtagsClick("기타코드")}>기타코드</div>
                <div onClick={() => this.hashtagsClick("기타코드")}>기타코드</div>
                <div onClick={() => this.hashtagsClick("기타코드")}>기타코드</div>
                <div onClick={() => this.hashtagsClick("기타코드")}>기타코드</div>
                <div onClick={() => this.hashtagsClick("기타코드")}>기타코드</div>
                <div onClick={() => this.hashtagsClick("기타코드")}>기타코드</div>
                <div onClick={() => this.hashtagsClick("기타코드")}>기타코드</div>
                <div onClick={() => this.hashtagsClick("기타코드")}>기타코드</div>
                <div onClick={() => this.hashtagsClick("기타코드")}>기타코드</div>
                <div onClick={() => this.hashtagsClick("기타코드")}>기타코드</div>
                <div onClick={() => this.hashtagsClick("기타코드")}>기타코드</div>
                <div onClick={() => this.hashtagsClick("기타코드")}>기타코드</div>
                <div onClick={() => this.hashtagsClick("기타코드")}>기타코드</div>
                <div onClick={() => this.hashtagsClick("기타코드")}>기타코드</div>
                <div onClick={() => this.hashtagsClick("기타코드")}>기타코드</div>
            </div>
        );
    }
}

export default HashTags;