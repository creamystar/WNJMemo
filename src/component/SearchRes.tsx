import React, { Component } from 'react';

class SearchRes extends Component<any,any> {

    state = {
        text: '#여행',
        hashtagsId: ''
    }
    sendCompanyName = (e:any) => {
        this.setState = {
            //@ts-ignore
            text: e.target.value
        }
    }
    hashtagsClick = (e:any) => {
        //@ts-ignore
        this.props.setLeftTxt(e)
    }

    sendSearchTxt(){
        //@ts-ignore
        this.props.setLeftTxt({text});
    }

    
    
    render() {
        return (
            <div className="searchs">
            <div>
                    <input type="text" id="searchTxt" value={this.state.text} onChange={this.sendCompanyName}/>
                    <input type="button" id="searchBtn" onClick={this.sendSearchTxt} />
                </div>
                <div className="searchRes">
                    <div onClick={() => {this.hashtagsClick("여행")}}>여행</div>
                    <div onClick={() => {this.hashtagsClick("발리")}}>발리</div>
                    <div onClick={() => {this.hashtagsClick("호주")}}>호주</div>
                    <div onClick={() => {this.hashtagsClick("벨기에")}}>벨기에</div>
                    <div onClick={() => {this.hashtagsClick("벨기에")}}>벨기에</div>
                    <div onClick={() => {this.hashtagsClick("벨기에")}}>벨기에</div>
                    <div onClick={() => {this.hashtagsClick("벨기에")}}>벨기에</div>
                    <div onClick={() => {this.hashtagsClick("벨기에")}}>벨기에</div>
                    <div onClick={() => {this.hashtagsClick("벨기에")}}>벨기에</div>
                    <div onClick={() => {this.hashtagsClick("벨기에")}}>벨기에</div>
                    <div onClick={() => {this.hashtagsClick("벨기에")}}>벨기에</div>
                    <div onClick={() => {this.hashtagsClick("벨기에")}}>벨기에</div>
                    <div onClick={() => {this.hashtagsClick("벨기에")}}>벨기에</div>
                    <div onClick={() => {this.hashtagsClick("벨기에")}}>벨기에</div>
                    <div onClick={() => {this.hashtagsClick("벨기에")}}>벨기에</div>
                    <div onClick={() => {this.hashtagsClick("벨기에")}}>벨기에</div>
                    <div onClick={() => {this.hashtagsClick("벨기에")}}>벨기에</div>
                    <div onClick={() => {this.hashtagsClick("벨기에")}}>벨기에</div>
                    <div onClick={() => {this.hashtagsClick("벨기에")}}>벨기에</div>
                    <div onClick={() => {this.hashtagsClick("벨기에")}}>벨기에</div>
                    <div onClick={() => {this.hashtagsClick("벨기에")}}>벨기에</div>
                    <div onClick={() => {this.hashtagsClick("벨기에")}}>벨기에</div>
                    <div onClick={() => {this.hashtagsClick("벨기에")}}>벨기에</div>
                    <div onClick={() => {this.hashtagsClick("벨기에")}}>벨기에</div>
                    <div onClick={() => {this.hashtagsClick("벨기에")}}>벨기에</div>
                    <div onClick={() => {this.hashtagsClick("벨기에")}}>벨기에</div>
                    <div onClick={() => {this.hashtagsClick("벨기에")}}>벨기에</div>
                    <div onClick={() => {this.hashtagsClick("벨기에")}}>벨기에</div>
                    <div onClick={() => {this.hashtagsClick("벨기에")}}>벨기에</div>
                    <div onClick={() => {this.hashtagsClick("벨기에")}}>벨기에</div>
                    <div onClick={() => {this.hashtagsClick("벨기에")}}>벨기에</div>
                    <div onClick={() => {this.hashtagsClick("벨기에")}}>벨기에</div>
                    <div onClick={() => {this.hashtagsClick("벨기에")}}>벨기에</div>                  
                </div>
            </div>
        );
    }
}

export default SearchRes;